# Workflow labels

Build the label plan from installed consumers and saved mappings. Setup creates missing approved labels and preserves existing ones.

| Installed consumer | Required labels or mappings |
| --- | --- |
| `triage` | The category and state roles in [triage-labels.md](triage-labels.md) |
| `to-spec` or `to-tickets` | The ready-for-agent role from the triage mapping, even without `triage` |
| `wayfinder` | The map label and four ticket-type labels below, even without `triage` |

| Wayfinder role | Default tracker label | Meaning |
| --- | --- | --- |
| Map | `wayfinder:map` | The shared map of decisions |
| Research | `wayfinder:research` | A ticket gathering facts for a decision |
| Prototype | `wayfinder:prototype` | A ticket testing a possible design |
| Grilling | `wayfinder:grilling` | A ticket settling a decision with the user |
| Task | `wayfinder:task` | A prerequisite that unblocks a decision |

Keep Wayfinder mappings and relationship operations in the configured tracker document's `Wayfinding operations` section. Use those mappings when a workflow names a canonical label. Triage mappings remain in the document linked by `### Triage labels` in the project's agent instructions.

Local Markdown uses type and status fields instead of remote labels. Another tracker should record equivalent label, parent, dependency, and assignment operations in its tracker document. Report incomplete access separately from unsupported features.
