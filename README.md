# SuperDevAgents

AI can write code fast. It can also produce sprawling, fragile code that no one wants to own. Throughput without quality is not the goal. If you want to go fast, go deep first.

**SuperDevAgents is a set of agent skills for rigorous engineering work.** The skills trace unfamiliar systems, explore designs, build the smallest useful change, challenge the result, and verify it against the real artifact. The goal is less code, better code, and evidence that it works.

**Parallel work has to earn your trust.** SuperDevAgents separates concurrent agents, gives each one a bounded job, and makes the parent inspect the result. More agents should increase coverage without turning the repository into a merge conflict.

**The skills are harness-neutral.** Install them as repository-local Agent Skills under `.agents/skills`. Any agent harness that discovers that directory can use them.

Fork it. Change it. Make it fit how your team works. Contributions are welcome.

## Install

Clone or download this repository:

```bash
git clone https://github.com/TheDarkSkyXD/SuperDevAgents.git
```

Copy the contents of its `.agents/` directory into the `.agents/` directory at the root of your project. Preserve any skills or agent definitions your project already has, and review same-name files before replacing them.

Start a new agent session after copying the files so your harness discovers the skills.

## Get started

Run the setup skill once in your project:

```text
/superdev-setup
```

Setup records your issue tracker, domain-document layout, triage labels, and model choices. Then route a real task through the main mode:

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

The mode includes 23 playbooks for investigations, bug fixes, features, refactors, performance work, prototypes, reviews, shipping, autonomous runs, and project-scale orchestration. Read the [playbook directory](./.agents/skills/superdev-mode/playbooks/) for the exact workflows.

## Reach for a focused skill when you want control

`/superdev-mode` routes to most skills for you. Invoke one directly when you want a specific kind of work.

| Skill | Use it when |
|---|---|
| [`/how`](./.agents/skills/how/SKILL.md) | You want a code walkthrough, runtime trace, or ownership critique. |
| [`/why`](./.agents/skills/why/SKILL.md) | You want the evidence behind a design, regression, or threshold. |
| [`/recall`](./.agents/skills/recall/SKILL.md) | You need your recent work on a topic reconstructed. |
| [`/architect`](./.agents/skills/architect/SKILL.md) | You want types, caller usage, and module boundaries settled before code. |
| [`/arena`](./.agents/skills/arena/SKILL.md) | You want several attempts at the same design or implementation, followed by one synthesized result. |
| [`/swarm`](./.agents/skills/swarm/SKILL.md) | You want independent slices checked in parallel and returned as one report. |
| [`/interrogate`](./.agents/skills/interrogate/SKILL.md) | You want several reviewers to challenge a design or diff. |
| [`/blast-radius`](./.agents/skills/blast-radius/SKILL.md) | You want to find what a change could break beyond the diff. |
| [`/tdd`](./.agents/skills/tdd/SKILL.md) | A bug has a cheap local regression-test path, or you explicitly want TDD. |
| [`/no-comments`](./.agents/skills/no-comments/SKILL.md) | You want a fresh reviewer to remove narrating comments and expose hidden design problems. |
| [`/create-verification-skill`](./.agents/skills/create-verification-skill/SKILL.md) | Your project has no repeatable way for an agent to drive the real app. |
| [`/show-me-your-work`](./.agents/skills/show-me-your-work/SKILL.md) | You want an auditable decision log for unattended work. |
| [`/figure-it-out`](./.agents/skills/figure-it-out/SKILL.md) | The work is too large or unusual for a bundled playbook. |
| [`/automate-me`](./.agents/skills/automate-me/SKILL.md) | You want a personal mode based on how you actually work. |
| [`/technical-writing`](./.agents/skills/technical-writing/SKILL.md) | You want docs, a README, an RFC, or a PR description tightened. |
| [`/bro`](./.agents/skills/bro/SKILL.md) | You want the last response restated without jargon. |

There are 61 skills in the collection. The rest cover architecture, domain modeling, issue triage, specifications, tickets, merge conflicts, research, code review, and the principles used by the main mode.

## The principles are executable rules

SuperDevAgents includes 21 short principle skills. They turn broad advice into a concrete choice the agent must make.

- [Fix root causes](./.agents/skills/principle-fix-root-causes/SKILL.md) reproduces a defect and traces it before changing code.
- [Model the domain](./.agents/skills/principle-model-the-domain/SKILL.md) replaces repeated shape assumptions with one structure.
- [Subtract before you add](./.agents/skills/principle-subtract-before-you-add/SKILL.md) removes obsolete code before adding another layer.
- [Separate before serializing shared state](./.agents/skills/principle-separate-before-serializing-shared-state/SKILL.md) isolates concurrent writers before adding locks.
- [Prove it works](./.agents/skills/principle-prove-it-works/SKILL.md) checks the real command, UI flow, stored value, or profile.

The [principles guide](./docs/guide/08-principles.md) covers all 21 and shows how to use their names to redirect a task.

## Make it yours

`/superdev-mode` is one set of engineering defaults. Your team may want different review depth, model choices, response style, or autonomy rules.

Run [`/automate-me`](./.agents/skills/automate-me/SKILL.md) to draft a personal `-mode` skill from repeated patterns in your own work. Run [`/reflect`](./.agents/skills/reflect/SKILL.md) after a difficult task to turn a lesson into a proposed skill edit.

## License

[MIT](./LICENSE)
