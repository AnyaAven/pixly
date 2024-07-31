import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    root: process.cwd(),
    env: { DB_FILE: "test.db" },
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.js',
  },
  root: "src/client",
  plugins: [tsconfigPaths(), react()],

});
