(() => {
  "use strict";

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     Helpers
     ========================================================= */

  // Supports both normal URLs and accidental Markdown-style URLs.
  // This also fixes existing data.js entries such as:
  // "[https://github.com/user/repo](https://github.com/user/repo)"
  function normalizeUrl(value) {
    if (!value || typeof value !== "string") return "";

    const markdownMatch = value.match(/\]\((https?:\/\/[^)]+)\)/);
    if (markdownMatch) return markdownMatch[1];

    const plainMatch = value.match(/https?:\/\/[^\s"'<>]+/);
    if (plainMatch) return plainMatch[0];

    return value;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  /* =========================================================
     Mobile navigation
     ========================================================= */

  const nav = document.getElementById("siteNav");
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = [...document.querySelectorAll(".nav nav a")];

  function closeMobileNav() {
    if (!nav || !menuBtn) return;

    nav.classList.remove("mobile-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
  }

  function toggleMobileNav() {
    if (!nav || !menuBtn) return;

    const open = nav.classList.toggle("mobile-open");

    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  menuBtn?.addEventListener("click", toggleMobileNav);

  navLinks.forEach(link => {
    link.addEventListener("click", closeMobileNav);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMobileNav();
    }
  });

  // Close mobile navigation if the user clicks outside it.
  document.addEventListener("click", event => {
    if (!nav || !nav.classList.contains("mobile-open")) return;

    if (!nav.contains(event.target)) {
      closeMobileNav();
    }
  });

  // Reset mobile menu when moving back to desktop.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileNav();
    }
  }, { passive: true });

  /* =========================================================
     Active navigation
     ========================================================= */

  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function updateActiveNav() {
    if (!sections.length) return;

    const y = window.scrollY + 150;
    let current = sections[0];

    for (const section of sections) {
      if (section.offsetTop <= y) {
        current = section;
      }
    }

    navLinks.forEach(link => {
      const isActive =
        link.getAttribute("href") === `#${current.id}`;

      link.classList.toggle("active", isActive);
      link.setAttribute("aria-current", isActive ? "page" : "false");
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  /* =========================================================
     Footer year
     ========================================================= */

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* =========================================================
     Timelines
     ========================================================= */

  function renderTimeline(containerId, items = []) {
    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = items.map(item => `
      <div class="timeline-item reveal">
        <div class="timeline-head">
          <h3>${escapeHtml(item.role)}</h3>
          <span class="timeline-org">${escapeHtml(item.org)}</span>
          <span class="timeline-period">${escapeHtml(item.period)}</span>
        </div>
        <ul>
          ${(item.points || []).map(point =>
            `<li>${escapeHtml(point)}</li>`
          ).join("")}
        </ul>
      </div>
    `).join("");
  }

  renderTimeline("experienceTimeline", window.EXPERIENCE || []);
  renderTimeline("educationTimeline", window.EDUCATION || []);

  /* =========================================================
     Certifications
     ========================================================= */

  const certList = document.getElementById("certList");

  if (certList) {
    certList.innerHTML = (window.CERTIFICATIONS || []).map((cert, index) => `
      <article class="cert-card">
        <div class="cert-icon">${String(index + 1).padStart(2, "0")}</div>
        <div>
          <h3>${escapeHtml(cert.title)}</h3>
          <p>${escapeHtml(cert.org)} — ${escapeHtml(cert.desc)}</p>
        </div>
      </article>
    `).join("");
  }

  /* =========================================================
     Skills
     ========================================================= */

  const skillsGrid = document.getElementById("skillsGrid");

  if (skillsGrid) {
    skillsGrid.innerHTML = (window.SKILLS || []).map(skill => `
      <div class="skill-card">
        <h3>${escapeHtml(skill.group)}</h3>
        <div class="skill-chips">
          ${(skill.items || []).map(item =>
            `<span>${escapeHtml(item)}</span>`
          ).join("")}
        </div>
      </div>
    `).join("");
  }

  /* =========================================================
     Project filters
     ========================================================= */

  const filterBar = document.getElementById("projectFilters");

  if (filterBar) {
    filterBar.innerHTML = (window.CATEGORIES || []).map((category, index) => `
      <button
        class="filter-btn${index === 0 ? " active" : ""}"
        data-filter="${escapeHtml(category.id)}"
        role="tab"
        aria-selected="${index === 0}"
        type="button"
      >
        ${escapeHtml(category.label)}
      </button>
    `).join("");
  }

  /* =========================================================
     Project cards
     ========================================================= */

  const grid = document.getElementById("projectGrid");
  let revealObserver = null;

  function statusBadge(status) {
    if (!status) return "";

    let className = "";

    if (/in progress/i.test(status)) {
      className = "progress";
    } else if (/team/i.test(status)) {
      className = "team";
    }

    const visibleStatus = status
      .split("—")[0]
      .split("(")[0]
      .trim();

    return `
      <span class="status-badge ${className}">
        ${escapeHtml(visibleStatus)}
      </span>
    `;
  }

  function projectCard(project, index) {
    const github = normalizeUrl(project.github);
    const demo = normalizeUrl(project.demo);
    const hasCaseStudy = Boolean(project.overview);
    const number = String(index + 1).padStart(2, "0");

    return `
      <article
        class="project-card${project.featured ? " featured" : ""}"
        data-categories="${(project.categories || []).map(escapeHtml).join(",")}"
        data-id="${escapeHtml(project.id)}"
      >
        <div class="project-top">
          <span class="project-number">${number}</span>
          ${statusBadge(project.status)}
        </div>

        <h3>${escapeHtml(project.title)}</h3>

        <p class="tagline">
          ${escapeHtml(project.tagline)}
        </p>

        <div class="tags">
          ${(project.tech || []).map(tech =>
            `<span>${escapeHtml(tech)}</span>`
          ).join("")}
        </div>

        <div class="card-actions">
          ${github ? `
            <a
              class="project-link"
              href="${escapeHtml(github)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          ` : ""}

          ${demo ? `
            <a
              class="project-link"
              href="${escapeHtml(demo)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Demo ↗
            </a>
          ` : ""}

          ${hasCaseStudy ? `
            <button
              class="card-cta"
              data-open="${escapeHtml(project.id)}"
              type="button"
            >
              Case Study
            </button>
          ` : ""}
        </div>
      </article>
    `;
  }

  function renderProjects(filter = "all") {
    if (!grid) return;

    const projects = window.PROJECTS || [];

    const filtered = projects.filter(project =>
      filter === "all" ||
      (project.categories || []).includes(filter)
    );

    grid.innerHTML = filtered
      .map((project, index) => projectCard(project, index))
      .join("");

    observeReveal(grid.querySelectorAll(".project-card"));
    wireCardEvents();
  }

  filterBar?.addEventListener("click", event => {
    const button = event.target.closest(".filter-btn");

    if (!button) return;

    filterBar.querySelectorAll(".filter-btn").forEach(item => {
      const active = item === button;

      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });

    renderProjects(button.dataset.filter || "all");
  });

  /* =========================================================
     Project modal
     ========================================================= */

  const overlay = document.getElementById("modalOverlay");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  let lastFocusedElement = null;

  function openModal(id) {
    const projects = window.PROJECTS || [];
    const project = projects.find(item => item.id === id);

    if (!project || !project.overview || !overlay || !modalBody) {
      return;
    }

    lastFocusedElement = document.activeElement;

    const github = normalizeUrl(project.github);
    const demo = normalizeUrl(project.demo);

    modalBody.innerHTML = `
      <h3 id="modalTitle">${escapeHtml(project.title)}</h3>

      <p class="modal-status">
        ${escapeHtml(project.status || "")}
      </p>

      <p>${escapeHtml(project.overview)}</p>

      ${project.problem ? `
        <h4>Problem</h4>
        <p>${escapeHtml(project.problem)}</p>
      ` : ""}

      ${project.solution ? `
        <h4>Solution</h4>
        <p>${escapeHtml(project.solution)}</p>
      ` : ""}

      ${project.architecture ? `
        <h4>Architecture</h4>
        <p>${escapeHtml(project.architecture)}</p>
      ` : ""}

      ${(project.features || []).length ? `
        <h4>Key Features</h4>
        <ul>
          ${project.features.map(feature =>
            `<li>${escapeHtml(feature)}</li>`
          ).join("")}
        </ul>
      ` : ""}

      ${project.notes ? `
        <h4>Notes</h4>
        <p>${escapeHtml(project.notes)}</p>
      ` : ""}

      ${project.repoIncludes ? `
        <p><em>${escapeHtml(project.repoIncludes)}</em></p>
      ` : ""}

      <div class="tags">
        ${(project.tech || []).map(tech =>
          `<span>${escapeHtml(tech)}</span>`
        ).join("")}
      </div>

      <div class="modal-links">
        ${github ? `
          <a
            class="btn primary"
            href="${escapeHtml(github)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Repository ↗
          </a>
        ` : ""}

        ${demo ? `
          <a
            class="btn secondary"
            href="${escapeHtml(demo)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Demo ↗
          </a>
        ` : ""}
      </div>
    `;

    overlay.hidden = false;
    document.body.classList.add("modal-open");

    requestAnimationFrame(() => {
      overlay.classList.add("open");
      modalClose?.focus();
    });
  }

  function closeModal() {
    if (!overlay) return;

    overlay.classList.remove("open");
    document.body.classList.remove("modal-open");

    const delay = prefersReducedMotion ? 0 : 250;

    setTimeout(() => {
      overlay.hidden = true;
    }, delay);

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  function wireCardEvents() {
    grid?.querySelectorAll("[data-open]").forEach(button => {
      button.addEventListener("click", () => {
        openModal(button.dataset.open);
      });
    });
  }

  modalClose?.addEventListener("click", closeModal);

  overlay?.addEventListener("click", event => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (!overlay || overlay.hidden) return;

    if (event.key === "Escape") {
      closeModal();
    }
  });

  /* =========================================================
     Scroll reveal
     ========================================================= */

  function observeReveal(nodes) {
    const elements = [...nodes];

    if (!elements.length) return;

    if (prefersReducedMotion) {
      elements.forEach(element => {
        element.classList.add("in-view");
      });
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const element = entry.target;
          const delay = Number(element.dataset.staggerDelay || 0);

          window.setTimeout(() => {
            element.classList.add("in-view");
          }, delay);

          revealObserver.unobserve(element);
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      });
    }

    elements.forEach((element, index) => {
      const parent = element.parentElement;

      if (
        parent &&
        (
          parent.id === "projectGrid" ||
          parent.id === "skillsGrid" ||
          parent.id === "certList"
        )
      ) {
        element.dataset.staggerDelay = Math.min(index * 60, 360);
      }

      revealObserver.observe(element);
    });
  }

  /* =========================================================
     Initial render
     ========================================================= */

  renderProjects("all");

  observeReveal(
    document.querySelectorAll(".reveal:not(.project-card)")
  );

  observeReveal(
    document.querySelectorAll(".skill-card, .cert-card")
  );

  /* =========================================================
     Prevent accidental viewport overflow from transformed
     elements on small screens.
     ========================================================= */

  function updateViewportClass() {
    document.documentElement.dataset.viewport =
      window.innerWidth <= 480
        ? "small"
        : window.innerWidth <= 900
          ? "tablet"
          : "desktop";
  }

  updateViewportClass();

  window.addEventListener(
    "resize",
    updateViewportClass,
    { passive: true }
  );
})();
