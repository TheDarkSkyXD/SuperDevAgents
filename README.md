# SuperDevAgents

AI can write code fast. It can also produce sprawling, fragile code that no one wants to own. Throughput without quality is not the goal. If you want to go fast, go deep first.

**SuperDevAgents is a set of agent skills for rigorous engineering work.** The skills trace unfamiliar systems, explore designs, build the smallest useful change, challenge the result, and verify it against the real artifact. The goal is less code, better code, and evidence that it works.

**Parallel work has to earn your trust.** SuperDevAgents separates concurrent agents, gives each one a bounded job, and makes the parent inspect the result. More agents should increase coverage without turning the repository into a merge conflict.

**Use SuperDev with your own AI harness and models.** The bundle has native integrations for Claude Code, Codex, GitHub Copilot, Pi, and Muse, plus portable Agent Skills for other hosts. Grok is optional. The [portable runtime contract](./plugins/superdev/skills/superdev-mode/references/portable-runtime.md) explains tool discovery, model selection, T3 delegation, and missing-capability fallbacks.

Fork it. Change it. Make it fit how your team works. Contributions are welcome.

## Install

Clone or download this repository:

```bash
git clone https://github.com/TheDarkSkyXD/SuperDevAgents.git
```

For a skills-only installation, run the included installer from the clone. Pass the skills directory your harness reads:

```bash
cd SuperDevAgents
node tools/install.mjs --target /path/to/your/project/.agents/skills
```

The installer works on Windows, macOS, and Linux with Node 18 or later. Paths with spaces are supported. Use `--global` for `~/.agents/skills`, `--dry-run` to preview, and `--update` to replace unmodified files from a previous SuperDev installation. It preserves unrelated skills and refuses conflicting local edits. For a different discovery directory, pass that directory with `--target`.

Native plugin installs also provide automatic routing and runtime adapters:

```text
# Claude Code
/plugin marketplace add TheDarkSkyXD/SuperDevAgents
/plugin install superdev@superdev-agents

# Codex
codex plugin marketplace add TheDarkSkyXD/SuperDevAgents
codex plugin add superdev@superdev-agents

# GitHub Copilot
copilot plugin marketplace add TheDarkSkyXD/SuperDevAgents
copilot plugin install superdev@superdev-agents

# Pi
pi install git:github.com/TheDarkSkyXD/SuperDevAgents

# Muse, from this clone
muse plugins install ./plugins/superdev
muse plugins approve superdev
```

See [harness setup and limits](./docs/harnesses.md) for routing, model configuration, and verification. A skills-only installation does not add tools or hooks to its host.

Start a new agent session after copying the files so your harness discovers the skills.

## Get started

Run the setup skill once in your project:

```text
/superdev-setup
```

General setup configures your issue tracker, triage labels, Wayfinder labels and relationships, and domain-document layout before configuring models and routing. On GitHub, it reuses existing labels and creates missing mapped labels after you approve the draft. Repository conventions default to `docs/agents/`; saved document locations are preserved. Requests to change only labels or models update only that part. The full ten-step model setup remains intact, including reasoning effort, routing, and optional verification-skill setup.

Model setup discovers the active harness's catalog and supported options. Native integrations use their documented model sheets and defaults. Hosts without a native mapping can use `.agents/superdev-models.md` and inherit the session model when a default cannot be resolved. Then route a real task through the main mode:

```text
/superdev-mode this command writes duplicate rows after a retry. reproduce it first, then fix and verify.
```

You can also ask in plain language. Skill names make routing explicit, but they are not required when your harness supports natural-language triggers.

The [SuperDevAgents guide](./docs/guide/README.md) walks through setup, investigation, design, implementation, verification, and long-running work.

## Use `/superdev-mode` for non-trivial work

[`/superdev-mode`](./.agents/skills/superdev-mode/SKILL.md) is the main entry point. It reads your request, selects a playbook, keeps the required steps visible, and loads focused skills when the task needs them.

```text
/superdev-mode add a --json flag. keep text output byte-identical and verify both forms.
```

```text
/superdev-mode investigate why idle CPU rises after reconnect. diagnose only. do not change code.
```

```text
/superdev-mode I am stepping away. migrate every caller, delete the old API, and stop only when the old-call count is zero.
```

The mode includes 24 playbooks for investigations, bug fixes, features, refactors, performance work, prototypes, reviews, shipping, autonomous runs, and project-scale orchestration. Read the [playbook directory](./.agents/skills/superdev-mode/playbooks/) for the exact workflows.

## Reach for a focused skill when you want control

`/superdev-mode` routes to most skills for you. Invoke one directly when you want a specific kind of work.

| Skill | Use it when |
|---|---|
| [`/how`](./.agents/skills/how/SKILL.md) | You want a code walkthrough or runtime trace. |
| [`/why`](./.agents/skills/why/SKILL.md) | You want the evidence behind a design, regression, or threshold. |
| [`/teach`](./.agents/skills/teach/SKILL.md) | You want the mechanics and reasons woven into one plain explanation. |
| [`/recall`](./.agents/skills/recall/SKILL.md) | You need your recent work on a topic reconstructed. |
| [`/correct`](./.agents/skills/correct/SKILL.md) | You keep correcting agents for the same mistakes. Mine history for mistake classes, fix each at the highest level that works (architecture, then types, lint, and CI, then tests, with docs last), and keep a table pairing each rule with what enforces it. |
| [`/architect`](./.agents/skills/architect/SKILL.md) | You want types, caller usage, and module boundaries settled before code. |
| [`/arena`](./.agents/skills/arena/SKILL.md) | You want several attempts at the same design or implementation, followed by one synthesized result. |
| [`/swarm`](./.agents/skills/swarm/SKILL.md) | You want independent slices checked in parallel and returned as one report. |
| [`/adversarial-review`](./.agents/skills/adversarial-review/SKILL.md) | You want one rigorous review of a proposal, architecture, or implementation. |
| [`/interrogate`](./.agents/skills/interrogate/SKILL.md) | You want several reviewers to challenge a design or diff. |
| [`/blast-radius`](./.agents/skills/blast-radius/SKILL.md) | You want to find what a change could break beyond the diff. |
| [`/tdd`](./.agents/skills/tdd/SKILL.md) | A bug has a cheap local regression-test path, or you explicitly want TDD. |
| [`/benchmark-checklist`](./.agents/skills/benchmark-checklist/SKILL.md) | You ran a benchmark or measured a speedup or regression. Check the limiter, tuning, errors, repeat runs, and relevance before reporting or acting on it. |
| [`/no-comments`](./.agents/skills/no-comments/SKILL.md) | You want a fresh reviewer to remove narrating comments and expose hidden design problems. |
| [`/create-verification-skill`](./.agents/skills/create-verification-skill/SKILL.md) | Your project has no repeatable way for an agent to drive the real app. |
| [`/show-me-your-work`](./.agents/skills/show-me-your-work/SKILL.md) | You want an auditable decision log for unattended work. |
| [`/figure-it-out`](./.agents/skills/figure-it-out/SKILL.md) | The work is too large or unusual for a bundled playbook. |
| [`/automate-me`](./.agents/skills/automate-me/SKILL.md) | You want a personal mode based on how you actually work. |
| [`/technical-writing`](./.agents/skills/technical-writing/SKILL.md) | You want docs, a README, an RFC, or a PR description tightened. |
| [`/bro`](./.agents/skills/bro/SKILL.md) | You want the last response restated without jargon. |

For repeated agent mistakes, run:

```text
/correct
```

The collection also covers architecture, domain modeling, issue triage, specifications, tickets, merge conflicts, formal verification, PR maintenance, and the principles used by the main mode. Count the canonical skills in PowerShell with `@(rg --files --glob SKILL.md plugins/superdev/skills).Count`.

## The principles are executable rules

SuperDevAgents includes 24 short principle skills. They turn broad advice into a concrete choice the agent must make.

- [Fix root causes](./.agents/skills/principle-fix-root-causes/SKILL.md) reproduces a defect and traces it before changing code.
- [Model the domain](./.agents/skills/principle-model-the-domain/SKILL.md) replaces repeated shape assumptions with one structure.
- [Subtract before you add](./.agents/skills/principle-subtract-before-you-add/SKILL.md) removes obsolete code before adding another layer.
- [Separate before serializing shared state](./.agents/skills/principle-separate-before-serializing-shared-state/SKILL.md) isolates concurrent writers before adding locks.
- [Prove it works](./.agents/skills/principle-prove-it-works/SKILL.md) checks the real command, UI flow, stored value, or profile.
- [Explain the number](./.agents/skills/principle-explain-the-number/SKILL.md) finds what limits a measurement and rules out errors, skipped work, and noise before anyone trusts it.

The [principles guide](./docs/guide/08-principles.md) covers all 24 and shows how to use their names to redirect a task.

## Make it yours

`/superdev-mode` is one set of engineering defaults. Your team may want different review depth, model choices, response style, or autonomy rules.

Run [`/automate-me`](./.agents/skills/automate-me/SKILL.md) to draft a personal `-mode` skill from repeated patterns in your own work. Run [`/reflect`](./.agents/skills/reflect/SKILL.md) after a difficult task to turn a lesson into a proposed skill edit.

## License

[MIT](./LICENSE). Copyright and license notices are included in [NOTICE.md](./NOTICE.md).
