import tsParser from "@typescript-eslint/parser";

export default [
  { ignores: [".agents/**", "node_modules/**"] },
  {
    files: ["tools/**/*.mjs"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [{ group: ["**/plugins/**", "**/.agents/**"], message: "Build tools read plugin contracts as data. Keep runtime implementation imports in adapter tests." }] }],
    },
  },
  {
    files: ["plugins/superdev/pi/**/*.ts", "plugins/superdev/skills/**/scripts/**/*.ts", "plugins/superdev/skills/**/scripts/**/*.mjs"],
    languageOptions: { parser: tsParser },
    rules: {
      "no-restricted-imports": ["error", { patterns: [{ group: ["**/tools/**", "**/.agents/**"], message: "Installed runtime scripts must work without repository build tools or the local mirror." }] }],
    },
  },
];
