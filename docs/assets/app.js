const CITIES = {
  dustywood: {
    name: "DustyWood", region: "Fronteira ocidental · cidade de madeira e poeira", accent: "#a45d35",
    lead: "Uma cidade acostumada a sobreviver em silêncio descobre que o medo pode assumir formas muito concretas quando a noite cai.",
    atmosphere: "Faroeste sombrio", conflict: "Desaparecimentos e criaturas", 
    heroes: [
      ["Kael", "Guerreiro", "A força do trio e o primeiro a se colocar entre os moradores e aquilo que caça na escuridão."],
      ["Lira", "Combatente e observadora", "Lê o medo das pessoas com a mesma atenção com que vigia uma rua antes do ataque."],
      ["Zane", "Investigador", "Desarma silêncios, encontra pistas e transforma rumores em um caminho que o grupo pode seguir."]
    ],
    npcs: [["Jim Crowley", "Xerife", "Carrega a responsabilidade por uma cidade que já não acredita ser possível proteger."], ["O velho garimpeiro", "Testemunha", "Seu relato sobre formas meio humanas, meio insetos, rompe o silêncio coletivo."], ["Moradores de DustyWood", "Comunidade", "Portas trancadas e vozes baixas revelam o custo cotidiano da ameaça."]]
  },
  eldor: {
    name: "Eldor", region: "Centro arcano · capital comercial", accent: "#4e6795",
    lead: "Torres de obsidiana, pedras preciosas e conhecimento sem limites fizeram de Eldor a joia de Aurelia — e também o palco de sua maior imprudência.",
    atmosphere: "Fantasia arcana", conflict: "Colapso tecnológico e mágico",
    heroes: [["Orin", "Guerreiro", "Segura a linha de frente com escudo, força e um bracelete de Aether que cobra caro por cada impacto."], ["Mirela", "Conjuradora", "Lê os fluxos do Aether e transforma conhecimento arcano em proteção, cura e uma chance de purificar a rede."], ["Soren", "Ladino", "Infiltra-se nos terminais do Novo Regime e desmonta por dentro as defesas que nenhuma lâmina alcançaria."]],
    npcs: [["Arquimago Eldrin", "Líder do Conselho", "Governante progressista cuja confiança no Aether conduz Eldor a uma era de ouro e a uma crise sem precedentes."], ["Conselho dos Sábios", "Governo arcano", "Mantém a balança de poder e responde pelas escolhas que transformaram magia em tecnologia."], ["Guilda dos Artífices", "Instituição", "Onde engenho, ambição e pesquisa se unem na criação do Aether."], ["Artífices dissidentes", "Inventores e reparadores", "Percebem que a inovação deixou de servir à cidade e ajudam a conter o que um dia construíram."]]
  },
  ghasthys: {
    name: "Ghasthys", region: "Terras esquecidas · cidade espectral", accent: "#5d806f",
    lead: "Em Ghasthys, os prédios sobreviveram aos habitantes. A cidade guarda seus mortos, seus erros e uma memória que não aceita desaparecer.",
    atmosphere: "Mistério sobrenatural", conflict: "Maldição e memória",
    heroes: [["Darian, Seris e Nilo", "Três viajantes", "A primeira equipe a entrar na cidade esquecida; precisam distinguir ameaça, pedido de ajuda e lembrança."], ["Rhea", "Nova comitiva · guerreira rúnica", "Uma das quatro novas heroínas que chegam depois da primeira missão para conter as fissuras deixadas pelos resquícios do Necromante."], ["Selene", "Nova comitiva · clériga alquimista", "Integra a segunda equipe e estabiliza feridos, runas e espíritos sem confundir cura com esquecimento."], ["Toren", "Nova comitiva · rastreador veterano", "Lê as mudanças da neblina e conduz a nova equipe pelas catacumbas, onde os sinais do Necromante ainda se repetem."], ["Maeron", "Nova comitiva · guardião das runas", "Quarto integrante da nova equipe, responsável por reconhecer e selar as anomalias que continuam abertas sob a cidade."], ["Os espíritos conscientes", "Vozes de Ghasthys", "Nem todos os mortos desejam atacar; alguns lutam para preservar a verdade do desastre."]],
    npcs: [["Mestres do antigo ritual", "Arcanistas do passado", "Tentaram moldar forças adormecidas e condenaram a população à prisão espectral."], ["Sobreviventes", "Exilados", "Carregam para fora das muralhas versões fragmentadas do dia em que a cidade morreu."], ["Habitantes aprisionados", "Memória coletiva", "Suas almas permanecem ligadas às pedras, repetindo dores e lembranças."]]
  },
  glacius: {
    name: "Glacius", region: "Cordilheira do norte · reino de gelo", accent: "#5689a9",
    lead: "Dez cristais guardam ecos de um deus-dragão. Quando todos são corrompidos, três viajantes atravessam reinos quebrados para impedir que a malícia desperte algo maior.",
    atmosphere: "Jornada épica", conflict: "Dez cristais corrompidos",
    heroes: [["Kael", "Guerreiro", "Força inabalável que sustenta a expedição quando cada cristal transforma o terreno e seus guardiões."], ["Lyra", "Escriba", "Conhecimento, leitura e memória permitem compreender os ecos antes de tentar purificá-los."], ["Elian", "Mago", "Sente o fluxo mágico dos cristais e reconhece quando a força bruta alimentaria a corrupção."]],
    npcs: [["Crystalix", "Entidade corruptora", "Malícia de origem incerta que distorce os dez ecos da alma do deus-dragão."], ["Rei Midas", "Soberano amaldiçoado", "A tirania avarenta o transforma em prisioneiro de um reino feito de ouro e perda."], ["Guardiões dos ecos", "Adversários", "Cada domínio manifesta uma forma particular da corrupção."]]
  },
  califa: {
    name: "Califa", region: "Deserto meridional · antiga Vera Cruz", accent: "#a45232",
    lead: "Antes de Califa houve Vera Cruz, um reino mantido por Sete Casas. A queda desse equilíbrio abre caminho para tirania, exílio e uma reconquista que precisa decidir o que merece ser restaurado.",
    atmosphere: "Intriga política", conflict: "Tirania, sucessão e revolta",
    heroes: [["Osório", "Comandante", "Conduz a retomada sem permitir que libertação se torne justificativa para vingança."], ["Lucena", "Provedora", "Mantém grãos, remédios e armas em movimento para que a guerra não destrua quem pretende salvar."], ["Bragança", "Diplomata", "Reúne herdeiros e representantes das Casas sem tratar sangue como resposta suficiente."]],
    npcs: [["Casa Tarantina", "Regime dominante", "Transforma Califa em fortaleza e usa escassez, medo e controle das estradas como armas."], ["Casas Habsburgo, Romanov, Vargas e Wuhong", "Pilares de Vera Cruz", "Completam o antigo equilíbrio político e retornam ao debate sobre o futuro da cidade."], ["Arquimago Eldrin", "Aliado de Eldor", "Oferece apoio material sem exigir submissão ou território em troca."]]
  },
  celestria: {
    name: "Celestria", region: "Costa oriental · celeiro de Aurelia", accent: "#6f4f86",
    lead: "Uma terra de colheitas fartas e águas ricas aprende que prosperidade também atrai quem deseja convertê-la em poder, obediência e sacrifício.",
    atmosphere: "Fantasia régia", conflict: "Conspiração e golpe",
    heroes: [["Rainha Isabel Wrynn", "Soberana e guardiã", "Protege cidade e defensores mesmo quando os próprios mecanismos de proteção são voltados contra o reino."], ["Orin", "Guerreiro do grupo de Eldor", "Abre caminho pela cidade sitiada e sustenta a linha de frente até que o grupo alcance o palácio."], ["Mirela", "Conjuradora do grupo de Eldor", "Reconhece nas correntes dos obeliscos uma corrupção parecida com aquela que enfrentou na rede de Aether."], ["Soren", "Ladino do grupo de Eldor", "Usa passagens laterais, sabota mecanismos da Irmandade e alcança brechas que um ataque frontal não alcançaria."]],
    npcs: [["Valerius", "Aristocrata", "Ajuda a enfraquecer as defesas e descobre tarde demais que nunca seria senhor do novo regime."], ["Capitão Marek", "Comandante da Guarda", "Veterano do primeiro confronto contra Bane; percebe a infiltração antes que a Irmandade revele seu ritual."], ["Irmandade Escarlate", "Ordem conspiradora", "Transforma obras de proteção em uma rede de extração e cerco."], ["Guarda leal", "Defensores", "Recua até o salão do trono para preservar a última linha de resistência."]]
  },
  dustcreek: {
    name: "DuskCreek", region: "Borda do deserto · povoado tranquilo", accent: "#7c5934",
    lead: "Pequena demais para aparecer nos grandes conselhos e importante demais para ser ignorada, DuskCreek se torna o centro de uma disputa por artefatos, rotas e conhecimento.",
    atmosphere: "Fronteira e conspiração", conflict: "Artefato e Guilda da Serpente",
    heroes: [["Kael", "Guerreiro", "Volta para casa e precisa trocar o ataque direto pela paciência de quem conhece cada trilha."], ["Lira", "Defensora", "Mantém aberta uma passagem para os feridos quando quase todas as rotas da cidade caem."], ["Lyra", "Vigia", "Mapeia patrulhas e brechas entre os telhados durante a ocupação."], ["Zane", "Estudioso", "Esconde conhecimento decisivo dos invasores e tenta compreender o artefato sem se tornar seu dono."], ["Borin", "Clérigo", "Sustenta os moradores quando não há espaço para erguer o martelo."]],
    npcs: [["Guilda da Serpente", "Rede clandestina", "Procura controlar o artefato, as rotas e as descobertas que ligam DuskCreek a outras cidades."], ["Moradores de DuskCreek", "Comunidade", "Sobrevivem entre ocupação, reconstrução e a promessa difícil de uma aliança regional."], ["Observadores de Ghost Canyon", "Exploradores", "Mantêm vivas as histórias sobre o cânion e o segredo enterrado além das montanhas."]]
  },
  sylvaris: {
    name: "Sylvaris", region: "Floresta oriental · cidade da Árvore-Mundo", accent: "#477a52",
    lead: "Casas vivas, raízes antigas e uma ponte para o Plano Astral fazem de Sylvaris um organismo inteiro — capaz de florescer, adoecer e pedir ajuda.",
    atmosphere: "Fantasia natural e astral", conflict: "Corrupção e fronteira entre mundos",
    heroes: [["Maelis", "Patrulheira élfica", "Segue a marca astral e guia o grupo sem confundir coragem com pressa."], ["Dagna", "Clériga humana", "Protege os companheiros e aprende a reconhecer o chamado sem tratá-lo como uma ordem divina."], ["Theron", "Feiticeiro meio-elfo", "Desfaz ilusões e encontra limites para uma energia que resiste ao aprisionamento."], ["Varkesh", "Draconato verde", "Mantém o caminho de volta aberto quando o Plano Astral rompe gravidade e direção."]],
    npcs: [["Elowen", "Guardiã da Árvore-Mundo", "Sustenta a ligação entre mundos e recusa soluções que salvem a cidade sacrificando os viajantes."], ["Célula da Guilda da Serpente", "Contrabandistas", "Tenta transformar uma cicatriz astral em rota de lucro e fuga."], ["Presenças astrais", "Entidades desconhecidas", "Observam do outro lado do véu, mas não servem à Guilda nem cabem nas explicações dos invasores."]]
  }
};

const STORY_DECKS = {
  "Sussurros em DustyWood": "Famílias somem durante a noite, e três aventureiros seguem pistas que a cidade preferia manter enterradas.",
  "O Colapso do Aether": "A grande invenção de Eldor começa a sair do controle — e seus criadores precisam encarar o estrago.",
  "A Cidade dos Espectros": "Em Ghasthys, os mortos continuam por perto e cada rua parece guardar uma versão diferente do passado.",
  "Os Dez Ecos do Dragão": "Dez cristais corrompidos, dez lugares perigosos e uma jornada que não perdoa decisões apressadas.",
  "O Trono de Sangue de Califa": "As Sete Casas tentam retomar Vera Cruz sem repetir a violência que derrubou o antigo reino.",
  "As Sombras de Celestria": "Por trás das colheitas fartas, uma irmandade compra confiança e prepara um golpe mágico.",
  "A Crônica de DuskCreek": "O segredo de Ghost Canyon quebra a fachada tranquila do povoado e muda quem manda ali.",
  "O Lamento de Sylvaris": "A Árvore-Mundo adoece, e a equipe precisa descer às raízes antes que a floresta perca o próprio rumo.",
  "As Cinzas de Vera Cruz": "As Casas voltam para libertar Califa, mas vencer a guerra não resolve sozinho o que causou a queda.",
  "A Coroa e as Correntes": "O golpe chega ao palácio, e as defesas de Celestria viram uma armadilha contra a própria cidade.",
  "O Preço do Retorno": "Kael volta para uma DuskCreek ocupada e descobre que seus aliados tiveram de aprender a resistir sem ele.",
  "Além do Véu": "Quatro marcas levam o grupo até uma rachadura no Plano Astral — e talvez não exista caminho simples de volta."
};

const CHRONICLE_ART = {
  dustywood: ["assets/chronicles/dustywood.webp", "A rua silenciosa de DustyWood ao pôr do sol, cercada pelo deserto"],
  eldor: ["assets/chronicles/eldor.webp", "As torres de obsidiana e as pontes iluminadas pelo Aether em Eldor"],
  ghasthys: ["assets/chronicles/ghasthys.webp", "As ruínas de Ghasthys tomadas por névoa espectral sob a lua"],
  glacius: ["assets/chronicles/glacius.webp", "O reino gelado de Glacius entre montanhas e cristais distantes"],
  califa: ["assets/chronicles/califa.webp", "A cidade fortificada de Califa além das dunas e das antigas rotas de Vera Cruz"],
  celestria: ["assets/chronicles/celestria.webp", "Os campos, o litoral e o palácio de Celestria sob a luz da manhã"],
  dustcreek: ["assets/chronicles/dustcreek.webp", "DuskCreek junto ao riacho, com Ghost Canyon ao fundo"],
  sylvaris: ["assets/chronicles/sylvaris.webp", "A cidade viva de Sylvaris construída ao redor da Árvore-Mundo"]
};

const HOTMART_FALLBACK_URL = "https://historias-digitais-ilustradas.hotmart.host/hqs-pagas";
const ILLUSTRATED_EDITIONS = {
  eldor: {
    access: "public",
    editions: [{ title: "O Colapso do Aether", pdf: "assets/pdfs/eldor-colapso-aether.pdf?v=2" }]
  },
  celestria: {
    access: "public",
    editions: [
      { title: "As Sombras de Celestria", pdf: "assets/pdfs/celestria-sombras.pdf" },
      { title: "A Coroa e as Correntes", pdf: "assets/pdfs/celestria-coroa-correntes.pdf" }
    ]
  },
  dustcreek: {
    access: "public",
    editions: [
      { title: "A Crônica de DuskCreek", pdf: "assets/pdfs/duskcreek-cronica.pdf" },
      { title: "O Preço do Retorno", pdf: "assets/pdfs/duskcreek-preco-retorno.pdf" }
    ]
  },
  sylvaris: {
    access: "public",
    editions: [
      { title: "O Lamento de Sylvaris", pdf: "assets/pdfs/sylvaris-lamento.pdf" },
      { title: "Além do Véu", pdf: "assets/pdfs/sylvaris-alem-do-veu.pdf" }
    ]
  },
  dustywood: { access: "premium", editions: [{ title: "Sussurros em DustyWood", purchaseUrl: "https://pay.hotmart.com/H106190297T?off=jbct8sfw&hotfeature=51" }] },
  ghasthys: { access: "premium", editions: [{ title: "A Cidade dos Espectros", purchaseUrl: "https://pay.hotmart.com/V106299624T?off=bunazun0&hotfeature=51" }] },
  glacius: { access: "premium", editions: [{ title: "Os Dez Ecos do Dragão", purchaseUrl: "https://pay.hotmart.com/Q106190674R?off=qosror76&hotfeature=51" }] },
  califa: {
    access: "premium",
    editions: [
      { title: "O Trono de Sangue de Califa", purchaseUrl: "https://pay.hotmart.com/J107177004O?off=2d1mekur&hotfeature=51" },
      { title: "As Cinzas de Vera Cruz", purchaseUrl: "https://pay.hotmart.com/H107744749M?off=btb7a2rz&hotfeature=51" }
    ]
  }
};

const el = (id) => document.getElementById(id);
const slug = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const stories = window.AURELIA_STORIES || [];
const expansions = window.AURELIA_EXPANSIONS || {};
let bookStep = 0;
let pdfReaderModulePromise;

function mountCurrentPdfReader() {
  const viewer = el("panel-ilustradas")?.querySelector("[data-pdf-viewer]");
  if (!viewer) return;
  pdfReaderModulePromise ||= import("./pdf-reader.js");
  pdfReaderModulePromise.then(module => module.mountPdfReader(viewer)).catch(error => {
    console.error("Não foi possível carregar o leitor de PDF.", error);
    const status = viewer.querySelector("[data-pdf-status]");
    if (status) status.textContent = "Não foi possível carregar este PDF. Use a opção de abrir em tela cheia.";
  });
}

function setBookStep(step) {
  bookStep = Math.max(0, Math.min(3, step));
  const stage = el("atlasStage");
  stage.dataset.bookStep = String(bookStep);
  document.querySelectorAll("[data-book-panel]").forEach((panel, index) => {
    const active = index === bookStep;
    panel.classList.toggle("is-active", active);
    panel.setAttribute("aria-hidden", String(!active));
  });
  const previous = el("bookPrev");
  const next = el("bookNext");
  previous.hidden = bookStep === 0;
  next.hidden = bookStep === 0 || bookStep === 3;
  previous.querySelector(".atlas-nav__label").textContent = bookStep === 3 ? "Mapa" : bookStep === 2 ? "Introdução" : "Capa";
  next.querySelector(".atlas-nav__label").textContent = bookStep === 2 ? "Próxima página" : "Mapa";
  const dots = [...el("bookProgress").children];
  dots.forEach((dot, index) => dot.classList.toggle("is-current", index === bookStep));
  el("bookProgress").setAttribute("aria-label", `Página ${bookStep + 1} de 4`);
}

function renderLegend() {
  el("mapLegend").innerHTML = Object.entries(CITIES).map(([id, c]) => `<a href="#/cidade/${id}">${c.name}</a>`).join("");
}

function personCards(list) {
  return list.map(([name, role, text]) => `<article class="person-card"><h2>${name}</h2><p class="person-role">${role}</p><p>${text}</p></article>`).join("");
}

function distributeExpansionParagraphs(paragraphs, additions) {
  if (!additions.length) return [...paragraphs];
  const insertionPoints = additions.map((_, index) => Math.max(1, Math.round(((index + 1) * paragraphs.length) / (additions.length + 1))));
  const result = [];
  paragraphs.forEach((paragraph, index) => {
    result.push(paragraph);
    additions.forEach((addition, additionIndex) => {
      if (insertionPoints[additionIndex] === index + 1) result.push(addition);
    });
  });
  return result;
}

function illustratedStoryButton(cityId, storyIndex) {
  const collection = ILLUSTRATED_EDITIONS[cityId];
  const edition = collection?.editions[storyIndex];
  if (!collection || !edition) return "";
  if (collection.access === "public") {
    return `<button class="illustrated-cta" type="button" data-open-pdf="${storyIndex}"><span aria-hidden="true">▣</span> Ler edição ilustrada</button>`;
  }
  return `<button class="illustrated-cta illustrated-cta--premium" type="button" data-open-store="${cityId}" data-edition-index="${storyIndex}"><span aria-hidden="true">✦</span> Conhecer edição ilustrada</button>`;
}

function publicPdfReader(cityId, selectedIndex = 0) {
  const collection = ILLUSTRATED_EDITIONS[cityId];
  const editions = collection?.editions || [];
  if (!editions.length) return "";
  const safeIndex = Math.max(0, Math.min(selectedIndex, editions.length - 1));
  const selected = editions[safeIndex];
  return `<div class="illustrated-intro"><p class="eyebrow">Leitura gratuita</p><h2>Edições ilustradas de ${CITIES[cityId].name}</h2><p>Leia o PDF completo sem sair do site. Você também pode abrir em tela cheia ou baixar uma cópia para ler depois.</p></div>
    <div class="edition-selector" role="group" aria-label="Edições ilustradas disponíveis">${editions.map((edition, index) => `<button type="button" class="edition-selector__item${index === safeIndex ? " is-active" : ""}" data-select-pdf="${index}" aria-pressed="${index === safeIndex}"><span>Crônica ${index + 1}</span><strong>${edition.title}</strong></button>`).join("")}</div>
    <section class="pdf-reader" aria-labelledby="pdfReaderTitle" data-pdf-viewer data-pdf="${selected.pdf}">
      <div class="pdf-reader__bar"><div><span>Edição ilustrada</span><strong id="pdfReaderTitle">${selected.title}</strong></div><div class="pdf-reader__actions"><a href="${selected.pdf}" target="_blank" rel="noopener" aria-label="Abrir ${selected.title} em uma nova aba">Abrir em tela cheia ↗</a><a href="${selected.pdf}" download>Baixar PDF</a></div></div>
      <div class="pdf-reader__toolbar" aria-label="Controles do leitor">
        <button type="button" data-pdf-prev aria-label="Página anterior">←</button>
        <span data-pdf-page>Página — de —</span>
        <button type="button" data-pdf-next aria-label="Próxima página">→</button>
        <span class="pdf-reader__toolbar-spacer"></span>
        <button type="button" data-pdf-zoom-out aria-label="Diminuir página">−</button>
        <span data-pdf-zoom>100%</span>
        <button type="button" data-pdf-zoom-in aria-label="Aumentar página">+</button>
      </div>
      <div class="pdf-reader__viewport"><p class="pdf-reader__status" data-pdf-status role="status">Preparando a edição ilustrada…</p><canvas data-pdf-canvas aria-label="Página do PDF"></canvas></div>
      <p class="pdf-reader__fallback">Se o leitor não aparecer no seu navegador, <a href="${selected.pdf}" target="_blank" rel="noopener">abra o PDF diretamente</a>.</p>
    </section>`;
}

function premiumEditionPanel(cityId) {
  const editions = ILLUSTRATED_EDITIONS[cityId]?.editions || [];
  return `<section class="premium-edition"><span class="premium-edition__mark" aria-hidden="true">✦</span><p class="eyebrow">Edição ilustrada premium</p><h2>As crônicas de ${CITIES[cityId].name} também ganharam imagens</h2><p>O blog continua disponível gratuitamente em sua versão completa e detalhada. A edição ilustrada é uma alternativa para quem prefere acompanhar a história como uma HQ digital e quer apoiar a produção das próximas crônicas.</p><ul class="premium-edition__products">${editions.map((edition, index) => `<li><span>${edition.title}</span><button class="button button--store" type="button" data-open-store="${cityId}" data-edition-index="${index}">Ver na Hotmart ↗</button></li>`).join("")}</ul><small>Você verá um aviso antes de sair do site.</small></section>`;
}

function renderIllustratedPanel(cityId, selectedIndex = 0) {
  const collection = ILLUSTRATED_EDITIONS[cityId];
  el("panel-ilustradas").innerHTML = collection?.access === "public" ? publicPdfReader(cityId, selectedIndex) : premiumEditionPanel(cityId);
  if (collection?.access === "public") requestAnimationFrame(mountCurrentPdfReader);
}

function openStoreDialog(cityId, editionIndex = 0) {
  const dialog = el("externalStoreDialog");
  const edition = ILLUSTRATED_EDITIONS[cityId]?.editions?.[editionIndex];
  const editionName = edition?.title || "Esta edição ilustrada";
  const cityName = CITIES[cityId]?.name || "Aurelia";
  el("storeDialogMessage").innerHTML = `<strong>${editionName}</strong>, de ${cityName}, é uma história ilustrada paga. A compra ajuda a manter o blog gratuito e apoia o desenvolvedor por trás do projeto. Ao continuar, a página da Hotmart será aberta em uma nova aba.`;
  el("confirmStoreLink").href = edition?.purchaseUrl || HOTMART_FALLBACK_URL;
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function renderCity(id) {
  const city = CITIES[id];
  if (!city) return showMap();
  document.body.classList.add("city-open");
  el("mapView").hidden = true;
  el("cityView").hidden = false;
  el("homeButton").style.visibility = "visible";
  el("cityName").textContent = city.name;
  el("cityRegion").textContent = city.region;
  el("cityLead").textContent = city.lead;
  el("cityMasthead").style.setProperty("--accent", city.accent);
  el("cityFacts").innerHTML = `<div><dt>Tom</dt><dd>${city.atmosphere}</dd></div><div><dt>Conflito central</dt><dd>${city.conflict}</dd></div><div><dt>Crônicas</dt><dd>${stories.filter(s => s.city === id).length}</dd></div>`;

  const cityStories = stories.filter(s => s.city === id);
  const article = [];
  const nav = [];
  cityStories.forEach((story, storyIndex) => {
    const [artSrc, artAlt] = CHRONICLE_ART[id] || [];
    const art = artSrc ? `<figure class="story-illustration"><img src="${artSrc}" alt="${artAlt}" width="1440" height="810" loading="lazy" decoding="async"></figure>` : "";
    article.push(`<header class="story-header"><span class="volume-label">Crônica ${storyIndex + 1}</span><h2>${story.title}</h2><p class="story-deck">${STORY_DECKS[story.title] || "Uma crônica de Aurelia."}</p>${illustratedStoryButton(id, storyIndex)}${art}</header>`);
    story.chapters.forEach((chapter, chapterIndex) => {
      const chapterId = `${slug(story.title)}-${chapterIndex + 1}`;
      nav.push(`<button type="button" data-chapter="${chapterId}">${storyIndex + 1}.${chapterIndex + 1} ${chapter.title}</button>`);
      let paragraphs = [...chapter.paragraphs];
      const expanded = expansions[story.title]?.[chapterIndex] || [];
      paragraphs = distributeExpansionParagraphs(paragraphs, expanded);
      if (id === "celestria") {
        const names = [[/\bA jovem rainha(?! Isabel Wrynn)\b/g, "A rainha Isabel Wrynn"], [/\ba jovem rainha(?! Isabel Wrynn)\b/g, "a rainha Isabel Wrynn"], [/\bA nova rainha(?! Isabel Wrynn)\b/g, "A rainha Isabel Wrynn"], [/\ba nova rainha(?! Isabel Wrynn)\b/g, "a rainha Isabel Wrynn"], [/\bA rainha de Celestria(?! Isabel Wrynn)\b/g, "A rainha Isabel Wrynn"], [/\ba rainha de Celestria(?! Isabel Wrynn)\b/g, "a rainha Isabel Wrynn"], [/\bA rainha(?! Isabel Wrynn)\b/g, "A rainha Isabel Wrynn"], [/\ba rainha(?! Isabel Wrynn)\b/g, "a rainha Isabel Wrynn"], [/\bRainha Celestina\b/g, "Rainha Isabel Wrynn"], [/\bO guerreiro\b/g, "Orin"], [/\bo guerreiro\b/g, "Orin"], [/\bA maga\b/g, "Mirela"], [/\ba maga\b/g, "Mirela"], [/\bO ladino\b/g, "Soren"], [/\bo ladino\b/g, "Soren"], [/\bO Capitão\b/g, "Capitão Marek"], [/\bo Capitão\b/g, "Capitão Marek"]];
        paragraphs.splice(0, paragraphs.length, ...paragraphs.map(paragraph => names.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), paragraph)));
      }
      if (id === "ghasthys") {
        const names = [[/\bO Ladino Scion of the Three\b/g, "Nilo"], [/\bO Ladino\b/g, "Nilo"], [/\bo ladino\b/g, "Nilo"], [/\bA Maga\b/g, "Seris"], [/\ba maga\b/g, "Seris"], [/\bO Guerreiro\b/g, "Darian"], [/\bo guerreiro\b/g, "Darian"]];
        paragraphs.splice(0, paragraphs.length, ...paragraphs.map(paragraph => names.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), paragraph)));
      }
      if (id === "eldor") {
        const names = [[/\bO Guerreiro do grupo\b/g, "Orin"], [/\bo Guerreiro do grupo\b/g, "Orin"], [/\bO Guerreiro\b/g, "Orin"], [/\bo guerreiro\b/g, "Orin"], [/\bA Conjuradora\b/g, "Mirela"], [/\ba Conjuradora\b/g, "Mirela"], [/\bA conjuradora\b/g, "Mirela"], [/\ba conjuradora\b/g, "Mirela"], [/\bO Ladino\b/g, "Soren"], [/\bo Ladino\b/g, "Soren"], [/\bO ladino\b/g, "Soren"], [/\bo ladino\b/g, "Soren"]];
        paragraphs.splice(0, paragraphs.length, ...paragraphs.map(paragraph => names.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), paragraph)));
      }
      article.push(`<section class="chapter" id="${chapterId}"><span class="chapter-number">Capítulo ${chapterIndex + 1}</span><h3>${chapter.title}</h3>${paragraphs.map(p => `<p>${p}</p>`).join("")}</section>`);
    });
  });
  el("panel-historias").innerHTML = article.join("");
  el("chapterNav").innerHTML = `<div class="chapter-nav__header"><strong>Nesta cidade</strong><button class="chapter-nav__toggle" type="button" aria-expanded="true" aria-label="Recolher sumário" title="Recolher sumário">‹</button></div><div class="chapter-nav__items">${nav.join("")}</div>`;
  el("cityContent").classList.remove("nav-collapsed");
  el("panel-herois").innerHTML = personCards(city.heroes);
  el("panel-npcs").innerHTML = personCards(city.npcs);
  renderIllustratedPanel(id);
  selectTab("historias");
  document.title = `${city.name} · Crônicas de Aurelia`;
  window.scrollTo({top: 0});
}

function showMap() {
  document.body.classList.remove("city-open");
  el("mapView").hidden = false;
  el("cityView").hidden = true;
  el("homeButton").style.visibility = "hidden";
  document.title = "Crônicas de Aurelia";
  window.scrollTo({top: 0});
}

function selectTab(name) {
  document.querySelectorAll("[role=tab]").forEach(btn => btn.setAttribute("aria-selected", String(btn.dataset.tab === name)));
  ["historias", "ilustradas", "herois", "npcs"].forEach(tab => el(`panel-${tab}`).hidden = tab !== name);
  el("chapterNav").hidden = name !== "historias";
  el("cityContent").classList.toggle("illustrated-open", name === "ilustradas");
  if (name === "ilustradas") requestAnimationFrame(mountCurrentPdfReader);
}

function route() {
  const match = location.hash.match(/^#\/cidade\/([a-z]+)$/);
  match ? renderCity(match[1]) : showMap();
}

el("homeButton").addEventListener("click", () => { setBookStep(2); location.hash = "#/"; });
document.querySelector(".wordmark").addEventListener("click", () => setBookStep(0));
el("openBook").addEventListener("click", () => setBookStep(1));
el("bookPrev").addEventListener("click", () => setBookStep(bookStep - 1));
el("bookNext").addEventListener("click", () => setBookStep(bookStep + 1));
el("chapterNav").addEventListener("click", event => {
  const toggle = event.target.closest(".chapter-nav__toggle");
  if (toggle) {
    const collapsed = el("cityContent").classList.toggle("nav-collapsed");
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.setAttribute("aria-label", collapsed ? "Abrir sumário" : "Recolher sumário");
    toggle.title = collapsed ? "Abrir sumário" : "Recolher sumário";
    toggle.textContent = collapsed ? "›" : "‹";
    return;
  }
  const button = event.target.closest("[data-chapter]");
  if (!button) return;
  document.getElementById(button.dataset.chapter)?.scrollIntoView({behavior: "smooth", block: "start"});
});
el("panel-historias").addEventListener("click", event => {
  const pdfButton = event.target.closest("[data-open-pdf]");
  if (pdfButton) {
    const cityId = location.hash.match(/^#\/cidade\/([a-z]+)$/)?.[1];
    if (!cityId) return;
    renderIllustratedPanel(cityId, Number(pdfButton.dataset.openPdf));
    selectTab("ilustradas");
    el("panel-ilustradas").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const storeButton = event.target.closest("[data-open-store]");
  if (storeButton) openStoreDialog(storeButton.dataset.openStore, Number(storeButton.dataset.editionIndex || 0));
});
el("panel-ilustradas").addEventListener("click", event => {
  const selector = event.target.closest("[data-select-pdf]");
  if (selector) {
    const cityId = location.hash.match(/^#\/cidade\/([a-z]+)$/)?.[1];
    if (cityId) renderIllustratedPanel(cityId, Number(selector.dataset.selectPdf));
    return;
  }
  const storeButton = event.target.closest("[data-open-store]");
  if (storeButton) openStoreDialog(storeButton.dataset.openStore, Number(storeButton.dataset.editionIndex || 0));
});
const closeStoreDialog = () => el("externalStoreDialog").close?.();
el("closeStoreDialog").addEventListener("click", closeStoreDialog);
el("cancelStoreLink").addEventListener("click", closeStoreDialog);
el("confirmStoreLink").addEventListener("click", closeStoreDialog);
el("externalStoreDialog").addEventListener("click", event => {
  if (event.target === el("externalStoreDialog")) closeStoreDialog();
});
document.querySelectorAll("[role=tab]").forEach(btn => btn.addEventListener("click", () => selectTab(btn.dataset.tab)));
document.querySelectorAll("[role=tab]").forEach(btn => btn.addEventListener("keydown", e => {
  if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
  const tabs = [...document.querySelectorAll("[role=tab]")];
  const next = (tabs.indexOf(btn) + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
  tabs[next].focus(); tabs[next].click();
}));
window.addEventListener("hashchange", route);
renderLegend();
setBookStep(0);
route();
