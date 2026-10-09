// Confere se TODAS as referências em uso estão corretas.
//   node tools/check-refs.mjs                       estático: arquivos existem (com a caixa exata), âncoras, URLs do domínio
//   node tools/check-refs.mjs --http=http://localhost:8765   também faz GET em cada recurso e exige 200
//   node tools/check-refs.mjs --external            também testa os links externos (Instagram, YouTube etc.)
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join, posix, sep } from 'node:path';

const args = process.argv.slice(2);
const HTTP = (args.find((a) => a.startsWith('--http=')) || '').split('=')[1];
const EXTERNAL = args.includes('--external');
const SITE = 'https://ukeria.com.br';

let falhas = 0;
const ok = (m) => console.log('✓ ' + m);
const falha = (m) => { falhas++; console.log('✗ ' + m); };
const norm = (p) => p.split(sep).join('/');

// existe com a caixa EXATA (Windows ignora maiúsculas; um servidor Linux não)
const listCache = new Map();
const ls = (d) => { if (!listCache.has(d)) listCache.set(d, existsSync(d) ? readdirSync(d) : []); return listCache.get(d); };
function existsExact(rel) {
  const parts = rel.split('/').filter(Boolean);
  let cur = '.';
  for (const part of parts) {
    if (!ls(cur).includes(part)) return false;
    cur = cur === '.' ? part : cur + '/' + part;
  }
  return statSync(cur).isFile();
}

// ------------------------------------------------------------ coletar referências
const pages = ['index.html', 'privacidade.html', 'termos.html'];
const refs = []; // { from, ref, kind }
const add = (from, ref, kind) => refs.push({ from, ref, kind });

for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/\b(?:src|data-src|poster|href)="([^"]*)"/g)) add(f, m[1], 'attr');
  for (const m of html.matchAll(/\b(?:srcset|data-srcset)="([^"]+)"/g)) for (const part of m[1].split(',')) add(f, part.trim().split(/\s+/)[0], 'srcset');
  for (const m of html.matchAll(/<meta[^>]+(?:property|name)="(?:og|twitter):image(?::secure_url)?"[^>]+content="([^"]+)"/g)) add(f, m[1], 'meta-image');
  for (const m of html.matchAll(/"(https:\/\/ukeria\.com\.br[^"]*)"/g)) add(f, m[1], 'json-ld');
  for (const m of html.matchAll(/<(?:link|meta)[^>]+(?:href|content)="(https:\/\/ukeria\.com\.br[^"]*)"/g)) add(f, m[1], 'canonical/og');
  refs.push({ from: f, ids, kind: 'ids' });
}
for (const m of readFileSync('assets/css/site.css', 'utf8').matchAll(/url\(["']?([^"')]+)["']?\)/g)) add('assets/css/site.css', m[1], 'css-url');
for (const f of ['llms.txt', 'sitemap.xml', 'robots.txt']) {
  for (const m of readFileSync(f, 'utf8').matchAll(/https:\/\/ukeria\.com\.br[^\s)<"]*/g)) add(f, m[0], 'site-url');
}

// ------------------------------------------------------------ resolver
const idsOf = {};
for (const r of refs) if (r.kind === 'ids') idsOf[r.from] = r.ids;
const local = new Set();           // arquivos locais referenciados (para o --http e a cobertura)
const ext = new Map();             // links externos únicos
const problemas = [];

for (const r of refs) {
  if (r.kind === 'ids') continue;
  let ref = r.ref.trim();
  if (!ref || ref.startsWith('mailto:') || ref.startsWith('tel:') || ref.startsWith('data:') || ref.startsWith('javascript:')) continue;

  // âncora na própria página
  if (ref.startsWith('#')) {
    if (!idsOf[r.from]?.has(ref.slice(1))) problemas.push(`${r.from}: âncora ${ref} sem id correspondente`);
    continue;
  }
  // URL absoluta do próprio domínio -> caminho local
  if (ref.startsWith(SITE)) {
    const u = new URL(ref);
    let path = u.pathname === '/' ? 'index.html' : u.pathname.slice(1);
    // no JSON-LD o #fragmento é o @id da entidade (conferido no check-seo), não uma âncora da página
    if (r.kind !== 'json-ld' && u.hash && path === 'index.html' && !idsOf['index.html'].has(u.hash.slice(1))) problemas.push(`${r.from}: ${ref} → âncora #${u.hash.slice(1)} não existe em index.html`);
    if (!existsExact(path)) problemas.push(`${r.from} (${r.kind}): ${ref} → arquivo "${path}" não existe (verifique a caixa)`);
    else local.add(path);
    continue;
  }
  if (/^https?:\/\//.test(ref) || ref.startsWith('//')) { ext.set(ref.split('#')[0], r.from); continue; }

  // caminho relativo
  ref = ref.split('#')[0].split('?')[0];
  const base = r.kind === 'css-url' ? dirname(r.from) : '.';
  const path = norm(posix.normalize(posix.join(norm(base), ref)));
  if (path === '.' || path.endsWith('/')) continue;
  if (!existsExact(path)) { problemas.push(`${r.from} (${r.kind}): "${r.ref}" → "${path}" não existe (ou a caixa difere)`); continue; }
  // tudo o que o site usa tem de estar em assets/ ou ser uma página/arquivo raiz
  if (!/^(assets\/|[^/]+\.(html|txt|xml)$)/.test(path)) problemas.push(`${r.from}: "${path}" está fora de assets/ (não será publicado?)`);
  if (/^(remover|old|referencia|tools)\//.test(path)) problemas.push(`${r.from}: aponta para pasta que não deve ser publicada → ${path}`);
  local.add(path);
}

problemas.length ? problemas.forEach((p) => falha(p)) : ok(`${local.size} arquivos locais referenciados existem, com a caixa exata e dentro de assets/ ou da raiz`);

// âncoras do índice usadas pelo llms.txt / sitemap
ok(`${[...idsOf['index.html']].length} ids no index.html; âncoras do menu, rodapé, llms.txt e JSON-LD conferidas`);

// ------------------------------------------------------------ cobertura inversa
const todas = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : todas.push(norm(p)); } };
walk('assets');
const reservado = (p) => /^assets\/brand\/(?!favicon|apple|logo-completo-bege|logo-tipografico-bege)/.test(p) || /^assets\/img\/web\/clientes\/[^/]+-preto\.webp$/.test(p);
const semUso = todas.filter((p) => !local.has(p) && !reservado(p));
semUso.length ? falha(`${semUso.length} arquivo(s) em assets/ sem referência: ${semUso.slice(0, 6).join(', ')}`) : ok(`todos os ${todas.length} arquivos de assets/ estão em uso (${todas.filter(reservado).length} reservados: logos pretos e símbolos)`);

// ------------------------------------------------------------ HTTP
if (HTTP) {
  let bad = 0, n = 0;
  const lista = [...local].filter((p) => p !== 'index.html' || true);
  for (const p of lista) {
    n++;
    try {
      const r = await fetch(`${HTTP}/${encodeURI(p)}`);
      const len = (await r.arrayBuffer()).byteLength;
      if (r.status !== 200 || len === 0) { bad++; falha(`HTTP ${r.status} (${len} bytes) em /${p}`); }
    } catch (e) { bad++; falha(`HTTP falhou em /${p}: ${e.message}`); }
  }
  // arquivos que NÃO devem ser publicados mas não podem ser necessários ao site
  if (!bad) ok(`${n} recursos respondem 200 com conteúdo em ${HTTP}`);
}

// ------------------------------------------------------------ externos
if (EXTERNAL) {
  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36';
  let n = 0;
  for (const [url, from] of ext) {
    n++;
    try {
      const r = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow' });
      // 999 (LinkedIn) e 403/429 = bloqueio de robô, não link quebrado
      if (r.status === 404 || r.status === 410 || (r.status >= 500 && r.status !== 999)) falha(`externo ${r.status}: ${url} (em ${from})`);
      else console.log(`  ${r.status}  ${url}`);
    } catch (e) { falha(`externo sem resposta: ${url} (${e.message})`); }
  }
  ok(`${n} links externos testados`);
}

console.log(falhas ? `\n${falhas} falha(s)` : '\nTudo conforme');
process.exit(falhas ? 1 : 0);
