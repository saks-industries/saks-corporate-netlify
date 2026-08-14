/* ============================================================================
   Saks Industries — lightweight i18n (SAK-27)
   Mirrors the wireframe's approach: [data-i18n] keys + EN/JA toggle + ?lang.
   English is authored inline in the HTML (SEO / no-JS safe); this file holds
   the Japanese overrides only. Toggling captures the EN originals on load and
   restores them when switching back, so there is a single source per language.
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
    "footer.tagline": "プロトタイプから量産まで、多分野にわたるシステムを設計・構築します。",
    "footer.company": "会社",
    "footer.legal": "規約",
    "footer.privacy": "プライバシーポリシー",
    "footer.terms": "利用規約",
    "footer.news": "ニュース",
    "footer.copyright": "© 2026 Saks Industries LLC. All rights reserved.",
    "cta.getintouch": "お問い合わせ",
    "cta.viewproducts": "製品を見る",
    "cta.getquote": "見積もりを依頼",
    "cta.learnmore": "詳しく見る",

    // home
    "home.title": "Saks Industries — 多分野のためのシステム",
    "home.hero.eyebrow": "あらゆる分野のためのシステム",
    "home.hero.h1": "産業を前進させるシステムを、私たちがつくる。",
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
    "home.news1.title": "Saks Industries、システム事業をエネルギー分野へ拡大",
    "home.news2.title": "AWS パートナーとして3年連続の認定を更新",
    "home.news3.title": "統合オペレーション基盤「Atlas」を提供開始",
    "home.cta.h2": "つくりたいシステムがありますか？",
    "home.cta.p": "課題をお聞かせください。多分野の実装経験を持つチームが、実現までご一緒します。",

    // about
    "about.title": "会社概要 — Saks Industries",
    "about.hero.eyebrow": "会社概要",
    "about.hero.h1": "信頼されるシステムを、エンジニアリングする。",
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
    "products.hero.h1": "現場のために設計された、システム製品。",
    "products.hero.p": "監視から意思決定まで。運用の現実に耐える製品群です。ご要望に合わせて構成しますので、まずはお見積もりをご依頼ください。",
    "products.grid.eyebrow": "製品ラインナップ",
    "products.grid.h2": "分散する運用を、ひとつに。",
    "products.p1.tag": "オペレーション基盤",
    "products.p1.name": "Atlas",
    "products.p1.desc": "分散した拠点・ライン・設備を横断して監視・制御。すべてを一つの画面に集約します。",
    "products.p2.tag": "産業用IoT",
    "products.p2.name": "Sentinel",
    "products.p2.desc": "異常検知を組み込んだエッジ〜クラウドのテレメトリ。故障の兆候を、壊れる前に捉えます。",
    "products.p3.tag": "エンジニアリング支援",
    "products.p3.name": "Forge",
    "products.p3.desc": "お客様のチームに入り込む専任システムチーム。ハードウェアとソフトの製品を予定通りに届けます。",
    "products.p4.tag": "応用AI",
    "products.p4.name": "Insight",
    "products.p4.desc": "運用データで学習した意思決定モデルを、現場で本当に使えるダッシュボードとともに提供します。",
    "products.img": "製品イメージ",

    // contact
    "contact.title": "お問い合わせ — Saks Industries",
    "contact.hero.eyebrow": "お問い合わせ",
    "contact.hero.h1": "話を聞かせてください。",
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
    "contact.info.partners": "テクノロジーパートナー"
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

  function apply(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!enText.has(el)) enText.set(el, el.textContent);
      el.textContent = (lang === "ja" && JA[key] != null) ? JA[key] : enText.get(el);
    });

    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      if (!enAttr.has(el)) enAttr.set(el, el.getAttribute("placeholder") || "");
      el.setAttribute("placeholder", (lang === "ja" && JA[key] != null) ? JA[key] : enAttr.get(el));
    });

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
  }

  function init() {
    apply(getInitialLang());
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { apply(btn.dataset.lang); });
    });

    // Prefill the contact subject from ?subject= (products "Get a quote" links).
    var subjectParam = new URLSearchParams(location.search).get("subject");
    var subjectField = document.getElementById("f-subject");
    if (subjectParam && subjectField) subjectField.value = subjectParam;

    // Contact form (SAK-33). No form-backend secret is available in this repo,
    // so submit opens a mailto: to hello@saks.industries — zero backend, works
    // everywhere, nothing is silently dropped. Native HTML5 validation (required
    // + type=email) gates the submit, so this handler only runs on valid input.
    // When the board picks a hosted form backend, set CONTACT_ENDPOINT to its URL
    // and this will POST JSON there instead, falling back to mailto on failure.
    var CONTACT_EMAIL = "hello@saks.industries";
    var CONTACT_ENDPOINT = ""; // board-owned: hosted form backend URL (empty => mailto)

    var form = document.querySelector("form[data-contact-form]");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var val = function (id) {
          var el = document.getElementById(id);
          return el ? String(el.value || "").trim() : "";
        };
        var name = val("f-name"), email = val("f-email");
        var subject = val("f-subject") || "Website enquiry";
        var message = val("f-message");
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
