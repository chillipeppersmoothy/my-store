import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/my-store/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.js",
    css: true,
    include: ["src/**/**.test.jsx"],
    exclude: ["**/node_modules/**", "**/src/main.jsx"],
    coverage: {
      reporter: ["text", "json", "html"],
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
      include: ["src/**/*.test.jsx"],
      exclude: ["**/node_modules/**", "**/src/main.jsx"],
    },
  },
});
