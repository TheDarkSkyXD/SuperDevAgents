# Run long tasks without losing control

Unattended work needs a checkable contract. Time spent is not a result.

## Write the contract

State the goal, finish condition, working location, allowed writes, and escape condition:

```text
$superdev-mode I am stepping away. migrate every caller to the new parser in a fresh worktree.
done means zero old callers, all parser fixtures pass, and the old API is deleted.
commit completed units and keep a decision log.
if progress becomes impossible, stop and record the exact blocker.
```

The finish condition must pass or fail. "Work on this for four hours" cannot tell the agent whether the migration is complete.

## Keep a decision log

[`$show-me-your-work`](../../.agents/skills/show-me-your-work/SKILL.md) records one TSV row per decision with the reason, evidence pointer, and result. The log stays local by default. Commit it when a reviewer needs the trail to trust an ambitious run.

```text
$show-me-your-work keep an audit trail for this migration.
```

In the morning, inspect rejected attempts and unresolved risks as well as accepted changes. A useful log explains why the run changed direction.

## Pick the right long-running playbook

- Autonomous run drives one task until a finish predicate passes.
- Autopilot-full owns a queue of independent pull requests through merge, with independent verification before each merge.
- Autopilot-stack builds and verifies a linear stack but leaves the final landing to you.
- Orchestrate coordinates a project that spans many sessions, pull requests, and agents.
- Figure-it-out designs a custom auditable workflow when no bundled playbook fits.
- Session pickup resumes prior work. Pause safely leaves enough state for that resume.

Use the smallest playbook that fits. One task with one finish condition does not need project-scale orchestration.

Next: [Steer with principle names](./08-principles.md).
