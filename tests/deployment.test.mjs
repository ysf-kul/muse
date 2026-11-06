import test from "node:test";
import assert from "node:assert/strict";
import { resolveDeployment } from "../src/lib/deployment.mjs";

test("an unspecified repository uses root without inventing an origin", () =>
  assert.deepEqual(resolveDeployment({}), { base: "/", site: undefined }));
test("Muse's actual repository resolves to its project path", () =>
  assert.deepEqual(resolveDeployment({ GITHUB_REPOSITORY: "ysf-kul/muse" }), {
    base: "/muse/",
    site: "https://ysf-kul.github.io",
  }));
test("GitHub user sites use the root path", () =>
  assert.deepEqual(
    resolveDeployment({ GITHUB_REPOSITORY: "ysf-kul/ysf-kul.github.io" }),
    { base: "/", site: "https://ysf-kul.github.io" },
  ));
test("explicit origins and paths can override inferred hosting", () =>
  assert.deepEqual(
    resolveDeployment({
      GITHUB_REPOSITORY: "ysf-kul/muse",
      SITE_URL: "https://example.org",
      BASE_PATH: "/tools/muse/",
    }),
    { base: "/tools/muse/", site: "https://example.org" },
  ));
test("unsafe base paths fail early", () => {
  for (const base of [
    "muse",
    "/muse",
    "//muse/",
    "/../",
    "/./",
    "/muse?x/",
    "/<script>/",
  ])
    assert.throws(() => resolveDeployment({ BASE_PATH: base }), /BASE_PATH/);
});
test("origin URLs cannot contain paths or scripts", () => {
  for (const site of [
    "javascript:alert(1)",
    "https://example.org/muse/",
    "https://example.org/?q=1",
  ])
    assert.throws(() => resolveDeployment({ SITE_URL: site }), /SITE_URL/);
});
