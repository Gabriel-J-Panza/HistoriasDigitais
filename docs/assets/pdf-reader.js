import * as pdfjsLib from "./vendor/pdfjs/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("./vendor/pdfjs/pdf.worker.mjs", import.meta.url).href;

const readers = new WeakMap();
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeReader = null;

function defaultBookZoom() {
  if (window.innerWidth <= 1280) return 1.15;
  if (window.innerWidth >= 1920) return .85;
  return 1;
}

function isPortraitBook() {
  return window.innerWidth <= 900 && window.innerHeight >= window.innerWidth;
}

document.addEventListener("keydown", event => {
  if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat) return;
  const target = event.target;
  if (target?.isContentEditable || target?.closest?.("input, textarea, select, [role=tab], [role=dialog]")) return;
  const direction = event.key === "ArrowLeft" || event.key.toLowerCase() === "a" ? "backward"
    : event.key === "ArrowRight" || event.key.toLowerCase() === "d" ? "forward" : null;
  if (!direction || !activeReader?.root.isConnected || activeReader.root.closest("#panel-ilustradas")?.hidden) return;
  if (activeReader.turnPage(direction)) event.preventDefault();
});

function halfCanvas(source, side) {
  const half = document.createElement("canvas");
  half.width = Math.floor(source.width / 2);
  half.height = source.height;
  const x = side === "right" ? source.width - half.width : 0;
  half.getContext("2d", { alpha: false }).drawImage(source, x, 0, half.width, half.height, 0, 0, half.width, half.height);
  half.setAttribute("aria-hidden", "true");
  return half;
}

function stackedCanvas(source) {
  const top = halfCanvas(source, "left");
  const bottom = halfCanvas(source, "right");
  const stacked = document.createElement("canvas");
  stacked.width = top.width;
  stacked.height = top.height + bottom.height;
  const context = stacked.getContext("2d", { alpha: false });
  context.drawImage(top, 0, 0);
  context.drawImage(bottom, 0, top.height);
  stacked.setAttribute("aria-hidden", "true");
  return stacked;
}

function turnSpread(frame, oldPage, newPage, direction) {
  const backward = direction === "backward";
  const still = document.createElement("div");
  still.className = `pdf-reader__still-half pdf-reader__still-half--${backward ? "right" : "left"}`;
  still.append(halfCanvas(oldPage, backward ? "right" : "left"));
  const sheet = document.createElement("div");
  sheet.className = `pdf-reader__turn-sheet pdf-reader__turn-sheet--${direction}`;
  const front = document.createElement("div");
  front.className = "pdf-reader__turn-face";
  front.append(halfCanvas(oldPage, backward ? "left" : "right"));
  const back = document.createElement("div");
  back.className = "pdf-reader__turn-face pdf-reader__turn-face--back";
  back.append(halfCanvas(newPage, backward ? "right" : "left"));
  sheet.append(front, back);
  frame.append(still, sheet);
  let timer;
  const cleanup = () => { clearTimeout(timer); still.remove(); sheet.remove(); };
  sheet.addEventListener("animationend", cleanup, { once: true });
  timer = setTimeout(cleanup, 850);
  return cleanup;
}

export async function mountPdfReader(root) {
  const existing = readers.get(root);
  if (existing) { activeReader = { root, turnPage: existing.turnPage }; existing.render(); return; }

  const canvas = root.querySelector("[data-pdf-canvas]");
  const status = root.querySelector("[data-pdf-status]");
  const pageLabel = root.querySelector("[data-pdf-page]");
  const zoomLabel = root.querySelector("[data-pdf-zoom]");
  const previous = root.querySelector("[data-pdf-prev]");
  const next = root.querySelector("[data-pdf-next]");
  const zoomOut = root.querySelector("[data-pdf-zoom-out]");
  const zoomIn = root.querySelector("[data-pdf-zoom-in]");
  const viewportElement = root.querySelector(".pdf-reader__viewport");
  const frame = root.querySelector(".pdf-reader__page-frame");
  const state = { document: null, page: 1, side: "left", zoom: 1, renderTask: null,
    version: 0, resizeTimer: null, turnCleanup: null, direction: "forward",
    animate: false, rendered: false, renderedMode: null, lastSize: "", render: () => {} };
  readers.set(root, state);

  const updateControls = () => {
    const pages = state.document?.numPages || 0;
    const storyPages = Math.max(0, pages - 2);
    if (!pages) pageLabel.textContent = "Preparando o livro…";
    else if (state.page === 1) pageLabel.textContent = "Capa · abrir o livro";
    else if (state.page === pages) pageLabel.textContent = "Contracapa · fim da história";
    else pageLabel.textContent = `Página ${state.page - 1} de ${storyPages}`;
    zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
    previous.disabled = !pages || state.page <= 1;
    next.disabled = !pages || state.page >= pages;
    previous.setAttribute("aria-label", state.page === 2 ? "Voltar para a capa" : "Virar página para trás");
    next.setAttribute("aria-label", state.page === pages - 1 ? "Ir para a contracapa" : state.page === 1 ? "Abrir o livro" : "Virar página para frente");
    zoomOut.disabled = state.zoom <= .65;
    zoomIn.disabled = state.zoom >= 1.8;
  };

  state.render = async () => {
    if (!state.document || root.hidden || root.offsetParent === null) return;
    const version = ++state.version;
    state.renderTask?.cancel();
    const pageNumber = state.page;
    const page = await state.document.getPage(pageNumber);
    if (version !== state.version) return;
    const mode = pageNumber === 1 ? "cover" : pageNumber === state.document.numPages ? "back-cover" : "spread";
    const portraitSpread = mode === "spread" && isPortraitBook();
    const base = page.getViewport({ scale: 1 });
    const style = getComputedStyle(viewportElement);
    const availableWidth = Math.max(180, viewportElement.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - 24);
    const availableHeight = Math.max(240, viewportElement.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) - 24);
    const pageWidth = portraitSpread ? base.width / 2 : base.width;
    const pageHeight = portraitSpread ? base.height * 2 : base.height;
    const fitScale = Math.min(availableWidth / pageWidth, availableHeight / pageHeight);
    const portraitWidth = viewportElement.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - 12;
    const portraitFitScale = Math.min(portraitWidth / pageWidth, availableHeight / pageHeight);
    const verticalFitScale = Math.max(0.1, viewportElement.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) - 12) / pageHeight;
    const scale = Math.min(fitScale * defaultBookZoom(), portraitSpread ? portraitFitScale : Infinity, verticalFitScale) * state.zoom;
    const viewport = page.getViewport({ scale });
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const rendered = document.createElement("canvas");
    rendered.width = Math.max(1, Math.floor(viewport.width * ratio));
    rendered.height = Math.max(1, Math.floor(viewport.height * ratio));
    if (!state.rendered) { status.hidden = false; status.textContent = `Carregando página ${pageNumber}…`; }
    let task;
    try {
      task = page.render({ canvasContext: rendered.getContext("2d", { alpha: false }), viewport,
        transform: ratio === 1 ? null : [ratio, 0, 0, ratio, 0, 0] });
      state.renderTask = task;
      await task.promise;
      if (state.renderTask !== task || version !== state.version) return;

      const visible = portraitSpread ? stackedCanvas(rendered) : rendered;
      const visibleWidth = portraitSpread ? viewport.width / 2 : viewport.width;
      const visibleHeight = portraitSpread ? viewport.height * 2 : viewport.height;
      const turn = state.animate && state.rendered && !reducedMotion.matches;
      const oldPage = turn && state.renderedMode === "spread" && mode === "spread" && !portraitSpread
        && canvas.width === visible.width && canvas.height === visible.height ? document.createElement("canvas") : null;
      if (oldPage) {
        oldPage.width = canvas.width;
        oldPage.height = canvas.height;
        oldPage.getContext("2d", { alpha: false }).drawImage(canvas, 0, 0);
      }
      state.turnCleanup?.();
      state.turnCleanup = null;
      if (canvas.width !== visible.width) canvas.width = visible.width;
      if (canvas.height !== visible.height) canvas.height = visible.height;
      canvas.style.width = `${visibleWidth}px`;
      canvas.style.height = `${visibleHeight}px`;
      canvas.getContext("2d", { alpha: false }).drawImage(visible, 0, 0);
      frame.style.width = `${visibleWidth}px`;
      frame.style.height = `${visibleHeight}px`;
      frame.dataset.bookPage = portraitSpread ? "single" : mode;
      viewportElement.dataset.bookPage = mode;
      canvas.setAttribute("aria-label", mode === "cover" ? "Capa da edição ilustrada" : mode === "back-cover" ? "Contracapa da edição ilustrada" : portraitSpread ? `Página ${pageNumber - 1}: ilustração acima e texto abaixo` : `Página ${pageNumber - 1} de ${state.document.numPages - 2}: arte à esquerda e texto à direita`);
      frame.classList.remove("turn-forward", "turn-backward");
      if (turn) {
        if (oldPage) state.turnCleanup = turnSpread(frame, oldPage, visible, state.direction);
        else { void frame.offsetWidth; frame.classList.add(state.direction === "backward" ? "turn-backward" : "turn-forward"); }
      }
      state.animate = false;
      state.rendered = true;
      state.renderedMode = mode;
      state.lastSize = `${viewportElement.clientWidth}x${viewportElement.clientHeight}`;
      if (state.resetView) {
        viewportElement.scrollTo({ top: 0, left: 0 });
        state.resetView = false;
      }
      status.hidden = true;
      updateControls();
    } catch (error) {
      if (error?.name !== "RenderingCancelledException") {
        status.hidden = false;
        status.textContent = "Não foi possível desenhar esta página. Tente abrir o PDF em tela cheia.";
        console.error(error);
      }
    } finally { if (state.renderTask === task) state.renderTask = null; }
  };

  const turnPage = direction => {
    const last = state.document?.numPages || 0;
    if (!last) return false;
    if (direction === "forward") {
      if (state.page < last) { state.page++; state.side = "left"; }
      else return false;
    } else if (state.page > 1) { state.page--; state.side = "left"; }
    else return false;
    state.direction = direction;
    state.animate = true;
    state.resetView = true;
    updateControls();
    state.render();
    return true;
  };
  state.turnPage = turnPage;
  activeReader = { root, turnPage };
  previous.addEventListener("click", () => turnPage("backward"));
  next.addEventListener("click", () => turnPage("forward"));
  zoomOut.addEventListener("click", () => { state.zoom = Math.max(.65, Math.round((state.zoom - .15) * 100) / 100); state.resetView = true; state.render(); });
  zoomIn.addEventListener("click", () => { state.zoom = Math.min(1.8, Math.round((state.zoom + .15) * 100) / 100); state.resetView = true; state.render(); });

  const observer = new ResizeObserver(() => {
    if (!state.document) return;
    const size = `${viewportElement.clientWidth}x${viewportElement.clientHeight}`;
    if (size === state.lastSize) return;
    clearTimeout(state.resizeTimer);
    state.resizeTimer = setTimeout(() => {
      if (`${viewportElement.clientWidth}x${viewportElement.clientHeight}` !== state.lastSize) state.render();
    }, 140);
  });
  observer.observe(viewportElement);
  updateControls();

  try {
    const source = new URL(root.dataset.pdf, document.baseURI).href;
    state.document = await pdfjsLib.getDocument({ url: source }).promise;
    updateControls();
    await state.render();
  } catch (error) {
    status.textContent = "Não foi possível carregar este PDF. Use a opção de abrir em tela cheia.";
    console.error(error);
  }
}
