/* =========================================================
   Ramanjana Devi Gudi — Portfolio Script
   ========================================================= */

(function () {
  "use strict";

  // ---------- DOM Elements ----------
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const backToTop = document.getElementById("backToTop");

  const linkEls = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const revealEls = document.querySelectorAll(".reveal");


  // ---------- Mobile Menu ----------
  if (hamburger && navLinks) {

    hamburger.addEventListener("click", function () {

      const isOpen = navLinks.classList.toggle("open");

      hamburger.classList.toggle("open", isOpen);

      hamburger.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    // Close menu after clicking a link
    linkEls.forEach(function (link) {

      link.addEventListener("click", function () {

        navLinks.classList.remove("open");
        hamburger.classList.remove("open");

        hamburger.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  // ---------- Navbar + Back To Top ----------
  function handleScroll() {

    const scrollY = window.scrollY;


    if (navbar) {
      navbar.classList.toggle(
        "scrolled",
        scrollY > 8
      );
    }


    if (backToTop) {
      backToTop.classList.toggle(
        "show",
        scrollY > 400
      );
    }


    updateActiveLink();
  }


  window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
  );


  // Run once when page loads
  handleScroll();


  // ---------- Back To Top ----------
  if (backToTop) {

    backToTop.addEventListener(
      "click",
      function () {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  // ---------- Active Navigation Link ----------
  function updateActiveLink() {

    const scrollPosition =
      window.scrollY + 120;

    let currentSection = "";


    sections.forEach(function (section) {

      if (section.offsetTop <= scrollPosition) {
        currentSection = section.id;
      }

    });


    linkEls.forEach(function (link) {

      const href =
        link.getAttribute("href") || "";

      link.classList.toggle(
        "active",
        href === "#" + currentSection
      );

    });

  }


  // ---------- Scroll Reveal ----------
  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "in-view"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    revealEls.forEach(function (element) {
      observer.observe(element);
    });

  } else {

    // Fallback for older browsers
    revealEls.forEach(function (element) {
      element.classList.add("in-view");
    });

  }

})();