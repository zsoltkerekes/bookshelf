import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  // Override Vite CSS handling to ignore external PostCSS plugins during tests
  css: {
    postcss: {
      plugins: [],
    },
    modules: {
      // keep deterministic class names in tests
      generateScopedName: "[local]_",
    },
  },
  test: {
    environment: "jsdom",
    reporters: ["junit", "json", "verbose"],
    outputFile: {
      junit: "./coverage/junit-report.xml",
      json: "./coverage/json-report.json",
    },
    coverage: {
      provider: "istanbul",
    },
    // Enable CSS handling in Vitest, but PostCSS plugins are disabled above
    css: true,
  },
});
