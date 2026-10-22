import { afterEach, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { referenceRenames, verifyWorkflows, workflowDigest } from "../tools/verify-workflows.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const baseline = JSON.parse(readFileSync(join(root, "tests/fixtures/workflow-baseline.json"), "utf8"));
const fixtures = [];
function fixture() {
  const dir = mkdtempSync(join(tmpdir(), "superdev-parity-"));
  fixtures.push(dir);
  return dir;
}
afterEach(() => {
  for (const dir of fixtures.splice(0)) rmSync(dir, { recursive: true, force: true });
});

test("the shared workflows, scripts, hooks, models, and runtime assets retain their reviewed content", () => {
  expect(verifyWorkflows(join(root, "plugins/superdev"), baseline)).toEqual({ files: 262, unchanged: 245, adapted: 17, failures: [] });
});

test("normalization preserves prompt wording and compares binary assets as bytes", () => {
  expect(workflowDigest(Buffer.from("Read the code.\r\n"), "workflow.md")).toBe(workflowDigest(Buffer.from("Read the code.\n\n"), "workflow.md"));
  expect(workflowDigest(Buffer.from("Read the code.\n"), "workflow.md")).not.toBe(workflowDigest(Buffer.from("Skip the code.\n"), "workflow.md"));
  expect(workflowDigest(Buffer.from([13, 10]), "icon.png")).not.toBe(workflowDigest(Buffer.from([10]), "icon.png"));
});

test("the parity check detects a changed workflow, changed runtime, and missing input", () => {
  const dir = fixture();
  const prompt = "Require an independent review before shipping.\n";
  const code = "export const allowShipping = false;\n";
  writeFileSync(join(dir, "workflow.md"), prompt);
  writeFileSync(join(dir, "runtime.mjs"), code);
  const contract = { format: 1, files: {
    "workflow.md": { reference: workflowDigest(Buffer.from(prompt), "workflow.md") },
    "runtime.mjs": { reference: workflowDigest(Buffer.from(code), "runtime.mjs") },
  } };
  expect(verifyWorkflows(dir, contract).failures).toEqual([]);
  writeFileSync(join(dir, "workflow.md"), prompt.replace("before", "after"));
  expect(verifyWorkflows(dir, contract).failures).toEqual(["workflow.md: content differs from the reviewed workflow baseline"]);
  writeFileSync(join(dir, "workflow.md"), prompt);
  writeFileSync(join(dir, "runtime.mjs"), code.replace("false", "true"));
  expect(verifyWorkflows(dir, contract).failures).toEqual(["runtime.mjs: content differs from the reviewed workflow baseline"]);
  rmSync(join(dir, "runtime.mjs"));
  expect(verifyWorkflows(dir, contract).failures).toEqual(["runtime.mjs: missing"]);
  expect(() => verifyWorkflows(dir, { format: 1, files: {} })).toThrow("missing or empty");
});

test("an approved adaptation is exact and does not exempt the rest of its file", () => {
  const dir = fixture();
  writeFileSync(join(dir, "hook.sh"), 'sh "$ROOT/hook.sh"\n');
  const contract = { format: 1, files: { "hook.sh": {
    reference: workflowDigest(Buffer.from('"$ROOT/hook.sh"\n'), "hook.sh"),
    adaptation: workflowDigest(readFileSync(join(dir, "hook.sh")), "hook.sh"),
    reason: "Invoke the same script through sh.",
  } } };
  expect(verifyWorkflows(dir, contract).failures).toEqual([]);
  writeFileSync(join(dir, "hook.sh"), 'sh "$ROOT/other.sh"\n');
  expect(verifyWorkflows(dir, contract).failures).toEqual(["hook.sh: content differs from the reviewed workflow baseline"]);
  delete contract.files["hook.sh"].reason;
  expect(() => verifyWorkflows(dir, contract)).toThrow("Invalid baseline entry");
});

test("reference verification normalizes names and detects unrecorded reference files", () => {
  const dir = fixture();
  mkdirSync(join(dir, ".claude-plugin"));
  mkdirSync(join(dir, "skills/example-mode"), { recursive: true });
  const manifest = { name: "sample", homepage: "https://example.test/sample" };
  const prompt = "Example uses SAMPLE and setup-sample.\n";
  writeFileSync(join(dir, ".claude-plugin/plugin.json"), JSON.stringify(manifest));
  writeFileSync(join(dir, "skills/example-mode/SKILL.md"), prompt);
  const renames = referenceRenames(dir);
  const contract = { format: 1, files: {
    ".claude-plugin/plugin.json": { reference: workflowDigest(Buffer.from(JSON.stringify(manifest)), ".claude-plugin/plugin.json", renames) },
    "skills/superdev-mode/SKILL.md": { reference: workflowDigest(Buffer.from("SuperDev uses SUPERDEV and superdev-setup.\n"), "skills/superdev-mode/SKILL.md") },
  } };
  expect(verifyWorkflows(dir, contract, { reference: true, replacements: renames }).failures).toEqual([]);
  writeFileSync(join(dir, "extra.md"), "new reference behavior");
  expect(verifyWorkflows(dir, contract, { reference: true, replacements: renames }).failures).toEqual(["extra.md: reference file has no baseline"]);
  writeFileSync(join(dir, "skills/example-mode/SKILL.md"), prompt.replace("uses", "ignores"));
  expect(verifyWorkflows(dir, contract, { reference: true, replacements: renames }).failures).toContain("skills/superdev-mode/SKILL.md: content differs from the reference baseline");
});
