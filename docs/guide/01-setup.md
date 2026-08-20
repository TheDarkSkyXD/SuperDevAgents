# Install and set up SuperDevAgents

SuperDevAgents is a repository-local Agent Skills bundle. Install it by copying the `.agents` files into your project.

## Copy the agent files

Clone or download the repository:

```bash
git clone https://github.com/TheDarkSkyXD/SuperDevAgents.git
```

Copy the contents of the cloned `.agents/` directory into the `.agents/` directory at the root of your project. Keep existing project skills and agent definitions. If a same-name file already exists, compare both versions before you replace anything.

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
- The triage-label vocabulary when the triage skill is installed.
- The location of domain context and architecture decision records.
- The model map used by delegated roles and review panels.

Setup writes repository guidance under `docs/agents/` and model choices to `.agents/superdev-models.md`. Rerun the skill when you change trackers, layouts, labels, or available models.

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
