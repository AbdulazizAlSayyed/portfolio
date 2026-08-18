(() => {
  "use strict";

  const nav = document.getElementById("siteNav");
  const menuButton = document.querySelector(".menu-btn");
  const navLinks = [...document.querySelectorAll("#primaryNav a")];

  const filterBar = document.getElementById("projectFilters");
  const projectCards = [
    ...document.querySelectorAll(".project-card")
  ];

  const overlay = document.getElementById("modalOverlay");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  let lastFocusedElement = null;


  /* =====================================================
     MOBILE NAV
     ===================================================== */

  function closeMenu() {
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


  function toggleMenu() {
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
    toggleMenu
  );


  navLinks.forEach(link => {
    link.addEventListener(
      "click",
      closeMenu
    );
  });


  document.addEventListener(
    "click",
    event => {
      if (
        nav?.classList.contains("mobile-open") &&
        !nav.contains(event.target)
      ) {
        closeMenu();
      }
    }
  );


  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    },
    { passive: true }
  );


  /* =====================================================
     ACTIVE NAV
     ===================================================== */

  const sections = navLinks
    .map(link =>
      document.querySelector(
        link.getAttribute("href")
      )
    )
    .filter(Boolean);


  function updateActiveNav() {

    const scrollPosition =
      window.scrollY + 160;

    let current =
      sections[0];

    for (const section of sections) {
      if (
        section.offsetTop <=
        scrollPosition
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
  }


  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {

      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });

    },
    { passive: true }
  );


  updateActiveNav();


  /* =====================================================
     FOOTER YEAR
     ===================================================== */

  const year =
    document.getElementById("year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }


  /* =====================================================
     PROJECT FILTER
     
     IMPORTANT:
     Cards already exist in HTML.
     JS ONLY filters them.
     ===================================================== */

  function filterProjects(
    category
  ) {

    projectCards.forEach(card => {

      const categories =
        (
          card.dataset.categories ||
          ""
        )
        .split(",")
        .map(value =>
          value.trim()
        );

      const visible =
        category === "all" ||
        categories.includes(category);

      card.hidden =
        !visible;

    });
  }


  filterBar?.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          ".filter-btn"
        );

      if (!button) return;

      const category =
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

      filterProjects(category);

    }
  );


  /* =====================================================
     CASE STUDY MODAL
     ===================================================== */

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
      card?.querySelector("h3")
        ?.textContent
        ?.trim() ||
      "Project case study";


    const status =
      card?.querySelector(
        ".status-badge"
      )
        ?.textContent
        ?.trim() ||
      "";


    modalBody.replaceChildren();


    const heading =
      document.createElement("h3");

    heading.id =
      "modalTitle";

    heading.textContent =
      title;


    const statusElement =
      document.createElement("p");

    statusElement.className =
      "modal-status";

    statusElement.textContent =
      status;


    const content =
      source.cloneNode(true);

    content.hidden = false;

    content.removeAttribute("id");

    content.classList.remove(
      "case-study"
    );


    modalBody.append(
      heading,
      statusElement,
      content
    );


    overlay.hidden = false;

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

    if (!overlay) return;

    overlay.classList.remove(
      "open"
    );

    document.body.classList.remove(
      "modal-open"
    );


    const delay =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? 0
        : 250;


    window.setTimeout(() => {

      overlay.hidden = true;

      modalBody?.replaceChildren();

    }, delay);


    if (
      lastFocusedElement &&
      typeof lastFocusedElement.focus ===
        "function"
    ) {
      lastFocusedElement.focus();
    }

  }


  projectCards.forEach(card => {

    const button =
      card.querySelector(
        "[data-open]"
      );

    button?.addEventListener(
      "click",
      () => {

        openModal(
          button.dataset.open,
          button
        );

      }
    );

  });


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


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {
        closeModal();
        closeMenu();
      }

    }
  );


})();