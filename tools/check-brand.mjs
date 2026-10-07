// Checagem de compliance de marca (Ukêria). Uso: node tools/check-brand.mjs
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const PALETA = {
  branco:'#ffffff','bege-01':'#ded0c4','bege-02':'#c0a58e','bege-03':'#a88363','preto-ukeria':'#141414',
  'verde-01':'#b3b48e','verde-02':'#999a67','verde-03':'#7b7b52','verde-04':'#626242','verde-05':'#3e3e2a',
  'laranja-01':'#ffb387','laranja-02':'#ff8139','laranja-03':'#fa5b00','laranja-04':'#c84900',
  'amarelo-01':'#f4f7c1','amarelo-02':'#e7ec74','amarelo-03':'#dce436','amarelo-04':'#bfc71b',
};
const OFICIAIS = new Set(Object.values(PALETA));
const files = [
  'index.html','privacidade.html','termos.html','assets/css/site.css','assets/js/site.js',
  ...readdirSync('assets/brand').map(f => join('assets/brand', f)),
];
let falhas = 0;
const falha = (m) => { falhas++; console.log('✗ ' + m); };
const ok = (m) => console.log('✓ ' + m);

// 1) todo hex pertence à paleta oficial
for (const f of files) {
  const txt = readFileSync(f, 'utf8');
  const hexes = [...txt.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![0-9a-zA-Z_-])/g)]
    .map(m => m[0].toLowerCase())
    // ignora âncoras (#inicio...) e ids: só hex puro de 3/6 dígitos dentro de CSS/atributos de cor
    .filter(h => /^#[0-9a-f]{6}$/.test(h) || /^#[0-9a-f]{3}$/.test(h) && /[0-9]/.test(h));
  const ruins = [...new Set(hexes.filter(h => h.length === 7 && !OFICIAIS.has(h)))];
  ruins.length ? falha(`${f}: hex fora da paleta → ${ruins.join(', ')}`) : ok(`${f}: hex só da paleta`);
}

// 2) fontes
const css = readFileSync('assets/css/site.css', 'utf8');
const html = readFileSync('index.html', 'utf8');
const familias = [...css.matchAll(/font-family\s*:\s*([^;}]+)/g)].map(m => m[1]);
const proibidas = /anton|playfair|inter\b|unbounded|google/i;
familias.some(f => proibidas.test(f)) ? falha('font-family com fonte não oficial') : ok('font-family só Raleway/Quatera (+ fallbacks)');
/fonts\.googleapis|fonts\.gstatic/.test(html + css) ? falha('Google Fonts em uso') : ok('sem Google Fonts');

// 3) conteúdo/links
const tudo = files.map(f => readFileSync(f, 'utf8')).join('\n');
/5511974995600/.test(tudo) ? falha('WhatsApp antigo ainda presente') : ok('WhatsApp antigo removido');
/utm_source=chatgpt/.test(tudo) ? falha('utm_source=chatgpt presente') : ok('sem utm_source=chatgpt');
/mix-blend-mode/.test(css) ? falha('mix-blend-mode no CSS') : ok('sem mix-blend-mode (logo com cor controlada)');
/estrat[ée]gio\b/i.test(tudo) ? falha('grafia "estratégio"') : ok('grafia "estratégico" corrigida');

// 4) logotipo: cores permitidas (preto-ukeria / bege 01-03)
for (const f of readdirSync('assets/brand').filter(f => /^logo|^simbolo/.test(f))) {
  const t = readFileSync(join('assets/brand', f), 'utf8');
  const cores = [...new Set([...t.matchAll(/#[0-9a-fA-F]{6}\b/g)].map(m => m[0].toLowerCase()))];
  const permitidas = ['#141414', '#ded0c4', '#c0a58e', '#a88363'];
  cores.every(c => permitidas.includes(c)) ? ok(`${f}: cor do logo permitida (${cores.join(', ') || 'sem cor'})`) : falha(`${f}: cor proibida no logo (${cores.join(', ')})`);
  // elementos sem classe/fill herdam o preto padrão do SVG: então o <svg> raiz precisa declarar fill
  const semCor = [...t.matchAll(/<(path|polygon|rect|circle|ellipse)\b([^>]*)>/g)].filter(m => !/class="cls-1"|\sfill="/.test(m[2])).length;
  const raiz = /<svg[^>]*\sfill="#[0-9a-f]{6}"/i.test(t);
  if (semCor > 0 && !raiz) falha(`${f}: ${semCor} elemento(s) sem cor ficam pretas (falta fill no <svg> raiz)`);
}

// 5) contraste (WCAG) dos pares texto/fundo usados
const lum = (hex) => { const c = [1,3,5].map(i => parseInt(hex.slice(i, i+2), 16) / 255).map(v => v <= .03928 ? v/12.92 : ((v+.055)/1.055) ** 2.4); return .2126*c[0] + .7152*c[1] + .0722*c[2]; };
const razao = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05); };
const P = PALETA;
const pares = [
  ['corpo sobre bege-01', P['preto-ukeria'], P['bege-01'], 4.5],
  ['texto secundário (verde-05) sobre bege-01', P['verde-05'], P['bege-01'], 4.5],
  ['corpo sobre bege-03', P['preto-ukeria'], P['bege-03'], 4.5],
  ['corpo sobre amarelo-03', P['preto-ukeria'], P['amarelo-03'], 4.5],
  ['corpo (bege-01) sobre verde-05', P['bege-01'], P['verde-05'], 4.5],
  ['secundário (bege-02) sobre verde-05', P['bege-02'], P['verde-05'], 4.5],
  ['destaque amarelo-03 sobre verde-05', P['amarelo-03'], P['verde-05'], 4.5],
  ['botão: preto sobre laranja-03', P['preto-ukeria'], P['laranja-03'], 4.5],
  ['nav: bege-01 sobre preto', P['bege-01'], P['preto-ukeria'], 4.5],
  ['eyebrow preto sobre bege-01 (texto pequeno)', P['preto-ukeria'], P['bege-01'], 4.5],
  ['numeração laranja-04 sobre branco (texto grande)', P['laranja-04'], P['branco'], 3],
  ['bege-01 sobre preto (form)', P['bege-01'], P['preto-ukeria'], 4.5],
  ['bege-02 sobre preto (labels do form)', P['bege-02'], P['preto-ukeria'], 4.5],
];
for (const [nome, fg, bg, min] of pares) {
  const r = razao(fg, bg);
  r >= min ? ok(`contraste ${r.toFixed(2)} ≥ ${min} — ${nome}`) : falha(`contraste ${r.toFixed(2)} < ${min} — ${nome}`);
}
console.log(falhas ? `\n${falhas} falha(s)` : '\nTudo conforme');
process.exit(falhas ? 1 : 0);
