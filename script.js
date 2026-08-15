(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- mobile nav ---------------- */
  const nav = document.getElementById("siteNav");
  const menuBtn = document.querySelector(".menu-btn");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("mobile-open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll(".nav nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("mobile-open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------- active nav link on scroll ---------------- */
  const navLinks = [...document.querySelectorAll(".nav nav a")];
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  function updateActiveNav() {
    let current = sections[0];
    const y = window.scrollY + 140;
    for (const s of sections) {
      if (s.offsetTop <= y) current = s;
    }
    navLinks.forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current.id);
    });
  }
  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  /* ---------------- footer year ---------------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- render: timelines ---------------- */
  function renderTimeline(containerId, items) {
    const el = document.getElementById(containerId);
    el.innerHTML = items.map(item => `
      <div class="timeline-item reveal">
        <div class="timeline-head">
          <h3>${item.role}</h3>
          <span class="timeline-org">${item.org}</span>
          <span class="timeline-period">${item.period}</span>
        </div>
        <ul>${item.points.map(p => `<li>${p}</li>`).join("")}</ul>
      </div>
    `).join("");
  }
  renderTimeline("experienceTimeline", EXPERIENCE);
  renderTimeline("educationTimeline", EDUCATION);

  /* ---------------- render: certifications ---------------- */
  const certList = document.getElementById("certList");
  certList.innerHTML = CERTIFICATIONS.map((c, i) => `
    <article class="cert-card">
      <div class="cert-icon">${String(i + 1).padStart(2, "0")}</div>
      <div>
        <h3>${c.title}</h3>
        <p>${c.org} — ${c.desc}</p>
      </div>
    </article>
  `).join("");

  /* ---------------- render: skills ---------------- */
  const skillsGrid = document.getElementById("skillsGrid");
  skillsGrid.innerHTML = SKILLS.map(s => `
    <div class="skill-card">
      <h3>${s.group}</h3>
      <div class="skill-chips">${s.items.map(i => `<span>${i}</span>`).join("")}</div>
    </div>
  `).join("");

  /* ---------------- render: project filters ---------------- */
  const filterBar = document.getElementById("projectFilters");
  filterBar.innerHTML = CATEGORIES.map((c, i) => `
    <button class="filter-btn${i === 0 ? " active" : ""}" data-filter="${c.id}" role="tab" aria-selected="${i === 0}">
      ${c.label}
    </button>
  `).join("");

  /* ---------------- render: project cards ---------------- */
  const grid = document.getElementById("projectGrid");

  function statusBadge(status) {
    if (!status) return "";
    let cls = "";
    if (/in progress/i.test(status)) cls = "progress";
    else if (/team/i.test(status)) cls = "team";
    return `<span class="status-badge ${cls}">${status.split("—")[0].split("(")[0].trim()}</span>`;
  }

  function projectCard(p, index) {
    const num = String(index + 1).padStart(2, "0");
    const hasCaseStudy = !!p.overview;
    return `
      <article class="project-card${p.featured ? " featured" : ""}" data-categories="${p.categories.join(",")}" data-id="${p.id}">
        <div class="project-top">
          <span class="project-number">${num}</span>
          ${statusBadge(p.status)}
        </div>
        <h3>${p.title}</h3>
        <p class="tagline">${p.tagline}</p>
        <div class="tags">${p.tech.map(t => `<span>${t}</span>`).join("")}</div>
        <div class="card-actions">
          <a class="project-link" href="${p.github}" target="_blank" rel="noreferrer">GitHub ↗</a>
          ${p.demo ? `<a class="project-link" href="${p.demo}" target="_blank" rel="noreferrer">Watch Demo ↗</a>` : ""}
          ${hasCaseStudy ? `<button class="card-cta" data-open="${p.id}">Case Study</button>` : ""}
        </div>
      </article>
    `;
  }

  function renderProjects(filter = "all") {
    const filtered = PROJECTS.filter(p => filter === "all" || p.categories.includes(filter));
    grid.classList.add("hide-transition");
    grid.innerHTML = filtered.map((p, i) => projectCard(p, i)).join("");
    // force reflow so the next frame re-enables transitions before observing
    void grid.offsetWidth;
    grid.classList.remove("hide-transition");
    observeReveal(grid.querySelectorAll(".project-card"));
    wireCardEvents();
  }

  filterBar.addEventListener("click", e => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterBar.querySelectorAll(".filter-btn").forEach(b => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-selected", String(b === btn));
    });
    renderProjects(btn.dataset.filter);
  });

  /* ---------------- project modal ---------------- */
  const overlay = document.getElementById("modalOverlay");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  function openModal(id) {
    const p = PROJECTS.find(x => x.id === id);
    if (!p || !p.overview) return;

    modalBody.innerHTML = `
      <h3 id="modalTitle">${p.title}</h3>
      <p class="modal-status">${p.status || ""}</p>
      <p>${p.overview}</p>

      <h4>Problem</h4>
      <p>${p.problem}</p>

      <h4>Solution</h4>
      <p>${p.solution}</p>

      <h4>Architecture</h4>
      <p>${p.architecture}</p>

      <h4>Key Features</h4>
      <ul>${p.features.map(f => `<li>${f}</li>`).join("")}</ul>

      ${p.notes ? `<h4>Notes</h4><p>${p.notes}</p>` : ""}
      ${p.repoIncludes ? `<p><em>${p.repoIncludes}</em></p>` : ""}

      <div class="tags">${p.tech.map(t => `<span>${t}</span>`).join("")}</div>

      <div class="modal-links">
        <a class="btn primary" href="${p.github}" target="_blank" rel="noreferrer">View Repository ↗</a>
        ${p.demo ? `<a class="btn secondary" href="${p.demo}" target="_blank" rel="noreferrer">Watch Demo ↗</a>` : ""}
      </div>
    `;
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("open"));
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => { overlay.hidden = true; }, prefersReducedMotion ? 0 : 250);
  }

  function wireCardEvents() {
    grid.querySelectorAll("[data-open]").forEach(btn => {
      btn.addEventListener("click", () => openModal(btn.dataset.open));
    });
  }

  modalClose.addEventListener("click", closeModal);
  overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !overlay.hidden) closeModal();
  });

  /* ---------------- scroll reveal (IntersectionObserver) ---------------- */
  let io = null;
  function observeReveal(nodeList) {
    if (prefersReducedMotion) {
      nodeList.forEach(n => n.classList.add("in-view"));
      return;
    }
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.staggerDelay || 0;
            setTimeout(() => el.classList.add("in-view"), delay);
            io.unobserve(el);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    }
    nodeList.forEach((el, i) => {
      // stagger only within grids of siblings for a "cascading" entrance
      const parent = el.parentElement;
      if (parent && (parent.id === "projectGrid" || parent.id === "skillsGrid" || parent.id === "certList")) {
        el.dataset.staggerDelay = Math.min(i * 70, 400);
      }
      io.observe(el);
    });
  }

  /* initial render */
  renderProjects("all");
  observeReveal(document.querySelectorAll(".reveal:not(.project-card)"));
  // skills + certs render synchronously above; observe them too
  observeReveal(document.querySelectorAll(".skill-card, .cert-card"));
})();