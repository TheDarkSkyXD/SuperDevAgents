# Install and set up SuperDevAgents

SuperDevAgents provides native plugin integrations and portable Agent Skills. Use the [harness setup guide](../harnesses.md) for native plugins, model configuration, and host limitations.

## Copy the agent files

Clone or download the repository:

```bash
git clone https://github.com/TheDarkSkyXD/SuperDevAgents.git
```

From the clone, run `node tools/install.mjs --target /path/to/project/.agents/skills`. Use the skills directory your harness discovers. The installer preserves unrelated skills and refuses conflicting local edits. Native plugins also include automatic routing and runtime adapters.

Your project should contain paths such as:

```text
.agents/
  agents/
    superdev-agent.md
  skills/
    superdev-mode/
      SKILL.md
    superdev-setup/
      SKILL.md
```

Start a new session so your agent harness discovers the copied skills.

## Configure the repository

Run:

```text
$superdev-setup
```

[`$superdev-setup`](../../.agents/skills/superdev-setup/SKILL.md) inspects the repository before it writes anything. It configures:

- The issue tracker used by `$to-spec`, `$to-tickets`, and `$triage`.
- The triage-label vocabulary when the triage skill is installed, reusing existing GitHub labels and creating missing mapped labels after draft approval.
- The location of domain context and architecture decision records.
- The models and supported reasoning options used by delegated roles and review panels.

General setup completes repository configuration first, then model configuration. Setup writes repository guidance under `docs/agents/`. Native model settings use the sheet and loading rules documented for the active harness. Hosts without a native mapping can use `.agents/superdev-models.md`. Requests to change only labels, the tracker, domain docs, models, or routing update only that part and preserve other saved choices.

## Add a verification skill when the project needs one

At the end of setup, the agent checks whether the project has a repeatable way to drive the real application. If it does not, setup may offer [`$create-verification-skill`](../../.agents/skills/create-verification-skill/SKILL.md).

Accept when the project needs repeatable UI, CLI, service, or desktop verification. Skip it when the current test and run commands already prove the behavior users depend on.

## Run one small task

Choose a real change with a visible outcome:

```text
$superdev-mode add a --json flag to this command. keep text output byte-identical. run both forms against the sample project.
```

The mode should make its workflow visible, preserve the stated constraint, and report the commands it ran.

Next: [Route work through `$superdev-mode`](./02-superdev-mode.md).
