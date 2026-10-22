# Contribute to SuperDevAgents

Edit the canonical bundle under `plugins/superdev/`. The `.agents/skills` and `.agents/agents` directories are generated copies for repository-local discovery. Do not edit both copies independently.

## Check a change

Use Bun 1.3.14 or later:

```sh
bun install --frozen-lockfile
bun run generate
bun run check
bun run lint
bun run test
```

`generate` stamps versions, model guidance, runtime mappings, Muse capabilities, Codex command stubs, and portable notices, then synchronizes `.agents/`. `check` writes nothing and rejects stale output. Add a slash-command row in [the runtime reference](docs/reference.md#slash-commands) for every new public skill. All skills need portable `name` and `description` frontmatter and a pointer to the portable runtime contract.

`check` also verifies the shared workflow baseline. Its normalized reference hashes cover every shared plugin file. Each approved adaptation has an exact content hash and a reason. Changes to a workflow, script, model table, or adapted file fail the check. Review an intentional change before updating its baseline hash. Do not regenerate the baseline blindly. To check a local reference snapshot independently, run `node tools/verify-workflows.mjs --reference /path/to/reference/plugin`. The tool derives naming substitutions from that plugin's metadata and mode skill.

The test command selects portable and native hook checks on Windows. Run the full POSIX suite on Linux or macOS. To verify a checkout mounted from Windows in an isolated POSIX directory, run `bun tools/verify-posix.mjs` inside WSL. It retains its fixture and writes `.superdev-posix.log` for inspection. CI checks both operating-system paths.

The copy installer needs only Node 18 or later. Tests cover complete copies, reruns, dry runs, updates, collisions, dangling links, and preservation of local edits. Do not add overwrite behavior that bypasses these checks.

## Check runtime scripts

```sh
cd plugins/superdev/skills/superdev-mode/scripts
bun install --frozen-lockfile
bun run typecheck
bun test orch watch-pr check-plan.test.ts
```

For Pi adapter changes, install the supported Pi release and run `bun tools/typecheck-pi.mjs` from the repository root. `PI_PACKAGE_DIR` selects an isolated installation. The catalog and child-startup tests can require Pi with `SUPERDEV_PI_REQUIRE_CATALOG=1` and `SUPERDEV_PI_REQUIRE_RUNTIME=1`. Authenticated live harness tests remain separate and may consume provider requests. State which checks you ran.

ESLint separates repository build tools from installed runtime implementations. Build tools read plugin contracts as data. Installed runtime scripts cannot import repository-only tools or the `.agents` mirror. The boundary test proves allowed imports pass and forbidden imports fail.

## Release a change

Use SuperDev for installed names, runtime state, settings, and user-facing commands. Keep contributor copyright notices and MIT license texts. Record a new release in `CHANGES.md`, update `VERSION`, and run `bun run generate` followed by the checks above.

## Report a bug

Include the SuperDev version, host and version, operating system, installation method, failing command, and observed result. Distinguish skill discovery, routing, model selection, delegation, and live verification failures. Report private vulnerabilities through [the security guidance](SECURITY.md).
