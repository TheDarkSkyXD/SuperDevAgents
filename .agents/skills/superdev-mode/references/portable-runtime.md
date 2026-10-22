# Portable runtime contract

This contract applies to every SuperDev workflow, including direct skill invocation. User instructions and the host's permissions take precedence. Preserve each workflow's steps, role assignments, review gates, and completion criteria. Use the native mapping's configuration and model rules on its named harness. The fallbacks below apply only when that mapping or capability is absent. Claude tool names and model aliases in workflow prose describe the Claude adapter. They are not requirements for another harness.

## Discover capabilities first

Inspect the tools, model catalog, skill locations, and configuration exposed by this session. Resolve file reads, edits, terminal commands, search, task tracking, questions, delegation, browser control, and scheduling to available operations. Do not call a tool because a skill mentions its name. Never invent a model ID, reasoning option, provider, hook, or transcript path.

Use the applicable [Codex](codex-tools.md), [Pi](pi-tools.md), [Copilot](copilot-tools.md), or [Muse](muse-tools.md) mapping for details. Claude Code uses the workflow's Claude operations only when the current tool schema accepts them. On Cursor, OpenCode, Gemini CLI, Prime Agent, and other hosts, use the host's current capability catalog and configuration. This document is the fallback when there is no dedicated adapter.

| Workflow operation | Capability to use | Fallback |
| --- | --- | --- |
| Read or invoke a skill | Native skill loader | Read its SKILL.md and relative references as files |
| Read, search, edit, or run code | Host file and terminal tools | Report the specific missing operation if no equivalent exists |
| Track steps | Host task or plan tool | A task-specific Markdown checklist |
| Ask a necessary question | Host input tool | A plain-language question |
| Explore several angles | Available child agents | Labelled sequential exploration when delegation is unavailable |
| Delegate implementation | Available child agent with a bounded scope | The parent implements and verifies directly, reporting that delegation was unavailable |
| Require an independent review | A reviewer that did not write the change | Report the unmet review gate and continue independent work |
| Schedule recurring work | Native persistent scheduler | Explain that this session cannot provide persistent scheduling |
| Drive a browser or device | Host or project verification tools | Run supported CLI checks and report the missing live evidence |
| Read a prior transcript | Host history or a documented location | Ask for the missing context, never guess a filesystem path |

Sequential exploration is not an independent review or a diverse-model panel. A missing optional capability does not prevent other useful work. Do not simulate concurrency, persistent timers, or independent reviewers in prose.

These fallbacks override a workflow's tool-specific delegation steps when the host has no child-agent capability. Continue implementation and ordinary verification directly. A required independent review still needs a separate reviewer and remains an explicit unmet gate.

## Resolve models within the active harness

On Claude Code, Codex, Pi, GitHub Copilot, and Muse, follow the native mapping and setup skill for sheet locations, loading, defaults, and invalid-sheet handling. Native hooks and extensions must read the same choices the workflow uses. In particular, Copilot requires setup when its sheet is missing or invalid. Do not let a separate project sheet bypass a native hook's model checks.

On a host without a native mapping, read the project's `.agents/superdev-models.md` when present, then the host's documented user-level sheet. Do not rewrite another harness's saved choices during setup. Resolve role aliases through the active adapter before checking model availability. Use a configured provider, model ID, and options only when the active host supports them. The bundled `models.json` defines the native adapters' defaults. A Claude alias is never another provider's model ID. Grok is optional.

With no override, keep the native adapter's role defaults. When no adapter can resolve a default, inherit the current model and its supported options. Use `auto` or `inherit-parent` to request inheritance explicitly. For a panel, keep its configured roles and model choices. On other hosts, select distinct available models when possible. If only one is available, run separate reviewers when supported and disclose the reduced model diversity. If a requested model or option is unavailable, state the mismatch rather than silently substituting a different effort or speed.

Preserve explicitly requested reasoning and speed settings. Model options may be separate fields rather than a suffix in the model ID. Pass them through the selected dispatch tool's documented schema. Never claim that a model meets an effort policy when the host cannot control it.

## T3 Code orchestration

When T3 tools are available, query `orchestrator_capabilities` before selecting a provider or model. Its catalog includes configured custom models that a native agent tool may omit.

Use native child-agent tools for same-provider work only when they support the selected model and no options are requested or inherited. Use T3 `delegate_task` for cross-provider work, custom models unsupported by native dispatch, model options, or a separate worktree. Put options in `target.options`. Verify the provider, model, and options returned by dispatch.

Each delegated round gets a new `delegate_task` call and a distinct `clientRequestId`, stable across retries of that round. Include the original brief, current revision, previous findings, and unresolved objections. Retain `taskId` and use `task_status` or `task_cancel`. A returned `childThreadId` is storage, not a target for sending another review round.

Top-level thread launch tools create separate conversations. Use them only when the user asks for a separate conversation. Do not substitute them for child agents. Prefer T3's browser, device, scheduler, and PR monitoring tools when available. Respect ownership of a tab the user is driving.

## Installation limits

The skills-only installer copies instructions, references, scripts, and license notices. It does not install a harness, grant permissions, configure a model provider, add missing delegation tools, or enable plugin hooks. Ask for `superdev-mode` explicitly after installation, or add a standing instruction in the host's instruction file.

Plugin installs add the native integration for the named harness. Verify skill discovery in a new session. Report what was tested locally separately from upstream's recorded live checks.
