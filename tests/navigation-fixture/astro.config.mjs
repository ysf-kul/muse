// Build the actual production templates/routes with an isolated synthetic catalog.
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
export default defineConfig({
  root: fileURLToPath(new URL("./", import.meta.url)),
  srcDir: fileURLToPath(new URL("../../src", import.meta.url)),
  publicDir: fileURLToPath(new URL("../../public", import.meta.url)),
  base: "/muse/",
  site: "https://ysf-kul.github.io",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  vite: {
    resolve: {
      alias: [
        {
          find: /^\.{1,2}\/(?:\.\.\/)*data\/apps(?:\.ts)?$/,
          replacement: fileURLToPath(new URL("./apps.ts", import.meta.url)),
        },
      ],
    },
  },
});
