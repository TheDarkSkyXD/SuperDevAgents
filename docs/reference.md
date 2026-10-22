# superdev reference

Start with the [README](../README.md) for installation and your first task.

## Slash commands

The package includes 82 skill directories: 58 public skills and 24 `principle-*` references. Claude Code uses `/superdev:<name>`, Pi uses `/skill:<name>`, and Muse lists each user-invocable skill as `/<name>`. In Codex, request a skill by name or install the [optional shortcuts](#codex) for the `/name` form below.

Find each skill's instructions in the [skills tree](../plugins/superdev/skills/).

| command | use it when |
| --- | --- |
| `/superdev-mode` | default entry point for any non-trivial task |
| `/how` | walk through how a subsystem works |
| `/why` | investigate why something was built this way (parallel multi-MCP evidence) |
| `/architect` | settle types and module shape before writing code that crosses a function boundary |
| `/arena` | run N parallel attempts at the same task and pick the best parts |
| `/interrogate` | have three different models try to break a diff |
| `/automate-me` | draft your own personal -mode skill from recent transcripts |
| `/reflect` | capture a long task's lessons as a skill edit |
| `/correct` | find the mistakes agents keep repeating in a repo and make each one impossible, enforced at the highest level that works |
| `/tdd` | fix a bug by writing the failing test first, then the fix |
| `/benchmark-checklist` | vet a measured speedup or regression (limiter, tuning, errors, repeat runs, end-to-end relevance) before you report or act on it |
| `/typescript-best-practices` | ground type-system discipline in TypeScript syntax |
| `/teach` | explain a subsystem plainly by composing how + why |
| `/swarm` | fan out N parallel workers across slices or races, then return one aggregated report |
| `/technical-writing` | write docs, RFCs, readmes, PR descriptions, and commit messages to one layered standard |
| `/bro` | restate the last message in plain human language, no jargon |
| `/in-your-own-words` | play back your goal and the problem before the agent starts |
| `/sharpen` | aim a task at what you are really after, the way a top expert would, without overspecifying it |
| `/figure-it-out` | design a rigorous, auditable playbook for a task no bundled playbook fits |
| `/show-me-your-work` | log decisions to a reviewable tsv decision trail |
| `/blast-radius` | find what a change could break beyond the diff and prove safety by running code |
| `/recall` | catch up on recent working context from chat history, live state, and the shared record |
| `/ketchup` | catch up on everything in this chat since your last message, with an executive summary for each action item |
| `/superdev-setup` | configure the tracker, triage and Wayfinder labels, domain docs, and models |
| `/superdev-help` | answer a question about superdev with the prompt to send and the file the answer came from |
| `/unslop` | clean up writing by removing AI tells |
| `/no-comments` | strip comments before review, fix the accepted findings, encode claimed constraints |
| `/create-verification-skill` | generate a project-local verification skill and feature map |
| `/maintain-verification-skill` | re-sync a drifted verification skill and its feature map |
| `/create-formal-verification-skill` | generate a project-local skill that formally verifies one high-risk property |
| `/maintain-formal-verification-skill` | re-sync a formal verification after the code it covers changed |
| `/deslop` | deslop a diff before commit |
| `/babysit` | monitor an open PR, fix CI/comments, keep it merge-ready |
| `/thermo-nuclear-review` | audit a branch's changes for bugs, breakage, security issues, devex regressions, and feature-gate leaks |
| `/thermo-nuclear-code-quality-review` | extremely strict maintainability audit |
| `/thermos` | run both thermo-nuclear reviews as parallel subagents and synthesize their findings |
| `/make-pr-easy-to-review` | clean noisy history and improve PR description before review |
| `/fix-ci` | find failing PR checks, inspect logs, apply focused fixes |
| `/fix-merge-conflicts` | non-interactively resolve merge conflicts, validate, finalize |
| `/get-pr-comments` | fetch and summarize review comments from the active PR |
| `/what-did-i-get-done` | summarize authored commits over a user-chosen period |
| `/adversarial-review` | use the adversarial review workflow |
| `/code-review` | use the code review workflow |
| `/codebase-design` | use the codebase design workflow |
| `/diagnosing-bugs` | use the diagnosing bugs workflow |
| `/domain-modeling` | use the domain modeling workflow |
| `/grill-with-docs` | use the grill with docs workflow |
| `/grilling` | use the grilling workflow |
| `/handoff` | use the handoff workflow |
| `/implement` | use the implement workflow |
| `/improve-codebase-architecture` | use the improve codebase architecture workflow |
| `/prototype` | use the prototype workflow |
| `/research` | use the research workflow |
| `/to-spec` | use the to spec workflow |
| `/to-tickets` | use the to tickets workflow |
| `/triage` | use the triage workflow |
| `/universal-architecture` | use the universal architecture workflow |
| `/wayfinder` | use the wayfinder workflow |

## Runtime support

The following adapter details and historical live-check records come from the imported upstream port. SuperDev's current local checks and limitations are described in [harness setup](harnesses.md). A historical upstream check does not establish a live SuperDev session in that host.

All runtimes share [one skills tree](../plugins/superdev/skills/). A skills-only installation includes the skills, scripts, agent references, and license notices. The Claude Code, Codex, GitHub Copilot, and Muse plugins also install automatic routing hooks, and the Pi package adds an extension that injects the same routing and supplies the subagent tools. Codex command shortcuts are separate.

| Runtime | Setup and recorded verification |
| --- | --- |
| Claude Code | Install the marketplace plugin (Claude Code 2.1.292 or later). Skills use Claude tool names and model defaults; the plugin installs automatic routing. |
| Codex | Install the native plugin through the repository's marketplace and trust its hook through `/hooks`. The [Codex mapping](../plugins/superdev/skills/superdev-mode/references/codex-tools.md) translates Claude tools and model names. Shared skill symlinks were also detected in a live session. |
| Pi | Install the repository as a Pi package with `pi install`. The [Pi extension](../plugins/superdev/pi/index.ts) registers the subagent, question, and wake-up tools and `/loop`, and the [Pi mapping](../plugins/superdev/skills/superdev-mode/references/pi-tools.md) translates Claude tools and model names. The [equivalence table](pi-equivalence.md) records each Claude Code mechanism and how it was verified on Pi 1.1. |
| GitHub Copilot | Install the plugin through the repository's marketplace; the CLI and the GitHub Copilot app share it. The [Copilot mapping](../plugins/superdev/skills/superdev-mode/references/copilot-tools.md) translates Claude tools, paths, and model roles, and maps app-only tools to CLI fallbacks. Install, routing, agent dispatch, and first-run setup are smoke-tested on the CLI; see [GitHub Copilot](#github-copilot). |
| Muse | Install the native plugin bundle with `muse plugins install`, then approve its hooks and agent definitions with `muse plugins approve superdev`. The [Muse mapping](../plugins/superdev/skills/superdev-mode/references/muse-tools.md) translates Claude tools, subagents, transcripts, and model roles. See [Muse](#muse). |
| Prime Agent | Its documentation describes shared-directory discovery; it has not been tested in a live session. Choose tools and models through Prime's configuration. |
| opencode | Verified on version 2.0.30: discovery and skill loading in the CLI and the desktop app, and delegation through its `subagent` tool in the CLI. Configure agents, commands, and permissions in `opencode.json`. Its picker also lists principle skills. |
| Gemini CLI | Its documentation describes shared-directory discovery; it has not been tested in a live session. Use `/skills list` to check discovery and `/skills reload` after changes. |

These checks cover skill discovery. Delegation remains unverified on Prime Agent and Gemini CLI, and multi-model workflows on all three. On those runtimes, agents must adapt Claude-specific tools, models, and configuration. Each mapping applies only to its runtime.

### Automatic routing

The Claude Code, Codex, and GitHub Copilot plugins load the same short [routing instruction](../plugins/superdev/hooks/session-start-context.md) on startup, resume, clear, and compact. The Muse plugin loads its [Muse wording](../plugins/superdev/hooks/session-start-muse.md) of the same instruction. The [POSIX hook](../plugins/superdev/hooks/session-start.sh) runs on Claude Code, POSIX Codex, and GitHub Copilot, where it prints the instruction as JSON `additionalContext` with a Copilot addendum, and on Muse, where it prints plain text. On Windows, Codex uses a [PowerShell adapter](../plugins/superdev/hooks/session-start.ps1) through its `commandWindows` override and does not require Bash. The adapter runs with `-ExecutionPolicy Bypass`, which a machine or user execution policy set by Group Policy overrides; on such machines the hook fails and no instruction loads. Codex requires the user to trust plugin hooks through `/hooks`. On Pi, the [extension](../plugins/superdev/pi/prompt.ts) adds the same instruction to the system prompt at every agent start, so it survives compaction. The instruction invokes `superdev-mode` when a task meets any of these conditions:

- It touches more than one file or changes a signature other files call.
- It involves a design or architecture choice.
- It concerns a bug with an unknown cause or a performance issue.

Smaller tasks proceed directly. The full skill loads when invoked, and explicit user instructions take precedence.

To disable routing, run `superdev-setup` and turn off the session hook. In Claude Code, use `/superdev:superdev-setup`. You can also write `session hook: off` in the runtime's sheet, at the path in [superdev-setup's runtime table](../plugins/superdev/skills/superdev-setup/SKILL.md#other-runtimes). The hook reads that setting before injecting its instruction. Without the setting, routing stays on.

Skills-only installs and other runtimes do not include the hook or the Pi extension. Request `superdev-mode` explicitly, or add a standing instruction to the runtime's instruction file.

### Shared skills installation

Use this path for Prime Agent, opencode, Gemini CLI, or a skills-only Codex installation. Run the script under [Other harnesses](../README.md#other-harnesses) in the README, which clones the repository and links its skills into `~/.agents/skills/`.

Keep all skill directories, including the principle references. Leave the clone at this path while the links are installed.

### Manage linked skills

If a destination already exists, inspect it before replacing it. The installation skips existing files, directories, and links.

To update, run `git pull` in the clone that the links point to, then run the install loop again. A pull updates skills that are already linked but does not link new skill directories. To uninstall a linked skill, remove its link at `~/.agents/skills/<name>`. This removes it from every runtime using that directory.

### Install with the skills CLI

To install without keeping a local clone:

```shell
npx skills add https://github.com/TheDarkSkyXD/SuperDevAgents/tree/main/plugins/superdev/skills --skill "*" --agent "*" --yes
```

The [CI installation check](../.github/workflows/ci.yml) uses the skills CLI to copy the checkout's skill tree and compare the installed files with their sources.

### Codex

The [native plugin manifest](../plugins/superdev/.codex-plugin/plugin.json) points to the shared skills directory and the Codex [SessionStart hook](../plugins/superdev/hooks/codex-hooks.json). The [marketplace catalog](../.agents/plugins/marketplace.json) lists `superdev` in the `superdev-agents` marketplace. Review and trust the hook through `/hooks`; Codex asks again when its definition changes.

The [README installation](../README.md#codex) registers that catalog with `codex plugin marketplace add`, then installs the plugin with `codex plugin add`. These commands match the help output from `codex-cli 0.154.0-alpha.6.2`. A fresh native installation was not tested for this documentation change.

OpenAI documents [marketplace registration and the plugin format](https://developers.openai.com/plugins/build/plugins#add-a-marketplace-from-the-cli). If your CLI lacks `plugin add`, use the plugin browser after registering the marketplace, or use the [skills-only installation](#shared-skills-installation).

Request `superdev-mode` by name or select its entry, such as `superdev:superdev-mode`. To enable parallel subagents:

```toml
[features]
multi_agent = true
```

Add this setting to `~/.codex/config.toml` if subagents are disabled. Skills such as `arena`, `interrogate`, and `architect` use parallel agents. The [mapping](../plugins/superdev/skills/superdev-mode/references/codex-tools.md) describes a sequential fallback and translates Claude tool names, model defaults, and verification instructions.

For optional slash-command shortcuts, run this from the clone's root:

```shell
mkdir -p ~/.codex/prompts
for c in plugins/superdev/.codex-plugin/prompts/*.md; do
  target=~/.codex/prompts/"$(basename "$c")"
  test -e "$target" || test -L "$target" || ln -s "$(pwd)/$c" "$target"
done
```

Each shortcut invokes its skill. The commands skip existing files and links. Remove a shortcut by deleting its link at `~/.codex/prompts/<name>.md`. Both native-plugin and skills-only installations work without these shortcuts.

### Pi

The repository root is a [Pi package](https://pi.dev/packages): its [`package.json`](../package.json) lists the shared skills directory and the [superdev Pi extension](../plugins/superdev/pi/index.ts). Install it with `pi install git:github.com/michael-denyer/superdev-claude`, or `pi install <clone path>` for a local checkout.

The extension supplies what Pi lacks natively, under the Claude Code names the skills use:

- `agent` dispatches a child `pi --mode rpc` process with the skill's `subagent_type`, model, and effort, in the foreground or background, optionally in its own git worktree. A background agent's completion joins the running turn after its current tool calls, or starts a turn when the session is idle.
- `send_message`, `list_agents`, and `stop_agent` message, list, and stop those agents. A message to a running agent is an RPC `steer` on the child's stdin, which the agent reads after its current tool calls before it carries on in the same run. A finished agent resumes with the message. An agent's status follows its process. `list_agents`, a foreground agent's result, and each completion notice name the child's transcript, `<timestamp>_<session id>.jsonl` under `<agent dir>/superdev/<parent session id>/agents/`, so a user can follow a running agent with `tail -f` or render a finished one with `pi --export`. A running agent's `list_agents` entry also carries `activity`, its current or last tool call and its latest message, read from the child's RPC events and kept in memory, so the model sees it only in a `list_agents` result. The top-level session shows the count and the most recently active agent in a `superdev-agents` footer line, and the user can run `/superdev-agents` for a per-agent view that is not sent to the model.
- `ask_user_question` and `schedule_wakeup` match `AskUserQuestion` and `ScheduleWakeup`, and `/loop` matches the `loop` skill. In a child agent, asking a question and scheduling a wakeup both return an error.
- At every agent start it adds the routing instruction, the override sheet `~/.pi/agent/superdev-models.md`, and a pointer to the Pi mapping to the system prompt.

Family names such as `opus` resolve through the `pi` block of [`models.json`](../plugins/superdev/models.json) to model IDs for the provider the Pi session runs on. A ChatGPT sign-in (`openai`, or the legacy `openai-codex`) gets OpenAI models, and Anthropic or any other provider gets Claude models. Pi warns that Anthropic bills Claude used through Pi per token, as extra usage, even on a Claude subscription, and every subagent superdev starts adds to that bill. Run superdev in Claude Code to stay within a Claude plan's limits. A `pi models:` line in the sheet remaps any family name. The [Pi mapping](../plugins/superdev/skills/superdev-mode/references/pi-tools.md) lists every translation, and the [equivalence table](pi-equivalence.md) records what was verified and how.

### GitHub Copilot

The Copilot CLI reads the Claude Code [marketplace](../.claude-plugin/marketplace.json). For the plugin it looks for `.github/plugin/plugin.json` before `.claude-plugin/plugin.json`, so superdev ships a [Copilot manifest](../plugins/superdev/.github/plugin/plugin.json) whose `hooks` field names [`hooks/copilot-hooks.json`](../plugins/superdev/hooks/copilot-hooks.json). Copilot then skips the Claude Code `hooks/hooks.json`, so each hook runs once, and Claude Code keeps reading its own manifest. The GitHub Copilot app loads plugins installed into `~/.copilot`; a manual app check of routing, first-run setup, agent dispatch, `session hook: off`, and the app-only tools passed on 2026-09-25. To try a local checkout, pass its absolute path to `copilot plugin marketplace add`. Skills load by bare name through the `skill` tool, and a user types `/superdev:<skill>` in the CLI prompt; the agents keep their prefix, `superdev:superdev-agent` and `superdev:comment-sicko`.

Copilot's hook file runs the [SessionStart hook](../plugins/superdev/hooks/session-start.sh) with the `copilot` argument. It prints JSON `additionalContext`: the routing instruction plus a [Copilot addendum](../plugins/superdev/hooks/session-start-copilot.md). It reads the model sheet, which sits outside Copilot's path sandbox, and checks it with the [same POSIX `awk` validator](../plugins/superdev/skills/superdev-setup/scripts/sheet.awk) that `superdev-setup` runs through `check-sheet.sh` after it writes the sheet. A valid sheet adds one line per known role, rebuilt from the checked values, so no other sheet text reaches the context. An invalid sheet adds `sheet invalid:` with each problem, and a missing sheet adds a note; both tell the session to run `superdev-setup` first. A second hook, [`pre-tool-use.sh`](../plugins/superdev/hooks/pre-tool-use.sh) with the matcher `view|task|bash`, does three things on Copilot. It approves reads inside the plugin directory so playbooks and references load without a path-access prompt. It approves registered scripts with their declared argument contracts and matching interpreters, using a strict command form with no shell metacharacters. It checks path operands separately from prose fields; unknown scripts and argument forms take the normal permission flow. Setup, SessionStart, and PreToolUse share one sheet decoder, including UTF-16LE support. While the sheet is valid, it denies a `superdev:*` `task` call whose `model` is not one of the saved choices, with the saved IDs in the reason. It stays silent on everything else and always exits 0, because Copilot denies a tool call when the hook fails; an `awk` error still reaches stderr. Copilot runs plugin hooks on every session start, so the Claude matcher does not apply. The hook runs lazily, after the first message is submitted and before the first model turn, including when that message is a slash command such as `/superdev:arena`. A resumed session runs it again with source `resume`, and the model still sees one routing block. On CLI 1.0.87 through 1.0.92, the context of several plugins' session-start hooks merges ([github/copilot-cli#3589](https://github.com/github/copilot-cli/issues/3589) reported that only the last one survived). If a version drops the merge, use the standing instruction from `superdev-setup`. On 1.0.92, when the CLI's cached experiment assignment turns on computer use, `-p` sessions load no plugin skills while interactive sessions still do; the smoke test clears that cache before each `-p` probe.

superdev ships no default Copilot models, because the models an account reaches depend on its plan and policy. The first skill that dispatches on role models runs `superdev-setup`. It asks one `ask_user` question per tier and panel slot, each a short list drawn from the `task` tool's models and grouped by vendor, and recommends no model. It then writes `${COPILOT_HOME:-~/.copilot}/superdev-models.md` and runs `check-sheet.sh`, and later sessions receive its choices from the hook. Choose panel models from distinct vendors. A role value's `@<level>` suffix and the sheet's `default effort` line map to the `task` tool's `reasoning_effort`.

Copilot lists only part of a large plugin's skills in its prompt, so some superdev skills do not appear there; each one still loads by name. If another hook or a skills-only install displaces the routing instruction, `superdev-setup` offers a standing instruction for `~/.copilot/copilot-instructions.md`.

[`tests/copilot-smoke.sh`](../tests/copilot-smoke.sh) installs the checkout into a throwaway `COPILOT_HOME` and checks installation, routing, `session hook: off`, agent dispatch with an explicit model, first-run setup, that setup writes no sheet without the user's answers and exactly the supplied IDs with them, and that saved choices and plugin files reach a session without `--allow-all-paths` or any path-access request, from each session's `events.jsonl` and the written sheet. It runs the setup checks once per model in `SMOKE_SETUP_MODELS`. It also checks the `PreToolUse` deny, a vendored script and `check-sheet.sh` run with no permission request, that an injected sheet line stays out of the context, that an invalid sheet yields `sheet invalid`, that each hook fires once, the merge with a second plugin's session-start context, a `-p` resume, and, on a pseudo-terminal through [`tests/copilot-tui.py`](../tests/copilot-tui.py), a slash-command first message and an interactive resume. It needs a signed-in `copilot` CLI, spends about twenty premium requests, and skips when `copilot` is missing. CI does not run it.

### Muse

The Muse build is a native Muse plugin bundle rooted at `plugins/superdev/`. Its [manifest](../plugins/superdev/.muse-plugin/plugin.json) lists every shared skill as a skill capability and one inline `SessionStart` hook that runs the shared hook script with the `muse` argument. The generator owns the manifest's skill list, so it always matches the tree. Muse rejects a command whose id duplicates a skill id, so the build ships no command templates: Muse lists each user-invocable skill as `/<name>` itself, and plugin skills load with `read_skill` as `plugin:superdev:<name>`.

Install from a clone as the [README](../README.md) shows, then approve the plugin. Muse runs third-party hooks and agent definitions only after `muse plugins approve superdev`; until then the skills work on request and nothing routes automatically. Once approved, the hook prints the [Muse routing instruction](../plugins/superdev/hooks/session-start-muse.md) as plain additional context, plus the saved role lines from `${XDG_CONFIG_HOME:-~/.config}/muse/superdev-models.md` when the sheet has any. Only known role lines whose entries are model IDs or aliases reach the context, rebuilt from their checked values. `session hook: off` in the sheet disables the injection, as on the other runtimes.

Muse caps its skill catalog at 32 KB, so with SuperDev's 82 skills installed it compacts descriptions to fit; no skill id is dropped, and every skill still loads by name. The plugin's four `agents/` files register as Muse agent definitions under scoped ids such as `superdev/superdev-agent`, so superdev-mode's dispatches resolve as written, through the Muse mapping. A role's effort suffix passes as a Workflow child's `effort`, the Muse form of the dispatch effort field every runtime now uses. The Muse block of `models.json` gives a Muse model per tier; `subagent_spawn` takes a definition rather than a model, so per-role models apply where the dispatch takes one (a Workflow child's `model`), and the mapping says so. The `typescript-best-practices` skill's `paths` frontmatter is metadata on Muse, so `muse skills validate` reports it as an unsupported-field warning while the skill stays valid.

Update an installed copy after a `git pull` with `muse plugins update superdev`, and re-approve when Muse asks, since approval is pinned to the hook and agent definitions it first saw. Remove it with `muse plugins remove superdev`.

## Configuration and dependencies

Invoke [superdev-setup](../plugins/superdev/skills/superdev-setup/SKILL.md) to choose models for each role. It detects available models, confirms the choices, and writes an override sheet. Its [runtime table](../plugins/superdev/skills/superdev-setup/SKILL.md#other-runtimes) names the sheet path and loading mechanism for each runtime. Defaults live in [models.json](../plugins/superdev/models.json).

For design comparisons and reviews, choose distinct models available to your runtime. The default panel uses different Claude models.

Install dependencies for the workflows you use:

| Dependency | When you need it |
| --- | --- |
| GitHub CLI, `gh` | PR monitoring, shipping, and the `orch` stack frontier. Authenticate with `gh auth login`. The playbooks use Origin's CLI, `origin`, instead when it can resolve the repository. |
| Bun | The bundled `watch-pr` and `orch` scripts. Their bootstrap installs script dependencies on first run. |
| `plugin-dev` | Claude Code skill-authoring guidance used by `automate-me`, `reflect`, and `superdev-mode`. |

Install the Claude Code skill-authoring companion with:

```text
/plugin marketplace add anthropics/claude-plugins-official
/plugin install plugin-dev@claude-plugins-official
```

Those authoring workflows need `plugin-dev` for their guidance; other workflows do not. Codex and GitHub Copilot use the equivalents named in their mappings: [Codex](../plugins/superdev/skills/superdev-mode/references/codex-tools.md#driver-and-bundled-skills-superdev-references) and [Copilot](../plugins/superdev/skills/superdev-mode/references/copilot-tools.md#driver-and-bundled-skills-superdev-references).

Playbooks use the runtime's task-tracking tools or an uncommitted `todo.md` checklist. For Claude Code, the repository documents `CLAUDE_CODE_ENABLE_TODO_TOOLS=1`; see [platform adaptation](../plugins/superdev/skills/superdev-mode/SKILL.md#platform-adaptation).

Use [create-verification-skill](../plugins/superdev/skills/create-verification-skill/SKILL.md) to record how the agent should run and check your project, following the [driver policy](../plugins/superdev/skills/superdev-mode/SKILL.md#non-negotiables).

## Maintenance

### Repository layout

```text
.claude-plugin/marketplace.json    Claude Code marketplace
.agents/plugins/marketplace.json  Codex marketplace
package.json                      Pi package manifest
plugins/superdev/
  .claude-plugin/plugin.json      Claude Code plugin manifest
  .codex-plugin/                  Codex manifest and generated prompt stubs
  .github/plugin/plugin.json      GitHub Copilot plugin manifest
  .muse-plugin/plugin.json        Muse native plugin manifest (skill list generated)
  pi/                            Pi extension (subagent, question, and wake-up tools)
  skills/                        Shared skills, references, and scripts
  agents/                        Claude Code subagent definitions (Muse agent definitions too)
  hooks/                         Startup routing for Claude Code, Codex, Copilot, and Muse; Copilot tool checks
tools/                           Generation, installation, and validation
tests/                           Repository checks
```

Skills-only installs use `plugins/superdev/skills/`. Agent references and license files are included under `superdev-mode/references/`.

### Generated files and checks

The [generator](../tools/generate.mjs) updates versions, model defaults, Codex prompts, Copilot and Muse preambles and role lists, the Muse manifest's skill list, and portable reference files, and validates the Pi package manifest. The [slash-command table](#slash-commands) supplies the Codex prompt descriptions and order. Edit that table when changing a menu description, then regenerate. Keep a row for every public skill, with `superdev-mode` first.

[Documentation fact tests](../tests/readme-facts.test.mjs) check the skill counts. The table parser requires the header `| command | use it when |`.

Run the generator and repository tests with Bun:

```shell
bun install --frozen-lockfile
bun tools/generate.mjs
bun test tests/
```

The install step reads the root `bun.lock` and fetches `typebox`, which the Pi extension and its tests import.

CI checks generated files, the local mirror, import boundaries, Windows hooks, runtime scripts, and the repository tests. See [contributor checks](../CONTRIBUTING.md#check-a-change) and [release instructions](../CONTRIBUTING.md#release-a-change).

### Releases and licenses

The root `VERSION` file controls package versions. Record changes in [CHANGES.md](../CHANGES.md), then regenerate the bundle.

The bundled `thermo-nuclear-code-quality-review` provides a maintainability review, `thermo-nuclear-review` a correctness and security audit, and `thermos` runs both as parallel subagents.

See [NOTICE.md](../NOTICE.md) for copyright and license notices. [NOTICE-skills.md](../NOTICE-skills.md) is the notice included with skills-only installations.
