# The SuperDevAgents guide

SuperDevAgents works best when you state the outcome and the evidence, then let the mode choose the workflow. You do not need to list every skill or dictate each implementation step. This guide shows that habit with prompts you can adapt.

The guide has ten parts:

1. [Install and set up SuperDevAgents](./01-setup.md).
2. [Route work through `$superdev-mode`](./02-superdev-mode.md).
3. [Understand the code before changing it](./03-understand.md).
4. [Design the change](./04-design.md).
5. [Build and clean the change](./05-build-and-clean.md).
6. [Verify the result and ship it](./06-verify-and-ship.md).
7. [Run long tasks without losing control](./07-long-running-work.md).
8. [Steer with principle names](./08-principles.md).
9. [Make the system yours](./09-make-it-yours.md).
10. [Copy recipes and avoid common mistakes](./10-recipes-and-pitfalls.md).

Read the pages in order once. After that, use each page on its own.

## Remember one thing

Give the agent a goal and a checkable finish condition:

```text
$superdev-mode the export writes duplicate rows when a retry lands mid-run. reproduce it first, then fix and verify.
```

The symptom selects the bug-fix playbook. "Reproduce it first" keeps diagnosis ahead of implementation. "Verify" requires evidence from the real path.

Next: [Install and set up SuperDevAgents](./01-setup.md).
