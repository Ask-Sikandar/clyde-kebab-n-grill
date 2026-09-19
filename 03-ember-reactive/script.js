/* Clyde Kebab & Grill — Ember Reactive
   Scroll, hover and click driven interactions. No dependencies. */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const money = p => Number.isInteger(p) ? `$${p}` : `$${p.toFixed(2)}`;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* =============== custom cursor + magnetic =============== */
  const cursor = $("#cursor"), ring = $("#cursorRing");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  if (fine && !reduce) {
    document.body.classList.add("has-cursor");
    window.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    const hoverables = "a, button, .tilt, .dish";
    document.addEventListener("mouseover", e => { if (e.target.closest(hoverables)) ring.classList.add("is-hover"); });
    document.addEventListener("mouseout", e => { if (e.target.closest(hoverables)) ring.classList.remove("is-hover"); });

    /* magnetic buttons: pull toward the pointer */
    $$("[data-magnetic]").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* =============== ember particle canvas =============== */
  const canvas = $("#embers");
  if (canvas && !reduce) {
    const ctx = canvas.getContext("2d");
    let W, H, parts = [], pointer = { x: -999, y: -999 };
    const N = innerWidth < 700 ? 60 : 130;
    const resize = () => { W = canvas.width = canvas.offsetWidth * devicePixelRatio; H = canvas.height = canvas.offsetHeight * devicePixelRatio; };
    resize(); window.addEventListener("resize", resize);
    const make = () => ({
      x: Math.random() * W, y: H + Math.random() * H * 0.3,
      r: (Math.random() * 2.2 + 0.6) * devicePixelRatio,
      vy: (Math.random() * 0.6 + 0.3) * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.4 * devicePixelRatio,
      life: Math.random(), hue: 20 + Math.random() * 30, wob: Math.random() * Math.PI * 2
    });
    for (let i = 0; i < N; i++) { const p = make(); p.y = Math.random() * H; parts.push(p); }
    canvas.addEventListener("mousemove", e => { const r = canvas.getBoundingClientRect(); pointer.x = (e.clientX - r.left) * devicePixelRatio; pointer.y = (e.clientY - r.top) * devicePixelRatio; });
    canvas.addEventListener("mouseleave", () => { pointer.x = pointer.y = -999; });
    let visible = true;
    new IntersectionObserver(([e]) => visible = e.isIntersecting).observe(canvas);
    (function draw(t) {
      requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.wob += 0.02; p.x += p.vx + Math.sin(p.wob) * 0.3; p.y -= p.vy; p.life -= 0.0025;
        /* react to the pointer: embers are pushed away and flare up */
        const dx = p.x - pointer.x, dy = p.y - pointer.y, d = Math.hypot(dx, dy), R = 140 * devicePixelRatio;
        let flare = 0;
        if (d < R) { const f = (1 - d / R); p.x += (dx / d) * f * 6; p.y += (dy / d) * f * 6; flare = f; }
        if (p.y < -10 || p.life <= 0) Object.assign(p, make());
        const a = clamp(p.life * 1.4, 0, 1) * (0.5 + flare * 0.5);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 + flare * 1.5), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue + flare * 20}, 100%, ${60 + flare * 25}%, ${a})`;
        ctx.shadowBlur = 12 * devicePixelRatio; ctx.shadowColor = `hsla(${p.hue}, 100%, 55%, ${a})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    })();
  }

  /* =============== split text =============== */
  $$("[data-split]").forEach(el => {
    const text = el.textContent, delay = el.dataset.delay || 0; el.textContent = "";
    [...text].forEach((ch, i) => {
      const s = document.createElement("span"); s.className = "ch"; s.textContent = ch === " " ? " " : ch;
      s.style.setProperty("--i", i); s.style.setProperty("--d", `${delay}ms`); el.appendChild(s);
    });
  });

  /* =============== scroll driven =============== */
  const nav = $("#nav"), progress = $("#progress");
  const band = $("#band");
  const story = $("#story"), storyImgs = $$(".story__img"), storySteps = $$(".story__step"), storyDots = $$(".story__dots i"), storyNum = $("#storyNum");
  const gallery = $("#gallery"), galleryTrack = $("#galleryTrack");
  const parallaxEls = $$("[data-parallax]");
  let lastY = scrollY, bandX = 0, vel = 0;

  function onScroll() {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("is-scrolled", y > 20);
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    /* band: moves with scroll direction & speed, always drifts slowly */
    vel = y - lastY; lastY = y;

    /* hero parallax */
    if (y < innerHeight * 1.2) parallaxEls.forEach(el => { el.style.transform = `translateY(${y * +el.dataset.parallax}px)` + (el.classList.contains("hero__img") ? " translateY(-50%)" : ""); });

    /* pinned story: 3 steps over the spacer */
    if (story) {
      const r = story.getBoundingClientRect();
      const total = story.offsetHeight - innerHeight;
      const p = clamp(-r.top / total, 0, 0.999);
      const step = Math.floor(p * 3);
      if (!storySteps[step].classList.contains("is-active")) {
        storyImgs.forEach((im, i) => im.classList.toggle("is-active", i === step));
        storySteps.forEach((s, i) => s.classList.toggle("is-active", i === step));
        storyDots.forEach((d, i) => d.classList.toggle("is-active", i === step));
        storyNum.textContent = String(step + 1).padStart(2, "0");
      }
    }

    /* horizontal gallery */
    if (gallery) {
      const r = gallery.getBoundingClientRect();
      const total = gallery.offsetHeight - innerHeight;
      const p = clamp(-r.top / total, 0, 1);
      const dist = galleryTrack.scrollWidth - innerWidth + innerWidth * 0.08;
      galleryTrack.style.transform = `translateX(${-p * dist}px)`;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* band animation loop (drift + scroll velocity) */
  if (band && !reduce) {
    const half = () => band.scrollWidth / 2;
    (function tick() {
      bandX -= 0.6 + clamp(vel, -40, 40) * 0.4; vel *= 0.9;
      const h = half(); if (bandX <= -h) bandX += h; if (bandX > 0) bandX -= h;
      band.style.transform = `translateX(${bandX}px) skewX(${clamp(-vel * 0.6, -12, 12)}deg)`;
      requestAnimationFrame(tick);
    })();
  }

  /* =============== tilt cards =============== */
  $$("[data-tilt]").forEach(card => {
    const shine = $(".tilt__shine", card);
    const move = e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.transform = `rotateY(${(px - 0.5) * 18}deg) rotateX(${(0.5 - py) * 18}deg) translateZ(10px)`;
      shine.style.setProperty("--mx", `${px * 100}%`); shine.style.setProperty("--my", `${py * 100}%`);
    };
    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    card.addEventListener("touchstart", () => card.classList.toggle("is-touched"), { passive: true });
  });

  /* =============== menu + tray =============== */
  const tabs = $("#menuTabs"), grid = $("#menuGrid");
  const TAG = { v: "Veg", gf: "GF", hot: "Spicy", fav: "Popular" };
  const tray = new Map(); // name -> {price, qty}

  function renderCat(cat) {
    grid.innerHTML = cat.items.map((it, i) => `
      <button type="button" class="dish ${tray.has(it.name) ? "is-added" : ""}" style="--i:${i}" data-name="${it.name}" data-price="${it.price}">
        <span class="dish__qty">${tray.get(it.name)?.qty || 0}</span>
        <div class="dish__top"><span class="dish__name">${it.name}</span><span class="dish__price">${money(it.price)}</span></div>
        <p class="dish__desc">${it.desc}</p>
        <div class="dish__foot">
          <div class="dish__tags">${it.tags.map(t => `<span class="tag tag--${t}">${TAG[t]}</span>`).join("")}</div>
          <span class="dish__add" aria-hidden="true">+</span>
        </div>
      </button>`).join("");
  }
  if (window.MENU && tabs) {
    window.MENU.forEach((cat, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "mtab"; b.role = "tab"; b.textContent = cat.name;
      b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      b.addEventListener("click", () => { $$(".mtab", tabs).forEach(t => t.setAttribute("aria-selected", "false")); b.setAttribute("aria-selected", "true"); renderCat(cat); });
      tabs.appendChild(b);
    });
    renderCat(window.MENU[0]);
  }

  const trayEl = $("#tray"), trayToggle = $("#trayToggle"), trayPanel = $("#trayPanel"), trayList = $("#trayList"), trayEmpty = $("#trayEmpty"), trayCount = $("#trayCount"), trayTotal = $("#trayTotal");
  function renderTray() {
    let count = 0, total = 0;
    trayList.innerHTML = "";
    tray.forEach((v, name) => {
      count += v.qty; total += v.qty * v.price;
      const li = document.createElement("li");
      li.innerHTML = `<b>${name}</b><span class="qty"><button type="button" data-dec="${name}" aria-label="Remove one">−</button>${v.qty}<button type="button" data-inc="${name}" aria-label="Add one">+</button></span><span class="price">${money(v.qty * v.price)}</span>`;
      trayList.appendChild(li);
    });
    trayEmpty.hidden = count > 0;
    trayCount.textContent = count; trayTotal.textContent = money(total);
    trayToggle.classList.remove("bounce"); void trayToggle.offsetWidth; trayToggle.classList.add("bounce");
    $$(".dish", grid).forEach(d => { const v = tray.get(d.dataset.name); d.classList.toggle("is-added", !!v); $(".dish__qty", d).textContent = v ? v.qty : 0; });
  }
  function add(name, price, delta = 1) {
    const cur = tray.get(name) || { price, qty: 0 };
    cur.qty += delta;
    if (cur.qty <= 0) tray.delete(name); else tray.set(name, cur);
    renderTray();
  }
  grid.addEventListener("click", e => {
    const d = e.target.closest(".dish"); if (!d) return;
    add(d.dataset.name, +d.dataset.price);
    d.classList.remove("pop"); void d.offsetWidth; d.classList.add("pop");
  });
  trayList.addEventListener("click", e => {
    const inc = e.target.dataset.inc, dec = e.target.dataset.dec;
    if (inc) add(inc, tray.get(inc).price, 1);
    if (dec) add(dec, tray.get(dec).price, -1);
  });
  trayToggle.addEventListener("click", () => { const open = trayPanel.hidden; trayPanel.hidden = !open; trayToggle.setAttribute("aria-expanded", String(open)); });
  $("#trayClear").addEventListener("click", () => { tray.clear(); renderTray(); });

  /* =============== nav / mobile =============== */
  const burger = $("#burger"), links = $("#navLinks");
  burger.addEventListener("click", () => { const o = links.classList.toggle("is-open"); burger.setAttribute("aria-expanded", String(o)); });
  $$("a", links).forEach(a => a.addEventListener("click", () => { links.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }));
  const spy = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) $$("a", links).forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
  }), { rootMargin: "-30% 0px -60% 0px" });
  $$("main section[id]").forEach(s => spy.observe(s));

  /* =============== reveal + counters =============== */
  const rev = new IntersectionObserver(entries => entries.forEach((e, i) => { if (e.isIntersecting) { e.target.style.transitionDelay = `${(i % 3) * 100}ms`; e.target.classList.add("in"); rev.unobserve(e.target); } }), { threshold: .15 });
  $$("[data-reveal]").forEach(el => rev.observe(el));
  const cnt = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, t = +el.dataset.count, start = performance.now();
    const tick = now => { const p = Math.min(1, (now - start) / 1400); el.textContent = Math.round(t * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
    setTimeout(() => requestAnimationFrame(tick), 900); cnt.unobserve(el);
  }), { threshold: .5 });
  $$("[data-count]").forEach(el => cnt.observe(el));

  $("#year").textContent = new Date().getFullYear();
})();
