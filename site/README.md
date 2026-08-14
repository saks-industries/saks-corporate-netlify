# Saks Industries — corporate site (Phase 2, SAK-27)

The **real** corporate site built from the wireframe IA on branch `wire`.
This is the Phase 2 board-review preview. Production cutover is Phase 3.

## Stack choice — and why

**Plain static HTML + CSS + a little vanilla JS. No framework, no build step.**

| Decision | Reasoning (founding-engineer lens) |
| --- | --- |
| No framework / no build | *Boring technology* + *legibility*. Four content pages don't need React/Next. Any engineer can open a file and edit it in their first hour. The wireframe was already build-free (`server.ts` + plain HTML); we keep that precedent. |
| Static multi-page (`index/about/products/contact.html`) | *Reversibility*. Real URLs, SEO-friendly, no client router to unwind. Trivially portable to any host (GitHub Pages now, Netlify in Phase 3). |
| Client-side i18n (`assets/i18n.js`) | *YAGNI* + mirrors the wireframe's `data-i18n` / `?lang=` mechanism. English is authored inline in the HTML (works with no JS, good for SEO); Japanese lives as overrides in one dictionary. Toggle with the EN/JA switch in the nav, or `?lang=ja`. |
| Shared nav/footer copied per page | Deliberate small debt: with only 4 pages, hand-maintained chrome beats introducing a templating/build system. If the page count grows, revisit with an includes step or SSG. |

## Layout

```
site/
  index.html        Home  — hero, partners, services, news, CTA
  about.html        About — mission, stats, team
  products.html     Products — 2-col grid, "Get a quote" CTAs
  contact.html      Contact — Name/Email/Subject/Message + info
  assets/
    styles.css      Design tokens in :root, all component styles
    i18n.js         EN/JA toggle + JA dictionary + preview form handler
  .nojekyll         Serve files as-is on GitHub Pages
```

## Locked product decisions honored (SAK-9 board)

1. Hero: **Get in touch** primary → `contact.html`; **View products** secondary → `products.html`.
2. Contact fields: **Name / Email / Subject / Message** only.
3. Products grid CTA: **Get a quote**, no pricing on the grid.
4. **EN + JA** throughout, via the nav language toggle.

## Known Phase-3 follow-ups (not in scope here)

- Contact form has **no backend** yet. Submit shows a preview confirmation; the
  intended endpoint (`go.saks.industries`) is wired in Phase 3.
- Team members and news items are **placeholder demo content** pending real bios/copy.
- Legal (Privacy/Terms) links are placeholders.
- Production hosting/domain (Netlify cutover) is Phase 3.

## Run locally

```bash
cd site && python3 -m http.server 8080
# open http://localhost:8080
```
