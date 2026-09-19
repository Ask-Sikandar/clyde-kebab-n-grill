/* Clyde Kebab & Grill — Fresh Modern: menu render, search, scrollspy, builder, carousel */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const TAG = { v: "V", gf: "GF", hot: "🌶 Spicy", fav: "Popular" };
  const money = p => Number.isInteger(p) ? `$${p}` : `$${p.toFixed(2)}`;

  /* ---------- render menu ---------- */
  const body = $("#menuBody"), rail = $("#menuRail"), strip = $("#catStrip");
  if (window.MENU && body) {
    window.MENU.forEach(cat => {
      const sec = document.createElement("section");
      sec.className = "cat"; sec.id = `cat-${cat.id}`;
      sec.innerHTML = `
        <div class="cat__head"><h3>${cat.name}</h3><span class="cat__count">${cat.items.length} items</span></div>
        <p class="cat__blurb">${cat.blurb}</p>
        <div class="dishes">
          ${cat.items.map(it => `
            <article class="dish" data-search="${(it.name + " " + it.desc + " " + it.tags.map(t => TAG[t]).join(" ") + (it.tags.includes("v") ? " vegetarian veg" : "")).toLowerCase()}">
              <div class="dish__body">
                <div class="dish__top"><span class="dish__name">${it.name}</span><span class="dish__price">${money(it.price)}</span></div>
                <p class="dish__desc">${it.desc}</p>
                ${it.tags.length ? `<div class="dish__tags">${it.tags.map(t => `<span class="tag tag--${t}">${TAG[t]}</span>`).join("")}</div>` : ""}
              </div>
            </article>`).join("")}
        </div>`;
      body.appendChild(sec);

      const link = document.createElement("a");
      link.className = "rail-link"; link.href = `#cat-${cat.id}`;
      link.innerHTML = `${cat.name}<small>${cat.items.length}</small>`;
      rail.appendChild(link);

      const chip = document.createElement("a");
      chip.className = "cat-chip"; chip.href = `#cat-${cat.id}`; chip.textContent = cat.name;
      strip.appendChild(chip);
    });
  }

  /* ---------- search ---------- */
  const search = $("#menuSearch"), empty = $("#menuEmpty");
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    let any = false;
    $$(".cat", body).forEach(cat => {
      let visible = 0;
      $$(".dish", cat).forEach(d => {
        const hit = !q || d.dataset.search.includes(q);
        d.classList.toggle("is-hidden", !hit);
        if (hit) visible++;
      });
      cat.classList.toggle("is-hidden", visible === 0);
      if (visible) any = true;
    });
    empty.hidden = any;
  });

  /* ---------- scrollspy for rail + strip ---------- */
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = `#${e.target.id}`;
      $$(".rail-link").forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === id));
      $$(".cat-chip").forEach(a => {
        const on = a.getAttribute("href") === id;
        a.classList.toggle("is-active", on);
        if (on) a.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  $$(".cat", body).forEach(c => spy.observe(c));

  /* header nav spy */
  const navSpy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) $$("#nav a").forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-40% 0px -50% 0px" });
  $$("main > section[id]").forEach(s => navSpy.observe(s));

  /* ---------- header / mobile nav ---------- */
  const header = $("#header"), toggle = $("#menuToggle"), nav = $("#nav");
  window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 8), { passive: true });
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("a", nav).forEach(a => a.addEventListener("click", () => { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }));

  /* ---------- box builder ---------- */
  const form = $("#builderForm");
  const EMOJI = { rice: "🍚", chips: "🍟", salad: "🥗", wrap: "🌯" };
  let lastPrice = null;
  function updateBuilder() {
    const base = form.querySelector("input[name=base]:checked");
    const protein = form.querySelector("input[name=protein]:checked");
    const extras = $$("input[name=extra]:checked", form);
    const total = +base.dataset.price + +protein.dataset.price + extras.reduce((s, e) => s + +e.dataset.price, 0);
    $("#previewEmoji").textContent = EMOJI[base.value];
    $("#previewTitle").textContent = `${base.dataset.label} · ${protein.dataset.label}`;
    $("#previewSub").textContent = extras.length ? extras.map(e => e.dataset.label).join(", ") : "No extras";
    const priceEl = $("#previewPrice");
    priceEl.textContent = money(total);
    if (lastPrice !== null && lastPrice !== total) { priceEl.classList.remove("bump"); void priceEl.offsetWidth; priceEl.classList.add("bump"); }
    lastPrice = total;
  }
  form.addEventListener("change", updateBuilder);
  updateBuilder();

  /* ---------- reviews carousel ---------- */
  const car = $("#carousel");
  const step = () => (car.querySelector(".review")?.getBoundingClientRect().width || 300) + 16;
  $("#revNext").addEventListener("click", () => car.scrollBy({ left: step(), behavior: "smooth" }));
  $("#revPrev").addEventListener("click", () => car.scrollBy({ left: -step(), behavior: "smooth" }));

  /* ---------- reveal + counters ---------- */
  $$(".bento__cell, .review, .dish, .visit__card, .visit__map").forEach(el => el.setAttribute("data-reveal", ""));
  const rev = new IntersectionObserver(entries => entries.forEach((e, i) => {
    if (e.isIntersecting) { e.target.style.transitionDelay = `${(i % 6) * 60}ms`; e.target.classList.add("in"); rev.unobserve(e.target); }
  }), { threshold: .12 });
  $$("[data-reveal]").forEach(el => rev.observe(el));

  const cnt = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, t = +el.dataset.count, start = performance.now();
    const tick = now => { const p = Math.min(1, (now - start) / 1200); el.textContent = Math.round(t * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick); cnt.unobserve(el);
  }), { threshold: .6 });
  $$("[data-count]").forEach(el => cnt.observe(el));

  $("#year").textContent = new Date().getFullYear();
})();
