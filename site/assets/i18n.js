/* ============================================================================
   Saks Industries — lightweight i18n (SAK-27)
   Mirrors the wireframe's approach: [data-i18n] keys + EN/JA toggle + ?lang.
   English is authored inline in the HTML (SEO / no-JS safe); this file holds
   the Japanese overrides only. Toggling captures the EN originals on load and
   restores them when switching back, so there is a single source per language.
   Product names, tags, and blurbs are not in this dictionary — they render
   from assets/products-catalog.json. apply() emits "saks:langchange" so that
   grid can follow the same EN/JA toggle.
   No framework, no build step.
   ========================================================================== */
(function () {
  "use strict";

  // ---- Japanese overrides, keyed by data-i18n / data-i18n-ph ---------------
  var JA = {
    // shared: nav + footer
    "nav.home": "ホーム",
    "nav.about": "会社概要",
    "nav.products": "製品",
    "nav.contact": "お問い合わせ",
    "nav.menu": "メニュー",
    "a11y.skip": "本文へスキップ",
    "a11y.nav": "メインメニュー",
    "a11y.lang": "言語",
    "a11y.home": "Saks Industriesホーム",
    "footer.tagline": "プロトタイプから量産まで、多分野にわたるシステムを設計・構築します。",
    "footer.company": "会社",
    "footer.legal": "規約",
    "footer.privacy": "プライバシーポリシー",
    "footer.terms": "利用規約",
    "footer.news": "ニュース",
    "brand.home": "サックス・インダストリーズ合同会社のホーム",
    "footer.copyright": "© 2026 サックス・インダストリーズ合同会社",
    "cta.getintouch": "お問い合わせ",
    "cta.viewproducts": "製品を見る",
    "cta.getquote": "見積もりを依頼",
    "cta.learnmore": "詳しく見る",

    // meta descriptions — same claims as the English <meta name="description">
    "home.desc": "Saks Industries は、製造・物流・エネルギーなど幅広い分野で、ソフトウェアとハードウェアのシステムを設計・構築・運用します。",
    "about.desc": "Saks Industries は、分野を越えて動くシステムをつくるエンジニア、デザイナー、オペレーターのチームです。",
    "products.desc": "運用の現実に合わせて構成するシステム製品です。まずはお見積もりをご依頼ください。",
    "contact.desc": "プロジェクト、見積もり、パートナーシップについて Saks Industries へお問い合わせください。",
    "privacy.desc": "サックス・インダストリーズ合同会社のプライバシーポリシー。",
    "terms.desc": "サックス・インダストリーズ合同会社の利用規約。",

    // home
    "home.title": "Saks Industries — 多分野のためのシステム",
    "home.hero.eyebrow": "あらゆる分野のためのシステム",
    "home.hero.h1": "システムを<wbr>作る、<wbr>守る、<wbr>育てる",
    "home.hero.art": "田植え、案山子と水門、実る稲穂を描いた田んぼの風景",
    "home.hero.p": "Saks Industries は、製造・物流・エネルギーなど幅広い分野で、ソフトウェアとハードウェアのシステムを設計・構築・運用します。最初の試作から量産規模まで一貫して支援します。",
    "home.partners.label": "信頼できる技術パートナー",
    "home.partners.msft": "Microsoft AI Cloud パートナー",
    "home.partners.aws": "AWS パートナー",
    "home.services.eyebrow": "サービス",
    "home.services.h2": "構想から運用まで、一気通貫で。",
    "home.services.lede": "私たちは、確かに動き続けるシステムの設計・実装・運用を担います。",
    "home.svc1.title": "システムエンジニアリング",
    "home.svc1.desc": "組込みコントローラからクラウド基盤まで、堅牢で観測可能なシステムを設計から納品まで一貫して提供します。",
    "home.svc2.title": "応用AIとデータ",
    "home.svc2.desc": "現場から経営まで使えるモデル・パイプライン・ダッシュボードで、運用データを意思決定に変えます。",
    "home.svc3.title": "プラットフォーム統合",
    "home.svc3.desc": "既存のツールをそのまま活かします。ERP・IoT・レガシーシステムを一つの信頼できる基盤に統合します。",
    "home.news.eyebrow": "最新情報",
    "home.news.h2": "ニュースとアップデート",
    "home.news.tag.company": "会社",
    "home.news.tag.partner": "パートナー",
    "home.news.tag.product": "製品",
    "home.news1.title": "ZaySay Cloudの提供を開始。トレンドになる前に、製品についての声を把握できます。",
    "home.news2.title": "Saks Industries、システム事業をエネルギー分野へ拡大",
    "home.news3.title": "AWS パートナーとして3年連続の認定を更新",
    "home.cta.h2": "つくりたいシステムがありますか？",
    "home.cta.p": "課題をお聞かせください。多分野の実装経験を持つチームが、実現までご一緒します。",

    // about
    "about.title": "会社概要 — Saks Industries",
    "about.hero.eyebrow": "会社概要",
    "about.hero.h1": "信頼される<wbr>システムを、<wbr>エンジニアリング<wbr>する。",
    "about.hero.p": "Saks Industries は、分野を越えて動くシステムをつくる技術者集団です。確かなエンジニアリングと誠実な運用で、長く使われる仕組みを届けます。",
    "about.mission.eyebrow": "私たちの使命",
    "about.mission.h2": "多分野のためのシステムを、設計・構築する。",
    "about.mission.p1": "私たちは、業界固有の複雑さを、動き続ける実用的なシステムへと落とし込みます。試作から量産、そして日々の運用まで一貫して伴走します。",
    "about.mission.p2": "誇大な約束はしません。確かに動くものを、責任を持って届けます。",
    "about.stat1.label": "事業年数",
    "about.stat2.label": "取引企業数",
    "about.stat3.label": "納品プロジェクト数",
    "about.team.eyebrow": "チーム",
    "about.team.h2": "つくる人たち",
    "about.team.lede": "エンジニアリング、デザイン、運用の専門家が集まっています。",
    "about.team1.role": "創業者 兼 CEO",
    "about.team2.role": "最高技術責任者",
    "about.team3.role": "エンジニアリング統括",
    "about.team4.role": "デザイン統括",

    // products
    "products.title": "製品 — Saks Industries",
    "products.hero.eyebrow": "製品",
    "products.hero.h1": "システム製品。",
    "products.hero.p": "監視から意思決定まで。運用の現実に耐える製品群です。ご要望に合わせて構成しますので、まずはお見積もりをご依頼ください。",
    "products.grid.eyebrow": "製品ラインナップ",
    "products.grid.h2": "分散する運用を、ひとつに。",
    "products.img": "製品イメージ",

    // contact
    "contact.title": "お問い合わせ — Saks Industries",
    "contact.hero.eyebrow": "お問い合わせ",
    "contact.hero.h1": "話を聞かせて<wbr>ください。",
    "contact.hero.p": "プロジェクトのご相談、見積もり、パートナーシップのご提案など、お気軽にご連絡ください。",
    "contact.form.h2": "メッセージを送る",
    "contact.form.name": "お名前",
    "contact.form.email": "メールアドレス",
    "contact.form.subject": "件名",
    "contact.form.message": "メッセージ",
    "contact.form.name.ph": "山田 太郎",
    "contact.form.email.ph": "you@example.com",
    "contact.form.subject.ph": "ご用件",
    "contact.form.message.ph": "ご相談内容をご記入ください",
    "contact.form.submit": "メッセージを送信",
    "contact.form.note": "通常2営業日以内にご返信します。",
    "contact.form.ok": "メールアプリを起動しました。内容をご確認のうえ送信してください。起動しない場合は、こちらまで直接ご連絡ください：",
    "contact.info.office.title": "本社",
    "contact.info.office.line": "〒100-0005 東京都千代田区丸の内1-1",
    "contact.info.email.title": "メール",
    "contact.info.hours.title": "受付時間",
    "contact.info.hours.line": "平日 9:00–18:00（日本時間）",
    "contact.info.partners": "テクノロジーパートナー",
    "contact.info.label": "連絡先",
    "contact.form.required": "必須",
    "contact.form.optional": "任意",
    "contact.form.error": "必須項目を入力してから送信してください。",

    // privacy policy
    "privacy.title": "プライバシーポリシー — Saks Industries",
    "privacy.eyebrow": "法的情報",
    "privacy.h1": "プライバシーポリシー",
    "privacy.updated": "最終更新：2026年8月",
    "privacy.notice": "本ポリシーは個人情報の保護に関する法律（個人情報保護法）に基づく暫定文書であり、正式公表前に法務レビューを受ける予定です。",
    "privacy.s1.h": "1. 個人情報取扱事業者",
    "privacy.s1.p": "サックス・インダストリーズ合同会社（以下「当社」）が本ポリシーに責任を持つ個人情報取扱事業者です。お問い合わせ先：hello@saks.industries",
    "privacy.s2.h": "2. 収集する個人情報",
    "privacy.s2.p": "当社は、お問い合わせフォームまたはその他の手段でご連絡いただく際に、お名前・メールアドレス・メッセージ内容などの個人情報をご提供いただく場合があります。",
    "privacy.s3.h": "3. 利用目的",
    "privacy.s3.p": "収集した個人情報は、お問い合わせへの対応、サービスの提供・改善のみに利用します。収集の文脈から合理的に予測できる範囲を超えて利用することはありません。",
    "privacy.s4.h": "4. 第三者への提供",
    "privacy.s4.p": "当社は個人情報を販売・賃貸しません。守秘義務を負う業務委託先（メールインフラ等）または法令に基づく場合に限り共有することがあります。",
    "privacy.s5.h": "5. 安全管理措置",
    "privacy.s5.p": "個人情報の漏えい・滅失・毀損を防ぐため、適切な技術的・組織的安全管理措置を講じています。",
    "privacy.s6.h": "6. 開示・訂正・削除等のご請求（個人情報保護法）",
    "privacy.s6.p": "個人情報保護法に基づき、当社が保有する個人情報の開示・訂正・追加・削除・利用停止をご請求いただけます。hello@saks.industries までご連絡ください。法定の期限内に対応いたします。",
    "privacy.s7.h": "7. クッキー・アナリティクス",
    "privacy.s7.p": "現在、本サイトはトラッキングクッキーや第三者アナリティクスを使用していません。変更が生じる場合は本ポリシーを改定します。",
    "privacy.s8.h": "8. 本ポリシーの変更",
    "privacy.s8.p": "本ポリシーは随時改定することがあります。重要な変更はこのページでお知らせします。改定後も本サイトをご利用いただくことで、変更後のポリシーに同意したものとみなします。",
    "privacy.s9.h": "9. お問い合わせ",
    "privacy.s9.p": "本ポリシーまたは個人情報に関するご質問は hello@saks.industries までお寄せください。",

    // terms of use
    "terms.title": "利用規約 — Saks Industries",
    "terms.eyebrow": "法的情報",
    "terms.h1": "利用規約",
    "terms.updated": "最終更新：2026年8月",
    "terms.notice": "本規約は日本法に基づく暫定草案であり、正式公表前に法務レビューを受ける予定です。",
    "terms.s1.h": "1. 同意",
    "terms.s1.p": "本ウェブサイト（以下「本サイト」）にアクセスまたは利用することにより、本利用規約に同意したものとみなします。同意いただけない場合は、本サイトのご利用をお控えください。",
    "terms.s2.h": "2. 運営者",
    "terms.s2.p": "本サイトはサックス・インダストリーズ合同会社が運営しています。お問い合わせ先：hello@saks.industries",
    "terms.s3.h": "3. 利用条件",
    "terms.s3.p": "本サイトは合法的な目的にのみご利用ください。当社の書面による事前承諾なく、本サイトのコンテンツを複製・再配布・商業目的で利用することを禁じます。",
    "terms.s4.h": "4. 知的財産権",
    "terms.s4.p": "本サイト上のすべてのコンテンツ（テキスト・画像・ロゴ・ソフトウェア等）は、サックス・インダストリーズ合同会社またはそのライセンサーに帰属し、適用される知的財産法により保護されています。",
    "terms.s5.h": "5. 免責事項",
    "terms.s5.p": "本サイトは「現状有姿」で提供されます。当社は、本サイトの中断・誤り・有害なコンポーネントの不存在について、明示・黙示を問わず保証しません。",
    "terms.s6.h": "6. 責任の制限",
    "terms.s6.p": "適用法令が許容する範囲において、サックス・インダストリーズ合同会社は本サイトのご利用に起因する間接的・付随的・結果的損害について責任を負いません。",
    "terms.s7.h": "7. 準拠法・管轄裁判所",
    "terms.s7.p": "本規約は日本法に準拠します。紛争が生じた場合、東京地方裁判所を第一審の専属的合意管轄裁判所とします。",
    "terms.s8.h": "8. 変更",
    "terms.s8.p": "本規約はいつでも改定することがあります。改定後も本サイトをご利用いただくことで、変更後の規約に同意したものとみなします。定期的にご確認ください。",
    "terms.s9.h": "9. お問い合わせ",
    "terms.s9.p": "本規約に関するご質問は hello@saks.industries までお寄せください。"
  };

  var STORE_KEY = "saks-lang";
  var LANGS = ["en", "ja"];

  function getInitialLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (LANGS.indexOf(q) !== -1) return q;
    try {
      var s = localStorage.getItem(STORE_KEY);
      if (LANGS.indexOf(s) !== -1) return s;
    } catch (e) { /* private mode */ }
    return "en";
  }

  // Capture the authored English so we can restore it when toggling back.
  var enText = new WeakMap();
  var enAttr = new WeakMap();
  var enAria = new WeakMap();

  function apply(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!enText.has(el)) enText.set(el, el.textContent);
      var text = (lang === "ja" && JA[key] != null) ? JA[key] : enText.get(el);
      // <wbr> is a break hint only. Visible copy is unchanged.
      if (text.indexOf("<wbr>") === -1) {
        el.textContent = text;
        return;
      }
      var parts = text.split("<wbr>");
      el.replaceChildren();
      parts.forEach(function (part, i) {
        if (i > 0) el.appendChild(document.createElement("wbr"));
        if (part) el.appendChild(document.createTextNode(part));
      });
    });

    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      if (!enAttr.has(el)) enAttr.set(el, el.getAttribute("placeholder") || "");
      el.setAttribute("placeholder", (lang === "ja" && JA[key] != null) ? JA[key] : enAttr.get(el));
    });

    document.querySelectorAll("[data-i18n-content]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-content");
      if (!enAttr.has(el)) enAttr.set(el, el.getAttribute("content") || "");
      el.setAttribute("content", (lang === "ja" && JA[key] != null) ? JA[key] : enAttr.get(el));
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (!enAria.has(el)) enAria.set(el, el.getAttribute("aria-label") || "");
      el.setAttribute("aria-label", (lang === "ja" && JA[key] != null) ? JA[key] : enAria.get(el));
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-alt");
      if (!enAttr.has(el)) enAttr.set(el, el.getAttribute("alt") || "");
      el.setAttribute("alt", (lang === "ja" && JA[key] != null) ? JA[key] : enAttr.get(el));
    });

    var ogLocale = document.querySelector('meta[property="og:locale"]');
    var ogLocaleAlt = document.querySelector('meta[property="og:locale:alternate"]');
    if (ogLocale) ogLocale.setAttribute("content", lang === "ja" ? "ja_JP" : "en_US");
    if (ogLocaleAlt) ogLocaleAlt.setAttribute("content", lang === "ja" ? "en_US" : "ja_JP");

    // <title> uses data-i18n on a <title data-i18n="..."> when present
    var titleEl = document.querySelector("title[data-i18n]");
    if (titleEl) {
      var tkey = titleEl.getAttribute("data-i18n");
      if (!enText.has(titleEl)) enText.set(titleEl, titleEl.textContent);
      document.title = (lang === "ja" && JA[tkey] != null) ? JA[tkey] : enText.get(titleEl);
    }

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* ignore */ }

    // Product cards listen for this. Page chrome uses data-i18n; catalog copy does not.
    document.dispatchEvent(new CustomEvent("saks:langchange", { detail: { lang: lang } }));
  }

  window.SaksI18n = {
    getLang: function () {
      var current = document.documentElement.lang;
      return LANGS.indexOf(current) !== -1 ? current : "en";
    },
    apply: apply
  };

  function init() {
    apply(getInitialLang());
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { apply(btn.dataset.lang); });
    });

    var navToggle = document.querySelector(".nav-toggle");
    var navBar = document.querySelector(".nav");
    if (navToggle && navBar) {
      var setNavOpen = function (open) {
        navBar.classList.toggle("is-open", open);
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      };
      navToggle.addEventListener("click", function () {
        setNavOpen(navToggle.getAttribute("aria-expanded") !== "true");
      });
      navBar.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () { setNavOpen(false); });
      });
      document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape" || !navBar.classList.contains("is-open")) return;
        setNavOpen(false);
        navToggle.focus();
      });
      window.addEventListener("resize", function () {
        if (window.innerWidth > 900) setNavOpen(false);
      });
    }

    // Prefill the contact subject from ?subject= (products "Get a quote" links).
    var subjectParam = new URLSearchParams(location.search).get("subject");
    var subjectField = document.getElementById("f-subject");
    if (subjectParam && subjectField) subjectField.value = subjectParam;

    // Contact form (SAK-33). No form-backend secret is available in this repo,
    // so submit opens a mailto: to hello@saks.industries — zero backend, works
    // everywhere, nothing is silently dropped. Native HTML5 validation (required
    // + type=email) still blocks a truly empty or malformed submit. Whitespace-only
    // values pass `required`, so the handler checks a trimmed value and shows
    // the same empty-state banner the `invalid` event uses.
    // When the board picks a hosted form backend, set CONTACT_ENDPOINT to its URL
    // and this will POST JSON there instead, falling back to mailto on failure.
    var CONTACT_EMAIL = "hello@saks.industries";
    var CONTACT_ENDPOINT = ""; // board-owned: hosted form backend URL (empty => mailto)
    var REQUIRED_IDS = ["f-name", "f-email", "f-message"];

    var form = document.querySelector("form[data-contact-form]");
    if (form) {
      var fieldById = function (id) { return document.getElementById(id); };
      var val = function (id) {
        var el = fieldById(id);
        return el ? String(el.value || "").trim() : "";
      };
      var isBad = function (el) {
        return !el || !String(el.value || "").trim() || !el.checkValidity();
      };
      var markContactErrors = function () {
        form.classList.add("is-submitted");
        var err = document.getElementById("contact-form-error");
        var ok = form.querySelector("[data-form-ok]");
        if (ok) ok.hidden = true;
        if (err) err.hidden = false;
        REQUIRED_IDS.forEach(function (id) {
          var el = fieldById(id);
          if (!el) return;
          if (isBad(el)) {
            el.setAttribute("aria-invalid", "true");
            el.setAttribute("aria-describedby", "contact-form-error");
          } else {
            el.removeAttribute("aria-invalid");
            el.removeAttribute("aria-describedby");
          }
        });
      };
      var clearContactErrors = function () {
        form.classList.remove("is-submitted");
        var err = document.getElementById("contact-form-error");
        if (err) err.hidden = true;
        REQUIRED_IDS.forEach(function (id) {
          var el = fieldById(id);
          if (!el) return;
          el.removeAttribute("aria-invalid");
          el.removeAttribute("aria-describedby");
        });
      };
      var focusFirstBad = function () {
        for (var i = 0; i < REQUIRED_IDS.length; i++) {
          var el = fieldById(REQUIRED_IDS[i]);
          if (isBad(el)) { el.focus(); return; }
        }
      };

      form.addEventListener("invalid", function () { markContactErrors(); }, true);
      form.addEventListener("input", function () {
        if (!form.classList.contains("is-submitted")) return;
        var anyBad = false;
        REQUIRED_IDS.forEach(function (id) {
          var el = fieldById(id);
          if (!el) return;
          if (isBad(el)) anyBad = true;
        });
        if (!anyBad) clearContactErrors();
        else markContactErrors();
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = val("f-name"), email = val("f-email");
        var subject = val("f-subject") || "Website enquiry";
        var message = val("f-message");
        if (!name || !email || !message || !form.checkValidity()) {
          markContactErrors();
          focusFirstBad();
          return;
        }
        clearContactErrors();
        var ok = form.querySelector("[data-form-ok]");
        var showOk = function () { if (ok) { ok.hidden = false; ok.focus(); } };

        if (CONTACT_ENDPOINT) {
          fetch(CONTACT_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, email: email, subject: subject, message: message })
          }).then(function (r) {
            if (!r.ok) throw new Error("bad status " + r.status);
            showOk(); form.reset();
          }).catch(function () { openMailto(); });
        } else {
          openMailto();
        }

        function openMailto() {
          var body = "Name: " + name + "\nEmail: " + email + "\n\n" + message;
          showOk();
          window.location.href = "mailto:" + CONTACT_EMAIL +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
