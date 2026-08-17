/* =========================================================================
   MOTION.JS — the GSAP-driven interactive layer, runs on every page.
   Everything here is ADDITIVE: the site is fully usable/legible with this
   file absent (e.g. if the GSAP CDN fails) because main.js already covers
   the base reveal/cursor/theme/language systems. This file exists for
   the bigger, more expressive motion: hero choreography, the sticker
   visual language, scroll parallax, and magnetic controls.

   Respects `prefers-reduced-motion` throughout (see the guard at top —
   every block below checks `motionOK` before animating anything).

   Sections: SETUP · HERO INTRO ANIMATION · STICKER SYSTEM ·
             MAGNETIC CONTROLS · SCROLL PARALLAX · IMAGE SCALE REVEALS
   ========================================================================= */

// ---- SETUP --------------------------------------------------------------
const motionOK = typeof gsap !== "undefined" && !prefersReduced;
if (motionOK && typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  if (!motionOK) return;

  /* ---- HERO INTRO ANIMATION -------------------------------------------
     Replaces the plain CSS word-reveal with a proper GSAP timeline so it
     can be sequenced against the tagline, role label and the stickers —
     everything arrives as one choreographed moment instead of separate
     unrelated fades. Still keys off the same "loaderdone" event main.js
     already dispatches, so timing with the loader is untouched. */
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const tl = gsap.timeline({ paused: true });
    tl.to(heroTitle, { duration: 0.01, onStart: () => heroTitle.classList.add("in") })
      .from(".hero-role", { opacity: 0, y: 14, duration: 0.6, ease: "power2.out" }, 0.35)
      .from(".hero-tagline", { opacity: 0, y: 14, duration: 0.7, ease: "power2.out" }, 0.5)
      .from(".hero-scroll", { opacity: 0, duration: 0.6 }, 0.7)
      .from(".sticker", {
        opacity: 0, scale: 0.4, rotate: -25, duration: 0.7,
        stagger: 0.12, ease: "back.out(2)"
      }, 0.5);

    if (document.getElementById("loader")) {
      document.addEventListener("loaderdone", () => tl.play(), { once: true });
    } else {
      tl.play();
    }
  }

  /* ---- STICKER SYSTEM ---------------------------------------------------
     Hero stickers get a slow, continuous, extremely gentle bob + rotate
     loop (never distracting, never stops) so the hero feels "alive" from
     the first second — and the one marked .magnetic drifts a few px
     toward the cursor when it's nearby, then eases back when it isn't. */
  gsap.utils.toArray(".sticker:not(.magnetic)").forEach((el, i) => {
    gsap.to(el, {
      y: "+=14", rotate: "+=6", duration: 3.4 + i * 0.6,
      yoyo: true, repeat: -1, ease: "sine.inOut", delay: i * 0.3
    });
  });

  const magnet = document.querySelector(".sticker.magnetic");
  if (magnet && !isTouch) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    const radius = 220, strength = 0.35;
    addEventListener("mousemove", (e) => {
      const rect = magnet.getBoundingClientRect();
      const ox = rect.left + rect.width / 2, oy = rect.top + rect.height / 2;
      const dx = e.clientX - ox, dy = e.clientY - oy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) { mx = dx * strength; my = dy * strength; }
      else { mx = 0; my = 0; }
    });
    gsap.ticker.add(() => {
      cx += (mx - cx) * 0.12; cy += (my - cy) * 0.12;
      gsap.set(magnet, { x: cx, y: cy });
    });
  }

  /* ---- MAGNETIC CONTROLS -------------------------------------------------
     A subtle "pull" on the navbar's icon buttons — classic magnetic-
     button feel, kept small so it reads as polish rather than a gimmick. */
  if (!isTouch) {
    document.querySelectorAll(".nav-control-btn").forEach((btn) => {
      btn.classList.add("magnetic");
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.35;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
      });
    });
  }

  /* ---- SCROLL PARALLAX ---------------------------------------------------
     Hero: the whole hero block drifts up and fades slightly faster than
     native scroll as it leaves the viewport — a big, cheap (transform +
     opacity only) scroll-linked moment right at the top of the page. */
  if (typeof ScrollTrigger !== "undefined") {
    const hero = document.getElementById("hero");
    if (hero) {
      gsap.to(".hero-inner, .hero-scroll", {
        yPercent: -18, opacity: 0.4, ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 }
      });
      gsap.to(".hero-mark", {
        yPercent: -8, xPercent: -50, ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 }
      });
    }

    // Selected Projects: a staggered rise the first time the rail enters
    // view (once) — additive to the existing custom drag/wheel rig, never
    // touches its scrollLeft logic.
    const selTrack = document.getElementById("selected-track");
    if (selTrack) {
      ScrollTrigger.create({
        trigger: "#selected", start: "top 75%", once: true,
        onEnter: () => gsap.from(selTrack.children, {
          opacity: 0, y: 40, scale: 0.96, duration: 0.8, stagger: 0.08, ease: "power3.out"
        })
      });
    }

    // About: photo scales in, panels rise in sequence — a small editorial
    // "page turn" moment the first time the section is reached.
    const aboutTrack = document.querySelector(".about-track");
    if (aboutTrack) {
      ScrollTrigger.create({
        trigger: "#about", start: "top 70%", once: true,
        onEnter: () => {
          gsap.from(".about-photo", { opacity: 0, scale: 0.9, rotate: 3, duration: 0.9, ease: "power3.out" });
          gsap.from(".about-panel", { opacity: 0, y: 30, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.15 });
        }
      });
    }

    /* ---- IMAGE SCALE REVEALS -------------------------------------------
       Any large editorial image (project media, poster/collage covers)
       starts very slightly zoomed-in and settles to its natural scale as
       it enters view — combined with the CSS curtain reveal already on
       .img-reveal, this is the "images that expand" moment from the
       brief, applied broadly with one generic rule. */
    gsap.utils.toArray(".pm-full img, .pm-pair img, .pm-inset img").forEach((img) => {
      gsap.fromTo(img, { scale: 1.12 }, {
        scale: 1, duration: 1.3, ease: "power3.out",
        scrollTrigger: { trigger: img, start: "top 88%" }
      });
    });

    /* ---- MICRO ANIMATIONS: COUNT-UP NUMBERS -----------------------------
       The Selected Projects index badges ("01"–"05") count up from 0 the
       first time each one scrolls into view — a small, cheap moment of
       "the numbers are moving", not just static labels. */
    gsap.utils.toArray(".count-up").forEach((el) => {
      const target = parseInt(el.textContent, 10) || 0;
      ScrollTrigger.create({
        trigger: el, start: "top 92%", once: true,
        onEnter: () => {
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target, duration: 0.9, ease: "power1.out",
            onUpdate: () => { el.textContent = String(Math.round(counter.val)).padStart(2, "0"); }
          });
        }
      });
    });
  }
});
