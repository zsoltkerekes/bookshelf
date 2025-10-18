import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  globalIgnores([
    "node_modules/*",
    ".husky/*",
    ".next/*",
    "public/*",
    "coverage/*",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
    },
  },
]);
