(() => {
  'use strict';
  const data = window.ASTRAL_ATLAS_DATA;
  const root = document.getElementById('astralView');
  if (!data || !root) return;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const spotById = id => data.spots.find(spot => spot.id === id);
  let zoom = 1;
  let selected = 'stillwater';
  let routeId = '';
  let mounted = false;
  let focusOnRender = false;
  let lastHash = '';
  const q = selector => root.querySelector(selector);

  function bookLink(book) {
    return `<article class="astral-book"><h3>${escape(book.title)}</h3><div class="astral-actions"><a href="#/astral/historia/${book.id}">Ler história →</a><button type="button" data-route="${book.id}" aria-pressed="${routeId === book.id}">Ver rota</button></div></article>`;
  }

  function updateRoute() {
    const book = data.books.find(item => item.id === routeId);
    const points = book ? book.route.map(id => spotById(id)).filter(Boolean) : [];
    q('[data-astral-route]').innerHTML = points.length ? `<polyline points="${points.map(p => `${p.x},${p.y}`).join(' ')}"/><g>${points.map(p => `<circle cx="${p.x}" cy="${p.y}" r=".7"/>`).join('')}</g>` : '';
    q('[data-route-status]').textContent = book ? `Rota: ${book.title}` : 'Escolha um lugar no mapa para conhecer sua descrição.';
    root.querySelectorAll('[data-route]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.route === routeId)));
  }

  function selectSpot(id, moveFocus = false) {
    const spot = spotById(id);
    if (!spot) return;
    selected = id;
    root.querySelectorAll('[data-spot]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.spot === id)));
    q('[data-destination]').innerHTML = `<p class="eyebrow">Cometas do Mar Prateado</p><h2 tabindex="-1" id="astralDestinationTitle">${escape(spot.name)}</h2><p>${escape(spot.description)}</p>`;
    updateRoute();
    if (moveFocus) q('#astralDestinationTitle').focus({preventScroll: true});
  }

  function applyZoom() {
    const world = q('[data-astral-world]');
    const viewport = q('[data-astral-viewport]');
    const previousWidth = world.getBoundingClientRect().width;
    const previousHeight = world.getBoundingClientRect().height;
    const centerX = (viewport.scrollLeft + viewport.clientWidth / 2) / previousWidth;
    const centerY = (viewport.scrollTop + viewport.clientHeight / 2) / previousHeight;
    const fitWidth = Math.min(viewport.clientWidth, viewport.clientHeight * 1309 / 1202);
    world.style.width = `${fitWidth * zoom}px`;
    q('[data-zoom-value]').textContent = `${Math.round(zoom * 100)}%`;
    q('[data-zoom-out]').disabled = zoom <= 1;
    q('[data-zoom-in]').disabled = zoom >= 3;
    viewport.scrollLeft = world.getBoundingClientRect().width * centerX - viewport.clientWidth / 2;
    viewport.scrollTop = world.getBoundingClientRect().height * centerY - viewport.clientHeight / 2;
  }

  function mountMap() {
    root.innerHTML = `<div class="astral-unfold"><div class="astral-layout"><section class="astral-map-section" aria-label="Mapa interativo do Plano Astral"><div class="astral-map-tools"><p class="eyebrow">Carta do Mar Prateado</p><label><input type="checkbox" data-labels> Mostrar nomes</label></div>
      <div class="astral-map-viewport" data-astral-viewport tabindex="0" role="region" aria-label="Área rolável do mapa" ><div class="astral-world" data-astral-world><img src="assets/astral/mapa-astral.webp" width="1309" height="1202" alt="Trinta e dois destinos astrais distribuídos ao redor do Abismo do Vazio: cidades de gelo, desertos, jardins, ruínas, estaleiros e portos suspensos." fetchpriority="high"><svg class="astral-route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" data-astral-route></svg><nav class="astral-pins" aria-label="Destinos no mapa">${data.spots.map(spot => `<button type="button" class="astral-pin" style="left:${spot.x}%;top:${spot.y}%" data-spot="${spot.id}" title="${escape(spot.name)}" aria-label="Explorar ${escape(spot.name)}" aria-pressed="false"><span class="astral-pin__dot" aria-hidden="true"></span><span class="astral-pin__label" aria-hidden="true">${escape(spot.name)}</span></button>`).join('')}</nav></div></div>
      
      <div class="astral-map-tools astral-map-tools--bottom"><div class="astral-zoom" role="group" aria-label="Ampliação do mapa"><button type="button" data-zoom-out aria-label="Diminuir mapa">−</button><output data-zoom-value>100%</output><button type="button" data-zoom-in aria-label="Ampliar mapa">+</button><button type="button" data-fit>Ajustar</button></div><button type="button" data-clear-route>Limpar rota</button></div><p class="astral-route-status" role="status" data-route-status></p></section>
      <aside class="astral-sheet"><header><p class="eyebrow">Além de Aurelia</p><h1 tabindex="-1" id="astralTitle">O Plano Astral</h1><p>Uma viagem entre cometas-cidade, a bordo do Vigília.</p></header><div class="astral-destination" data-destination aria-labelledby="astralDestinationTitle"></div><details class="astral-story-index"><summary>As cinco histórias</summary>${data.books.map(bookLink).join('')}</details><a class="astral-close" href="#/">← Recolher o mapa</a></aside></div></div>`;
    mounted = true;
    zoom = 1;
    applyZoom();
    selectSpot(selected);
  }

  function mountStory(id) {
    const book = data.books.find(item => item.id === id);
    if (!book) {
      root.innerHTML = '<div class="astral-heading"><h1 tabindex="-1">História não encontrada</h1><p>Escolha uma das cinco histórias disponíveis no atlas.</p><a class="button" href="#/astral">Voltar ao atlas astral</a></div>';
      return;
    }
    routeId = book.id;
    root.innerHTML = `<div class="city-masthead" style="--accent:#705128"><div class="city-masthead__content"><p class="eyebrow">A viagem do Vigília · Plano Astral</p><h1 tabindex="-1" id="astralTitle">${escape(book.title)}</h1><p class="city-lead">${escape(book.summary)}</p><a class="astral-back" href="#/astral">← Voltar ao mapa astral</a></div></div><div class="city-content astral-story-content"><aside class="chapter-nav" aria-label="Navegação dos capítulos"><div class="chapter-nav__header"><strong>Nesta história</strong><button class="chapter-nav__toggle" type="button" data-toggle-chapters aria-expanded="true" aria-label="Recolher sumário">‹</button></div><div class="chapter-nav__items">${book.chapters.map((title,i)=>`<button type="button" data-astral-chapter="astral-${book.id}-${i+1}">${i+1}. ${escape(title)}</button>`).join('')}</div></aside><article class="tab-panel"><header class="story-header"><span class="volume-label">Crônica ${book.order}</span><h2>${escape(book.title)}</h2><p class="story-deck">${escape(book.summary)}</p></header>${book.chapters.map((title, i) => `<section class="chapter" id="astral-${book.id}-${i + 1}"><span class="chapter-number">Capítulo ${i + 1}</span><h3>${escape(title)}</h3>${book.scenes.slice(i * 12, (i + 1) * 12).map(scene => `<p>${escape(scene.text)}</p>`).join('')}</section>`).join('')}<nav class="astral-story-pagination" aria-label="Histórias da coleção">${book.order > 1 ? `<a href="#/astral/historia/${data.books[book.order - 2].id}">← ${escape(data.books[book.order - 2].title)}</a>` : ''}<a href="#/astral">Ver mapa</a>${book.order < 5 ? `<a href="#/astral/historia/${data.books[book.order].id}">${escape(data.books[book.order].title)} →</a>` : ''}</nav></article></div>`;
    const content = q('.astral-story-content');
    const storyPanel = content.querySelector('article.tab-panel');
    storyPanel.id = 'astral-panel-texto';
    storyPanel.setAttribute('role', 'tabpanel');
    storyPanel.setAttribute('aria-labelledby', 'astral-tab-texto');

    content.insertAdjacentHTML('beforebegin', `<nav class="city-tabs" role="tablist" aria-label="Versões da história"><button type="button" role="tab" id="astral-tab-texto" aria-controls="astral-panel-texto" aria-selected="true" tabindex="0" data-astral-tab="texto">História</button><button type="button" role="tab" id="astral-tab-ilustrada" aria-controls="astral-panel-ilustrada" aria-selected="false" tabindex="-1" data-astral-tab="ilustrada">Edição ilustrada</button></nav>`);
    content.insertAdjacentHTML('beforeend', `<div class="tab-panel illustrated-panel" id="astral-panel-ilustrada" role="tabpanel" aria-labelledby="astral-tab-ilustrada" hidden><section class="premium-edition"><span class="premium-edition__mark" aria-hidden="true">✦</span><p class="eyebrow">Edição ilustrada premium</p><h2>${escape(book.title)} também ganhou imagens</h2><p>O blog continua disponível gratuitamente em sua versão completa e detalhada. A edição ilustrada é uma alternativa para quem prefere acompanhar a história como uma HQ digital e quer apoiar a produção das próximas crônicas.</p><ul class="premium-edition__products"><li><span>${escape(book.title)}</span><button class="button button--store" type="button" data-astral-store="${book.id}">Ver na Hotmart ↗</button></li></ul><small>Você verá um aviso antes de sair do site.</small></section></div>`);
    document.title = `${book.title} · Crônicas de Aurelia`;
  }

  function selectStoryTab(name) {
    const illustrated = name === 'ilustrada';
    root.querySelectorAll('[data-astral-tab]').forEach(button => {
      const active = button.dataset.astralTab === name;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    q('#astral-panel-texto').hidden = illustrated;
    q('#astral-panel-ilustrada').hidden = !illustrated;
    q('.chapter-nav').hidden = illustrated;
    q('.astral-story-content').classList.toggle('illustrated-open', illustrated);
  }

  root.addEventListener('keydown', event => {
    const tab = event.target.closest('[data-astral-tab]');
    if (!tab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const name = event.key === 'Home' ? 'texto' : event.key === 'End' ? 'ilustrada' : tab.dataset.astralTab === 'texto' ? 'ilustrada' : 'texto';
    selectStoryTab(name);
    q(`[data-astral-tab="${name}"]`).focus();
  });

  root.addEventListener('click', event => {
    const tab = event.target.closest('[data-astral-tab]');
    if (tab) { selectStoryTab(tab.dataset.astralTab); return; }
    const store = event.target.closest('[data-astral-store]');
    if (store) {
      const book = data.books.find(item => item.id === store.dataset.astralStore);
      if (book?.purchaseUrl) window.openIllustratedStoreDialog(book, 'Crônicas de Aurelia — Plano Astral');
      return;
    }
    const spot = event.target.closest('[data-spot]');
    if (spot) {
      selectSpot(spot.dataset.spot, true);
      if (window.innerWidth < 760) q('[data-destination]').scrollIntoView({behavior: 'smooth', block: 'start'});
      return;
    }
    const route = event.target.closest('[data-route]');
    if (route) {
      routeId = route.dataset.route;
      updateRoute();
      if (window.innerWidth < 760) q('[data-astral-viewport]').scrollIntoView({behavior: 'smooth', block: 'start'});
      return;
    }
    if (event.target.closest('[data-clear-route]')) { routeId = ''; updateRoute(); }
    if (event.target.closest('[data-zoom-in]')) { zoom = Math.min(3, zoom + .25); applyZoom(); }
    if (event.target.closest('[data-zoom-out]')) { zoom = Math.max(1, zoom - .25); applyZoom(); }
    if (event.target.closest('[data-fit]')) { zoom = 1; applyZoom(); q('[data-astral-viewport]').scrollTo({left: 0, top: 0}); }
    const toggle = event.target.closest('[data-toggle-chapters]');
    if (toggle) {
      const collapsed = q('.city-content').classList.toggle('nav-collapsed');
      toggle.setAttribute('aria-expanded', String(!collapsed));
      toggle.setAttribute('aria-label', collapsed ? 'Abrir sumário' : 'Recolher sumário');
      toggle.textContent = collapsed ? '›' : '‹';
    }
    const chapter = event.target.closest('[data-astral-chapter]');
    if (chapter) document.getElementById(chapter.dataset.astralChapter)?.scrollIntoView({behavior: 'smooth', block: 'start'});
  });
  root.addEventListener('change', event => {
    if (event.target.matches('[data-labels]')) q('[data-astral-world]').classList.toggle('show-labels', event.target.checked);
  });
  window.addEventListener('resize', () => {
    if (!root.hidden && q('[data-astral-world]')) applyZoom();
  });

  window.AstralAtlas = {
    matches: hash => /^#\/astral(?:\/|$)/.test(hash),
    render() {
      const hash = location.hash;
      focusOnRender = lastHash !== hash;
      document.getElementById('mapView').hidden = true;
      document.getElementById('cityView').hidden = true;
      root.hidden = false;
      document.body.classList.add('city-open', 'astral-open');
      document.getElementById('homeButton').style.visibility = 'visible';
      const home = document.getElementById('homeButton');
      home.setAttribute('aria-label', hash.includes('/historia/') ? 'Voltar ao mapa astral' : 'Recolher o mapa astral');
      const homeLabel = home.querySelector('span:last-child');
      if (homeLabel) homeLabel.textContent = hash.includes('/historia/') ? 'Mapa astral' : 'Recolher mapa';
      root.classList.toggle('astral-view--story', hash.includes('/historia/'));
      document.body.classList.toggle('astral-map-open', !hash.includes('/historia/'));
      const storyMatch = hash.match(/^#\/astral\/historia\/([a-z-]+)$/);
      if (hash === '#/astral' || hash === '#/astral/') {
        if (!mounted || lastHash.includes('/historia/')) mountMap();
        document.title = 'Plano Astral · Crônicas de Aurelia';
      } else {
        mounted = false;
        mountStory(storyMatch?.[1]);
      }
      lastHash = hash;
      if (focusOnRender) {
        window.scrollTo({top: 0, behavior: 'instant'});
        root.querySelector('h1')?.focus({preventScroll: true});
      }
    },
    hide() {
      root.hidden = true;
      document.body.classList.remove('astral-open', 'astral-map-open');
      const home = document.getElementById('homeButton');
      home.setAttribute('aria-label', 'Voltar ao mapa de Aurelia');
      const label = home.querySelector('span:last-child');
      if (label) label.textContent = 'Mapa de Aurelia';
      lastHash = '';
    }
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href="#/astral"]');
    if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0 || location.hash.startsWith('#/astral')) return;
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault();
    document.startViewTransition({update: () => { location.hash = '#/astral'; window.AstralAtlas.render(); }, types: ['astral-open']});
  });
})();

