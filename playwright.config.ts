import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/e2e_test",
  webServer: {
    command: "npm run dev -- -p 3000",
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    headless: process.env.HEADLESS !== "false",
    baseURL: "http://localhost:3000",
  },
});
