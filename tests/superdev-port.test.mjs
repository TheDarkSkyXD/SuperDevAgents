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

test("general setup advertises and runs repository configuration before model setup", () => {
  const setup = readFileSync(join(skills, "superdev-setup/SKILL.md"), "utf8");
  const description = setup.split("\n").find((line) => line.startsWith("description:"));
  expect(description).toMatch(/repository.*triage labels/);
  const scope = setup.slice(setup.indexOf("## Setup scope"), setup.indexOf("## Model setup"));
  expect(scope).toContain("For a first-time setup or a general rerun, complete both parts in order:");
  expect(scope).toMatch(/1\. Read and follow \[repository setup\]\(references\/repository-setup\.md\)\.[\s\S]*2\. Follow the model setup steps below\./);
  expect(scope).toContain("run only repository setup");
  expect(scope).toContain("run only model setup");
  const repositorySetup = readFileSync(join(skills, "superdev-setup/references/repository-setup.md"), "utf8");
  for (const name of ["issue-tracker-github.md", "issue-tracker-gitlab.md", "issue-tracker-local.md", "triage-labels.md", "domain.md"]) {
    expect(repositorySetup).toContain(`(./${name})`);
    expect(existsSync(join(skills, "superdev-setup/references", name))).toBe(true);
  }
});

test("repository setup maps every triage role and verifies missing-label creation", () => {
  const triage = readFileSync(join(skills, "triage/SKILL.md"), "utf8");
  const rolesSection = triage.slice(triage.indexOf("## Roles"), triage.indexOf("## Invocation"));
  const roles = [...rolesSection.matchAll(/^- `([^`]+)`:/gm)].map((match) => match[1]);
  const labels = readFileSync(join(skills, "superdev-setup/references/triage-labels.md"), "utf8");
  expect(roles).toHaveLength(7);
  for (const role of roles) expect(labels).toContain(`| \`${role}\``);
  const repositorySetup = readFileSync(join(skills, "superdev-setup/references/repository-setup.md"), "utf8");
  expect(repositorySetup).toContain("gh label list --repo <owner/repo>");
  expect(repositorySetup).toContain('gh label create "<mapped-label>" --repo <owner/repo>');
  expect(repositorySetup).toContain("Read the resulting labels to verify creation.");
  expect(repositorySetup).toContain("Preserve saved mappings on reruns");
  expect(repositorySetup).toContain("report which labels remain to be created");
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
