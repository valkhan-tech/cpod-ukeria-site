/* Ukêria Produções — Site V1 */
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

  /* ---------- projetos: filtro por categoria ---------- */
  var chips = $$('.chip');
  var items = $$('.project');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      items.forEach(function (it) {
        var show = f === 'todos' || it.getAttribute('data-cat') === f;
        it.hidden = !show;
        var v = $('video', it);
        if (v && !show) { v.pause(); it.classList.remove('playing'); }
      });
    });
  });

  /* ---------- projetos: vídeos tocam quando visíveis ---------- */
  function setPlaying(fig, v, on) {
    if (on) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else { v.pause(); }
    fig.classList.toggle('playing', on);
  }
  $$('.project').forEach(function (fig) {
    var v = $('video', fig);
    if (!v) return;
    var btn = $('.play', fig);
    var manual = false;
    var toggleManual = function () { manual = true; setPlaying(fig, v, v.paused); };
    v.addEventListener('click', toggleManual);
    if (btn) btn.addEventListener('click', toggleManual);
    if (!reduced && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (manual) return;
          setPlaying(fig, v, en.isIntersecting && en.intersectionRatio >= 0.5);
        });
      }, { threshold: [0, 0.5] }).observe(fig);
    }
  });

  /* ---------- carrossel "Siga a Ukêria" ----------
     Troque os itens abaixo pelos posts reais:
     { type: 'instagram' | 'youtube', href: 'URL do post/vídeo' }          */
  var INSTAGRAM = 'https://www.instagram.com/ukeria.audiovisual/';
  var YOUTUBE = 'https://www.youtube.com/@ukeria.audiovisual';
  var POSTS = [
    { type: 'instagram', href: INSTAGRAM },
    { type: 'youtube',   href: YOUTUBE },
    { type: 'instagram', href: INSTAGRAM },
    { type: 'instagram', href: INSTAGRAM },
    { type: 'youtube',   href: YOUTUBE },
    { type: 'instagram', href: INSTAGRAM }
  ];
  var LABEL = {
    instagram: { platform: 'Instagram', cta: 'Ver no Instagram' },
    youtube:   { platform: 'YouTube',   cta: 'Ver no YouTube' }
  };
  var track = $('#track');
  if (track) {
    track.innerHTML = POSTS.map(function (p, i) {
      var l = LABEL[p.type];
      return '<a class="post c' + ((i % 4) + 1) + '" href="' + p.href + '" target="_blank" rel="noopener" aria-label="' + l.cta + '">' +
        '<svg class="wm" viewBox="0 0 202.35 136.68" aria-hidden="true"><use href="#sym-a"/></svg>' +
        '<span class="platform">' + l.platform + '</span>' +
        '<span class="cta">' + l.cta + '</span></a>';
    }).join('');
    var step = function (dir) {
      var card = $('.post', track);
      var w = card ? card.getBoundingClientRect().width + 16 : 280;
      track.scrollBy({ left: dir * w, behavior: reduced ? 'auto' : 'smooth' });
    };
    $('#prev').addEventListener('click', function () { step(-1); });
    $('#next').addEventListener('click', function () { step(1); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    });
  }

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
      msg.textContent = 'Abrindo o WhatsApp com a sua mensagem…';
      window.open(url, '_blank', 'noopener');
    });
  }
})();
