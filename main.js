// =========================
// Global JS: Dark Mode, Mobile Menu, Active Link, Accordion, Reveal Animations
// =========================

(function () {
  const root = document.documentElement;

  // Dark mode: load saved
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    root.setAttribute("data-theme", saved);
  } else {
    // default: light (you can change to dark if you want)
    root.setAttribute("data-theme", "light");
  }

  // Toggle theme
  const themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      themeBtn.setAttribute("aria-label", next === "dark" ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  // Mobile menu
  const menuBtn = document.querySelector("[data-menu-btn]");
  const navLinks = document.querySelector("[data-navlinks]");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Active nav link (based on current file)
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navlinks a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });

  // Accordions
  document.querySelectorAll(".acc").forEach(acc => {
    const btn = acc.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", () => {
      acc.classList.toggle("open");
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));
})();
