/* =========================================================
   EMMA PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* =========================================================
   SETTINGS / STATE
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

const translations = {
  en: {
    available: "AVAILABLE",
    navWork: "WORK",
    navAbout: "ABOUT",
    navContact: "CONTACT",
    workTitle: "Selected<br><em>signals.</em>",
    contactTitle: "LET'S TALK<sup>↗</sup>",
    sectionIntro: "01 — INTRO",
    designerYear: "GRAPHIC DESIGNER / 2026",
    scroll: "SCROLL",
    sectionPointOfView: "02 — POINT OF VIEW",
    sectionWork: "03 — SELECTED WORK",
    dragScroll: "DRAG / SCROLL",
    project0Category: "EDITORIAL / ART DIRECTION",
    project1Category: "3D MODELING",
    project2Category: "ILLUSTRATION / PACKAGING",
    project3Category: "3D ANIMATION / ART DIRECTION",
    sectionAbout: "04 — ABOUT",
    humanProcess: "HUMAN / PROCESS",
    sectionContact: "05 — CONTACT",
    openChannel: "OPEN CHANNEL",
    heroMake: "MAKE",
    heroThings: "THINGS",
    heroMatter: "MATTER",
    toolsWorkflow: "TOOLS / SOFTWARE / WORKFLOW",
    continuousSystem: "CONTINUOUS SYSTEM / 2026",
    intro:
      "Recently graduated graphic designer building visual identities, campaigns and digital worlds with a soft spot for strange ideas.",
    manifesto: "GOOD DESIGN<br><em>SHOULD FEEL</em><br>ALIVE.",
    manifestoSide:
      "Not decoration. Not noise. A clear idea, pushed until it develops a pulse.",
    workLead:
      "A selection of projects that brings together a part of what I do.",
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
    orbitText:
      "* IDENTITY · EDITORIAL · MOTION · DIGITAL · BRANDING · PHOTOGRAPHY · ILLUSTRATION *",
  },

  es: {
    available: "DISPONIBLE",
    navWork: "TRABAJO",
    navAbout: "SOBRE MÍ",
    navContact: "CONTACTO",
    workTitle: "Selección<br><em>visual.</em>",
    contactTitle: "HABLEMOS<sup>↗</sup>",
    sectionIntro: "01 — INTRO",
    designerYear: "DISEÑADORA GRÁFICA / 2026",
    scroll: "DESLIZA",
    sectionPointOfView: "02 — PUNTO DE VISTA",
    sectionWork: "03 — TRABAJOS SELECCIONADOS",
    dragScroll: "ARRASTRA / DESLIZA",
    project0Category: "EDITORIAL / DIRECCIÓN DE ARTE",
    project1Category: "MODELADO 3D",
    project2Category: "ILUSTRACIÓN / PACKAGING",
    project3Category: "ANIMACIÓN 3D / DIRECCIÓN DE ARTE",
    sectionAbout: "04 — SOBRE MÍ",
    humanProcess: "HUMANO / PROCESO",
    sectionContact: "05 — CONTACTO",
    openChannel: "CANAL ABIERTO",
    heroMake: "HAZ",
    heroThings: "QUE",
    heroMatter: "IMPORTE",
    toolsWorkflow: "HERRAMIENTAS / SOFTWARE / FLUJO DE TRABAJO",
    continuousSystem: "SISTEMA CONTINUO / 2026",
    intro:
      "Recién graduada en diseño gráfico deseando crear identidades, visuales y mundos digitales, con debilidad por las ideas extrañas",
    manifesto: "EL BUEN DISEÑO<br><em>DEBERÍA SENTIRSE</em><br>VIVO.",
    manifestoSide:
      "Sin decoración. Sin ruido. Una idea clara, llevada hasta desarrollar su propio pulso.",
    workLead: "Una selección de proyectos que reúne una parte de lo que hago.",
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
    orbitText:
      " * IDENTIDAD · EDITORIAL · MOTION · DIGITAL · BRANDING · FOTOGRAFÍA · ILUSTRACIÓN *",
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
      en: "An editorial design project exploring the concept of unfinished ideas, stories and possibilities through a conceptual magazine. \n\n The publication combines research, art direction, editorial design and visual storytelling, bringing together topics ranging from unfinished artworks and abandoned inventions to scientific theories, dreams and unexplained phenomena.  \n\n Developed as a team project, the magazine was collaboratively researched, conceptualized and designed, resulting in a cohesive visual identity built around the idea of leaving things open to interpretation.",
      es: "Proyecto de diseño editorial que explora el concepto de las ideas, historias y posibilidades inacabadas a través de una revista conceptual. \n\n La publicación combina investigación, dirección de arte, diseño editorial y narrativa visual, abordando temas que van desde obras de arte inacabadas e inventos abandonados hasta teorías científicas, sueños y fenómenos inexplicados.  \n\n Desarrollado como trabajo en equipo, el proyecto fue investigado, conceptualizado y diseñado de forma colaborativa, creando una identidad visual cohesionada en torno a la idea de dejar espacio para la interpretación.",
    },
    tags: ["EDITORIAL", "ART DIRECTION", "TYPOGRAPHY", "INDESIGN"],
    visual: "art-a",
    pdf: "assets/halfway-MAG.pdf",
  },
  {
    number: "02",
    title: "WINDOW DISPLAY",
    category: "3D MODELING",
    description: {
      en: "A 3D window display concept for Miniso’s Sanrio collection, developed around a soft and playful Christmas aesthetic. \n\n I modelled all visual elements from scratch, including the Sanrio characters, props and custom balloon typography. The window display structure was provided as a base by the professor. \n\n The project combines 3D modelling, materials, lighting and colour to create a cohesive and inviting retail environment.",

      es: "Concepto de escaparate 3D para la colección de Sanrio de Miniso, desarrollado en torno a una estética navideña suave y lúdica. \n\n Modelé desde cero todos los elementos visuales, incluyendo los personajes de Sanrio, los props y la tipografía personalizada con efecto de globos. La estructura del escaparate fue proporcionada por la profesora como base del proyecto. \n\n El proyecto combina modelado 3D, materiales, iluminación y color para crear un espacio comercial cohesivo y atractivo.",
    },

    tags: ["3D", "CINEMA4D"],

    visual: "art-b",

    images: [
      "assets/imgs/3D/byw_cerca.png",
      "assets/imgs/3D/byw_lejos.png",
      "assets/imgs/3D/color_cerca.png",
      "assets/imgs/3D/color_lejos.png",
    ],
  },
  {
    number: "03",
    title: "CATA LALATA",
    category: "ILLUSTRATION / PACKAGING",
    description: {
      en: "A packaging system created for Cata la Lata, a competition by ANFACO-CECOPESCA focused on promoting the culture and consumption of Spanish seafood preserves.\n\nThe project reimagines the packaging of three varieties: mussels in escabeche, sardines in olive oil and tuna in olive oil.\n\nEach variety was given its own visual identity while sharing a common system of colour, composition and graphic elements.\n\nThe result is a collection designed to work as a family, but with enough personality for each can to stand on its own.",

      es: "Un sistema de packaging creado para Cata la Lata, un concurso de ANFACO-CECOPESCA centrado en promover la cultura y el consumo de conservas de pescado y marisco.\n\nEl proyecto reinterpreta el packaging de tres variedades: mejillones en escabeche, sardinillas en aceite de oliva y atún claro en aceite de oliva.\n\nCada variedad desarrolla su propia identidad visual, manteniendo un sistema común de color, composición y elementos gráficos.\n\nEl resultado es una colección pensada para funcionar como una familia, pero con suficiente personalidad para que cada lata pueda destacar por sí misma.",
    },
    tags: ["ILLUSTRATION", "PACKAGING"],
    visual: "art-c",

    images: [
      "assets/imgs/catalalata/catalalata-atún.png",
      "assets/imgs/catalalata/catalalata-mejillones.png",
      "assets/imgs/catalalata/catalalata-sardinillas.png",
    ],
  },
  {
    number: "04",
    title: "PERFUME AD",
    category: "3D ANIMATION / ART DIRECTION",
    description: {
      en: "A 3D animation and art direction study inspired by the visual language of luxury perfume advertising. \n\n The piece explores elegance and sophistication through a minimal composition, using a perfume bottle as its central element. Smooth camera movements, carefully controlled lighting and refined material treatment work together to create a sense of calm, exclusivity and luxury. \n\n The project grew from research into high-end fragrance campaigns and explores how light, movement and composition can transform a product into a visual experience.",
      es: "Un estudio de dirección de arte y animación 3D inspirado en el lenguaje visual de la publicidad de perfumería de lujo. \n\n La pieza explora la elegancia y la sofisticación a través de una composición minimalista, utilizando un frasco de perfume como elemento central. Los movimientos de cámara suaves, la iluminación cuidadosamente controlada y el tratamiento de los materiales buscan crear una atmósfera refinada y transmitir una sensación de calma, exclusividad y lujo. \n\n El proyecto nace de la investigación de campañas de perfumería de alta gama y explora cómo la luz, el movimiento y la composición pueden transformar un producto en una experiencia visual.",
    },
    tags: ["CINEMA4D", "VIDEO EDITING", "ART DIRECTION"],
    visual: "art-d",

    video: "assets/videos/video_channel_musica.mp4",
  },
  {
    number: "05",
    title: "BOTA NICAL NOTES",
    category: "DIGITAL / PACKAGING / 3D",
    description: {
      en: "A packaging system created for Cata la Lata, a competition by ANFACO-CECOPESCA focused on promoting the culture and consumption of Spanish seafood preserves.\n\nThe project reimagines the packaging of three varieties: mussels in escabeche, sardines in olive oil and tuna in olive oil.\n\nEach variety was given its own visual identity while sharing a common system of colour, composition and graphic elements.\n\nThe result is a collection designed to work as a family, but with enough personality for each can to stand on its own.",

      es: "Un sistema de packaging creado para Cata la Lata, un concurso de ANFACO-CECOPESCA centrado en promover la cultura y el consumo de conservas de pescado y marisco.\n\nEl proyecto reinterpreta el packaging de tres variedades: mejillones en escabeche, sardinillas en aceite de oliva y atún claro en aceite de oliva.\n\nCada variedad desarrolla su propia identidad visual, manteniendo un sistema común de color, composición y elementos gráficos.\n\nEl resultado es una colección pensada para funcionar como una familia, pero con suficiente personalidad para que cada lata pueda destacar por sí misma.",
    },
    tags: ["DIGITAL", "PACKAGING"],
    visual: "art-e",

    images: [
      "assets/imgs/café/Product_Shot.png",
      "assets/imgs/café/Product_Shot1.png",
      "assets/imgs/café/Product_Shot2.png",
    ],
  },
];

/* =========================================================
   DOM REFERENCES
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
const projectElements = document.querySelectorAll(".project");
const marqueeTrack = document.querySelector(".marquee-track");

let horizontalWorkTrigger = null;
let activePdfRenderer = null;
let resizeTimer = null;

/* =========================================================
   THEME / LANGUAGE
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

  html.lang = state.lang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) element.innerHTML = dictionary[key];
  });

  document.querySelectorAll("[data-lang]").forEach((element) => {
    element.classList.toggle("active", element.dataset.lang === state.lang);
  });

  localStorage.setItem(STORAGE_LANG, state.lang);
}

themeButton?.addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  applyTheme();
  requestAnimationFrame(() => ScrollTrigger.refresh());
});

langButton?.addEventListener("click", () => {
  state.lang = state.lang === "en" ? "es" : "en";
  applyLanguage();

  if (state.modalOpen) renderProject(state.currentProject);
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
            window.scrollTo(0, 0);
          },
        }
      );
    }

    if (preNum) preNum.textContent = String(value).padStart(2, "0");

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
    body.style.cursor = "auto";
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

  projectElements.forEach((project) => {
    project.addEventListener("mouseenter", () => {
      cursorLabel.textContent = "OPEN";
      gsap.to(cursorLabel, { opacity: 1, duration: 0.2 });
      gsap.to(cursor, { scale: 1.5, duration: 0.25, ease: "power2.out" });
    });

    project.addEventListener("mouseleave", () => {
      gsap.to(cursorLabel, { opacity: 0, duration: 0.2 });
      gsap.to(cursor, { scale: 1, duration: 0.25, ease: "power2.out" });
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
  body.classList.add("menu-open");
  menuLayer.setAttribute("aria-hidden", "false");

  menuButton?.setAttribute("aria-expanded", "true");
  menuButton?.setAttribute("aria-label", "Close menu");

  gsap.killTweensOf(menuLayer);
  gsap.killTweensOf(".menu-links a");

  gsap.set(menuLayer, {
    display: "flex",
    visibility: "visible",
    pointerEvents: "auto",
    autoAlpha: 1,
    clipPath: "inset(0 0 100% 0)",
  });

  gsap.set(".menu-links a", { y: 70, opacity: 0 });

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
  body.classList.remove("menu-open");
  menuLayer.setAttribute("aria-hidden", "true");

  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open menu");

  gsap.killTweensOf(menuLayer);
  gsap.killTweensOf(".menu-links a");

  gsap.to(".menu-links a", {
    y: 40,
    opacity: 0,
    duration: 0.25,
    ease: "power2.in",
  });

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
}

menuButton?.addEventListener("click", () => {
  state.menuOpen ? closeMenu() : openMenu();
});

menuClose?.addEventListener("click", closeMenu);

document.querySelectorAll(".menu-links a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* =========================================================
   HERO
========================================================= */

function setupHero() {
  const heroTitle = document.querySelector(".hero-title");
  const orbit = document.querySelector(".orbit");

  if (!heroTitle || !orbit) return;

  gsap.set([heroTitle, orbit], { x: 0, y: 0 });

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
   REVEALS
========================================================= */

function setupReveals() {
  const elements = document.querySelectorAll(
    ".section-label, .manifesto h2, .manifesto-side, .work-intro, .interlude p, .about-grid, .contact-core"
  );

  elements.forEach((element) => {
    gsap.fromTo(
      element,
      { y: 45, opacity: 0 },
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

function setupSectionAnimations() {
  document.querySelectorAll(".section-label").forEach((label) => {
    const spans = label.querySelectorAll("span");

    gsap.fromTo(
      spans,
      { y: 18, opacity: 0 },
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
   HORIZONTAL WORK SHOWCASE
========================================================= */

function setupHorizontalWork() {
  if (!projectTrack) return;

  horizontalWorkTrigger?.kill();
  horizontalWorkTrigger = null;
  gsap.killTweensOf(projectTrack);

  const workSection = document.querySelector(".work");
  if (!workSection) return;

  const isMobile = window.innerWidth < 1024;

  if (isMobile) {
    gsap.set(projectTrack, { clearProps: "transform" });
    return;
  }

  const getDistance = () =>
    Math.max(0, projectTrack.scrollWidth - window.innerWidth + 80);

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
        if (progress) gsap.set(progress, { scaleX: self.progress });
      },
    },
  });

  projectElements.forEach((project) => {
    project.style.pointerEvents = "auto";
  });
}

/* =========================================================
   PROJECT CARDS
========================================================= */

function setupProjectHover() {
  projectElements.forEach((project) => {
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

projectElements.forEach((project) => {
  project.addEventListener("click", (event) => {
    if (event.target.closest("a") || event.target.closest("button")) return;

    const index = Number(project.dataset.id);
    if (!Number.isNaN(index)) openProject(index);
  });
});

/* =========================================================
   PROJECT MODAL
========================================================= */

function openProject(index) {
  const project = projects[index];
  if (!modal || !project) return;

  state.currentProject = index;
  state.modalOpen = true;
  body.classList.add("modal-open");
  modal.setAttribute("aria-hidden", "false");

  renderProject(index);

  gsap.killTweensOf(modal);
  gsap.killTweensOf(".modal-grid");

  gsap.set(modal, {
    display: "block",
    visibility: "visible",
    pointerEvents: "auto",
    autoAlpha: 1,
    clipPath: "inset(0 0 100% 0)",
  });

  gsap.set(".modal-grid", { y: 35, opacity: 0 });

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
  body.classList.remove("modal-open");
  modal.setAttribute("aria-hidden", "true");
  activePdfRenderer = null;

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
      if (state.modalOpen) return;

      gsap.set(modal, {
        display: "none",
        pointerEvents: "none",
        autoAlpha: 1,
      });

      if (modalVisual) modalVisual.innerHTML = "";
    },
  });
}

closeModalButton?.addEventListener("click", closeProject);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeProject();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (state.modalOpen) closeProject();
  if (state.menuOpen) closeMenu();
});

function renderProject(index) {
  const project = projects[index];
  if (!project) return;

  modalIndex && (modalIndex.textContent = project.number);
  modalCat && (modalCat.textContent = project.category);
  modalTitle && (modalTitle.textContent = project.title);
  modalText && (modalText.textContent = project.description[state.lang]);

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
  activePdfRenderer = null;

  if (index === 0) {
    renderHalfway(modalVisual, project);
    return;
  }

  if (project.images?.length || project.video) {
    const gallery = document.createElement("div");
    gallery.className = "project-gallery";

    gallery.innerHTML = `
      ${
        project.images
          ?.map(
            (image, i) => `
              <img
                src="${image}"
                alt="${project.title} - image ${i + 1}"
                loading="${i === 0 ? "eager" : "lazy"}"
              />
            `
          )
          .join("") || ""
      }
  
      ${
        project.video
          ? `
          <div class="video-wrapper">
          <video
            src="${project.video}"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          ></video>
        
          <div class="video-controls">
            <button
              class="video-play"
              type="button"
              aria-label="Pausar vídeo"
            >
              ❚❚
            </button>
        
            <button
              class="video-sound"
              type="button"
              aria-label="Activar sonido"
              aria-pressed="false"
            >
              <span class="volume-icon volume-off">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 9v6h4l5 4V5L8 9H4z"></path>
                  <path d="M17 9l4 6"></path>
                  <path d="M21 9l-4 6"></path>
                </svg>
              </span>
        
              <span class="volume-icon volume-on">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 9v6h4l5 4V5L8 9H4z"></path>
                  <path d="M17 9a5 5 0 0 1 0 6"></path>
                  <path d="M19.5 6.5a9 9 0 0 1 0 11"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
        </div>
          `
          : ""
      }
    `;

    modalVisual.appendChild(gallery);

    // BOTÓN DE SONIDO
    const video = gallery.querySelector("video");
    const soundButton = gallery.querySelector(".video-sound");
    const playButton = gallery.querySelector(".video-play");

    if (video) {
      // PLAY / PAUSE
      if (playButton) {
        playButton.addEventListener("click", (event) => {
          event.stopPropagation();

          if (video.paused) {
            video.play();
            playButton.textContent = "❚❚";
            playButton.setAttribute("aria-label", "Pausar vídeo");
          } else {
            video.pause();
            playButton.textContent = "▶";
            playButton.setAttribute("aria-label", "Reproducir vídeo");
          }
        });
      }

      // CLICK DIRECTAMENTE SOBRE EL VÍDEO
      video.addEventListener("click", () => {
        if (video.paused) {
          video.play();

          if (playButton) {
            playButton.textContent = "❚❚";
            playButton.setAttribute("aria-label", "Pausar vídeo");
          }
        } else {
          video.pause();

          if (playButton) {
            playButton.textContent = "▶";
            playButton.setAttribute("aria-label", "Reproducir vídeo");
          }
        }
      });

      // SONIDO
      if (soundButton) {
        soundButton.addEventListener("click", (event) => {
          event.stopPropagation();

          video.muted = !video.muted;

          soundButton.setAttribute(
            "aria-label",
            video.muted ? "Activar sonido" : "Desactivar sonido"
          );

          soundButton.setAttribute("aria-pressed", String(!video.muted));

          soundButton.classList.toggle("is-muted", video.muted);
        });
      }
    }
    return;
  }

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
      <div class="obj-type">OBJECTS<br>WITH<br>ATTITUDE</div>
    `;
  }

  if (project.visual === "art-d") {
    visual.innerHTML = `
      <div class="static">NO<br>SIGNAL</div>
      <div class="fm">FM</div>
      <div class="dial">∞</div>
      <span>STATIC / DIGITAL</span>
    `;
  }

  modalVisual.appendChild(visual);
}

/* =========================================================
   HALFWAY PDF VIEWER
========================================================= */

function renderHalfway(container, project) {
  const wrapper = document.createElement("div");
  wrapper.className = "pdf-viewer";

  wrapper.innerHTML = `
    <div class="pdf-stage">
      <div class="pdf-loading">LOADING PDF / 00%</div>
      <div class="pdf-spread"></div>
    </div>

    <div class="pdf-controls">
      <button type="button" class="pdf-prev" aria-label="Previous spread">←</button>
      <span class="pdf-page">01 / 01</span>
      <button type="button" class="pdf-next" aria-label="Next spread">→</button>
    </div>
  `;

  container.appendChild(wrapper);
  setupPDFViewer(wrapper, project.pdf || "assets/halfway-MAG.pdf");
}

async function setupPDFViewer(wrapper, url) {
  const stage = wrapper.querySelector(".pdf-stage");
  const spread = wrapper.querySelector(".pdf-spread");
  const loading = wrapper.querySelector(".pdf-loading");
  const prev = wrapper.querySelector(".pdf-prev");
  const next = wrapper.querySelector(".pdf-next");
  const pageIndicator = wrapper.querySelector(".pdf-page");

  if (!stage || !spread || !loading || typeof pdfjsLib === "undefined") {
    if (loading) loading.textContent = "PDF.JS NOT AVAILABLE";
    return;
  }

  let pdf = null;
  let currentSpread = 0;
  let rendering = false;
  let queuedSpread = null;

  function getSpreads(totalPages) {
    const result = [];
    if (!totalPages) return result;

    result.push([1]);

    let page = 2;
    while (page < totalPages) {
      if (page + 1 <= totalPages) {
        result.push([page, page + 1]);
        page += 2;
      } else {
        result.push([page]);
        page += 1;
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

      const pageData = [];

      for (const pageNumber of pages) {
        const page = await pdf.getPage(pageNumber);
        pageData.push({
          page,
          baseViewport: page.getViewport({ scale: 1 }),
        });
      }

      const availableWidth = Math.max(500, stage.clientWidth - 30);
      const availableHeight = Math.max(500, stage.clientHeight - 30);

      if (pages.length === 1) {
        const item = pageData[0];
        const scale = Math.min(
          availableWidth / item.baseViewport.width,
          availableHeight / item.baseViewport.height
        );

        const viewport = item.page.getViewport({ scale });
        const canvas = createPDFCanvas(viewport, item.page);

        spread.classList.add("single");
        spread.classList.remove("double");
        spread.appendChild(await canvas);
      } else {
        const gap = 10;
        const scaleByWidth =
          (availableWidth - gap) /
          (pageData[0].baseViewport.width + pageData[1].baseViewport.width);
        const scaleByHeight =
          availableHeight /
          Math.max(
            pageData[0].baseViewport.height,
            pageData[1].baseViewport.height
          );

        const scale = Math.min(scaleByWidth, scaleByHeight);

        spread.classList.add("double");
        spread.classList.remove("single");

        for (const item of pageData) {
          const viewport = item.page.getViewport({ scale });
          spread.appendChild(await createPDFCanvas(viewport, item.page));
        }
      }

      currentSpread = spreadIndex;

      const currentPages = spreads[spreadIndex];
      const firstPage = currentPages[0];
      const lastPage = currentPages[currentPages.length - 1];

      pageIndicator.textContent =
        currentPages.length === 1
          ? `${String(firstPage).padStart(2, "0")} / ${String(
              pdf.numPages
            ).padStart(2, "0")}`
          : `${String(firstPage).padStart(2, "0")}–${String(lastPage).padStart(
              2,
              "0"
            )} / ${String(pdf.numPages).padStart(2, "0")}`;

      if (prev) prev.disabled = currentSpread <= 0;
      if (next) next.disabled = currentSpread >= spreads.length - 1;

      loading.style.display = "none";
    } catch (error) {
      console.error("PDF spread rendering error:", error);
      loading.textContent = "PDF COULD NOT BE LOADED";
    } finally {
      rendering = false;

      if (queuedSpread !== null) {
        const nextSpread = queuedSpread;
        queuedSpread = null;
        renderSpread(nextSpread);
      }
    }
  }

  async function createPDFCanvas(viewport, page) {
    const canvas = document.createElement("canvas");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.className =
      viewport.width === page.getViewport({ scale: viewport.scale }).width
        ? "pdf-page"
        : "pdf-page";

    canvas.width = Math.floor(viewport.width * dpr);
    canvas.height = Math.floor(viewport.height * dpr);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;

    const context = canvas.getContext("2d");
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    await page.render({
      canvasContext: context,
      viewport,
    }).promise;

    return canvas;
  }

  try {
    pdf = await pdfjsLib.getDocument(url).promise;
    if (!pdf) throw new Error("PDF could not be loaded.");

    activePdfRenderer = () => {
      if (state.modalOpen && state.currentProject === 0 && pdf) {
        renderSpread(currentSpread);
      }
    };

    await renderSpread(0);

    prev?.addEventListener("click", () => {
      if (currentSpread > 0) queueSpread(currentSpread - 1);
    });

    next?.addEventListener("click", () => {
      if (!pdf) return;
      const spreads = getSpreads(pdf.numPages);
      if (currentSpread < spreads.length - 1) queueSpread(currentSpread + 1);
    });
  } catch (error) {
    console.error("HALFWAY PDF error:", error);
    loading.textContent = "PDF COULD NOT BE LOADED";
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
];

function setupMarquee() {
  if (!marqueeTrack) return;

  gsap.killTweensOf(marqueeTrack);
  marqueeTrack.innerHTML = "";

  [...tools, ...tools].forEach((tool) => {
    const item = document.createElement("span");
    item.className = "marquee-item";
    item.innerHTML = `<b>✦</b>${tool}`;
    marqueeTrack.appendChild(item);
  });

  const halfWidth = marqueeTrack.scrollWidth / 2;

  gsap.to(marqueeTrack, {
    x: -halfWidth,
    duration: 34,
    ease: "none",
    repeat: -1,
  });
}

/* =========================================================
   MANIFESTO / CONTACT / FIELD
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

function setupContact() {
  const contact = document.querySelector(".contact-link");
  if (!contact) return;

  contact.addEventListener("mouseenter", () => {
    gsap.to(contact, { letterSpacing: "0.02em", duration: 0.3 });
  });

  contact.addEventListener("mouseleave", () => {
    gsap.to(contact, { letterSpacing: "-0.06em", duration: 0.3 });
  });
}

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

  for (let i = 0; i < pointCount; i += 1) {
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
      if (point.y < -10) point.y = height + 10;

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
   SMOOTH NAVIGATION
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    closeMenu();

    gsap.to(window, {
      duration: 1.1,
      scrollTo: { y: target, offsetY: 0 },
      ease: "power3.inOut",
    });
  });
});

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

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    setupHorizontalWork();
    setupMarquee();
    activePdfRenderer?.();
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

  requestAnimationFrame(() => ScrollTrigger.refresh());
  runPreloader();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
