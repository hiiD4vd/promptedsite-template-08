import fs from "node:fs/promises";
import { createHash } from "node:crypto";
const manifest = JSON.parse(
  await fs.readFile(new URL("../src/config/assets.json", import.meta.url)),
);
for (const [key, file] of Object.entries(manifest.files)) {
  const response = await fetch(manifest.baseUrl + "/" + key, {
    headers: { Origin: "http://localhost:3000" },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw Error(`${key}: HTTP ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (
    buffer.length !== file.bytes ||
    createHash("sha256").update(buffer).digest("hex") !== file.sha256
  )
    throw Error("Asset checksum mismatch: " + key);
  if (
    !["*", "http://localhost:3000"].includes(
      response.headers.get("access-control-allow-origin"),
    )
  )
    throw Error("CORS unavailable: " + key);
}
console.log(`Verified ${Object.keys(manifest.files).length} assets.`);
