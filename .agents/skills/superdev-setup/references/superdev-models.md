# SuperDev model setup

Write `.agents/superdev-models.md`, the shared role-to-model map that SuperDev skills read. Missing files and missing roles fall back to the active harness's available models, so this file supplies overrides rather than required configuration.

## Detect available models

Enumerate the model identifiers and supported reasoning efforts accepted by the active harness's delegation interface. Determine whether effort is part of the identifier or a separate parameter. Prefer a harness-provided models API or CLI. If none can be detected, ask the user for the identifiers they can use.

Never write an unconfirmed identifier. The aliases `inherit-parent` and `auto` are always valid and both select the parent chat model.

## Load current choices

If `.agents/superdev-models.md` exists, read its budget line and role values as the current choices. Otherwise use the defaults shown below. During this step, drop and report any role line that is not in the current role list below; it belongs to a retired role.

Setup preserves existing role choices. If a saved role points to a retired, unavailable, or no longer wanted model, remove that role's line before rerunning setup and choose from the models the active harness reports. Older maps may contain `claude-fable-5-thinking-max`, `claude-fable-5-1-thinking-max`, `claude-opus-5-thinking-xhigh`, or `grok-4.6-fast-xhigh`. Remove those role lines when adopting the current defaults. To rebuild the whole map, remove the model map before rerunning. Never copy model names from another harness or an older setup guide without checking them.

## Choose and apply a reasoning budget

Use a budget already specified by the user. Otherwise ask for one, showing the recorded budget when available:

- `unlimited`, keep default efforts.
- `large`, target `xhigh` reasoning.
- `medium`, target `high` reasoning.
- `small`, target `medium` reasoning.

These presets control reasoning effort, not a spending limit or token allowance.

Build the working map from the defaults on every run. Preserve custom model families, panel lists and their order, and aliases. Restore default efforts for default entries before applying the selected budget so switching back to `unlimited` does not retain a previous reduction. Preserve explicitly chosen per-role efforts unless the user requests a budget change. If a custom entry's original effort is unknown, show that choice for confirmation rather than guessing.

For a finite budget, map every real model entry, including panel entries, to the target effort. With effort-bearing identifiers, replace only the effort token, usually the last token or the token before a trailing `fast`. Use detected identifiers rather than assuming a spelling. On the ladder `max` > `xhigh` > `high` > `medium` > `low`, choose the same family's highest supported effort at or below the target. If none exists, mark the entry as needing a choice. Preserve `inherit-parent` and `auto` unchanged.

If the harness takes effort separately, keep the detected model identifier and record the supported effort alongside that role entry as `model-id [reasoning_effort=high]`. This annotation is configuration metadata, not part of the model identifier. Delegates pass it through the harness's effort parameter. If effort cannot be controlled, mark the budget as unsupported for that entry and ask for a choice instead of claiming it was applied.

## Confirm the map

Show the selected budget, every role with its resulting model and effort, and each retired role line dropped while loading current choices. Mark a real identifier as invalid when it is not in the detected set. Ask the user whether to keep the map or change specific roles. Offer the detected models plus `inherit-parent` and `auto`. Explicit per-role changes made here override the preset.

Panel roles use one subagent per list entry, so list length controls the panel size. This applies to `arena runners`, `architect runners`, and `interrogate reviewers`. `arena cross-judge pool` is also a list, but Arena chooses one model from a family different from the parent's when possible. `swarm workers` supplies the default worker model unless a race assigns a model to each arm.

## Validate and write

Every real model identifier must appear in the detected set, and each separate effort annotation must be supported for that model. Validate the identifier without its annotation. Stop and ask for a replacement if either is invalid.

Overwrite `.agents/superdev-models.md` so reruns converge on one complete map. Record the chosen budget label and target effort, using `unlimited (default efforts)` for unlimited. Record any confirmed per-role exceptions alongside their entries. Use one line per role with these labels and defaults:

```text
# SuperDev model configuration. One line per role. Delete a line to fall back to the skill default.
# `inherit-parent` or `auto` uses the parent chat model. Alias entries in a panel list still count toward its fan-out.
# budget: unlimited (default efforts)
# An entry's [reasoning_effort=...] annotation is passed separately from its model identifier.
feature, refactoring, bug-fix, perf-issue, hillclimb: grok-4.7-xhigh-fast
judgment and prose: claude-opus-5-5-max
hardest tasks: claude-opus-5-5-max
how explorer: grok-4.7-xhigh-fast
how explainer: claude-opus-5-5-max
why investigators: grok-4.7-xhigh-fast
why synthesizer: claude-opus-5-5-max
reflect tooling: gpt-5.6-sol-max
reflect judgment, divergent, synthesizer: claude-opus-5-5-max
arena runners: claude-opus-5-5-max, gpt-5.6-sol-max, grok-4.7-xhigh-fast
arena cross-judge pool: claude-opus-5-5-max, gpt-5.6-sol-max, grok-4.7-xhigh-fast
swarm workers: grok-4.7-xhigh-fast
architect runners: claude-opus-5-5-max, gpt-5.6-sol-max, grok-4.7-xhigh-fast
interrogate reviewers: claude-opus-5-5-max, gpt-5.6-sol-max, grok-4.7-xhigh-fast
```

Tell the user the model map was written and that rerunning `$superdev-setup` can update it.

Check whether the project has a `verify-*` skill under `.agents/skills` or another way to drive the real app. If it has none, offer once to create a project-local verification skill with `/create-verification-skill`. If the user accepts, read and follow `.agents/skills/create-verification-skill/SKILL.md`.
