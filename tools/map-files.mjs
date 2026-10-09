// Mapeia o que está em uso e o que não está, para decidir o que remover do repositório.
// Uso: node tools/map-files.mjs        (gera referencia/mapa-arquivos.md; não apaga nada)
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, posix, sep } from 'node:path';
import { spawnSync } from 'node:child_process';

const git = (args, input) => spawnSync('git', args, { encoding: 'utf8', maxBuffer: 1 << 28, input }).stdout || '';
const norm = (p) => p.split(sep).join('/');
const low = (p) => p.toLowerCase();
const MB = (n) => (n / 1048576);
const fmt = (n) => (n >= 1073741824 ? (n / 1073741824).toFixed(2) + ' GB' : n >= 1048576 ? MB(n).toFixed(1) + ' MB' : (n / 1024).toFixed(0) + ' KB');

// ---------------------------------------------------------------- arquivos
const files = [];
let nodeModules = { n: 0, size: 0 };
const walk = (d) => {
  for (const f of readdirSync(d)) {
    if (f === '.git') continue;
    const p = join(d, f);
    const st = statSync(p);
    if (st.isDirectory()) { walk(p); continue; }
    const rel = norm(p);
    if (rel.startsWith('tools/node_modules/')) { nodeModules.n++; nodeModules.size += st.size; continue; }
    files.push({ path: rel, size: st.size });
  }
};
walk('.');

// ------------------------------------------------------------- estado no git
const headSet = new Set(git(['ls-tree', '-r', 'HEAD', '--name-only', '-z']).split('\0').filter(Boolean).map(low));
const stagedAdd = new Set(git(['diff', '--cached', '--name-only', '--diff-filter=A', '-z']).split('\0').filter(Boolean).map(low));
const ignoredOut = git(['status', '--porcelain', '--ignored', '-z']).split('\0').filter((l) => l.startsWith('!! ')).map((l) => low(l.slice(3)));
const isIgnored = (p) => ignoredOut.some((i) => (i.endsWith('/') ? low(p).startsWith(i) : low(p) === i));
const gitState = (p) => (headSet.has(low(p)) ? 'versionado' : stagedAdd.has(low(p)) ? 'EM STAGE (pronto p/ commit)' : isIgnored(p) ? 'ignorado' : 'não versionado');

// ------------------------------------------------------ o que o site referencia
const siteFiles = ['index.html', 'privacidade.html', 'termos.html', 'assets/css/site.css', 'assets/js/site.js', 'assets/js/track.js', 'llms.txt', 'sitemap.xml', 'robots.txt'];
const served = new Set();
const re = /[A-Za-z0-9_@%./\-]+\.(?:webp|jpe?g|png|svg|mp4|ttf|otf|woff2?|ico)/g;
for (const f of siteFiles) {
  const txt = readFileSync(f, 'utf8');
  for (const m of txt.matchAll(re)) {
    let ref = m[0].replace(/^(?:https?:)?\/\/[^/]+\//, '');
    if (ref.startsWith('../') || ref.startsWith('./')) ref = posix.normalize(posix.join(dirname(f).split(sep).join('/'), ref));
    served.add(low(ref));
  }
}
const siteSet = new Set(siteFiles.map(low));

// ---------------------------------------------------------------- classificar
const hasDir = (p, d) => low(p).startsWith(d);
function classify(f) {
  const p = f.path, l = low(p);
  if (served.has(l)) return 'servido';
  if (siteSet.has(l)) return 'codigo';
  if (hasDir(p, 'remover/')) return 'remover';
  if (hasDir(p, 'referencia/v2/')) return 'original-v2';
  if (/^referencia\/(elementos|logotipo|tipografia)\//.test(l)) return 'marca';
  if (hasDir(p, 'referencia/')) return 'documentos';
  if (/^(tools\/|readme\.md|\.gitignore|git-patch\.bat)/.test(l)) return 'ferramentas';
  if (/\/clientes\/[^/]+-preto\.webp$/.test(l) || hasDir(p, 'assets/brand/')) return 'reservado';   // variantes de marca guardadas de propósito
  if (hasDir(p, 'assets/')) return 'sem-uso';
  return 'outros';
}
const GROUPS = {
  servido: ['Servido pelo site', 'manter'],
  codigo: ['Código e arquivos do site', 'manter'],
  reservado: ['Reservado (variantes de logo)', 'manter (logos pretos para overlays e símbolos)'],
  ferramentas: ['Ferramentas e README', 'manter'],
  documentos: ['Documentos e relatórios (referencia/)', 'manter'],
  marca: ['Fontes da marca (ELEMENTOS, LOGOTIPO, TIPOGRAFIA)', 'manter; PSD/PDF grandes: ver recomendações'],
  'original-v2': ['Originais do cliente V2 (referencia/v2)', 'manter fora do Git'],
  remover: ['Já separado em remover/ (aguardando exclusão)', 'excluir quando confirmar'],
  'sem-uso': ['Em assets/ sem referência', 'remover'],
  outros: ['Outros', 'avaliar'],
};
for (const f of files) { f.group = classify(f); f.git = gitState(f.path); }

// zips redundantes (mesmo nome de uma pasta já extraída)
const dirsV2 = new Set(files.filter((f) => hasDir(f.path, 'referencia/v2/')).map((f) => low(dirname(f.path))));
for (const f of files) {
  if (f.group === 'original-v2' && f.path.toLowerCase().endsWith('.zip')) {
    const asDir = low(f.path.slice(0, -4));
    f.zip = dirsV2.has(asDir) || /drive-download/i.test(f.path);
  }
}

function recommend(f) {
  if (f.zip) return 'REMOVER — zip duplica a pasta extraída';
  switch (f.group) {
    case 'remover': return 'JÁ EM remover/ — excluir quando confirmar';
    case 'sem-uso': return 'REMOVER';
    case 'original-v2': return f.git.startsWith('EM STAGE') ? 'FORA DO GIT — tirar do stage (já está no .gitignore)' : 'manter só no disco local';
    case 'marca': return f.size > 20 * 1048576 ? 'DECISÃO — arquivo-fonte grande: mover para armazenamento externo ou Git LFS' : 'manter (fonte de marca; não é servido)';
    case 'documentos': return f.size > 20 * 1048576 ? 'DECISÃO — PDF grande: mover para armazenamento externo ou Git LFS' : 'manter';
    case 'servido': return 'EM USO — manter';
    default: return 'manter';
  }
}

// ---------------------------------------------------------------- relatório
const sum = (arr) => arr.reduce((s, f) => s + f.size, 0);
let md = `# Mapa de arquivos: em uso × sem uso\n\nGerado por \`node tools/map-files.mjs\` em ${new Date().toISOString().slice(0, 10)}. **Este relatório não apaga nada.**\n\n`;

md += `## 1. Resumo por grupo\n\n| Grupo | Arquivos | Tamanho | Ação sugerida |\n|---|---:|---:|---|\n`;
for (const [k, [nome, acao]] of Object.entries(GROUPS)) {
  const g = files.filter((f) => f.group === k);
  if (g.length) md += `| ${nome} | ${g.length} | ${fmt(sum(g))} | ${acao} |\n`;
}
md += `| Dependências das ferramentas (\`tools/node_modules\`, no \`.gitignore\`) | ${nodeModules.n} | ${fmt(nodeModules.size)} | não versionar |\n`;
md += `\n**Total em uso pelo site (servido + código):** ${fmt(sum(files.filter((f) => ['servido', 'codigo'].includes(f.group))))}\n`;

// git
const gitDir = (() => { let t = 0; const w = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); const s = statSync(p); s.isDirectory() ? w(p) : (t += s.size); } }; w('.git'); return t; })();
const stagedV2 = files.filter((f) => f.group === 'original-v2' && f.git.startsWith('EM STAGE'));
const stagedAll = files.filter((f) => f.git.startsWith('EM STAGE'));
md += `\n## 2. Situação do Git\n\n- Tamanho de \`.git\`: **${fmt(gitDir)}**.\n`;
md += `- Arquivos de \`referencia/v2\` **em stage** (adicionados ao índice, ainda sem commit): **${stagedV2.length} arquivos, ${fmt(sum(stagedV2))}**. `
  + (stagedV2.length ? `**Um commit agora levaria esses ${fmt(sum(stagedV2))} para o repositório.** O \`.gitignore\` não desfaz um \`git add\` já feito.\n` : 'Nenhum.\n');
md += `- Total em stage (todos os grupos): ${stagedAll.length} arquivos, ${fmt(sum(stagedAll))}.\n`;

// maiores blobs do histórico
const objs = git(['rev-list', '--objects', '--all']);
const batch = spawnSync('git', ['cat-file', '--batch-check=%(objecttype) %(objectsize) %(rest)'], { encoding: 'utf8', input: objs.split('\n').map((l) => l.split(' ')[0]).join('\n') + '\n', maxBuffer: 1 << 28 }).stdout;
const names = new Map(objs.split('\n').filter(Boolean).map((l) => { const i = l.indexOf(' '); return [l.slice(0, i), l.slice(i + 1)]; }));
const heavy = [];
const oids = objs.split('\n').filter(Boolean).map((l) => l.split(' ')[0]);
batch.split('\n').filter(Boolean).forEach((line, i) => { const [t, s] = line.split(' '); if (t === 'blob' && +s > 5 * 1048576) heavy.push({ size: +s, name: names.get(oids[i]) || '?' }); });
heavy.sort((a, b) => b.size - a.size);
md += `\n### Maiores arquivos no **histórico** do Git (> 5 MB)\n\n| Tamanho | Caminho | Ainda existe no projeto? |\n|---:|---|---|\n`;
for (const h of heavy.slice(0, 15)) md += `| ${fmt(h.size)} | ${h.name} | ${existsSync(h.name) ? 'sim' : 'não (só no histórico)'} |\n`;
md += `\n> Apagar um arquivo hoje **não reduz o \`.git\`**: o conteúdo continua no histórico. Para encolher o repositório é preciso reescrever o histórico (\`git filter-repo\`), o que muda todos os hashes e exige \`push --force\`. Só vale a pena se o repositório já foi publicado e o tamanho incomoda.\n`;

// arquivos grandes
md += `\n## 3. Arquivos grandes (≥ 1 MB) e o que fazer com cada um\n\n| Tamanho | Caminho | Grupo | Git | Recomendação |\n|---:|---|---|---|---|\n`;
const big = files.filter((f) => f.size >= 1048576).sort((a, b) => b.size - a.size);
const cap = 60;
for (const f of big.slice(0, cap)) md += `| ${fmt(f.size)} | ${f.path} | ${GROUPS[f.group][0].split(' (')[0]} | ${f.git} | ${recommend(f)} |\n`;
if (big.length > cap) md += `| … | ${big.length - cap} outros arquivos ≥ 1 MB (${fmt(sum(big.slice(cap)))}) | | | ver grupos |\n`;

// resumo do que remover
const rem = files.filter((f) => f.zip || ['remover', 'sem-uso'].includes(f.group));
md += `\n## 4. Resumo do que pode ser removido\n\n| Item | Arquivos | Tamanho |\n|---|---:|---:|\n`;
const zips = files.filter((f) => f.zip);
md += `| Zips redundantes em \`referencia/v2\` | ${zips.length} | ${fmt(sum(zips))} |\n`;
md += `| Já separado em \`remover/\` | ${files.filter((f) => f.group === 'remover').length} | ${fmt(sum(files.filter((f) => f.group === 'remover')))} |\n`;
md += `| Mídia sem referência em \`assets/\` | ${files.filter((f) => f.group === 'sem-uso').length} | ${fmt(sum(files.filter((f) => f.group === 'sem-uso')))} |\n`;
md += `| **Total** | **${rem.length}** | **${fmt(sum(rem))}** |\n`;
md += `\nNão entram na conta: \`referencia/v2\` (originais, ${fmt(sum(files.filter((f) => f.group === 'original-v2' && !f.zip)))} — ficam no disco, fora do Git), as fontes da marca e os PDFs/PSD grandes (decisão sua, ver seção 3).\n`;

// lista completa do que não está em uso
md += `\n## 5. Lista do que NÃO está em uso (exceto zips, já listados)\n\n`;
for (const k of ['remover', 'sem-uso']) {
  const g = files.filter((f) => f.group === k).sort((a, b) => b.size - a.size);
  if (!g.length) continue;
  md += `### ${GROUPS[k][0]} (${g.length} arquivos, ${fmt(sum(g))})\n\n`;
  const porPasta = new Map();
  for (const f of g) { const d = dirname(f.path); const o = porPasta.get(d) || { n: 0, s: 0 }; o.n++; o.s += f.size; porPasta.set(d, o); }
  md += '| Pasta | Arquivos | Tamanho |\n|---|---:|---:|\n' + [...porPasta].map(([d, o]) => `| ${d}/ | ${o.n} | ${fmt(o.s)} |`).join('\n') + '\n\n';
}

md += `## 6. Comandos sugeridos (NÃO executados)

\`\`\`bash
# 1) Tirar referencia/V2 do stage (os arquivos continuam no disco)
git rm -r --cached referencia/V2

# 2) Registrar no Git a saída do legado (old/ foi movido para remover/)
git add -A old

# 3) Quando confirmar, excluir de vez (remover/ está no .gitignore)
#    apague a pasta remover/ pelo Explorer ou: rm -r remover

# 4) Liberar o espaço dos objetos soltos que o git add criou (depois do passo 1)
git gc --prune=now
\`\`\`
`;
writeFileSync('referencia/mapa-arquivos.md', md);
console.log(md.split('\n').slice(0, 40).join('\n'));
