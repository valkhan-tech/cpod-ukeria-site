# Fase 2 — Avaliação do site atual e dos assets existentes

Ukêria Produções · Site V1 · Data: 2026-10-07
Escopo: somente avaliação. Nenhum arquivo do site foi alterado. Este relatório é o único arquivo criado nesta fase.

**Fontes usadas**
- `index.html` (1.113 linhas), `README.md` e `assets/`.
- `referencia/brand-map.json` e `referencia/brand-map.md` (saída da Fase 1).
- `referencia/UKERIA - BRANDBOOK.pdf` (texto extraído).
- `referencia/UKERIA - BRANDBOOK.md` — checklist de compliance. A skill `ukeria-brand-compliance` não está instalada neste ambiente, então este arquivo foi usado no lugar dela, conforme indicado.

**Limite desta avaliação:** li o código, não abri o site num navegador. Não inspecionei visualmente as fotos e vídeos de `assets/`. Os achados abaixo vêm do HTML/CSS/JS e dos nomes e tamanhos dos arquivos.

---

## 1. Existe site no repositório?

Sim. É uma página única e estática, `index.html`, sem framework nem etapa de build.

O repositório tem 2 commits (`Initial commit`, `Commit inicial`). O `README.md` é só uma linha: *"Design system da Ukeria: skill /ukeria-brand-compliance"*.

---

## 2. Stack técnica

| Item | Situação |
|---|---|
| Framework | Nenhum. HTML puro numa página só. |
| Build / gerenciador de pacotes | Nenhum (sem `package.json`, bundler ou `.gitignore`). |
| CSS | Um bloco `<style>` inline de cerca de 560 linhas. Variáveis em `:root`, sem pré-processador nem biblioteca. |
| JS | Um bloco `<script>` inline em JS puro: parallax do hero, olho do manifesto girando com o scroll, animação "ukê + ria" na seção Origem, reveal por `IntersectionObserver`. |
| Fontes | **Google Fonts via CDN**: Anton, Playfair Display, Inter. Nada é self-hosted. |
| Imagens e vídeos | `assets/images` (47 arquivos, ~27 MB) e `assets/videos` (7 MP4, ~247 MB). Nomes são hashes de 32 caracteres, provavelmente de uma exportação. Só os 5 SVGs de clientes têm nome legível. |
| Responsivo | Há `@media` em 520, 700, 760, 820 e 900 px. O CSS prevê `.nav-burger`, mas o elemento não existe no HTML. **No mobile (≤820 px) os links do menu somem e não há menu alternativo.** Sobra só o botão "Solicitar orçamento". |
| Acessibilidade | Tem `prefers-reduced-motion` e `:focus-visible`. Os 6 logos de clientes em PNG têm todos `alt="Cliente Ukêria"`, o que não identifica nenhum. |
| SEO / meta | Só `<title>`. Sem `meta description`, favicon, Open Graph ou política de privacidade. |
| Formulário | Falso. O `onsubmit` só troca o texto do botão para "Recebemos sua mensagem ✓". Nenhum dado é enviado. |
| Links | Todos os 13 links de WhatsApp usam `5511974995600` (ver seção 7). |

---

## 3. Seções e páginas existentes

Página única com navegação por âncoras.

| # | Bloco | id | Conteúdo |
|---|---|---|---|
| — | Nav fixa | — | Logo (ícone de olho + "ukêria" em texto), 6 links, botão "Solicitar orçamento". Usa `mix-blend-mode:difference`. |
| 1 | Hero | `#hero` | 8 "quadrados" flutuantes com parallax e rótulos (bastidores, fotografia, vídeo...). Título "Contar histórias *com olhar* estratégico". Dois CTAs. |
| 2 | Manifesto "Nós, Ukêria" | `#marca` | Olho em SVG que gira com o scroll. Texto de apresentação e 4 tags. |
| 3 | Origem do nome | `#origem` | Palavras "ukê" e "ria" que se juntam com o scroll, mais as definições Terena e português. |
| 4 | Ancestralidade Terena | `#terena` | Texto de origem, 2 citações e 2 molduras em formato de olho (sem foto, só placeholder com legenda). Fecho "Ukêria é resistência / transformação / visão / futuro". |
| 5 | Serviços ("O que fazemos") | `#servicos` | 4 categorias: 01 Vídeos (Reels, YouTube, Cobertura de Eventos, com vídeos), 02 Fotografia (3 cases), 03 Marketing para redes sociais (6 botões), 04 Mentoria (parágrafo). |
| 6 | Serviços avulsos | `#avulsos` | 2 cards com preço: Edição de Reels (R$150 e R$250) e Presets para Fotos (R$250). |
| 7 | Portfólio | `#portfolio` | Mosaico de 6 imagens. |
| 8 | Clientes | `#clientes` | Grade de 11 logos. 6 são PNG genéricos e 5 são SVGs de texto simples (Tati Pugliese, Multiforme Filmes, Owner Entertainment, Ferrasin Advogados, Luxxuoso Cosméticos). |
| 9 | Manifesto editorial | (sem id) | "A pergunta não é 'o que vamos postar?' é 'por que isso precisa existir?'", 3 "+" soltos e 2 quadrados vazios. |
| 10 | Feedbacks | (sem id) | 3 depoimentos **placeholder**: "Nome do cliente / Cargo · Empresa". |
| 11 | Contato | `#contato` | Chamada, links (Instagram, WhatsApp, Behance) e formulário falso. |
| — | Footer | — | Logo, links, assinatura "Transformando histórias, amplificando vozes." e © 2026. |

**Assets órfãos:** 27 das 47 imagens e 4 dos 7 vídeos (~74 MB) não são referenciados no `index.html`. Os 3 vídeos usados somam ~183 MB e têm `autoplay`, então o carregamento da página fica muito pesado.

**Nenhum arquivo de `referencia/` é usado no site.** Isso vale para logotipos, elementos gráficos e fontes.

---

## 4. Divergências em relação ao brand-map e ao checklist

Legenda: ❌ não conforme · ⚠️ parcial ou a decidir · ✅ conforme

### 4.1 Tipografia ❌

| Uso no site | Fonte atual | Fonte do brandbook |
|---|---|---|
| Wordmark "ukêria" (nav e footer) | Anton | **Unbounded Bold** (exclusiva do logotipo) |
| Títulos H1 a H4, preços, botões de redes sociais, números de categoria | Anton, maiúsculas | **Raleway**, com destaques em **Quatera Italic** |
| Destaques editoriais e citações | Playfair Display italic | **Quatera Italic** |
| Corpo, eyebrows, botões, formulário | Inter | **Raleway** |

- O checklist manda sinalizar como não conforme qualquer uso de Anton, Playfair Display ou Inter. Os três aparecem em todo o site.
- **Unbounded, Quatera e Raleway não são carregadas em nenhum ponto.**
- Os arquivos já existem em `referencia/TIPOGRAFIA/`: `Unbounded-Bold.ttf`, `Quatera-Italic.otf` e `Raleway-{Regular,SemiBold,Bold}.ttf`.
- No site, a Anton faz o papel que o brandbook dá à Raleway nos títulos. A Playfair faz o papel da Quatera, mas também aparece em citações e no rodapé, onde o brandbook pede Raleway.
- Na seção Terena, o último item do fecho ("é futuro") usa Anton. O brandbook não prevê isso.

### 4.2 Cores ❌

Nenhum token do `:root` bate com os hex oficiais.

| Token do site | Hex atual | Equivalente mais próximo do brandbook |
|---|---|---|
| `--brown-950` | #211a11 | Preto Ukêria #141414 ou Verde 05 #3e3e2a |
| `--brown-900` / `800` / `700` | #2b2216 / #3a2e1e / #4a3b26 | Sem equivalente. Marrons escuros não existem na paleta (o mais próximo é Verde 05 ou Bege 03). |
| `--orange-500` | #f0642c | Laranja 02 #ff8139 ou Laranja 03 #fa5b00 |
| `--orange-600` | #d94a1a | Laranja 04 #c84900 |
| `--yellow-400` | #d9e000 | Amarelo 03 #dce436 |
| `--yellow-300` | #e6ec5c | Amarelo 02 #e7ec74 |
| `--cream-50` / `100` / `200` | #f8f4e9 / #efe8d4 / #e3d9bd | Bege 01 #ded0c4, Branco #ffffff ou Amarelo 01 #f4f7c1 |
| `--ink` | #1a140c | Preto Ukêria #141414 |

- Há ainda cerca de 15 hex soltos, todos fora da paleta: #4a3f2e, #7a6f58, #5a4326, #7a5730, #443722, #2c2314, #332711, #6b4f2c, #a83913, #7a2f10, #a7ac00, #241c12, entre outros. Além disso, `rgba(248,244,233,…)` é usado em dezenas de bordas e fundos translúcidos.
- A paleta do site é marrom, creme, laranja e amarelo. O brandbook é bege, verde oliva, laranja e amarelo-esverdeado. Falta o **verde** inteiro, que é uma das cores principais (Verde 05).
- O botão primário usa laranja com hover amarelo, que são cores permitidas, mas com os hex errados.

### 4.3 Logotipo ❌

- O site **não usa nenhum arquivo de `referencia/LOGOTIPO/`**. O logo é montado no código: um SVG genérico de olho (amêndoa com círculo) mais o texto "ukêria" em Anton.
- O ícone de olho é uma invenção e não corresponde ao símbolo oficial (a letra "a" com íris). O texto está na fonte errada.
- A nav usa `mix-blend-mode:difference` com texto branco. A cor final do logo vira o inverso do fundo, **sem controle**. Sobre fundos laranja, amarelo ou creme, o resultado pode cair em tons proibidos para o logotipo. Branco só é aceito por pedido técnico de fornecedor.
- O footer usa o logo em creme (#f8f4e9), que não é um Bege oficial.
- Os SVGs oficiais `logo-completo.svg` e `logo-tipografico.svg` usam #070c0a em vez do Preto Ukêria #141414. É um ponto da Fase 1 que precisa de tratamento antes do uso.

### 4.4 Elementos gráficos ❌ / ⚠️

Regra: só existem 3 motivos oficiais (vidro desfocado, degrade focado, linhas e perspectiva). Não se inventam outros.

| Elemento do site | Avaliação |
|---|---|
| **Hero: 8 quadrados flutuantes** com gradiente e rótulos | ❌ Não é nenhum dos 3 motivos. O PDF de considerações já pede a troca pelo símbolo do olho animado (ver seção 7). |
| **Olho do manifesto** (6 raios mais círculo laranja, girando com o scroll) | ⚠️ Os raios lembram "linhas irradiando de um ponto". O círculo laranja de pupila transforma o conjunto num olho desenhado. O checklist pede raios sem olho desenhado ao redor. Refazer com `perspectiva.png`. |
| **`.eye-frame`** (foto recortada em elipse de olho com `clip-path`) | ❌ Contraria o checklist, que pede máscara de desfoque **radial/circular**, "não elíptica em formato de olho". Hoje são só placeholders sem foto. |
| **Blobs** (radial-gradient em forma orgânica nas seções Terena, Avulsos e Contato) | ⚠️ A intenção se aproxima do degrade focado. O formato orgânico irregular e as cores fora da paleta fogem do sistema. O fundo da seção continua chapado, o que está certo. Substituir por `bola-grande-*.png` ou por radial-gradient com os hex oficiais. |
| **Barras amarelas em trapézio** na seção Origem (`.bar`) | ❌ Forma inventada. |
| **Bullet de olho** laranja nas listas (`.eye-list`) | ❌ Ícone inventado. |
| **SVG de 6 elipses rotacionadas** no fecho Terena | ⚠️ Lembra o motivo "elipses/anéis em line-art" (variação b de Linhas e perspectiva), mas as elipses são rotacionadas e não concêntricas. Revisar contra `mola*.png` e `linhas-*.png`. |
| **Três "+" grandes** (2rem, laranja) espalhados na seção editorial | ❌ A mira "+" só é permitida pequena, no canto, como marca d'água discreta. |
| **Gradientes em cards, avatares e placeholders** (`.subservice-media`, `.feedback-avatar`) | ⚠️ Gradientes de preenchimento, não de fundo de página. A regra "degradê só em formas" é respeitada, mas as cores são as erradas. |
| **Fade do hero** (`.hero-content` com linear-gradient de transparente para marrom) | ⚠️ É uma sobreposição sobre o fundo, não o fundo em si. Provável conflito com "fundos sempre chapados". Decidir na Fase 3. |
| **Vidro desfocado** (motivo oficial) | ❌ Ausente no site. |
| **Linhas e perspectiva** (motivo oficial) | ⚠️ Só aparece de forma indireta no olho do manifesto. |

### 4.5 Tom de voz e conteúdo ⚠️

O texto dos blocos principais já tem postura direta, "por que isso precisa existir?" e posicionamento 100% mulheres. Está alinhado com o brandbook em essência. Pontos a conferir:
- O texto "Nós, Ukêria" diz que a produtora é "100% mulheres". O brandbook também fala em "diferentes etnias" e posicionamento antimachista e antirracista, e isso não aparece no site.
- Os depoimentos são placeholders e não podem ir ao ar assim.

---

## 5. Checklist de compliance (seção 7 do `UKERIA - BRANDBOOK.md`) aplicado ao site atual

| # | Item | Resultado |
|---|---|---|
| 1 | Logotipo usa Unbounded Bold e só cores permitidas? | ❌ Anton, ícone inventado e `mix-blend-mode:difference` |
| 2 | Cores batem com os hex oficiais? | ❌ Nenhuma bate |
| 3 | Fundo é cor chapada e degradê só em formas? | ⚠️ Fundos de seção são chapados. O fade do hero precisa de decisão. |
| 4 | Títulos misturam Quatera Italic e Raleway, e o corpo é só Raleway? | ❌ Anton, Playfair e Inter |
| 5 | Elementos gráficos pertencem aos 3 motivos oficiais? | ❌ Vários elementos inventados (quadrados, barras, bullets, olho com clip-path) |
| 6 | Mira "+" pequena e no canto? | ❌ Grande e solta |
| 7 | Tom reflete a personalidade dual e evita o que a marca recusa? | ✅ Em geral, com ressalvas da seção 4.5 |

**Resultado:** 1 de 7 conforme, 1 parcial, 5 não conformes. O site herdou só a estrutura e o tom, não a identidade visual.

---

## 6. Resumo executivo

1. É um site de página única em HTML/CSS/JS puro, sem build e com fontes por CDN. Dá para reescrever o CSS sem migração de stack.
2. A identidade visual não está aplicada: fontes, cores, logotipo e elementos gráficos divergem do brandbook. Nada de `referencia/` está em uso.
3. A estrutura de seções é reaproveitável. Será reorganizada na Fase 3 conforme o PDF de considerações.
4. Há problemas técnicos fora da marca: sem menu no mobile, formulário que não envia, ~74 MB de assets órfãos, ~183 MB de vídeo com autoplay, sem SEO e sem política de privacidade.

---

## 7. Pré-notas para a Fase 3 (lidas no PDF de considerações, só para registro)

Esta fase não exigia a leitura do PDF `UKERIA - CONSIDERAÇÕES SITE.pdf`. Passei os olhos nele só para apontar o que precisa de decisão humana. A leitura completa e a aplicação ficam para a Fase 3.

**Estrutura nova pedida** (Início → A Ukêria → Serviços → Como fazemos → Projetos → Contato) contra a atual:

| Nova seção | Origem no site atual |
|---|---|
| Início / Hero | `#hero` (quadrados trocados pelo símbolo do olho animado) |
| A Ukêria | `#marca` + `#origem` + `#terena` + `.editorial` |
| Serviços | `#servicos` (a lista no PDF é diferente: 7 itens) |
| **Como fazemos** (Entender, Direcionar, Produzir, Acompanhar) | **Não existe. Seção nova.** |
| Projetos | `#portfolio` + `#clientes` + cases de Fotografia, mais carrossel "Siga a Ukêria" (novo) |
| Contato | `#contato` |
| Não existe no PDF | `#avulsos` (preços), `Feedbacks` (placeholders) |

**Pontos que exigem decisão humana antes da Fase 3**
1. **Conteúdo** (não é compliance visual, deve ser tratado à parte):
   - Os **preços** de Serviços avulsos (R$150, R$250) não aparecem no PDF. Manter, remover ou mover?
   - A lista de **serviços** do PDF (7 itens) difere das 4 categorias do site.
   - Os **feedbacks** são placeholders. Há depoimentos reais?
   - Os **logos de clientes** (6 PNG genéricos mais 5 SVGs de texto) precisam de confirmação de nomes e autorização de uso.
2. **WhatsApp divergente:** o site usa `5511974995600` e o PDF informa `5511910355500` (com `utm_source=chatgpt.com` no link, que deve ser removido). Qual é o correto?
3. **Símbolo no hero:** o PDF pede o símbolo do olho animado no hero. O checklist diz que o símbolo é de uso exclusivo para marca d'água e foto de perfil, nunca como logo principal da página. Usar o símbolo como motivo gráfico animado no hero é aceitável? Precisa de confirmação.
4. **Licença da Quatera Italic:** é item Envato, *Single Use* para um projeto registrado. Self-host em site precisa de confirmação de cobertura. A alternativa prevista no checklist é uma serifada itálica próxima, com a substituição sinalizada.
5. **Raleway:** só há Regular, SemiBold e Bold, sem itálico. Isso deve bastar, já que o itálico de destaque é a Quatera.
6. **Política de privacidade e termos de uso** são citados no PDF (uso de imagens e dados). Falta o texto.
7. **Pesos de arquivo:** os PNGs de elementos têm 5760×3240 e 1 a 1,7 MB cada. Os vídeos pesam até 96 MB. Ambos precisam de otimização antes de ir ao ar.
8. **Divergência entre os dois resumos de marca:** o `UKERIA - BRANDBOOK.md` lista como 2ª variação do logo "logotipo em chapa de cor", e o `brand-map.md` lista "Tipográfico (só ukêria)". Confirmar qual vale.

---

## 8. Próximo passo

Aguardo sua confirmação para iniciar a **Fase 3** (adequação do site à V1). Nada foi modificado no site nesta fase.
