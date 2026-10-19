// Contraste do texto branco sobre o vídeo do hero (pior caso entre os quadros), já com a camada Preto Ukêria do CSS.
// Uso: node tools/check-hero-contrast.mjs        (precisa de ffmpeg e do vídeo original em referencia/V3)
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const manifest = JSON.parse(readFileSync('tools/media-manifest.json', 'utf8'));
const SRC = manifest.hero.src;
if (!existsSync(SRC)) { console.log(`- vídeo original não encontrado (${SRC}); checagem ignorada`); process.exit(0); }
const css = readFileSync('assets/css/site.css', 'utf8');
const OV = parseFloat((css.match(/\.hero-shade\{[^}]*opacity:([\d.]+)/) || [])[1]);
const BASE = 20;                                   // Preto Ukêria #141414
const W = 320, H = 180;
const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
// região (fração da tela), mínimo exigido: título grande 3:1; links pequenos do menu 4,5:1
const regions = { 'título (H1)': [0.085, 0.21, 0.44, 0.74, 3], 'links do menu': [0.55, 0.0, 0.93, 0.08, 4.5] };
const buf = spawnSync('ffmpeg', ['-v', 'error', '-i', SRC, '-vf', `fps=5,scale=${W}:${H}`, '-f', 'image2pipe', '-vcodec', 'png', '-'], { maxBuffer: 1 << 28 }).stdout;
const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47]); const idx = [];
for (let i = 0; i < buf.length - 4; i++) if (buf.subarray(i, i + 4).equals(sig)) idx.push(i);
const pngs = idx.map((s, k) => buf.subarray(s, idx[k + 1] || buf.length));
const worst = Object.fromEntries(Object.keys(regions).map((k) => [k, 0]));
for (const png of pngs) {
  const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  for (const [name, [x0, y0, x1, y1]] of Object.entries(regions)) {
    const ls = [];
    for (let y = Math.floor(y0 * info.height); y < Math.ceil(y1 * info.height); y++) for (let x = Math.floor(x0 * info.width); x < Math.ceil(x1 * info.width); x++) {
      const i = (y * info.width + x) * 3; const m = (c) => (1 - OV) * c + OV * BASE;
      ls.push(lum(m(data[i]), m(data[i + 1]), m(data[i + 2])));
    }
    ls.sort((a, b) => a - b);
    worst[name] = Math.max(worst[name], ls[Math.floor(ls.length * 0.95)]);
  }
}
let falhas = 0;
console.log(`${pngs.length} quadros (5/s), camada Preto Ukêria a ${(OV * 100).toFixed(0)}%`);
for (const [name, [, , , , min]] of Object.entries(regions)) {
  const c = 1.05 / (worst[name] + 0.05);
  const ok = c >= min; if (!ok) falhas++;
  console.log(`${ok ? '✓' : '✗'} ${name}: contraste do branco ${c.toFixed(2)}:1 no pior quadro (mínimo ${min}:1)`);
}
console.log(falhas ? `\n${falhas} falha(s)` : '\nTudo conforme');
process.exit(falhas ? 1 : 0);
