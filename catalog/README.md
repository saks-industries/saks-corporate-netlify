# Product catalog

Source of truth for the products page. These files are Backstage-shaped
`Component` entities (`spec.type: product`) so a future Backstage app can
ingest them with a Location. This repo does not run Backstage or a Catalog API.

The static site does not read YAML at request time. `scripts/build-catalog.mjs`
projects published products into `site/assets/products-catalog.json`, and
`site/products.html` renders that JSON.

## Add a product

1. Copy an existing file in `catalog/products/` to `<name>.yaml` (one entity per file).
2. Set `metadata.name`, `metadata.title`, tags, and the Saks annotations below.
3. Put `saks.industries/published` to `"true"` when the card should appear on the site.
4. Add an image under `site/assets/products/` (see Images).
5. Regenerate and commit the JSON:

```bash
node scripts/build-catalog.mjs
```

`npm run check:catalog` exits non-zero when the JSON does not match the YAML.
GitHub Pages runs `npm run build:catalog` before upload, so a deploy still
matches the YAML if the committed JSON was stale. Commit the JSON anyway so
local preview (`cd site && python3 -m http.server`) works without Node.

## Schema

`apiVersion: backstage.io/v1alpha1`, `kind: Component`, `spec.type: product`.
Do not invent a custom Kind. Annotations are strings, which is what Backstage expects.

| Annotation | Role |
| --- | --- |
| `saks.industries/published` | `"true"` to show the card. Anything else is omitted from the JSON. |
| `saks.industries/blurb-en` / `blurb-ja` | Card body. The EN/JA toggle swaps these. `metadata.description` is the EN fallback. |
| `saks.industries/tag-en` / `tag-ja` | Category chip. Kept off `metadata.tags` so the chip can be bilingual. |
| `saks.industries/image` | Site-relative from the HTML root, no leading slash. Example: `assets/products/zaysay.svg`. |
| `saks.industries/sort-order` | Integer string. Lower comes first. |
| `saks.industries/docs` | Optional GitHub blob URL or path. Not fetched or copied at build time. |

Quote links: `metadata.links[].url` when present (the seeds use `contact.html?subject=<title>`). If links are empty, the build falls back to that same URL.

Entities that are not `spec.type: product`, and products that are not published, are skipped. Other kinds (for example a future Location file) in this folder are ignored by the site build.

## Images

Designer drops final art at `site/assets/products/<name>.png` (or `.svg`) and sets `saks.industries/image` to that path. Until then each product has a simple SVG placeholder. A missing file does not fail the build; the card shows the existing empty `.product-img` state.

## Backstage later

Register a Location that points at these files. No change to the entity shape is required:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Location
metadata:
  name: saks-corporate-products
  description: Product components from the corporate site repo
spec:
  type: url
  targets:
    - https://github.com/saks-industries/saks-corporate-netlify/blob/phase2-site/catalog/products/zaysay-cloud.yaml
    - https://github.com/saks-industries/saks-corporate-netlify/blob/phase2-site/catalog/products/shiftify.yaml
    - https://github.com/saks-industries/saks-corporate-netlify/blob/phase2-site/catalog/products/cordon.yaml
    - https://github.com/saks-industries/saks-corporate-netlify/blob/phase2-site/catalog/products/askif.yaml
    - https://github.com/saks-industries/saks-corporate-netlify/blob/phase2-site/catalog/products/zodem.yaml
```

Relative `./catalog/products/<name>.yaml` targets work the same way once this repo is the Location's base.
