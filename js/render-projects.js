/* =========================================================================
   RENDER-PROJECTS.JS — projects.html only
   Builds the filter chips (category + tool) and the collage, then filters
   the collage live. Filter logic (section 22):
     - within a group (category / tool) selections are OR'd — a project
       matches if it has ANY of the selected values
     - across groups selections are AND'd — a project must satisfy both
       the category filter (if any is active) and the tool filter (if any)
   ========================================================================= */

const FilterState = { category: new Set(), tool: new Set() };
const ALL_TOOLS = [...new Set(PROJECTS.flatMap((p) => p.tools))].sort();

function renderFilters() {
  const catWrap = document.getElementById("filter-category");
  const toolWrap = document.getElementById("filter-tool");
  if (!catWrap || !toolWrap) return;
  const lang = LangSystem.get();

  catWrap.innerHTML = CATEGORIES.map((c) => chipHTML(c.key, c[lang], "category")).join("");
  toolWrap.innerHTML = ALL_TOOLS.map((t) => chipHTML(t, t, "tool")).join("");

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

function chipHTML(value, label, group) {
  const active = FilterState[group].has(value) ? " is-active" : "";
  return `<button type="button" class="chip${active}" data-group="${group}" data-value="${value}">${label}</button>`;
}

function renderCollage() {
  const grid = document.getElementById("collage");
  if (!grid) return;
  const lang = LangSystem.get();

  grid.innerHTML = PROJECTS.map((p) => `
    <article class="c-item ${p.size}" data-slug="${p.slug}" data-category="${p.category}" data-tools="${p.tools.join("|")}">
      <a href="projects/${p.slug}.html" class="c-img" data-cursor="view" aria-label="${p.title[lang]}">
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
  `).join("");
}

function applyFilters() {
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
