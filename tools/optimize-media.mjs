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
  const vf = [`scale=${it.width || 540}:-2:flags=lanczos`, 'fps=30']
    .concat(hdr ? ['zscale=t=linear:npl=100', 'format=gbrpf32le', 'zscale=p=bt709', 'tonemap=tonemap=hable:desat=0',
      'zscale=t=bt709:m=bt709:r=tv'] : [])
    .concat(['format=yuv420p']).join(',');
  if (!skip(mp4)) {
    const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(it.start), '-i', abs(it.src), '-t', String(it.dur), '-an',
      '-vf', vf, '-c:v', 'libx264', '-preset', 'veryslow', '-profile:v', 'high', '-crf', '30', '-maxrate', (it.width > 540 ? '1800k' : '900k'), '-bufsize', (it.width > 540 ? '3600k' : '1800k'),
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


// ------------------------------------------------------------------ hero
// Vídeo de fundo: sem áudio, dois tamanhos (desktop 1280 / celular 854) e capa WebP (é o LCP da página).
async function hero() {
  const h = manifest.hero;
  const vfBase = (w) => `scale=${w}:-2:flags=lanczos,fps=30,format=yuv420p`;
  for (const [w, crf, maxrate] of [[1280, 27, '2600k'], [854, 28, '1100k']]) {
    const out = `${h.dest}-${w}.mp4`;
    ensure(out);
    if (!skip(out)) {
      const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', abs(h.src), '-an', '-vf', vfBase(w), '-c:v', 'libx264', '-preset', 'veryslow', '-profile:v', 'high',
        '-crf', String(crf), '-maxrate', maxrate, '-bufsize', String(parseInt(maxrate, 10) * 2) + 'k', '-movflags', '+faststart', abs(out)], { encoding: 'utf8' });
      if (r.status !== 0) throw new Error('hero falhou: ' + r.stderr);
    }
    report.push({ file: out, size: statSync(abs(out)).size });
    log('hero ', out, kb(out));
  }
  const poster = `${h.dest}.webp`;
  if (!skip(poster)) {
    const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(h.poster_at || 1), '-i', abs(h.src), '-frames:v', '1', '-vf', 'scale=1280:-2', '-f', 'image2pipe', '-vcodec', 'png', '-'], { maxBuffer: 1 << 26 });
    if (r.status !== 0) throw new Error('capa do hero falhou');
    await sharp(r.stdout).webp({ quality: 72, effort: 6 }).toFile(abs(poster));
  }
  report.push({ file: poster, size: statSync(abs(poster)).size });
  log('hero ', poster, kb(poster));
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
    const best = c.semPreto ? null : pretos.filter((p) => !p.used).map((p) => ({ p, d: dist(wsig, p.sig) })).sort((a, b) => a.d - b.d)[0];
    if (best) best.p.used = true;
    const outB = `assets/img/web/clientes/${c.slug}-branco.webp`;
    const outP = `assets/img/web/clientes/${c.slug}-preto.webp`;
    ensure(outB);
    const enc = (buf, out) => sharp(buf).resize({ height: 120, fit: 'inside' }).webp({ quality: 92, alphaQuality: 100, effort: 5 }).toFile(abs(out));
    if (!skip(outB)) await enc(wbuf, outB);
    if (best && !skip(outP)) await enc(best.p.buf, outP);
    const meta = await sharp(abs(outB)).metadata();
    mapa.push({ slug: c.slug, nome: c.nome, branco: c.branco.split('/').pop(), preto: best ? best.p.f : null, distancia: best ? +best.d.toFixed(2) : null, w: meta.width, h: meta.height });
    report.push({ file: outB, size: statSync(abs(outB)).size });
    if (best) report.push({ file: outP, size: statSync(abs(outP)).size });
    log('logo ', c.slug.padEnd(22), (best ? `${c.branco.split('/').pop()} <-> ${best.p.f}` : `${c.branco.split('/').pop()} (só branco)`).padEnd(18), best ? 'dist ' + best.d.toFixed(2) : '', `${meta.width}x${meta.height}`);
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
    const dest = `assets/img/web/siga/${p.slug || p.id}.webp`;
    const item = { id: p.id, type: p.type, url: p.url, cover: null, title: null, alt: p.alt || null };
    try {
      let imgBuf;
      if (p.src) {                                // capa local enviada pelo cliente (Instagram não entrega a imagem sem login)
        imgBuf = readFileSync(abs(p.src));
        item.title = p.alt;
      } else if (p.type === 'youtube') {
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
      const dims = p.type === 'youtube' ? { width: 640, height: 360 } : { width: 640, height: 800 };   // card do Instagram é 4:5
      await sharp(imgBuf).rotate().resize({ ...dims, fit: 'cover', position: 'attention', withoutEnlargement: true })
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
if (want('hero')) await hero();
if (want('videos')) for (const it of manifest.items.filter((i) => i.type === 'video')) await video(it);
if (want('clientes')) await clientes();
if (want('siga')) await siga();
const total = report.reduce((s, r) => s + r.size, 0);
log(`\n${report.length} arquivos gerados nesta execução, ${(total / 1048576).toFixed(1)} MB no total`);
