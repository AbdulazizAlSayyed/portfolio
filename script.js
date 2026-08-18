(() => {
  "use strict";

  const nav = document.getElementById("siteNav");
  const menuButton = document.querySelector(".menu-btn");
  const navLinks = [...document.querySelectorAll("#primaryNav a")];

  const filterBar = document.getElementById("projectFilters");
  const projectCards = [...document.querySelectorAll(".project-card")];

  const overlay = document.getElementById("modalOverlay");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  function closeMobileNav() {
    if (!nav || !menuButton) return;

    nav.classList.remove("mobile-open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open menu"
    );
  }


  function toggleMobileNav() {
    if (!nav || !menuButton) return;

    const open =
      nav.classList.toggle("mobile-open");

    menuButton.setAttribute(
      "aria-expanded",
      String(open)
    );

    menuButton.setAttribute(
      "aria-label",
      open
        ? "Close menu"
        : "Open menu"
    );
  }


  menuButton?.addEventListener(
    "click",
    toggleMobileNav
  );


  navLinks.forEach(link => {
    link.addEventListener(
      "click",
      closeMobileNav
    );
  });


  document.addEventListener(
    "click",
    event => {
      if (!nav?.classList.contains("mobile-open")) {
        return;
      }

      if (!nav.contains(event.target)) {
        closeMobileNav();
      }
    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {
        closeMobileNav();

        if (
          overlay &&
          !overlay.hidden
        ) {
          closeModal();
        }
      }

    }
  );


  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 900) {
        closeMobileNav();
      }

    },
    {
      passive: true
    }
  );


  /* =========================================================
     ACTIVE NAVIGATION
     ========================================================= */

  const sections =
    navLinks
      .map(link =>
        document.querySelector(
          link.getAttribute("href")
        )
      )
      .filter(Boolean);


  let scrollTicking = false;


  function updateActiveNav() {

    if (
      !sections.length ||
      scrollTicking
    ) {
      return;
    }

    scrollTicking = true;

    requestAnimationFrame(() => {

      const y =
        window.scrollY + 150;

      let current =
        sections[0];


      for (
        const section of sections
      ) {

        if (
          section.offsetTop <= y
        ) {
          current = section;
        }

      }


      navLinks.forEach(link => {

        const active =
          link.getAttribute("href") ===
          `#${current.id}`;


        link.classList.toggle(
          "active",
          active
        );


        if (active) {

          link.setAttribute(
            "aria-current",
            "page"
          );

        } else {

          link.removeAttribute(
            "aria-current"
          );

        }

      });


      scrollTicking = false;

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNav,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    updateActiveNav,
    {
      passive: true
    }
  );


  updateActiveNav();


  /* =========================================================
     FOOTER YEAR
     ========================================================= */

  const year =
    document.getElementById("year");


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =========================================================
     PROJECT FILTERING
     
     IMPORTANT:
     Project cards already exist in index.html.

     JavaScript ONLY controls visibility.

     It does NOT create the cards.
     ========================================================= */

  function applyProjectFilter(filter) {

    projectCards.forEach(card => {

      const categories =
        (
          card.dataset.categories ||
          ""
        ).split(",");


      const visible =
        filter === "all" ||
        categories.includes(filter);


      card.hidden =
        !visible;


      card.setAttribute(
        "aria-hidden",
        String(!visible)
      );

    });

  }


  filterBar?.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          ".filter-btn"
        );


      if (!button) {
        return;
      }


      const filter =
        button.dataset.filter ||
        "all";


      filterBar
        .querySelectorAll(
          ".filter-btn"
        )
        .forEach(item => {

          const active =
            item === button;


          item.classList.toggle(
            "active",
            active
          );


          item.setAttribute(
            "aria-selected",
            String(active)
          );

        });


      applyProjectFilter(
        filter
      );

    }
  );


  /* =========================================================
     CASE STUDY MODAL
     
     The actual case-study information already exists
     inside each project card in index.html.
     ========================================================= */

  let lastFocusedElement = null;


  function openModal(
    projectId,
    trigger
  ) {

    const source =
      document.getElementById(
        `case-${projectId}`
      );


    if (
      !source ||
      !overlay ||
      !modalBody
    ) {
      return;
    }


    lastFocusedElement =
      trigger ||
      document.activeElement;


    const card =
      source.closest(
        ".project-card"
      );


    const title =
      card
        ?.querySelector("h3")
        ?.textContent ||
      "Project case study";


    const status =
      card
        ?.querySelector(
          ".status-badge"
        )
        ?.textContent
        ?.trim() ||
      "";


    modalBody.innerHTML = "";


    const heading =
      document.createElement(
        "h3"
      );


    heading.id =
      "modalTitle";


    heading.textContent =
      title;


    const statusElement =
      document.createElement(
        "p"
      );


    statusElement.className =
      "modal-status";


    statusElement.textContent =
      status;


    const content =
      source.cloneNode(true);


    content.hidden = false;

    content.removeAttribute(
      "id"
    );

    content.classList.remove(
      "case-study"
    );


    modalBody.append(
      heading,
      statusElement,
      content
    );


    overlay.hidden =
      false;


    document.body.classList.add(
      "modal-open"
    );


    requestAnimationFrame(() => {

      overlay.classList.add(
        "open"
      );


      modalClose?.focus();

    });

  }


  function closeModal() {

    if (!overlay) {
      return;
    }


    overlay.classList.remove(
      "open"
    );


    document.body.classList.remove(
      "modal-open"
    );


    const delay =
      prefersReducedMotion
        ? 0
        : 250;


    window.setTimeout(
      () => {

        overlay.hidden =
          true;


        if (modalBody) {

          modalBody.innerHTML =
            "";

        }

      },
      delay
    );


    if (
      lastFocusedElement &&
      typeof lastFocusedElement.focus ===
        "function"
    ) {

      lastFocusedElement.focus();

    }

  }


  projectCards.forEach(
    card => {

      const button =
        card.querySelector(
          "[data-open]"
        );


      button?.addEventListener(
        "click",
        event => {

          openModal(
            event.currentTarget.dataset.open,
            event.currentTarget
          );

        }
      );

    }
  );


  modalClose?.addEventListener(
    "click",
    closeModal
  );


  overlay?.addEventListener(
    "click",
    event => {

      if (
        event.target === overlay
      ) {

        closeModal();

      }

    }
  );


  /* =========================================================
     PROGRESSIVE MOTION
     
     IMPORTANT:
     There is NO hidden initial state.

     If IntersectionObserver fails:
     content stays visible.

     If JavaScript fails:
     content stays visible.

     If reduced motion is enabled:
     content stays visible.
     ========================================================= */

  const animatedElements = [
    ...document.querySelectorAll(
      [
        ".hero-copy > *",
        ".hero-card",
        ".section-heading",
        ".about-grid > *",
        ".timeline-item",
        ".project-card",
        ".skill-card",
        ".cert-card",
        ".github-box",
        ".contact-box"
      ].join(", ")
    )
  ];


  if (
    !prefersReducedMotion &&
    "IntersectionObserver" in window
  ) {

    animatedElements.forEach(
      (element, index) => {

        element.style.setProperty(
          "--reveal-delay",
          `${Math.min(
            index * 25,
            180
          )}ms`
        );


        element.classList.add(
          "enhance-motion"
        );

      }
    );


    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }


              entry.target.classList.add(
                "motion-ready"
              );


              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.08,

          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    animatedElements.forEach(
      element =>
        observer.observe(element)
    );

  }


  /* =========================================================
     ORIENTATION CHANGE
     ========================================================= */

  window.addEventListener(
    "orientationchange",
    () => {

      window.setTimeout(
        () => {

          closeMobileNav();

          updateActiveNav();

        },
        100
      );

    },
    {
      passive: true
    }
  );

})();