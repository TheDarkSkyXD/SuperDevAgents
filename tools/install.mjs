#!/usr/bin/env node
import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pathIsInside, walk } from "./validate-skills.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const digest = (data) => createHash("sha256").update(data).digest("hex");

function refuseSymlinks(path) {
  let at = resolve(path);
  while (true) {
    if (lstatSync(at, { throwIfNoEntry: false })?.isSymbolicLink()) throw new Error(`Refusing symlink: ${at}`);
    const parent = dirname(at);
    if (parent === at) break;
    at = parent;
  }
}

export function install({ source = join(root, "plugins/superdev/skills"), target, dryRun = false, update = false }) {
  source = resolve(source);
  target = resolve(target);
  if (pathIsInside(source, target) || pathIsInside(target, source)) throw new Error("Source and destination must be separate directories");
  refuseSymlinks(target);
  refuseSymlinks(source);
  const manifestPath = join(target, ".superdev-install.json");
  refuseSymlinks(manifestPath);
  const prior = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : { files: {} };
  const files = walk(source).map((path) => {
    if (lstatSync(path).isSymbolicLink()) throw new Error(`Refusing source symlink: ${path}`);
    const name = path.slice(source.length + 1).replaceAll("\\", "/");
    const destination = join(target, name);
    refuseSymlinks(destination);
    if (!pathIsInside(target, destination)) throw new Error(`Destination escapes target: ${name}`);
    const sha256 = digest(readFileSync(path));
    const current = existsSync(destination) ? digest(readFileSync(destination)) : null;
    if (current !== null && current !== sha256 && (!update || current !== prior.files[name])) {
      throw new Error(`Local file differs: ${name}. Preserve it before installing. --update replaces only unmodified files from a previous SuperDev install.`);
    }
    return { name, path, destination, sha256, changed: current !== sha256 };
  });
  if (!dryRun) {
    for (const file of files.filter((file) => file.changed)) {
      mkdirSync(dirname(file.destination), { recursive: true });
      copyFileSync(file.path, file.destination);
    }
    mkdirSync(target, { recursive: true });
    writeFileSync(manifestPath, JSON.stringify({ name: "superdev", version: readFileSync(join(root, "VERSION"), "utf8").trim(), files: Object.fromEntries(files.map((file) => [file.name, file.sha256])) }, null, 2) + "\n");
  }
  return { target, files: files.length, changed: files.filter((file) => file.changed).length, dryRun };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.includes("--help")) {
    console.log("node tools/install.mjs [--target <skills-directory>] [--global] [--dry-run] [--update]\nDefault: .agents/skills in the current project. --global uses ~/.agents/skills.\nFor a host with another discovery path, pass that skills directory with --target.");
  } else {
    const flags = new Set(["--global", "--dry-run", "--update"]);
    let target;
    for (let index = 0; index < args.length; index++) {
      if (args[index] === "--target") {
        if (target || !args[index + 1] || args[index + 1].startsWith("--")) throw new Error("--target requires one directory");
        target = args[++index];
      } else if (!flags.has(args[index])) throw new Error(`Unknown option: ${args[index]}`);
    }
    if (target && args.includes("--global")) throw new Error("Choose --target or --global");
    const result = install({ target: target ?? join(args.includes("--global") ? homedir() : process.cwd(), ".agents/skills"), dryRun: args.includes("--dry-run"), update: args.includes("--update") });
    console.log(`${result.dryRun ? "Would copy" : "Installed"} ${result.changed} of ${result.files} files in ${result.target}.\nStart a new session and ask: Use superdev-mode to work on this task.`);
  }
}
