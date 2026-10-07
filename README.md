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
assets/images, assets/videos   material original (não é servido pelo site)
referencia/                 brandbook, considerações do site, logotipos, elementos, fontes, brand-map
tools/check-brand.mjs       checagem automática de compliance de marca
```

## Compliance de marca

```bash
node tools/check-brand.mjs
```

Confere: todo hex pertence à paleta oficial, só Raleway e Quatera nos textos, sem Google Fonts, logotipo só em Preto Ukêria ou Bege, contraste mínimo (WCAG AA) dos pares texto/fundo usados e itens de conteúdo (WhatsApp, `utm`).

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
