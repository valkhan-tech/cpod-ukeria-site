# Ukêria Produções — Site V1

Site estático (HTML, CSS e JS puros, sem build). A identidade segue o brandbook em `referencia/`.

## Rodar localmente

```bash
python -m http.server 8000
# abrir http://localhost:8000
```

## Estrutura

```text
index.html                  página única: Início, A Ukêria, Serviços, Como fazemos, Projetos, Contato
privacidade.html, termos.html   minutas (precisam de revisão jurídica)
assets/css/site.css         tokens da marca (18 cores oficiais) e componentes
assets/js/site.js           menu, olho do hero, filtro de projetos, carrossel, formulário
assets/fonts/               Raleway (400/600/700) e Quatera Italic, self-hosted
assets/brand/               logotipo e símbolo em SVG, só nas cores permitidas, e favicon
assets/video/web/           vídeos comprimidos (trechos de 12 s) e posters
assets/img/web/             imagens em WebP usadas em Projetos
old/                        material sem uso (47 imagens e 7 vídeos originais da versão anterior); não publicar
referencia/                 brandbook, considerações do site, logotipos, elementos, fontes, brand-map
tools/check-brand.mjs       checagem automática de compliance de marca
tools/check-seo.mjs         checagem de SEO, Open Graph, FAQ/JSON-LD, robots, sitemap e llms.txt
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
- **Importante:** `Disallow` no robots.txt não protege arquivos. Não publique as pastas `referencia/`, `tools/` e `old/` no servidor.

## Como editar

- **Projetos:** cada item é um `<figure class="project glass" data-cat="...">` em `#grid` no `index.html`. Categorias: `producao`, `redes`, `institucional`, `cobertura`, `estrategia`. O `--ar` é a proporção (largura/altura) da mídia.
- **Carrossel "Siga a Ukêria":** edite o array `POSTS` em `assets/js/site.js` (`type`: `instagram` ou `youtube`, e `href` com o link do post/vídeo).
- **Formulário:** não há servidor. O envio monta a mensagem e abre o WhatsApp comercial (`WHATSAPP` em `site.js`).
- **Novos vídeos:** comprimir antes (H.264, ~720p, sem áudio, poucos segundos) e salvar em `assets/video/web/`.

## Regras da marca (resumo)

- Fundos sempre em cor chapada: Bege 01, Bege 03, Verde 05 ou Amarelo 03. Degradês só em formas (`.glow`).
- Títulos em Raleway com palavras de destaque em Quatera Italic (`<span class="q">`). Texto corrido sempre Raleway. Unbounded é só do logotipo (SVG).
- Logotipo nunca em laranja, amarelo ou verde.
- Só os 3 motivos oficiais: vidro desfocado (`.glass`), degrade focado (`.glow`) e linhas e perspectiva (SVG). A mira "+" (`.mark`) é pequena e fica no canto.
