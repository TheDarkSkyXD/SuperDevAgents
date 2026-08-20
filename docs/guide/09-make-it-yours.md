# Make the system yours

SuperDev mode contains strong defaults. Your team may want different response length, autonomy limits, model roles, review depth, or delivery rules.

## Configure models and repository conventions

Run:

```text
$superdev-setup
```

Setup writes `.agents/superdev-models.md` and repository guidance under `docs/agents/`. Missing model roles fall back to the harness. Rerunning setup updates the map without requiring you to edit every skill.

## Create a personal mode

```text
$automate-me
```

[`$automate-me`](../../.agents/skills/automate-me/SKILL.md) looks for repeated patterns in your workspace history, asks which ones are intentional, and drafts `.agents/skills/<handle>-mode/SKILL.md`. It references the existing SuperDev skills instead of copying their full instructions.

Run it again when your habits change:

```text
$automate-me update my mode with the work since its last edit.
```

## Capture a lesson after difficult work

```text
$reflect that took too long. propose the smallest skill edits that would prevent the same failure next time.
```

[`$reflect`](../../.agents/skills/reflect/SKILL.md) asks several reviewers to inspect the active transcript, then sorts proposed changes before editing. A one-off frustration should not become a permanent rule without evidence that it will change future decisions.

## Write focused skills for repeatable work

Use a focused skill when the workflow belongs to the project rather than your personal style. Verification, migration checks, release steps, and domain-specific review rules are good candidates.

Keep each skill operational. Point to existing skills instead of pasting their instructions, and test the behavior before depending on it.

Next: [Copy recipes and avoid common mistakes](./10-recipes-and-pitfalls.md).
