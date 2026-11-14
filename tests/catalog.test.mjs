import test from "node:test";
import assert from "node:assert/strict";
import {
  validateCatalog,
  publishedApps,
  isWebUrl,
  isAssetPath,
} from "../src/lib/catalog.ts";

const localized = (text) => ({ tr: text, en: text });
const fixture = (extra = {}) => ({
  id: "test-fixture",
  name: "Test fixture",
  tagline: localized("Test data only"),
  description: localized(
    "Synthetic data for validation tests, never published.",
  ),
  status: "prototype",
  published: false,
  ...extra,
});

test("empty production catalog is valid", () =>
  assert.deepEqual(publishedApps([]), []));
test("unpublished projects do not create public pages", () =>
  assert.deepEqual(publishedApps([fixture()]), []));
test("published entries are selected without changing the source", () => {
  const source = [
    fixture(),
    fixture({ id: "second-fixture", published: true }),
  ];
  assert.deepEqual(
    publishedApps(source).map((app) => app.id),
    ["second-fixture"],
  );
  assert.equal(source.length, 2);
});
test("duplicate and unsafe slugs fail", () => {
  assert.throws(() => validateCatalog([fixture(), fixture()]), /duplicate/);
  for (const id of ["../escape", "UPPER", "space name", ""])
    assert.throws(() => validateCatalog([fixture({ id })]), /slug/);
});
test("required content and explicit publication status are enforced", () => {
  for (const key of ["name", "tagline", "description"])
    assert.throws(() => validateCatalog([fixture({ [key]: " " })]), /required/);
  assert.throws(
    () => validateCatalog([fixture({ published: undefined })]),
    /boolean/,
  );
});
test("only verified Windows and Linux support can be listed", () => {
  assert.throws(
    () => validateCatalog([fixture({ platforms: ["macOS"] })]),
    /Windows and Linux/,
  );
  assert.throws(
    () => validateCatalog([fixture({ platforms: ["Windows"] })]),
    /runtime test/,
  );
  assert.throws(
    () =>
      validateCatalog([
        fixture({ testedPlatforms: [{ platform: "Linux", environment: "" }] }),
      ]),
    /environment/,
  );
  assert.doesNotThrow(() =>
    validateCatalog([
      fixture({
        platforms: ["Windows", "Linux"],
        testedPlatforms: [
          { platform: "Windows", environment: localized("Test environment A") },
          { platform: "Linux", environment: localized("Test environment B") },
        ],
      }),
    ]),
  );
});
test("build verification does not create a support claim", () => {
  const app = fixture({ buildVerifiedPlatforms: ["Windows", "Linux"] });
  validateCatalog([app]);
  assert.equal(app.platforms, undefined);
  assert.equal(app.testedPlatforms, undefined);
});
test("optional URLs reject scripts, credentials, and empty links", () => {
  for (const url of [
    "javascript:alert(1)",
    "data:text/html,hello",
    "",
    "https://user:password@github.com",
  ]) {
    assert.equal(isWebUrl(url), false);
    for (const key of [
      "repositoryUrl",
      "releaseUrl",
      "documentationUrl",
      "issuesUrl",
    ])
      assert.throws(() => validateCatalog([fixture({ [key]: url })]), /HTTP/);
  }
  assert.equal(isWebUrl("https://github.com/ysf-kul/muse"), true);
});
test("screenshots require real asset paths, alt text, and dimensions", () => {
  assert.equal(isAssetPath("/assets/../secret"), false);
  assert.equal(isAssetPath("https://example.invalid/image.png"), false);
  assert.throws(
    () =>
      validateCatalog([
        fixture({
          screenshots: [
            { src: "/assets/test.png", alt: "", width: 100, height: 100 },
          ],
        }),
      ]),
    /alt text/,
  );
  assert.throws(
    () =>
      validateCatalog([
        fixture({
          screenshots: [
            {
              src: "/assets/test.png",
              alt: localized("Test only"),
              width: 0,
              height: 100,
            },
          ],
        }),
      ]),
    /width and height/,
  );
});

test("application text must be complete in both languages", () => {
  for (const value of [
    "English only",
    { en: "English only" },
    { tr: " ", en: "English" },
  ]) {
    assert.throws(
      () => validateCatalog([fixture({ tagline: value })]),
      /Turkish and English/,
    );
  }
  assert.throws(
    () => validateCatalog([fixture({ features: [{ en: "Missing Turkish" }] })]),
    /Turkish and English/,
  );
});
test("downloads require a label and a safe URL", () => {
  assert.throws(
    () =>
      validateCatalog([
        fixture({
          downloads: [
            {
              label: "",
              platform: "Linux",
              url: "https://github.com/ysf-kul/muse",
            },
          ],
        }),
      ]),
    /label/,
  );
});
test("release dates reject normalized invalid calendar dates", () => {
  for (const releaseDate of ["2026-02-30", "2026-13-01", "yesterday"])
    assert.throws(
      () => validateCatalog([fixture({ releaseDate })]),
      /ISO date/,
    );
  assert.doesNotThrow(() =>
    validateCatalog([fixture({ releaseDate: "2026-11-07" })]),
  );
});
