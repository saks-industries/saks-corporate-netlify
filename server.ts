import http from 'node:http';
import fs   from 'node:fs';
import path from 'node:path';
import url  from 'node:url';

const ROOT = path.dirname(url.fileURLToPath(import.meta.url));
const PORT = 8741;

const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.md':   'text/markdown',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

function serveStatic(req: http.IncomingMessage, res: http.ServerResponse) {
  const pathname = url.parse(req.url ?? '/').pathname ?? '/';
  const safePath = pathname === '/' ? '/wireframe.html' : pathname;
  const filePath = path.join(ROOT, safePath);

  // Guard against path traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end(); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
    res.end(data);
  });
}

async function saveAnnotation(req: http.IncomingMessage, res: http.ServerResponse) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);

  let page: string, content: string;
  try {
    ({ page, content } = JSON.parse(Buffer.concat(chunks).toString()));
  } catch {
    res.writeHead(400); res.end('Bad JSON'); return;
  }

  // Validate: page must be a simple name — no path traversal
  if (!page || /[/\\.]/.test(page) || !content) {
    res.writeHead(400); res.end('Invalid page'); return;
  }

  const target = path.join(ROOT, 'annotations', `${page}.md`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf-8');

  console.log(`  SAVE  annotations/${page}.md`);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true }));
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.writeHead(204); res.end(); return;
  }

  if (req.method === 'POST' && req.url === '/save-annotation') {
    saveAnnotation(req, res);
  } else {
    serveStatic(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`Wireframe Studio  →  http://localhost:${PORT}/wireframe.html`);
  console.log('Ctrl+C to stop\n');
});
