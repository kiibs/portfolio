/* =========================================================
   EMMA PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

/* =========================================================
   SAFETY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /* =======================================================
     STATE
  ======================================================= */

  let lang = localStorage.getItem("EMMA-lang") || "en";

  let theme = localStorage.getItem("EMMA-theme") || "light";

  let menuOpen = false;

  let currentProject = null;

  let pdfDocument = null;

  let pdfPage = 1;

  let pdfTotalPages = 0;

  let pdfRendering = false;

  /* =======================================================
     TRANSLATIONS
  ======================================================= */

  const copy = {
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
        "Diseñadora gráfica recién graduada interesada en crear identidades visuales, campañas y mundos digitales, con debilidad por las ideas extrañas.",

      manifesto: "EL BUEN DISEÑO<br><em>DEBERÍA SENTIRSE</em><br>VIVO.",

      manifestoSide:
        "No decoración. No ruido. Una idea clara, llevada hasta desarrollar su propio pulso.",

      workLead:
        "Cuatro estudios ficticios. Pensamiento de diseño real. Proyectos construidos para mostrar cómo paso del concepto al sistema visual.",

      interlude:
        "El portfolio no es un contenedor para el trabajo.<br><em>Es la primera pieza de trabajo.</em>",

      aboutTitle: "Diseñadora,<br><em>persona curiosa.</em>",

      aboutLead:
        "Trabajo en algún punto entre la estrategia y el juego: convierto ideas sueltas en identidades que la gente puede reconocer, recordar y sentir.",

      aboutText:
        "Mi práctica se mueve entre branding, editorial, digital y motion. Me interesa la tipografía con personalidad, los sistemas con espacio para accidentes y los detalles que recompensan una segunda mirada.",

      contactEyebrow: "¿TIENES UN BUEN BRIEF?",

      contactText:
        "Disponible para puestos junior, prácticas y proyectos freelance seleccionados.",
    },
  };

  /* =======================================================
     PROJECT DATA
  ======================================================= */

  const projects = [
    {
      cat: "EDITORIAL / ART DIRECTION",

      title: "HALFWAY",

      text: {
        en: "An editorial project exploring fashion, culture and visual rhythm through a tactile magazine system designed as a complete reading experience.",

        es: "Un proyecto editorial que explora la moda, la cultura y el ritmo visual mediante un sistema de revista táctil concebido como una experiencia de lectura completa.",
      },

      tags: ["Editorial", "Art Direction", "Typography", "Publication"],

      magazine: true,
    },

    {
      cat: "MOTION / CAMPAIGN",

      title: "24 FRAMES",

      text: {
        en: "A motion study built around rhythm, repetition and the expressive potential of a restricted visual system.",

        es: "Un estudio de motion construido alrededor del ritmo, la repetición y el potencial expresivo de un sistema visual limitado.",
      },

      tags: ["Motion", "Campaign", "Art Direction"],
    },

    {
      cat: "EDITORIAL / PACKAGING",

      title: "ODD OBJECTS",

      text: {
        en: "An experimental editorial and packaging system giving everyday objects a strange visual personality.",

        es: "Un sistema editorial y de packaging experimental que dota a objetos cotidianos de una personalidad visual extraña.",
      },

      tags: ["Editorial", "Packaging", "Concept"],
    },

    {
      cat: "DIGITAL / ART DIRECTION",

      title: "STATIC FM",

      text: {
        en: "A digital art direction experiment exploring noise, radio culture and visual interference.",

        es: "Un experimento de dirección de arte digital que explora el ruido, la cultura radiofónica y la interferencia visual.",
      },

      tags: ["Digital", "Art Direction", "Visual Identity"],
    },
  ];

  /* =======================================================
     SETTINGS
  ======================================================= */

  function applySettings() {
    document.documentElement.lang = lang;

    document.documentElement.dataset.theme = theme;

    localStorage.setItem("EMMA-lang", lang);

    localStorage.setItem("EMMA-theme", theme);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = copy[lang]?.[element.dataset.i18n];

      if (value !== undefined) {
        element.innerHTML = value;
      }
    });

    document.querySelectorAll("[data-lang]").forEach((element) => {
      element.classList.toggle("is-active", element.dataset.lang === lang);
    });
  }

  /* =======================================================
     LANGUAGE
  ======================================================= */

  const langButton = document.getElementById("lang");

  langButton?.addEventListener("click", () => {
    lang = lang === "en" ? "es" : "en";

    applySettings();
  });

  /* =======================================================
     THEME
  ======================================================= */

  const themeButton = document.getElementById("theme");

  themeButton?.addEventListener("click", () => {
    theme = theme === "light" ? "dark" : "light";

    applySettings();
  });

  /* =======================================================
     MENU
  ======================================================= */

  const menuButton = document.getElementById("menu");

  const menuLayer = document.getElementById("menuLayer");

  const menuClose = document.getElementById("menuClose");

  function openMenu() {
    if (menuOpen) {
      return;
    }

    menuOpen = true;

    document.body.classList.add("menu-open");

    menuButton?.setAttribute("aria-expanded", "true");

    menuLayer?.setAttribute("aria-hidden", "false");

    gsap.killTweensOf(menuLayer);

    gsap.set(menuLayer, {
      visibility: "visible",
      pointerEvents: "auto",
      clipPath: "inset(0 0 100% 0)",
    });

    gsap.to(menuLayer, {
      clipPath: "inset(0 0 0% 0)",

      duration: 0.65,

      ease: "power4.inOut",
    });

    gsap.fromTo(
      ".menu-links a",

      {
        y: 80,
        opacity: 0,
      },

      {
        y: 0,
        opacity: 1,

        duration: 0.65,

        stagger: 0.08,

        delay: 0.12,

        ease: "power4.out",
      }
    );
  }

  function closeMenu() {
    if (!menuOpen) {
      return;
    }

    menuOpen = false;

    document.body.classList.remove("menu-open");

    menuButton?.setAttribute("aria-expanded", "false");

    menuLayer?.setAttribute("aria-hidden", "true");

    gsap.killTweensOf(menuLayer);

    gsap.to(menuLayer, {
      clipPath: "inset(0 0 100% 0)",

      duration: 0.55,

      ease: "power4.inOut",

      onComplete: () => {
        if (!menuOpen) {
          menuLayer.style.visibility = "hidden";

          menuLayer.style.pointerEvents = "none";
        }
      },
    });
  }

  menuButton?.addEventListener("click", () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuClose?.addEventListener("click", closeMenu);

  document.querySelectorAll(".menu-links a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      closeMenu();

      gsap.delayedCall(0.58, () => {
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

  /* =======================================================
     MARQUEE
  ======================================================= */

  function setupToolsMarquee() {
    const track = document.querySelector(".marquee-track");

    if (!track) {
      return;
    }

    if (track._marqueeTween) {
      track._marqueeTween.kill();

      track._marqueeTween = null;
    }

    const tools = [
      "ADOBE CC",
      "FIGMA",
      "AFTER EFFECTS",
      "BLENDER",
      "GSAP",
      "CREATIVE CODING",
    ];

    track.innerHTML = "";

    function addSequence() {
      tools.forEach((tool) => {
        const span = document.createElement("span");

        span.textContent = tool;

        track.appendChild(span);
      });
    }

    addSequence();

    while (track.scrollWidth < window.innerWidth * 2.5) {
      addSequence();
    }

    const original = Array.from(track.children);

    original.forEach((item) => {
      track.appendChild(item.cloneNode(true));
    });

    const loopWidth = track.scrollWidth / 2;

    const pixelsPerSecond = 45;

    const duration = loopWidth / pixelsPerSecond;

    gsap.set(track, {
      x: 0,
    });

    track._marqueeTween = gsap.to(track, {
      x: -loopWidth,

      duration,

      ease: "none",

      repeat: -1,
    });
  }

  let marqueeResizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(marqueeResizeTimer);

    marqueeResizeTimer = setTimeout(setupToolsMarquee, 250);
  });

  /* =======================================================
     PDF.JS
  ======================================================= */

  function getPDFLib() {
    if (typeof pdfjsLib !== "undefined") {
      return pdfjsLib;
    }

    return null;
  }

  async function createMagazineViewer() {
    const viewer = document.createElement("div");

    viewer.className = "magazine-viewer";

    viewer.innerHTML = `

      <div class="magazine-stage">

        <div
          class="magazine-loading"
          id="magazineLoading"
        >
          LOADING / HALFWAY
        </div>

        <div
          class="magazine-empty"
          id="magazineEmpty"
        >
          <strong>HALFWAY</strong>
          <span>
            PDF LOADING
          </span>
        </div>

      </div>

      <div class="magazine-controls">

        <div class="magazine-controls-left">

          <button
            class="magazine-button"
            id="magPrev"
            type="button"
            aria-label="Previous page"
          >
            ←
          </button>

          <span
            class="magazine-counter"
            id="magCounter"
          >
            01 / 01
          </span>

          <button
            class="magazine-button"
            id="magNext"
            type="button"
            aria-label="Next page"
          >
            →
          </button>

        </div>

      </div>

    `;

    return viewer;
  }

  function getMagazineStage() {
    return document.querySelector(".magazine-stage");
  }

  async function loadMagazinePDF() {
    const loading = document.getElementById("magazineLoading");

    const empty = document.getElementById("magazineEmpty");

    const pdfLib = getPDFLib();

    if (!pdfLib) {
      console.error("PDF.js was not loaded.");

      if (empty) {
        empty.innerHTML = `
          <strong>PDF ERROR</strong>
          <span>
            PDF.JS COULD NOT BE LOADED
          </span>
        `;
      }

      loading?.classList.add("is-hidden");

      return;
    }

    /*
     * IMPORTANT:
     * This path is case-sensitive on GitHub Pages.
     */

    const pdfPath = "assets/halfway-MAG.pdf";

    try {
      pdfLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.js";

      const loadingTask = pdfLib.getDocument(pdfPath);

      pdfDocument = await loadingTask.promise;

      pdfTotalPages = pdfDocument.numPages;

      pdfPage = 1;

      empty?.remove();

      loading?.classList.add("is-hidden");

      await renderMagazinePage(pdfPage);
    } catch (error) {
      console.error("HALFWAY PDF ERROR:", error);

      if (empty) {
        empty.innerHTML = `

          <strong>
            HALFWAY
          </strong>

          <span>
            PDF COULD NOT BE LOADED
          </span>

          <small>
            Check assets/halfway-MAG.pdf
          </small>

        `;
      }

      loading?.classList.add("is-hidden");
    }
  }

  async function renderMagazinePage(pageNumber) {
    if (!pdfDocument || pdfRendering) {
      return;
    }

    pdfRendering = true;

    try {
      const stage = getMagazineStage();

      if (!stage) {
        return;
      }

      const page = await pdfDocument.getPage(pageNumber);

      /*
       * Render single page.
       * This is deliberately kept simple
       * and reliable instead of trying to
       * render a spread that can overflow.
       */

      const baseViewport = page.getViewport({
        scale: 1,
      });

      const availableWidth = Math.max(stage.clientWidth - 20, 280);

      const availableHeight = Math.max(stage.clientHeight - 20, 350);

      const widthScale = availableWidth / baseViewport.width;

      const heightScale = availableHeight / baseViewport.height;

      const scale = Math.min(widthScale, heightScale, 1.8);

      const viewport = page.getViewport({
        scale,
      });

      const canvas = document.createElement("canvas");

      const context = canvas.getContext("2d", {
        alpha: false,
      });

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.ceil(viewport.width * dpr);

      canvas.height = Math.ceil(viewport.height * dpr);

      canvas.style.width = `${viewport.width}px`;

      canvas.style.height = `${viewport.height}px`;

      canvas.className = "magazine-page";

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      await page.render({
        canvasContext: context,

        viewport,
      }).promise;

      const spread = document.createElement("div");

      spread.className = "magazine-spread";

      spread.appendChild(canvas);

      stage.innerHTML = "";

      stage.appendChild(spread);

      updateMagazineCounter();
    } catch (error) {
      console.error("PDF render error:", error);
    } finally {
      pdfRendering = false;
    }
  }

  function updateMagazineCounter() {
    const counter = document.getElementById("magCounter");

    const prev = document.getElementById("magPrev");

    const next = document.getElementById("magNext");

    if (!counter) {
      return;
    }

    counter.textContent = `${String(pdfPage).padStart(2, "0")} / ${String(
      pdfTotalPages
    ).padStart(2, "0")}`;

    if (prev) {
      prev.disabled = pdfPage <= 1;
    }

    if (next) {
      next.disabled = pdfPage >= pdfTotalPages;
    }
  }

  async function nextMagazinePage() {
    if (!pdfDocument || pdfPage >= pdfTotalPages) {
      return;
    }

    pdfPage++;

    await renderMagazinePage(pdfPage);
  }

  async function previousMagazinePage() {
    if (!pdfDocument || pdfPage <= 1) {
      return;
    }

    pdfPage--;

    await renderMagazinePage(pdfPage);
  }

  function setupMagazineControls() {
    const prev = document.getElementById("magPrev");

    const next = document.getElementById("magNext");

    prev?.addEventListener("click", previousMagazinePage);

    next?.addEventListener("click", nextMagazinePage);

    updateMagazineCounter();
  }

  /* =======================================================
     PROJECT MODALS
  ======================================================= */

  const modal = document.getElementById("modal");

  const modalVisual = document.getElementById("modalVisual");

  const modalCat = document.getElementById("modalCat");

  const modalTitle = document.getElementById("modalTitle");

  const modalText = document.getElementById("modalText");

  const modalTags = document.getElementById("modalTags");

  const modalIndex = document.getElementById("modalIndex");

  async function openProject(index) {
    const data = projects[index];

    if (!data) {
      return;
    }

    currentProject = index;

    modalIndex.textContent = String(index + 1).padStart(2, "0");

    modalCat.textContent = data.cat;

    modalTitle.textContent = data.title;

    const description =
      typeof data.text === "object" ? data.text[lang] : data.text;

    modalText.textContent = description;

    modalTags.innerHTML = data.tags
      .map((tag) => `<span>${tag}</span>`)
      .join("");

    modalVisual.innerHTML = "";

    modal.style.display = "block";

    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    gsap.killTweensOf(modal);

    gsap.set(modal, {
      clipPath: "inset(0 0 100% 0)",
    });

    gsap.to(modal, {
      clipPath: "inset(0 0 0% 0)",

      duration: 0.75,

      ease: "power4.inOut",
    });

    gsap.fromTo(
      ".modal-copy > *",

      {
        y: 30,
        opacity: 0,
      },

      {
        y: 0,
        opacity: 1,

        stagger: 0.07,

        duration: 0.55,

        delay: 0.2,

        ease: "power3.out",
      }
    );

    /*
     * HALFWAY
     */

    if (data.magazine) {
      modalVisual.className = "modal-visual";

      const heading = document.createElement("div");

      heading.className = "halfway-heading";

      heading.innerHTML = `

        <span>
          ${data.cat}
        </span>

        <h2>
          ${data.title}
        </h2>

      `;

      modalVisual.appendChild(heading);

      const viewer = await createMagazineViewer();

      modalVisual.appendChild(viewer);

      /*
       * The modal is already visible.
       * Give the browser two frames
       * before measuring PDF dimensions.
       */

      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      });

      setupMagazineControls();

      await loadMagazinePDF();

      const descriptionBox = document.createElement("div");

      descriptionBox.className = "halfway-description";

      descriptionBox.innerHTML = `

        <p>
          ${description}
        </p>

      `;

      modalVisual.appendChild(descriptionBox);

      return;
    }

    /*
     * OTHER PROJECTS
     */

    const originalProject = document.querySelector(
      `.project[data-id="${index}"]`
    );

    const originalArt = originalProject?.querySelector(".art");

    if (originalArt) {
      modalVisual.className = `modal-visual ${originalArt.className}`;

      modalVisual.innerHTML = originalArt.innerHTML;
    }
  }

  document.querySelectorAll(".project").forEach((project) => {
    project.addEventListener("click", () => {
      const index = Number(project.dataset.id);

      openProject(index);
    });
  });

  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  function closeModal() {
    if (!modal || modal.style.display !== "block") {
      return;
    }

    gsap.killTweensOf(modal);

    gsap.to(modal, {
      clipPath: "inset(0 0 100% 0)",

      duration: 0.55,

      ease: "power4.inOut",

      onComplete: () => {
        modal.style.display = "none";

        modal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");

        modalVisual.innerHTML = "";

        pdfDocument = null;

        pdfPage = 1;

        pdfTotalPages = 0;
      },
    });
  }

  document.getElementById("closeModal")?.addEventListener("click", closeModal);

  /* =======================================================
     KEYBOARD
  ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (modal?.style.display === "block") {
      closeModal();

      return;
    }

    if (menuOpen) {
      closeMenu();
    }
  });

  /* =======================================================
     CLICK OUTSIDE MODAL
  ======================================================= */

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  /* =======================================================
     CUSTOM CURSOR
  ======================================================= */

  const cursor = document.querySelector(".cursor");

  const cursorLabel = document.querySelector(".cursor-label");

  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;

    mouseY = event.clientY;
  });

  function cursorLoop() {
    cursorX += (mouseX - cursorX) * 0.18;

    cursorY += (mouseY - cursorY) * 0.18;

    if (cursor) {
      cursor.style.left = `${cursorX}px`;

      cursor.style.top = `${cursorY}px`;
    }

    if (cursorLabel) {
      cursorLabel.style.left = `${cursorX}px`;

      cursorLabel.style.top = `${cursorY}px`;
    }

    requestAnimationFrame(cursorLoop);
  }

  cursorLoop();

  document.querySelectorAll("a,button,.project").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      gsap.to(cursor, {
        scale: 1.35,
        duration: 0.2,
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
      });
    });
  });

  /* =======================================================
     MAGNETIC ELEMENTS
  ======================================================= */

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("mousemove", (event) => {
      if (window.innerWidth <= 700) {
        return;
      }

      const rect = element.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;

      const y = event.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * 0.18,

        y: y * 0.18,

        duration: 0.3,

        ease: "power2.out",
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        x: 0,
        y: 0,

        duration: 0.5,

        ease: "elastic.out(1,.45)",
      });
    });
  });

  /* =======================================================
     CANVAS
  ======================================================= */

  const canvas = document.getElementById("field");

  const ctx = canvas?.getContext("2d");

  const particles = [];

  const PARTICLE_COUNT = 35;

  function resizeCanvas() {
    if (!canvas || !ctx) {
      return;
    }

    canvas.width = window.innerWidth * window.devicePixelRatio;

    canvas.height = window.innerHeight * window.devicePixelRatio;

    canvas.style.width = `${window.innerWidth}px`;

    canvas.style.height = `${window.innerHeight}px`;

    ctx.setTransform(
      window.devicePixelRatio,
      0,
      0,
      window.devicePixelRatio,
      0,
      0
    );
  }

  function createParticles() {
    particles.length = 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,

        y: Math.random() * window.innerHeight,

        vx: (Math.random() - 0.5) * 0.2,

        vy: (Math.random() - 0.5) * 0.2,

        r: Math.random() * 1.4 + 0.3,
      });
    }
  }

  function drawParticles() {
    if (!canvas || !ctx) {
      return;
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const dark = document.documentElement.dataset.theme === "dark";

    ctx.fillStyle = dark ? "rgba(241,238,230,.18)" : "rgba(16,16,16,.16)";

    particles.forEach((particle) => {
      particle.x += particle.vx;

      particle.y += particle.vy;

      if (particle.x < -20) {
        particle.x = window.innerWidth + 20;
      }

      if (particle.x > window.innerWidth + 20) {
        particle.x = -20;
      }

      if (particle.y < -20) {
        particle.y = window.innerHeight + 20;
      }

      if (particle.y > window.innerHeight + 20) {
        particle.y = -20;
      }

      ctx.beginPath();

      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);

      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  }

  window.addEventListener("resize", () => {
    resizeCanvas();

    createParticles();
  });

  resizeCanvas();

  createParticles();

  drawParticles();

  /* =======================================================
     SCROLL ANIMATIONS
  ======================================================= */

  gsap.utils.toArray("section").forEach((section) => {
    const elements = section.querySelectorAll(
      ".section-label,.work-intro,.manifesto-grid,.about-grid,.contact-core"
    );

    if (!elements.length) {
      return;
    }

    gsap.from(elements, {
      y: 35,

      opacity: 0,

      duration: 0.9,

      stagger: 0.08,

      ease: "power3.out",

      scrollTrigger: {
        trigger: section,

        start: "top 78%",

        once: true,
      },
    });
  });

  /* =======================================================
     WORK PROGRESS
  ======================================================= */

  const projectTrack = document.querySelector(".project-track");

  const progress = document.querySelector(".progress i");

  if (projectTrack && progress) {
    ScrollTrigger.create({
      trigger: ".work",

      start: "top bottom",

      end: "bottom top",

      scrub: true,

      onUpdate: (self) => {
        progress.style.width = `${Math.max(25, self.progress * 100)}%`;
      },
    });
  }

  /* =======================================================
     HORIZONTAL WORK DRAG / WHEEL
  ======================================================= */

  if (projectTrack) {
    let dragging = false;

    let startX = 0;

    let startScroll = 0;

    projectTrack.addEventListener("pointerdown", (event) => {
      dragging = true;

      startX = event.clientX;

      startScroll = window.scrollX;

      projectTrack.setPointerCapture(event.pointerId);
    });

    projectTrack.addEventListener("pointermove", (event) => {
      if (!dragging) {
        return;
      }

      const delta = event.clientX - startX;

      projectTrack.scrollLeft = startScroll - delta;
    });

    projectTrack.addEventListener("pointerup", () => {
      dragging = false;
    });
  }

  /* =======================================================
     LOGO
  ======================================================= */

  document.querySelector(".logo")?.addEventListener("click", (event) => {
    event.preventDefault();

    closeMenu();

    gsap.to(window, {
      scrollTo: 0,

      duration: 1,

      ease: "power3.inOut",
    });
  });

  /* =======================================================
     PRELOADER
  ======================================================= */

  function runPreloader() {
    const preloader = document.getElementById("preloader");

    const number = document.getElementById("preNum");

    const bar = document.getElementById("preBar");

    if (!preloader) {
      return;
    }

    const firstVisit = sessionStorage.getItem("EMMA-visited");

    /*
     * Loader only on the first
     * visit of the browser session.
     */

    if (firstVisit) {
      preloader.style.display = "none";

      return;
    }

    sessionStorage.setItem("EMMA-visited", "true");

    const state = {
      value: 0,
    };

    gsap.to(state, {
      value: 100,

      duration: 1.7,

      ease: "power2.inOut",

      onUpdate: () => {
        const value = Math.round(state.value);

        if (number) {
          number.textContent = String(value).padStart(2, "0");
        }

        if (bar) {
          bar.style.width = `${value}%`;
        }
      },

      onComplete: () => {
        gsap.to(preloader, {
          clipPath: "inset(0 0 100% 0)",

          duration: 0.9,

          ease: "power4.inOut",

          onComplete: () => {
            preloader.remove();
          },
        });
      },
    });
  }

  /* =======================================================
     INIT
  ======================================================= */

  applySettings();

  setupToolsMarquee();

  runPreloader();
});
