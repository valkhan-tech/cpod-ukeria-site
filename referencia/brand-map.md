# Ukêria Produções — Brand Map (Fase 1)

Fonte de verdade: `UKERIA - BRANDBOOK.pdf` (Estúdio Artemísia). Catálogo dos arquivos de `LOGOTIPO/`, `ELEMENTOS/` e `TIPOGRAFIA/` cruzado com o brandbook. Versão machine-readable: [brand-map.json](brand-map.json).

> **Checklist de compliance:** a skill `ukeria-brand-compliance` não está instalada; o checklist operacional é [UKERIA - BRANDBOOK.md](UKERIA%20-%20BRANDBOOK.md) (Brandbook V2). Este mapa foi reconciliado com ele, com o PDF e com os arquivos. Onde divergem, está sinalizado.

---

## 1. Logotipo

Logotipo tipografico em caixa baixa, em **Unbounded Bold**. Os grafismos ao redor e dentro dos tipos remetem às pinturas corporais Terena. Dentro do "a" há uma íris que forma um olho (Uke = olho, em Terena). O acento circunflexo guia a pronúncia (uke·ria).

São 3 variações, escolhidas pelo espaço e pelo suporte:

| Variação | Uso indicado | Arquivos |
|---|---|---|
| **Completo** (com "produções") | Logotipo principal, maioria dos suportes. Pode levar a assinatura "produtora audiovisual & canais digitais". | `logo-completo.svg`, `logo-completo-{bege-01,bege-02,bege-03,preto-ukeria,branco,preto-000}.png` (2533×955) |
| **Tipográfico** (só "ukêria") | Espaços horizontais menores. | `logo-tipografico.svg`, `logo-tipografico-{bege-01,bege-02,bege-03,preto-ukeria,branco,preto-000}.png` (2533×568) |
| **Símbolo** (o "a" com olho) | Marcas d'água e imagem de perfil. | `logo-simbolo.svg`, `logo-simbolo-{bege-01,bege-02,bege-03,preto-ukeria,branco,preto-000}.png` (608×411) |
| Amostra | Referência de aplicação (fundos Bege 01, Laranja, Amarelo, Verde). **Não é asset de produção.** | `logo-amostra.png` (6509×2930) |

### Regras adicionais do checklist
- Unbounded Bold é **exclusiva do wordmark**: nunca em título ou corpo.
- Laranja/Amarelo/Verde proibidos no logo **em qualquer estado** (hover, dark mode etc.).
- Símbolo: só marca d'água e avatar/foto de perfil. **Nunca** como logo principal de uma página.
- O checklist lista as variações como (1) principal, (2) logo em chapa de cor, (3) símbolo abstrato. Mapeamento com os arquivos (**interpretação, confirmar com a designer**): (1) = completo (tipográfico é o wordmark sem "produções"); (2) = `logo-amostra.png`, sem PNG por chapa; (3) = simbolo.

### Cores permitidas do logotipo
- **Oficiais:** Preto Ukêria (#141414), Bege 01, Bege 02, Bege 03.
- **Técnicas (só quando fornecedor pedir):** Branco e Preto #000000.
- **Proibido:** Laranja, Amarelo, Verde no logotipo. Também é proibida combinação tom-sobre-tom, exceto entre os tons de Bege.
- Fundos laranja, amarelo e verde são permitidos, com o logo em Preto Ukêria ou Bege (ver `logo-amostra.png`).

Arquivos PNG: todos RGBA (fundo transparente). SVGs: vetoriais, cor única.

---

## 2. Cores

| Nome | HEX | RGB | CMYK |
|---|---|---|---|
| Branco | #ffffff | 255 255 255 | 0 0 0 0 |
| Bege 01 | #ded0c4 | 222 208 196 | 15 20 25 1 |
| Bege 02 | #c0a58e | 192 165 142 | 26 30 40 9 |
| Bege 03 | #a88363 | 168 131 99 | 30 40 60 20 |
| Preto Ukêria | #141414 | 20 20 20 | impresso no PDF como "100 100 100" (truncado, ver Lacunas) |
| Verde 01 | #b3b48e | 179 180 142 | 35 20 50 4 |
| Verde 02 | #999a67 | 153 154 103 | 39 23 65 12 |
| Verde 03 | #7b7b52 | 123 123 82 | 50 35 70 20 |
| Verde 04 | #626242 | 98 98 66 | 60 44 74 40 |
| Verde 05 | #3e3e2a | 62 62 42 | 64 53 76 61 |
| Laranja 01 | #ffb387 | 255 179 135 | 0 40 50 0 |
| Laranja 02 | #ff8139 | 255 129 57 | 0 60 79 0 |
| Laranja 03 | #fa5b00 | 250 91 0 | 1 75 100 0 |
| Laranja 04 | #c84900 | 200 73 0 | 16 80 100 5 |
| Amarelo 01 | #f4f7c1 | 244 247 193 | 10 0 30 0 |
| Amarelo 02 | #e7ec74 | 231 236 116 | 15 0 65 0 |
| Amarelo 03 | #dce436 | 220 228 54 | 20 0 80 0 |
| Amarelo 04 | #bfc71b | 191 199 27 | 35 5 100 0 |

**Conceito:** cor é luz. Monocromia, luz e sombra, com cores brilhantes (laranja, amarelo) e terrosas (beges, verdes) que remetem ao território e aos povos originários.

**5 cores principais** (uso geral): Preto Ukêria, Branco/Bege claro (Bege 01), Amarelo 03, Laranja 03, Verde 05.

**Utilização (sugestões, não restrições):**
- Fundos (sempre cor chapada; nunca degradê direto no fundo da página): Bege 01, Bege 03, Verde 05, Amarelo 03.
- Formas geométricas em degradê sobre o fundo: Bege 03, Verde 03, Laranja 03, Amarelo 03.
- Novas combinações são permitidas, mantendo a lógica de contraste das combinações sugeridas.

---

## 3. Tipografia

| Papel | Fonte | Arquivo |
|---|---|---|
| Logotipo | **Unbounded Bold** | `TIPOGRAFIA/Logotipo/Unbounded-Bold.ttf` (também `Unbounded-Black.ttf`, não citada no brandbook) |
| Destaques de título / subtítulo | **Quatera Italic** (serifada) | `TIPOGRAFIA/Quatera-Italic.otf` (licença Envato, ver abaixo) |
| Subtítulo / texto corrido | **Raleway** (SemiBold no brandbook) | `TIPOGRAFIA/Raleway-{Regular,SemiBold,Bold}.ttf` |

**Regras:**
- **Títulos:** mesclar as duas fontes, com Quatera nas palavras ou frases a destacar.
- **Subtítulos:** alternar entre uma das duas.
- **Texto corrido:** sempre Raleway.
- **Conceito:** Quatera é o lado direto e ambicioso, Raleway é o lado mediador e carismático.

**Regras do checklist:** Unbounded Bold só no logo. Quatera sempre itálico, só em palavras/frases de destaque, misturada com Raleway. Texto corrido é sempre Raleway, sem exceção. Qualquer outra fonte (Anton, Playfair Display, Inter etc.) deve ser sinalizada e trocada. Se a Quatera não estiver disponível, o checklist admite serifada itálica próxima, sinalizando a substituição. Aqui não é necessário, pois o `.otf` está em `TIPOGRAFIA`.

**Licença:** Quatera Italic é item Envato Elements, **Single Use para um projeto registrado** (`license_certificate_XAPL7F648T.txt`). Verificar se o uso web e o self-host do site estão cobertos. Unbounded e Raleway são OFL (livres).

---

## 4. Elementos gráficos

Três motivos oficiais. Todos os PNGs são 5760×3240, RGBA, raster.

**Regra do checklist:** só estes 3 motivos; não inventar outros. **Micro-detalhe:** cruz/mira "+" pequena no canto de posts e cartões, como marca d'água discreta; nunca grande nem solta no centro (as miras aparecem nos arquivos `linhas-*.png`).

### 4.1 Vidro desfocado
> No checklist, vidro desfocado são **fotos com máscara de desfoque radial/circular** (não elíptica em olho). Não há asset de máscara. As molduras e retângulos abaixo são a interpretação mais próxima nos arquivos (**confirmar**).
O vidro é a matéria-prima da lente. O desfoque funciona como foco de câmera, direcionador de olhar e expectativa de revelação.

| Arquivo | Conteúdo |
|---|---|
| `moldura-amarelo.png` | Borda desfocada, Amarelo 03 |
| `moldura-laranja.png` | Borda desfocada, Laranja 03 |
| `moldura-bege.png` | Borda desfocada, tom Bege 03 (nome do arquivo é ambíguo) |
| `moldura-verde.png` | Borda desfocada, Verde 03 |
| `retangular-amarelo.png` | Retângulo desfocado, Amarelo 03 |
| `retangular-laranja.png` | Retângulo desfocado, Laranja 03 |
| `retangular-bege.png` | Retângulo desfocado, Bege 03 |
| `retangular-verde.png` | Retângulo desfocado, Verde 03 |

### 4.2 Degradê focado
Glow radial desfocado atrás de logotipo ou frases de efeito, em laranja, amarelo-esverdeado e verde oliva. É o recurso mais usado nos templates de redes.

A cor aparece e some como sombra. As formas geométricas marcadas remetem ao foco da câmera e aos periféricos (flash, softbox).

| Arquivo | Conteúdo |
|---|---|
| `bola-grande-amarelo.png` | Esfera grande, Amarelo 03 |
| `bola-grande-laranja.png` | Esfera grande, Laranja 03 |
| `bola-grande-bege.png` | Esfera grande, Bege 03 |
| `bola-grande-verde.png` | Esfera grande, Verde 03 |
| `bola-pequena-amarelo.png` / `bola-pequena-laranja.png` / `bola-pequena-bege.png` / `bola-pequena-verde.png` | Esferas pequenas nas 4 cores |
| `circulos.png` | Ícones de círculo com listras (preto, verde-escuro, bege, amarelo; versões cheia e esmaecida) |

### 4.3 Linhas e perspectiva
Três variações: (a) linhas retas irradiando de um ponto, sem contorno de olho (`perspectiva*`); (b) anéis concêntricos em line-art fina, sem preenchimento sólido (`mola*`); (c) espiral áurea com linhas de construção visíveis (`linhas*`).

Linhas que guiam o olhar, sensação de movimento, construção de perspectiva e proporção áurea.

| Arquivo | Conteúdo |
|---|---|
| `linhas-preto.png`, `linhas-bege.png`, `linhas-verde.png` | Espiral áurea e retângulos, mais miras/cruzes (preto, bege, verde) |
| `mola.png`, `mola-2.png`, `mola-curta.png` | Variação (b): elipses/anéis concêntricos em "mola" (carretel/íris). Os de contorno são line-art; os preenchidos têm glow |
| `perspectiva.png` | Leque de linhas pretas a partir de um ponto, com esfera laranja e amarela |
| `perspectiva-2.png` | Mesmo leque, com esfera verde e marrom |
| `elementos-ukeria.psd` | Fonte editável de todos os elementos (66 MB). **Não usar no site, só para extrair novas variações.** |

---

## 4A. Padrão de aplicações (checklist)
- **Avatar:** símbolo (letra "a") sobre glow radial, dentro de círculo.
- **Posts e capas de Reels:** card de cor chapada ou com glow radial, frase com Quatera Italic + Raleway, logo pequeno no rodapé, mira no canto.
- **Impressos:** papel bege/cru, nome em Quatera Italic, contato em Raleway, ícone de linhas irradiando. Verso com logo completo sobre glow radial.

---

## 5. Tom de voz e universo verbal

- **Personalidade:** "vigilante sagaz do audiovisual". Mulher de negócios brasileira, crítica, empreendedora. Vai pra cima, sem medo da luta, mas com alegria e companheirismo.
- **Valores (identidade nuclear):** Humana, Inquieta, Chocante, Inconformada, Visionária, Ativista.
- **3 camadas de tom:**
  1. "A vigilante sagaz do audiovisual."
  2. "Um ambiente leve de confiança mútua, cocriação e escuta ativa."
  3. "Inimiga do machismo, racismo e de outras opressões e defensora do empreendedorismo feminino."
- **Propósito:** "Utilizamos o nosso olhar e a força do audiovisual de guerrilha para criar narrativas estratégicas que potencializam marcas dentro e fora dos canais digitais."
- **Personalidade dual:** direta/combativa + acolhedora/diplomática, espelhada em Quatera (direto) + Raleway (diplomático).
- **O que a marca NÃO é:** alinhada à direita política ("bolsominion" no PDF), preguiçosa, fofoqueira, egocêntrica, "boazinha / bela, recatada e do lar".
- **Posicionamento:** produtora 100% composta por mulheres de diferentes etnias. Vai além da técnica, com estratégia e criatividade a favor da voz do cliente. Contra "vídeos de dancinha".
- **Origem do nome:** neologismo de *Uke* (olho, em Terena) + sufixo *-ria* (lugar, ramo, coletivo, ação). "Coletivo de olhares". Etnia Terena escolhida pela origem da avó materna da fundadora, Letícia Palhão. "Produções" é o complemento e pode aparecer ou não no logo.
- **Público:** empresários de pequeno e médio porte (B2B2E: dono contrata, funcionários aparecem), empreendedores disruptivos, feiras e eventos, making off e still.

---

## 6. Cruzamento brandbook × arquivos

### Gaps (regra do brandbook sem asset)
0. **Vidro desfocado como máscara radial de foto** — sem asset em `ELEMENTOS`. Os arquivos de moldura/retângulo são interpretação.
1. **Assinatura "produtora audiovisual & canais digitais"** — o brandbook diz que o nome pode levar essa assinatura, mas o logo completo só traz "produções". Não há arquivo com a assinatura.
2. **Raleway** — só há Regular, SemiBold e Bold. O README descreve a família completa, mas só esses 3 pesos foram entregues. Sem itálico nem variável.
3. **Conteúdo do brandbook que é imagem** — pelo texto, não dá para ler os mockups de Instagram, apresentação, cartão e caneca.

### Inconsistências / pontos de atenção
1. **SVGs com cor fora da paleta:** `logo-completo.svg` e `logo-tipografico.svg` usam `#070c0a`, não o Preto Ukêria `#141414`. Não é uma cor oficial nem o preto técnico `#000000`. Para uso no site, recolorir para `#141414`.
2. **Preto Ukêria CMYK** truncado no PDF ("100 100 100").
3. **Nomenclatura normalizada (feito):** todos os arquivos foram renomeados para minúsculas, sem acento nem espaço, com a cor como sufixo. Logos: `logo-<variação>-<cor>.png`, com `bege-01|02|03`, `preto-ukeria` (oficial `#141414`), `preto-000` (técnico `#000000`) e `branco`. Elementos: `<motivo>-<cor>.png`, por exemplo `bola-grande-laranja.png` e `moldura-bege.png`. A duplicata idêntica `logo-símbolo-preto.png` foi removida (igual a `logo-simbolo-preto-000.png`).
4. **Logos "branco" e "preto-000":** oficialmente só para pedido técnico de fornecedor. No site, preferir Preto Ukêria e os beges.
5. **Renomeação feita via `git mv`** (histórico preservado). O `brand-map` já reflete os novos nomes.
6. **`logo-amostra.png`** mostra o logo preto sobre laranja e verde, o que é permitido (a regra proíbe o logo *em* laranja/amarelo/verde, não sobre eles). **Atenção ao contraste:** logo Bege 02 sobre Verde 03 nesta amostra é tom sobre tom fora dos beges. A amostra parece usar o bege claro (Bege 01), mas confirmar.
7. **Peso dos PNGs de elemento:** 5760×3240, 1 a 1,7 MB cada. Precisam de otimização (resize/WebP) antes do site.
8. **Licença Quatera:** Single Use por projeto registrado (ver seção 3).
9. **Sem divergência de fontes:** os arquivos em `TIPOGRAFIA` batem com o brandbook (Unbounded, Quatera, Raleway).

### Totais
- Logotipo: 19 PNG + 3 SVG + 1 amostra = 23 arquivos
- Elementos: 25 PNG + 1 PSD = 26 arquivos
- Tipografia: 6 fontes (.ttf/.otf) + 3 txt = 9 arquivos
- **58 arquivos catalogados**, mais os 2 PDFs
