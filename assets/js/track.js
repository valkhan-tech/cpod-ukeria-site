/* Ukêria — rastreamento de cliques (Google Analytics 4 via gtag.js)
   Eventos enviados:
   - click_whatsapp : qualquer link para wa.me / api.whatsapp.com
   - click_external : links para outros domínios (Instagram, YouTube, LinkedIn, Behance, Valkhan Tech...)
   - click_cta      : botões/links internos que levam ao formulário de contato (#contato)
   - generate_lead  : formulário de contato enviado (disparado em site.js)
   Parâmetros: link_url, link_text, link_location (id da seção, nav ou footer), platform. */
(function () {
  'use strict';

  window.ukTrack = function (name, params) {
    try {
      if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    } catch (e) { /* analytics nunca pode quebrar o site */ }
  };

  var PLATFORMS = [
    ['wa.me', 'whatsapp'], ['whatsapp.com', 'whatsapp'],
    ['instagram.com', 'instagram'], ['youtube.com', 'youtube'], ['youtu.be', 'youtube'],
    ['linkedin.com', 'linkedin'], ['behance.net', 'behance'], ['valkhan.com.br', 'valkhan_tech']
  ];

  function platformOf(host) {
    for (var i = 0; i < PLATFORMS.length; i++) {
      var h = PLATFORMS[i][0];
      if (host === h || host.slice(-(h.length + 1)) === '.' + h) return PLATFORMS[i][1];
    }
    return host.replace(/^www\./, '');
  }

  function locationOf(el) {
    if (el.closest('.nav')) return 'nav';
    if (el.closest('footer')) return 'footer';
    var s = el.closest('section[id], header[id]');
    return s ? s.id : 'page';
  }

  function textOf(a) {
    var t = (a.getAttribute('aria-label') || a.textContent || '').replace(/\s+/g, ' ').trim();
    return t.slice(0, 100);
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;

    var href = a.getAttribute('href');
    var params = { link_text: textOf(a), link_location: locationOf(a) };

    if (href.charAt(0) === '#') {
      // CTAs internos que levam ao formulário de contato
      if (href === '#contato' && (a.classList.contains('btn') || a.classList.contains('cta'))) {
        params.link_url = href;
        params.platform = 'formulario_contato';
        window.ukTrack('click_cta', params);
      }
      return;
    }

    var url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
    if (url.host === location.host) return; // páginas internas (privacidade, termos)

    params.link_url = url.origin + url.pathname;
    params.platform = platformOf(url.hostname);
    params.transport_type = 'beacon';
    window.ukTrack(params.platform === 'whatsapp' ? 'click_whatsapp' : 'click_external', params);
  }, true);
})();
