/* AccessFlow interaction layer. Purely visual: it never touches login, roles or routing.
   It reads `state` and `auth` from app.js only to know when the page changed. */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (sel, root) => (root || document).querySelector(sel);

  const content = $("#content");
  const loginView = $("#loginView");
  const appView = $("#appView");

  /* 1. Cursor spotlight + mouse parallax on the login screen */
  if (fine && !reduce) {
    const glow = document.createElement("div");
    glow.className = "fx-glow";
    document.body.appendChild(glow);
    let x = 0, y = 0, frame = 0;
    addEventListener("mousemove", (event) => {
      x = event.clientX;
      y = event.clientY;
      glow.classList.add("on");
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          glow.style.transform = "translate3d(" + (x - 210) + "px," + (y - 210) + "px,0)";
        });
      }
      if (!loginView.classList.contains("hidden")) {
        loginView.style.setProperty("--px", (x / innerWidth * 2 - 1).toFixed(3));
        loginView.style.setProperty("--py", (y / innerHeight * 2 - 1).toFixed(3));
      }
    }, { passive: true });
    document.addEventListener("mouseleave", () => glow.classList.remove("on"));
  }

  /* 2. 3D tilt on cards. Number = max tilt in degrees. */
  const TILT = [[".login-card", 3], [".denied-card", 6], [".stat", 10], [".promo", 8], [".hero-banner", 5], [".card", 2.5]];
  const SELECTOR = TILT.map((item) => item[0]).join(",");
  let current = null;

  function untilt(el) {
    if (!el) return;
    el.style.transform = "";
    el.classList.remove("fx-tilting");
  }

  if (fine && !reduce) {
    document.addEventListener("mousemove", (event) => {
      const el = event.target.closest ? event.target.closest(SELECTOR) : null;
      if (el !== current) {
        untilt(current);
        current = el;
      }
      if (!el) return;
      const max = TILT.find((item) => el.matches(item[0]))[1];
      const box = el.getBoundingClientRect();
      const px = (event.clientX - box.left) / box.width;
      const py = (event.clientY - box.top) / box.height;
      el.classList.add("fx-tilting");
      el.style.transform = "perspective(900px) rotateX(" + ((0.5 - py) * max).toFixed(2) + "deg) rotateY(" +
        ((px - 0.5) * max * 1.4).toFixed(2) + "deg) translateZ(" + (max > 5 ? 6 : 0) + "px)";
      el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
    }, { passive: true });
    document.addEventListener("mouseout", (event) => {
      if (current && !event.relatedTarget) {
        untilt(current);
        current = null;
      }
    });
  }

  /* 3. Page entrance: stagger indexes, count-up numbers, and the .fx-enter window */
  let enterTimer = 0;
  let barsTimer = 0;

  function setIndexes() {
    content.querySelectorAll("li, tbody tr, .bar").forEach((el) => {
      el.style.setProperty("--i", Array.prototype.indexOf.call(el.parentNode.children, el));
    });
  }

  function countUp() {
    if (reduce) return;
    content.querySelectorAll(".stat strong, .mini-stats b, .donut span").forEach((el) => {
      const match = el.textContent.trim().match(/^(\d+)(.*)$/);
      if (!match) return;
      const end = Number(match[1]);
      const tail = match[2];
      const start = performance.now();
      el.textContent = "0" + tail;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / 1100);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + tail;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  function replay() {
    setIndexes();
    content.classList.remove("fx-enter");
    void content.offsetWidth;
    content.classList.add("fx-enter");
    clearTimeout(enterTimer);
    enterTimer = setTimeout(() => content.classList.remove("fx-enter"), 2200);
    countUp();
  }

  /* Admin promo card gets a small spinning cube */
  const MINI = '<div class="fx-mini" aria-hidden="true"><div class="fx-mini-in"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>';
  function decorate() {
    const promo = $(".promo", content);
    if (promo && !$(".fx-mini", promo)) promo.insertAdjacentHTML("beforeend", MINI);
  }

  let lastKey = "";
  function onRender() {
    decorate();
    const user = typeof auth !== "undefined" ? auth.getState().user : null;
    const page = typeof state !== "undefined" ? state.page : "";
    const key = page + "|" + (user ? user.role : "");
    if (key !== lastKey) {
      lastKey = key;
      replay();
    }
  }

  /* Watch only the direct children of #content, so typing in search or ticking a task never replays the entrance. */
  new MutationObserver(onRender).observe(content, { childList: true });
  if (content.children.length) onRender();

  /* Leaving the app (logout or access denied) means the next dashboard visit plays the entrance again. */
  new MutationObserver(() => {
    if (appView.classList.contains("hidden")) lastKey = "";
  }).observe(appView, { attributes: true, attributeFilter: ["class"] });

  /* Switching the chart range replays only the bars. */
  content.addEventListener("click", (event) => {
    if (event.target.id !== "yearBtn") return;
    setIndexes();
    content.classList.add("fx-bars");
    clearTimeout(barsTimer);
    barsTimer = setTimeout(() => content.classList.remove("fx-bars"), 1300);
  });
})();
