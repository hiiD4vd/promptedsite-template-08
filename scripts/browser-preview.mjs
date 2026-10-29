import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { build } from "esbuild";
const manifest = JSON.parse(
  await fs.readFile("src/config/assets.json", "utf8"),
);
const folder = process.argv[2] || "dist/preview-media";
const output =
  process.argv[3] || "artifacts/promptedsite-agency-experience-browser.html";
const media = {};
for (const [key, meta] of Object.entries(manifest.files)) {
  const bytes = await fs.readFile(path.join(folder, key));
  if (
    bytes.length !== meta.bytes ||
    createHash("sha256").update(bytes).digest("hex") !== meta.sha256
  )
    throw Error("Invalid asset " + key);
  media[key] = `data:${meta.contentType};base64,${bytes.toString("base64")}`;
}
const index = await fs.readFile("dist/index.html", "utf8");
const styles = [...index.matchAll(/<link[^>]*href="([^"]+\.css)"[^>]*>/g)].map(
  (m) => m[1],
);
let css = (
  await Promise.all(
    styles.map((file) => fs.readFile(path.join("dist", file), "utf8")),
  )
).join("\n");
css = css.replace(
  /(?:https:\/\/cdn\.promptedsite\.com\/templates\/promptedsite-agency-experience\/releases\/[^/]+|\/preview-media)\/([a-zA-Z0-9_./-]+)/g,
  (full, key) => media[key] || full,
);
const result = await build({
  absWorkingDir: process.cwd(),
  bundle: true,
  write: false,
  minify: true,
  format: "iife",
  jsx: "automatic",
  target: "es2020",
  legalComments: "inline",
  define: {
    "process.env.NODE_ENV": '"production"',
    "import.meta.url": '"https://preview.invalid/assets/module.js"',
  },
  stdin: {
    resolveDir: process.cwd(),
    loader: "jsx",
    contents: `
 import {createRoot} from 'react-dom/client';
 import * as THREE from 'three';
 import {embedded} from './src/lib/media';
 import App from './src/App';
 // Resolve embedded binary files locally, including the Draco worker dependencies.
 const original=THREE.FileLoader.prototype.load;
 THREE.FileLoader.prototype.load=function(url,onLoad,onProgress,onError){
  const requested=(this.path||'')+url;
  if(!requested.startsWith('/embedded-media/'))return original.call(this,url,onLoad,onProgress,onError);
  const data=embedded(requested.slice('/embedded-media/'.length));
  this.manager.itemStart(requested);
  queueMicrotask(()=>{try{
   const bytes=Uint8Array.from(atob(data.slice(data.indexOf(',')+1)),c=>c.charCodeAt(0));
   const text=()=>new TextDecoder().decode(bytes);
   const value=this.responseType==='arraybuffer'?bytes.buffer:this.responseType==='json'?JSON.parse(text()):text();
   if(onLoad)onLoad(value);
  }catch(error){if(onError)onError(error);this.manager.itemError(requested);}finally{this.manager.itemEnd(requested);}});
 };
 createRoot(document.getElementById('app')).render(<App/>);
 `,
  },
  plugins: [
    {
      name: "embedded-media",
      setup(builder) {
        builder.onResolve({ filter: /(?:lib\/media)$/ }, () => ({
          path: "media",
          namespace: "embedded",
        }));
        builder.onLoad({ filter: /.*/, namespace: "embedded" }, () => ({
          loader: "js",
          contents: `const media=${JSON.stringify(media)};export const embedded=key=>{if(!media[key])throw Error('Unknown media '+key);return media[key];};export function mediaUrl(key){return key.startsWith('models/')?'/embedded-media/'+key:embedded(key);}export const decoderBase=()=>'/embedded-media/decoders/';export function sceneAssetUrl(source){if(source.includes('coin-single-angled-v2'))return mediaUrl('models/coin-angled-v2.glb');if(source.includes('coin-single-angled-v3'))return mediaUrl('models/coin-angled-v3.glb');throw Error('Unknown scene asset '+source);}`,
        }));
      },
    },
  ],
});
const js = result.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'wasm-unsafe-eval'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; media-src data: blob:; worker-src blob:; connect-src data:;"><title>Promptedsite Agency Experience</title><style>${css.replace(/<\/style/gi, "<\\/style")}</style></head><body id="i6mb"><div id="app"></div><script>${js}</script></body></html>`;
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, html);
console.log(
  `Browser preview: ${output} (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MiB)`,
);
