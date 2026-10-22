#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { basename, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const portablePointer = "Read [the portable runtime contract](../superdev-mode/references/portable-runtime.md) before following this workflow.\n\n";

function rename(text, replacements) {
  for (const [from, to] of replacements) text = text.replaceAll(from, to);
  return text;
}

function referenceFiles(dir, replacements, base = dir, files = new Map()) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) referenceFiles(path, replacements, base, files);
    else {
      const normalized = rename(relative(base, path).replaceAll("\\", "/"), replacements);
      if (files.has(normalized)) throw new Error(`Reference rename collision: ${normalized}`);
      files.set(normalized, path);
    }
  }
  return files;
}

export function workflowDigest(bytes, file, replacements = []) {
  if (file.endsWith(".png")) return createHash("sha256").update(bytes).digest("hex");
  let text = bytes.toString("utf8").replaceAll("\r\n", "\n");
  text = rename(text, replacements);
  text = text.replace(portablePointer, "").replace(/\n+$/, "");
  return createHash("sha256").update(text).digest("hex");
}

export function referenceRenames(pluginRoot) {
  const { name, homepage } = JSON.parse(readFileSync(join(pluginRoot, ".claude-plugin/plugin.json"), "utf8"));
  const modes = readdirSync(join(pluginRoot, "skills")).filter((entry) => entry.endsWith("-mode"));
  if (!name || !homepage || modes.length !== 1) throw new Error("Reference must contain a named plugin, homepage, and one mode skill.");
  const persona = modes[0].slice(0, -5);
  const title = persona[0].toUpperCase() + persona.slice(1);
  return [
    [homepage, "https://github.com/TheDarkSkyXD/SuperDevAgents"],
    [`setup-${name}`, "superdev-setup"],
    [persona.toUpperCase(), "SUPERDEV"],
    [title, "SuperDev"],
    [persona, "superdev"],
    [name.toUpperCase(), "SUPERDEV"],
    [name, "superdev"],
  ];
}

export function verifyWorkflows(pluginRoot, baseline, { reference = false, replacements = [] } = {}) {
  const entries = Object.entries(baseline.files ?? {});
  if (baseline.format !== 1 || !entries.length) throw new Error("Workflow baseline is missing or empty.");
  const sourceFiles = reference ? referenceFiles(pluginRoot, replacements) : undefined;
  const failures = [];
  for (const file of sourceFiles?.keys() ?? []) {
    if (!Object.hasOwn(baseline.files, file)) failures.push(`${file}: reference file has no baseline`);
  }
  let adapted = 0;
  for (const [file, entry] of entries) {
    if (file.split("/").some((part) => !part || part === "." || part === "..") || file.includes("\\") || file.startsWith("/") || /^[a-z]:/i.test(file)) {
      throw new Error(`Invalid baseline path: ${file}`);
    }
    if (!/^[a-f0-9]{64}$/.test(entry.reference) || (entry.adaptation && (!entry.reason || !/^[a-f0-9]{64}$/.test(entry.adaptation)))) {
      throw new Error(`Invalid baseline entry: ${file}`);
    }
    if (entry.adaptation) adapted++;
    const expected = reference ? entry.reference : (entry.adaptation ?? entry.reference);
    const path = reference ? sourceFiles.get(file) : join(pluginRoot, file);
    if (!path) { failures.push(`${file}: missing`); continue; }
    try {
      const actual = workflowDigest(readFileSync(path), file, replacements);
      if (actual !== expected) failures.push(`${file}: content differs from the ${reference ? "reference" : "reviewed workflow"} baseline`);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      failures.push(`${file}: missing`);
    }
  }
  return { files: entries.length, unchanged: entries.length - adapted, adapted, failures };
}

if (import.meta.url === pathToFileURL(resolve(process.argv[1] ?? "")).href) {
  try {
    const args = process.argv.slice(2);
    if (args.length && (args.length !== 2 || args[0] !== "--reference")) throw new Error(`Usage: node ${basename(process.argv[1])} [--reference <plugin-directory>]`);
    const pluginRoot = args.length ? resolve(args[1]) : join(root, "plugins/superdev");
    const baseline = JSON.parse(readFileSync(join(root, "tests/fixtures/workflow-baseline.json"), "utf8"));
    const result = verifyWorkflows(pluginRoot, baseline, { reference: !!args.length, replacements: args.length ? referenceRenames(pluginRoot) : [] });
    if (result.failures.length) {
      console.error(result.failures.join("\n"));
      process.exitCode = 1;
    } else {
      console.log(`${result.files} shared files verified. ${result.unchanged} match after naming normalization; ${result.adapted} have explicitly recorded adaptations.`);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
