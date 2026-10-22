import { expect, test } from "bun:test";
import { ESLint } from "eslint";

test("build tools and installed runtime code enforce separate import boundaries", async () => {
  const eslint = new ESLint();
  const [valid] = await eslint.lintText('import { walk } from "./validate-skills.mjs";\n', { filePath: "tools/valid.mjs" });
  expect(valid.errorCount).toBe(0);
  const [buildViolation] = await eslint.lintText('import { install } from "../plugins/superdev/pi/index.ts";\n', { filePath: "tools/invalid.mjs" });
  expect(buildViolation.messages.map((message) => message.ruleId)).toEqual(["no-restricted-imports"]);
  const [runtimeViolation] = await eslint.lintText('import { plan } from "../../../tools/generate.mjs";\n', { filePath: "plugins/superdev/pi/invalid.ts" });
  expect(runtimeViolation.messages.map((message) => message.ruleId)).toEqual(["no-restricted-imports"]);
});
