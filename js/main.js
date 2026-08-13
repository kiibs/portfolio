/* =========================================================================
   MAIN.JS — runs on every page
   Sections: PRELOADER · CURSOR · TOUCH DETECTION · THEME · LANGUAGE ·
             NAVBAR · MOBILE MENU · SMOOTH SCROLL · REVEAL · BACKGROUND
   ========================================================================= */

document.documentElement.classList.add("js");

/* ---------------------------------------------------------------------- */
/* TOUCH DETECTION — disables the custom cursor on touch devices (12) */
const isTouch = matchMedia("(hover: none), (pointer: coarse)").matches;
if (isTouch) document.body.classList.add("touch-device");

const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReduced) document.body.classList.add("reduced-motion");

/* ---------------------------------------------------------------------- */
/* LANGUAGE SYSTEM (30)
   Persisted in localStorage as "site-lang". Falls back to the <html lang>
   attribute already set by the page, or "es". Every string lives in
   data.js -> I18N. Switching language re-renders text in place; pages
   that build content dynamically (home/projects/project scripts) just
   need to re-run their render function, which they do by listening for
   the "langchange" event dispatched below. */
const LangSystem = (() => {
  const stored = localStorage.getItem("site-lang");
  let current = stored || document.documentElement.getAttribute("lang") || "es";

  function t(key) {
    return (I18N[current] && I18N[current][key]) || (I18N.es[key]) || key;
  }

  function applyStaticText() {
    document.documentElement.setAttribute("lang", current);
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });
    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) langBtn.textContent = t("lang_switch");
    // SITE.role lives in data.js (not I18N) since it doubles as SITE config
    const roleEl = document.getElementById("hero-role");
    if (roleEl && typeof SITE !== "undefined") roleEl.textContent = SITE.role[current];
  }

  function set(lang, { reload = false } = {}) {
    current = lang;
    localStorage.setItem("site-lang", lang);
    if (reload) {
      // Section 30: on language change the loader may reappear
      sessionStorage.removeItem("loader-shown");
      location.reload();
      return;
    }
    applyStaticText();
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  return { get: () => current, t, set, applyStaticText };
})();
window.LangSystem = LangSystem;

document.addEventListener("DOMContentLoaded", () => {
  LangSystem.applyStaticText();
  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const next = LangSystem.get() === "es" ? "en" : "es";
      LangSystem.set(next, { reload: true });
    });
  }
});

/* ---------------------------------------------------------------------- */
/* THEME SYSTEM (29) — localStorage first, then OS preference */
const ThemeSystem = (() => {
  const stored = localStorage.getItem("site-theme");
  const osPrefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
  let current = stored || (osPrefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", current);

  function set(theme) {
    current = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("site-theme", theme);
  }
  function toggle() { set(current === "dark" ? "light" : "dark"); }
  return { get: () => current, set, toggle };
})();
window.ThemeSystem = ThemeSystem;

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.addEventListener("click", () => ThemeSystem.toggle());
});

/* ---------------------------------------------------------------------- */
/* PRELOADER (11) — only on first visit of the session */
(function preloader() {
  const loader = document.getElementById("loader");
  if (!loader) return;
  const alreadyShown = sessionStorage.getItem("loader-shown");
  if (alreadyShown) { loader.remove(); return; }

  const bar = loader.querySelector(".loader-bar i");
  const pct = loader.querySelector(".loader-pct");
  const nameSpans = loader.querySelectorAll(".loader-name span");

  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    nameSpans.forEach((s, i) => {
      s.style.transitionDelay = `${i * 0.03}s`;
      s.style.transform = "translateY(0)";
    });
  });

  let p = 0;
  const duration = prefersReduced ? 200 : 1400;
  const start = performance.now();
  function tick(now) {
    p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    if (bar) bar.style.transform = `scaleX(${eased})`;
    if (pct) pct.textContent = `${Math.round(eased * 100)}%`;
    if (p < 1) requestAnimationFrame(tick);
    else finish();
  }
  requestAnimationFrame(tick);

  function finish() {
    sessionStorage.setItem("loader-shown", "1");
    setTimeout(() => {
      loader.classList.add("is-hidden");
      document.body.style.overflow = "";
      document.dispatchEvent(new CustomEvent("loaderdone"));
      setTimeout(() => loader.remove(), 900);
    }, 220);
  }
})();

/* ---------------------------------------------------------------------- */
/* CUSTOM CURSOR (12) — dot + lagging ring, with contextual states */
(function cursor() {
  if (isTouch) return;
  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  ring.innerHTML = '<span></span>';
  document.body.append(dot, ring);
  const label = ring.querySelector("span");

  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });

  function loop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  function setState(state, text) {
    ring.className = "cursor-ring" + (state ? ` state-${state}` : "");
    label.textContent = text || "";
  }

  document.addEventListener("mouseover", (e) => {
    const viewEl = e.target.closest("[data-cursor='view']");
    const dragEl = e.target.closest("[data-cursor='drag']");
    const link = e.target.closest("a,button");
    if (viewEl) setState("view", LangSystem.t("cursor_view"));
    else if (dragEl) setState("drag", LangSystem.t("cursor_drag"));
    else if (link) setState("link");
    else setState(null);
  });
  document.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget) setState(null);
  });
})();

/* ---------------------------------------------------------------------- */
/* NAVBAR — hide on scroll down, show on scroll up */
(function navbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  let lastY = window.scrollY;
  addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y > lastY && y > 140) nav.classList.add("nav-hidden");
    else nav.classList.remove("nav-hidden");
    lastY = y;
  }, { passive: true });
})();

/* ---------------------------------------------------------------------- */
/* MOBILE MENU */
(function mobileMenu() {
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobile-menu");
  if (!burger || !menu) return;
  burger.addEventListener("click", () => {
    burger.classList.toggle("is-open");
    menu.classList.toggle("is-open");
    document.body.style.overflow = menu.classList.contains("is-open") ? "hidden" : "";
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    burger.classList.remove("is-open");
    menu.classList.remove("is-open");
    document.body.style.overflow = "";
  }));
})();

/* ---------------------------------------------------------------------- */
/* SMOOTH SCROLL — Lenis, section 13. Falls back to native scroll if the
   CDN failed to load (e.g. offline preview). */
let lenis;
(function smoothScroll() {
  if (prefersReduced || typeof Lenis === "undefined") return;
  lenis = new Lenis({ duration: 1.0, smoothWheel: true, wheelMultiplier: 1 });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  window.lenis = lenis;
})();

/* ---------------------------------------------------------------------- */
/* REVEAL ON SCROLL — generic .reveal utility */
(function reveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach((el) => io.observe(el));
})();

/* ---------------------------------------------------------------------- */
/* AMBIENT BACKGROUND FIELD (34) — soft moving grain/shapes on a canvas.
   Static-by-default: it drifts gently and never competes with imagery. */
(function backgroundField() {
  const canvas = document.getElementById("bg-field");
  if (!canvas || prefersReduced) return;
  const ctx = canvas.getContext("2d");
  let w, h, blobs;

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }
  function makeBlobs() {
    const colors = ["--cobalt", "--lime", "--coral"];
    blobs = colors.map((c, i) => ({
      color: getComputedStyle(document.documentElement).getPropertyValue(c).trim(),
      x: (0.2 + i * 0.3) * w,
      y: (0.25 + (i % 2) * 0.4) * h,
      r: Math.min(w, h) * (0.16 + i * 0.03),
      vx: 0.06 + i * 0.02,
      vy: 0.045 + i * 0.015,
      t: i * 120
    }));
  }
  resize(); makeBlobs();
  addEventListener("resize", () => { resize(); makeBlobs(); });

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    blobs.forEach((b) => {
      b.t += 1;
      const x = b.x + Math.sin(b.t * 0.002 * b.vx) * w * 0.12;
      const y = b.y + Math.cos(b.t * 0.0016 * b.vy) * h * 0.12;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, b.r);
      grad.addColorStop(0, hexAlpha(b.color, 0.16));
      grad.addColorStop(1, hexAlpha(b.color, 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalCompositeOperation = "source-over";
    requestAnimationFrame(draw);
  }
  function hexAlpha(hex, a) {
    if (hex.startsWith("#")) {
      const n = parseInt(hex.slice(1), 16);
      const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
      return `rgba(${r},${g},${b},${a})`;
    }
    return hex;
  }
  requestAnimationFrame(draw);
})();
