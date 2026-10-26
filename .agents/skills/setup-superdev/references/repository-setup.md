# Repository setup

Scaffold the per-repository configuration used by the engineering skills:

- Issue tracker: where issues live, with GitHub as the default when the remote supports it
- Workflow labels: the triage roles and Wayfinder map and ticket types used by installed skills
- Domain docs: where `CONTEXT.md` and ADRs live, plus the rules for reading them

This is a guided setup. Explore first, show what you found, confirm choices with the user, then write.

For a targeted change, use only the relevant sections and preserve the other saved configuration. A labels-only request does not rewrite the issue tracker, domain docs, or model settings.

## Explore

Inspect the current repository without assuming its state:

- Run `git remote -v` and read `.git/config` to identify the host and repository.
- Check for `AGENTS.md` and `CLAUDE.md`, including an existing `## Agent skills` section.
- Follow existing `### Issue tracker`, `### Triage labels`, and `### Domain docs` pointers to their configured documents. Keep those locations on reruns; `docs/agents/` is the default for new configuration.
- Check for root `CONTEXT.md` and `CONTEXT-MAP.md` files.
- Check `docs/adr/` and any `src/*/docs/adr/` directories.
- Check whether `docs/agents/` contains prior setup output.
- Check for `.scratch/`, which may signal a local Markdown issue tracker.
- Check whether `triage`, `to-spec`, `to-tickets`, and `wayfinder` are installed. Inspect their label requirements using [workflow labels](workflow-labels.md). Wayfinder labels are needed even when `triage` is absent.
- Read existing tracker configuration and labels. On GitHub, resolve the target repository from its remote and use a connected GitHub tool or `gh label list --repo <owner/repo> --limit 1000 --json name,color,description`. Reuse existing label names where they already express a role.
- Look for real monorepo signals: `pnpm-workspace.yaml`, a `workspaces` field in `package.json`, or populated `packages/*` directories with their own `src/` trees. Without these signals, use a single domain context.

## Present findings and ask

Summarize what exists and what is missing. Take the following sections in order, one answer at a time. Lead with the recommended choice so the user can accept it in a word. Skip a question when inspection already settles it.

### Issue tracker

Explain that skills such as `to-tickets`, `triage`, and `to-spec` need to know where issues live and how to operate on them.

If a remote points to GitHub, recommend GitHub. If a remote points to GitLab, including a self-hosted GitLab instance, recommend GitLab. Otherwise offer:

- GitHub Issues, operated with `gh`
- GitLab Issues, operated with `glab`
- Local Markdown under `.scratch/<feature>/`
- Another tracker such as Jira or Linear, described by the user in one paragraph

Record the choice in `docs/agents/issue-tracker.md`. The GitHub and GitLab templates contain a pull-request or merge-request triage flag. Keep it off unless the user explicitly asks to use external contributions as triage requests.

### Triage label vocabulary

Run this section when `triage`, `to-spec`, or `to-tickets` is installed. The latter two consume the ready-for-agent mapping even without `triage`.

Ask one question: "Do you want to keep the default triage labels? Recommended: yes."

The five state roles and default tracker strings are `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. The two category roles are `bug` and `enhancement`. If the user declines the defaults, collect mappings to the repository's existing labels so the skills do not create duplicates. Preserve saved mappings on reruns unless the user asks to change them.

### Wayfinder conventions

When `wayfinder` is installed, include its five labels from [workflow labels](workflow-labels.md) in the label plan. Record any existing custom mappings in the tracker's `Wayfinding operations` section. Keep that section's map, child-ticket, blocking, frontier, claim, and resolution operations. Include `Ticket relationships` for specs and implementation tickets as well. Parent-child relationships and blocking dependencies are separate operations.

On GitHub, use native sub-issues and blocking links where supported. Record the available operations and their read-back checks without creating sample issues during setup. A missing credential or permission is pending setup, not evidence that GitHub lacks a feature. Use the documented body conventions only when a relationship is unavailable, and record that limitation.

### Domain docs

Use a single context by default: one root `CONTEXT.md` and root `docs/adr/` directory. Do not ask about this default unless inspection found monorepo signals.

For a monorepo, offer a multi-context layout with a root `CONTEXT-MAP.md` pointing to per-context `CONTEXT.md` files, then confirm the choice.

## Confirm the draft

Before writing, show the user:

- The `## Agent skills` block that will go into `CLAUDE.md` or `AGENTS.md`
- The proposed tracker and domain documents at their resolved locations
- The proposed triage mapping document when `triage`, `to-spec`, or `to-tickets` is installed
- Any mapped labels missing from the selected tracker that setup will create

Allow edits before writing.

## Write

Choose the instruction file as follows:

- If both `CLAUDE.md` and `AGENTS.md` exist, edit the one the active harness reads. Preserve the other file and its user content.
- If only `CLAUDE.md` exists, edit it.
- Otherwise, if `AGENTS.md` exists, edit it.
- If neither exists, ask which one the user wants to create.

Never create one instruction file when the other already exists. If the chosen file already has an `## Agent skills` section, update that section instead of appending a duplicate. Preserve surrounding user content.

Verify that the active harness loads the block. If it does not read the existing instruction file, use its documented include or instruction setting to point at that file. The tracker configuration stays in one place.

Use this block, omitting triage labels only when none of `triage`, `to-spec`, or `to-tickets` is installed. Preserve existing document paths:

```markdown
## Agent skills

### Issue tracker

[One-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

### Triage labels

[One-line summary of the label vocabulary]. See `docs/agents/triage-labels.md`.

### Domain docs

[One-line summary naming the single-context or multi-context layout]. See `docs/agents/domain.md`.
```

Use these seed templates:

- [issue-tracker-github.md](./issue-tracker-github.md) for GitHub
- [issue-tracker-gitlab.md](./issue-tracker-gitlab.md) for GitLab
- [issue-tracker-local.md](./issue-tracker-local.md) for local Markdown
- [triage-labels.md](./triage-labels.md) when `triage`, `to-spec`, or `to-tickets` is installed
- [domain.md](./domain.md) for domain-document rules and layout

For another tracker, write `docs/agents/issue-tracker.md` from the user's description.

### Ensure tracker labels exist

Ensure the approved labels required by installed skills exist in the selected tracker. This includes Wayfinder labels independently of triage labels. On GitHub, create each missing label through a connected GitHub tool or `gh label create "<mapped-label>" --repo <owner/repo> --description "<role meaning>"`. Read the resulting labels to verify creation. Existing labels keep their names, colors, and descriptions. Do not use `--force`, delete labels, or relabel existing issues as part of setup.

On a local Markdown tracker, the mapping file is the label vocabulary. For another tracker, use its documented label operations. If tracker access is unavailable, write the local configuration and report which labels remain to be created. Do not claim remote label setup succeeded.

## Finish

Read back the instruction pointers, their target documents, and the required tracker labels. Confirm that Wayfinder can locate `Wayfinding operations` and that specs and tickets can locate the ready-for-agent mapping and `Ticket relationships`. Confirm that the configured relationships explain both creating and reading back parent and blocking links. This verifies setup artifacts without publishing sample tickets.

Name the files written, the tracker labels created or reused, and the engineering skills that now consume them. Report any pending tracker operations. The user may edit `docs/agents/*.md` directly later. They only need to rerun setup to switch trackers or replace the configuration.
