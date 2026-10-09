# Mapa de arquivos: em uso × sem uso

Gerado por `node tools/map-files.mjs` em 2026-10-09. **Este relatório não apaga nada.**

## 1. Resumo por grupo

| Grupo | Arquivos | Tamanho | Ação sugerida |
|---|---:|---:|---|
| Servido pelo site | 119 | 15.8 MB | manter |
| Código e arquivos do site | 9 | 131 KB | manter |
| Reservado (variantes de logo) | 24 | 186 KB | manter (logos pretos para overlays e símbolos) |
| Ferramentas e README | 18 | 110 KB | manter |
| Documentos e relatórios (referencia/) | 13 | 70.7 MB | manter |
| Fontes da marca (ELEMENTOS, LOGOTIPO, TIPOGRAFIA) | 57 | 87.3 MB | manter; PSD/PDF grandes: ver recomendações |
| Originais do cliente V2 (referencia/v2) | 86 | 4.64 GB | manter fora do Git |
| Já separado em remover/ (aguardando exclusão) | 127 | 2.76 GB | excluir quando confirmar |
| Dependências das ferramentas (`tools/node_modules`, no `.gitignore`) | 212 | 23.2 MB | não versionar |

**Total em uso pelo site (servido + código):** 15.9 MB

## 2. Situação do Git

- Tamanho de `.git`: **7.49 GB**.
- Arquivos de `referencia/v2` **em stage** (adicionados ao índice, ainda sem commit): **0 arquivos, 0 KB**. Nenhum.
- Total em stage (todos os grupos): 0 arquivos, 0 KB.

### Maiores arquivos no **histórico** do Git (> 5 MB)

| Tamanho | Caminho | Ainda existe no projeto? |
|---:|---|---|
| 91.3 MB | old/assets/videos/09f8db59e879feb31d7f3620787e003a.mp4 | não (só no histórico) |
| 68.0 MB | referencia/UKERIA - BRANDBOOK.pdf | sim |
| 65.2 MB | old/assets/videos/85efa1542886b24627071e7183616535.mp4 | não (só no histórico) |
| 63.2 MB | referencia/ELEMENTOS/elementos-ukeria.psd | sim |
| 44.4 MB | old/assets/videos/33fcd3b52a1b4a05c2b03feec6f34c2c.mp4 | não (só no histórico) |
| 18.2 MB | old/assets/videos/b47d59e382bfe77bcad171450a7545e5.mp4 | não (só no histórico) |
| 17.5 MB | old/assets/videos/4c514b6167f972fe2c4baff489710e65.mp4 | não (só no histórico) |
| 5.8 MB | old/assets/videos/4c2a353ff72fec199b618de4dd3adc8c.mp4 | não (só no histórico) |

> Apagar um arquivo hoje **não reduz o `.git`**: o conteúdo continua no histórico. Para encolher o repositório é preciso reescrever o histórico (`git filter-repo`), o que muda todos os hashes e exige `push --force`. Só vale a pena se o repositório já foi publicado e o tamanho incomoda.

## 3. Arquivos grandes (≥ 1 MB) e o que fazer com cada um

| Tamanho | Caminho | Grupo | Git | Recomendação |
|---:|---|---|---|---|
| 2.14 GB | referencia/V2/producao-audiovisual/4 PRODUÇÃO AUDIOVISUAL-001.mp4 | Originais do cliente V2 | ignorado | manter só no disco local |
| 1.93 GB | remover/referencia-v2/producao-audiovisual/drive-download-20261009T140514Z-1-002.zip | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| 596.3 MB | referencia/V2/producao-audiovisual/3 PRODUÇÃO AUDIOVISUAL.mp4 | Originais do cliente V2 | ignorado | manter só no disco local |
| 500.1 MB | referencia/V2/producao-audiovisual/6 PRODUÇÃO AUDIOVISUAL.mp4 | Originais do cliente V2 | ignorado | manter só no disco local |
| 364.3 MB | remover/referencia-v2/cobertura-de-eventos.zip | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| 357.8 MB | referencia/V2/producao-audiovisual/7 PRODUÇÃO AUDIOVISUAL.mov | Originais do cliente V2 | ignorado | manter só no disco local |
| 236.6 MB | referencia/V2/producao-audiovisual/5 PRODUÇÃO AUDIOVISUAL.mp4 | Originais do cliente V2 | ignorado | manter só no disco local |
| 219.9 MB | referencia/V2/cobertura-de-eventos/COBERTURA DE EVENTOS 7.mov | Originais do cliente V2 | ignorado | manter só no disco local |
| 203.1 MB | referencia/V2/producao-audiovisual/2 PRODUÇÃO AUDIOVISUAL.mov | Originais do cliente V2 | ignorado | manter só no disco local |
| 183.1 MB | remover/referencia-v2/fotografia-para-marcas.zip | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| 91.3 MB | remover/old/assets/videos/09f8db59e879feb31d7f3620787e003a.mp4 | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| 74.1 MB | referencia/V2/producao-audiovisual/1 PRODUÇÃO AUDIOVISUAL.mp4 | Originais do cliente V2 | ignorado | manter só no disco local |
| 68.0 MB | referencia/UKERIA - BRANDBOOK.pdf | Documentos e relatórios | versionado | DECISÃO — PDF grande: mover para armazenamento externo ou Git LFS |
| 65.2 MB | remover/old/assets/videos/85efa1542886b24627071e7183616535.mp4 | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| 63.2 MB | referencia/ELEMENTOS/elementos-ukeria.psd | Fontes da marca | versionado | DECISÃO — arquivo-fonte grande: mover para armazenamento externo ou Git LFS |
| 44.4 MB | remover/old/assets/videos/33fcd3b52a1b4a05c2b03feec6f34c2c.mp4 | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| 44.2 MB | referencia/V2/cobertura-de-eventos/COBERTURA DE EVENTOS 1.MOV | Originais do cliente V2 | ignorado | manter só no disco local |
| 41.6 MB | referencia/V2/fotografia-para-marcas/empresarial 4.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 41.2 MB | referencia/V2/fotografia-para-marcas/empresarial 5.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 41.0 MB | referencia/V2/cobertura-de-eventos/COBERTURA DE EVENTOS 6.mov | Originais do cliente V2 | ignorado | manter só no disco local |
| 32.3 MB | referencia/V2/fotografia-para-marcas/empresarial 2.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 31.5 MB | referencia/V2/fotografia-para-marcas/empresarial 3.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 18.2 MB | remover/old/assets/videos/b47d59e382bfe77bcad171450a7545e5.mp4 | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| 17.5 MB | remover/old/assets/videos/4c514b6167f972fe2c4baff489710e65.mp4 | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| 17.2 MB | referencia/V2/cobertura-de-eventos/COBERTURA DE EVENTOS 5.mp4 | Originais do cliente V2 | ignorado | manter só no disco local |
| 16.4 MB | referencia/V2/cobertura-de-eventos/COBERTURA DE EVENTOS 3.JPG | Originais do cliente V2 | ignorado | manter só no disco local |
| 16.3 MB | remover/referencia-v2/social-media.zip | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| 15.7 MB | referencia/V2/cobertura-de-eventos/COBERTURA DE EVENTOS 4.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 11.4 MB | referencia/V2/fotografia-para-marcas/empresarial 1.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 9.3 MB | remover/referencia-v2/estrategia-de-comunicacao.zip | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| 8.8 MB | referencia/V2/social-media/3 SOCIAL MEDIA.png | Originais do cliente V2 | ignorado | manter só no disco local |
| 8.2 MB | referencia/V2/cobertura-de-eventos/COBERTURA DE EVENTOS 2.JPG | Originais do cliente V2 | ignorado | manter só no disco local |
| 8.2 MB | referencia/V2/fotografia-para-marcas/retrato corporativo 2.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 7.7 MB | referencia/V2/fotografia-para-marcas/retrato corporativo 3.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 5.8 MB | remover/old/assets/videos/4c2a353ff72fec199b618de4dd3adc8c.mp4 | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| 5.1 MB | referencia/V2/quem-lidera.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 4.6 MB | referencia/V2/producao-audiovisual/8 produção.mp4 | Originais do cliente V2 | ignorado | manter só no disco local |
| 4.3 MB | remover/referencia-v2/clientes-logos-branco.zip | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| 4.3 MB | remover/referencia-v2/clientes-logos-preto.zip | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| 3.1 MB | remover/old/assets/videos/316522e4283aa2fd9538c23b8c3f7b09.mp4 | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| 2.9 MB | referencia/V2/fotografia-para-marcas/retrato corporativo 5.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 2.6 MB | referencia/V2/fotografia-para-marcas/retrato corporativo 4.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 2.5 MB | referencia/UKERIA - CONSIDERAÇÕES SITE V2.pdf | Documentos e relatórios | não versionado | manter |
| 2.3 MB | referencia/V2/estrategia-de-comunicacao/estratégia 3.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 2.1 MB | referencia/V2/fotografia-para-marcas/retrato corporativo 1.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 2.1 MB | referencia/V2/estrategia-de-comunicacao/estratégia 4.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 2.0 MB | referencia/V2/estrategia-de-comunicacao/estratégia 5.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 1.9 MB | referencia/V2/social-media/1 SOCIAL MEDIA.png | Originais do cliente V2 | ignorado | manter só no disco local |
| 1.9 MB | referencia/V2/social-media/2 SOCIAL MEDIA.png | Originais do cliente V2 | ignorado | manter só no disco local |
| 1.7 MB | referencia/ELEMENTOS/mola.png | Fontes da marca | versionado | manter (fonte de marca; não é servido) |
| 1.7 MB | referencia/ELEMENTOS/mola-2.png | Fontes da marca | versionado | manter (fonte de marca; não é servido) |
| 1.6 MB | referencia/ELEMENTOS/bola-grande-laranja.png | Fontes da marca | versionado | manter (fonte de marca; não é servido) |
| 1.6 MB | referencia/V2/social-media/4 SOCIAL MEDIA.png | Originais do cliente V2 | ignorado | manter só no disco local |
| 1.6 MB | referencia/V2/cobertura-de-eventos/COBERTURA DE EVENTOS 8.jpg | Originais do cliente V2 | ignorado | manter só no disco local |
| 1.6 MB | referencia/ELEMENTOS/mola-curta.png | Fontes da marca | versionado | manter (fonte de marca; não é servido) |
| 1.6 MB | referencia/ELEMENTOS/bola-grande-bege.png | Fontes da marca | versionado | manter (fonte de marca; não é servido) |
| 1.6 MB | referencia/ELEMENTOS/bola-grande-amarelo.png | Fontes da marca | versionado | manter (fonte de marca; não é servido) |
| 1.6 MB | referencia/ELEMENTOS/bola-grande-verde.png | Fontes da marca | versionado | manter (fonte de marca; não é servido) |
| 1.5 MB | referencia/V2/social-media/6 SOCIAL MEDIA.png | Originais do cliente V2 | ignorado | manter só no disco local |
| 1.5 MB | remover/video-v2-slow-jpg/servicos/producao-audiovisual/producao-audiovisual-01.mp4 | Já separado em remover/ | ignorado | JÁ EM remover/ — excluir quando confirmar |
| … | 14 outros arquivos ≥ 1 MB (17.2 MB) | | | ver grupos |

## 4. Resumo do que pode ser removido

| Item | Arquivos | Tamanho |
|---|---:|---:|
| Zips redundantes em `referencia/v2` | 0 | 0 KB |
| Já separado em `remover/` | 127 | 2.76 GB |
| Mídia sem referência em `assets/` | 0 | 0 KB |
| **Total** | **127** | **2.76 GB** |

Não entram na conta: `referencia/v2` (originais, 4.64 GB — ficam no disco, fora do Git), as fontes da marca e os PDFs/PSD grandes (decisão sua, ver seção 3).

## 5. Lista do que NÃO está em uso (exceto zips, já listados)

### Já separado em remover/ (aguardando exclusão) (127 arquivos, 2.76 GB)

| Pasta | Arquivos | Tamanho |
|---|---:|---:|
| remover/referencia-v2/producao-audiovisual/ | 1 | 1.93 GB |
| remover/referencia-v2/ | 6 | 581.6 MB |
| remover/old/assets/videos/ | 7 | 245.6 MB |
| remover/video-v2-slow-jpg/servicos/producao-audiovisual/ | 16 | 7.8 MB |
| remover/video-v2-slow-jpg/servicos/cobertura-de-eventos/ | 8 | 3.9 MB |
| remover/old/assets/video-web-v1/ | 14 | 4.1 MB |
| remover/old/assets/images/ | 47 | 8.2 MB |
| remover/fonts-ttf/ | 3 | 479 KB |
| remover/old/assets/img-web-v1/ | 12 | 388 KB |
| remover/posters-jpg-v2/ | 12 | 502 KB |
| remover/old/ | 1 | 0 KB |

## 6. Comandos sugeridos (NÃO executados)

```bash
# 1) Tirar referencia/V2 do stage (os arquivos continuam no disco)
git rm -r --cached referencia/V2

# 2) Registrar no Git a saída do legado (old/ foi movido para remover/)
git add -A old

# 3) Quando confirmar, excluir de vez (remover/ está no .gitignore)
#    apague a pasta remover/ pelo Explorer ou: rm -r remover

# 4) Liberar o espaço dos objetos soltos que o git add criou (depois do passo 1)
git gc --prune=now
```
