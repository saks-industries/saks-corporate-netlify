/* ============================================================================
   Saks Industries — home hero "growing" animation helper.
   The animation itself is CSS (styles.css, "Hero growing animation"); the
   inline gate in index.html <head> opts in with html.hero-grow. This file
   only polishes it, and the page is fine if it never runs:
     - waits for the hero image (and, on phones, for the hero to be on screen)
       so the sequence is seen from the start, then plays it once;
     - wraps the headline verbs (作る / 守る / 育てる, build / protect / grow)
       so each gets its brush stroke in step with its stage, after every
       EN/JA switch;
     - removes html.hero-grow when the sequence ends, leaving the plain image.
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  if (!root.classList.contains("hero-grow")) return;

  var art = document.querySelector(".hero .hero-art");
  var img = art && art.querySelector("img");
  var h1 = document.querySelector(".hero .hero-copy h1");
  if (!art || !img || typeof art.getAnimations !== "function") return;

  var VERBS = /(作る|守る|育てる|build|protect|grow)/;
  var STAGE = { "作る": 1, "build": 1, "守る": 2, "protect": 2, "育てる": 3, "grow": 3 };
  var started = false;
  var done = false;

  function heroAnimations() {
    var list = art.getAnimations({ subtree: true });
    if (h1) list = list.concat(h1.getAnimations({ subtree: true }));
    return list;
  }
  function baseAnimation() {
    return img.getAnimations().filter(function (a) {
      return a.animationName === "hero-grow-base";
    })[0];
  }

  function finish() {
    if (done) return;
    done = true;
    root.classList.remove("hero-grow");
    // Put the headline back to plain text, exactly as i18n.js left it.
    if (h1) {
      h1.querySelectorAll(".hero-verb").forEach(function (span) {
        span.replaceWith(document.createTextNode(span.textContent));
      });
      h1.normalize();
    }
  }

  // Hold everything at frame 0 (faint image) until we are ready to play.
  function hold() {
    heroAnimations().forEach(function (a) { a.pause(); a.currentTime = 0; });
  }
  function play() {
    if (started || done) return;
    started = true;
    heroAnimations().forEach(function (a) { a.currentTime = 0; a.play(); });
  }

  // Keep newly wrapped verbs on the image's clock.
  function syncVerbs() {
    if (!h1) return;
    var base = baseAnimation();
    if (!base) return;
    h1.getAnimations({ subtree: true }).forEach(function (a) {
      if (base.playState === "paused") {
        a.pause();
        a.currentTime = base.currentTime;
      } else if (base.startTime != null) {
        a.startTime = base.startTime; // same timeline origin => same frame
      }
    });
    // Base not started yet (first frame pending): re-sync once it has.
    if (base.playState !== "paused" && base.startTime == null && base.ready) {
      base.ready.then(syncVerbs, function () {});
    }
  }

  function wrapVerbs() {
    if (!h1 || done) return;
    var walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      if (node.parentNode.classList && node.parentNode.classList.contains("hero-verb")) return;
      var parts = node.nodeValue.split(VERBS);
      if (parts.length < 2) return;
      var frag = document.createDocumentFragment();
      parts.forEach(function (part, i) {
        if (!part) return;
        if (i % 2) {
          var span = document.createElement("span");
          span.className = "hero-verb";
          span.setAttribute("data-stage", String(STAGE[part]));
          span.textContent = part;
          frag.appendChild(span);
        } else {
          frag.appendChild(document.createTextNode(part));
        }
      });
      node.parentNode.replaceChild(frag, node);
    });
    syncVerbs();
  }

  img.addEventListener("animationend", function (e) {
    if (e.animationName === "hero-grow-base") finish();
  });
  // Belt and braces: never leave the class behind (e.g. animations cancelled).
  var base = baseAnimation();
  if (base && base.finished) base.finished.then(finish, function () {});

  // i18n.js rewrites the h1 on load and on every EN/JA switch.
  document.addEventListener("saks:langchange", wrapVerbs);
  wrapVerbs();

  function onScreen() {
    var r = art.getBoundingClientRect();
    var vh = window.innerHeight || root.clientHeight;
    return r.top < vh - Math.min(r.height * 0.35, vh * 0.25) && r.bottom > 0;
  }
  var loaded = img.complete && img.naturalWidth > 0;
  var visible = onScreen();
  function maybePlay() { if (loaded && visible) play(); }

  if (loaded && visible) return; // already in sync from first paint
  hold();

  if (!loaded) {
    var ready = function () { loaded = true; maybePlay(); };
    img.addEventListener("load", ready, { once: true });
    img.addEventListener("error", finish, { once: true });
  }
  if (!visible) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        if (!entries.some(function (en) { return en.isIntersecting; })) return;
        io.disconnect();
        visible = true;
        maybePlay();
      }, { threshold: 0.35 });
      io.observe(art);
    } else {
      finish();
    }
  }
})();
