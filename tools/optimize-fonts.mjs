// Gera WOFF2 subconjunto (Latin) das fontes Raleway (licença OFL permite subconjunto) a partir de referencia/TIPOGRAFIA.
// Quatera Italic NÃO é convertida/alterada (licença Envato): continua o .otf original.
// Uso: node tools/optimize-fonts.mjs
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import subsetFont from 'subset-font';

// Latin básico + Latin-1 + pontuação geral + setas e símbolos que o site usa + qualquer caractere já presente no site
const ranges = [[0x20, 0x7e], [0xa0, 0xff], [0x2010, 0x2027], [0x2030, 0x203a], [0x20ac, 0x20ac], [0x2190, 0x2199], [0x2713, 0x2713]];
let text = '';
for (const [a, b] of ranges) for (let c = a; c <= b; c++) text += String.fromCodePoint(c);
for (const f of ['index.html', 'privacidade.html', 'termos.html', 'assets/css/site.css', 'assets/js/site.js']) text += readFileSync(f, 'utf8');
text = [...new Set(text)].join('');

const fonts = [
  ['referencia/TIPOGRAFIA/Raleway-Regular.ttf', 'assets/fonts/Raleway-Regular.woff2'],
  ['referencia/TIPOGRAFIA/Raleway-SemiBold.ttf', 'assets/fonts/Raleway-SemiBold.woff2'],
  ['referencia/TIPOGRAFIA/Raleway-Bold.ttf', 'assets/fonts/Raleway-Bold.woff2'],
];
for (const [src, out] of fonts) {
  const buf = await subsetFont(readFileSync(src), text, { targetFormat: 'woff2' });
  writeFileSync(out, buf);
  console.log(out, (statSync(src).size / 1024).toFixed(0) + ' KB →', (buf.length / 1024).toFixed(1) + ' KB');
}
