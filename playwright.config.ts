import { defineConfig, devices } from "@playwright/test";
import { resolveDeployment } from "./src/lib/deployment.mjs";
const { base } = resolveDeployment({
  GITHUB_REPOSITORY: "ysf-kul/muse",
  ...process.env,
});
export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: "list",
  use: { baseURL: `http://127.0.0.1:4321${base}`, trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "npx astro preview --port 4321 --host 127.0.0.1 --ignore-lock",
      url: `http://127.0.0.1:4321${base}`,
      reuseExistingServer: !process.env.CI,
    },
    {
      command:
        "npx astro dev --root tests/detail-fixture --port 4322 --host 127.0.0.1 --ignore-lock",
      url: "http://127.0.0.1:4322/muse/",
      reuseExistingServer: !process.env.CI,
    },
    {
      command:
        "npx astro build --root tests/navigation-fixture --ignore-lock && npx astro preview --root tests/navigation-fixture --port 4324 --host 127.0.0.1 --ignore-lock",
      url: "http://127.0.0.1:4324/muse/",
      reuseExistingServer: !process.env.CI,
    },
  ],
});
