// Otimiza a mídia da onda 2 (referencia/v2 -> assets/...), a partir de tools/media-manifest.json.
// Uso:  node tools/optimize-media.mjs [--only=images|videos|clientes|siga] [--force]
// Requisitos: ffmpeg no PATH e `npm install` dentro de tools/ (sharp).
// Nunca altera nem apaga nada em referencia/v2.
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(join(ROOT, 'tools/media-manifest.json'), 'utf8'));
const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const ONLY = (args.find((a) => a.startsWith('--only=')) || '').split('=')[1];
const want = (k) => !ONLY || ONLY === k;
const abs = (p) => join(ROOT, p);
const kb = (p) => (statSync(abs(p)).size / 1024).toFixed(0) + ' KB';
const report = [];
const log = (...a) => console.log(...a);
const ensure = (p) => mkdirSync(dirname(abs(p)), { recursive: true });
const skip = (p) => !FORCE && existsSync(abs(p));

// ---------------------------------------------------------------- imagens
async function image(it) {
  const out = it.dest + '.webp';
  ensure(out);
  const base = () => sharp(abs(it.src), { limitInputPixels: false }).rotate();
  if (!skip(out)) {
    await base().resize({ width: it.max, height: it.max, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: it.q || 80, effort: 5 }).toFile(abs(out));
  }
  report.push({ file: out, size: statSync(abs(out)).size });
  if (it.thumb !== false) {
    const th = it.dest + '-640.webp';
    if (!skip(th)) {
      await base().resize({ width: 640, height: 640, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: Math.min(it.q || 80, 78), effort: 5 }).toFile(abs(th));
    }
    report.push({ file: th, size: statSync(abs(th)).size });
  }
  log('img  ', out, kb(out));
}

// ----------------------------------------------------------------- vídeos
function probeTransfer(src) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=color_transfer', '-of', 'csv=p=0', abs(src)], { encoding: 'utf8' });
  return (r.stdout || '').trim();
}
async function video(it) {
  const mp4 = it.dest + '.mp4';
  const jpg = it.dest + '.webp';   // capa em WebP
  ensure(mp4);
  const hdr = /arib-std-b67|smpte2084/.test(probeTransfer(it.src));
  // HLG/HDR -> SDR bt709 (iPhone grava HLG; sem isso as cores ficam lavadas)
  const vf = ['scale=540:-2:flags=lanczos', 'fps=30']
    .concat(hdr ? ['zscale=t=linear:npl=100', 'format=gbrpf32le', 'zscale=p=bt709', 'tonemap=tonemap=hable:desat=0',
      'zscale=t=bt709:m=bt709:r=tv'] : [])
    .concat(['format=yuv420p']).join(',');
  if (!skip(mp4)) {
    const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(it.start), '-i', abs(it.src), '-t', String(it.dur), '-an',
      '-vf', vf, '-c:v', 'libx264', '-preset', 'veryslow', '-profile:v', 'high', '-crf', '30', '-maxrate', '900k', '-bufsize', '1800k',
      '-movflags', '+faststart', abs(mp4)], { encoding: 'utf8' });
    if (r.status !== 0) throw new Error('ffmpeg falhou em ' + it.src + '\n' + r.stderr);
  }
  if (!skip(jpg)) {
    const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-ss', '1.5', '-i', abs(mp4), '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'png', '-'], { maxBuffer: 1 << 26 });
    if (r.status !== 0) throw new Error('poster falhou em ' + mp4);
    await sharp(r.stdout).webp({ quality: 76, effort: 6 }).toFile(abs(jpg));
  }
  report.push({ file: mp4, size: statSync(abs(mp4)).size }, { file: jpg, size: statSync(abs(jpg)).size });
  log('video', mp4, kb(mp4), hdr ? '(HDR->SDR)' : '', 'poster', kb(jpg));
}

// ----------------------------------------------------------------- logos
// Aparar a margem transparente e reduzir a 120 px de altura (2x o tamanho exibido).
async function trimmed(file) {
  const buf = await sharp(file, { limitInputPixels: false }).ensureAlpha().trim({ threshold: 5 }).toBuffer();
  return buf;
}
async function signature(buf) {
  // silhueta (canal alfa) normalizada em 64x32: serve para casar o logo branco com o preto
  const { data } = await sharp(buf).resize(64, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extractChannel('alpha').raw().toBuffer({ resolveWithObject: true });
  return data;
}
const dist = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]); return s / a.length; };

async function clientes() {
  const pretoDir = abs(manifest.clientes_preto_dir);
  const pretoFiles = readdirSync(pretoDir).filter((f) => f.endsWith('.png'));
  const pretos = [];
  for (const f of pretoFiles) {
    const buf = await trimmed(join(pretoDir, f));
    pretos.push({ f, buf, sig: await signature(buf), used: false });
  }
  const mapa = [];
  for (const c of manifest.clientes) {
    const wbuf = await trimmed(abs(c.branco));
    const wsig = await signature(wbuf);
    const ranked = pretos.filter((p) => !p.used).map((p) => ({ p, d: dist(wsig, p.sig) })).sort((a, b) => a.d - b.d);
    const best = ranked[0];
    best.p.used = true;
    const outB = `assets/img/web/clientes/${c.slug}-branco.webp`;
    const outP = `assets/img/web/clientes/${c.slug}-preto.webp`;
    ensure(outB);
    const enc = (buf, out) => sharp(buf).resize({ height: 120, fit: 'inside' }).webp({ quality: 92, alphaQuality: 100, effort: 5 }).toFile(abs(out));
    if (!skip(outB)) await enc(wbuf, outB);
    if (!skip(outP)) await enc(best.p.buf, outP);
    const meta = await sharp(abs(outB)).metadata();
    mapa.push({ slug: c.slug, nome: c.nome, branco: c.branco.split('/').pop(), preto: best.p.f, distancia: +best.d.toFixed(2), w: meta.width, h: meta.height });
    report.push({ file: outB, size: statSync(abs(outB)).size }, { file: outP, size: statSync(abs(outP)).size });
    log('logo ', c.slug.padEnd(22), `${c.branco.split('/').pop()} <-> ${best.p.f}`.padEnd(18), 'dist', best.d.toFixed(2), `${meta.width}x${meta.height}`);
  }
  writeFileSync(abs('tools/clientes-map.json'), JSON.stringify(mapa, null, 1));
}

// ------------------------------------------------------- capas "Siga a Ukêria"
async function download(url, headers = {}) {
  const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36', ...headers }, redirect: 'follow' });
  if (!r.ok) throw new Error(`${r.status} em ${url}`);
  return r;
}
async function siga() {
  const out = [];
  for (const p of manifest.siga) {
    const dest = `assets/img/web/siga/${p.id}.webp`;
    const item = { id: p.id, type: p.type, url: p.url, cover: null, title: null };
    try {
      let imgBuf;
      if (p.type === 'youtube') {
        const o = await (await download(`https://www.youtube.com/oembed?url=${encodeURIComponent(p.url)}&format=json`)).json();
        item.title = o.title;
        for (const q of ['maxresdefault', 'hqdefault']) {
          try { imgBuf = Buffer.from(await (await download(`https://img.youtube.com/vi/${p.video}/${q}.jpg`)).arrayBuffer()); break; } catch { /* tenta a próxima */ }
        }
      } else {
        const html = await (await download(p.url)).text();
        const m = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i) || html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i);
        if (!m) throw new Error('og:image não encontrado');
        const imgUrl = m[1].replace(/&amp;/g, '&');
        imgBuf = Buffer.from(await (await download(imgUrl)).arrayBuffer());
        const d = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i);
        item.title = d ? d[1].replace(/&amp;/g, '&').replace(/&#039;/g, "'").replace(/&quot;/g, '"') : null;
      }
      ensure(dest);
      const w = p.type === 'youtube' ? 640 : 640;
      await sharp(imgBuf).resize({ width: w, height: p.type === 'youtube' ? 360 : 800, fit: p.type === 'youtube' ? 'cover' : 'inside', withoutEnlargement: true })
        .webp({ quality: 80 }).toFile(abs(dest));
      item.cover = dest;
      report.push({ file: dest, size: statSync(abs(dest)).size });
      log('capa ', p.id, kb(dest));
    } catch (e) {
      log('capa ', p.id, 'FALHOU:', e.message, '-> plano B (card de cor chapada)');
    }
    out.push(item);
  }
  writeFileSync(abs('tools/siga-covers.json'), JSON.stringify(out, null, 1));
}

// ------------------------------------------------------------------- main
if (want('images')) for (const it of manifest.items.filter((i) => i.type === 'image')) await image(it);
if (want('videos')) for (const it of manifest.items.filter((i) => i.type === 'video')) await video(it);
if (want('clientes')) await clientes();
if (want('siga')) await siga();
const total = report.reduce((s, r) => s + r.size, 0);
log(`\n${report.length} arquivos gerados nesta execução, ${(total / 1048576).toFixed(1)} MB no total`);
