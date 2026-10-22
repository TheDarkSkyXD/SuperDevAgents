// Image generators embed a signed C2PA manifest in a PNG `caBX` chunk. Its
// printable text is a certificate chain and a signature block, which the plugin
// directory's text screen reads as a credential, so no shipped PNG may carry one.
import { expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { walk } from "../tools/validate-skills.mjs";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

function chunkTypes(bytes) {
  const types = [];
  for (let i = 8; i < bytes.length; i += 12 + bytes.readUInt32BE(i)) {
    types.push(bytes.toString("latin1", i + 4, i + 8));
  }
  return types;
}

const pngs = ["assets", "plugins/superdev/assets"].map((dir) => join(repoRoot, dir)).filter(existsSync).flatMap(walk)
  .filter((path) => path.endsWith(".png")).map((path) => relative(repoRoot, path));

test("the distribution contains PNGs to check", () => {
  expect(pngs.length).toBeGreaterThan(0);
});

test.each(pngs)("%s carries no C2PA manifest chunk", (path) => {
  expect(chunkTypes(readFileSync(join(repoRoot, path)))).not.toContain("caBX");
});
