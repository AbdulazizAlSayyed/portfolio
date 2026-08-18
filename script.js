(() => {
  "use strict";

  /*
   * Abdulaziz Al Sayyed — Portfolio
   *
   * IMPORTANT:
   * ---------------------------------------------
   * Portfolio content is stored directly in HTML.
   * This file only provides progressive enhancement:
   *
   * - Mobile navigation
   * - Active navigation
   * - Project filtering
   * - Project case-study modal
   * - Footer year
   *
   * JavaScript is NOT required for content rendering.
   */


  /* =========================================================
     ELEMENTS
     ========================================================= */

  const siteNav = document.getElementById("siteNav");
  const menuButton = document.querySelector(".menu-btn");
  const primaryNav = document.getElementById("primaryNav");

  const navLinks = Array.from(
    document.querySelectorAll("#primaryNav a")
  );

  const projectFilters =
    document.getElementById("projectFilters");

  const projectCards = Array.from(
    document.querySelectorAll(".project-card")
  );

  const modalOverlay =
    document.getElementById("modalOverlay");

  const modalBody =
    document.getElementById("modalBody");

  const modalClose =
    document.getElementById("modalClose");

  const yearElement =
    document.getElementById("year");


  let lastFocusedElement = null;
  let scrollTicking = false;


  /* =========================================================
     FOOTER YEAR
     ========================================================= */

  if (yearElement) {
    yearElement.textContent =
      new Date().getFullYear();
  }


  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  function closeMobileMenu() {
    if (!siteNav || !menuButton) {
      return;
    }

    siteNav.classList.remove("mobile-open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open menu"
    );
  }


  function toggleMobileMenu() {
    if (!siteNav || !menuButton) {
      return;
    }

    const isOpen =
      siteNav.classList.toggle(
        "mobile-open"
      );

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuButton.setAttribute(
      "aria-label",
      isOpen
        ? "Close menu"
        : "Open menu"
    );
  }


  if (menuButton) {
    menuButton.addEventListener(
      "click",
      toggleMobileMenu
    );
  }


  navLinks.forEach(link => {
    link.addEventListener(
      "click",
      closeMobileMenu
    );
  });


  /*
   * Close the mobile menu when clicking
   * outside the navigation.
   */

  document.addEventListener(
    "click",
    event => {
      if (
        !siteNav ||
        !siteNav.classList.contains(
          "mobile-open"
        )
      ) {
        return;
      }

      if (
        !siteNav.contains(
          event.target
        )
      ) {
        closeMobileMenu();
      }
    }
  );


  /*
   * Close mobile menu when returning
   * to desktop size.
   */

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 900) {
        closeMobileMenu();
      }
    },
    {
      passive: true
    }
  );


  /* =========================================================
     ACTIVE NAVIGATION
     ========================================================= */

  const sections = navLinks
    .map(link => {
      const href =
        link.getAttribute("href");

      if (
        !href ||
        !href.startsWith("#")
      ) {
        return null;
      }

      return document.querySelector(
        href
      );
    })
    .filter(Boolean);


  function updateActiveNavigation() {
    if (!sections.length) {
      return;
    }

    const currentPosition =
      window.scrollY + 160;

    let currentSection =
      sections[0];


    sections.forEach(section => {
      if (
        section.offsetTop <=
        currentPosition
      ) {
        currentSection =
          section;
      }
    });


    navLinks.forEach(link => {

      const href =
        link.getAttribute("href");

      const isActive =
        href ===
        `#${currentSection.id}`;


      link.classList.toggle(
        "active",
        isActive
      );


      if (isActive) {

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
  }


  function requestNavigationUpdate() {

    if (scrollTicking) {
      return;
    }

    scrollTicking = true;

    window.requestAnimationFrame(() => {

      updateActiveNavigation();

      scrollTicking = false;

    });
  }


  window.addEventListener(
    "scroll",
    requestNavigationUpdate,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    requestNavigationUpdate,
    {
      passive: true
    }
  );


  updateActiveNavigation();


  /* =========================================================
     PROJECT FILTERING
     =========================================================

     IMPORTANT:

     Project cards already exist inside index.html.

     JavaScript ONLY hides/shows existing cards.

     It does NOT create them.
     ========================================================= */


  function filterProjects(category) {

    projectCards.forEach(card => {

      const rawCategories =
        card.dataset.categories ||
        "";


      const categories =
        rawCategories
          .split(",")
          .map(value =>
            value.trim()
              .toLowerCase()
          )
          .filter(Boolean);


      const normalizedCategory =
        category
          .trim()
          .toLowerCase();


      const shouldShow =
        normalizedCategory === "all" ||
        categories.includes(
          normalizedCategory
        );


      card.hidden =
        !shouldShow;


      /*
       * Accessibility state.
       */

      card.setAttribute(
        "aria-hidden",
        String(!shouldShow)
      );

    });
  }


  if (projectFilters) {

    projectFilters.addEventListener(
      "click",
      event => {

        const button =
          event.target.closest(
            ".filter-btn"
          );


        if (!button) {
          return;
        }


        const category =
          button.dataset.filter ||
          "all";


        /*
         * Update active filter.
         */

        const buttons =
          projectFilters.querySelectorAll(
            ".filter-btn"
          );


        buttons.forEach(
          filterButton => {

            const isActive =
              filterButton ===
              button;


            filterButton.classList.toggle(
              "active",
              isActive
            );


            filterButton.setAttribute(
              "aria-selected",
              String(isActive)
            );

          }
        );


        filterProjects(
          category
        );

      }
    );

  }


  /* =========================================================
     PROJECT CASE STUDY MODAL
     =========================================================

     Each project can contain:

     <div id="case-project-id">

     The button should contain:

     data-open="project-id"

     Example:

     <button data-open="sparkly">
       View case study
     </button>

     ========================================================= */


  function openProjectModal(
    projectId,
    trigger
  ) {

    if (
      !modalOverlay ||
      !modalBody
    ) {
      return;
    }


    const caseStudy =
      document.getElementById(
        `case-${projectId}`
      );


    if (!caseStudy) {
      return;
    }


    lastFocusedElement =
      trigger ||
      document.activeElement;


    /*
     * Get the project card.
     */

    const projectCard =
      caseStudy.closest(
        ".project-card"
      );


    /*
     * Get title.
     */

    const title =
      projectCard
        ?.querySelector("h3")
        ?.textContent
        ?.trim() ||
      "Project Case Study";


    /*
     * Get status.
     */

    const status =
      projectCard
        ?.querySelector(
          ".status-badge"
        )
        ?.textContent
        ?.trim() ||
      "";


    /*
     * Clear old modal content.
     */

    modalBody.replaceChildren();


    /*
     * Create modal title.
     */

    const heading =
      document.createElement(
        "h3"
      );

    heading.id =
      "modalTitle";

    heading.textContent =
      title;


    /*
     * Create status.

     */

    const statusElement =
      document.createElement(
        "p"
      );

    statusElement.className =
      "modal-status";

    statusElement.textContent =
      status;


    /*
     * Clone case-study content.

     * We clone it rather than moving it
     * so the original HTML remains untouched.
     */

    const content =
      caseStudy.cloneNode(true);


    content.hidden =
      false;


    content.removeAttribute(
      "id"
    );


    content.classList.remove(
      "case-study"
    );


    /*
     * Insert everything.
     */

    modalBody.append(
      heading,
      statusElement,
      content
    );


    /*
     * Open modal.
     */

    modalOverlay.hidden =
      false;


    document.body.classList.add(
      "modal-open"
    );


    /*
     * Trigger CSS transition.
     */

    window.requestAnimationFrame(() => {

      modalOverlay.classList.add(
        "open"
      );


      if (modalClose) {
        modalClose.focus();
      }

    });

  }


  function closeProjectModal() {

    if (!modalOverlay) {
      return;
    }


    modalOverlay.classList.remove(
      "open"
    );


    document.body.classList.remove(
      "modal-open"
    );


    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;


    const delay =
      reducedMotion
        ? 0
        : 250;


    window.setTimeout(
      () => {

        modalOverlay.hidden =
          true;


        if (modalBody) {
          modalBody.replaceChildren();
        }

      },
      delay
    );


    /*
     * Return focus to the button
     * that opened the modal.
     */

    if (
      lastFocusedElement &&
      typeof lastFocusedElement.focus ===
        "function"
    ) {

      lastFocusedElement.focus();

    }


    lastFocusedElement =
      null;
  }


  /*
   * Attach modal listeners to
   * project buttons.
   */

  projectCards.forEach(card => {

    const openButton =
      card.querySelector(
        "[data-open]"
      );


    if (!openButton) {
      return;
    }


    openButton.addEventListener(
      "click",
      event => {

        const projectId =
          event.currentTarget
            .dataset
            .open;


        if (!projectId) {
          return;
        }


        openProjectModal(
          projectId,
          event.currentTarget
        );

      }
    );

  });


  /*
   * Close button.
   */

  if (modalClose) {

    modalClose.addEventListener(
      "click",
      closeProjectModal
    );

  }


  /*
   * Click outside modal.
   */

  if (modalOverlay) {

    modalOverlay.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          modalOverlay
        ) {

          closeProjectModal();

        }

      }
    );

  }


  /* =========================================================
     KEYBOARD CONTROLS
     ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      /*
       * Escape closes:
       * - modal
       * - mobile menu
       */

      if (
        event.key ===
        "Escape"
      ) {

        closeProjectModal();

        closeMobileMenu();

      }

    }
  );


  /* =========================================================
     ORIENTATION CHANGE
     ========================================================= */

  window.addEventListener(
    "orientationchange",
    () => {

      window.setTimeout(
        () => {

          closeMobileMenu();

          updateActiveNavigation();

        },
        100
      );

    },
    {
      passive: true
    }
  );


  /* =========================================================
     SAFETY CHECK
     =========================================================

     We deliberately DO NOT add:

       opacity: 0
       display: none
       visibility: hidden

     to content.

     Your HTML remains visible even if:

       - JavaScript fails
       - JavaScript is disabled
       - IntersectionObserver is unavailable
       - PDF renderer executes before JS
       - Screenshot happens immediately
       - Browser is resized
       - Reduced motion is enabled

     ========================================================= */

})();