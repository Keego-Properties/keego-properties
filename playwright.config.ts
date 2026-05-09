import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./test",
  use: {
    baseURL: "http://localhost:8080",
    trace: "on-first-retry",
  },
});
