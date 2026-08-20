# Understand the code before changing it

Subtle regressions start when an agent edits the first plausible file without tracing the system. SuperDevAgents separates current behavior, historical reasons, and your own recent context.

## Trace current behavior with `$how`

```text
$how how do we deduplicate notifications? is there an N+1 lookup in the subscriber path?
```

[`$how`](../../.agents/skills/how/SKILL.md) follows runtime flow, names the important types and modules, and explains ownership boundaries. Ask for a critique when the structure itself looks wrong:

```text
$how explain the sync service, then critique its ownership boundaries.
```

## Find the reason with `$why`

```text
$why why was the retry limit set to five? does the original reason still hold?
```

[`$why`](../../.agents/skills/why/SKILL.md) searches available evidence such as source control, issues, docs, team chat, and observability. It separates direct evidence from inference and cites the sources it found.

Use `$how` for mechanics. Use `$why` for motivation, history, regressions, and thresholds.

## Rebuild your context with `$recall`

```text
$recall catch me up on the export work from last week.
```

[`$recall`](../../.agents/skills/recall/SKILL.md) reconstructs recent work from the active workspace and shared record. Use it when you return to a topic cold.

## Resume an unfinished branch

When another session left work in progress, route through the session-pickup playbook:

```text
$superdev-mode take over this branch. inspect what is already done, verify inherited claims, and continue without repeating finished work.
```

Do not treat an old summary as proof. The pickup workflow checks the branch, tests, and decision trail before it chooses a resume point.

Next: [Design the change](./04-design.md).
