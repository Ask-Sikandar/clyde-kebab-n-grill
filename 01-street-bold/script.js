/* Clyde Kebab & Grill — Street Bold: menu tabs, nav, reveal, counters */
(function () {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  /* ---------- menu tabs ---------- */
  const tabsEl = $("#menuTabs");
  const panelsEl = $("#menuPanels");
  const TAG_LABEL = { v: "Veg", gf: "GF", hot: "Spicy", fav: "Popular" };

  function fmtPrice(p) {
    return Number.isInteger(p) ? `$${p}` : `$${p.toFixed(2)}`;
  }

  function renderMenu(menu) {
    menu.forEach((cat, ci) => {
      const tab = document.createElement("button");
      tab.className = "tab";
      tab.type = "button";
      tab.role = "tab";
      tab.id = `tab-${cat.id}`;
      tab.setAttribute("aria-controls", `panel-${cat.id}`);
      tab.setAttribute("aria-selected", ci === 0 ? "true" : "false");
      tab.textContent = cat.name;
      tab.addEventListener("click", () => activate(cat.id));
      tabsEl.appendChild(tab);

      const panel = document.createElement("div");
      panel.className = "panel" + (ci === 0 ? " is-active" : "");
      panel.id = `panel-${cat.id}`;
      panel.role = "tabpanel";
      panel.setAttribute("aria-labelledby", tab.id);
      panel.innerHTML = `
        <p class="panel__blurb">${cat.blurb}</p>
        <div class="items">
          ${cat.items.map((it, i) => `
            <article class="item" style="--i:${i}">
              <div class="item__head">
                <h3 class="item__name">${it.name}</h3>
                <span class="item__price">${fmtPrice(it.price)}</span>
              </div>
              <p class="item__desc">${it.desc}</p>
              ${it.tags.length ? `<div class="item__tags">${it.tags.map(t => `<span class="chip chip--${t}">${TAG_LABEL[t]}</span>`).join("")}</div>` : ""}
            </article>`).join("")}
        </div>`;
      panelsEl.appendChild(panel);
    });
  }

  function activate(id) {
    $$(".tab", tabsEl).forEach(t => t.setAttribute("aria-selected", t.id === `tab-${id}` ? "true" : "false"));
    $$(".panel", panelsEl).forEach(p => {
      const on = p.id === `panel-${id}`;
      p.classList.toggle("is-active", on);
      if (on) { // restart the stagger animation
        $$(".item", p).forEach(el => { el.style.animation = "none"; void el.offsetWidth; el.style.animation = ""; });
      }
    });
  }

  if (window.MENU && tabsEl && panelsEl) renderMenu(window.MENU);

  /* ---------- nav ---------- */
  const nav = $("#nav");
  const burger = $("#burger");
  const links = $("#navLinks");
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("a", links).forEach(a => a.addEventListener("click", () => {
    links.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }));

  const fab = $(".fab");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 10);
    fab.classList.toggle("is-visible", y > 500);
  }, { passive: true });

  /* active link highlight (scrollspy) */
  const sections = $$("main section[id]");
  const navAnchors = $$("a[href^='#']", links);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(s => spy.observe(s));

  /* ---------- reveal on scroll ---------- */
  const revealer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = `${(i % 4) * 80}ms`;
        e.target.classList.add("in");
        revealer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  $$(".reveal").forEach(el => revealer.observe(el));

  /* ---------- count-up stats ---------- */
  const counters = $$("[data-count]");
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, dur = 1200, start = performance.now();
      const tick = now => {
        const p = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => countObs.observe(c));

  /* ---------- misc ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
