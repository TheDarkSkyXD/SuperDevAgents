import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { workflowDigest } from "../tools/verify-workflows.mjs";

const skill = (name, path = "SKILL.md") => readFileSync(new URL(`../plugins/superdev/skills/${name}/${path}`, import.meta.url), "utf8");
const reference = (name) => skill("superdev-setup", `references/${name}.md`);

test("repository onboarding preserves the complete reference model setup", () => {
  const baseline = JSON.parse(readFileSync(new URL("./fixtures/setup-model-baseline.json", import.meta.url), "utf8"));
  const setup = skill("superdev-setup");
  const start = setup.indexOf(baseline.start);
  expect(start).toBeGreaterThan(0);
  const modelSetup = setup.slice(start);
  expect(workflowDigest(Buffer.from(modelSetup), "SKILL.md")).toBe(baseline.sha256);
  expect([...modelSetup.matchAll(/^### \d+\./gm)]).toHaveLength(10);
});

test("Wayfinder label setup covers the map and every actual ticket type", () => {
  const wayfinder = skill("wayfinder");
  const section = wayfinder.slice(wayfinder.indexOf("## Ticket Types"), wayfinder.indexOf("## Fog of war"));
  const types = [...section.matchAll(/^- \*\*([^*]+)\*\*/gm)].map((match) => match[1].toLowerCase());
  expect(types).toHaveLength(4);
  const expected = ["wayfinder:map", ...types.map((type) => `wayfinder:${type}`)].sort();
  const configured = [...reference("workflow-labels").matchAll(/`(wayfinder:[a-z]+)`/g)].map((match) => match[1]).sort();
  expect(configured).toEqual(expected);
  expect(reference("repository-setup")).toContain("Wayfinder labels are needed even when `triage` is absent");
});

test("setup includes ready-for-agent consumers independently of triage installation", () => {
  const labels = reference("workflow-labels");
  expect(labels).toContain("`to-spec` or `to-tickets`");
  expect(labels).toContain("ready-for-agent role");
  expect(reference("repository-setup")).toContain("even without `triage`");
});

for (const name of ["wayfinder", "to-spec", "to-tickets", "code-review"]) {
  test(`${name} resolves the configured tracker through project instructions`, () => {
    const text = skill(name);
    expect(text).toContain("### Issue tracker");
    expect(text).not.toContain("If `docs/agents/issue-tracker.md` is missing");
  });
}

for (const tracker of ["github", "gitlab", "local"]) {
  test(`${tracker} setup records relationships for both implementation tickets and Wayfinder`, () => {
    const text = reference(`issue-tracker-${tracker}`);
    expect(text).toContain("## Ticket relationships");
    expect(text).toContain("## Wayfinding operations");
    expect(text).toContain("to-tickets");
    expect(text).toContain("Read back");
  });
}

test("GitHub relationships distinguish parents, blockers, database IDs, and read-back operations", () => {
  const text = reference("issue-tracker-github");
  expect(text).toContain("issues/<parent>/sub_issues -F sub_issue_id=<child-db-id>");
  expect(text).toContain("issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>");
  expect(text).toContain("Read back the parent's `GET .../sub_issues`");
  expect(text).toContain("Read back the child's `/dependencies/blocked_by`");
  expect(text).not.toMatch(/gh pr list --state open --json[^\n]*authorAssociation/);
});

test("reruns preserve configured document locations and check consumer readiness", () => {
  const text = reference("repository-setup");
  expect(text).toContain("Keep those locations on reruns");
  expect(text).toContain("Read back the instruction pointers");
  expect(text).toContain("Verify that the active harness loads the block");
  expect(text).toContain("without publishing sample tickets");
});
