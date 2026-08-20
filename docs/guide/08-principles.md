# Steer with principle names

SuperDevAgents includes 21 principle skills. Each name points to a specific engineering rule, so a short correction can redirect a task without rewriting the whole prompt.

## Use the name and demand the changed decision

```text
Apply subtract before you add. remove the obsolete adapters before designing another one.
```

```text
Apply prove it works. run the import flow and inspect the written records.
```

```text
Apply separate before serializing shared state. give each writer its own worktree instead of adding a lock.
```

The agent should name the decision that changed. A principle name with no concrete consequence is decoration.

## Core principles

- [Laziness Protocol](../../.agents/skills/principle-laziness-protocol/SKILL.md) prefers deletion and the smallest sufficient change.
- [Foundational Thinking](../../.agents/skills/principle-foundational-thinking/SKILL.md) chooses the core data structures before logic.
- [Redesign from First Principles](../../.agents/skills/principle-redesign-from-first-principles/SKILL.md) treats a new requirement as a foundational assumption.
- [Subtract Before You Add](../../.agents/skills/principle-subtract-before-you-add/SKILL.md) removes dead weight before building.
- [Minimize Reader Load](../../.agents/skills/principle-minimize-reader-load/SKILL.md) reduces layers and hidden state.
- [Outcome-Oriented Execution](../../.agents/skills/principle-outcome-oriented-execution/SKILL.md) converges migrations on the target design.
- [Experience First](../../.agents/skills/principle-experience-first/SKILL.md) puts the user result ahead of implementation convenience.
- [Exhaust the Design Space](../../.agents/skills/principle-exhaust-the-design-space/SKILL.md) compares competing prototypes when no precedent exists.
- [Build the Lever](../../.agents/skills/principle-build-the-lever/SKILL.md) creates a repeatable tool for non-trivial work or proof.

## Architecture principles

- [Model the Domain](../../.agents/skills/principle-model-the-domain/SKILL.md) encodes repeated rules in one structure.
- [Boundary Discipline](../../.agents/skills/principle-boundary-discipline/SKILL.md) validates external data at system boundaries.
- [Type System Discipline](../../.agents/skills/principle-type-system-discipline/SKILL.md) makes illegal states hard or impossible to represent.
- [Make Operations Idempotent](../../.agents/skills/principle-make-operations-idempotent/SKILL.md) makes retries converge on the same result.
- [Migrate Callers Then Delete Legacy APIs](../../.agents/skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md) moves callers and removes the old path in one wave.
- [Separate Before Serializing Shared State](../../.agents/skills/principle-separate-before-serializing-shared-state/SKILL.md) removes avoidable sharing before adding coordination.

## Verification and delegation principles

- [Prove It Works](../../.agents/skills/principle-prove-it-works/SKILL.md) checks the real artifact.
- [Fix Root Causes](../../.agents/skills/principle-fix-root-causes/SKILL.md) reproduces and traces a symptom before fixing it.
- [Sequence Work into Verifiable Units](../../.agents/skills/principle-sequence-verifiable-units/SKILL.md) ends each small unit with a check.
- [Guard the Context Window](../../.agents/skills/principle-guard-the-context-window/SKILL.md) sends bulk work to bounded readers and keeps summaries in the main thread.
- [Never Block on the Human](../../.agents/skills/principle-never-block-on-the-human/SKILL.md) proceeds on reversible work and asks only for decisions the agent cannot discover.
- [Encode Lessons in Structure](../../.agents/skills/principle-encode-lessons-in-structure/SKILL.md) turns repeated advice into a check, type, lint, script, or skill.

You do not need to memorize the list. Return when a task drifts and pick the rule that names the correction.

Next: [Make the system yours](./09-make-it-yours.md).
