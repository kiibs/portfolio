# MI NOMBRE — Portfolio

A multipage, bilingual (ES/EN) graphic-design portfolio. Static HTML/CSS/JS —
no build step, no backend, deploys straight to GitHub Pages.

## Structure

```
/
├── index.html            Home (Hero + Selected Projects + About + Skills + Contact)
├── projects.html         Full catalogue: filters + collage
├── projects/
│   ├── _template.html    Duplicate this for every new project
│   ├── lumina.html
│   ├── papel-cero.html   ← has the digital-magazine flipbook
│   ├── neon-static.html
│   ├── cascara.html
│   ├── bruma.html
│   └── fauna-imaginaria.html
├── css/style.css         All design tokens + styles (one file, sectioned)
├── js/
│   ├── data.js            ← YOU WILL EDIT THIS FILE THE MOST
│   ├── main.js            preloader, cursor, theme, language, navbar
│   ├── home.js             hero + horizontal-rail interaction (home only)
│   ├── render-home.js       builds Selected Projects + Skills + Contact
│   ├── render-projects.js   builds the catalogue collage + filters
│   ├── project-page.js      fills in a project page from data.js
│   └── flipbook.js          the PDF.js digital-magazine reader
└── assets/
    ├── images/profile.jpg   your photo
    ├── cv/cv.pdf             your CV
    ├── projects/<slug>/      per-project files (e.g. a magazine PDF)
    ├── icons/, fonts/, pdf/  optional — for self-hosting instead of CDN
```

## HOW TO CUSTOMIZE

**Your name, role, email, socials, CV** → open `js/data.js`, edit the
`SITE` object at the top. Your name also appears as literal text in the
`<title>`/loader markup of each HTML file — a find-and-replace for
"MI NOMBRE" across the project covers that in one pass.

**Your photo** → replace `assets/images/profile.jpg` (same filename), or
change the path in `index.html`'s About section.

**Your CV** → replace `assets/cv/cv.pdf` (same filename), or change
`SITE.cv` in `js/data.js`.

**Add a project**:
1. Duplicate an object inside the `PROJECTS` array in `js/data.js`.
2. Give it a new `slug`, and fill in `title`, `year`, `category`, `tools`,
   `type` (`"individual"` / `"group"`), and `description` (ES + EN).
3. Put your images in `assets/projects/<slug>/` and list them in
   `images` (index 0 is used as the catalogue/collage cover).
4. Describe how those images should lay out on the project page with
   the `layout` array — block types are `full`, `pair`, and `inset`
   (inset pairs one big image with a short note). This is what lets
   each project page feel different without hand-coding HTML.
5. Set `featured: true` if it should appear in the homepage's 5-project
   "Selected Projects" rail — keep exactly 5 projects featured at once.
6. Copy `projects/_template.html`, rename it to `<slug>.html`, and set
   `data-slug="<slug>"` on the `<body>` tag. Nothing else in that file
   needs editing — title, meta, images, and prev/next links are all
   pulled from `data.js` automatically.

**Add a digital magazine (PDF flipbook)** → put the PDF at
`assets/projects/<slug>/magazine.pdf`, then set that path as the
`magazine` field on the project in `js/data.js`. Leave it as `null` for
projects that aren't a magazine — the reader block removes itself
automatically when there's no PDF.

**Change which projects are featured** → toggle `featured: true/false`
in `js/data.js`.

**Add/remove a category** → edit the `CATEGORIES` array in `js/data.js`
(each needs a unique `key` plus `es`/`en` labels). Then set that `key`
as a project's `category`.

**Add/remove a tool** → edit the `TOOLS` array in `js/data.js` (used by
the Skills section — icons come from simpleicons.org by slug). The
filter chips on `projects.html` build themselves from whatever tools
are actually used across your `PROJECTS`, so nothing else to update.

**Edit translations** → every visible string lives in the `I18N` object
in `js/data.js`, under `es` and `en`. Both must stay in sync — nothing
should be Spanish-only or English-only.

**Change colors / typography** → all design tokens are CSS custom
properties at the top of `css/style.css` (`:root` for light mode,
`html[data-theme="dark"]` for dark mode). Fonts are loaded via
`@import` at the very top of the same file.

## Notes

- Images use `picsum.photos` placeholders so the demo works out of the
  box — swap each project's `cover`/`images` URLs in `js/data.js` for
  your real files under `assets/projects/<slug>/`.
- The preloader only appears once per browser session (and again after
  a language switch, which reloads the page).
- Dark/light mode and language both persist via `localStorage`.
