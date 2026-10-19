# Ukêria Produções — Site V1

Site estático (HTML, CSS e JS puros, sem build). A identidade segue o brandbook em `referencia/`.

## Rodar localmente

```bash
python -m http.server 8000
# abrir http://localhost:8000
```

## Estrutura

```text
index.html                  página única: Início (hero com vídeo), A Ukêria (com abas Ancestralidade e Quem lidera), Serviços, Como fazemos, Clientes, Siga a Ukêria, Perguntas, Contato
privacidade.html, termos.html   minutas (precisam de revisão jurídica)
assets/css/site.css         tokens da marca (18 cores oficiais) e componentes
assets/js/track.js          rastreamento de cliques (GA4)
assets/js/site.js           menu, olho do hero, filtro de projetos, carrossel, formulário
assets/fonts/               Raleway 400/600/700 em WOFF2 (subconjunto Latin, ~27 KB cada) e Quatera Italic (.otf original), self-hosted
assets/brand/               logotipo e símbolo em SVG, só nas cores permitidas, e favicon
assets/video/web/hero/      vídeo de fundo do hero (1280 px e 854 px para celular, mudo) e capa WebP
assets/video/web/servicos/  vídeos dos serviços (H.264, 540 px, mudos, 14–15 s) e capas WebP
assets/img/web/servicos/    fotos e artes dos serviços (WebP, 1600 px e miniatura -640)
assets/img/web/clientes/    logos dos clientes: *-branco.webp (usados) e *-preto.webp (reservados)
assets/img/web/siga/        miniaturas do YouTube (capas do Instagram: ver abaixo)
remover/                    arquivos sem uso aguardando exclusão (legado da versão anterior e zips redundantes); não publicar, no .gitignore
referencia/                 brandbook, considerações do site, logotipos, elementos, fontes, brand-map
tools/check-brand.mjs       checagem automática de compliance de marca
tools/check-seo.mjs         checagem de SEO, Open Graph, FAQ/JSON-LD, robots, sitemap e llms.txt
tools/check-media.mjs       checagem de mídia (existe, peso máximo, órfãs)
tools/optimize-fonts.mjs    gera os WOFF2 (subconjunto Latin) do Raleway a partir de referencia/TIPOGRAFIA
tools/git-preview.mjs       mostra exatamente o que um `git add -A && git commit` enviaria (não altera nada)
tools/check-refs.mjs        confere TODAS as referências em uso (arquivo existe com a caixa exata, âncoras, URLs do domínio; --http= e --external opcionais)
tools/map-files.mjs         mapa do que está em uso × sem uso (gera referencia/mapa-arquivos.md; não apaga nada)
tools/optimize-media.mjs    gera a mídia otimizada a partir de referencia/v2 (manifesto em tools/media-manifest.json)
robots.txt, sitemap.xml, llms.txt   rastreamento por buscadores e por assistentes de IA
```

## Compliance de marca

```bash
node tools/check-brand.mjs
```

Confere: todo hex pertence à paleta oficial, só Raleway e Quatera nos textos, sem Google Fonts, logotipo só em Preto Ukêria ou Bege, contraste mínimo (WCAG AA) dos pares texto/fundo usados e itens de conteúdo (WhatsApp, `utm`).

## SEO, Open Graph, AEO e GEO

```bash
node tools/check-seo.mjs
```

- **Domínio:** tudo usa `https://ukeria.com.br` (canonical, og:url, sitemap, JSON-LD, llms.txt). Se o domínio final for outro, troque em `index.html`, `privacidade.html`, `termos.html`, `robots.txt`, `sitemap.xml` e `llms.txt`.
- **Open Graph e Twitter:** imagem 1200×630 em `assets/img/og/og-ukeria.jpg`, com texto alternativo. Depois de publicar, force a releitura no Facebook Sharing Debugger e no LinkedIn Post Inspector.
- **Dados estruturados (`index.html`, JSON-LD):** Organization (com serviços, contato e perfis oficiais), duas Person (liderança), WebSite, WebPage e FAQPage.
- **AEO:** a seção `#perguntas` tem 6 perguntas e respostas curtas, e o texto é **idêntico** ao do FAQPage (o check-seo confere). Se editar uma, edite a outra.
- **GEO:** `llms.txt` resume a marca e lista as páginas e os perfis oficiais. O `robots.txt` libera buscadores e bots de IA (de busca/resposta e de treinamento). Para bloquear só o treinamento, troque o `Allow` por `Disallow` nesses bots.
- **Páginas legais** ficam `noindex` e fora do sitemap enquanto forem minuta.
- **Importante:** `Disallow` no robots.txt não protege arquivos. Não publique as pastas `referencia/`, `tools/` e `remover/` no servidor. `referencia/v2/` (7 GB de originais) está no `.gitignore`.

## Analytics (GA4)

Tag `G-DFJGSGH2MF` (gtag.js) no `<head>` das 3 páginas. `assets/js/track.js` envia: `click_whatsapp` (wa.me), `click_external` (Instagram, YouTube, LinkedIn, Behance, Valkhan Tech etc., com `platform`), `click_cta` (botões que levam a `#contato`), `service_open` (serviço aberto), `carousel_nav` (setas dos carrosséis) e `generate_lead` (formulário enviado, em `site.js`). Parâmetros: `link_url`, `link_text`, `link_location`, `platform`. Marque `generate_lead` como evento-chave no GA4.

## Como editar

- **Serviços:** cada serviço é um card (`.service[data-svc]`) mais um painel `#svc-panel-<slug>` com os tópicos e o carrossel. Para trocar a mídia, edite `tools/media-manifest.json` (origem, ordem, trecho do vídeo, `alt`) e rode `node tools/optimize-media.mjs` (precisa de `ffmpeg` e de `npm install` em `tools/`). Depois ajuste os `<figure class="slide">` do painel.
- **Mídia nova:** os originais ficam em `referencia/V3/` e `referencia/V2/` (fora do Git). Os nomes seguem a **numeração do cliente** (`producao-audiovisual-03`, `cobertura-de-eventos-17`, `still-02`, `empresarial-10`), em minúsculas e sem acento. Vídeo: H.264, 540 px de largura (960 px se for paisagem), sem áudio, 14–15 s.
- **Hero:** `<video class="hero-video">` com os arquivos de `assets/video/web/hero/` e a capa `hero.webp` (é a imagem de LCP). Para trocar o vídeo, edite `hero.src` em `tools/media-manifest.json` e rode `node tools/optimize-media.mjs --only=hero --force`. O vídeo (`preload="none"`) só começa a baixar e tocar depois do evento `load` da página, para não competir com a capa, as fontes e o CSS; a capa e as fontes principais têm `preload` no `<head>`. Sem vídeo com `prefers-reduced-motion` ou economia de dados.
- **Performance (PageSpeed):** o `gtag.js` só é baixado depois do `load` (ou na primeira interação); a fila do `dataLayer` já aceita eventos antes disso. Cache de longa duração em `.htaccess` (Apache/cPanel) e `_headers` (Netlify/Cloudflare Pages); o GitHub Pages ignora os dois.
- **Menu:** flutuante e transparente sobre o hero; ganha fundo Preto Ukêria depois dele (`.is-solid`, em `site.js`).
- **A Ukêria em abas:** os botões `.tab-btn[data-about]` abrem os painéis `#about-panel-ancestralidade` e `#about-panel-quem-lidera` (deep link `?aba=ancestralidade`). A foto da ancestralidade (`resistir-para-nao-morrer.png`) já vem recortada em formato de olho; o olho "abre" uma única vez, na primeira vez que ela aparece (`.mae`, `clip-path`).
- **Clientes:** a lista está duplicada de propósito em `#clientes` (a segunda cópia é `aria-hidden`, faz o loop do carrossel). Para incluir um cliente, acrescente-o em `clientes` no manifesto (use `"semPreto": true` se só houver a versão branca, como a Loulle), rode `optimize-media --only=clientes` e adicione o `<li>` nas duas listas.
- **Vídeos e capas:** o HTML só traz a capa (`<img class="cover" loading="lazy">`); o `<video>` nasce sem `src` (`data-src`) e o arquivo só é buscado quando o slide fica ≥ 60% visível ou no clique em play. As imagens dos painéis de serviço só ganham `src` quando o painel abre. Com `prefers-reduced-motion` ou economia de dados nada toca sozinho.
- **Siga a Ukêria:** cards estáticos em `#siga`. As capas do Instagram vêm de `referencia/V3/instagram/` (não versionada) e são geradas por `node tools/optimize-media.mjs --only=siga --force` em `assets/img/web/siga/ukeria-instagram-*.webp` (4:5, 640×800), com nome e `aria-label` descritivos. Para trocar um post: mude o `href`, a entrada em `siga` do `tools/media-manifest.json` (`url`, `src`, `slug`, `alt`) e gere de novo.
- **Formulário:** não há servidor. O envio monta a mensagem e abre o WhatsApp comercial (`WHATSAPP` em `site.js`).
- **Serviço aberto ao carregar:** **Produção Audiovisual** já vem selecionado e aberto (HTML com `aria-expanded="true"` e sem `hidden`; `defaultOpen` em `site.js`). Para trocar, mude o card e o painel no HTML e o `defaultOpen`.
- **Deep link de serviço:** `/?servico=fotografia-para-marcas` abre o painel direto.

## Regras da marca (resumo)

- Fundos sempre em cor chapada: Bege 01, Bege 03, Verde 05 ou Amarelo 03. Degradês só em formas (`.glow`).
- Títulos em Raleway com palavras de destaque em Quatera Italic (`<span class="q">`). Texto corrido sempre Raleway. Unbounded é só do logotipo (SVG).
- Logotipo nunca em laranja, amarelo ou verde.
- Só os 3 motivos oficiais: vidro desfocado (`.glass`, hoje **só na foto da liderança**; o cliente pediu para tirá-lo das imagens e vídeos dos Serviços), degrade focado (`.glow`) e linhas e perspectiva (SVG). A mira "+" (`.mark`) é pequena e fica no canto.

