/* =========================================================================
   RENDER-PROJECTS.JS — projects.html only
   Builds the filter chips (category + tool) and the collage, then filters
   the collage live. Filter logic (unchanged from previous iterations):
     - within a group (category / tool) selections are OR'd — a project
       matches if it has ANY of the selected values
     - across groups selections are AND'd — a project must satisfy both
       the category filter (if any is active) and the tool filter (if any)

   NEW — PROJECT WORLDS: when exactly one active category has a "mode"
   (see CATEGORIES in js/data.js), the collage transforms into that
   category's visual metaphor (poster wall / editorial shelf / brand wall
   / floating 3D gallery — see PROJECT WORLDS in css/style.css) instead of
   the default masonry grid. Switching modes plays a GSAP fly-apart /
   reassemble transition; switching between two projects *within* the
   same mode (or toggling a non-mode filter) just does the normal quiet
   show/hide fade, so the "world" doesn't needlessly replay itself.
   ========================================================================= */

const FilterState = { category: new Set(), tool: new Set() };
const ALL_TOOLS = [...new Set(PROJECTS.flatMap((p) => p.tools))].sort();
let currentMode = "grid";

function renderFilters() {
  const catWrap = document.getElementById("filter-category");
  const toolWrap = document.getElementById("filter-tool");
  if (!catWrap || !toolWrap) return;
  const lang = LangSystem.get();

  catWrap.innerHTML = CATEGORIES.map((c) => chipHTML(c.key, c[lang], "category")).join("");
  toolWrap.innerHTML = ALL_TOOLS.map((t) => chipHTML(t, t, "tool", toolColor(t))).join("");

  document.querySelectorAll(".chip[data-group]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const group = chip.dataset.group;
      const value = chip.dataset.value;
      if (FilterState[group].has(value)) FilterState[group].delete(value);
      else FilterState[group].add(value);
      chip.classList.toggle("is-active");
      applyFilters();
    });
  });

  const resetBtn = document.getElementById("filter-reset");
  if (resetBtn) resetBtn.addEventListener("click", () => {
    FilterState.category.clear();
    FilterState.tool.clear();
    document.querySelectorAll(".chip.is-active").forEach((c) => c.classList.remove("is-active"));
    applyFilters();
  });
}

function chipHTML(value, label, group, dotColor) {
  const active = FilterState[group].has(value) ? " is-active" : "";
  const dot = dotColor ? `<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${dotColor};margin-right:.5em;"></span>` : "";
  return `<button type="button" class="chip${active}" data-group="${group}" data-value="${value}">${dot}${label}</button>`;
}

/* SOFTWARE COLOR SYSTEM — toolDotsHTML() is shared, defined once in
   render-home.js (loaded before this file on projects.html too). */

function renderCollage() {
  const grid = document.getElementById("collage");
  if (!grid) return;
  const lang = LangSystem.get();

  grid.innerHTML = PROJECTS.map((p) => {
    const accent = categoryAccent(p.category);
    return `
    <article class="c-item ${p.size}" data-slug="${p.slug}" data-category="${p.category}" data-tools="${p.tools.join("|")}">
      <span class="c-dot" style="background:var(--${accent})" aria-hidden="true"></span>
      <a href="projects/${p.slug}.html" class="c-img" data-cursor="view" aria-label="${p.title[lang]}">
        ${toolDotsHTML(p.tools)}
        <img src="${p.cover}" alt="${p.title[lang]}" loading="lazy">
        <span class="c-overlay">
          <span class="c-title">${p.title[lang]}</span>
          <span class="c-tags">
            <span>${p.year}</span>
            <span>${categoryLabel(p.category, lang)}</span>
            <span>${p.type === "individual" ? I18N[lang].type_individual : I18N[lang].type_group}</span>
          </span>
        </span>
      </a>
    </article>
  `;
  }).join("");
  if (typeof enhanceReveal === "function") enhanceReveal(grid);
  applyModeStyling(currentMode);
}

/* ---------------------------------------------------------------------- */
/* PROJECT WORLDS ---------------------------------------------------------
   computeMode(): looks at the active category filter and decides which
   "world" the collage should be in. Only fires when exactly one category
   is selected and that category defines a mode — two categories at once,
   or none, always falls back to the normal grid. */
function computeMode() {
  if (FilterState.category.size !== 1) return "grid";
  const key = [...FilterState.category][0];
  const cat = CATEGORIES.find((c) => c.key === key);
  return (cat && cat.mode) ? cat.mode : "grid";
}

// A tiny deterministic hash so each project always gets the same poster
// rotation / depth every time (no layout jitter on re-render/re-filter).
function seedFor(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

// Applies per-item inline custom properties for whichever mode is active
// (rotation for the poster wall, depth for the 3D gallery, etc.) — the
// actual visual transform lives in CSS (PROJECT WORLDS section).
function applyModeStyling(mode) {
  const grid = document.getElementById("collage");
  if (!grid) return;
  grid.className = `collage mode-${mode}`;
  document.querySelectorAll(".c-item").forEach((item) => {
    const seed = seedFor(item.dataset.slug);
    if (mode === "posters") {
      const rot = ((seed % 900) / 100 - 4.5).toFixed(2); // ~ -4.5deg .. 4.5deg
      const lift = (seed % 3) * 14;
      item.style.setProperty("--rot", `${rot}deg`);
      item.style.setProperty("--lift", `${lift}px`);
    } else if (mode === "3d") {
      const depth = -((seed % 5) * 22);
      item.style.setProperty("--depth", `${depth}px`);
      if (!isTouch && typeof gsap !== "undefined" && !prefersReduced) attachTilt(item);
    }
  });
  const label = document.getElementById("collage-mode-label");
  if (label) {
    const active = mode !== "grid";
    label.classList.toggle("is-active", active);
    if (active) label.textContent = `— ${LangSystem.t("mode_" + mode)} —`;
  }
}

// 3D world: a gentle tilt-toward-cursor on hover (classic "tilt card"),
// scoped to pointer devices only. Listeners are attached once per item.
function attachTilt(item) {
  if (item.dataset.tiltBound) return;
  item.dataset.tiltBound = "1";
  item.addEventListener("mousemove", (e) => {
    const r = item.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(item, { rotateY: px * 14, rotateX: -py * 14, duration: 0.4, ease: "power2.out", overwrite: true });
  });
  item.addEventListener("mouseleave", () => {
    gsap.to(item, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
  });
}

/* Runs the mode transition (fly-apart / reassemble) when switching worlds,
   then applies the normal show/hide filter on top. Falls back to an
   instant swap if GSAP isn't available. */
function transitionToMode(newMode) {
  const grid = document.getElementById("collage");
  const items = grid.querySelectorAll(".c-item");
  if (typeof gsap === "undefined" || prefersReduced || !items.length) {
    currentMode = newMode;
    applyModeStyling(newMode);
    applyFilters();
    return;
  }
  gsap.to(items, {
    opacity: 0, y: 24, scale: 0.92, duration: 0.32, stagger: 0.015, ease: "power2.in",
    onComplete: () => {
      currentMode = newMode;
      applyModeStyling(newMode);
      applyFilters();
      const visible = grid.querySelectorAll(".c-item:not(.is-hidden)");
      gsap.fromTo(visible, { opacity: 0, y: 26, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.03, ease: "power3.out" });
    }
  });
}

function applyFilters() {
  const newMode = computeMode();
  if (newMode !== currentMode) { transitionToMode(newMode); return; }

  const items = document.querySelectorAll(".c-item");
  let visibleCount = 0;
  items.forEach((item) => {
    const cat = item.dataset.category;
    const tools = item.dataset.tools.split("|");
    const catOk = FilterState.category.size === 0 || FilterState.category.has(cat);
    const toolOk = FilterState.tool.size === 0 || tools.some((t) => FilterState.tool.has(t));
    const show = catOk && toolOk;
    item.classList.toggle("is-hidden", !show);
    if (show) visibleCount++;
  });
  let empty = document.querySelector(".no-results");
  const grid = document.getElementById("collage");
  if (visibleCount === 0) {
    if (!empty) {
      empty = document.createElement("p");
      empty.className = "no-results";
      empty.setAttribute("data-i18n", "no_results");
      grid.appendChild(empty);
    }
    empty.textContent = LangSystem.t("no_results");
  } else if (empty) {
    empty.remove();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  renderCollage();
});
document.addEventListener("langchange", () => {
  renderFilters();
  renderCollage();
  applyFilters();
});
