# Design before writing code

The first design an agent produces is rarely the only viable one. SuperDevAgents uses explicit interfaces, competing attempts, and skeptical review when a decision is costly to reverse.

## Settle caller usage with `$architect`

```text
$architect design the import pipeline before implementation. start with how callers use it, then define the types and module boundaries.
```

[`$architect`](../../.agents/skills/architect/SKILL.md) traces the current system, explores several shapes, and stays involved while implementation fills in the chosen interface. Ask for a checkpoint when you want to review the design before code changes:

```text
$architect with a checkpoint. show me the selected design before implementing it.
```

## Compare repeated attempts with `$arena`

```text
$arena produce three cache-key designs from this brief. judge them against migration cost, correctness, and readability.
```

[`$arena`](../../.agents/skills/arena/SKILL.md) gives each candidate the same task, isolates writing candidates, selects a base, and grafts in stronger parts from the alternatives. Use it for design or implementation bakeoffs where you want one final artifact.

## Cover independent slices with `$swarm`

```text
$swarm check every package against its check script. assign one package per worker and return one report.
```

[`$swarm`](../../.agents/skills/swarm/SKILL.md) partitions coverage, exploration, or declared races. Each worker returns a bounded result. The parent drains every worker and reports gaps.

Use `$arena` when every worker attempts the same artifact. Use `$swarm` when workers own different slices.

## Challenge the result with `$interrogate`

```text
$interrogate review this branch skeptically. report real correctness and regression risks, not style preferences.
```

[`$interrogate`](../../.agents/skills/interrogate/SKILL.md) asks independent reviewers to find blind spots, then sorts their findings by actionability. It does not apply findings automatically.

Small changes do not need all of this. Use `$interrogate` for a finished change you distrust, `$architect` for new boundaries, and `$arena` for decisions where alternatives are cheap to explore now and expensive to revisit later.

Next: [Build and clean the change](./05-build-and-clean.md).
