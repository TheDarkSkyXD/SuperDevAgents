# Recipes and pitfalls

Replace the examples with your paths, symptoms, and finish conditions. Informal prompts are fine when the outcome is precise.

## Understand an unfamiliar subsystem

```text
$how trace how initialization works. then use $why to find why the ownership changed last month.
```

## Compare designs

```text
$arena compare three designs for this cache key. judge them on correctness, migration cost, and how much state callers must hold.
```

## Check independent packages

```text
$swarm run each package's check script. assign one package per worker and return one report with gaps.
```

## Review a branch skeptically

```text
$interrogate review the whole branch. do not change files. report correctness and regression risks, not preferences.
```

## Fix a bug through a failing test

```text
$superdev-mode reproduce the duplicate write. if there is a cheap local test path, use $tdd. then fix and rerun the real command.
```

## Leave a task running

```text
$superdev-mode keep going until every fixture passes and the old API has zero callers. commit verified units and keep a decision log.
```

## Redirect a drifting task

```text
The goal is diagnosis. do not implement a fix yet.
```

```text
Apply prove it works. show the real output, not the build result.
```

```text
$unslop tighten the README changes and remove filler.
```

## Avoid these mistakes

- **Listing every skill.** State the goal and constraints. Let the playbook sequence the work.
- **Using a vague finish condition.** "Make it better" cannot pass or fail. Name a command, artifact, value, or measured target.
- **Putting parallel writers in one worktree.** Give each writer its own branch and worktree.
- **Using `$arena` for coverage.** Arena repeats one artifact and synthesizes a winner. Swarm partitions independent slices.
- **Accepting every review comment.** Ask for evidence. Dismiss findings that do not survive the current code and behavior.
- **Treating a build as proof.** Run the command, drive the UI, inspect the stored value, or compare the profile.
- **Letting generated code stay padded.** Remove needless wrappers, narration, defensive dead paths, and unrelated edits before review.
- **Turning one bad session into a permanent rule.** Use `$reflect` to separate a repeatable lesson from an anecdote.

Return to the [guide index](./README.md) or start with [setup](./01-setup.md).
