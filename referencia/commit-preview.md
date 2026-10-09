# Pré-visualização do commit

Gerado por `node tools/git-preview.mjs`. Simula `git add -A && git commit`. **Não altera nada.**

HEAD atual: `f3d8281 CTA e GA`

## Resumo

| Tipo | Arquivos | Dados novos no repositório |
|---|---:|---:|
| novo | 152 | 18.4 MB |
| modificado | 10 | 138 KB |
| removido | 84 | — |
| **Total que entra** | **162** | **18.6 MB** |

## Por pasta

| Situação · pasta | Arquivos | Tamanho |
|---|---:|---:|
| novo · assets/video/ | 24 | 10.9 MB |
| novo · assets/img/ | 106 | 4.9 MB |
| novo · referencia/UKERIA - CONSIDERAÇÕES SITE V2.pdf/ | 1 | 2.5 MB |
| modificado · (raiz) | 7 | 95 KB |
| novo · assets/fonts/ | 3 | 80 KB |
| modificado · assets/css/ | 1 | 29 KB |
| novo · tools/package-lock.json/ | 1 | 22 KB |
| novo · tools/media-manifest.json/ | 1 | 18 KB |
| novo · referencia/commit-preview.md/ | 1 | 18 KB |
| modificado · assets/js/ | 2 | 14 KB |
| novo · referencia/mapa-arquivos.md/ | 1 | 12 KB |
| novo · tools/map-files.mjs/ | 1 | 11 KB |
| novo · tools/media-dims.json/ | 1 | 10 KB |
| novo · tools/optimize-media.mjs/ | 1 | 9 KB |
| novo · tools/check-refs.mjs/ | 1 | 8 KB |
| novo · referencia/onda2.md/ | 1 | 7 KB |
| novo · tools/git-preview.mjs/ | 1 | 5 KB |
| novo · tools/clientes-map.json/ | 1 | 3 KB |
| novo · tools/check-media.mjs/ | 1 | 2 KB |
| novo · tools/optimize-fonts.mjs/ | 1 | 1 KB |
| novo · tools/siga-covers.json/ | 1 | 1 KB |
| novo · tools/media-dims.mjs/ | 1 | 1 KB |
| novo · (raiz) | 2 | 1 KB |
| novo · tools/package.json/ | 1 | 0 KB |
| removido · assets/fonts/ | 3 | — |
| removido · assets/img/ | 12 | — |
| removido · assets/video/ | 14 | — |
| removido · old/ | 55 | — |

## Arquivos de 1 MB ou mais que entram

| Tamanho | Situação | Caminho |
|---:|---|---|
| 2.5 MB | novo | referencia/UKERIA - CONSIDERAÇÕES SITE V2.pdf |
| 1.4 MB | novo | assets/video/web/servicos/producao-audiovisual/producao-audiovisual-01.mp4 |
| 1.2 MB | novo | assets/video/web/servicos/cobertura-de-eventos/cobertura-de-eventos-05.mp4 |
| 1.2 MB | novo | assets/video/web/servicos/producao-audiovisual/producao-audiovisual-03.mp4 |
| 1.1 MB | novo | assets/video/web/servicos/producao-audiovisual/producao-audiovisual-05.mp4 |

## Lista completa

### novo (152)

```
     0 KB  .gitignore
    27 KB  assets/fonts/Raleway-Bold.woff2
    26 KB  assets/fonts/Raleway-Regular.woff2
    27 KB  assets/fonts/Raleway-SemiBold.woff2
   142 KB  assets/img/web/ancestralidade-mae-usp.webp
     5 KB  assets/img/web/clientes/aphelia-engenharia-branco.webp
     5 KB  assets/img/web/clientes/aphelia-engenharia-preto.webp
     8 KB  assets/img/web/clientes/atelie-beatriz-barros-branco.webp
     7 KB  assets/img/web/clientes/atelie-beatriz-barros-preto.webp
     8 KB  assets/img/web/clientes/bruna-siolari-branco.webp
     8 KB  assets/img/web/clientes/bruna-siolari-preto.webp
    11 KB  assets/img/web/clientes/celso-kamura-branco.webp
    10 KB  assets/img/web/clientes/celso-kamura-preto.webp
    15 KB  assets/img/web/clientes/chris-loiola-branco.webp
    14 KB  assets/img/web/clientes/chris-loiola-preto.webp
     7 KB  assets/img/web/clientes/ferrasin-advogados-branco.webp
    11 KB  assets/img/web/clientes/ferrasin-advogados-preto.webp
     5 KB  assets/img/web/clientes/fly-print-branco.webp
     5 KB  assets/img/web/clientes/fly-print-preto.webp
     4 KB  assets/img/web/clientes/inova-cursos-brasil-branco.webp
     4 KB  assets/img/web/clientes/inova-cursos-brasil-preto.webp
    12 KB  assets/img/web/clientes/isabela-barbosa-branco.webp
    12 KB  assets/img/web/clientes/isabela-barbosa-preto.webp
    16 KB  assets/img/web/clientes/karine-peres-branco.webp
    15 KB  assets/img/web/clientes/karine-peres-preto.webp
     5 KB  assets/img/web/clientes/lizandra-neves-branco.webp
     5 KB  assets/img/web/clientes/lizandra-neves-preto.webp
    11 KB  assets/img/web/clientes/luxxuoso-branco.webp
    10 KB  assets/img/web/clientes/luxxuoso-preto.webp
     6 KB  assets/img/web/clientes/mania-branco.webp
     6 KB  assets/img/web/clientes/mania-preto.webp
     3 KB  assets/img/web/clientes/multiforme-branco.webp
     3 KB  assets/img/web/clientes/multiforme-preto.webp
     6 KB  assets/img/web/clientes/oba-print-branco.webp
     5 KB  assets/img/web/clientes/oba-print-preto.webp
    15 KB  assets/img/web/clientes/okkabio-branco.webp
    15 KB  assets/img/web/clientes/okkabio-preto.webp
    14 KB  assets/img/web/clientes/owner-entertainment-branco.webp
     9 KB  assets/img/web/clientes/owner-entertainment-preto.webp
    16 KB  assets/img/web/clientes/tati-pugliese-branco.webp
    16 KB  assets/img/web/clientes/tati-pugliese-preto.webp
     5 KB  assets/img/web/clientes/technical-fire-branco.webp
     5 KB  assets/img/web/clientes/technical-fire-preto.webp
     3 KB  assets/img/web/clientes/val-alves-branco.webp
     3 KB  assets/img/web/clientes/val-alves-preto.webp
    14 KB  assets/img/web/clientes/zabotto-beauty-branco.webp
    12 KB  assets/img/web/clientes/zabotto-beauty-preto.webp
    59 KB  assets/img/web/quem-lidera.webp
    14 KB  assets/img/web/servicos/cobertura-de-eventos/cobertura-de-eventos-02-640.webp
    54 KB  assets/img/web/servicos/cobertura-de-eventos/cobertura-de-eventos-02.webp
    25 KB  assets/img/web/servicos/cobertura-de-eventos/cobertura-de-eventos-04-640.webp
   250 KB  assets/img/web/servicos/cobertura-de-eventos/cobertura-de-eventos-04.webp
    17 KB  assets/img/web/servicos/cobertura-de-eventos/cobertura-de-eventos-06-640.webp
    83 KB  assets/img/web/servicos/cobertura-de-eventos/cobertura-de-eventos-06.webp
     9 KB  assets/img/web/servicos/cobertura-de-eventos/cobertura-de-eventos-08-640.webp
    64 KB  assets/img/web/servicos/cobertura-de-eventos/cobertura-de-eventos-08.webp
    15 KB  assets/img/web/servicos/estrategia-de-comunicacao/estrategia-de-comunicacao-01-640.webp
    75 KB  assets/img/web/servicos/estrategia-de-comunicacao/estrategia-de-comunicacao-01.webp
    19 KB  assets/img/web/servicos/estrategia-de-comunicacao/estrategia-de-comunicacao-02-640.webp
    77 KB  assets/img/web/servicos/estrategia-de-comunicacao/estrategia-de-comunicacao-02.webp
    34 KB  assets/img/web/servicos/estrategia-de-comunicacao/estrategia-de-comunicacao-03-640.webp
   199 KB  assets/img/web/servicos/estrategia-de-comunicacao/estrategia-de-comunicacao-03.webp
    16 KB  assets/img/web/servicos/estrategia-de-comunicacao/estrategia-de-comunicacao-04-640.webp
   108 KB  assets/img/web/servicos/estrategia-de-comunicacao/estrategia-de-comunicacao-04.webp
    21 KB  assets/img/web/servicos/estrategia-de-comunicacao/estrategia-de-comunicacao-05-640.webp
   131 KB  assets/img/web/servicos/estrategia-de-comunicacao/estrategia-de-comunicacao-05.webp
    16 KB  assets/img/web/servicos/estrategia-de-comunicacao/estrategia-de-comunicacao-06-640.webp
    75 KB  assets/img/web/servicos/estrategia-de-comunicacao/estrategia-de-comunicacao-06.webp
     8 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-01-640.webp
    30 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-01.webp
    10 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-02-640.webp
    38 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-02.webp
    23 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-03-640.webp
    91 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-03.webp
    12 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-04-640.webp
    45 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-04.webp
    18 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-05-640.webp
    70 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-05.webp
    12 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-06-640.webp
    49 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-06.webp
    10 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-07-640.webp
    40 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-07.webp
    10 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-08-640.webp
    47 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-08.webp
    21 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-09-640.webp
    89 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-09.webp
    21 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-10-640.webp
   126 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-10.webp
    22 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-11-640.webp
   106 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-11.webp
    25 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-12-640.webp
    98 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-12.webp
    41 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-13-640.webp
   272 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-13.webp
    45 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-14-640.webp
   288 KB  assets/img/web/servicos/fotografia-para-marcas/fotografia-para-marcas-14.webp
    42 KB  assets/img/web/servicos/social-media/social-media-01-640.webp
   216 KB  assets/img/web/servicos/social-media/social-media-01.webp
    28 KB  assets/img/web/servicos/social-media/social-media-02-640.webp
   145 KB  assets/img/web/servicos/social-media/social-media-02.webp
    49 KB  assets/img/web/servicos/social-media/social-media-03-640.webp
   384 KB  assets/img/web/servicos/social-media/social-media-03.webp
    21 KB  assets/img/web/servicos/social-media/social-media-04-640.webp
   157 KB  assets/img/web/servicos/social-media/social-media-04.webp
    17 KB  assets/img/web/servicos/social-media/social-media-05-640.webp
    70 KB  assets/img/web/servicos/social-media/social-media-05.webp
    30 KB  assets/img/web/servicos/social-media/social-media-06-640.webp
   217 KB  assets/img/web/servicos/social-media/social-media-06.webp
    31 KB  assets/img/web/siga/yt-01.webp
    32 KB  assets/img/web/siga/yt-02.webp
   775 KB  assets/video/web/servicos/cobertura-de-eventos/cobertura-de-eventos-01.mp4
    10 KB  assets/video/web/servicos/cobertura-de-eventos/cobertura-de-eventos-01.webp
   628 KB  assets/video/web/servicos/cobertura-de-eventos/cobertura-de-eventos-03.mp4
    15 KB  assets/video/web/servicos/cobertura-de-eventos/cobertura-de-eventos-03.webp
   1.2 MB  assets/video/web/servicos/cobertura-de-eventos/cobertura-de-eventos-05.mp4
    66 KB  assets/video/web/servicos/cobertura-de-eventos/cobertura-de-eventos-05.webp
   962 KB  assets/video/web/servicos/cobertura-de-eventos/cobertura-de-eventos-07.mp4
    62 KB  assets/video/web/servicos/cobertura-de-eventos/cobertura-de-eventos-07.webp
   1.4 MB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-01.mp4
    52 KB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-01.webp
   988 KB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-02.mp4
    38 KB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-02.webp
   1.2 MB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-03.mp4
    12 KB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-03.webp
   670 KB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-04.mp4
    22 KB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-04.webp
   1.1 MB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-05.mp4
    11 KB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-05.webp
   507 KB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-06.mp4
    17 KB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-06.webp
   694 KB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-07.mp4
    18 KB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-07.webp
   603 KB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-08.mp4
    12 KB  assets/video/web/servicos/producao-audiovisual/producao-audiovisual-08.webp
     0 KB  git-patch.bat
    18 KB  referencia/commit-preview.md
    12 KB  referencia/mapa-arquivos.md
     7 KB  referencia/onda2.md
   2.5 MB  referencia/UKERIA - CONSIDERAÇÕES SITE V2.pdf
     2 KB  tools/check-media.mjs
     8 KB  tools/check-refs.mjs
     3 KB  tools/clientes-map.json
     5 KB  tools/git-preview.mjs
    11 KB  tools/map-files.mjs
    10 KB  tools/media-dims.json
     1 KB  tools/media-dims.mjs
    18 KB  tools/media-manifest.json
     1 KB  tools/optimize-fonts.mjs
     9 KB  tools/optimize-media.mjs
    22 KB  tools/package-lock.json
     0 KB  tools/package.json
     1 KB  tools/siga-covers.json
```

### modificado (10)

```
    29 KB  assets/css/site.css
    11 KB  assets/js/site.js
     3 KB  assets/js/track.js
    75 KB  index.html
     3 KB  llms.txt
     5 KB  privacidade.html
     7 KB  README.md
     1 KB  robots.txt
     1 KB  sitemap.xml
     4 KB  termos.html
```

### removido (84)

```
        —  assets/fonts/Raleway-Bold.ttf
        —  assets/fonts/Raleway-Regular.ttf
        —  assets/fonts/Raleway-SemiBold.ttf
        —  assets/img/web/av-equipe-gravacao.webp
        —  assets/img/web/av-retrato.webp
        —  assets/img/web/av-salao.webp
        —  assets/img/web/ep-citacao.webp
        —  assets/img/web/ep-marca-em-evidencia.webp
        —  assets/img/web/ep-resultados.webp
        —  assets/img/web/rs-autenticidade.webp
        —  assets/img/web/rs-gift-card.webp
        —  assets/img/web/rs-shiplap.webp
        —  assets/img/web/rt-bastidor-campo.webp
        —  assets/img/web/rt-bastidor-set.webp
        —  assets/img/web/rt-festival.webp
        —  assets/video/web/cobertura-evento.jpg
        —  assets/video/web/cobertura-evento.mp4
        —  assets/video/web/estudio-producao.jpg
        —  assets/video/web/estudio-producao.mp4
        —  assets/video/web/institucional-apresentadora.jpg
        —  assets/video/web/institucional-apresentadora.mp4
        —  assets/video/web/institucional-conferencia.jpg
        —  assets/video/web/institucional-conferencia.mp4
        —  assets/video/web/produto-luxxuoso.jpg
        —  assets/video/web/produto-luxxuoso.mp4
        —  assets/video/web/reels-limpeza.jpg
        —  assets/video/web/reels-limpeza.mp4
        —  assets/video/web/reels-motion.jpg
        —  assets/video/web/reels-motion.mp4
        —  old/assets/images/0217e28a5208696d47905197e1a29240.png
        —  old/assets/images/0662bf402e6d31adb5ed7d556578979f.jpg
        —  old/assets/images/1330d8e203312b02be9b4979ed0b86e8.png
        —  old/assets/images/1534982ebb453f2c5908be73c19a5fca.svg
        —  old/assets/images/17743b864d1c17efcb967aedb191feb9.png
        —  old/assets/images/206550ca1e7e0dce47817aa0ce5872fb.png
        —  old/assets/images/2260b2c2fec10d3bbf1bb8b93e1d08d7.jpg
        —  old/assets/images/229b4a203ac3b62c6815cc097cfb821b.png
        —  old/assets/images/233fe58c45e5bfa3693f68386cbe66e2.png
        —  old/assets/images/35541b795c8c74625b455638e07c0da6.svg
        —  old/assets/images/42d1fa98163820abdd458fb150cd3ebc.jpg
        —  old/assets/images/432300380d34ffc2f3ded872f5726a58.jpg
        —  old/assets/images/469a5d750b58f7e546f4f52ea4db9744.png
        —  old/assets/images/4b6a2e8da4e8298333f4b2016f89d0a0.png
        —  old/assets/images/5190c8a9648e161ad43c500026072c05.png
        —  old/assets/images/5529877d1994be7f09f8459689c67249.png
        —  old/assets/images/58a1285ffc92f15ee9158afdcefaf2d2.png
        —  old/assets/images/5ad2cdac269dfe6436f2bfb71f53cec7.png
        —  old/assets/images/67625cbf017c23cce6b6ccfb98bba6f5.png
        —  old/assets/images/68debacd295c59d37b0d829bed14cd1b.svg
        —  old/assets/images/75323b47628989c0cc31cdda23006b50.jpg
        —  old/assets/images/7ac4472c80a563ff5b3b8964d4c66d58.png
        —  old/assets/images/7f60dfacb716dfd57df9b4bda602924c.jpg
        —  old/assets/images/83cd8af69b234c8bbb22728bfcf96105.png
        —  old/assets/images/8640c90d79369a527a6424a759d1d768.png
        —  old/assets/images/88f2a5f2192ad2c8f8a390e2250bbbf4.jpg
        —  old/assets/images/88fb8d92979c8e0092899e3f9cb9a6ef.jpg
        —  old/assets/images/897582ccef5db873dd71e56edcfa4ead.png
        —  old/assets/images/90b304428011d57e8d47b8c72ea4bb96.png
        —  old/assets/images/929344734af39009b953f93c6cf29731.png
        —  old/assets/images/9bb3a5d34a9e76d748f444e9a9891eaa.svg
        —  old/assets/images/afa3440a6d81093b11dc489935236026.jpg
        —  old/assets/images/b0eb9ad71259838a5a6bde196bfeb8e8.png
        —  old/assets/images/b132dcdd0a4f789644c12d0bfc070c63.png
        —  old/assets/images/da5665114165e83cb760560251f6c8cd.png
        —  old/assets/images/dea4a23d0e62f570c19a25bfa1efc549.png
        —  old/assets/images/e4635eb95847c247cb91f32f3af26f5d.png
        —  old/assets/images/ee82f72edbb3fd329a9846fd91a7f7a2.svg
        —  old/assets/images/ef15319fbd31e83038c974ae090203a4.png
        —  old/assets/images/fae976d16b042776a4708cf37f825fa5.png
        —  old/assets/images/fd0ff832bb5c352bac737735c1c8815f.png
        —  old/assets/images/fd59fd5959b65751603fb9e823491fcf.png
        —  old/assets/images/ferrasin-advogados.svg
        —  old/assets/images/luxxuoso-cosmeticos.svg
        —  old/assets/images/multiforme-filmes.svg
        —  old/assets/images/owner-entertainment.svg
        —  old/assets/images/tati-pugliese.svg
        —  old/assets/videos/09f8db59e879feb31d7f3620787e003a.mp4
        —  old/assets/videos/316522e4283aa2fd9538c23b8c3f7b09.mp4
        —  old/assets/videos/33fcd3b52a1b4a05c2b03feec6f34c2c.mp4
        —  old/assets/videos/4c2a353ff72fec199b618de4dd3adc8c.mp4
        —  old/assets/videos/4c514b6167f972fe2c4baff489710e65.mp4
        —  old/assets/videos/85efa1542886b24627071e7183616535.mp4
        —  old/assets/videos/b47d59e382bfe77bcad171450a7545e5.mp4
        —  old/README.md
```

