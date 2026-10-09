// Mostra EXATAMENTE o que iria para o Git se você rodar `git add -A && git commit`.
// Não altera índice, árvore de trabalho nem objetos: usa apenas `git add -A --dry-run` e leitura.
// Uso: node tools/git-preview.mjs [--sem-v2]     (--sem-v2 simula tirar referencia/V2 do stage antes)
import { spawnSync } from 'node:child_process';
import { statSync, writeFileSync, existsSync } from 'node:fs';

const SEM_V2 = process.argv.includes('--sem-v2');
const git = (args, input) => {
  const r = spawnSync('git', ['-c', 'core.quotepath=false', ...args], { encoding: 'utf8', maxBuffer: 1 << 29, input });
  return r.stdout || '';
};
const fmt = (n) => (n >= 1073741824 ? (n / 1073741824).toFixed(2) + ' GB' : n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : (n / 1024).toFixed(0) + ' KB');
const key = (p) => p.toLowerCase();   // Windows: V2 e v2 são o mesmo caminho no disco

// índice atual (path -> sha) e HEAD (path -> sha)
const parseLs = (out) => new Map(out.split('\0').filter(Boolean).map((l) => { const [meta, path] = l.split('\t'); return [path, meta.split(' ')[meta.split(' ').length === 3 ? 1 : 1]]; }));
const index = parseLs(git(['ls-files', '-s', '-z']));
const head = new Map(git(['ls-tree', '-r', 'HEAD', '-z']).split('\0').filter(Boolean).map((l) => { const [meta, path] = l.split('\t'); return [path, meta.split(' ')[2]]; }));

// o que `git add -A` acrescentaria / removeria além do que já está em stage
const adds = [], removes = [];
for (const line of git(['add', '-A', '--dry-run']).split('\n')) {
  const m = line.match(/^(add|remove) '(.*)'$/);
  if (!m) continue;
  (m[1] === 'add' ? adds : removes).push(m[2]);
}

// índice final = índice atual + adds − removes
const final = new Map(index);
const worktree = new Set(adds);          // caminhos cujo conteúdo virá do disco
for (const p of removes) final.delete(p);
for (const p of adds) final.set(p, null);
if (SEM_V2) for (const p of [...final.keys()]) if (/^referencia\/v2\//i.test(p)) final.delete(p);

// tamanhos
const sizeOf = (p, sha) => {
  if (worktree.has(p) && existsSync(p)) return statSync(p).size;
  if (sha) return Number(git(['cat-file', '-s', sha]).trim()) || 0;
  return existsSync(p) ? statSync(p).size : 0;
};
const rows = [];
for (const [p, sha] of final) {
  const inHead = head.has(p);
  let status;
  if (!inHead) status = 'novo';
  else if (worktree.has(p) || head.get(p) !== sha) status = 'modificado';
  else continue;                           // idêntico ao HEAD: não entra no commit
  rows.push({ p, status, size: sizeOf(p, sha) });
}
for (const [p] of head) if (!final.has(p)) rows.push({ p, status: 'removido', size: 0 });
// caminhos que existem no HEAD com outra caixa (V2 x v2) já cobertos acima pelo nome exato do índice

const sum = (a) => a.reduce((s, r) => s + r.size, 0);
const top = (p) => (p.includes('/') ? p.split('/').slice(0, p.startsWith('assets/') || p.startsWith('referencia/') || p.startsWith('tools/') ? 2 : 1).join('/') + '/' : '(raiz)');
const by = new Map();
for (const r of rows) { const k = `${r.status} · ${top(r.p)}`; const o = by.get(k) || { n: 0, size: 0 }; o.n++; o.size += r.size; by.set(k, o); }

let md = `# Pré-visualização do commit\n\nGerado por \`node tools/git-preview.mjs${SEM_V2 ? ' --sem-v2' : ''}\`. Simula \`git add -A && git commit\`. **Não altera nada.**\n\n`;
md += `HEAD atual: \`${git(['log', '--oneline', '-1']).trim()}\`\n\n`;
const novos = rows.filter((r) => r.status !== 'removido');
md += `## Resumo\n\n| Tipo | Arquivos | Dados novos no repositório |\n|---|---:|---:|\n`;
for (const s of ['novo', 'modificado', 'removido']) { const g = rows.filter((r) => r.status === s); md += `| ${s} | ${g.length} | ${s === 'removido' ? '—' : fmt(sum(g))} |\n`; }
md += `| **Total que entra** | **${novos.length}** | **${fmt(sum(novos))}** |\n`;
md += `\n## Por pasta\n\n| Situação · pasta | Arquivos | Tamanho |\n|---|---:|---:|\n`;
for (const [k, o] of [...by].sort((a, b) => b[1].size - a[1].size)) md += `| ${k} | ${o.n} | ${o.size ? fmt(o.size) : '—'} |\n`;
md += `\n## Arquivos de 1 MB ou mais que entram\n\n| Tamanho | Situação | Caminho |\n|---:|---|---|\n`;
const big = novos.filter((r) => r.size >= 1048576).sort((a, b) => b.size - a.size);
for (const r of big) md += `| ${fmt(r.size)} | ${r.status} | ${r.p} |\n`;
if (!big.length) md += `| — | — | nenhum |\n`;
md += `\n## Lista completa\n\n`;
for (const s of ['novo', 'modificado', 'removido']) {
  const g = rows.filter((r) => r.status === s).sort((a, b) => a.p.localeCompare(b.p));
  if (!g.length) continue;
  md += `### ${s} (${g.length})\n\n\`\`\`\n${g.map((r) => `${r.size ? fmt(r.size).padStart(9) : '        —'}  ${r.p}`).join('\n')}\n\`\`\`\n\n`;
}
writeFileSync(SEM_V2 ? 'referencia/commit-preview-sem-v2.md' : 'referencia/commit-preview.md', md);
console.log(md.split('\n## Lista completa')[0]);
