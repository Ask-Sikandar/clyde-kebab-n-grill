/* Clyde Kebab & Grill — Fresh Modern: menu render, search, scrollspy, deal builder, board lightbox, carousel */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const TAG = { v: "V", gf: "GF", hot: "🌶 Spicy", fav: "Popular" };
  const money = p => Number.isInteger(p) ? `$${p}` : `$${p.toFixed(2)}`;
  const fromPrice = it => it.sizes ? Math.min(...it.sizes.map(s => s[1])) : it.price;

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
            <article class="dish${it.img ? "" : " dish--compact"}" data-search="${((it.no ? `#${it.no} ${it.no} ` : "") + it.name + " " + it.desc + " " + cat.name + " " + it.tags.map(t => TAG[t]).join(" ") + (it.tags.includes("v") ? " vegetarian veg" : "")).toLowerCase()}">
              ${it.img ? `<img class="dish__img" src="images/dishes/${it.img}.webp" alt="${it.name}" width="200" height="200" loading="lazy" />` : ""}
              <div class="dish__body">
                <div class="dish__top">
                  <span class="dish__name">${it.no ? `<span class="dish__no">${it.no}</span>` : ""}${it.name}</span>
                  <span class="dish__price">${it.sizes ? `<small>from</small> ` : ""}${money(fromPrice(it))}</span>
                </div>
                ${it.desc ? `<p class="dish__desc">${it.desc}</p>` : ""}
                ${it.sizes ? `<div class="dish__sizes">${it.sizes.map(([s, p]) => `<span><small>${s}</small>${money(p)}</span>`).join("")}</div>` : ""}
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

  /* ---------- deal builder (prices from the menu boards) ---------- */
  const form = $("#builderForm"), fillingsEl = $("#fillings");
  const FILLINGS = ["Chicken", "Lamb", "Mix", "Falafel"];
  const fillings = ["Chicken", "Chicken", "Chicken", "Chicken"];
  let lastPrice = null, lastCount = 0;

  function renderFillings(count) {
    fillingsEl.innerHTML = Array.from({ length: count }, (_, i) => `
      <div class="filling-row">
        <span class="filling-row__label">Kebab ${i + 1}</span>
        <div class="choices choices--tight">
          ${FILLINGS.map(f => `<label><input type="radio" name="fill-${i}" value="${f}" data-index="${i}"${fillings[i] === f ? " checked" : ""}><span>${f}</span></label>`).join("")}
        </div>
      </div>`).join("");
  }

  function updateBuilder() {
    const deal = form.querySelector("input[name=deal]:checked");
    const count = +deal.value;
    if (count !== lastCount) { renderFillings(count); lastCount = count; }
    $$("#fillings input:checked").forEach(r => { fillings[+r.dataset.index] = r.value; });
    const extras = $$("input[name=extra]:checked", form);
    const total = +deal.dataset.price + extras.reduce((s, e) => s + +e.dataset.price, 0);
    const picked = fillings.slice(0, count);
    $("#previewTitle").textContent = `Deal ${count} · ${count} kebab${count > 1 ? "s" : ""}`;
    $("#previewSub").textContent = [picked.join(", "), "1 chips", `${count} drink${count > 1 ? "s" : ""}`]
      .concat(extras.map(e => `+ ${e.dataset.label}`)).join(" · ");
    const priceEl = $("#previewPrice");
    priceEl.textContent = money(Math.round(total * 100) / 100);
    if (lastPrice !== null && lastPrice !== total) { priceEl.classList.remove("bump"); void priceEl.offsetWidth; priceEl.classList.add("bump"); }
    lastPrice = total;
  }
  form.addEventListener("change", updateBuilder);
  updateBuilder();

  /* ---------- menu board lightbox ---------- */
  const lightbox = $("#lightbox"), lightboxImg = $("#lightboxImg");
  $$(".board").forEach(b => b.addEventListener("click", () => {
    lightboxImg.src = b.dataset.full; lightboxImg.alt = b.querySelector("img").alt;
    lightbox.showModal();
  }));
  lightbox.addEventListener("click", e => { if (e.target !== lightboxImg) lightbox.close(); });

  /* ---------- reviews carousel ---------- */
  const car = $("#carousel");
  const step = () => (car.querySelector(".review")?.getBoundingClientRect().width || 300) + 16;
  $("#revNext").addEventListener("click", () => car.scrollBy({ left: step(), behavior: "smooth" }));
  $("#revPrev").addEventListener("click", () => car.scrollBy({ left: -step(), behavior: "smooth" }));

  /* ---------- reveal + counters ---------- */
  $$(".bento__cell, .review, .dish, .board, .visit__card, .visit__side").forEach(el => el.setAttribute("data-reveal", ""));
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
