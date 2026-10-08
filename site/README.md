# Saks Industries — corporate site (Phase 2, SAK-27)

The **real** corporate site built from the wireframe IA on branch `wire`.
This is the Phase 2 board-review preview. Production cutover is Phase 3.

## Stack choice — and why

**Plain static HTML + CSS + a little vanilla JS. No framework.** Product cards are the one compile step: YAML in `catalog/products/` becomes `assets/products-catalog.json`.

| Decision | Reasoning (founding-engineer lens) |
| --- | --- |
| No framework | *Boring technology* + *legibility*. Four content pages don't need React/Next. Any engineer can open a file and edit it in their first hour. The wireframe was already build-free (`server.ts` + plain HTML); pages stay hand-written HTML. |
| Catalog compile for products | Product cards are not hardcoded. `catalog/products/*.yaml` (Backstage `Component` / `spec.type: product`) is projected to `assets/products-catalog.json` by `node scripts/build-catalog.mjs`. Pages serves the JSON; it does not parse YAML. |
| Static multi-page (`index/about/products/contact.html`) | *Reversibility*. Real URLs, SEO-friendly, no client router to unwind. Trivially portable to any host (GitHub Pages now, Netlify in Phase 3). |
| Client-side i18n (`assets/i18n.js`) | *YAGNI* + mirrors the wireframe's `data-i18n` / `?lang=` mechanism. English chrome is authored inline in the HTML; Japanese lives as overrides in one dictionary. Toggle with the EN/JA switch in the nav, or `?lang=ja`. Product blurbs and tags are the exception: both languages live on the catalog entity and `assets/products-catalog.js` swaps them when `i18n.js` emits `saks:langchange`. |
| Shared nav/footer copied per page | Deliberate small debt: with only 4 pages, hand-maintained chrome beats introducing a templating/build system. If the page count grows, revisit with an includes step or SSG. |

## Layout

```
site/
  index.html        Home  — hero, partners, services, news, CTA
  about.html        About — mission, stats, team
  products.html     Products — grid rendered from the catalog JSON
  contact.html      Contact — Name/Email/Subject/Message + info
  assets/
    styles.css      Design tokens in :root, all component styles
    i18n.js         EN/JA toggle + JA dictionary + preview form handler
    hero-grow.js    Home hero "growing" animation helper (optional; CSS does the work)
    products-catalog.js   Renders product cards; follows the lang toggle
    products-catalog.json Generated. Do not edit by hand.
    products/       Card art PNGs referenced by the catalog
  .nojekyll         Serve files as-is on GitHub Pages
```

## Products catalog

Card copy lives in [`catalog/products/`](../catalog/README.md), not in `products.html`. After editing a product YAML, regenerate and commit the JSON:

```bash
node scripts/build-catalog.mjs
```

GitHub Pages runs the same script before upload. Card art is `assets/products/<name>.png` (site-relative, no leading slash), pointed at by `saks.industries/image`.

## Locked product decisions honored (SAK-9 board)

1. Hero: **Get in touch** primary → `contact.html`; **View products** secondary → `products.html`.
2. Contact fields: **Name / Email / Subject / Message** only.
3. Products grid CTA: **Get a quote**, no pricing on the grid.
4. **EN + JA** throughout, via the nav language toggle.

## Phase 3 status (SAK-33)

- **Hosting:** GitHub Pages is the production host (no `NETLIFY_AUTH_TOKEN`
  available). Custom domain is a pending board DNS action — add `site/CNAME`
  when the domain is provided. Note: `saks.industries` currently serves a
  separate, externally-built (popodesign) site on Netlify that this repo does
  not control — cutover requires a board decision.
- **Contact form:** submits via `mailto:hello@saks.industries` (no backend
  secret in this repo, nothing is silently dropped). To use a hosted form
  backend later, set `CONTACT_ENDPOINT` in `assets/i18n.js`. Note:
  `go.saks.industries` is a Short.io link-shortener, **not** a form endpoint.
- **Legal / social:** Privacy and Terms are published as interim drafts pending
  counsel review. Footer social is GitHub only; LinkedIn stays off until a URL
  is provided.
- Team members and news items are **placeholder demo content** pending real bios/copy.

## Home hero animation

The home hero image plays a quiet three-stage reveal once on load, in step with
the headline: 作る / build (left planting), 守る / protect (scarecrow and sluice
gate), 育てる / grow (the rice rises from the bottom up). It is CSS in
`styles.css` ("Hero growing animation"), opted into by a small inline gate in
`index.html` `<head>`; `assets/hero-grow.js` only waits for the image, syncs the
headline brush strokes, and cleans up. Reduced motion, no JS, print, or an older
browser get the static image. The overlays reuse `hero-tanbo.webp`/`.jpg`, and
the resting state is the plain `<img>` (no opacity, filter, or mask). If the
hero art is ever replaced, re-check the band percentages noted in `styles.css`.

## Run locally

```bash
cd site && python3 -m http.server 8080
# open http://localhost:8080
```
