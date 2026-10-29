import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(
  process.argv.includes("--root")
    ? process.argv[process.argv.indexOf("--root") + 1]
    : "dist",
);
const port = Number(process.env.PORT || 3181);
const types = {
  ".wasm": "application/wasm",
  ".ttf": "font/ttf",
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".glb": "model/gltf-binary",
  ".hdr": "image/vnd.radiance",
  ".mp3": "audio/mpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
};
http
  .createServer((req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      let file = path.resolve(root, "." + decodeURIComponent(url.pathname));
      if (file !== root && !file.startsWith(root + path.sep)) {
        res.writeHead(403).end();
        return;
      }
      if (fs.existsSync(file) && fs.statSync(file).isDirectory())
        file = path.join(file, "index.html");
      if (!fs.existsSync(file)) {
        res.writeHead(404).end("Not found");
        return;
      }
      const size = fs.statSync(file).size;
      const headers = {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
        "Accept-Ranges": "bytes",
        "Cache-Control": "no-cache",
      };
      const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
      if (range) {
        const start = Number(range[1]),
          end = range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
        if (start >= size || end < start) {
          res.writeHead(416, { "Content-Range": `bytes */${size}` }).end();
          return;
        }
        res.writeHead(206, {
          ...headers,
          "Content-Length": end - start + 1,
          "Content-Range": `bytes ${start}-${end}/${size}`,
        });
        if (req.method === "HEAD") res.end();
        else fs.createReadStream(file, { start, end }).pipe(res);
      } else {
        res.writeHead(200, { ...headers, "Content-Length": size });
        if (req.method === "HEAD") res.end();
        else fs.createReadStream(file).pipe(res);
      }
    } catch {
      res.writeHead(400).end("Bad request");
    }
  })
  .listen(port, process.env.HOST || "127.0.0.1", () =>
    console.log(`Preview: http://${process.env.HOST || "127.0.0.1"}:${port}`),
  );
