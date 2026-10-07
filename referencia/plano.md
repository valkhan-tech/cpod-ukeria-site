# Fase 3 — Plano de alterações: Site Ukêria V1

## Contexto

O site atual (`index.html`, página única, CSS/JS inline) tem a estrutura e o tom certos, mas nenhuma identidade visual do brandbook. A Fase 2 mostrou 1 de 7 itens do checklist conforme. O PDF `UKERIA - CONSIDERAÇÕES SITE.pdf` pede uma nova estrutura: **Início → A Ukêria → Serviços → Como fazemos → Projetos → Contato**, com o símbolo do olho animado no hero e um carrossel "Siga a Ukêria".

Objetivo: entregar a V1 final, 100% dentro do brandbook (cores, tipografia, logotipo, 3 motivos gráficos), sem mexer em preços, textos de serviços ou dados de clientes sem sinalizar.

**Fontes de verdade:** `referencia/UKERIA - BRANDBOOK.pdf`, `brand-map.json/md`, `UKERIA - BRANDBOOK.md` (checklist, no lugar da skill não instalada), `UKERIA - CONSIDERAÇÕES SITE.pdf`.

## Decisões já tomadas

| # | Decisão |
|---|---|
| 1 | WhatsApp: usar o número do PDF `5511910355500` (link `wa.me`, **sem** `utm_source=chatgpt.com`). Substitui os 13 links de `5511974995600`. |
| 2 | Remover **Serviços avulsos** (seção com preços). |
| 3 | Símbolo do olho animado no hero é permitido (como motivo gráfico, não como logo da página). |
| 4 | Quatera Italic pode ser self-hosted no site. |
| 5 | **Clientes** e **Feedbacks**: removidos (fora da estrutura do PDF). Arquivos em `assets/` ficam. |
| 6 | Carrossel "Siga a Ukêria": estrutura pronta com placeholders de cor chapada, linkando para os perfis. |
| 7 | Privacidade e Termos: páginas **minuta** com aviso visível de rascunho. |
| 8 | Otimizar mídia (vídeos via ffmpeg). Elementos gráficos recriados em SVG/CSS. |

## Achados que moldam a abordagem

- Os PNGs de `ELEMENTOS/` são **pranchas** 5760×3240 com vários itens por arquivo e fundo branco (a mola tem blocos pretos de recorte). Não dá para usar direto: pesam 1–1,7 MB, e cada um traz 2 a 4 variantes juntas. **Recriar os motivos em SVG/CSS** usando os PNGs como referência visual e os hex oficiais.
- `logo-simbolo.svg` tem a íris como `<path>` separado, então dá para animar o olho sem tocar no desenho do logo.
- `logo-completo.svg` e `logo-tipografico.svg` usam `#070c0a` (fora da paleta). Gerar cópias com `#141414` (Preto Ukêria) e `#ded0c4` (Bege 01).
- Há `ffmpeg` instalado (vídeo e conversão para WebP). Não há ImageMagick (o `convert` do PATH é do Windows). O Python não tem PIL. Há Node e Edge para screenshots de verificação.

## Arquitetura de arquivos

Continua estático, sem build e sem framework.

```
index.html                      # estrutura nova (reescrita)
privacidade.html, termos.html   # minutas
assets/css/site.css             # tokens + componentes
assets/js/site.js               # interações
assets/fonts/                   # Raleway-{Regular,SemiBold,Bold}.ttf, Quatera-Italic.otf (cópias de referencia/TIPOGRAFIA)
assets/brand/                   # logos SVG recoloridos + símbolo + favicon
assets/video/web/               # MP4 comprimidos + posters .jpg
assets/img/web/                 # .webp otimizados das imagens em uso
README.md                       # estrutura e como rodar
referencia/fase3.md             # relatório final (autorrevisão + pendências + conteúdo removido)
```

Unbounded **não é carregada**: o wordmark vem dos SVGs oficiais. A fonte é exclusiva do logotipo e nunca vai em título ou texto. `referencia/` não é alterada (só ganha `fase3.md`).

## Passos de execução

### 1. Preparar assets
- Copiar as 4 fontes para `assets/fonts/`.
- Gerar `assets/brand/`: `logo-tipografico-preto.svg` (#141414), `logo-tipografico-bege.svg` (#ded0c4), `logo-completo-bege.svg`, `logo-simbolo.svg` (com paths separados e `fill="currentColor"`), `favicon.svg`.
- Extrair 1 frame de cada um dos 7 vídeos e abrir os posters e as imagens em uso, para decidir o que entra em Projetos e em qual categoria.
- Comprimir os vídeos em uso (H.264, 720p, CRF ~28, sem áudio, `+faststart`), alvo ≤ 8 MB cada. Gerar posters. Converter as imagens em uso para WebP com `ffmpeg`.
- Originais e assets não usados não são apagados.

### 2. Tokens de design (`site.css`)
- `:root` com as 18 cores oficiais e nada mais: `--branco`, `--bege-01..03`, `--preto-ukeria`, `--verde-01..05`, `--laranja-01..04`, `--amarelo-01..04`. Nomes iguais aos do brandbook.
- Tipografia: `@font-face` Raleway 400/600/700 e Quatera Italic, `font-display:swap`. Fallbacks: `system-ui` para Raleway e `Georgia, serif` itálico para Quatera, com `size-adjust`. Remover os links do Google Fonts.
- Regras: corpo sempre Raleway; títulos em Raleway Bold com **palavras de destaque em Quatera Italic** (`<em class="q">`); subtítulos alternam entre as duas. Sem uppercase forçado. Sem itálico sintético de Raleway (não há arquivo).
- Fundos sempre chapados, só entre Bege 01, Bege 03, Verde 05 e Amarelo 03. Texto: Preto Ukêria sobre bege e amarelo, Bege 01 sobre Verde 05. Botão primário: Laranja 03 com texto Preto Ukêria; hover Amarelo 03.
- Conferir os contrastes AA com um script Node (razão ≥ 4,5 para texto normal).

### 3. Os 3 motivos oficiais (componentes reutilizáveis)
1. **Degrade focado** (`.glow`): círculo com `radial-gradient` + `blur`, nas cores Bege 03, Verde 03, Laranja 03 e Amarelo 03, atrás de logo e frases de efeito. O fundo da seção continua chapado.
2. **Vidro desfocado** (`.glass`): imagem com camada de `backdrop-filter: blur` e máscara **radial/circular** (nunca elipse de olho), nítida no centro, desfocada nas bordas. Usado nas fotos de Projetos e Serviços.
3. **Linhas e perspectiva**, em SVG inline com traço fino:
   - (a) leque de linhas saindo de um ponto único, como `perspectiva.png`, sem contorno de olho;
   - (b) anéis em line-art (carretel), como `mola.png`, sem preenchimento;
   - (c) espiral áurea com linhas de construção, como `linhas-preto.png`.
   - **Mira "+"** (`.mark`): 14 px, só nos cantos de cards e seções, como marca d'água discreta.
- **Removidos** por não serem oficiais: quadrados flutuantes do hero, olho com `clip-path` elíptico, barras trapezoidais, bullets de olho, três "+" gigantes, blobs orgânicos e olho SVG inventado do manifesto.

### 4. Estrutura da página (textos do PDF)

| Seção | id | Fundo | Conteúdo |
|---|---|---|---|
| Nav fixa | — | Preto Ukêria | Logo tipográfico Bege 01 (SVG), links, CTA "Bora conversar". Sem `mix-blend-mode`. **Menu hambúrguer no mobile** (botão com `aria-expanded`). |
| **Início** | `#inicio` | Verde 05 | Símbolo do olho animado grande sobre `.glow` Laranja 03 e Amarelo 03 (a íris segue o cursor/scroll e pisca; sem movimento se `prefers-reduced-motion`). "Antes de produzir, a gente entende." H1 "O olhar estratégico que potencializa a sua marca!" (o PDF escreve "estratégio"; corrigir para **estratégico** e sinalizar). Parágrafo e 2 CTAs. |
| **A Ukêria** | `#ukeria` | Bege 01 → Amarelo 03 → Verde 05 → Bege 03 | **Quem somos**: texto do PDF, com destaque em Quatera. **Origem**: animação "ukê + ria" mantida (reaproveita a lógica de `origin*`), "Ukêria: um conjunto de olhares", ancestralidade Terena, citação "Resistir para não morrer. Vamos em frente!" (Icatu / MAE-USP). **O que nos move**: "100% mulheres" em destaque. **Quem lidera**: Letícia Palhão e Ketheleen Dias, com cargo, Instagram e LinkedIn. Avatar = símbolo sobre glow dentro de círculo, o padrão do brandbook, até haver fotos. |
| **Serviços** | `#servicos` | Bege 01 | Os 7 serviços do PDF, numerados, em cards. Mira "+" no canto. Só títulos (sem descrições inventadas). |
| **Como fazemos** | `#como-fazemos` | Verde 05 | 4 etapas **Entender → Direcionar → Produzir → Acompanhar**, texto do PDF, ligadas por linhas de perspectiva e espiral áurea. Mantém o nome (o PDF aceita sugestão). |
| **Projetos** | `#projetos` | Bege 01 | Chips de filtro pelas 5 categorias do PDF. Grade de fotos e vídeos com `.glass`. Vídeos com poster e `preload="none"`. **Carrossel "Siga a Ukêria"**: cards de cor chapada com placeholders, que linkam para Instagram e YouTube; dados em um array no JS para trocar depois. |
| **Contato** | `#contato` | Verde 05 + glow | "Bora conversar. Conta pra gente sobre sua marca". Formulário (nome, e-mail, serviço com as 7 opções, mensagem, aceite da privacidade). O envio monta uma mensagem e abre `wa.me/5511910355500` (sem backend). Links: Instagram, LinkedIn, Behance, WhatsApp comercial, YouTube. |
| Footer | — | Preto Ukêria | Logo completo Bege 01, links, Privacidade e Termos, © 2026 Ukêria Produções. |

### 5. JS (`site.js`)
- Menu mobile, reveal com `IntersectionObserver` (e fallback sem JS), olho do hero, efeito "ukê + ria", filtro de Projetos, carrossel (scroll-snap com setas, teclado e `aria`), formulário → WhatsApp.
- Remove o parallax de quadrados e a rotação do olho do manifesto.
- Tudo respeita `prefers-reduced-motion`.

### 6. Páginas legais, SEO e acessibilidade
- `privacidade.html` e `termos.html`: texto-base (LGPD: dados coletados no formulário, finalidade, contato) com faixa fixa "MINUTA — requer revisão jurídica antes de publicar".
- `meta description`, Open Graph, favicon, `lang="pt-BR"`, `alt` real nas imagens, foco visível, ordem de headings.

### 7. README
Atualizar com a estrutura do projeto, como rodar (`python -m http.server`) e como adicionar projetos e posts ao carrossel.

## Mudanças de conteúdo a sinalizar (vão para `fase3.md`)

- **Removido:** Serviços avulsos e preços (decisão 2), Clientes, Feedbacks, o bloco editorial "A pergunta não é…" e o rodapé "Transformando histórias, amplificando vozes", por não estarem no PDF.
- **Serviços:** vira a lista de 7 do PDF. Saem a categoria **Mentoria**, as descrições antigas de Reels/YouTube/Eventos e os botões "Orçamento personalizado". O texto antigo fica listado no relatório para você reaproveitar, se quiser.
- **Terena:** fica só a citação "Resistir para não morrer…" (a do PDF). A de Val' Terena e as molduras de foto vazias saem.
- **Correção de grafia:** "estratégio" → "estratégico" (PDF).
- **WhatsApp:** número novo e link sem `utm`.
- **Mídia de Projetos:** categorias atribuídas por inspeção visual das imagens atuais. Dúvidas ficam marcadas como provisórias.

## Pendências que não dependem de código

- Fotos reais da equipe e de projetos por categoria, e o texto final de Privacidade e Termos.
- Capas reais para o carrossel "Siga a Ukêria".
- Quatera: licença Envato Single Use ligada ao projeto "Ukêria" (confirmado por você).

## Verificação

1. Servir com `python -m http.server` e abrir no Edge headless nas larguras 1440 e 390 px. Tirar screenshots de cada seção e olhar um a um.
2. Script de compliance (Node):
   - todo hex no CSS e SVG pertence às 18 cores oficiais;
   - `font-family` só com Raleway e Quatera, sem Anton, Playfair, Inter ou Google Fonts;
   - Unbounded não é usada em texto;
   - nenhum logo em laranja, amarelo ou verde;
   - `grep` de `5511974995600` e `utm_source` retorna zero;
   - razões de contraste ≥ 4,5.
3. Peso da página: vídeos ≤ 8 MB cada e nenhum PNG de 5760 px carregado.
4. Testar no navegador: menu mobile, filtro, carrossel, formulário abrindo o WhatsApp com o texto certo, animação desligada com `prefers-reduced-motion`.
5. Autorrevisão item a item com o checklist (seção 7 do `UKERIA - BRANDBOOK.md`), registrada em `referencia/fase3.md` como passou, ajustado ou pendente de decisão humana.
6. Não fazer commit sem pedido seu. O trabalho fica na árvore de trabalho da branch `main`.
