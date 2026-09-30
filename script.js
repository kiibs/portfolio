/* =========================================================
   EMMA PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* =========================================================
         SETTINGS
      ========================================================= */

const STORAGE_THEME = "emma-theme";
const STORAGE_LANG = "emma-lang";
const STORAGE_LOADER = "emma-loader-seen";

const state = {
  theme: localStorage.getItem(STORAGE_THEME) || "light",
  lang: localStorage.getItem(STORAGE_LANG) || "en",
  menuOpen: false,
  modalOpen: false,
  currentProject: 0,
  loading: true,
};

/* =========================================================
         TRANSLATIONS
      ========================================================= */

const translations = {
  en: {
    available: "AVAILABLE",

    intro:
      "Recently graduated graphic designer building visual identities, campaigns and digital worlds with a soft spot for strange ideas.",

    manifesto: "GOOD DESIGN<br><em>SHOULD FEEL</em><br>ALIVE.",

    manifestoSide:
      "Not decoration. Not noise. A clear idea, pushed until it develops a pulse.",

    workLead:
      "Four fictional studies. Real design thinking. Built to show how I move from concept to visual system.",

    interlude:
      "The portfolio is not a container for the work.<br><em>It is the first piece of work.</em>",

    aboutTitle: "Designer,<br><em>curious human.</em>",

    aboutLead:
      "I work somewhere between strategy and play — turning loose thoughts into identities people can recognize, remember and feel.",

    aboutText:
      "My practice moves across branding, editorial, digital and motion. I like typography with a point of view, systems with room for accidents and details that reward a second look.",

    contactEyebrow: "HAVE A GOOD BRIEF?",

    contactText:
      "Available for junior roles, internships and selected freelance projects.",
  },

  es: {
    available: "DISPONIBLE",

    intro:
      "Diseñadora gráfica recién graduada que crea identidades visuales, campañas y mundos digitales con debilidad por las ideas extrañas.",

    manifesto: "EL BUEN DISEÑO<br><em>DEBERÍA SENTIRSE</em><br>VIVO.",

    manifestoSide:
      "No decoración. No ruido. Una idea clara, llevada hasta desarrollar su propio pulso.",

    workLead:
      "Cuatro estudios ficticios. Diseño real. Una muestra de cómo paso del concepto a un sistema visual.",

    interlude:
      "El portfolio no es un contenedor para el trabajo.<br><em>Es la primera pieza de trabajo.</em>",

    aboutTitle: "Diseñadora,<br><em>persona curiosa.</em>",

    aboutLead:
      "Trabajo entre la estrategia y el juego: convierto ideas sueltas en identidades que la gente puede reconocer, recordar y sentir.",

    aboutText:
      "Mi práctica se mueve entre branding, editorial, digital y motion. Me interesa la tipografía con personalidad, los sistemas que dejan espacio para los accidentes y los detalles que premian una segunda mirada.",

    contactEyebrow: "¿TIENES UN BUEN BRIEF?",

    contactText:
      "Disponible para puestos junior, prácticas y proyectos freelance seleccionados.",
  },
};

/* =========================================================
         PROJECT DATA
      ========================================================= */

const projects = [
  {
    number: "01",
    title: "HALFWAY",
    category: "EDITORIAL / ART DIRECTION",
    description: {
      en: "An experimental editorial system exploring the uncomfortable space between two decisions. Halfway turns hesitation into a visual language built around rhythm, contrast and unexpected interruptions.",

      es: "Un sistema editorial experimental que explora ese espacio incómodo entre dos decisiones. Halfway convierte la duda en un lenguaje visual basado en ritmo, contraste e interrupciones inesperadas.",
    },

    tags: ["EDITORIAL", "ART DIRECTION", "TYPOGRAPHY", "INDESIGN"],

    visual: "art-a",

    pdf: "assets/halfway-MAG.pdf",
  },

  {
    number: "02",
    title: "24 FRAMES",
    category: "MOTION / CAMPAIGN",
    description: {
      en: "A motion campaign built around repetition, rhythm and controlled visual distortion. The identity changes frame by frame while remaining recognisable as one system.",

      es: "Una campaña de motion basada en la repetición, el ritmo y la distorsión visual controlada. La identidad cambia frame a frame sin dejar de pertenecer al mismo sistema.",
    },

    tags: ["MOTION", "CAMPAIGN", "ART DIRECTION", "AFTER EFFECTS"],

    visual: "art-b",
  },

  {
    number: "03",
    title: "ODD OBJECTS",
    category: "EDITORIAL / PACKAGING",
    description: {
      en: "A playful editorial and packaging study for objects that refuse to behave normally. The project mixes tactile forms, oversized typography and deliberately awkward compositions.",

      es: "Un estudio editorial y de packaging para objetos que se niegan a comportarse de forma normal. El proyecto mezcla formas táctiles, tipografía sobredimensionada y composiciones deliberadamente extrañas.",
    },

    tags: ["PACKAGING", "EDITORIAL", "TYPE", "ART DIRECTION"],

    visual: "art-c",
  },

  {
    number: "04",
    title: "STATIC FM",
    category: "DIGITAL / ART DIRECTION",
    description: {
      en: "A digital identity inspired by radio interference, analogue equipment and visual noise. Static FM turns imperfection into a recognisable graphic system.",

      es: "Una identidad digital inspirada en interferencias de radio, equipos analógicos y ruido visual. Static FM convierte la imperfección en un sistema gráfico reconocible.",
    },

    tags: ["DIGITAL", "IDENTITY", "ART DIRECTION", "UI"],

    visual: "art-d",
  },
];

/* =========================================================
         DOM
      ========================================================= */

const body = document.body;
const html = document.documentElement;

const preloader = document.getElementById("preloader");
const preNum = document.getElementById("preNum");
const preBar = document.getElementById("preBar");

const themeButton = document.getElementById("theme");
const langButton = document.getElementById("lang");

const menuButton = document.getElementById("menu");
const menuLayer = document.getElementById("menuLayer");
const menuClose = document.getElementById("menuClose");

const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("closeModal");

const modalIndex = document.getElementById("modalIndex");
const modalVisual = document.getElementById("modalVisual");
const modalCat = document.getElementById("modalCat");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalTags = document.getElementById("modalTags");

const projectTrack = document.querySelector(".project-track");
const projectsElements = document.querySelectorAll(".project");

const marqueeTrack = document.querySelector(".marquee-track");

/* =========================================================
         SETTINGS
      ========================================================= */

function applyTheme() {
  html.dataset.theme = state.theme;

  localStorage.setItem(STORAGE_THEME, state.theme);

  if (themeButton) {
    themeButton.innerHTML =
      state.theme === "dark" ? "☼ <span>MODE</span>" : "◐ <span>MODE</span>";
  }
}

function applyLanguage() {
  const dictionary = translations[state.lang];

  document.documentElement.lang = state.lang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;

    if (!dictionary[key]) return;

    element.innerHTML = dictionary[key];
  });

  document.querySelectorAll("[data-lang]").forEach((element) => {
    element.classList.toggle("active", element.dataset.lang === state.lang);
  });

  localStorage.setItem(STORAGE_LANG, state.lang);
}

/* =========================================================
         THEME
      ========================================================= */

themeButton?.addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";

  applyTheme();

  /*
   * Do NOT run the preloader here.
   * The loader belongs to the first visit only.
   */

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
});

/* =========================================================
         LANGUAGE
      ========================================================= */

langButton?.addEventListener("click", () => {
  state.lang = state.lang === "en" ? "es" : "en";

  applyLanguage();

  /*
   * Re-render modal if it is open so its description
   * changes language immediately.
   */
  if (state.modalOpen) {
    renderProject(state.currentProject);
  }
});

/* =========================================================
         PRELOADER
      ========================================================= */

function runPreloader() {
  const alreadySeen = sessionStorage.getItem(STORAGE_LOADER) === "true";

  if (alreadySeen) {
    preloader?.remove();
    state.loading = false;
    return;
  }

  sessionStorage.setItem(STORAGE_LOADER, "true");

  if (!preloader) {
    state.loading = false;
    return;
  }

  let value = 0;

  const timer = setInterval(() => {
    value += Math.floor(Math.random() * 8) + 2;

    if (value >= 100) {
      value = 100;
      clearInterval(timer);

      gsap.to(
        { value: 0 },
        {
          value: 1,
          duration: 0.65,
          ease: "power3.inOut",
          onUpdate() {
            const progress = this.targets()[0].value;

            gsap.set(preloader, {
              clipPath: `inset(${progress * 100}% 0 0 0)`,
            });
          },
          onComplete() {
            preloader.remove();
            state.loading = false;

            ScrollTrigger.refresh();

            requestAnimationFrame(() => {
              window.scrollTo(0, 0);
            });
          },
        }
      );
    }

    if (preNum) {
      preNum.textContent = String(value).padStart(2, "0");
    }

    if (preBar) {
      gsap.to(preBar, {
        width: `${value}%`,
        duration: 0.25,
        overwrite: true,
      });
    }
  }, 45);
}

/* =========================================================
         CURSOR
      ========================================================= */

function setupCursor() {
  const cursor = document.querySelector(".cursor");
  const cursorLabel = document.querySelector(".cursor-label");

  if (!cursor || !cursorLabel) return;

  if (window.matchMedia("(pointer: coarse)").matches) {
    cursor.style.display = "none";
    cursorLabel.style.display = "none";
    document.body.style.cursor = "auto";
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    gsap.to(cursorLabel, {
      x: mouseX,
      y: mouseY,
      duration: 0.18,
      ease: "power2.out",
    });
  });

  gsap.ticker.add(() => {
    currentX += (mouseX - currentX) * 0.2;
    currentY += (mouseY - currentY) * 0.2;

    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;
  });

  projectsElements.forEach((project) => {
    project.addEventListener("mouseenter", () => {
      cursorLabel.textContent = "OPEN";

      gsap.to(cursorLabel, {
        opacity: 1,
        duration: 0.2,
      });

      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.25,
        ease: "power2.out",
      });
    });

    project.addEventListener("mouseleave", () => {
      gsap.to(cursorLabel, {
        opacity: 0,
        duration: 0.2,
      });

      gsap.to(cursor, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    });
  });
}

/* =========================================================
         MAGNETIC ELEMENTS
      ========================================================= */

function setupMagnetic() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;

      const y = event.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * 0.18,
        y: y * 0.18,
        duration: 0.35,
        ease: "power3.out",
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.35)",
      });
    });
  });
}

/* =========================================================
         MENU
      ========================================================= */

function openMenu() {
  if (!menuLayer || state.menuOpen) return;

  state.menuOpen = true;

  document.body.classList.add("menu-open");

  menuLayer.setAttribute("aria-hidden", "false");

  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close menu");
  }

  gsap.killTweensOf(menuLayer);
  gsap.killTweensOf(".menu-links a");

  /*
   * IMPORTANT:
   * The CSS starts the menu with:
   * clip-path: inset(0 0 100% 0)
   *
   * We explicitly open that clip-path here.
   */
  gsap.set(menuLayer, {
    display: "flex",
    visibility: "visible",
    pointerEvents: "auto",
    autoAlpha: 1,
    clipPath: "inset(0 0 100% 0)",
  });

  gsap.set(".menu-links a", {
    y: 70,
    opacity: 0,
  });

  gsap.to(menuLayer, {
    clipPath: "inset(0 0 0% 0)",
    duration: 0.65,
    ease: "power4.inOut",
  });

  gsap.to(".menu-links a", {
    y: 0,
    opacity: 1,
    duration: 0.65,
    stagger: 0.08,
    delay: 0.18,
    ease: "power4.out",
  });
}

function closeMenu() {
  if (!menuLayer || !state.menuOpen) return;

  state.menuOpen = false;

  document.body.classList.remove("menu-open");

  menuLayer.setAttribute("aria-hidden", "true");

  if (menuButton) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  }

  gsap.killTweensOf(menuLayer);
  gsap.killTweensOf(".menu-links a");

  gsap.to(menuLayer, {
    clipPath: "inset(0 0 100% 0)",
    autoAlpha: 1,
    duration: 0.55,
    ease: "power4.inOut",

    onComplete: () => {
      if (!state.menuOpen) {
        gsap.set(menuLayer, {
          visibility: "hidden",
          pointerEvents: "none",
          display: "flex",
        });
      }
    },
  });

  gsap.to(".menu-links a", {
    y: 40,
    opacity: 0,
    duration: 0.25,
    ease: "power2.in",
  });
}

menuButton?.addEventListener("click", () => {
  if (state.menuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

menuClose?.addEventListener("click", closeMenu);

document.querySelectorAll(".menu-links a").forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

/* =========================================================
         HERO
      ========================================================= */

function setupHero() {
  const heroTitle = document.querySelector(".hero-title");
  const orbit = document.querySelector(".orbit");

  if (!heroTitle || !orbit) return;

  /*
   * This restores the original composition:
   * the title remains centred in its original stage.
   * Only the scroll parallax moves it afterwards.
   */

  gsap.set(heroTitle, {
    y: 0,
    x: 0,
  });

  gsap.set(orbit, {
    y: 0,
    x: 0,
  });

  gsap.to(heroTitle, {
    y: -80,
    ease: "none",

    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(orbit, {
    y: 220,
    rotation: 130,
    ease: "none",

    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });
}

/* =========================================================
         COLOURED HERO ASTERISK
      ========================================================= */

function restoreAsterisk() {
  const asterisk = document.querySelector(".orbit b");

  if (!asterisk) return;

  /*
   * The central asterisk was losing its accent colour.
   * Force it back to the portfolio pink.
   */
  asterisk.style.color = "var(--pink)";
}

/* =========================================================
         GENERAL REVEALS
      ========================================================= */

function setupReveals() {
  const elements = document.querySelectorAll(
    ".section-label, .manifesto h2, .manifesto-side, .work-intro, .interlude p, .about-grid, .contact-core"
  );

  elements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        y: 45,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true,
        },
      }
    );
  });
}

/* =========================================================
         HORIZONTAL WORK SHOWCASE
      ========================================================= */

let horizontalWorkTrigger = null;

function setupHorizontalWork() {
  if (!projectTrack) return;

  /*
   * IMPORTANT:
   *
   * Do not use projectTrack.scrollLeft.
   *
   * .project-track is intentionally width:max-content.
   * GSAP translates the entire track horizontally while
   * the .work section remains pinned.
   */

  if (horizontalWorkTrigger) {
    horizontalWorkTrigger.kill();
    horizontalWorkTrigger = null;
  }

  gsap.killTweensOf(projectTrack);

  const workSection = document.querySelector(".work");

  if (!workSection) return;

  const isMobile = window.innerWidth < 768;

  /*
   * On mobile, keep the native horizontal behaviour.
   * Desktop gets the cinematic pinned showcase.
   */

  if (isMobile) {
    gsap.set(projectTrack, {
      clearProps: "transform",
    });

    return;
  }

  const getDistance = () => {
    return Math.max(0, projectTrack.scrollWidth - window.innerWidth + 80);
  };

  horizontalWorkTrigger = gsap.to(projectTrack, {
    x: () => -getDistance(),
    ease: "none",

    scrollTrigger: {
      trigger: workSection,

      start: "top -30%",

      end: () => `+=${Math.max(900, getDistance() * 1.15)}`,

      pin: true,

      scrub: 1.05,

      invalidateOnRefresh: true,

      anticipatePin: 1,

      onUpdate: (self) => {
        const progress = document.querySelector(".progress i");

        if (progress) {
          gsap.set(progress, {
            scaleX: self.progress,
          });
        }
      },
    },
  });

  /*
   * Make sure cards stay clickable.
   * The track itself never receives pointer-drag logic.
   */
  projectsElements.forEach((project) => {
    project.style.pointerEvents = "auto";
  });
}

/* =========================================================
         PROJECT CLICK
      ========================================================= */

projectsElements.forEach((project) => {
  project.addEventListener("click", (event) => {
    /*
     * Ignore clicks only when the user has clicked a real
     * interactive element inside a project in the future.
     */
    if (event.target.closest("a") || event.target.closest("button")) {
      return;
    }

    const index = Number(project.dataset.id);

    if (Number.isNaN(index)) return;

    openProject(index);
  });
});

/* =========================================================
         PROJECT MODAL
      ========================================================= */

function openProject(index) {
  if (!modal) return;

  const project = projects[index];

  if (!project) return;

  state.currentProject = index;
  state.modalOpen = true;

  document.body.classList.add("modal-open");

  modal.setAttribute("aria-hidden", "false");

  renderProject(index);

  gsap.killTweensOf(modal);
  gsap.killTweensOf(".modal-grid");

  /*
   * CRITICAL FIX:
   * The modal CSS starts closed with:
   *
   * clip-path: inset(0 0 100% 0);
   *
   * We reset it before opening.
   */
  gsap.set(modal, {
    display: "block",
    visibility: "visible",
    pointerEvents: "auto",
    autoAlpha: 1,
    clipPath: "inset(0 0 100% 0)",
  });

  gsap.set(".modal-grid", {
    y: 35,
    opacity: 0,
  });

  gsap.to(modal, {
    clipPath: "inset(0 0 0% 0)",
    duration: 0.55,
    ease: "power4.inOut",
  });

  gsap.to(".modal-grid", {
    y: 0,
    opacity: 1,
    duration: 0.65,
    delay: 0.08,
    ease: "power3.out",
  });
}

function closeProject() {
  if (!modal || !state.modalOpen) return;

  state.modalOpen = false;

  document.body.classList.remove("modal-open");

  modal.setAttribute("aria-hidden", "true");

  gsap.killTweensOf(modal);
  gsap.killTweensOf(".modal-grid");

  gsap.to(".modal-grid", {
    y: 20,
    opacity: 0,
    duration: 0.2,
    ease: "power2.in",
  });

  gsap.to(modal, {
    clipPath: "inset(0 0 100% 0)",
    duration: 0.45,
    delay: 0.05,
    ease: "power4.inOut",

    onComplete: () => {
      if (!state.modalOpen) {
        gsap.set(modal, {
          display: "none",
          pointerEvents: "none",
          autoAlpha: 1,
        });

        if (modalVisual) {
          modalVisual.innerHTML = "";
        }
      }
    },
  });
}

closeModalButton?.addEventListener("click", closeProject);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeProject();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (state.modalOpen) {
      closeProject();
    }

    if (state.menuOpen) {
      closeMenu();
    }
  }
});

/* =========================================================
         RENDER PROJECT
      ========================================================= */

function renderProject(index) {
  const project = projects[index];

  if (!project) return;

  if (modalIndex) {
    modalIndex.textContent = project.number;
  }

  if (modalCat) {
    modalCat.textContent = project.category;
  }

  if (modalTitle) {
    modalTitle.textContent = project.title;
  }

  if (modalText) {
    modalText.textContent = project.description[state.lang];
  }

  if (modalTags) {
    modalTags.innerHTML = "";

    project.tags.forEach((tag) => {
      const element = document.createElement("span");

      element.textContent = tag;

      modalTags.appendChild(element);
    });
  }

  if (!modalVisual) return;

  modalVisual.innerHTML = "";

  /*
   * HALFWAY
   */
  if (index === 0) {
    renderHalfway(modalVisual, project);
    return;
  }

  /*
   * Other projects use the same artwork language
   * as the cards, but enlarged inside the modal.
   */
  const visual = document.createElement("div");

  visual.className = `modal-art ${project.visual}`;

  if (project.visual === "art-b") {
    visual.innerHTML = `
            <div class="ring"></div>
            <div class="big24">24</div>
            <div class="frame">FRAMES</div>
            <span>24F / MOTION CAMPAIGN</span>
          `;
  }

  if (project.visual === "art-c") {
    visual.innerHTML = `
            <div class="object">◒</div>
      
            <div class="obj-type">
              OBJECTS<br>
              WITH<br>
              ATTITUDE
            </div>
      
            <span>ODD / EDITORIAL</span>
          `;
  }

  if (project.visual === "art-d") {
    visual.innerHTML = `
            <div class="static">
              NO<br>
              SIGNAL
            </div>
      
            <div class="fm">FM</div>
            <div class="dial">∞</div>
      
            <span>STATIC / DIGITAL</span>
          `;
  }

  modalVisual.appendChild(visual);
}

/* =========================================================
         HALFWAY PDF
      ========================================================= */

function renderHalfway(container, project) {
  const wrapper = document.createElement("div");

  wrapper.className = "pdf-viewer";

  wrapper.innerHTML = `
         <div class="pdf-stage">
     
           <div class="pdf-loading">
             LOADING PDF / 00%
           </div>
     
           <div class="pdf-spread"></div>
     
         </div>
     
         <div class="pdf-controls">
     
           <button
             type="button"
             class="pdf-prev"
             aria-label="Previous spread"
           >
             ←
           </button>
     
           <span class="pdf-page">
             01 / 01
           </span>
     
           <button
             type="button"
             class="pdf-next"
             aria-label="Next spread"
           >
             →
           </button>
     
         </div>
       `;

  container.appendChild(wrapper);

  const pdfUrl = project.pdf || "assets/halfway-MAG.pdf.pdf";

  setupPDFViewer(wrapper, pdfUrl);
}

/* =========================================================
         PDF VIEWER
      ========================================================= */

async function setupPDFViewer(wrapper, url) {
  const stage = wrapper.querySelector(".pdf-stage");
  const spread = wrapper.querySelector(".pdf-spread");
  const loading = wrapper.querySelector(".pdf-loading");

  const prev = wrapper.querySelector(".pdf-prev");
  const next = wrapper.querySelector(".pdf-next");
  const pageIndicator = wrapper.querySelector(".pdf-page");

  if (!stage || !spread || !loading) return;

  if (typeof pdfjsLib === "undefined") {
    loading.textContent = "PDF.JS NOT AVAILABLE";
    return;
  }

  let pdf = null;
  let currentSpread = 0;
  let rendering = false;
  let queuedSpread = null;

  try {
    pdf = await pdfjsLib.getDocument(url).promise;

    if (!pdf) {
      throw new Error("PDF could not be loaded.");
    }

    await renderSpread(0);

    prev?.addEventListener("click", () => {
      if (currentSpread <= 0) return;

      queueSpread(currentSpread - 1);
    });

    next?.addEventListener("click", () => {
      if (!pdf) return;

      const spreads = getSpreads(pdf.numPages);

      if (currentSpread >= spreads.length - 1) return;

      queueSpread(currentSpread + 1);
    });

    window.addEventListener("resize", () => {
      if (state.modalOpen && state.currentProject === 0 && pdf) {
        renderSpread(currentSpread);
      }
    });
  } catch (error) {
    console.error("HALFWAY PDF error:", error);

    loading.textContent = "PDF COULD NOT BE LOADED";
  }

  function getSpreads(totalPages) {
    const result = [];

    if (!totalPages) return result;

    // COVER
    result.push([1]);

    // INTERIOR SPREADS
    let page = 2;

    while (page < totalPages) {
      if (page + 1 <= totalPages) {
        result.push([page, page + 1]);
        page += 2;
      } else {
        result.push([page]);
        page++;
      }
    }

    return result;
  }

  function queueSpread(index) {
    if (rendering) {
      queuedSpread = index;
      return;
    }

    renderSpread(index);
  }

  async function renderSpread(spreadIndex) {
    if (!pdf) return;

    rendering = true;

    loading.style.display = "flex";

    try {
      const spreads = getSpreads(pdf.numPages);
      const pages = spreads[spreadIndex];

      if (!pages) return;

      spread.innerHTML = "";

      /*
       * We render every page independently.
       * This lets us create a real magazine spread.
       */

      const canvases = [];

      for (const pageNumber of pages) {
        const page = await pdf.getPage(pageNumber);

        const baseViewport = page.getViewport({
          scale: 1,
        });

        canvases.push({
          page,
          pageNumber,
          baseViewport,
        });
      }

      /*
       * Calculate the available area.
       */

      const availableWidth = Math.max(500, stage.clientWidth - 30);

      const availableHeight = Math.max(500, stage.clientHeight - 30);

      /*
       * SINGLE PAGE
       */

      if (pages.length === 1) {
        const item = canvases[0];

        const scale = Math.min(
          availableWidth / item.baseViewport.width,
          availableHeight / item.baseViewport.height
        );

        const viewport = item.page.getViewport({
          scale,
        });

        const canvas = document.createElement("canvas");

        canvas.className = "pdf-page-single";

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(viewport.width * dpr);

        canvas.height = Math.floor(viewport.height * dpr);

        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        const context = canvas.getContext("2d");

        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        await item.page.render({
          canvasContext: context,
          viewport,
        }).promise;

        spread.classList.add("single");
        spread.classList.remove("double");

        spread.appendChild(canvas);
      } else {
        /*
         * TWO PAGE SPREAD
         */
        spread.classList.add("double");
        spread.classList.remove("single");

        const gap = 10;

        const scaleByWidth =
          (availableWidth - gap) /
          (canvases[0].baseViewport.width + canvases[1].baseViewport.width);

        const scaleByHeight =
          availableHeight /
          Math.max(
            canvases[0].baseViewport.height,
            canvases[1].baseViewport.height
          );

        const scale = Math.min(scaleByWidth, scaleByHeight);

        for (const item of canvases) {
          const viewport = item.page.getViewport({
            scale,
          });

          const canvas = document.createElement("canvas");

          canvas.className = "pdf-page";

          const dpr = Math.min(window.devicePixelRatio || 1, 2);

          canvas.width = Math.floor(viewport.width * dpr);

          canvas.height = Math.floor(viewport.height * dpr);

          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;

          const context = canvas.getContext("2d");

          context.setTransform(dpr, 0, 0, dpr, 0, 0);

          await item.page.render({
            canvasContext: context,
            viewport,
          }).promise;

          spread.appendChild(canvas);
        }
      }

      currentSpread = spreadIndex;

      /*
       * Counter
       */

      const currentPages = spreads[spreadIndex];

      const firstPage = currentPages[0];
      const lastPage = currentPages[currentPages.length - 1];

      if (currentPages.length === 1) {
        pageIndicator.textContent =
          `${String(firstPage).padStart(2, "0")} / ` +
          `${String(pdf.numPages).padStart(2, "0")}`;
      } else {
        pageIndicator.textContent =
          `${String(firstPage).padStart(2, "0")}–` +
          `${String(lastPage).padStart(2, "0")} / ` +
          `${String(pdf.numPages).padStart(2, "0")}`;
      }

      if (prev) {
        prev.disabled = currentSpread <= 0;
      }

      if (next) {
        next.disabled = currentSpread >= spreads.length - 1;
      }

      loading.style.display = "none";
    } catch (error) {
      console.error("PDF spread rendering error:", error);
    } finally {
      rendering = false;

      if (queuedSpread !== null) {
        const nextSpread = queuedSpread;

        queuedSpread = null;

        renderSpread(nextSpread);
      }
    }
  }
}

/* =========================================================
         TOOLS MARQUEE
      ========================================================= */

const tools = [
  "FIGMA",
  "ADOBE CC",
  "INDESIGN",
  "PHOTOSHOP",
  "ILLUSTRATOR",
  "AFTER EFFECTS",
  "PREMIERE",
  "CINEMA 4D",
  "FIGMA",
  "ADOBE CC",
  "INDESIGN",
  "PHOTOSHOP",
  "ILLUSTRATOR",
  "AFTER EFFECTS",
  "PREMIERE",
  "CINEMA 4D",
];

function setupMarquee() {
  if (!marqueeTrack) return;

  marqueeTrack.innerHTML = "";

  /*
   * Duplicate the complete sequence so there is never
   * an empty section during the loop.
   */
  const sequence = [...tools, ...tools];

  sequence.forEach((tool) => {
    const item = document.createElement("span");

    item.className = "marquee-item";

    item.innerHTML = `
            <b>✦</b>
            ${tool}
          `;

    marqueeTrack.appendChild(item);
  });

  /*
   * Kill previous marquee tweens.
   */
  gsap.killTweensOf(marqueeTrack);

  /*
   * The CSS handles the actual width.
   * GSAP gives it a continuous, perfectly
   * linear movement.
   */
  const halfWidth = marqueeTrack.scrollWidth / 2;

  gsap.to(marqueeTrack, {
    x: -halfWidth,
    duration: 34,
    ease: "none",
    repeat: -1,
  });
}

/* =========================================================
         PROJECT CARD HOVER
      ========================================================= */

function setupProjectHover() {
  projectsElements.forEach((project) => {
    const art = project.querySelector(".art");

    if (!art) return;

    project.addEventListener("mouseenter", () => {
      gsap.to(art, {
        scale: 1.025,
        duration: 0.7,
        ease: "power3.out",
      });
    });

    project.addEventListener("mouseleave", () => {
      gsap.to(art, {
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
      });
    });
  });
}

/* =========================================================
         SECTION LABELS
      ========================================================= */

function setupSectionAnimations() {
  document.querySelectorAll(".section-label").forEach((label) => {
    const spans = label.querySelectorAll("span");

    gsap.fromTo(
      spans,
      {
        y: 18,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",

        scrollTrigger: {
          trigger: label,
          start: "top 88%",
          once: true,
        },
      }
    );
  });
}

/* =========================================================
         MANIFESTO STAR
      ========================================================= */

function setupManifestoStar() {
  const star = document.querySelector(".manifesto-side .star");

  if (!star) return;

  gsap.to(star, {
    rotation: 360,
    duration: 18,
    repeat: -1,
    ease: "none",
  });
}

/* =========================================================
         BACKGROUND FIELD
      ========================================================= */

function setupField() {
  const canvas = document.getElementById("field");

  if (!canvas) return;

  const context = canvas.getContext("2d");

  if (!context) return;

  let width = 0;
  let height = 0;

  const points = [];

  const pointCount = Math.min(
    100,
    Math.max(45, Math.floor(window.innerWidth / 18))
  );

  function resize() {
    width = canvas.width = window.innerWidth;

    height = canvas.height = window.innerHeight;
  }

  resize();

  window.addEventListener("resize", resize);

  for (let i = 0; i < pointCount; i++) {
    points.push({
      x: Math.random() * window.innerWidth,

      y: Math.random() * window.innerHeight,

      radius: Math.random() * 1.2 + 0.3,

      speed: Math.random() * 0.15 + 0.03,

      offset: Math.random() * Math.PI * 2,
    });
  }

  function draw(time) {
    context.clearRect(0, 0, width, height);

    const dark = html.dataset.theme === "dark";

    context.fillStyle = dark ? "rgba(241,238,230,.35)" : "rgba(16,16,16,.24)";

    points.forEach((point) => {
      point.y -= point.speed;

      if (point.y < -10) {
        point.y = height + 10;
      }

      const x = point.x + Math.sin(time * 0.00025 + point.offset) * 10;

      const y = point.y + Math.cos(time * 0.0002 + point.offset) * 5;

      context.beginPath();

      context.arc(x, y, point.radius, 0, Math.PI * 2);

      context.fill();
    });

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

/* =========================================================
         CONTACT MAGNETIC
      ========================================================= */

function setupContact() {
  const contact = document.querySelector(".contact-link");

  if (!contact) return;

  contact.addEventListener("mouseenter", () => {
    gsap.to(contact, {
      letterSpacing: "0.02em",
      duration: 0.3,
    });
  });

  contact.addEventListener("mouseleave", () => {
    gsap.to(contact, {
      letterSpacing: "-0.06em",
      duration: 0.3,
    });
  });
}

/* =========================================================
         SMOOTH MENU SCROLL
      ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    closeMenu();

    gsap.to(window, {
      duration: 1.1,
      scrollTo: {
        y: target,
        offsetY: 0,
      },
      ease: "power3.inOut",
    });
  });
});

/* =========================================================
         LOGO
      ========================================================= */

document.querySelector(".logo")?.addEventListener("click", (event) => {
  event.preventDefault();

  gsap.to(window, {
    duration: 1,
    scrollTo: 0,
    ease: "power3.inOut",
  });
});

/* =========================================================
         RESIZE
      ========================================================= */

let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    setupHorizontalWork();

    setupMarquee();

    ScrollTrigger.refresh();
  }, 250);
});

/* =========================================================
         REDUCED MOTION
      ========================================================= */

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (reducedMotion.matches) {
  gsap.globalTimeline.timeScale(0.15);
}

/* =========================================================
         INIT
      ========================================================= */

function init() {
  applyTheme();
  applyLanguage();

  restoreAsterisk();

  setupCursor();
  setupMagnetic();

  setupHero();

  setupReveals();
  setupSectionAnimations();

  setupHorizontalWork();

  setupMarquee();

  setupProjectHover();

  setupManifestoStar();

  setupField();

  setupContact();

  /*
   * Refresh after every layout-dependent
   * component has been created.
   */
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  runPreloader();
}

/* =========================================================
         START
      ========================================================= */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
