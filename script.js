gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* =========================================================
TRANSLATIONS
========================================================= */

const copy = {
  en: {
    intro:
      "Recently graduated graphic designer eager to craft identities, visuals and digital worlds; with a soft spot for strange ideas.",

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
    intro:
      "Recién graduada en diseño gráfico deseando crear identidades, visuales y mundos digitales; con debilidad por las ideas extrañas.",

    manifesto: "EL BUEN DISEÑO<br><em>DEBERÍA SENTIRSE</em><br>VIVO.",

    manifestoSide:
      "No decoración. No ruido. Una idea clara, llevada hasta que desarrolla su propio pulso.",

    workLead:
      "Cuatro estudios ficticios. Pensamiento de diseño real. Creados para enseñar cómo paso del concepto al sistema visual.",

    interlude:
      "El portfolio no es un contenedor para el trabajo.<br><em>Es la primera pieza de trabajo.</em>",

    aboutTitle: "Diseñador/a,<br><em>persona curiosa.</em>",

    aboutLead:
      "Trabajo entre la estrategia y el juego: convierto pensamientos sueltos en identidades que la gente puede reconocer, recordar y sentir.",

    aboutText:
      "Mi práctica cruza branding, editorial, digital y motion. Me gusta la tipografía con criterio, los sistemas con espacio para accidentes y los detalles que premian una segunda mirada.",

    contactEyebrow: "¿TIENES UN BUEN BRIEF?",

    contactText:
      "Disponible para puestos junior, prácticas y proyectos freelance seleccionados.",
  },
};

let lang = localStorage.getItem("EMMA-lang") || "en";
let theme = localStorage.getItem("EMMA-theme") || "light";

function applySettings() {
  document.documentElement.lang = lang;
  document.documentElement.dataset.theme = theme;

  localStorage.setItem("EMMA-lang", lang);
  localStorage.setItem("EMMA-theme", theme);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.innerHTML = copy[lang][element.dataset.i18n];
  });
}

applySettings();

/* =========================================================
   PRELOADER — GITHUB PAGES SAFE
   ========================================================= */

const loader = document.querySelector(".preloader");

function startPortfolio() {
  /*
       Evita ejecutar la intro dos veces.
     */
  if (window.__portfolioStarted) return;

  window.__portfolioStarted = true;

  if (loader && loader.isConnected) {
    gsap.killTweensOf(loader);
    gsap.killTweensOf(".pre-core > *");
    gsap.killTweensOf(".pre-bar i");

    gsap.to(".pre-core > *", {
      y: -30,
      opacity: 0,
      stagger: 0.04,
      duration: 0.35,
      ease: "power2.in",
    });

    gsap.to(loader, {
      yPercent: -100,
      duration: 0.75,
      delay: 0.15,
      ease: "expo.inOut",

      onComplete: () => {
        if (loader.isConnected) {
          loader.remove();
        }

        try {
          sessionStorage.setItem("EMMA-loader", "1");
        } catch (error) {
          console.warn("SessionStorage unavailable:", error);
        }

        introAnimation();
      },
    });
  } else {
    introAnimation();
  }
}

/*
   =========================================================
   FAILSAFE
   
   Si algo de otro bloque del JS falla, el portfolio
   NO puede quedarse permanentemente detrás del loader.
   
   Después de 4 segundos lo retiramos igualmente.
   =========================================================
   */

const loaderFailsafe = setTimeout(() => {
  console.warn("Portfolio loader failsafe triggered.");

  if (loader && loader.isConnected) {
    gsap.killTweensOf(loader);

    gsap.set(loader, {
      yPercent: -100,
    });

    loader.remove();
  }

  if (!window.__portfolioStarted) {
    window.__portfolioStarted = true;

    introAnimation();
  }
}, 4000);

/*
   =========================================================
   FIRST VISIT
   =========================================================
   */

let hasSeenLoader = false;

try {
  hasSeenLoader = sessionStorage.getItem("EMMA-loader") === "1";
} catch (error) {
  hasSeenLoader = false;
}

/*
   =========================================================
   RETURNING VISITOR
   =========================================================
   */

if (hasSeenLoader) {
  clearTimeout(loaderFailsafe);

  if (loader && loader.isConnected) {
    loader.remove();
  }

  introAnimation();

  /*
   =========================================================
   FIRST VISIT
   =========================================================
   */
} else {
  const counter = {
    v: 0,
  };

  /*
     NUMBER
     */

  gsap.to(counter, {
    v: 100,

    duration: 1.7,

    ease: "power3.inOut",

    onUpdate: () => {
      const number = document.querySelector(".pre-num");

      if (!number) return;

      number.textContent = String(Math.round(counter.v)).padStart(2, "0");
    },
  });

  /*
     BAR
     */

  gsap.to(".pre-bar i", {
    width: "100%",

    duration: 1.7,

    ease: "power3.inOut",
  });

  /*
     EXIT
     */

  gsap.delayedCall(1.8, () => {
    clearTimeout(loaderFailsafe);

    startPortfolio();
  });
}

/* =========================================================
HERO INTRO
========================================================= */

function introAnimation() {
  gsap.from(".meta", {
    opacity: 0,
    y: 20,
    duration: 0.8,
  });

  gsap.from(".hero-title span", {
    yPercent: 120,
    stagger: 0.12,
    duration: 1.25,
    ease: "power4.out",
    delay: 0.1,
  });

  gsap.from(".hero-foot", {
    opacity: 0,
    y: 25,
    duration: 0.8,
    delay: 0.55,
  });

  gsap.from(".orbit", {
    scale: 0,
    rotation: -80,
    duration: 1.2,
    ease: "elastic.out(1,.65)",
    delay: 0.4,
  });

  setupScrollAnimations();
}

/* =========================================================
GENERATIVE CANVAS
========================================================= */

const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

let W;
let H;

let points = [];

const mouse = {
  x: 0,
  y: 0,
};

function resizeCanvas() {
  W = canvas.width = innerWidth * devicePixelRatio;
  H = canvas.height = innerHeight * devicePixelRatio;

  canvas.style.width = innerWidth + "px";
  canvas.style.height = innerHeight + "px";

  points = Array.from(
    {
      length: 75,
    },
    () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.2 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.2 * devicePixelRatio,
      r: Math.random() * 1.5 * devicePixelRatio,
    })
  );
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX * devicePixelRatio;
  mouse.y = event.clientY * devicePixelRatio;
});

function animateField() {
  ctx.clearRect(0, 0, W, H);

  ctx.fillStyle =
    theme === "dark" ? "rgba(240,238,231,.25)" : "rgba(16,16,16,.20)";

  points.forEach((point) => {
    const dx = mouse.x - point.x;
    const dy = mouse.y - point.y;

    const distance = Math.hypot(dx, dy);

    if (distance > 0 && distance < 220 * devicePixelRatio) {
      point.x -= (dx / distance) * (220 * devicePixelRatio - distance) * 0.0006;

      point.y -= (dy / distance) * (220 * devicePixelRatio - distance) * 0.0006;
    }

    point.x += point.vx;
    point.y += point.vy;

    if (point.x < 0 || point.x > W) {
      point.vx *= -1;
    }

    if (point.y < 0 || point.y > H) {
      point.vy *= -1;
    }

    ctx.beginPath();

    ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);

    ctx.fill();
  });

  requestAnimationFrame(animateField);
}

animateField();

/* =========================================================
SCROLL ANIMATIONS
========================================================= */

function setupScrollAnimations() {
  gsap.utils
    .toArray(
      ".section-label, .manifesto h2, .manifesto-side, .work-intro, .interlude p, .about-grid, .contact-core"
    )
    .forEach((element) => {
      gsap.from(element, {
        y: 65,
        opacity: 0,
        duration: 1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true,
        },
      });
    });

  /* =======================================================
HORIZONTAL PROJECT SHOWCASE
======================================================= */

  const track = document.querySelector(".project-track");

  const distance = () => Math.max(0, track.scrollWidth - innerWidth + 50);

  gsap.to(track, {
    x: () => -distance(),

    ease: "none",

    scrollTrigger: {
      trigger: ".work",

      start: "top top",

      end: () => "+=" + Math.max(600, distance() * 1.15),

      pin: true,

      scrub: 1.1,

      invalidateOnRefresh: true,

      onUpdate: (self) => {
        gsap.set(".progress i", {
          scaleX: self.progress,
        });
      },
    },
  });

  /* =======================================================
HERO PARALLAX
======================================================= */

  gsap.to(".hero-title", {
    y: -80,

    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(".orbit", {
    y: 220,
    rotation: 130,

    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    },
  });
}

/* =========================================================
CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");
const cursorLabel = document.querySelector(".cursor-label");

window.addEventListener("mousemove", (event) => {
  gsap.to(cursor, {
    x: event.clientX,
    y: event.clientY,
    duration: 0.12,
    ease: "power3.out",
  });

  gsap.to(cursorLabel, {
    x: event.clientX,
    y: event.clientY,
    duration: 0.2,
    ease: "power3.out",
  });
});

/* =========================================================
MAGNETIC ELEMENTS
========================================================= */

document.querySelectorAll(".magnetic").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      scale: 2.2,
      duration: 0.25,
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      scale: 1,
      duration: 0.25,
    });

    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1,.35)",
    });
  });

  element.addEventListener("mousemove", (event) => {
    const rect = element.getBoundingClientRect();

    gsap.to(element, {
      x: (event.clientX - rect.left - rect.width / 2) * 0.15,

      y: (event.clientY - rect.top - rect.height / 2) * 0.15,

      duration: 0.35,
    });
  });
});

/* =========================================================
PROJECT HOVER
========================================================= */

document.querySelectorAll(".project").forEach((project) => {
  project.addEventListener("mouseenter", () => {
    gsap.to(cursorLabel, {
      opacity: 1,
    });
  });

  project.addEventListener("mouseleave", () => {
    gsap.to(cursorLabel, {
      opacity: 0,
    });
  });
});

/* =========================================================
THEME
========================================================= */

document.getElementById("theme").onclick = () => {
  theme = theme === "dark" ? "light" : "dark";

  applySettings();
};

/* =========================================================
LANGUAGE
========================================================= */

document.getElementById("lang").onclick = () => {
  lang = lang === "en" ? "es" : "en";

  applySettings();
};

/* =========================================================
MENU
========================================================= */

const menuButton = document.getElementById("menu");
const menuLayer = document.getElementById("menuLayer");
const menuClose = document.getElementById("menuClose");

let menuOpen = false;

function openMenu() {
  if (menuOpen) return;

  menuOpen = true;

  menuLayer.classList.add("is-open");
  menuLayer.setAttribute("aria-hidden", "false");
  menuButton.setAttribute("aria-expanded", "true");

  document.body.style.overflow = "hidden";

  gsap.killTweensOf(menuLayer);

  gsap.fromTo(
    menuLayer,

    {
      clipPath: "inset(0 0 100% 0)",
    },

    {
      clipPath: "inset(0)",
      duration: 0.75,
      ease: "power4.inOut",
    }
  );

  gsap.fromTo(
    ".menu-links a",

    {
      y: 100,
      opacity: 0,
    },

    {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.65,
      ease: "power4.out",
      delay: 0.2,
    }
  );
}

function closeMenu() {
  if (!menuOpen) return;

  menuOpen = false;

  menuButton.setAttribute("aria-expanded", "false");

  gsap.to(menuLayer, {
    clipPath: "inset(0 0 100% 0)",
    duration: 0.55,
    ease: "power4.inOut",

    onComplete: () => {
      menuLayer.classList.remove("is-open");
      menuLayer.setAttribute("aria-hidden", "true");

      document.body.style.overflow = "";
    },
  });
}

menuButton.addEventListener("click", () => {
  if (menuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

menuClose.addEventListener("click", closeMenu);

/* =========================================================
MENU NAVIGATION
========================================================= */

document.querySelectorAll(".menu-links a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const selector = link.getAttribute("href");
    const target = document.querySelector(selector);

    if (!target) return;

    event.preventDefault();

    closeMenu();

    /*
  Esperamos a que termine la salida del menú antes
  de desplazar la página.
*/

    gsap.delayedCall(0.5, () => {
      gsap.to(window, {
        scrollTo: {
          y: target,
          autoKill: true,
        },

        duration: 1.1,

        ease: "power3.inOut",
      });
    });
  });
});

/* =========================================================
LOGO NAVIGATION
========================================================= */

document
  .querySelector('.logo[href="#home"]')
  ?.addEventListener("click", (event) => {
    const target = document.querySelector("#home");

    if (!target) return;

    event.preventDefault();

    if (menuOpen) {
      closeMenu();
    }

    gsap.to(window, {
      scrollTo: {
        y: target,
        autoKill: true,
      },

      duration: 1.1,

      ease: "power3.inOut",
    });
  });

/* =========================================================
PROJECT DATA
========================================================= */

const projects = [
  {
    cat: "EDITORIAL / ART DIRECTION",

    title: "HALFWAY",

    text: "An editorial project exploring fashion, culture and visual rhythm through a tactile magazine system designed as a complete reading experience.",

    tags: ["Editorial", "Art Direction", "Typography", "Publication"],

    magazine: true,
  },

  {
    cat: "MOTION / CAMPAIGN",

    title: "24 FRAMES",

    text: "A kinetic campaign where typography behaves like moving image and every frame can become a poster.",

    tags: ["Motion", "Campaign", "After Effects"],
  },

  {
    cat: "EDITORIAL / PACKAGING",

    title: "ODD OBJECTS",

    text: "An editorial language for a fictional objects shop obsessed with useful things that look slightly strange.",

    tags: ["Editorial", "Packaging", "Concept"],
  },

  {
    cat: "DIGITAL / ART DIRECTION",

    title: "STATIC FM",

    text: "A digital identity for an independent radio platform built around signal, noise and late-night listening.",

    tags: ["Digital", "Web", "Direction"],
  },
];

/* =========================================================
   PDF / MAGAZINE VIEWER — HALFWAY
   ========================================================= */

/*
   HALFway PDF
   ---------------------------------------------------------
   File:
   assets/halfway-MAG.pdf

   Magazine structure:

   PAGE 01           = FRONT COVER
   PAGE 02 + 03      = SPREAD
   PAGE 04 + 05      = SPREAD
   PAGE 06 + 07      = SPREAD
   ...
   LAST PAGE         = BACK COVER

   The viewer:
   - never creates horizontal overflow
   - adapts to the available space
   - renders only the current spread
   - supports arrows
   - supports mouse/touch dragging
   - keeps the PDF fixed
*/

let pdfjsLib = null;

let magazinePDF = null;

let magazineSpreadIndex = 0;

let magazineRendering = false;

let magazineDragging = false;

let magazinePointerId = null;

let magazineDragStart = 0;

let magazineDragCurrent = 0;

/* =========================================================
   LOAD PDF.JS
   ========================================================= */

async function loadPDFJS() {
  if (pdfjsLib) {
    return pdfjsLib;
  }

  try {
    pdfjsLib = await import(
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs"
    );

    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";

    return pdfjsLib;
  } catch (error) {
    console.error("PDF.js could not be loaded.", error);

    return null;
  }
}

/* =========================================================
   CREATE MAGAZINE SPREAD MAP
   ========================================================= */

/*
   Example for a 10-page PDF:

   spread 0:
   [1]

   spread 1:
   [2, 3]

   spread 2:
   [4, 5]

   spread 3:
   [6, 7]

   spread 4:
   [8, 9]

   spread 5:
   [10]


   This means the first and last pages
   are ALWAYS displayed individually.
*/

function getMagazineSpreads(totalPages) {
  const spreads = [];

  if (!totalPages || totalPages < 1) {
    return spreads;
  }

  /* -----------------------------------------------
     FRONT COVER
     ----------------------------------------------- */

  spreads.push({
    type: "single",

    pages: [1],
  });

  /* -----------------------------------------------
     INNER PAGES
     ----------------------------------------------- */

  let page = 2;

  while (page < totalPages) {
    /*
       If only the final page remains,
       stop here because it is the back cover.
    */

    if (page + 1 >= totalPages) {
      break;
    }

    spreads.push({
      type: "double",

      pages: [page, page + 1],
    });

    page += 2;
  }

  /* -----------------------------------------------
     BACK COVER
     ----------------------------------------------- */

  if (totalPages > 1) {
    spreads.push({
      type: "single",

      pages: [totalPages],
    });
  }

  return spreads;
}

/* =========================================================
   GET CURRENT SPREAD
   ========================================================= */

function getCurrentMagazineSpread() {
  if (!magazinePDF) {
    return null;
  }

  const spreads = getMagazineSpreads(magazinePDF.numPages);

  return spreads[magazineSpreadIndex];
}

/* =========================================================
   GET VIEWER ELEMENTS
   ========================================================= */

function getMagazineViewer() {
  return document.querySelector(".magazine-viewer");
}

function getMagazineStage() {
  return document.querySelector(".magazine-stage");
}

function getMagazineCounter() {
  return document.querySelector(".magazine-counter");
}

/* =========================================================
   UPDATE COUNTER
   ========================================================= */

function updateMagazineCounter() {
  const counter = getMagazineCounter();

  if (!counter || !magazinePDF) {
    return;
  }

  const spread = getCurrentMagazineSpread();

  if (!spread) {
    return;
  }

  if (spread.type === "single") {
    counter.textContent = String(spread.pages[0]).padStart(2, "0");

    return;
  }

  counter.textContent = `${String(spread.pages[0]).padStart(2, "0")}—${String(
    spread.pages[1]
  ).padStart(2, "0")}`;
}

/* =========================================================
   UPDATE BUTTONS
   ========================================================= */

function updateMagazineControls() {
  const previous = document.querySelector("[data-magazine-prev]");

  const next = document.querySelector("[data-magazine-next]");

  if (!previous || !next || !magazinePDF) {
    return;
  }

  const spreads = getMagazineSpreads(magazinePDF.numPages);

  previous.disabled = magazineSpreadIndex <= 0;

  next.disabled = magazineSpreadIndex >= spreads.length - 1;

  updateMagazineCounter();
}

/* =========================================================
   CREATE MAGAZINE VIEWER
   ========================================================= */

function createMagazineViewer() {
  const wrapper = document.createElement("div");

  wrapper.className = "magazine-viewer";

  wrapper.innerHTML = `

    <div class="magazine-loading">
      LOADING MAGAZINE…
    </div>

    <div class="magazine-stage">

      <div class="magazine-empty">

        <strong>HALFWAY</strong>

        <span>
          LOADING MAGAZINE
        </span>

      </div>

    </div>

    <div class="magazine-controls">

      <div class="magazine-controls-left">

        <button
          class="magazine-button magnetic"
          type="button"
          data-magazine-prev
          aria-label="Previous page"
        >
          ←
        </button>

        <span class="magazine-counter">
          01
        </span>

        <button
          class="magazine-button magnetic"
          type="button"
          data-magazine-next
          aria-label="Next page"
        >
          →
        </button>

      </div>

    </div>

    <div class="magazine-hint">
      DRAG / SWIPE TO TURN THE PAGE
    </div>

  `;

  return wrapper;
}

/* =========================================================
   RENDER ONE PDF PAGE
   ========================================================= */

async function renderMagazinePage(pageNumber, availableWidth, availableHeight) {
  const pdfPage = await magazinePDF.getPage(pageNumber);

  const baseViewport = pdfPage.getViewport({
    scale: 1,
  });

  /*
     Keep the PDF completely inside
     the available area.

     This is what prevents horizontal
     scrolling.
  */

  const scale = Math.min(
    availableWidth / baseViewport.width,

    availableHeight / baseViewport.height
  );

  const viewport = pdfPage.getViewport({
    scale: Math.max(scale, 0.05),
  });

  const canvas = document.createElement("canvas");

  const context = canvas.getContext("2d", {
    alpha: false,
  });

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(viewport.width * pixelRatio);

  canvas.height = Math.floor(viewport.height * pixelRatio);

  canvas.style.width = `${viewport.width}px`;

  canvas.style.height = `${viewport.height}px`;

  canvas.className = "magazine-page";

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  await pdfPage.render({
    canvasContext: context,

    viewport: viewport,
  }).promise;

  return canvas;
}

/* =========================================================
   RENDER CURRENT SPREAD
   ========================================================= */

async function renderMagazineSpread(direction = 1, animate = true) {
  if (!magazinePDF || magazineRendering) {
    return;
  }

  const stage = getMagazineStage();

  if (!stage) {
    return;
  }

  const spread = getCurrentMagazineSpread();

  if (!spread) {
    return;
  }

  magazineRendering = true;

  try {
    /*
       Force the stage to use its actual
       available dimensions.

       No viewport-wide calculations here.
    */

    const stageWidth = stage.clientWidth;

    const stageHeight = stage.clientHeight;

    /*
       A double spread gives each page
       half of the available width.
    */

    const pageWidth = spread.type === "double" ? stageWidth / 2 : stageWidth;

    const pages = await Promise.all(
      spread.pages.map((pageNumber) =>
        renderMagazinePage(pageNumber, pageWidth, stageHeight)
      )
    );

    /*
       New spread
    */

    const newSpread = document.createElement("div");

    newSpread.className =
      "magazine-spread " +
      (spread.type === "double" ? "is-double" : "is-single");

    pages.forEach((canvas, index) => {
      if (spread.type === "double") {
        if (index === 0) {
          canvas.classList.add("magazine-page-left");
        } else {
          canvas.classList.add("magazine-page-right");
        }
      }

      newSpread.appendChild(canvas);
    });

    /*
       Add centre gutter only
       to double spreads.
    */

    if (spread.type === "double") {
      const gutter = document.createElement("div");

      gutter.className = "magazine-gutter";

      newSpread.appendChild(gutter);
    }

    /*
       Previous spread
    */

    const oldSpread = stage.querySelector(".magazine-spread");

    stage.appendChild(newSpread);

    /*
       Initial animation state
    */

    if (animate) {
      gsap.set(newSpread, {
        opacity: 0,

        x: direction > 0 ? 60 : -60,

        rotationY: direction > 0 ? -4 : 4,
      });
    } else {
      gsap.set(newSpread, {
        opacity: 1,

        x: 0,

        rotationY: 0,
      });
    }

    /*
       Remove old spread
    */

    if (oldSpread) {
      if (animate) {
        gsap.to(oldSpread, {
          opacity: 0,

          x: direction > 0 ? -60 : 60,

          rotationY: direction > 0 ? 4 : -4,

          duration: 0.32,

          ease: "power2.in",

          onComplete: () => {
            oldSpread.remove();
          },
        });
      } else {
        oldSpread.remove();
      }
    }

    /*
       Animate new spread
    */

    if (animate) {
      await new Promise((resolve) => {
        gsap.to(newSpread, {
          opacity: 1,

          x: 0,

          rotationY: 0,

          duration: 0.5,

          ease: "power3.out",

          onComplete: resolve,
        });
      });
    }

    updateMagazineControls();
  } catch (error) {
    console.error("Could not render magazine spread.", error);
  } finally {
    magazineRendering = false;
  }
}

/* =========================================================
   LOAD FIXED HALFway PDF
   ========================================================= */

async function loadMagazinePDF() {
  const library = await loadPDFJS();

  if (!library) {
    return;
  }

  const viewer = getMagazineViewer();

  const loading = viewer?.querySelector(".magazine-loading");

  loading?.classList.remove("is-hidden");

  try {
    /*
       IMPORTANT:

       This is the ONLY PDF loaded.

       File:
       assets/halfway-MAG.pdf
    */

    const loadingTask = library.getDocument("assets/halfway-MAG.pdf");

    magazinePDF = await loadingTask.promise;

    magazineSpreadIndex = 0;

    await renderMagazineSpread(1, false);
  } catch (error) {
    console.error("Could not load Halfway magazine.", error);

    const stage = getMagazineStage();

    if (stage) {
      stage.innerHTML = `

        <div class="magazine-empty">

          <strong>PDF ERROR</strong>

          <span>
            CHECK THAT
            assets/halfway-MAG.pdf
            EXISTS
          </span>

        </div>

      `;
    }
  } finally {
    loading?.classList.add("is-hidden");
  }
}

/* =========================================================
   NEXT SPREAD
   ========================================================= */

async function nextMagazinePage() {
  if (!magazinePDF || magazineRendering) {
    return;
  }

  const spreads = getMagazineSpreads(magazinePDF.numPages);

  if (magazineSpreadIndex >= spreads.length - 1) {
    return;
  }

  magazineSpreadIndex++;

  await renderMagazineSpread(1, true);
}

/* =========================================================
   PREVIOUS SPREAD
   ========================================================= */

async function previousMagazinePage() {
  if (!magazinePDF || magazineRendering) {
    return;
  }

  if (magazineSpreadIndex <= 0) {
    return;
  }

  magazineSpreadIndex--;

  await renderMagazineSpread(-1, true);
}

/* =========================================================
   DRAG / SWIPE
   ========================================================= */

function setupMagazineDrag() {
  const stage = getMagazineStage();

  if (!stage) {
    return;
  }

  /*
     Prevent browser gestures from
     fighting with our page drag.
  */

  stage.style.touchAction = "pan-y";

  stage.addEventListener("pointerdown", (event) => {
    if (!magazinePDF || magazineRendering) {
      return;
    }

    magazineDragging = true;

    magazinePointerId = event.pointerId;

    magazineDragStart = event.clientX;

    magazineDragCurrent = event.clientX;

    try {
      stage.setPointerCapture(event.pointerId);
    } catch (error) {
      /* no-op */
    }
  });

  stage.addEventListener("pointermove", (event) => {
    if (!magazineDragging || event.pointerId !== magazinePointerId) {
      return;
    }

    magazineDragCurrent = event.clientX;

    const delta = magazineDragCurrent - magazineDragStart;

    const spread = stage.querySelector(".magazine-spread");

    if (!spread) {
      return;
    }

    /*
         Only a subtle movement while dragging.
         This keeps the viewer smooth.
      */

    gsap.set(spread, {
      x: delta * 0.22,

      rotationY: delta * -0.008,

      scale: 0.99,
    });
  });

  async function finishDrag() {
    if (!magazineDragging) {
      return;
    }

    magazineDragging = false;

    const delta = magazineDragCurrent - magazineDragStart;

    const spread = stage.querySelector(".magazine-spread");

    /*
       Return the current spread
       if the gesture wasn't long enough.
    */

    if (spread) {
      gsap.to(spread, {
        x: 0,

        rotationY: 0,

        scale: 1,

        duration: 0.28,

        ease: "power3.out",
      });
    }

    /*
       Swipe threshold
    */

    const threshold = Math.min(120, window.innerWidth * 0.16);

    if (Math.abs(delta) >= threshold) {
      if (delta < 0) {
        await nextMagazinePage();
      } else {
        await previousMagazinePage();
      }
    }

    magazinePointerId = null;
  }

  stage.addEventListener("pointerup", finishDrag);

  stage.addEventListener("pointercancel", finishDrag);

  stage.addEventListener("lostpointercapture", finishDrag);
}

/* =========================================================
   MAGAZINE CONTROLS
   ========================================================= */

function setupMagazineControls() {
  const previous = document.querySelector("[data-magazine-prev]");

  const next = document.querySelector("[data-magazine-next]");

  previous?.addEventListener("click", previousMagazinePage);

  next?.addEventListener("click", nextMagazinePage);

  setupMagazineDrag();
}

/* =========================================================
   RESIZE
   ========================================================= */

/*
   We don't render on every resize event.

   Instead we wait until the user has
   stopped resizing.

   This prevents PDF.js from being asked
   to render dozens of canvases per second.
*/

let magazineResizeTimer = null;

window.addEventListener("resize", () => {
  if (!magazinePDF || !getMagazineStage()) {
    return;
  }

  clearTimeout(magazineResizeTimer);

  magazineResizeTimer = setTimeout(async () => {
    if (magazineRendering) {
      return;
    }

    /*
             Re-render the current spread
             without animation.
          */

    await renderMagazineSpread(1, false);
  }, 250);
});

/* =========================================================
   INITIALISE MAGAZINE
   ========================================================= */

async function initMagazine() {
  setupMagazineControls();

  await loadMagazinePDF();
}
/* =========================================================
PROJECT MODAL
========================================================= */

document.querySelectorAll(".project").forEach((project, index) => {
  project.addEventListener("click", async () => {
    const data = projects[index];

    const visual = document.getElementById("modalVisual");

    document.querySelector(".modal-index").textContent = String(
      index + 1
    ).padStart(2, "0");

    document.getElementById("modalCat").textContent = data.cat;

    document.getElementById("modalTitle").textContent = data.title;

    document.getElementById("modalText").textContent = data.text;

    document.getElementById("modalTags").innerHTML = data.tags
      .map((tag) => `<span>${tag}</span>`)
      .join("");

    /*
      PROJECT 01 = MAGAZINE
    */

    if (data.magazine) {
      visual.innerHTML = "";

      const viewer = createMagazineViewer();

      visual.appendChild(viewer);

      setupMagazineControls();

      await loadMagazinePDF();
    } else {
      visual.className = project.querySelector(".art").className;

      visual.innerHTML = project.querySelector(".art").innerHTML;
    }

    const modal = document.getElementById("modal");

    modal.style.display = "block";

    document.body.style.overflow = "hidden";

    gsap.fromTo(
      modal,
      {
        clipPath: "inset(0 0 100% 0)",
      },
      {
        clipPath: "inset(0)",
        duration: 0.8,
        ease: "power4.inOut",
      }
    );

    gsap.from(".modal-copy > *", {
      y: 30,
      opacity: 0,
      stagger: 0.07,
      duration: 0.55,
      delay: 0.25,
    });

    /*
      Only the magazine needs the PDF after
      the DOM has been inserted.
    */

    if (data.magazine) {
      await loadDefaultMagazine();
    }
  });
});

/* =========================================================
CLOSE MODAL
========================================================= */

function closeModal() {
  gsap.to("#modal", {
    clipPath: "inset(0 0 100% 0)",

    duration: 0.6,

    onComplete: () => {
      document.getElementById("modal").style.display = "none";

      document.body.style.overflow = "";
    },
  });
}

document.getElementById("closeModal").addEventListener("click", closeModal);

/* =========================================================
ESCAPE
========================================================= */

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  const modal = document.getElementById("modal");

  if (modal.style.display === "block") {
    closeModal();

    return;
  }

  if (menuOpen) {
    closeMenu();
  }
});

/* =========================================================
CONTACT
========================================================= */

const contactLink = document.querySelector(".contact-link");

if (contactLink) {
  contactLink.addEventListener("click", () => {
    /*
We deliberately keep the native mailto behaviour.
The visible email below it means the visitor can
also copy it manually if their mail client does
not open correctly.
*/
  });
}

/* =========================================================
TOOLS — GSAP INFINITE MARQUEE
========================================================= */

function setupToolsMarquee() {
  const track = document.querySelector(".marquee-track");

  if (!track) return;

  const items = Array.from(track.children);

  if (items.length < 2) {
    return;
  }

  /*
The HTML already contains two identical
sets of tools.


We calculate the width of the first set
and move exactly that amount.


*/

  const firstSetWidth = items.slice(0, items.length / 2).reduce(
    (total, element) => total + element.getBoundingClientRect().width,

    0
  );

  const marquee = gsap.to(track, {
    x: -firstSetWidth,

    duration: firstSetWidth / 55,

    ease: "none",

    repeat: -1,
  });

  /*
Pause while hovering.
*/

  track.parentElement.addEventListener("mouseenter", () => {
    marquee.timeScale(0.25);
  });

  track.parentElement.addEventListener("mouseleave", () => {
    marquee.timeScale(1);
  });

  /*
Recalculate after resizing.
*/

  window.addEventListener("resize", () => {
    const updatedWidth = Array.from(track.children)
      .slice(0, track.children.length / 2)
      .reduce(
        (total, element) => total + element.getBoundingClientRect().width,

        0
      );

    gsap.set(track, {
      x: gsap.getProperty(track, "x") % updatedWidth,
    });
  });
}

setupToolsMarquee();

/* =========================================================
GLOBAL HASH LINKS
========================================================= */

/*
IMPORTANT:
We don't use .onclick here anymore.

This prevents the old bug where the global smooth-scroll
handler overwrote the menu's close handler.
*/

document
  .querySelectorAll('a[href^="#"]:not(.menu-links a):not(.logo)')
  .forEach((link) => {
    link.addEventListener("click", (event) => {
      const selector = link.getAttribute("href");

      const target = document.querySelector(selector);

      if (!target) {
        return;
      }

      event.preventDefault();

      gsap.to(window, {
        scrollTo: {
          y: target,
          autoKill: true,
        },

        duration: 1.1,

        ease: "power3.inOut",
      });
    });
  });

/* =========================================================
REFRESH SCROLLTRIGGER AFTER LOAD
========================================================= */

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
