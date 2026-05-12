(function () {
  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Page-like transition when clicking nav links (smooth fade -> jump -> fade)
  var overlay = document.getElementById("page-transition");
  var navLinks = document.querySelectorAll('.nav a[href^="#"]');
  var fadeInMs = 260;
  var settleMs = 60;

  function handleNavClick(e) {
    var href = this.getAttribute("href");
    if (href === "#" || !href) return;
    var target = document.querySelector(href);
    if (!target || !overlay) return;
    e.preventDefault();
    overlay.classList.add("is-visible");
    setTimeout(function () {
      target.scrollIntoView({ behavior: "auto", block: "start" });
      setTimeout(function () {
        overlay.classList.remove("is-visible");
      }, settleMs);
    }, fadeInMs);
  }
  navLinks.forEach(function (link) {
    link.addEventListener("click", handleNavClick);
  });

  // Logo link: same page transition to #hero
  var logo = document.querySelector('.header .logo');
  if (logo && overlay) {
    logo.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#hero") return;
      e.preventDefault();
      overlay.classList.add("is-visible");
      setTimeout(function () {
        document.getElementById("hero").scrollIntoView({ behavior: "auto", block: "start" });
        setTimeout(function () {
          overlay.classList.remove("is-visible");
        }, settleMs);
      }, fadeInMs);
    });
  }

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Header scroll state
  var header = document.getElementById("header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Scroll-triggered reveal (Intersection Observer)
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        rootMargin: "0px 0px -60px 0px",
        threshold: 0.1
      }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
