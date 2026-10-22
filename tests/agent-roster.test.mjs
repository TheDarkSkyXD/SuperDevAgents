// Each runtime names the plugin's subagent types by hand: the Pi agent tool's
// parameter description and the Subagent policy of the Pi, Copilot, and Codex
// mappings. Claude Code registers plugins/superdev/agents/ by default, so these
// four copies are the ones that can drift.
import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const pluginRoot = fileURLToPath(new URL("../plugins/superdev", import.meta.url));
const agents = readdirSync(join(pluginRoot, "agents"))
  .filter((file) => file.endsWith(".md"))
  .map((file) => basename(file, ".md"));

// Claude Code, Pi, and Copilot dispatch by the namespaced name. The Codex
// mapping lists the bare names that have no spawn_agent type. The Pi tool's
// description runs the names together in prose, so a name must not continue
// into a longer one.
const rosters = [
  ["pi/agent-tools.ts", (name) => new RegExp(`superdev:${name}(?![\\w-])`)],
  ["skills/superdev-mode/references/pi-tools.md", (name) => new RegExp(`\`superdev:${name}\``)],
  ["skills/superdev-mode/references/copilot-tools.md", (name) => new RegExp(`\`superdev:${name}\``)],
  ["skills/superdev-mode/references/codex-tools.md", (name) => new RegExp(`\`${name}\``)],
];

describe("subagent roster", () => {
  test("agents/ holds the base superdev-agent", () => {
    expect(agents).toContain("superdev-agent");
  });

  for (const [file, mention] of rosters) {
    test(`${file} names every agent under agents/`, () => {
      const text = readFileSync(join(pluginRoot, file), "utf8");
      expect(agents.filter((name) => !mention(name).test(text))).toEqual([]);
    });
  }
});
