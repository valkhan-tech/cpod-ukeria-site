# Fase 3 — Adequação do site à V1

Ukêria Produções · Data: 2026-10-07

Entregue a V1 reorganizada conforme `UKERIA - CONSIDERAÇÕES SITE.pdf` e dentro do brandbook. Este relatório lista o que mudou, a autorrevisão item a item, o conteúdo que saiu (para você decidir se volta) e o que ainda depende de decisão humana.

Fontes: `UKERIA - BRANDBOOK.pdf`, `brand-map.json/md`, `UKERIA - BRANDBOOK.md` (checklist, no lugar da skill `ukeria-brand-compliance`, que não está instalada) e o PDF de considerações.

---

## 1. O que foi feito

### Estrutura (PDF de considerações)

| Seção | O que tem |
|---|---|
| **Início** | Símbolo do olho animado (a íris acompanha o cursor e pisca) sobre degrade focado, com raios saindo do olho. Texto do PDF. |
| **A Ukêria** | Quem somos, Origem (animação "ukê · ria"), Ancestralidade Terena, O que nos move ("100% mulheres") e Quem lidera (Letícia Palhão e Ketheleen Dias). |
| **Serviços** | Os 7 serviços do PDF. |
| **Como fazemos** | Entender → Direcionar → Produzir → Acompanhar (seção nova, texto do PDF). |
| **Projetos** | Filtro pelas 5 categorias do PDF, 19 itens (12 imagens e 7 vídeos) e carrossel "Siga a Ukêria". |
| **Contato** | "Bora conversar", formulário e links (WhatsApp, Instagram, LinkedIn, Behance, YouTube). |
| Extras | Menu mobile (hambúrguer), `privacidade.html` e `termos.html` (minutas), meta tags e favicon. |

### Identidade visual

- **Cores:** os 18 hex oficiais como tokens em `assets/css/site.css`. Nenhum outro hex em CSS, HTML, JS ou SVG.
- **Tipografia:** Raleway (400/600/700) para corpo e títulos, com palavras de destaque em Quatera Italic. Self-host em `assets/fonts/`. Google Fonts removido. Unbounded **não é carregada** (é exclusiva do logotipo, que vem em SVG).
- **Logotipo:** SVGs oficiais recoloridos para Preto Ukêria `#141414` e Bege 01 `#ded0c4` (os originais usavam `#070c0a`). O `mix-blend-mode` da nav foi removido, então a cor do logo é fixa.
- **Os 3 motivos oficiais** (recriados em SVG/CSS, sem usar os PNGs de 5760 px):
  - *Degrade focado* (`.glow`): brilho radial atrás do símbolo e das seções de Ancestralidade e Contato. Fundos continuam chapados.
  - *Vidro desfocado* (`.glass`): máscara radial/circular nas fotos e vídeos de Projetos (desfoca nas bordas e abre no hover).
  - *Linhas e perspectiva*: raios saindo de um ponto (hero), espiral áurea com linhas de construção (A Ukêria) e anéis em line-art (Origem e Como fazemos).
  - Mira "+" pequena, só nos cantos.
- **Removidos por não serem oficiais:** quadrados flutuantes do hero, olho SVG inventado, molduras em elipse de olho, barras trapezoidais, bullets de olho, três "+" grandes, blobs orgânicos.

### Mídia

- Vídeos: 7 trechos de 12 s (H.264, sem áudio) em `assets/video/web/`, ~4,1 MB no total (antes: 3 vídeos de 183 MB com autoplay). `preload="none"`, tocam só quando visíveis.
- Imagens: 12 WebP (~0,4 MB no total).
- Fontes: 0,5 MB. Peso inicial da página (sem os vídeos): ~1,3 MB.
- Originais continuam em `assets/images/` e `assets/videos/`, sem uso.

---

## 2. Autorrevisão — checklist do brandbook (seção 7 do `UKERIA - BRANDBOOK.md`)

| # | Item | Resultado |
|---|---|---|
| 1 | Logotipo em Unbounded Bold e só nas cores permitidas? | ✅ Logos vêm dos SVGs oficiais, só em `#141414` e `#ded0c4`. Nenhum em laranja, amarelo ou verde. |
| 2 | Cores batem com os hex oficiais? | ✅ `check-brand` não achou hex fora da paleta. |
| 3 | Fundo chapado, degradê só em formas? | ✅ Fundos de seção: Verde 05, Bege 01, Bege 03 e Amarelo 03. Degradês só em `.glow` e nas formas. |
| 4 | Títulos misturam Quatera Italic e Raleway, corpo só Raleway? | ✅ |
| 5 | Elementos gráficos são um dos 3 motivos oficiais? | ✅ Ver seção 1. ⚠️ Ponto 2 da seção 4. |
| 6 | Mira "+" pequena e no canto? | ✅ 14 px, só nos cantos. |
| 7 | Tom reflete a personalidade dual e evita o que a marca recusa? | ✅ Textos do PDF, sem inventar. Microcopy nova listada na seção 4. |

**Verificações rodadas** (`node tools/check-brand.mjs`): todos os hex pertencem à paleta, só Raleway e Quatera, sem Google Fonts, sem `mix-blend-mode`, logos só nas cores permitidas, WhatsApp antigo e `utm_source` ausentes, grafia "estratégico", e **13 pares de contraste** com WCAG AA (mínimo 4,5 para texto normal e 3 para texto grande). A primeira rodada apontou 1 falha (eyebrow laranja sobre bege, 3,16), corrigida trocando a cor do texto para Preto Ukêria e deixando o laranja num ponto decorativo.

**Testes no navegador** (Edge headless): menu mobile abre e fecha, filtro de Projetos por categoria, carrossel renderiza 6 cards com links para os perfis, formulário bloqueia envio vazio e sem aceite, e o envio abre `wa.me/5511910355500` com a mensagem montada. A íris reage ao cursor. Sem scroll horizontal em 390 px. Visual conferido em 1440 px e 390 px.

---

## 3. Decisões suas aplicadas

| # | Decisão | Aplicado |
|---|---|---|
| 1 | WhatsApp do PDF | `5511910355500` em todos os pontos, sem `utm_source`. |
| 2 | Remover Serviços avulsos | Seção e preços removidos. |
| 3 | Símbolo animado no hero | Usado como motivo gráfico. |
| 4 | Quatera self-hosted | Sim, `assets/fonts/Quatera-Italic.otf`. |
| 5 | Remover Clientes e Feedbacks | Removidos. |
| 6 | Carrossel com placeholders | 6 cards de cor chapada, linkando para os perfis. |
| 7 | Privacidade e Termos como minuta | Páginas criadas, com faixa "MINUTA". |
| 8 | Otimizar mídia | Feito. |

---

## 4. Pendências e pontos para decisão humana

1. **Autorização de uso dos projetos.** Projetos exibe trabalhos com marcas de terceiros (Luxxuoso, Shiplap, Celso Kamura, Tati Pugliese Arquitetura, Prestupa, Australian Film Festival, entre outras). Confirmar a autorização antes de publicar. As categorias de cada item foram **atribuídas por mim olhando as imagens**, então revise (principalmente os vídeos 4 e 5 em "Institucionais" e "Produções audiovisuais").
2. **Espiral e anéis.** Foram redesenhados em SVG a partir de `linhas-preto.png` e `mola.png`. Peça ao Estúdio Artemísia para validar se a leitura está fiel. A variação (b) do checklist pede anéis **concêntricos** e o arquivo `mola.png` mostra anéis **deslocados**. Segui o arquivo.
3. **"ukê · ria" em tamanho grande** (seção Origem) é composto em Raleway Bold e Quatera Italic, com o ponto central como no brandbook. Não é o logotipo (que é Unbounded), mas vale confirmar que não será lido como um logotipo alternativo.
4. **Microcopy que eu escrevi** (não está no PDF): "Ver projetos", "Falar com a gente →", "Enviar pelo WhatsApp", "Ver no Instagram/YouTube", "Redes", "Ainda não sei" no select, avisos do formulário e os textos das minutas. "Bora conversar" e "Vamos entender o que sua marca precisa?" vêm do PDF.
5. **Serviços só com títulos.** O PDF lista os 7 serviços sem descrição, então não inventei nenhuma. Saíram a categoria **Mentoria** e os botões "Orçamento personalizado" (ver seção 5).
6. **Seção Ancestralidade:** mantive a frase de fecho "Ukêria é resistência / transformação / visão / futuro" que existia no site antigo e não está no PDF. Saíram a citação de Val' Terena e os créditos de foto, que não estão no PDF e tinham molduras sem foto.
7. **Correção de grafia no PDF:** "estratégio" virou "estratégico", "Produções audiovisual" virou "Produções audiovisuais" e "Siga a Ukéria" virou "Siga a Ukêria".
8. **Equipe sem foto.** Letícia e Ketheleen usam o avatar do brandbook (símbolo sobre glow, em círculo). Trocar por fotos quando houver.
9. **Formulário sem servidor.** O envio abre o WhatsApp com a mensagem pronta. Se quiser receber por e-mail ou CRM, é preciso um backend ou serviço (Formspree etc.).
10. **Textos legais** (`privacidade.html`, `termos.html`) são minutas genéricas de LGPD e exigem revisão jurídica. A faixa "MINUTA" deve sair só depois disso. Há um trecho marcado "[A confirmar]" sobre autorização de imagem.
11. **Carrossel "Siga a Ukêria":** trocar os placeholders pelas capas reais dos posts (array `POSTS` em `assets/js/site.js`).
12. **LinkedIn:** mantive o link do PDF (`/company/uk%C3%AAria/posts/`), que leva à aba de posts.
13. **Raleway:** só há Regular, SemiBold e Bold (sem itálico). Nenhum texto depende de itálico de Raleway.
14. **Repositório pesado.** `assets/videos/` (247 MB) e `assets/images/` continuam versionados e sem uso. Vale remover ou mover para fora do Git (ou usar Git LFS).
15. **Preto Ukêria CMYK** segue truncado no PDF do brandbook (pendência da Fase 1). Só importa para impressos.

---

## 5. Conteúdo removido (para reaproveitar se quiser)

O `index.html` original está no Git: `git show HEAD:index.html`. Resumo do que saiu:

- **Serviços avulsos:** Edição de Reels (30s a 1min R$150; 1min a 3min R$250) e Presets para Fotos (R$250).
- **Serviços (descrições e categorias antigas):** Vídeos (Reels, YouTube, Cobertura de Eventos), Fotografia (Retratos para Empreendedoras, Salões de Beleza, Cobertura de Eventos), Marketing para redes sociais (Gerenciamento, Artes, Apresentação de portfólio, Análise de Instagram, Estratégia de conteúdo, Pack de conteúdo) e **Mentoria**.
- **Clientes:** 11 logos (6 PNG genéricos e 5 SVGs de texto: Tati Pugliese, Multiforme Filmes, Owner Entertainment, Ferrasin Advogados, Luxxuoso Cosméticos).
- **Feedbacks:** 3 depoimentos placeholder ("Nome do cliente / Cargo · Empresa").
- **Bloco editorial:** "A pergunta não é 'o que vamos postar?' é 'por que isso precisa existir?'".
- **Rodapé:** "Transformando histórias, amplificando vozes." e "Produzido com olhar estratégico".
- **Terena:** citação de Val' Terena e os créditos de foto (Alice Aedy e Eric Terena, Reprodução/MAE-USP).
- **Hero antigo:** "Contar histórias com olhar estratégico" e "Produtora audiovisual · 100% mulheres".

---

## 6. Limites desta verificação

- Testei em Edge headless (1440 px e 390 px). **Não testei** Safari, Firefox, aparelhos reais, leitor de tela nem Lighthouse.
- A animação suave das setas do carrossel não anima em headless. Verifiquei que o passo calculado (largura do card + 16 px) é aplicado.
- Reprodução de vídeo (autoplay quando visível e clique para pausar) não foi exercitada no navegador. Em iOS, o autoplay depende de `muted` e `playsinline`, que estão presentes.
- `backdrop-filter` (vidro desfocado) não funciona em navegadores muito antigos. Nesses, as fotos aparecem sem desfoque, sem perda de conteúdo.
- O trabalho está na árvore de trabalho da branch `main`, **sem commit**.

---

## 7. Arquivos

**Criados:** `assets/css/site.css`, `assets/js/site.js`, `assets/fonts/*` (4), `assets/brand/*` (7), `assets/video/web/*` (14), `assets/img/web/*` (12), `privacidade.html`, `termos.html`, `tools/check-brand.mjs`, `referencia/fase3.md`.

**Reescritos:** `index.html`, `README.md`.

**Não alterados:** `assets/images/`, `assets/videos/` e o conteúdo de `referencia/` (fora este relatório).
