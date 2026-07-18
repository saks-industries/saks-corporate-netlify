# Corporate site wireframe handoff

This branch adds the corporate-site wireframe alongside the current production
site. Existing pages and assets remain unchanged.

## Review

Run the local review server with Node.js 22 or later:

```sh
node --experimental-strip-types server.ts
```

Then open:

- English: <http://localhost:8741/wireframe.html>
- Japanese: <http://localhost:8741/wireframe_ja.html>

The review UI includes four page concepts (Home, About, Products, and Contact),
English/Japanese copy, wireframe/demo modes, annotations, analytics, form
analysis, and a page-flow view.

## Handoff files

- `wireframe.html` — interactive review UI
- `wireframe_ja.html` — Japanese entry point
- `wireframe.css` — wireframe and review-panel styles
- `fragments/` — shared and page-specific markup
- `annotations/` — exported review notes for each page
- `server.ts` — dependency-free local server and annotation-save endpoint

Use the local server rather than opening the HTML as a `file://` URL because
the wireframe loads fragments and annotations with `fetch`.

The **Save** annotation action writes to `annotations/<page>.md` in the working
tree. The **Export .md** action downloads a copy without modifying the tree.
Demo-mode people and product photos are placeholders loaded from Picsum and
therefore require an internet connection; the wireframe itself remains usable
without them.
