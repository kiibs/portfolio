/* =========================================================================
   RENDER-HOME.JS — builds the Selected Projects rail + Skills grid from
   data.js, and re-renders them whenever the language changes.
   ========================================================================= */

/* SOFTWARE COLOR SYSTEM — up to 3 small colored dots on a project
   thumbnail, one per tool used (see TOOLS in js/data.js + toolColor()).
   Shared by the Selected Projects rail and the projects.html collage. */
function toolDotsHTML(tools) {
  return `<span class="tool-dots" aria-hidden="true">${
    tools.slice(0, 3).map((t) => `<span style="background:${toolColor(t)}"></span>`).join("")
  }</span>`;
}
window.toolDotsHTML = toolDotsHTML;

function renderSelectedProjects() {
  const track = document.getElementById("selected-track");
  if (!track) return;
  const lang = LangSystem.get();
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 5);

  track.innerHTML = featured.map((p, i) => {
    const accent = categoryAccent(p.category);
    return `
    <article class="sp-card">
      <a href="projects/${p.slug}.html" class="sp-frame" data-cursor="view" aria-label="${p.title[lang]}">
        <span class="sp-index count-up">0${i + 1}</span>
        <span class="sp-cat" style="background:var(--${accent})">${categoryLabel(p.category, lang)}</span>
        ${toolDotsHTML(p.tools)}
        <img src="${p.cover}" alt="${p.title[lang]}" loading="lazy">
      </a>
      <div class="sp-meta">
        <h3>${p.title[lang]}</h3>
        <span class="eyebrow">${p.year} — ${categoryLabel(p.category, lang)}</span>
      </div>
    </article>
  `;
  }).join("");
  if (typeof enhanceReveal === "function") enhanceReveal(track);
}

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;
  grid.innerHTML = TOOLS.map((t) => `
    <div class="skill-chip" style="--tool-color:${t.color}">
      <img src="${t.icon}" alt="" loading="lazy" onerror="this.style.display='none'">
      <span>${t.name}</span>
    </div>
  `).join("");
}

function renderContact() {
  document.querySelectorAll("a[href^='mailto:']").forEach((a) => {
    a.href = `mailto:${SITE.email}`;
    if (a.textContent.includes("@")) a.textContent = SITE.email;
  });
  document.querySelectorAll("a[download]").forEach((a) => { a.href = SITE.cv; });
  const socialsWrap = document.getElementById("contact-socials");
  if (socialsWrap) {
    socialsWrap.innerHTML = SITE.socials.map((s) =>
      `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join("");
  }
}

function categoryLabel(key, lang) {
  const c = CATEGORIES.find((c) => c.key === key);
  return c ? c[lang] : key;
}
window.categoryLabel = categoryLabel;

function categoryAccent(key) {
  const c = CATEGORIES.find((c) => c.key === key);
  return c ? c.accent : "coral";
}
window.categoryAccent = categoryAccent;

document.addEventListener("DOMContentLoaded", () => {
  renderSelectedProjects();
  renderSkills();
  renderContact();
});
document.addEventListener("langchange", renderSelectedProjects);
