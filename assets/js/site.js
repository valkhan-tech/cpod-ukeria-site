/* Ukêria Produções — Site V2 */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- menu mobile ---------- */
  var toggle = $('.nav-toggle');
  var menu = $('#menu');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('open', open);
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------- revelar ao rolar ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- hero: a íris acompanha o cursor / o dedo ---------- */
  var iris = $('#irisMove');
  var heroSec = $('#inicio');
  if (iris && heroSec && !reduced) {
    var MAX_X = 6, MAX_Y = 3.4;
    var move = function (cx, cy) {
      var r = iris.getBoundingClientRect();
      var ox = r.left + r.width / 2, oy = r.top + r.height / 2;
      var dx = (cx - ox) / (window.innerWidth / 2);
      var dy = (cy - oy) / (window.innerHeight / 2);
      dx = Math.max(-1, Math.min(1, dx));
      dy = Math.max(-1, Math.min(1, dy));
      iris.style.transform = 'translate(' + (dx * MAX_X).toFixed(2) + 'px,' + (dy * MAX_Y).toFixed(2) + 'px)';
    };
    window.addEventListener('pointermove', function (e) { move(e.clientX, e.clientY); }, { passive: true });
  }

  /* ---------- origem: "ukê" e "ria" se encontram ao rolar ---------- */
  var origin = $('#origem');
  var wUke = $('#wUke'), wRia = $('#wRia');
  var progress = 0, current = 0;
  function computeProgress() {
    if (!origin) return;
    var rect = origin.getBoundingClientRect();
    var vh = window.innerHeight;
    var startAt = vh * 0.95, endAt = vh * 0.35;
    progress = Math.max(0, Math.min(1, (startAt - rect.top) / (startAt - endAt)));
  }
  function tick() {
    current += (progress - current) * 0.12;
    var dist = Math.min(window.innerWidth * 0.22, window.innerWidth < 560 ? 60 : 240);
    var spread = (1 - current) * dist;
    wUke.style.transform = 'translateX(' + (-spread).toFixed(1) + 'px)';
    wRia.style.transform = 'translateX(' + spread.toFixed(1) + 'px)';
    if (Math.abs(progress - current) > 0.001) requestAnimationFrame(tick);
  }
  if (origin && wUke && wRia && !reduced) {
    var onScroll = function () { computeProgress(); requestAnimationFrame(tick); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  /* ---------- vídeos dos carrosséis: capa primeiro, vídeo só quando visível ----------
     O HTML traz só a capa (img lazy). O <video> nasce sem src: o arquivo é buscado quando o slide
     fica ≥60% visível (e a capa já carregou) ou quando o visitante clica em play. Com
     prefers-reduced-motion ou economia de dados, nada toca sozinho. */
  var conn = navigator.connection || {};
  var autoplay = !reduced && !conn.saveData && !/(^|-)2g$/.test(conn.effectiveType || '');
  function hydrate(v) {
    var src = v.getAttribute('data-src');
    if (src && !v.getAttribute('src')) { v.setAttribute('src', src); v.removeAttribute('aria-hidden'); }
  }
  $$('.slide video').forEach(function (v) {
    var fig = v.closest('.slide');
    var cover = $('.cover', fig);
    var btn = $('.play', fig);
    var manual = false, visible = false;
    var play = function (on) {
      if (on) { hydrate(v); var p = v.play(); if (p && p.catch) p.catch(function () {}); } else { v.pause(); }
      fig.classList.toggle('playing', on);
    };
    var whenCover = function (fn) {
      if (!cover || cover.complete) fn(); else cover.addEventListener('load', fn, { once: true });
    };
    v.addEventListener('playing', function () { fig.classList.add('ready'); });
    var toggleManual = function () { manual = true; play(v.paused || !v.getAttribute('src')); };
    v.addEventListener('click', toggleManual);
    if (btn) btn.addEventListener('click', toggleManual);
    if (autoplay && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          visible = en.isIntersecting && en.intersectionRatio >= 0.6;
          if (!visible) { manual = false; play(false); return; }
          if (manual) return;                 // respeita a escolha do visitante enquanto está à vista
          whenCover(function () { if (visible && !manual) play(true); });
        });
      }, { threshold: [0, 0.6] }).observe(fig);
    }
  });

  /* ---------- carrosséis (serviços e "Siga a Ukêria") ---------- */
  var carousels = $$('[data-carousel]').map(function (car) {
    var track = $('.car-track', car);
    var items = $$('.slide, .post', track);
    var count = $('.car-count', car);
    var ctrl = car.querySelector('.car-ui') || document.querySelector('.follow-ctrl[data-for="' + car.getAttribute('data-carousel') + '"]');
    var prev = ctrl && $('[data-dir="-1"]', ctrl);
    var next = ctrl && $('[data-dir="1"]', ctrl);
    var base = function () { return items.length ? items[0].offsetLeft : 0; };
    var pos = function (i) { return items[i].offsetLeft - base(); };
    var current = function () {
      var x = track.scrollLeft + 6, idx = 0;
      for (var i = 0; i < items.length; i++) { if (pos(i) <= x) idx = i; }
      return idx;
    };
    var update = function () {
      var atStart = track.scrollLeft <= 2;
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
      if (prev) prev.disabled = atStart;
      if (next) next.disabled = atEnd;
      if (count) count.textContent = (atEnd ? items.length : current() + 1) + ' / ' + items.length;
    };
    var step = function (dir) {
      var i = current(), target;
      if (dir > 0) { target = Math.min(items.length - 1, i + 1); }
      else { target = pos(i) < track.scrollLeft - 8 ? i : Math.max(0, i - 1); }
      track.scrollTo({ left: pos(target), behavior: reduced ? 'auto' : 'smooth' });
      setTimeout(update, 60); setTimeout(update, 450);   // garante o contador mesmo se o navegador atrasar o evento de scroll
      if (window.ukTrack) window.ukTrack('carousel_nav', { carousel: car.getAttribute('data-carousel'), direction: dir > 0 ? 'next' : 'prev' });
    };
    if (prev) prev.addEventListener('click', function () { step(-1); });
    if (next) next.addEventListener('click', function () { step(1); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    });
    track.addEventListener('scroll', update, { passive: true });
    if ('onscrollend' in window) track.addEventListener('scrollend', update);
    window.addEventListener('resize', update);
    update();
    return { update: update, track: track };
  });
  var refreshCarousels = function (root) {
    carousels.forEach(function (c) { if (root.contains(c.track)) { c.track.scrollLeft = 0; c.update(); } });
  };

  /* As imagens dos painéis (fechados) só ganham src quando o painel abre; a partir daí o loading="lazy"
     nativo cuida dos slides fora da área visível do carrossel. As capas dos primeiros slides vêm primeiro. */
  function hydrateImages(root) {
    $$('img[data-src]', root).forEach(function (img) {
      var ss = img.getAttribute('data-srcset');
      if (ss) { img.setAttribute('srcset', ss); img.removeAttribute('data-srcset'); }
      img.setAttribute('src', img.getAttribute('data-src'));
      img.removeAttribute('data-src');
    });
  }

  /* ---------- serviços: card abre a "janela" com tópicos e carrossel ---------- */
  var svcBtns = $$('.service[data-svc]');
  var svcPanels = $$('.svc-panel');
  function openService(slug, opts) {
    opts = opts || {};
    svcBtns.forEach(function (b) { b.setAttribute('aria-expanded', String(b.getAttribute('data-svc') === slug)); });
    svcPanels.forEach(function (p) { p.hidden = !slug || p.id !== 'svc-panel-' + slug; });
    var url = new URL(location.href);
    if (slug) url.searchParams.set('servico', slug); else url.searchParams.delete('servico');
    history.replaceState(null, '', url.pathname + url.search + (slug ? '#servicos' : url.hash));
    if (!slug) return;
    var panel = $('#svc-panel-' + slug);
    hydrateImages(panel);
    refreshCarousels(panel);
    if (opts.scroll !== false) panel.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }
  svcBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var slug = b.getAttribute('data-svc');
      var willOpen = b.getAttribute('aria-expanded') !== 'true';
      if (willOpen && window.ukTrack) window.ukTrack('service_open', { service: slug, link_location: 'servicos' });
      openService(willOpen ? slug : null);
    });
  });
  $$('.svc-close').forEach(function (c) {
    c.addEventListener('click', function () {
      var slug = c.closest('.svc-panel').id.replace('svc-panel-', '');
      openService(null);
      var b = $('#svc-btn-' + slug); if (b) b.focus();
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = svcPanels.filter(function (p) { return !p.hidden; })[0];
    if (open && open.contains(document.activeElement)) {
      var slug = open.id.replace('svc-panel-', '');
      openService(null);
      var b = $('#svc-btn-' + slug); if (b) b.focus();
    }
  });
  var wanted = new URLSearchParams(location.search).get('servico');
  if (wanted && $('#svc-panel-' + wanted)) openService(wanted);

  /* ---------- formulário: monta a mensagem e abre o WhatsApp comercial ---------- */
  var form = $('#form');
  var msg = $('#form-msg');
  var WHATSAPP = '5511910355500';
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = $('#f-nome').value.trim();
      var email = $('#f-email').value.trim();
      var servico = $('#f-servico').value;
      var texto = $('#f-msg').value.trim();
      if (!nome || !/^\S+@\S+\.\S+$/.test(email)) {
        msg.textContent = 'Preencha seu nome e um e-mail válido.';
        return;
      }
      if (!$('#f-ok').checked) {
        msg.textContent = 'Para enviar, aceite a Política de Privacidade.';
        return;
      }
      var linhas = [
        'Olá, gostaria de uma proposta!',
        '',
        'Nome: ' + nome,
        'E-mail: ' + email,
        'Serviço de interesse: ' + servico
      ];
      if (texto) linhas.push('Sobre a marca: ' + texto);
      var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(linhas.join('\n'));
      if (window.ukTrack) window.ukTrack('generate_lead', { form_id: 'contato', method: 'whatsapp', service: servico, link_location: 'contato' });
      msg.textContent = 'Abrindo o WhatsApp com a sua mensagem…';
      window.open(url, '_blank', 'noopener');
    });
  }
})();
