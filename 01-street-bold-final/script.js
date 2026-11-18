/* Clyde Kebab & Grill — Street Bold: menu tabs, nav, reveal, counters, menu board lightbox */
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
  const fromPrice = it => it.sizes ? Math.min(...it.sizes.map(s => s[1])) : it.price;

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
        ${cat.blurb ? `<p class="panel__blurb">${cat.blurb}</p>` : ""}
        <div class="items">
          ${cat.items.map((it, i) => `
            <article class="item${it.img ? "" : " item--compact"}" style="--i:${i}">
              ${it.img ? `<img class="item__img" src="images/dishes/${it.img}.webp" alt="${it.name}" width="200" height="200" loading="lazy" />` : ""}
              <div class="item__body">
                <div class="item__head">
                  <h3 class="item__name">${it.no ? `<span class="item__no">${it.no}</span>` : ""}${it.name}</h3>
                  <span class="item__price">${it.sizes ? `<small>from</small> ` : ""}${fmtPrice(fromPrice(it))}</span>
                </div>
                ${it.desc ? `<p class="item__desc">${it.desc}</p>` : ""}
                ${it.sizes ? `<div class="item__sizes">${it.sizes.map(([s, p]) => `<span><small>${s}</small>${fmtPrice(p)}</span>`).join("")}</div>` : ""}
                ${it.tags.length ? `<div class="item__tags">${it.tags.map(t => `<span class="chip chip--${t}">${TAG_LABEL[t]}</span>`).join("")}</div>` : ""}
              </div>
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

  /* ---------- menu board lightbox ---------- */
  const lightbox = $("#lightbox"), lightboxImg = $("#lightboxImg");
  $$(".board").forEach(b => b.addEventListener("click", () => {
    lightboxImg.src = b.dataset.full; lightboxImg.alt = b.querySelector("img").alt;
    lightbox.showModal();
  }));
  lightbox.addEventListener("click", e => { if (e.target !== lightboxImg) lightbox.close(); });

  /* ---------- grand opening promo (window.PROMO is set in <head>) ---------- */
  const P = window.PROMO;
  const pop = $("#promoPop");
  if (P && pop && !document.documentElement.classList.contains("promo-over")) {
    const start = Date.parse(P.start), end = Date.parse(P.end);
    const shorts = $$("[data-promo-short]"), clock = $("[data-promo-clock]"), flag = $("[data-promo-flag]");
    const pad = n => String(n).padStart(2, "0");
    let phase = "", timer = 0;

    const tick = () => {
      const now = P.now();
      if (now >= end) { // promo is over: hide everything, stop ticking
        document.documentElement.classList.add("promo-over");
        if (pop.open) pop.close();
        clearInterval(timer);
        return;
      }
      if (now >= start) {
        if (phase !== "live") {
          phase = "live";
          document.documentElement.classList.add("promo-live");
          shorts.forEach(el => { el.textContent = "On now till close!"; });
          clock.innerHTML = '<span class="promo-pop__live">On now! Till close</span>';
          flag.textContent = "On now!";
        }
        return;
      }
      phase = "soon";
      const t = Math.floor((start - now) / 1000);
      const d = Math.floor(t / 86400), h = Math.floor(t / 3600) % 24, m = Math.floor(t / 60) % 60, sec = t % 60;
      const short = "Starts in " + (d ? d + "d " : "") + pad(h) + "h " + pad(m) + "m" + (d ? "" : " " + pad(sec) + "s");
      shorts.forEach(el => { el.textContent = short; });
      clock.innerHTML = [[d, "days"], [h, "hrs"], [m, "mins"], [sec, "secs"]]
        .map(([v, l]) => '<span>' + pad(v) + '<small>' + l + '</small></span>').join("");
      clock.setAttribute("aria-label", short);
    };
    tick();
    timer = setInterval(tick, 1000);

    const openPop = () => { if (!pop.open && !document.documentElement.classList.contains("promo-over")) pop.showModal(); };
    $$("[data-promo-open]").forEach(b => b.addEventListener("click", openPop));
    $$(".promo-pop__close, [data-promo-close]", pop).forEach(b => b.addEventListener("click", () => pop.close()));
    pop.addEventListener("click", e => { if (e.target === pop) pop.close(); }); // click on the backdrop

    // the floating badge steps aside while the hero offer (same message) is on screen, so it never covers the hero buttons
    const badge = $(".promo-badge"), heroDeal = $(".opening-deal");
    if (badge && heroDeal && "IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => badge.classList.toggle("is-tucked", e.isIntersecting)).observe(heroDeal);
    }

    // pops up by itself once per browser session; the banner and badge stay on screen regardless
    let seen = false;
    try { seen = sessionStorage.getItem("promoSeen") === "1"; sessionStorage.setItem("promoSeen", "1"); } catch (e) { /* storage blocked */ }
    if (!seen) setTimeout(openPop, 1200);
  }

  /* ---------- misc ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
