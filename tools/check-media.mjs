// Confere a mídia usada pelo site: arquivos existem, pesos dentro do limite e nenhuma mídia órfã em assets/.
// Uso: node tools/check-media.mjs
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, sep } from 'node:path';

const html = readFileSync('index.html', 'utf8');
let falhas = 0;
const ok = (m) => console.log('✓ ' + m);
const falha = (m) => { falhas++; console.log('✗ ' + m); };

const refs = new Set();
for (const m of html.matchAll(/(?:src|poster|href)="(assets\/[^"#?]+)"/g)) refs.add(m[1]);
for (const m of html.matchAll(/srcset="([^"]+)"/g)) for (const part of m[1].split(',')) refs.add(part.trim().split(/\s+/)[0]);

const faltando = [...refs].filter((r) => !existsSync(r));
faltando.length ? falha('arquivos referenciados que não existem: ' + faltando.join(', ')) : ok(`${refs.size} arquivos referenciados existem`);

const LIM = { '.mp4': 2 * 1024 * 1024, '.webp': 400 * 1024, '.jpg': 400 * 1024, '.png': 400 * 1024 };
const pesados = [...refs].filter((r) => existsSync(r) && LIM[r.slice(r.lastIndexOf('.'))] && statSync(r).size > LIM[r.slice(r.lastIndexOf('.'))]);
pesados.length ? falha('acima do limite: ' + pesados.map((p) => `${p} (${(statSync(p).size / 1024).toFixed(0)} KB)`).join(', ')) : ok('mídia dentro dos limites (vídeo ≤ 2 MB, imagem ≤ 400 KB)');

// mídia em assets/ que nenhuma página referencia (as -640 são usadas só via srcset, já contadas)
const todas = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : todas.push(p.split(sep).join('/')); } };
for (const d of ['assets/img', 'assets/video']) walk(d);
const textoPaginas = ['index.html', 'privacidade.html', 'termos.html', 'llms.txt', 'sitemap.xml'].map((f) => readFileSync(f, 'utf8')).join('\n');
// logos pretos (clientes/*-preto.webp) ficam reservados de propósito: overlays e fundos claros
const orfas = todas.filter((p) => !textoPaginas.includes(p) && !/clientes\/[^/]+-preto\.webp$/.test(p));
orfas.length ? falha(`${orfas.length} arquivo(s) sem uso (mover para remover/): ${orfas.slice(0, 8).join(', ')}${orfas.length > 8 ? '…' : ''}`) : ok('nenhuma mídia órfã em assets/');

const total = todas.reduce((s, p) => s + statSync(p).size, 0);
console.log(`  total em assets/img + assets/video: ${(total / 1048576).toFixed(1)} MB (${todas.length} arquivos)`);
console.log(falhas ? `\n${falhas} falha(s)` : '\nTudo conforme');
process.exit(falhas ? 1 : 0);
