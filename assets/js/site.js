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
    var navEl = $('.nav'); if (navEl) navEl.classList.toggle('menu-open', open);
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }


  /* ---------- menu flutuante: transparente sobre o hero, sólido depois dele ---------- */
  var nav = $('.nav');
  var heroEl = $('#inicio');
  var navLimit = 10;
  function measureNav() { navLimit = heroEl ? Math.max(heroEl.offsetHeight - nav.offsetHeight - 8, 10) : 10; navState(); }
  function navState() { if (nav) nav.classList.toggle('is-solid', window.scrollY > navLimit); }
  window.addEventListener('scroll', navState, { passive: true });
  window.addEventListener('resize', measureNav);
  if (nav) requestAnimationFrame(function () { requestAnimationFrame(measureNav); });   // mede depois da primeira pintura (evita reflow forçado no carregamento)

  /* ---------- hero: vídeo de fundo em loop (só com movimento permitido e sem economia de dados) ---------- */
  var heroVideo = $('.hero-video');
  if (heroVideo) {
    var hConn = navigator.connection || {};
    var lite = reduced || hConn.saveData || /(^|-)2g$/.test(hConn.effectiveType || '');
    if (lite) {                                   // fica só a capa (poster); o arquivo nem é baixado
      heroVideo.pause();
      $$('source', heroVideo).forEach(function (src) { src.remove(); });
      heroVideo.preload = 'none';
      heroVideo.load();
    } else {
      var heroReady = false;                       // o vídeo só é baixado depois da página carregada, para não competir com a capa (LCP), a fonte e o CSS
      var playHero = function () { if (!heroReady) return; var pr = heroVideo.play(); if (pr && pr.catch) pr.catch(function () {}); };
      var startHero = function () { heroReady = true; heroVideo.preload = 'auto'; if (heroInView && !document.hidden) playHero(); };
      var afterLoad = function () { (window.requestIdleCallback || function (f) { setTimeout(f, 200); })(startHero, { timeout: 2500 }); };
      if (document.readyState === 'complete') afterLoad(); else window.addEventListener('load', afterLoad);
      document.addEventListener('visibilitychange', function () { if (document.hidden) heroVideo.pause(); else if (heroInView) playHero(); });
      var heroInView = true;
      if ('IntersectionObserver' in window && heroEl) {
        new IntersectionObserver(function (entries) {
          heroInView = entries[0].isIntersecting;
          if (heroInView && !document.hidden) playHero(); else heroVideo.pause();
        }, { threshold: 0.05 }).observe(heroEl);
      }
    }
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

  /* ---------- abas: o botão abre uma "janela" abaixo (serviços e A Ukêria) ----------
     cfg: btn (seletor dos botões), attr (atributo com o slug), panel (seletor dos painéis), prefix (id = prefix + slug),
          param (?param=slug para deep link), hash (âncora ao abrir), event (evento GA4), where (link_location). */
  function makeTabs(cfg) {
    var btns = $$(cfg.btn);
    var panels = $$(cfg.panel);
    var focusBtn = function (slug) { var b = btns.filter(function (x) { return x.getAttribute(cfg.attr) === slug; })[0]; if (b) b.focus(); };
    function open(slug, opts) {
      opts = opts || {};
      btns.forEach(function (b) { b.setAttribute('aria-expanded', String(b.getAttribute(cfg.attr) === slug)); });
      panels.forEach(function (p) { p.hidden = !slug || p.id !== cfg.prefix + slug; });
      if (opts.updateUrl !== false) {
        var url = new URL(location.href);
        if (slug) url.searchParams.set(cfg.param, slug); else url.searchParams.delete(cfg.param);
        history.replaceState(null, '', url.pathname + url.search + (slug ? cfg.hash : url.hash));
      }
      if (!slug) return;
      var panel = $('#' + cfg.prefix + slug);
      hydrateImages(panel);
      refreshCarousels(panel);
      if (cfg.onOpen) cfg.onOpen(panel, slug);
      if (opts.scroll !== false) panel.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var slug = b.getAttribute(cfg.attr);
        var willOpen = b.getAttribute('aria-expanded') !== 'true';
        if (willOpen && window.ukTrack) { var ev = { link_location: cfg.where }; ev[cfg.eventParam] = slug; window.ukTrack(cfg.event, ev); }
        open(willOpen ? slug : null);
      });
    });
    panels.forEach(function (p) {
      var close = $('.svc-close', p);
      if (close) close.addEventListener('click', function () { var slug = p.id.replace(cfg.prefix, ''); open(null); focusBtn(slug); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var openPanel = panels.filter(function (p) { return !p.hidden; })[0];
      if (openPanel && openPanel.contains(document.activeElement)) { var slug = openPanel.id.replace(cfg.prefix, ''); open(null); focusBtn(slug); }
    });
    var wanted = new URLSearchParams(location.search).get(cfg.param);
    if (wanted && $('#' + cfg.prefix + wanted)) open(wanted);
    else if (cfg.defaultOpen) open(cfg.defaultOpen, { scroll: false, updateUrl: false });   // já vem aberto, sem rolar a página nem mexer na URL
    return { open: open };
  }

  makeTabs({ btn: '.service[data-svc]', attr: 'data-svc', panel: '.svc-panel', prefix: 'svc-panel-', param: 'servico', hash: '#servicos',
             event: 'service_open', eventParam: 'service', where: 'servicos', defaultOpen: 'producao-audiovisual' });

  /* foto MAE-USP: o olho abre uma única vez, na primeira vez que ela aparece (depois de carregada e visível) */
  function startEye(panel) {
    var eye = $('.mae', panel);
    if (!eye || eye.classList.contains('is-open') || eye.getAttribute('data-queued')) return;
    eye.setAttribute('data-queued', '1');
    var img = $('img', eye);
    var openEye = function () { eye.classList.add('is-open'); };
    if (reduced || !('IntersectionObserver' in window)) { openEye(); return; }
    var whenVisible = function () {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { io.disconnect(); setTimeout(openEye, 250); }
      }, { threshold: 0.4 });
      io.observe(eye);
    };
    if (img.complete && img.naturalWidth) whenVisible(); else img.addEventListener('load', whenVisible, { once: true });
  }

  makeTabs({ btn: '.tab-btn[data-about]', attr: 'data-about', panel: '.about-panel', prefix: 'about-panel-', param: 'aba', hash: '#origem',
             event: 'about_open', eventParam: 'panel', where: 'ukeria', onOpen: startEye });

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
