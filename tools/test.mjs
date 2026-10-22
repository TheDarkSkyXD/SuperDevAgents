#!/usr/bin/env bun
import { spawnSync } from "node:child_process";

const targets = process.platform === "win32"
  ? ["tests/superdev-port.test.mjs", "tests/workflow-parity.test.mjs", "tests/session-hook-windows.test.mjs", "tests/runtime-packaging.test.mjs", "tests/models.test.mjs", "tests/import-boundaries.test.mjs"]
  : ["tests/"];

if (process.platform === "win32") console.log("Running portable and native Windows checks. POSIX shell, signal, and symlink integration tests run in Linux CI.");
const result = spawnSync(process.execPath, ["test", ...targets], { stdio: "inherit" });
if (result.error) console.error(result.error.message);
process.exitCode = result.status ?? 1;
