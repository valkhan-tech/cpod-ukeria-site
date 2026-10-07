// Checagem de SEO / Open Graph / AEO / GEO. Uso: node tools/check-seo.mjs
import { readFileSync, existsSync } from 'node:fs';

const SITE = 'https://ukeria.com.br';
const html = readFileSync('index.html', 'utf8');
let falhas = 0;
const ok = (m) => console.log('✓ ' + m);
const falha = (m) => { falhas++; console.log('✗ ' + m); };
const check = (cond, m) => (cond ? ok(m) : falha(m));
const meta = (attr, name) => (html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`)) || [])[1];
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

// --- title / description
const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
check(title.length > 0 && title.length <= 70, `title (${title.length} caracteres)`);
const desc = meta('name', 'description') || '';
check(desc.length >= 70 && desc.length <= 160, `meta description (${desc.length} caracteres)`);
check(/<html lang="pt-BR">/.test(html), 'lang="pt-BR"');
check((html.match(/<h1[ >]/g) || []).length === 1, 'exatamente um <h1>');
check(/<link rel="canonical" href="https:\/\/ukeria\.com\.br\/">/.test(html), 'canonical absoluto');
check(/max-image-preview:large/.test(meta('name', 'robots') || ''), 'robots com max-image-preview:large');

// --- Open Graph / Twitter
for (const p of ['og:type', 'og:site_name', 'og:locale', 'og:url', 'og:title', 'og:description', 'og:image', 'og:image:width', 'og:image:height', 'og:image:alt']) {
  check(!!meta('property', p), `${p} presente`);
}
for (const n of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']) {
  check(!!meta('name', n), `${n} presente`);
}
const ogImg = meta('property', 'og:image') || '';
check(ogImg.startsWith(SITE + '/'), 'og:image com URL absoluta');
const ogPath = ogImg.replace(SITE + '/', '');
check(existsSync(ogPath), `arquivo da og:image existe (${ogPath})`);
if (existsSync(ogPath)) {
  const b = readFileSync(ogPath);
  let w = 0, h = 0;
  for (let i = 2; i < b.length - 9;) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xc0 && m <= 0xc3) { h = b.readUInt16BE(i + 5); w = b.readUInt16BE(i + 7); break; }
    i += 2 + b.readUInt16BE(i + 2);
  }
  check(w === 1200 && h === 630, `og:image mede ${w}×${h} (esperado 1200×630)`);
  check(b.length < 300 * 1024, `og:image pesa ${(b.length / 1024).toFixed(0)} KB (< 300 KB)`);
}
check(existsSync('assets/brand/apple-touch-icon.png'), 'apple-touch-icon existe');

// --- JSON-LD
const ldRaw = (html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1];
let ld = null;
try { ld = JSON.parse(ldRaw); ok('JSON-LD é JSON válido'); } catch (e) { falha('JSON-LD inválido: ' + e.message); }
if (ld) {
  const g = ld['@graph'];
  const tipos = g.map((n) => n['@type']);
  for (const t of ['Organization', 'WebSite', 'WebPage', 'FAQPage', 'Person']) check(tipos.includes(t), `JSON-LD tem ${t}`);
  const ids = new Set(g.map((n) => n['@id']));
  const refs = JSON.stringify(g).match(/"@id":"[^"]+"/g).map((s) => s.slice(7, -1));
  check(refs.every((r) => ids.has(r)), 'todas as referências @id do JSON-LD existem');
  const org = g.find((n) => n['@type'] === 'Organization');
  check(org.sameAs.every((u) => u.startsWith('https://')), 'sameAs com URLs https');
  // AEO: FAQ do JSON-LD = FAQ visível
  const faq = g.find((n) => n['@type'] === 'FAQPage').mainEntity;
  const vis = [...html.matchAll(/<details><summary>([^<]*)<\/summary><p>([^<]*)<\/p><\/details>/g)].map((m) => [decode(m[1]), decode(m[2])]);
  check(vis.length === faq.length && vis.length > 0, `FAQ visível (${vis.length}) e FAQPage (${faq.length}) têm o mesmo número de itens`);
  check(faq.every((q, i) => vis[i] && vis[i][0] === q.name && vis[i][1] === q.acceptedAnswer.text), 'texto do FAQ visível é idêntico ao do FAQPage');
}

// --- imagens e âncoras
const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
check(imgs.every((t) => /\balt="/.test(t)), `todas as ${imgs.length} <img> têm alt`);
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
const ancoras = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
check(ancoras.every((a) => ids.has(a)), 'todos os links #âncora apontam para ids existentes');

// --- robots / sitemap / llms
const robots = readFileSync('robots.txt', 'utf8');
check(/^User-agent: \*/m.test(robots) && /^Sitemap: https:\/\/ukeria\.com\.br\/sitemap\.xml$/m.test(robots), 'robots.txt com User-agent e Sitemap');
check(!/^Disallow: \/\s*$/m.test(robots.split('# Treinamento')[0]), 'robots.txt não bloqueia o site inteiro');
const sm = readFileSync('sitemap.xml', 'utf8');
check(/<loc>https:\/\/ukeria\.com\.br\/<\/loc>/.test(sm), 'sitemap.xml lista a home');
const llms = readFileSync('llms.txt', 'utf8');
check(/^# /.test(llms) && /^> /m.test(llms), 'llms.txt com H1 e resumo em blockquote');
const llmsLinks = [...llms.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
check(llmsLinks.length > 5, `llms.txt tem ${llmsLinks.length} links`);
const llmsAncoras = llmsLinks.filter((u) => u.startsWith(SITE + '/#')).map((u) => u.split('#')[1]);
check(llmsAncoras.every((a) => ids.has(a)), 'âncoras do llms.txt existem no index.html');

// --- crédito
check(html.includes('href="https://valkhan.com.br?utm_source=ukeria.com.br"') && html.includes('>Valkhan Tech</a>'), 'crédito "Desenvolvido por Valkhan Tech" com o link pedido');
for (const f of ['privacidade.html', 'termos.html']) {
  const t = readFileSync(f, 'utf8');
  check(/noindex/.test(t) && /rel="canonical"/.test(t), `${f}: noindex + canonical`);
  check(!sm.includes(f), `${f} fora do sitemap (noindex)`);
}
console.log(falhas ? `\n${falhas} falha(s)` : '\nTudo conforme');
process.exit(falhas ? 1 : 0);
