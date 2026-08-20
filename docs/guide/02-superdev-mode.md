# Route work through `$superdev-mode`

[`$superdev-mode`](../../.agents/skills/superdev-mode/SKILL.md) is the main entry point. It matches your request to a playbook, keeps the required steps visible, and loads other skills when the task reaches them.

## State the goal, constraints, and evidence

You do not need to write a process manual. Describe what is wrong or what you want, name any boundary that must hold, and say how to recognize success.

```text
$superdev-mode users receive two notifications after a retry. reproduce it first. done means one notification across the retry fixture.
```

That prompt contains enough information for the bug-fix playbook. The mode supplies the missing process, including root-cause analysis and verification.

Feature prompts work the same way:

```text
$superdev-mode add CSV export. preserve the existing column order and verify the output against the fixture.
```

## Keep diagnosis read-only when that is the task

Say when you want an answer rather than a patch:

```text
$superdev-mode investigate why idle CPU rises after reconnect. diagnose only. do not change code.
```

The investigation, runtime-forensics, or trace-forensics playbook should end with evidence and a conclusion, not an unsolicited fix.

## Start a new task clearly

Long sessions carry decisions from earlier work. Mark a subject change so the mode rematches the task:

```text
$superdev-mode new task. find why the cache entry survives logout. read-only for now.
```

## Isolate parallel writers

Several agents cannot safely edit one worktree. Put each writing task on its own branch and worktree:

```text
$superdev-mode compare three parser designs. give each candidate its own worktree and verify the winner after synthesis.
```

The `$arena` skill handles repeated attempts at one artifact. `$swarm` handles independent slices or checks. The [design guide](./04-design.md) explains the difference.

## Name a focused skill only to override routing

Avoid prompts that prescribe a long chain such as "$how, then $architect, then $arena, then $interrogate." The playbook already owns the sequence. Name one skill when you want its exact behavior or more scrutiny than the default.

Next: [Understand the code before changing it](./03-understand.md).
