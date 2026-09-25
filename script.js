/**
 * EMMA AGATIELLO — PORTFOLIO ENGINE
 */

document.addEventListener("DOMContentLoaded", () => {
  initI18n();
  initRightSidePreview();
});

/* ========================================
     TRADUCTOR MULTIIDIOMA (ES / EN)
  ======================================== */
const translations = {
  es: {
    nav_work: "Trabajos",
    nav_about: "Sobre mí",
    nav_contact: "Contacto",
    hero_title:
      "Diseño gráfico & dirección de arte enfocados en identidad visual y sensibilidad editorial.",
    hero_sub:
      "Emma Agatiello — Proyectos desarrollados con rigor tipográfico, equilibrio y composiciones contemporáneas.",
    hover_hint: "Pasa el ratón sobre un proyecto para ver la previsualización",
    about_intro:
      "Hola, soy Emma Agatiello. Diseñadora gráfica graduada con enfoque en dirección de arte, branding y publicaciones editoriales.",
    tools_label: "Herramientas & Software",
    contact_title: "Hablemos de tu próximo proyecto.",
    category_label: "Categoría",
    year_label: "Año",
    role_label: "Rol",
    next_project_label: "Siguiente Proyecto",
    footer_location: "Madrid / Remoto",
  },
  en: {
    nav_work: "Work",
    nav_about: "About",
    nav_contact: "Contact",
    hero_title:
      "Graphic design & art direction focused on visual identity and editorial sensibility.",
    hero_sub:
      "Emma Agatiello — Projects developed with typographic rigor, balance, and contemporary layouts.",
    hover_hint: "Hover over a project to reveal preview",
    about_intro:
      "Hi, I'm Emma Agatiello. Graphic design graduate focused on art direction, branding, and editorial publications.",
    tools_label: "Tools & Software",
    contact_title: "Let's talk about your next project.",
    category_label: "Category",
    year_label: "Year",
    role_label: "Role",
    next_project_label: "Next Project",
    footer_location: "Madrid / Remote",
  },
};

function initI18n() {
  const currentLang = localStorage.getItem("ea_lang") || "es";
  setLanguage(currentLang);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.getAttribute("data-lang"));
    });
  });
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  localStorage.setItem("ea_lang", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });
}

/* ========================================
     HOVER PREVIEW EN COLUMNA DERECHA
  ======================================== */
function initRightSidePreview() {
  const previewImg = document.getElementById("sticky-preview-img");
  const placeholderText = document.getElementById("preview-placeholder");
  const items = document.querySelectorAll(".project-item[data-image]");

  if (!previewImg || items.length === 0) return;

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const imgSrc = item.getAttribute("data-image");
      if (imgSrc) {
        previewImg.src = imgSrc;
        previewImg.classList.add("is-visible");
        if (placeholderText) placeholderText.style.opacity = "0";
      }
    });
  });

  const projectContainer = document.querySelector(".projects-editorial");
  if (projectContainer) {
    projectContainer.addEventListener("mouseleave", () => {
      previewImg.classList.remove("is-visible");
      if (placeholderText) placeholderText.style.opacity = "1";
    });
  }
}
