/**
 * Main client-side script for personal portfolio
 * Lightweight, accessible interactions
 */
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const revealSections = document.querySelectorAll(
    ".editorial-section:not([data-reveal-early])"
  );
  const earlyRevealSections = document.querySelectorAll(
    ".editorial-section[data-reveal-early]"
  );

  if (
    (revealSections.length > 0 || earlyRevealSections.length > 0) &&
    !prefersReducedMotion &&
    "IntersectionObserver" in window
  ) {
    document.documentElement.classList.add("reveal-ready");

    function createRevealObserver(options) {
      return new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        options
      );
    }

    const revealObserver = createRevealObserver({
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    });
    revealSections.forEach(function (section) {
      revealObserver.observe(section);
    });

    const earlyRevealObserver = createRevealObserver({
      threshold: 0.01,
      rootMargin: "0px 0px 18% 0px"
    });
    earlyRevealSections.forEach(function (section) {
      earlyRevealObserver.observe(section);
    });
  }

  if (window.Lenis && !prefersReducedMotion) {
    const lenis = new window.Lenis({
      anchors: true,
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      window.requestAnimationFrame(raf);
    }

    window.requestAnimationFrame(raf);
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isExpanded));
      siteNav.classList.toggle("is-open");
    });

    // Close mobile nav when clicking a link
    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (siteNav.classList.contains("is-open")) {
          siteNav.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && siteNav.classList.contains("is-open")) {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  const pacmanGhost = document.querySelector(".pacman-ghost");

  if (pacmanGhost && window.matchMedia("(pointer: fine)").matches) {
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let frameRequested = false;

    function updateGhostEyes() {
      const bounds = pacmanGhost.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const distance = Math.hypot(pointerX - centerX, pointerY - centerY) || 1;
      const pupilOffset = 4.5 / distance;

      pacmanGhost.style.setProperty(
        "--pupil-x",
        `${(pointerX - centerX) * pupilOffset}px`
      );
      pacmanGhost.style.setProperty(
        "--pupil-y",
        `${(pointerY - centerY) * pupilOffset}px`
      );
      frameRequested = false;
    }

    document.addEventListener("pointermove", function (event) {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!frameRequested) {
        frameRequested = true;
        window.requestAnimationFrame(updateGhostEyes);
      }
    });
  }
});
