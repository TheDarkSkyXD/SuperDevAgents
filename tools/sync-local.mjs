#!/usr/bin/env node
import { copyFileSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, unlinkSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { walk } from "./validate-skills.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export function syncLocal(repo = root, { check = false } = {}) {
  const agentRoot = join(repo, ".agents");
  if (lstatSync(agentRoot, { throwIfNoEntry: false })?.isSymbolicLink()) throw new Error(`Refusing symlink: ${agentRoot}`);
  const changes = [];
  for (const kind of ["skills", "agents"]) {
    const source = join(repo, "plugins/superdev", kind);
    const target = join(repo, ".agents", kind);
    if (lstatSync(target, { throwIfNoEntry: false })?.isSymbolicLink()) throw new Error(`Refusing symlink: ${target}`);
    const sourceFiles = new Map(walk(source).map((file) => [file.slice(source.length + 1), file]));
    const targetFiles = existsSync(target) ? walk(target) : [];
    for (const file of [...sourceFiles.keys(), ...targetFiles.map((file) => file.slice(target.length + 1))]) {
      const destination = join(target, file);
      let parent = dirname(destination);
      while (parent !== target) {
        if (lstatSync(parent, { throwIfNoEntry: false })?.isSymbolicLink()) throw new Error(`Refusing symlink: ${parent}`);
        parent = dirname(parent);
      }
      if (lstatSync(destination, { throwIfNoEntry: false })?.isSymbolicLink()) throw new Error(`Refusing symlink: ${destination}`);
    }
    for (const [file, original] of sourceFiles) {
      const destination = join(target, file);
      if (existsSync(destination) && readFileSync(original).equals(readFileSync(destination))) continue;
      changes.push(`copy .agents/${kind}/${file.replaceAll("\\", "/")}`);
      if (!check) {
        mkdirSync(dirname(destination), { recursive: true });
        copyFileSync(original, destination);
      }
    }
    for (const destination of targetFiles) {
      if (sourceFiles.has(destination.slice(target.length + 1))) continue;
      changes.push(`remove ${destination.slice(repo.length + 1).replaceAll("\\", "/")}`);
      if (!check) unlinkSync(destination);
    }
  }
  return changes;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const changes = syncLocal(root, { check: process.argv.includes("--check") });
  console.log(changes.length ? changes.join("\n") : "ok: repository skills and agents match the plugin");
  if (process.argv.includes("--check") && changes.length) process.exitCode = 1;
}
