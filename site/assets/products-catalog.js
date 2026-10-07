/* ============================================================================
   Products grid — render cards from assets/products-catalog.json.
   Blurbs and category tags follow the EN/JA toggle (saks:langchange from
   i18n.js). Page chrome stays in i18n.js; product copy comes from the catalog.
   ========================================================================== */
(function () {
  "use strict";

  var JA_UNAVAILABLE = "製品情報を読み込めませんでした。";
  var EN_UNAVAILABLE = "Products are temporarily unavailable.";

  function currentLang() {
    if (window.SaksI18n && typeof window.SaksI18n.getLang === "function") {
      return window.SaksI18n.getLang();
    }
    return document.documentElement.lang === "ja" ? "ja" : "en";
  }

  function pick(en, ja, lang) {
    if (lang === "ja" && ja) return ja;
    return en || ja || "";
  }

  function boot() {
    var root = document.querySelector("[data-products-root]");
    if (!root) return;

    var cards = [];

    function paint(lang) {
      cards.forEach(function (card) {
        card.tagEl.textContent = pick(card.product.tagEn, card.product.tagJa, lang);
        card.blurbEl.textContent = pick(card.product.blurbEn, card.product.blurbJa, lang);
      });
    }

    function placeholder() {
      var fallback = document.createElement("div");
      fallback.className = "product-img";
      fallback.setAttribute("data-i18n", "products.img");
      fallback.textContent = "Product image";
      return fallback;
    }

    function mediaFor(product) {
      if (!product.image) return placeholder();
      var img = document.createElement("img");
      img.className = "product-img";
      img.src = product.image;
      img.alt = product.title || product.name || "";
      img.addEventListener("error", function () {
        var fallback = placeholder();
        img.replaceWith(fallback);
        if (window.SaksI18n) window.SaksI18n.apply(window.SaksI18n.getLang());
      });
      return img;
    }

    function render(products) {
      cards = [];
      root.replaceChildren();
      products.forEach(function (product) {
        var article = document.createElement("article");
        article.className = "card product-card";

        var body = document.createElement("div");
        body.className = "product-body";

        var tagEl = document.createElement("span");
        tagEl.className = "tag";

        var heading = document.createElement("h3");
        heading.textContent = product.title || product.name || "";

        var blurbEl = document.createElement("p");

        var cta = document.createElement("a");
        cta.className = "btn btn--primary";
        cta.href = product.quoteUrl || ("contact.html?subject=" + encodeURIComponent(product.title || ""));
        cta.setAttribute("data-i18n", "cta.getquote");
        cta.textContent = "Get a quote";

        body.append(tagEl, heading, blurbEl, cta);
        article.append(mediaFor(product), body);
        root.append(article);
        cards.push({ tagEl: tagEl, blurbEl: blurbEl, product: product });
      });
      paint(currentLang());
      if (window.SaksI18n) window.SaksI18n.apply(window.SaksI18n.getLang());
    }

    document.addEventListener("saks:langchange", function (event) {
      var lang = event.detail && event.detail.lang ? event.detail.lang : currentLang();
      paint(lang);
    });

    fetch("assets/products-catalog.json")
      .then(function (response) {
        if (!response.ok) throw new Error("catalog " + response.status);
        return response.json();
      })
      .then(function (data) {
        var products = data && Array.isArray(data.products) ? data.products : [];
        if (!products.length) throw new Error("empty catalog");
        render(products);
      })
      .catch(function () {
        cards = [];
        root.replaceChildren();
        var message = document.createElement("p");
        message.textContent = currentLang() === "ja" ? JA_UNAVAILABLE : EN_UNAVAILABLE;
        root.append(message);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
