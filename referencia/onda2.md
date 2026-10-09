# Onda 2 — Implementação da CONSIDERAÇÕES SITE V2

Data: 2026-10-09 · Plano aprovado em `C:\Users\paulo\.claude\plans\cosmic-pondering-bird.md`

## 1. O que mudou na V2 e o que foi feito

| Bloco | V1 | V2 (pedido) | Entregue |
|---|---|---|---|
| Serviços | 7 cards só com título | 5 serviços, cada um abre uma janela com tópicos e carrossel | ✅ Card abre painel com tópicos (texto do PDF) e carrossel de fotos e vídeos. Um painel por vez, Esc e botão "Fechar", deep link `?servico=<slug>`. |
| Lista de serviços | 7 | Produção Audiovisual, Social Media, Fotografia para marcas, Cobertura de Eventos, Estratégia de Comunicação e Presença Digital | ✅ 5 serviços em todo o site (cards, formulário, FAQ, JSON-LD, llms.txt). |
| Ancestralidade | Só texto | Foto MAE-USP com crédito | ✅ Foto com tratamento de vidro desfocado e legenda "Foto: Reprodução/MAE-USP". |
| Quem lidera | Avatares do brandbook | Foto da liderança | ✅ Foto + dois cards (sem atribuir rosto a nome). |
| Clientes | Removido | Carrossel de logos | ✅ 21 logos brancos em marquee sobre Preto Ukêria. Pausa no hover e no foco, e vira grade estática com `prefers-reduced-motion`. |
| Siga a Ukêria | Placeholders | 5 posts do Instagram e 2 vídeos do YouTube, intercalados | ✅ Seção própria com os 7 links reais. YouTube com miniatura e título oficiais. Instagram sem capa (ver pendências). |
| Projetos | Grade com filtro | Não descrito | ✅ Removido (decisão sua). Mídia antiga em `old/`. |
| Hero, Quem somos, Origem, Move, Como fazemos, Contato | — | Texto idêntico | Sem mudança. O botão do hero "Ver projetos" virou "Ver serviços". |

## 2. Mapeamento e nomenclatura (origem → destino)

Todas as saídas ficam em `assets/`. A tabela completa (origem, destino, trecho do vídeo, `alt`) está em `tools/media-manifest.json`.

| Origem (`referencia/v2/…`) | Destino | Tratamento |
|---|---|---|
| `producao-audiovisual/1…8 PRODUÇÃO AUDIOVISUAL.*` (8 vídeos, 4,4 GB) | `assets/video/web/servicos/producao-audiovisual/producao-audiovisual-01…08.mp4` + `.jpg` | Trecho de 14–15 s, 540 px, H.264, sem áudio |
| `social-media/1…6 SOCIAL MEDIA.png` | `…/social-media/social-media-01…06.webp` (+`-640`) | WebP q88, até 1600 px |
| `fotografia-para-marcas/*` (14 fotos) | `…/fotografia-para-marcas/fotografia-para-marcas-01…14.webp` | Ordem do PDF: Still → Retrato → Empresarial |
| `cobertura-de-eventos/*` (4 vídeos + 4 fotos) | `…/cobertura-de-eventos/cobertura-de-eventos-01…08` | Alternados (vídeo, foto…). 2 vídeos HDR convertidos para SDR |
| `estrategia-de-comunicacao/estratégia 1…6` | `…/estrategia-de-comunicacao/estrategia-de-comunicacao-01…06.webp` | WebP q88 |
| `ukeria-fotoreproducao-mae-usp.jpg` | `assets/img/web/ancestralidade-mae-usp.webp` | 1200 px |
| `quem-lidera.jpg` | `assets/img/web/quem-lidera.webp` | 1600 px |
| `clientes-logos-branco/10…30.png` | `assets/img/web/clientes/<cliente>-branco.webp` | Margem transparente aparada, 120 px de altura |
| `clientes-logos-preto/31…51.png` | `assets/img/web/clientes/<cliente>-preto.webp` | Casado com o branco pela silhueta (todas as distâncias ≤ 0,7). **Reservado para overlays** (não usado hoje) |
| `*.zip` (7) | — | Ignorados (duplicam as pastas extraídas) |

## 3. Peso antes e depois

| Item | Original | Servido |
|---|---|---|
| Vídeos (12) | 4,8 GB | 11,7 MB (≈ 0,5–1,5 MB cada) |
| Fotos e artes (32 + 2 soltas) | ≈ 230 MB | ≈ 4,4 MB |
| Logos (21 + 21) | 9 MB | 0,4 MB |
| **Total de mídia** | **≈ 7,2 GB (com zips)** | **16,6 MB** (131 arquivos) |

Os vídeos têm `preload="none"` e só tocam quando visíveis. As imagens são `lazy`. O peso inicial da página fica em ≈ 0,1 MB de HTML/CSS/JS mais 0,5 MB de fontes.

## 4. Verificação feita

- `check-brand`, `check-seo` e o novo `check-media` passam sem falhas (hex só da paleta, FAQ visível idêntico ao FAQPage, arquivos referenciados existem, limites de peso e nenhuma mídia órfã).
- Navegador (Edge headless, 1440 px e 390 px): abrir e trocar de serviço, Fechar e Esc, carrossel (setas, contador, botões desativados nas pontas), **todas as imagens dos 5 painéis carregam**, 21 logos de clientes, Siga com 7 cards, sem scroll horizontal.
- GA4: eventos `service_open`, `carousel_nav` e `click_external` (posts do Instagram e YouTube) confirmados com `gtag` simulado.

## 5. Decisões minhas e o que mudou em relação ao plano

- **Tom de voz de Clientes:** reaproveitei o título "Marcas que confiam no nosso olhar", que já existia no site original. O PDF só diz "Carrossel com os logos dos clientes".
- **Vídeo 1 de Produção Audiovisual:** o plano apontava um possível problema de rotação. **Não há problema**: o quadro que parecia deitado era um movimento de câmera do próprio vídeo.
- **Logos pretos:** gerados e guardados, mas sem uso. Sobre fundo escuro o branco é o correto.
- **Fotos de arte (social media e estratégia)** aparecem sem o desfoque de vidro, para não prejudicar o texto das peças. As fotos e vídeos usam o vidro desfocado.
- **Painel único abaixo da grade:** em celular o painel abre depois dos cinco cards, e a página rola até ele.

## 6. Pendências

1. **Capas dos 5 posts do Instagram.** A página pública não entrega a imagem sem login. Hoje os cards são de cor chapada com o símbolo. O README explica como encaixar a capa (`has-cover`) quando o cliente enviar.
2. **Logo "Mania"** veio cinza e colorido nos dois pacotes. No site aparece em tons de cinza sobre o preto. Pedir a versão em branco.
3. **Autorização de uso** das imagens e marcas dos clientes, e licença/crédito da foto do MAE-USP.
4. **Quem é quem** na foto da liderança, se quiserem legendas.
5. **Cookies:** GA4 está no ar sem aviso de consentimento. Texto jurídico de Privacidade e Termos ainda é minuta.
6. **Limpeza de disco:** `referencia/v2/` (7,2 GB) está no `.gitignore`. Os 7 zips (≈ 2,7 GB) são redundantes e podem ser apagados por você.
7. **Domínio** `ukeria.com.br` segue como suposição (vem do `utm_source` que você passou).

## 7. Arquivos

**Novos:** `assets/img/web/{servicos,clientes,siga}/…`, `assets/img/web/ancestralidade-mae-usp.webp`, `assets/img/web/quem-lidera.webp`, `assets/video/web/servicos/…`, `tools/optimize-media.mjs`, `tools/media-manifest.json`, `tools/media-dims.mjs`, `tools/check-media.mjs`, `tools/package.json`, `.gitignore`, este relatório.

**Alterados:** `index.html`, `assets/css/site.css`, `assets/js/site.js`, `assets/js/track.js`, `llms.txt`, `sitemap.xml`, `README.md`, `tools/check-*.mjs`.

**Movidos para `old/`:** mídia da grade de Projetos (`old/assets/img-web-v1/`, `old/assets/video-web-v1/`).
