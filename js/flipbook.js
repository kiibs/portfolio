/* =========================================================================
   FLIPBOOK.JS — inline digital-magazine reader (section 27)
   Renders a real PDF page-by-page onto canvases using PDF.js (CDN, no
   backend/install needed — works as-is on GitHub Pages). Navigation via
   on-screen arrows, keyboard (when the reader is in view) and touch swipe.
   No zoom, no download link, no browser PDF viewer — the whole thing is
   just another block inside the page's normal vertical scroll.

   TO SWAP THE PDF: change the "magazine" path for the project in
   js/data.js — nothing here needs to change.
   ========================================================================= */

function initMagazine(root) {
  const url = root.dataset.pdf;
  if (!url) return;

  const stage = root.querySelector(".magazine-stage");
  const loading = root.querySelector(".magazine-loading");
  const prevBtn = root.querySelector("[data-mag='prev']");
  const nextBtn = root.querySelector("[data-mag='next']");
  const counter = root.querySelector(".mag-page-count");

  if (typeof pdfjsLib === "undefined") {
    if (loading) loading.textContent = "PDF.js failed to load.";
    return;
  }
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js";

  let pdf, current = 0, canvases = [];

  pdfjsLib.getDocument(url).promise.then((doc) => {
    pdf = doc;
    canvases = new Array(pdf.numPages).fill(null);
    if (loading) loading.remove();
    renderPage(0);
    updateUI();
  }).catch(() => {
    if (loading) loading.textContent = "Couldn't load the magazine PDF — check the path in js/data.js.";
  });

  function renderPage(index) {
    if (canvases[index]) { showCanvas(index); return; }
    pdf.getPage(index + 1).then((page) => {
      const viewport = page.getViewport({ scale: 1 });
      const scale = Math.min(
        stage.clientWidth / viewport.width,
        stage.clientHeight / viewport.height
      ) * (window.devicePixelRatio || 1);
      const scaledViewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;
      const ctx = canvas.getContext("2d");
      page.render({ canvasContext: ctx, viewport: scaledViewport }).promise.then(() => {
        stage.appendChild(canvas);
        canvases[index] = canvas;
        showCanvas(index);
      });
    });
  }

  function showCanvas(index) {
    canvases.forEach((c) => c && c.classList.remove("is-active"));
    if (canvases[index]) canvases[index].classList.add("is-active");
  }

  function go(delta) {
    if (!pdf) return;
    const next = current + delta;
    if (next < 0 || next >= pdf.numPages) return;
    current = next;
    renderPage(current);
    updateUI();
  }

  function updateUI() {
    if (!pdf) return;
    if (counter) counter.textContent = `${current + 1} / ${pdf.numPages}`;
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === pdf.numPages - 1;
  }

  if (prevBtn) prevBtn.addEventListener("click", () => go(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => go(1));

  // Keyboard — only while the reader is in view, so it doesn't hijack
  // arrow keys used to scroll the rest of the page.
  let inView = false;
  new IntersectionObserver((entries) => {
    inView = entries[0].isIntersecting;
  }, { threshold: 0.5 }).observe(root);

  addEventListener("keydown", (e) => {
    if (!inView) return;
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  });

  // Touch swipe
  let touchX = null;
  stage.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });

  // Resize: re-render current page at the new stage size
  let resizeTimer;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      canvases = canvases.map(() => null);
      stage.querySelectorAll("canvas").forEach((c) => c.remove());
      renderPage(current);
    }, 300);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-magazine]").forEach(initMagazine);
});
