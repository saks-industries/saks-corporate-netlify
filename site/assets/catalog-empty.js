/* Visual polish for the catalog loader's existing empty/error paragraph.
   Does not fetch, parse, or reshape catalog data. */
(function () {
  "use strict";

  var EN = "Products are temporarily unavailable.";
  var JA = "製品情報を読み込めませんでした。";

  function message() {
    return document.documentElement.lang === "ja" ? JA : EN;
  }

  function polish() {
    var root = document.querySelector("[data-products-root]");
    if (!root || root.querySelector("article")) return;
    if (root.children.length !== 1 || root.children[0].tagName !== "P") return;
    var note = root.children[0];
    if (note.textContent !== EN && note.textContent !== JA) return;
    note.classList.add("catalog-empty");
    note.setAttribute("role", "status");
    note.textContent = message();
  }

  function boot() {
    var root = document.querySelector("[data-products-root]");
    if (!root) return;
    polish();
    new MutationObserver(polish).observe(root, { childList: true });
    document.addEventListener("saks:langchange", polish);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
