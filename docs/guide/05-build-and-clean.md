# Build the change and clean the diff

Good prompts state observable facts. The playbook supplies the engineering sequence.

## Match the prompt to the work

A bug prompt starts with the symptom:

```text
$superdev-mode this command emits two records after a retry. reproduce it first, find the cause, then fix and verify.
```

A feature prompt names new behavior and a preserved behavior:

```text
$superdev-mode add a --json flag. keep text output byte-identical and verify both forms.
```

A refactor prompt pins behavior before structure changes:

```text
$superdev-mode move parsing into one module with no behavior change. capture the current output first and compare it after.
```

A performance prompt starts with a measurement:

```text
$superdev-mode startup takes 1.8 seconds on this fixture. profile it, fix the measured cause, and show the before and after result.
```

For sustained improvement of one metric, use the hillclimb playbook. Give it the metric, target, and fixed measurement command. It keeps measured wins and rejects changes that do not help.

## Use `$tdd` when the test path is cheap

```text
$tdd reproduce the duplicate write with the smallest local test, then implement the fix.
```

[`$tdd`](../../.agents/skills/tdd/SKILL.md) applies when you explicitly request it or a bug has an obvious local regression-test target. A brittle mock stack can prove less than the real command, so the skill may choose executable verification instead.

## Clean code and prose before review

[`$deslop`](../../.agents/skills/deslop/SKILL.md) removes generated-code habits such as needless wrappers, unsupported guards, dead compatibility paths, and unrelated edits. [`$unslop`](../../.agents/skills/unslop/SKILL.md) tightens prose. [`$no-comments`](../../.agents/skills/no-comments/SKILL.md) asks a fresh reviewer to remove narrating comments and turn claimed constraints into code, tests, or lint rules when possible.

```text
$no-comments review this diff before I open the PR.
```

Cleanup is part of implementation. Extra code raises the maintenance cost even when every test passes.

Next: [Verify the result and ship it](./06-verify-and-ship.md).
