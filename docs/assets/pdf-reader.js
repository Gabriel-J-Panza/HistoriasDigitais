import * as pdfjsLib from "./vendor/pdfjs/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("./vendor/pdfjs/pdf.worker.mjs", import.meta.url).href;

const readers = new WeakMap();

export async function mountPdfReader(root) {
  const existing = readers.get(root);
  if (existing) {
    existing.render();
    return;
  }

  const canvas = root.querySelector("[data-pdf-canvas]");
  const status = root.querySelector("[data-pdf-status]");
  const pageLabel = root.querySelector("[data-pdf-page]");
  const zoomLabel = root.querySelector("[data-pdf-zoom]");
  const previous = root.querySelector("[data-pdf-prev]");
  const next = root.querySelector("[data-pdf-next]");
  const zoomOut = root.querySelector("[data-pdf-zoom-out]");
  const zoomIn = root.querySelector("[data-pdf-zoom-in]");
  const viewportElement = root.querySelector(".pdf-reader__viewport");
  const pageFrame = root.querySelector(".pdf-reader__page-frame");
  const state = { document: null, page: 1, zoom: 1, renderTask: null, renderVersion: 0, resizeTimer: null, turnDirection: "forward", animatePageTurn: false, hasRendered: false, lastViewportSize: "", render: () => {} };
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
    const renderVersion = ++state.renderVersion;
    state.renderTask?.cancel();
    const pageNumber = state.page;
    const page = await state.document.getPage(pageNumber);
    if (state.page !== pageNumber || renderVersion !== state.renderVersion) return;
    const baseViewport = page.getViewport({ scale: 1 });
    const viewportStyle = getComputedStyle(viewportElement);
    const paddingX = parseFloat(viewportStyle.paddingLeft) + parseFloat(viewportStyle.paddingRight);
    const paddingY = parseFloat(viewportStyle.paddingTop) + parseFloat(viewportStyle.paddingBottom);
    const availableWidth = Math.max(280, viewportElement.clientWidth - paddingX - 16);
    const maxPageHeight = Math.max(280, viewportElement.clientHeight - paddingY - 16);
    const fitScale = Math.min(availableWidth / baseViewport.width, maxPageHeight / baseViewport.height);
    const cssScale = fitScale * state.zoom;
    const viewport = page.getViewport({ scale: cssScale });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const renderCanvas = document.createElement("canvas");
    renderCanvas.width = Math.floor(viewport.width * pixelRatio);
    renderCanvas.height = Math.floor(viewport.height * pixelRatio);
    const context = renderCanvas.getContext("2d", { alpha: false });
    const pages = state.document.numPages;
    const mode = pageNumber === 1 ? "cover" : pageNumber === pages ? "back-cover" : "spread";
    if (!state.hasRendered) {
      status.hidden = false;
      status.textContent = `Carregando página ${pageNumber}…`;
    }
    let renderTask;
    try {
      renderTask = page.render({ canvasContext: context, viewport, transform: pixelRatio === 1 ? null : [pixelRatio, 0, 0, pixelRatio, 0, 0] });
      state.renderTask = renderTask;
      await renderTask.promise;
      if (state.renderTask !== renderTask || state.page !== pageNumber || renderVersion !== state.renderVersion) return;

      if (canvas.width !== renderCanvas.width) canvas.width = renderCanvas.width;
      if (canvas.height !== renderCanvas.height) canvas.height = renderCanvas.height;
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;
      canvas.getContext("2d", { alpha: false }).drawImage(renderCanvas, 0, 0);
      canvas.hidden = false;
      viewportElement.dataset.bookPage = mode;
      canvas.dataset.bookPage = mode;
      canvas.setAttribute("aria-label", mode === "cover" ? "Capa da edição ilustrada" : mode === "back-cover" ? "Contracapa da edição ilustrada" : `Página ${pageNumber - 1} de ${pages - 2}: arte à esquerda e texto à direita`);

      pageFrame.classList.remove("turn-forward", "turn-backward");
      if (state.animatePageTurn) {
        void pageFrame.offsetWidth;
        pageFrame.classList.add(state.turnDirection === "backward" ? "turn-backward" : "turn-forward");
        state.animatePageTurn = false;
      }
      state.hasRendered = true;
      state.lastViewportSize = `${viewportElement.clientWidth}x${viewportElement.clientHeight}`;
      status.hidden = true;
      updateControls();
    } catch (error) {
      if (error?.name !== "RenderingCancelledException") {
        status.hidden = false;
        status.textContent = "Não foi possível desenhar esta página. Tente abrir o PDF em tela cheia.";
        console.error(error);
      }
    } finally {
      if (state.renderTask === renderTask) state.renderTask = null;
    }
  };

  previous.addEventListener("click", () => { if (state.page > 1) { state.turnDirection = "backward"; state.animatePageTurn = true; state.page--; updateControls(); state.render(); } });
  next.addEventListener("click", () => { if (state.page < state.document.numPages) { state.turnDirection = "forward"; state.animatePageTurn = true; state.page++; updateControls(); state.render(); } });
  zoomOut.addEventListener("click", () => { state.zoom = Math.max(.65, state.zoom - .15); state.render(); });
  zoomIn.addEventListener("click", () => { state.zoom = Math.min(1.8, state.zoom + .15); state.render(); });

  const observer = new ResizeObserver(() => {
    if (!state.document) return;
    const currentSize = `${viewportElement.clientWidth}x${viewportElement.clientHeight}`;
    if (currentSize === state.lastViewportSize) return;
    clearTimeout(state.resizeTimer);
    state.resizeTimer = setTimeout(() => {
      const settledSize = `${viewportElement.clientWidth}x${viewportElement.clientHeight}`;
      if (settledSize !== state.lastViewportSize) state.render();
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
