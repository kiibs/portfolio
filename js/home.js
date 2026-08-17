/* =========================================================================
   HOME.JS — index.html only
   Sections: HERO INTRO · HERO MARK PARALLAX · HORIZONTAL RIGS (Selected
             Projects + About) — wheel / trackpad / touch / drag
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---- HERO INTRO ------------------------------------------------- */
  // Fallback path if GSAP/motion.js isn't available: just add "in" so the
  // CSS word-reveal still plays. When GSAP *is* loaded, js/motion.js's
  // own "loaderdone" listener drives a fuller timeline (role/tagline/
  // stickers) and also adds this same class — harmless if both fire.
  const heroTitle = document.querySelector(".hero-title");
  function playHero() { if (heroTitle) heroTitle.classList.add("in"); }
  if (document.getElementById("loader")) {
    document.addEventListener("loaderdone", playHero, { once: true });
  } else {
    requestAnimationFrame(playHero);
  }

  /* ---- HERO MARK PARALLAX (subtle, cursor-driven) ------------------ */
  const mark = document.querySelector(".hero-mark");
  if (mark && !isTouch && !prefersReduced) {
    addEventListener("mousemove", (e) => {
      const nx = (e.clientX / innerWidth - 0.5) * 24;
      const ny = (e.clientY / innerHeight - 0.5) * 12;
      mark.style.transform = `translate(calc(-50% + ${nx}px), calc(-42% + ${ny}px))`;
    });
  }

  /* ---- GENERIC HORIZONTAL RIG --------------------------------------
     Lets a section scroll horizontally via mouse wheel, trackpad,
     click-drag, or native touch swipe, while remaining a normal
     scrollable element (so it never traps page scroll). */
  function initHorizontalRig(rigSelector) {
    const rig = document.querySelector(rigSelector);
    if (!rig) return;

    rig.addEventListener("wheel", (e) => {
      // Only hijack vertical wheel into horizontal motion when the rig
      // actually has horizontal room to move, and let the user keep
      // scrolling the page once the rig is exhausted.
      const atStart = rig.scrollLeft <= 0;
      const atEnd = rig.scrollLeft + rig.clientWidth >= rig.scrollWidth - 2;
      const goingLeft = e.deltaY < 0;
      if ((atStart && goingLeft) || (atEnd && !goingLeft)) return;
      e.preventDefault();
      rig.scrollLeft += e.deltaY + e.deltaX;
    }, { passive: false });

    // Click-and-drag (desktop) — cursor shows the DRAG state via
    // data-cursor="drag" set on the track element in the HTML.
    let isDown = false, startX = 0, startScroll = 0, moved = false;
    rig.addEventListener("mousedown", (e) => {
      isDown = true; moved = false;
      startX = e.pageX; startScroll = rig.scrollLeft;
      rig.classList.add("is-dragging");
    });
    addEventListener("mouseup", () => { isDown = false; rig.classList.remove("is-dragging"); });
    addEventListener("mousemove", (e) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 4) moved = true;
      rig.scrollLeft = startScroll - dx;
    });
    // Prevent link/card clicks from firing right after a drag
    rig.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
  }

  initHorizontalRig(".h-rig");
  initHorizontalRig(".about-rig");
});
