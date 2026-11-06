import { defineConfig } from "astro/config";
import { resolveDeployment } from "./src/lib/deployment.mjs";

export default defineConfig({
  ...resolveDeployment({ GITHUB_REPOSITORY: "ysf-kul/muse", ...process.env }),
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
});
