#!/usr/bin/env bun
import { execFileSync } from "node:child_process";
import { chmodSync, closeSync, cpSync, mkdtempSync, openSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { walk } from "./validate-skills.mjs";

if (process.platform === "win32") throw new Error("Run this POSIX fixture check inside WSL, Linux, or macOS. Use bun run test for native Windows checks.");
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fixture = mkdtempSync(join(tmpdir(), "superdev-verify-"));
cpSync(root, fixture, { recursive: true, filter: (path) => ![".git", "node_modules"].includes(basename(path)) && !basename(path).startsWith(".superdev-") });
for (const file of walk(fixture)) chmodSync(file, 0o644);
const log = join(root, ".superdev-posix.log");
const fd = openSync(log, "w");
const scripts = join(fixture, "plugins/superdev/skills/superdev-mode/scripts");
const commands = [
  { cwd: fixture, args: ["install", "--frozen-lockfile"] },
  { cwd: fixture, args: ["run", "check"] },
  { cwd: fixture, args: ["run", "lint"] },
  { cwd: fixture, args: ["test", "tests/"] },
  { cwd: scripts, args: ["install", "--frozen-lockfile"] },
  { cwd: scripts, args: ["run", "typecheck"] },
  { cwd: scripts, args: ["test", "orch", "watch-pr", "check-plan.test.ts"] },
];
try {
  for (const { cwd, args } of commands) {
    console.log(`Running ${args.join(" ")} in ${cwd === fixture ? "the isolated distribution" : "the runtime scripts"}`);
    execFileSync(process.execPath, args, { cwd, stdio: ["ignore", fd, fd], env: { ...process.env, PATH: `${dirname(process.execPath)}:${process.env.PATH}` } });
  }
  console.log("All POSIX checks passed.");
} catch (error) {
  process.exitCode = 1;
  console.error(`POSIX verification failed: ${error.message}`);
} finally {
  closeSync(fd);
  console.log(readFileSync(log, "utf8").split("\n").slice(-45).join("\n"));
  console.log(`Full log: ${log}\nIsolated checkout retained for inspection: ${fixture}`);
}
