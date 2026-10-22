# Install SuperDev in your harness

SuperDev supports hosts that discover Agent Skills or can read a SKILL.md and its references. Native plugins add integration for specific hosts. A skill cannot grant its host tools, permissions, accounts, or model access.

## Install portable skills

Clone SuperDevAgents, then run this command from the clone with Node 18 or later:

```sh
node tools/install.mjs --target /path/to/project/.agents/skills
```

On Windows, quote a path with spaces:

```powershell
node tools/install.mjs --target "C:\My Project\.agents\skills"
```

Use the discovery directory documented by your host. `--target` accepts another directory, including a host-specific skills directory. `--global` selects `~/.agents/skills`. The installer copies each skill's scripts, references, and notices with it. It does not need symlinks or administrator privileges.

Preview with `--dry-run`. To update files that SuperDev installed and you have not edited, use `--update`. The installer checks all collisions before writing and refuses to replace edited or unmanaged files. Unrelated skills remain in place. It retains obsolete files during updates so an update never silently deletes local work. Review retired skills manually against the new skill list.

Start a new session. Ask your host to list its available skills and confirm that `superdev-mode` and `superdev-setup` appear. If the host does not discover skills, point it directly at the installed `superdev-mode/SKILL.md`. Ask:

```text
Use superdev-mode to handle this task. Read its portable runtime contract first.
```

To route future tasks automatically in a skills-only installation, add that instruction to the host's project instruction file. The installer does not modify project instructions.

## Use native integrations

| Host | Integration | Routing and requirements |
| --- | --- | --- |
| Claude Code | `superdev` in the `superdev-agents` marketplace | SessionStart hook and namespaced skills. The POSIX hook requires a shell. |
| Codex | Native `.codex-plugin` bundle and marketplace | Trust the hook through `/hooks`. Windows uses the PowerShell hook. Native delegation depends on host support. |
| GitHub Copilot | Native `.github/plugin` bundle | Copilot-specific hooks, model discovery, and tool mapping. The POSIX hooks require a shell. |
| Pi | Repository package and Pi extension | Extension supplies child agents, questions, and wake-up tools. Invoke `/skill:superdev-mode`. |
| Muse | Native `.muse-plugin` bundle | Approve hooks and agents with `muse plugins approve superdev`. |
| Cursor, OpenCode, Gemini CLI, Prime Agent, and other hosts | Portable skills | Use the host's actual discovery directory, tools, and model catalog. There is no automatic routing hook in this installation. |
| T3 Code | Portable skills plus the host's orchestration tools | The portable contract resolves custom models, provider instances, inherited options, and worktree child tasks through T3. |

The [README](../README.md#install) lists native installation commands. The inherited [runtime reference](reference.md#runtime-support) records upstream's adapter details. Upstream's live checks are historical evidence, not live verification of every SuperDev integration.

## Configure models

Run `superdev-setup` in the target harness. Preserve valid existing choices. Only select IDs and options that its current catalog exposes. Grok, Claude, OpenAI, and other providers are optional.

Native integrations keep their documented model sheets, role defaults, and setup requirements. Copilot requires a valid sheet before dispatching role models. Hosts without a native mapping can use `.agents/superdev-models.md` for project choices. For that portable configuration, use the current model:

```text
feature, refactoring: inherit-parent
bug-fix: inherit-parent
judgment and prose: inherit-parent
swarm workers: inherit-parent
default effort: session
```

For a panel, choose available distinct models if the host supports them. Report reduced diversity if only one model is available. Do not turn a sequential self-review into a claimed independent verdict.

## Verify a repository change

Development checks require Bun 1.3.14 or later. Installation of skill files requires only Node.

```sh
bun install --frozen-lockfile
bun run generate
bun run check
bun run test
```

The full upstream suite includes POSIX process, shell, symlink, and signal fixtures. Run it on Linux or macOS. The Windows test command runs the portable installer, model policy, packaging, and native PowerShell hook checks. CI runs the full POSIX suite and the Windows checks separately. Tests that need an installed or authenticated harness report skips unless its required-mode flag is enabled. No test result here implies a live model conversation in every host.

Edit canonical files under `plugins/superdev/`. `bun run generate` updates generated manifests, model guidance, command stubs, and the `.agents/` mirror. `bun run check` refuses stale output. Avoid installing both a plugin and a duplicate copy of the same skills into one harness.

The workflow check also protects the shared reference snapshot. It compares 262 files, including all shared workflow instructions, scripts, hooks, model tables, and assets. Of those, 245 match after name, repository-link, line-ending, and portable-pointer normalization. The remaining 17 have exact adaptation hashes and reasons in `tests/fixtures/workflow-baseline.json`. This detects content drift. Runtime tests exercise behavior separately. Neither check promises identical model responses or supplies a capability that a host lacks.
