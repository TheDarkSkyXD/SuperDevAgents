# SuperDev changes

## 1.0.4 - Sync skills through pstack-claude 0.9.107

- Port changes since upstream 0.9.101 through [`e2cbd49`](https://github.com/michael-denyer/pstack-claude/commit/e2cbd491f94ee4ece30e028b9ff69a8b418d1723), preserving SuperDev setup, model policy, and portable runtime guidance.
- Add `/statechart` with its TLA+ compiler and verification suite, and `/ketchup-video` for subtitled catch-ups.
- Require run-confirmed interrogate findings, improve arena fallback and cross-judge selection, and keep unresolved dependency or platform comments on hold.
- Restore sharpen's prompt-rewriting workflow and update autopilot, planning, reflection, and measurement guidance.
- Fix fenced-example plan validation, angle-bracket skill links, and active-PR selection; allow Pi's ask tool to be disabled when another extension provides it.
- Pin CI to Bun 1.4.4 and add the statechart test job.

## 1.0.3 - Align the setup command with SuperDev

- Rename the setup skill to `/setup-superdev`, following the upstream `/setup-pstack` command pattern.
- Update runtime hooks, generated commands, and setup links to use the new name.
- Keep repository onboarding followed by the complete model, reasoning-effort, and session-hook setup.

## 1.0.2 - Complete engineering workflow setup

- Preserve the complete reference model setup and protect its ten steps with an independent content check.
- Add required Wayfinder labels alongside the triage and ready-for-agent label mappings.
- Configure parent and blocking operations for Wayfinder, specs, and implementation tickets, including read-back checks.
- Preserve configured document locations and resolve them through the active project's instruction pointers.

## 1.0.1 - Restore complete project setup

- Restore repository setup before model configuration for first-time setup and general reruns.
- Restore discovery of issue-tracker, triage-label, and domain-document setup through the skill description and Codex shortcut.
- Reuse existing tracker labels, create missing approved labels, and preserve saved settings on targeted reruns.

## 1.0.0 - Portable engineering workflows

- Provide 82 skills and native integrations for Claude Code, Codex, GitHub Copilot, Pi, and Muse.
- Add portable capability discovery, model selection, T3 orchestration guidance, and a safe copy installer.
- Generate the repository-local skill bundle from the canonical plugin.
- Verify installation, packaging, hooks, model policy, and import boundaries on Windows and POSIX systems.
- Use SuperDev naming throughout package metadata and documentation.
- Preserve native model setup and shared workflow gates. Keep project onboarding optional.
- Check all 262 shared plugin files against a normalized reference baseline, with exact hashes and reasons for each adaptation.
