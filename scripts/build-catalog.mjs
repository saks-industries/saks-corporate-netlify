/**
 * Project catalog/products/*.yaml into site/assets/products-catalog.json.
 *
 * Source files are Backstage Component entities (spec.type: product).
 * The JSON is what the static products page renders — GitHub Pages does not
 * parse YAML. Re-run after editing a product and commit the JSON.
 *
 *   node scripts/build-catalog.mjs
 *   node scripts/build-catalog.mjs --check
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseAllDocuments } from "yaml";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalogDir = join(root, "catalog", "products");
const outFile = join(root, "site", "assets", "products-catalog.json");
const check = process.argv.includes("--check");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function annotation(metadata, key) {
  const annotations = metadata && metadata.annotations;
  if (!annotations || typeof annotations !== "object") return undefined;
  return annotations[`saks.industries/${key}`];
}

function siteRelative(value) {
  if (value == null) return "";
  return String(value).trim().replace(/^\/+/, "");
}

function quoteUrl(entity) {
  const links = entity.metadata && entity.metadata.links;
  if (Array.isArray(links)) {
    const hit = links.find((link) => link && typeof link.url === "string" && link.url.trim());
    if (hit) return hit.url.trim();
  }
  const title = (entity.metadata && (entity.metadata.title || entity.metadata.name)) || "";
  return `contact.html?subject=${encodeURIComponent(title)}`;
}

function loadProducts() {
  let files;
  try {
    files = readdirSync(catalogDir)
      .filter((name) => name.endsWith(".yaml") || name.endsWith(".yml"))
      .sort();
  } catch (err) {
    fail(`cannot read ${catalogDir}: ${err.message}`);
  }

  const products = [];
  for (const file of files) {
    const fullPath = join(catalogDir, file);
    let docs;
    try {
      docs = parseAllDocuments(readFileSync(fullPath, "utf8"));
    } catch (err) {
      fail(`${file}: ${err.message}`);
    }
    if (!docs.length) fail(`${file}: no YAML documents`);

    docs.forEach((doc, index) => {
      if (doc.errors && doc.errors.length) {
        fail(`${file}: ${doc.errors.map((error) => error.message).join("; ")}`);
      }
      const entity = doc.toJS();
      if (entity == null) return;
      const label = docs.length > 1 ? `${file}#${index + 1}` : file;
      const product = toProduct(label, entity);
      if (product) products.push(product);
    });
  }

  products.sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
  if (!products.length) fail("no published products (spec.type=product, saks.industries/published=true)");
  return products;
}

function toProduct(file, entity) {
  if (!entity || typeof entity !== "object" || Array.isArray(entity)) {
    fail(`${file}: expected a YAML mapping`);
  }
  if (entity.kind !== "Component") return null;
  if (entity.apiVersion !== "backstage.io/v1alpha1") {
    fail(`${file}: apiVersion must be backstage.io/v1alpha1`);
  }
  if (!entity.spec || entity.spec.type !== "product") return null;

  const published = annotation(entity.metadata, "published");
  if (String(published) !== "true") return null;

  const metadata = entity.metadata || {};
  const name = typeof metadata.name === "string" ? metadata.name.trim() : "";
  const title = typeof metadata.title === "string" && metadata.title.trim()
    ? metadata.title.trim()
    : name;
  if (!name || !title) fail(`${file}: metadata.name is required`);

  const sortRaw = annotation(metadata, "sort-order");
  const sortOrder = sortRaw == null || String(sortRaw).trim() === ""
    ? 1000
    : Number.parseInt(String(sortRaw), 10);
  if (!Number.isFinite(sortOrder)) fail(`${file}: saks.industries/sort-order must be an integer`);

  const image = siteRelative(annotation(metadata, "image"));
  if (image && !existsSync(join(root, "site", image))) {
    console.warn(`${file}: image not found at site/${image} — the card falls back to the empty product image`);
  }

  const blurbEn = annotation(metadata, "blurb-en") || metadata.description || "";
  return {
    name,
    title,
    description: metadata.description || blurbEn,
    tags: Array.isArray(metadata.tags) ? metadata.tags.map(String) : [],
    tagEn: String(annotation(metadata, "tag-en") || ""),
    tagJa: String(annotation(metadata, "tag-ja") || ""),
    blurbEn: String(blurbEn),
    blurbJa: String(annotation(metadata, "blurb-ja") || ""),
    image,
    docs: siteRelative(annotation(metadata, "docs")),
    quoteUrl: quoteUrl(entity),
    sortOrder,
    lifecycle: entity.spec.lifecycle || "",
    owner: entity.spec.owner || "",
  };
}

const payload = {
  source: "catalog/products",
  products: loadProducts(),
};
const json = `${JSON.stringify(payload, null, 2)}\n`;

if (check) {
  let current = "";
  try {
    current = readFileSync(outFile, "utf8");
  } catch {
    fail("site/assets/products-catalog.json is missing. Run: node scripts/build-catalog.mjs");
  }
  if (current !== json) {
    fail("site/assets/products-catalog.json is stale. Run: node scripts/build-catalog.mjs");
  }
  console.log(`catalog json is up to date (${payload.products.length} products)`);
} else {
  writeFileSync(outFile, json);
  console.log(`wrote ${payload.products.length} products -> site/assets/products-catalog.json`);
}
