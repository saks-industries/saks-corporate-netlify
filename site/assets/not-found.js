/* 404 copy only. English stays in 404.html; Japanese is applied here so
   assets/i18n.js can stay untouched. Nav and footer still use i18n.js. */
(function () {
  "use strict";

  var JA = {
    "nf.title": "ページが見つかりません — Saks Industries",
    "nf.h1": "このページは見つかりません。",
    "nf.p": "お探しのページは存在しないか、移動した可能性があります。"
  };

  function apply(lang) {
    document.querySelectorAll("[data-nf]").forEach(function (el) {
      var key = el.getAttribute("data-nf");
      if (!el.hasAttribute("data-nf-en")) el.setAttribute("data-nf-en", el.textContent);
      var text = lang === "ja" && JA[key] != null ? JA[key] : el.getAttribute("data-nf-en");
      el.textContent = text;
      if (el.tagName === "TITLE") document.title = text;
    });
  }

  document.addEventListener("saks:langchange", function (event) {
    var lang = event.detail && event.detail.lang ? event.detail.lang : "en";
    apply(lang);
  });

  function boot() {
    apply(document.documentElement.lang === "ja" ? "ja" : "en");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
