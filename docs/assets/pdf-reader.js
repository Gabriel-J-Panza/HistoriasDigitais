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
  const state = { document: null, page: 1, zoom: 1, renderTask: null, resizeTimer: null, render: () => {} };
  readers.set(root, state);

  const updateControls = () => {
    const pages = state.document?.numPages || 0;
    pageLabel.textContent = pages ? `Página ${state.page} de ${pages}` : "Página — de —";
    zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
    previous.disabled = !pages || state.page <= 1;
    next.disabled = !pages || state.page >= pages;
    zoomOut.disabled = state.zoom <= .65;
    zoomIn.disabled = state.zoom >= 1.8;
  };

  state.render = async () => {
    if (!state.document || root.hidden || root.offsetParent === null) return;
    state.renderTask?.cancel();
    const page = await state.document.getPage(state.page);
    const baseViewport = page.getViewport({ scale: 1 });
    const availableWidth = Math.max(280, viewportElement.clientWidth - 32);
    const cssScale = (availableWidth / baseViewport.width) * state.zoom;
    const viewport = page.getViewport({ scale: cssScale });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const context = canvas.getContext("2d", { alpha: false });
    canvas.width = Math.floor(viewport.width * pixelRatio);
    canvas.height = Math.floor(viewport.height * pixelRatio);
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;
    canvas.hidden = false;
    status.hidden = false;
    status.textContent = `Carregando página ${state.page}…`;
    try {
      state.renderTask = page.render({ canvasContext: context, viewport, transform: pixelRatio === 1 ? null : [pixelRatio, 0, 0, pixelRatio, 0, 0] });
      await state.renderTask.promise;
      status.hidden = true;
      updateControls();
    } catch (error) {
      if (error?.name !== "RenderingCancelledException") {
        status.hidden = false;
        status.textContent = "Não foi possível desenhar esta página. Tente abrir o PDF em tela cheia.";
        console.error(error);
      }
    }
  };

  previous.addEventListener("click", () => { if (state.page > 1) { state.page--; state.render(); } });
  next.addEventListener("click", () => { if (state.page < state.document.numPages) { state.page++; state.render(); } });
  zoomOut.addEventListener("click", () => { state.zoom = Math.max(.65, state.zoom - .15); state.render(); });
  zoomIn.addEventListener("click", () => { state.zoom = Math.min(1.8, state.zoom + .15); state.render(); });

  const observer = new ResizeObserver(() => {
    clearTimeout(state.resizeTimer);
    state.resizeTimer = setTimeout(state.render, 140);
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
