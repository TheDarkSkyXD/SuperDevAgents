# GitHub issue tracker

Issues and specs for this repo live as GitHub issues. Record the selected owner and repository during setup. Use a connected GitHub tool or `gh`, targeting that repository explicitly when outside its clone.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body-file <body-file>`. Write multi-line bodies to a file first.
- **Read an issue**: `gh issue view <number> --json number,title,body,labels,comments`.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v`; `gh` does this automatically when run inside a clone.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

When set to `yes`, PRs run through the same labels and states as issues, using the `gh pr` equivalents:

- **Read a PR**: `gh pr view <number> --comments` and `gh pr diff <number>` for the diff.
- **List external PRs for triage**: `gh api --paginate 'repos/{owner}/{repo}/pulls?state=open'`, selecting records whose `author_association` is neither `OWNER`, `MEMBER`, nor `COLLABORATOR`. Use the returned number to fetch the full PR and comments. `gh pr list` does not expose `authorAssociation` as a JSON field.
- **Comment / label / close**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

GitHub shares one number space across issues and PRs, so a bare `#42` may be either: resolve with `gh pr view 42` and fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Read its body, labels, and comments as described above.

## Ticket relationships

These operations apply to `to-tickets`, specs with child implementation tickets, and Wayfinder. Create the issues first, then attach parents and blockers. A sub-issue relationship does not create a blocking dependency.

- **Parent**: add a child with `gh api --method POST repos/<owner>/<repo>/issues/<parent>/sub_issues -F sub_issue_id=<child-db-id>`. Fetch the numeric database ID with `gh api repos/<owner>/<repo>/issues/<child> --jq .id`. Read back the parent's `GET .../sub_issues` or the child's `GET .../parent` endpoint to verify the relationship.
- **Blocking**: add a blocker with `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`. Resolve the blocker's database ID with the same issue endpoint. Read back the child's `/dependencies/blocked_by` endpoint and verify the blocker is present. Issue numbers and GraphQL node IDs cannot replace database IDs in these fields.
- **Fallback**: when a relationship is unsupported, record `Part of #<parent>` or `Blocked by: #<blocker>` in the child body. Preserve a parent's existing content if adding child pointers, and obey the invoking skill's rule about whether the parent may be edited. An authentication or permission failure remains an error to report.

GitHub documents the [sub-issue API](https://docs.github.com/en/rest/issues/sub-issues) and [dependency API](https://docs.github.com/en/rest/issues/issue-dependencies).

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

Setup ensures the map and four ticket-type labels below exist and records any custom label mappings here. Use `Ticket relationships` above for parent and blocking writes and their read-back checks.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body. `gh issue create --label wayfinder:map`.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue (`gh api` on the sub-issues endpoint). Where sub-issues aren't enabled, add the child to a task list in the map body and put `Part of #<map>` at the top of the child body. Labels: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: use the dependency operation and fallback in `Ticket relationships`. A ticket is unblocked when every blocker is closed.
- **Frontier query**: list children through the parent's `GET .../sub_issues` endpoint, or the saved child pointers when sub-issues are unavailable. For each open child, read its `GET .../dependencies/blocked_by` results and exclude it if any blocker is open or it has an assignee. With body-based blocking, resolve the referenced blockers and check their states. First in map order wins.
- **Claim**: `gh issue edit <n> --add-assignee @me`, the session's first write.
- **Resolve**: `gh issue comment <n> --body "<answer>"`, then `gh issue close <n>`, then append a context pointer (gist + link) to the map's Decisions-so-far.
