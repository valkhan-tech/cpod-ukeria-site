// Lista largura x altura dos .webp/.jpg gerados (usado para width/height e proporção no HTML).
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, sep } from 'node:path';
import sharp from 'sharp';
const out = {};
const walk = async (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { await walk(p); continue; }
    if (!/\.(webp|jpg)$/i.test(f)) continue;
    const m = await sharp(p).metadata();
    out[p.split(sep).join('/')] = [m.width, m.height];
  }
};
for (const d of ['assets/img/web', 'assets/video/web/servicos']) await walk(d);
writeFileSync('tools/media-dims.json', JSON.stringify(out, null, 1));
console.log(Object.keys(out).length, 'arquivos medidos');
