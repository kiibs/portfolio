/* =========================================================================
   DATA.JS
   Everything you are likely to edit lives in this file:
   - SITE: your name, role, email, socials, CV path
   - I18N: every visible string, in Spanish (es) and English (en)
   - PROJECTS: the full project catalog

   ---------------------------------------------------------------------
   HOW TO ADD A NEW PROJECT
   ---------------------------------------------------------------------
   1. Duplicate any object inside the PROJECTS array below.
   2. Give it a new unique "slug" (used as its URL / filename).
   3. Fill in title, year, category, tools, type, description (es + en).
   4. Put your images in  assets/projects/<slug>/  and list their
      filenames in the "images" array (first image = cover).
   5. Set "featured: true" if it should appear in the 5-project
      "Selected Projects" rail on the homepage (keep exactly 5 featured
      at a time so the rail stays balanced).
   6. Duplicate projects/_template.html, rename it to <slug>.html and
      save it inside /projects/. Open it and follow the comments — it
      reads everything else (title, images, gallery, magazine) straight
      from the "slug" you set here, you only fill the parts that need
      real content (the layout blocks).
   7. If the project is a digital magazine, set "magazine" to the path
      of the PDF (e.g. "assets/projects/papel-cero/magazine.pdf") —
      otherwise leave it as null.
   ========================================================================= */

const SITE = {
  name: "MI NOMBRE",
  role: { es: "DISEÑADORA GRÁFICA", en: "GRAPHIC DESIGNER" },
  email: "hola@minombre.studio", // placeholder — replace with your real email
  socials: [
    { label: "Instagram", url: "#" },
    { label: "Behance", url: "#" },
    { label: "LinkedIn", url: "#" }
  ],
  cv: "assets/cv/cv.pdf",
  photo: "assets/images/profile.jpg"
};

// Software chips shown in the Skills section. Add / remove freely.
const TOOLS = [
  { name: "Photoshop", icon: "https://cdn.simpleicons.org/adobephotoshop" },
  { name: "Illustrator", icon: "https://cdn.simpleicons.org/adobeillustrator" },
  { name: "InDesign", icon: "https://cdn.simpleicons.org/adobeindesign" },
  { name: "After Effects", icon: "https://cdn.simpleicons.org/adobeaftereffects" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma" },
  { name: "Blender", icon: "https://cdn.simpleicons.org/blender" },
  { name: "Procreate", icon: "https://cdn.simpleicons.org/procreate" },
  { name: "Lightroom", icon: "https://cdn.simpleicons.org/adobelightroom" }
];

// Category list — used to build the filter chips on projects.html
const CATEGORIES = [
  { key: "branding", es: "Branding / Identidad", en: "Branding / Identity" },
  { key: "editorial", es: "Editorial", en: "Editorial" },
  { key: "posters", es: "Carteles / Campañas", en: "Posters / Campaigns" },
  { key: "packaging", es: "Packaging", en: "Packaging" },
  { key: "digital", es: "Diseño Digital", en: "Digital Design" },
  { key: "illustration", es: "Ilustración", en: "Illustration" },
  { key: "photography", es: "Fotografía", en: "Photography" },
  { key: "3d", es: "3D", en: "3D" }
];

const I18N = {
  es: {
    nav_home: "Inicio", nav_about: "Sobre mí", nav_projects: "Proyectos", nav_contact: "Contacto",
    hero_tagline: "Diseño gráfico con acento editorial, curiosidad Y2K y ganas de experimentar en cada proyecto.",
    hero_scroll: "Desplázate",
    selected_eyebrow: "Portfolio 2026",
    selected_title: "Proyectos seleccionados",
    view_all: "Ver todos los proyectos",
    about_eyebrow: "Sobre mí",
    about_title: "Diseñadora gráfica recién graduada, curiosa por naturaleza",
    about_p1: "Soy MI NOMBRE, diseñadora gráfica recién graduada. Me interesa el diseño como herramienta para contar historias: paso con la misma soltura de una identidad de marca a una revista editorial o a una pieza ilustrada.",
    about_p2: "Estudié Diseño Gráfico y desde entonces no he dejado de mezclar disciplinas — branding, editorial, packaging, 3D — buscando siempre un punto de vista propio antes que una fórmula.",
    about_p3: "Me mueve el detalle: la tipografía bien ajustada, el color que no sobra ni falta, el ritmo de una maqueta. Fuera del estudio, esa misma curiosidad me lleva a la fotografía callejera y a coleccionar referencias de diseño de finales de los 90 y principios de los 2000.",
    about_disciplines_label: "Disciplinas",
    about_disciplines: "Branding · Editorial · Packaging · Ilustración · Diseño Digital · 3D",
    about_education_label: "Formación",
    about_education: "Grado en Diseño Gráfico",
    about_philosophy_label: "Filosofía",
    about_philosophy: "Cada proyecto necesita su propia lógica visual — desconfío de las fórmulas repetidas.",
    skills_eyebrow: "Herramientas",
    skills_title: "Con qué trabajo",
    contact_eyebrow: "Contacto",
    contact_title: "Hablemos de tu próximo proyecto",
    contact_cta_email: "Escríbeme",
    contact_cta_cv: "Descargar CV",
    footer_rights: "Todos los derechos reservados.",
    footer_built: "Diseñado y desarrollado por MI NOMBRE",
    projects_eyebrow: "Catálogo completo",
    projects_title: "Proyectos",
    projects_intro: "Una selección de trabajos entre identidad de marca, editorial, packaging e ilustración. Filtra por categoría o herramienta para explorar.",
    filter_category: "Categoría",
    filter_tool: "Herramienta",
    filter_reset: "Restablecer filtros",
    no_results: "No hay proyectos con esta combinación de filtros.",
    type_individual: "Individual",
    type_group: "Grupal",
    meta_year: "Año",
    meta_category: "Categoría",
    meta_tools: "Herramientas",
    meta_type: "Tipo",
    prev_project: "Proyecto anterior",
    next_project: "Siguiente proyecto",
    back_projects: "Volver a proyectos",
    magazine_label: "Revista digital",
    lang_switch: "EN",
    cursor_view: "VER",
    cursor_drag: "ARRASTRA"
  },
  en: {
    nav_home: "Home", nav_about: "About", nav_projects: "Projects", nav_contact: "Contact",
    hero_tagline: "Graphic design with an editorial accent, Y2K curiosity, and a habit of experimenting on every project.",
    hero_scroll: "Scroll",
    selected_eyebrow: "Portfolio 2026",
    selected_title: "Selected projects",
    view_all: "View all projects",
    about_eyebrow: "About me",
    about_title: "Recently graduated graphic designer, curious by nature",
    about_p1: "I'm MI NOMBRE, a recently graduated graphic designer. I see design as a tool for telling stories — I move just as comfortably between a brand identity, an editorial magazine, or an illustrated piece.",
    about_p2: "I studied Graphic Design and haven't stopped mixing disciplines since — branding, editorial, packaging, 3D — always chasing a point of view of my own rather than a formula.",
    about_p3: "I'm driven by detail: type that's been genuinely adjusted, color that isn't a pixel too much or too little, the rhythm of a layout. Outside the studio, that same curiosity pulls me toward street photography and collecting design references from the late 90s and early 2000s.",
    about_disciplines_label: "Disciplines",
    about_disciplines: "Branding · Editorial · Packaging · Illustration · Digital Design · 3D",
    about_education_label: "Education",
    about_education: "BA in Graphic Design",
    about_philosophy_label: "Philosophy",
    about_philosophy: "Every project needs its own visual logic — I'm wary of reaching for the same formula twice.",
    skills_eyebrow: "Tools",
    skills_title: "What I work with",
    contact_eyebrow: "Contact",
    contact_title: "Let's talk about your next project",
    contact_cta_email: "Email me",
    contact_cta_cv: "Download CV",
    footer_rights: "All rights reserved.",
    footer_built: "Designed & built by MI NOMBRE",
    projects_eyebrow: "Full catalogue",
    projects_title: "Projects",
    projects_intro: "A selection of work spanning brand identity, editorial, packaging and illustration. Filter by category or tool to explore.",
    filter_category: "Category",
    filter_tool: "Tool",
    filter_reset: "Reset filters",
    no_results: "No projects match this filter combination.",
    type_individual: "Individual",
    type_group: "Group",
    meta_year: "Year",
    meta_category: "Category",
    meta_tools: "Tools",
    meta_type: "Type",
    prev_project: "Previous project",
    next_project: "Next project",
    back_projects: "Back to projects",
    magazine_label: "Digital magazine",
    lang_switch: "ES",
    cursor_view: "VIEW",
    cursor_drag: "DRAG"
  }
};

/* ---------------------------------------------------------------------
   PROJECTS — 6 demo entries covering every category/tool/filter case.
   Replace images with your own inside assets/projects/<slug>/.
   ------------------------------------------------------------------- */
const PROJECTS = [
  {
    slug: "lumina",
    year: 2025,
    category: "branding",
    tools: ["Illustrator", "Photoshop"],
    type: "individual",
    featured: true,
    size: "size-a",
    title: { es: "Lúmina", en: "Lúmina" },
    description: {
      es: "Identidad visual para un estudio de iluminación escandinavo-mediterráneo: un sistema tipográfico flexible y una paleta que va del acero al ámbar.",
      en: "Visual identity for a Scandinavian-Mediterranean lighting studio: a flexible type system and a palette that runs from steel to amber."
    },
    cover: "https://picsum.photos/seed/lumina-cover/1200/1500",
    images: [
      "https://picsum.photos/seed/lumina-1/1600/2000",
      "https://picsum.photos/seed/lumina-2/1600/1200",
      "https://picsum.photos/seed/lumina-3/1600/1200",
      "https://picsum.photos/seed/lumina-4/1600/2000"
    ],
    magazine: null,
    // "layout" controls how projects/_template.html arranges the images
    // above — see HOW TO ADD A NEW PROJECT, step 6. Block types:
    // full (one large image), pair (two side by side), inset (one big +
    // a short note). "img" indexes into the "images" array above.
    layout: [
      { type: "full", img: 0 },
      { type: "pair", img: [1, 2] },
      { type: "inset", img: 3, note: {
        es: "El sistema tipográfico se construye sobre una única familia variable, ajustando peso y anchura según el contexto de uso.",
        en: "The type system is built on a single variable family, adjusting weight and width depending on where it's used." } }
    ]
  },
  {
    slug: "papel-cero",
    year: 2025,
    category: "editorial",
    tools: ["InDesign", "Photoshop"],
    type: "group",
    featured: true,
    size: "size-e",
    title: { es: "Papel Cero", en: "Papel Cero" },
    description: {
      es: "Revista trimestral sobre diseño y sostenibilidad, maquetada en equipo. Doce páginas de retícula editorial pensadas para leerse tanto en papel como en pantalla.",
      en: "A quarterly magazine about design and sustainability, laid out as a team. Twelve pages of editorial grid built to read on paper and on screen alike."
    },
    cover: "https://picsum.photos/seed/papelcero-cover/1400/1000",
    images: [
      "https://picsum.photos/seed/papelcero-1/1600/1100",
      "https://picsum.photos/seed/papelcero-2/1600/2000",
      "https://picsum.photos/seed/papelcero-3/1600/1100"
    ],
    magazine: "assets/projects/papel-cero/magazine.pdf",
    layout: [
      { type: "full", img: 0 },
      { type: "inset", img: 1, note: {
        es: "Maquetada a dos tintas, con una retícula de 6 columnas pensada para alternar texto largo e imagen a sangre.",
        en: "Laid out in two colours, on a 6-column grid built to alternate long-form text with full-bleed imagery." } },
      { type: "full", img: 2 }
    ]
  },
  {
    slug: "neon-static",
    year: 2024,
    category: "posters",
    tools: ["Illustrator", "Photoshop"],
    type: "individual",
    featured: true,
    size: "size-b",
    title: { es: "Neón Static", en: "Neon Static" },
    description: {
      es: "Serie de carteles para un ciclo de música electrónica: tipografía distorsionada y una paleta ácida inspirada en las señales de interferencia analógica.",
      en: "A poster series for an electronic-music cycle: distorted type and an acidic palette borrowed from analog interference signals."
    },
    cover: "https://picsum.photos/seed/neonstatic-cover/1100/1500",
    images: [
      "https://picsum.photos/seed/neonstatic-1/1400/1900",
      "https://picsum.photos/seed/neonstatic-2/1400/1900",
      "https://picsum.photos/seed/neonstatic-3/1400/1000"
    ],
    magazine: null,
    layout: [
      { type: "pair", img: [0, 1] },
      { type: "full", img: 2 }
    ]
  },
  {
    slug: "cascara",
    year: 2024,
    category: "packaging",
    tools: ["Illustrator", "Blender"],
    type: "individual",
    featured: true,
    size: "size-c",
    title: { es: "Cáscara", en: "Cáscara" },
    description: {
      es: "Packaging modular para una marca de frutos secos ecológicos: estructura desplegable en cartón y renders 3D para presentar el sistema.",
      en: "Modular packaging for an organic-nuts brand: a fold-out cardboard structure, presented through 3D renders of the full system."
    },
    cover: "https://picsum.photos/seed/cascara-cover/1300/1300",
    images: [
      "https://picsum.photos/seed/cascara-1/1600/1600",
      "https://picsum.photos/seed/cascara-2/1600/1200",
      "https://picsum.photos/seed/cascara-3/1600/1200"
    ],
    magazine: null,
    layout: [
      { type: "full", img: 0 },
      { type: "inset", img: 1, note: {
        es: "La estructura se despliega en una sola pieza de cartón troquelado, sin adhesivos.",
        en: "The structure unfolds from a single die-cut sheet of cardboard, no adhesives needed." } },
      { type: "full", img: 2 }
    ]
  },
  {
    slug: "bruma",
    year: 2025,
    category: "digital",
    tools: ["Figma", "After Effects"],
    type: "group",
    featured: true,
    size: "size-d",
    title: { es: "Bruma", en: "Bruma" },
    description: {
      es: "Diseño de producto y micro-animaciones para una app de meditación. Trabajo en equipo con foco en transiciones suaves y jerarquía tipográfica calmada.",
      en: "Product design and micro-animation for a meditation app. Team project focused on soft transitions and a calm type hierarchy."
    },
    cover: "https://picsum.photos/seed/bruma-cover/1400/1100",
    images: [
      "https://picsum.photos/seed/bruma-1/1600/1200",
      "https://picsum.photos/seed/bruma-2/1600/1200",
      "https://picsum.photos/seed/bruma-3/1600/2000"
    ],
    magazine: null,
    layout: [
      { type: "pair", img: [0, 1] },
      { type: "inset", img: 2, note: {
        es: "Cada transición dura entre 200 y 400ms — lo justo para sentirse intencionada sin frenar la navegación.",
        en: "Every transition runs between 200–400ms — just enough to feel intentional without slowing navigation." } }
    ]
  },
  {
    slug: "fauna-imaginaria",
    year: 2023,
    category: "illustration",
    tools: ["Procreate", "Photoshop"],
    type: "individual",
    featured: false,
    size: "size-f",
    title: { es: "Fauna Imaginaria", en: "Imaginary Fauna" },
    description: {
      es: "Serie personal de criaturas inventadas a partir de animales en peligro de extinción, pensada como proyecto editorial ilustrado.",
      en: "A personal series of invented creatures based on endangered animals, conceived as an illustrated editorial project."
    },
    cover: "https://picsum.photos/seed/fauna-cover/1200/1600",
    images: [
      "https://picsum.photos/seed/fauna-1/1500/2000",
      "https://picsum.photos/seed/fauna-2/1500/2000",
      "https://picsum.photos/seed/fauna-3/1500/1100"
    ],
    magazine: null,
    layout: [
      { type: "pair", img: [0, 1] },
      { type: "full", img: 2 }
    ]
  }
];
