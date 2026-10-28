/* Premium interactions. Purely visual: no content is added or changed.
   Runs after main.js. Respects prefers-reduced-motion and touch devices. */
(function () {
  "use strict";
  var d = document;
  var rm = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  var hasIO = "IntersectionObserver" in window;
  if (rm) return;

  /* 1. Reveal big blocks as they scroll into view */
  var blocks = [].slice.call(d.querySelectorAll(
    ".split>div,figure.photo,.cta,.form,.cinfo,.sc-panel,.faq,.mq,.bookrow"));
  if (hasIO && blocks.length) {
    var seen = new Set();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
    blocks.forEach(function (b) {
      if (seen.has(b)) return; seen.add(b);
      b.classList.add("pr"); io.observe(b);
    });
  }

  /* 2. When a card's reveal has finished, switch to snappy hover transitions */
  var rv = [].slice.call(d.querySelectorAll(".rv"));
  if (hasIO && rv.length) {
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          var t = e.target;
          setTimeout(function () { t.classList.add("done"); }, 1300);
          io2.unobserve(t);
        }
      });
    }, { threshold: 0.1 });
    rv.forEach(function (el) { io2.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add("done"); });
  }

  if (!fine) return;

  /* 3. 3D tilt on service cards (corner shapes are not touched) */
  d.querySelectorAll(".sv").forEach(function (c) {
    c.addEventListener("pointermove", function (e) {
      var r = c.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      c.style.setProperty("--ry", (x * 9).toFixed(2) + "deg");
      c.style.setProperty("--rx", (-y * 9).toFixed(2) + "deg");
    });
    c.addEventListener("pointerleave", function () {
      c.style.setProperty("--rx", "0deg");
      c.style.setProperty("--ry", "0deg");
    });
  });

  /* 4. Magnetic buttons + click ripple (delegated, so pop-up buttons work too) */
  d.addEventListener("pointermove", function (e) {
    var b = e.target.closest && e.target.closest(".btn");
    if (!b || b.disabled) return;
    var r = b.getBoundingClientRect();
    var x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
    b.style.setProperty("--bx", Math.max(-7, Math.min(7, x * 0.18)).toFixed(1) + "px");
    b.style.setProperty("--by", Math.max(-5, Math.min(5, y * 0.25)).toFixed(1) + "px");
  });
  d.addEventListener("pointerout", function (e) {
    var b = e.target.closest && e.target.closest(".btn");
    if (b && !b.contains(e.relatedTarget)) { b.style.removeProperty("--bx"); b.style.removeProperty("--by"); }
  });
  d.addEventListener("pointerdown", function (e) {
    var b = e.target.closest && e.target.closest(".btn");
    if (!b || b.disabled) return;
    var r = b.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2;
    var o = d.createElement("span");
    o.className = "rp"; o.setAttribute("aria-hidden", "true");
    o.style.cssText = "width:" + s + "px;height:" + s + "px;left:" + (e.clientX - r.left - s / 2) + "px;top:" + (e.clientY - r.top - s / 2) + "px";
    b.appendChild(o);
    setTimeout(function () { if (o.parentNode) o.parentNode.removeChild(o); }, 750);
  });

  /* 5. Home hero: cursor light + gentle scroll parallax */
  var hero = d.querySelector(".hero-v");
  if (hero) {
    var g = d.createElement("div");
    g.className = "hero-glow"; g.setAttribute("aria-hidden", "true");
    hero.insertBefore(g, hero.firstChild);
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      g.style.setProperty("--hx", (e.clientX - r.left) + "px");
      g.style.setProperty("--hy", (e.clientY - r.top) + "px");
    });
    var bg = hero.querySelector(".hero-bg"), ticking = false;
    var par = function () {
      var y = Math.min(window.scrollY, hero.offsetHeight);
      if (bg) bg.style.transform = "translate3d(0," + (y * 0.12).toFixed(1) + "px,0)";
      hero.style.setProperty("--sy", y.toFixed(0));
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(par); }
    }, { passive: true });
    par();
  }
})();
