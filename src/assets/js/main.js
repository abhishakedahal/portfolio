/**
 * Main client-side script for personal portfolio
 * Lightweight, accessible interactions
 */
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");

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
});
