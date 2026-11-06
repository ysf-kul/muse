// An isolated test site. It is never part of the production build or catalog.
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
export default defineConfig({
  root: fileURLToPath(new URL("./", import.meta.url)),
  base: "/muse/",
  site: "https://ysf-kul.github.io",
  devToolbar: { enabled: false },
  publicDir: fileURLToPath(new URL("../../public", import.meta.url)),
});
