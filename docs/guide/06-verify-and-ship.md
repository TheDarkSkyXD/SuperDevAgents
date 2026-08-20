# Verify the result and ship it

A build proves that code compiles. It does not prove that the changed behavior works. The [Prove It Works principle](../../.agents/skills/principle-prove-it-works/SKILL.md) requires the agent to check the real artifact.

## Define the finish condition

```text
$superdev-mode add JSON output. done means text output is unchanged, JSON parses, and both forms run against the sample project. show the evidence.
```

Match the check to the change:

- Run the real command for a CLI change.
- Walk the changed flow in the running app for a UI change.
- Replay a saved input for a parser or migration.
- Compare before and after profiles for a performance change.
- Read the written value back for a storage change.

If a check cannot run, the result is inconclusive. The final response should name the blocker rather than imply success.

## Create a project verification skill

Run this when the project has no repeatable way to exercise user behavior:

```text
$create-verification-skill
```

[`$create-verification-skill`](../../.agents/skills/create-verification-skill/SKILL.md) inspects how the project starts, how a user drives it, and what evidence proves each feature. It writes a project-local verification skill and feature map, then proves one path before handoff.

Run [`$maintain-verification-skill`](../../.agents/skills/maintain-verification-skill/SKILL.md) when the app or feature map changes. The maintenance pass audits source coverage and drives the mapped features without editing product code to hide failures.

## Inspect the blast radius

For a small change with uncertain consequences:

```text
$blast-radius what else could this cache-key change break? prove the key compatibility claim by running code.
```

[`$blast-radius`](../../.agents/skills/blast-radius/SKILL.md) looks beyond the diff and identifies the one safety claim that needs direct proof.

## Open a focused pull request

```text
$superdev-mode open a PR with small ordered commits and put the verification evidence in the description.
```

The opening-a-PR playbook checks the diff, cleans code and prose, verifies the branch, and returns the real PR link. It should preserve unrelated work in a mixed worktree.

## Drive the PR to merge-ready

```text
$superdev-mode check this PR and get it merge-ready.
```

The babysit playbook handles conflicts, review threads, and CI in that order. A status-only request stays read-only. Merge authorization remains separate from making the PR green.

When you explicitly ask to land a verified stack, the shipping playbook independently checks each PR and lands only the contiguous verified run.

Next: [Run long tasks without losing control](./07-long-running-work.md).
