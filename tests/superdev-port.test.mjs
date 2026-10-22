import { afterEach, expect, test } from "bun:test";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { install } from "../tools/install.mjs";
import { syncLocal } from "../tools/sync-local.mjs";
import { agentSkills, strayModelSlugs, loadModels } from "../tools/generate.mjs";
import { walk } from "../tools/validate-skills.mjs";

const repo = fileURLToPath(new URL("..", import.meta.url));
const skills = join(repo, "plugins/superdev/skills");
const fixtures = [];
const fixture = () => {
  const dir = mkdtempSync(join(tmpdir(), "superdev install "));
  fixtures.push(dir);
  return dir;
};
afterEach(() => {
  for (const dir of fixtures.splice(0)) rmSync(dir, { recursive: true, force: true });
});

test("installs every skill, reference, script, and notice as identical bytes, and reruns without changes", () => {
  const target = join(fixture(), "skills with spaces");
  const first = install({ target });
  expect(first.files).toBeGreaterThan(200);
  for (const source of walk(skills)) {
    expect(readFileSync(join(target, source.slice(skills.length + 1))).equals(readFileSync(source))).toBe(true);
  }
  expect(readFileSync(join(target, "superdev-mode/references/licenses/LICENSE"), "utf8")).toContain("Michael Denyer");
  expect(install({ target }).changed).toBe(0);
});

test("preflights all collisions and preserves unrelated skills before writing anything", () => {
  const target = fixture();
  mkdirSync(join(target, "superdev-mode"));
  writeFileSync(join(target, "superdev-mode/SKILL.md"), "my local mode");
  writeFileSync(join(target, "unrelated.md"), "mine");
  expect(() => install({ target })).toThrow("Local file differs");
  expect(existsSync(join(target, "architect/SKILL.md"))).toBe(false);
  expect(readFileSync(join(target, "unrelated.md"), "utf8")).toBe("mine");
  expect(readFileSync(join(target, "superdev-mode/SKILL.md"), "utf8")).toBe("my local mode");
});

test("a dry run creates no target directory", () => {
  const target = join(fixture(), "absent");
  expect(install({ target, dryRun: true }).changed).toBeGreaterThan(0);
  expect(existsSync(target)).toBe(false);
});

test("updates only an unmodified managed file and refuses local edits even with --update", () => {
  const dir = fixture();
  const source = join(dir, "source");
  const target = join(dir, "target");
  mkdirSync(source);
  writeFileSync(join(source, "SKILL.md"), "old version");
  install({ source, target });
  writeFileSync(join(source, "SKILL.md"), "new version");
  expect(() => install({ source, target })).toThrow("Local file differs");
  expect(install({ source, target, update: true }).changed).toBe(1);
  expect(readFileSync(join(target, "SKILL.md"), "utf8")).toBe("new version");
  writeFileSync(join(target, "SKILL.md"), "local custom version");
  expect(() => install({ source, target, update: true })).toThrow("Local file differs");
  expect(readFileSync(join(target, "SKILL.md"), "utf8")).toBe("local custom version");
});

test("refuses an overlapping source and target", () => {
  expect(() => install({ source: skills, target: skills })).toThrow("separate directories");
  expect(() => install({ source: skills, target: join(skills, "nested") })).toThrow("separate directories");
});

test.skipIf(process.platform === "win32")("refuses dangling destination and source links without writing outside the install", () => {
  const dir = fixture();
  const source = join(dir, "source");
  const target = join(dir, "target");
  const outside = join(dir, "outside");
  mkdirSync(source);
  mkdirSync(target);
  writeFileSync(join(source, "SKILL.md"), "skill");
  symlinkSync(outside, join(target, "SKILL.md"));
  expect(() => install({ source, target })).toThrow("Refusing symlink");
  expect(existsSync(outside)).toBe(false);
  symlinkSync(outside, join(source, "linked.md"));
  expect(() => install({ source, target: join(dir, "clean") })).toThrow("Refusing source symlink");
  expect(existsSync(join(dir, "clean"))).toBe(false);
});

test("repository-local skills and agent definitions match the canonical plugin", () => {
  expect(syncLocal(repo, { check: true })).toEqual([]);
});

test("every skill starts with the portable contract and fixed Grok model IDs are absent", () => {
  for (const { name } of agentSkills(skills)) {
    const text = readFileSync(join(skills, name, "SKILL.md"), "utf8");
    expect(text, name).toContain("portable-runtime.md");
    expect(text, name).not.toMatch(/grok-\d|gpt-5\.6-sol-high|claude-opus-5-5-high/);
  }
});

test("model-region validation accepts Windows paths and still catches a stray model", () => {
  const models = loadModels();
  const file = "plugins\\superdev\\skills\\how\\SKILL.md";
  const text = readFileSync(join(skills, "how/SKILL.md"), "utf8");
  expect(strayModelSlugs(file, text, models)).toEqual([]);
  expect(strayModelSlugs(file, text + "\n## Unowned section\n\nUnowned model: `opus`\n", models)).toHaveLength(1);
});

test("distributed manifests use SuperDev branding and retain contributor license notices", () => {
  const description = "SuperDev engineering workflows with portable skills and native runtime adapters.";
  for (const file of ["package.json", ".claude-plugin/marketplace.json", ...[".claude-plugin", ".codex-plugin", ".github/plugin", ".muse-plugin"].map((dir) => `plugins/superdev/${dir}/plugin.json`)]) {
    expect(JSON.parse(readFileSync(join(repo, file), "utf8")).description, file).toBe(description);
  }
  const license = readFileSync(join(repo, "LICENSE"), "utf8");
  for (const author of ["Lauren Tan", "Michael Denyer", "TheDarkSkyXD"]) expect(license).toContain(`Copyright (c) 2026 ${author}`);
  expect(readFileSync(join(repo, "LICENSE-cursor-team-kit"), "utf8")).toContain("Cursor");
  expect(readFileSync(join(repo, "LICENSE-thermos"), "utf8")).toContain("Cursor");
});
