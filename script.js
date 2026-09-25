/**
 * EMMA AGATIELLO — EDITORIAL PORTFOLIO ENGINE
 * Vanilla JS implementation for Loader, Cursor Preview, i18n & Navigation
 */

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initI18n();
  initHoverPreview();
});

/* ========================================
     1. EDITORIAL LOADER
  ======================================== */
function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  // Oculta el loader de forma suave una vez completada la carga inicial
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("is-hidden");
    }, 1200);
  });

  // Fallback por si la carga tarda demasiado
  setTimeout(() => {
    if (!loader.classList.contains("is-hidden")) {
      loader.classList.add("is-hidden");
    }
  }, 3000);
}

/* ========================================
     2. TRADUCTOR MULTIIDIOMA (ES / EN)
  ======================================== */
const translations = {
  es: {
    nav_work: "Trabajos",
    nav_about: "Sobre mí",
    nav_contact: "Contacto",
    hero_statement:
      "Diseño gráfico & dirección de arte enfocado en identidades visuales contemporáneas, publicaciones y sensibilidad editorial.",
    hero_meta:
      "Emma Agatiello — Graduada en Diseño Gráfico. Creando proyectos con rigor visual, tipografía sofisticada y atención al detalle.",
    section_projects: "Proyectos Seleccionados (06)",
    footer_rights: "© 2026 Emma Agatiello. Todos los derechos reservados.",
    footer_location: "Madrid / Remoto",
    about_title: "Diseñadora Gráfica & Directora de Arte",
    about_bio_1:
      "Soy Emma Agatiello, diseñadora gráfica recién graduada apasionada por el diseño editorial, la dirección de arte y las identidades de marca con carácter contemporáneo.",
    about_bio_2:
      "Mi enfoque combina la simplicidad estructural con una rica sensibilidad táctil y cromática, buscando soluciones visuales que sean memorables, funcionales y atemporales.",
    about_edu_title: "Formación",
    about_edu_1:
      "Grado en Diseño Gráfico — Escuela Superior de Diseño (2022 - 2026)",
    about_edu_2:
      "Taller de Tipografía Editorial & Print — Studio Session (2025)",
    about_skills_title: "Disciplinas",
    about_skills_1:
      "Dirección de Arte / Branding & Identidad / Diseño Editorial / Packaging / Tipografía / Estrategia Visual",
    about_tools_title: "Herramientas",
    about_tools_1:
      "Adobe Creative Cloud (InDesign, Illustrator, Photoshop, Figma, Lightroom)",
    contact_title: "Creemos algo con personalidad y elegancia.",
    contact_email_label: "Correo Electrónico",
    contact_social_label: "Redes Profesionales",
    next_project: "Siguiente Proyecto",
    view_project: "Ver Proyecto",
    role_label: "Rol",
    year_label: "Año",
    tools_label: "Herramientas",
    category_label: "Categoría",
    overview_label: "Visión General",
  },
  en: {
    nav_work: "Work",
    nav_about: "About",
    nav_contact: "Contact",
    hero_statement:
      "Graphic design & art direction focused on contemporary visual identities, publications and editorial sensibility.",
    hero_meta:
      "Emma Agatiello — Graphic Design Graduate. Crafting thoughtful projects through typographic rigor, sophisticated color, and detail.",
    section_projects: "Selected Projects (06)",
    footer_rights: "© 2026 Emma Agatiello. All rights reserved.",
    footer_location: "Madrid / Remote",
    about_title: "Graphic Designer & Art Director",
    about_bio_1:
      "I am Emma Agatiello, a recent Graphic Design graduate passionate about editorial design, art direction, and brand identities with contemporary character.",
    about_bio_2:
      "My approach merges structural simplicity with a rich tactile and chromatic sensibility, aiming for visual solutions that feel memorable, functional, and timeless.",
    about_edu_title: "Education",
    about_edu_1:
      "Bachelor's Degree in Graphic Design — Higher School of Design (2022 - 2026)",
    about_edu_2:
      "Editorial Typography & Print Workshop — Studio Session (2025)",
    about_skills_title: "Disciplines",
    about_skills_1:
      "Art Direction / Branding & Identity / Editorial Design / Packaging / Typography / Visual Strategy",
    about_tools_title: "Tools",
    about_tools_1:
      "Adobe Creative Cloud (InDesign, Illustrator, Photoshop, Figma, Lightroom)",
    contact_title: "Let's create something with personality and elegance.",
    contact_email_label: "Email Address",
    contact_social_label: "Professional Networks",
    next_project: "Next Project",
    view_project: "View Project",
    role_label: "Role",
    year_label: "Year",
    tools_label: "Tools",
    category_label: "Category",
    overview_label: "Overview",
  },
};

function initI18n() {
  const currentLang = localStorage.getItem("ea_portfolio_lang") || "es";
  setLanguage(currentLang);

  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      setLanguage(lang);
    });
  });
}

function setLanguage(lang) {
  if (!translations[lang]) return;

  localStorage.setItem("ea_portfolio_lang", lang);
  document.documentElement.lang = lang;

  // Actualizar textos marcados con data-i18n
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Actualizar estado de los botones
  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach((btn) => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active");
      btn.setAttribute("aria-current", "true");
    } else {
      btn.classList.remove("active");
      btn.removeAttribute("aria-current");
    }
  });
}

/* ========================================
     3. CURSOR HOVER PREVIEW (PROYECTOS)
  ======================================== */
function initHoverPreview() {
  const previewContainer = document.getElementById("cursor-preview");
  const previewImg = document.getElementById("cursor-preview-img");
  const projectItems = document.querySelectorAll(".project-item[data-preview]");

  if (!previewContainer || !previewImg || projectItems.length === 0) return;

  // Solo activar en pantallas desktop
  if (window.innerWidth < 769) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Movimiento fluido mediante requestAnimationFrame
  function render() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

    previewContainer.style.left = `${currentX}px`;
    previewContainer.style.top = `${currentY}px`;

    requestAnimationFrame(render);
  }
  render();

  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const imgSrc = item.getAttribute("data-preview");
      if (imgSrc) {
        previewImg.src = imgSrc;
        previewContainer.classList.add("is-active");
      }
    });

    item.addEventListener("mouseleave", () => {
      previewContainer.classList.remove("is-active");
    });
  });
}
