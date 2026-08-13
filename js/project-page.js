/* =========================================================================
   PROJECT-PAGE.JS — used by every file inside /projects/
   Reads the current project's slug from <body data-slug="...">, pulls its
   record from data.js, and fills in the header, meta strip and the
   previous/next navigation automatically — so a project page's HTML only
   needs to contain its unique media layout (images, pairs, magazine).
   ========================================================================= */

function currentProject() {
  const slug = document.body.dataset.slug;
  return PROJECTS.find((p) => p.slug === slug);
}

function renderProjectHeader() {
  const project = currentProject();
  if (!project) return;
  const lang = LangSystem.get();
  const i = I18N[lang];

  document.title = `${project.title[lang]} — MI NOMBRE`;

  setText("[data-field='title']", project.title[lang]);
  setText("[data-field='description']", project.description[lang]);
  setText("[data-field='year']", project.year);
  setText("[data-field='category']", categoryLabel(project.category, lang));
  setText("[data-field='tools']", project.tools.join(", "));
  setText("[data-field='type']", project.type === "individual" ? i.type_individual : i.type_group);

  const chips = document.querySelector("[data-field='chips']");
  if (chips) {
    chips.innerHTML = `
      <span class="tag">${project.year}</span>
      <span class="tag">${categoryLabel(project.category, lang)}</span>
      <span class="tag">${project.type === "individual" ? i.type_individual : i.type_group}</span>
    `;
  }
}

function setText(sel, value) {
  const el = document.querySelector(sel);
  if (el) el.textContent = value;
}

function renderProjectNav() {
  const project = currentProject();
  if (!project) return;
  const lang = LangSystem.get();
  const idx = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const prevLink = document.querySelector("[data-nav='prev']");
  const nextLink = document.querySelector("[data-nav='next']");
  if (prevLink) {
    prevLink.href = `${prev.slug}.html`;
    prevLink.querySelector("strong").textContent = prev.title[lang];
  }
  if (nextLink) {
    nextLink.href = `${next.slug}.html`;
    nextLink.querySelector("strong").textContent = next.title[lang];
  }
}

/* Renders project.layout (see js/data.js) into the #proj-media grid, and
   the digital-magazine flipbook block when project.magazine is set. This
   is what makes "duplicate the template, edit the data" actually work —
   the media layout itself comes from data.js, not hand-written HTML. */
function renderProjectMedia() {
  const project = currentProject();
  const grid = document.getElementById("proj-media");
  if (!project || !grid) return;
  const lang = LangSystem.get();

  grid.innerHTML = project.layout.map((block) => {
    if (block.type === "full") {
      return `<div class="pm-full"><img src="${project.images[block.img]}" alt="${project.title[lang]}" loading="lazy"></div>`;
    }
    if (block.type === "pair") {
      return `<div class="pm-pair">
        <img src="${project.images[block.img[0]]}" alt="${project.title[lang]}" loading="lazy">
        <img src="${project.images[block.img[1]]}" alt="${project.title[lang]}" loading="lazy">
      </div>`;
    }
    if (block.type === "inset") {
      return `<div class="pm-inset">
        <img src="${project.images[block.img]}" alt="${project.title[lang]}" loading="lazy">
        <p class="pm-note">${block.note[lang]}</p>
      </div>`;
    }
    return "";
  }).join("");
}

function renderMagazineBlock() {
  const project = currentProject();
  const section = document.getElementById("magazine-section");
  if (!project || !section) return;
  if (!project.magazine) { section.remove(); return; }
  const lang = LangSystem.get();
  section.innerHTML = `
    <p class="eyebrow" style="padding-inline:var(--gutter);margin-bottom:var(--sp-2)">${I18N[lang].magazine_label}</p>
    <div class="magazine-frame" data-magazine data-pdf="${project.magazine}">
      <div class="magazine-stage">
        <span class="magazine-loading">…</span>
      </div>
      <div class="magazine-controls">
        <button class="mag-btn" data-mag="prev" aria-label="${I18N[lang].prev_project}">&#8592;</button>
        <span class="mag-page-count">— / —</span>
        <button class="mag-btn" data-mag="next" aria-label="${I18N[lang].next_project}">&#8594;</button>
      </div>
    </div>
  `;
  if (typeof initMagazine === "function") initMagazine(section.querySelector("[data-magazine]"));
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjectHeader();
  renderProjectMedia();
  renderMagazineBlock();
  renderProjectNav();
});
document.addEventListener("langchange", () => {
  renderProjectHeader();
  renderProjectMedia();
  renderProjectNav();
  // the magazine reader itself (pages already rendered) is left alone on
  // a language change so it doesn't reset the reader's current page
});
