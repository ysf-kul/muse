import test from "node:test";
import assert from "node:assert/strict";
import {
  messages,
  locales,
  translate,
  defaultLocale,
} from "../src/i18n/messages.ts";
import {
  localizedPath,
  localeFromPath,
  pagePath,
} from "../src/i18n/routing.ts";

test("Turkish is the default and dictionaries have identical complete keys", () => {
  assert.equal(defaultLocale, "tr");
  assert.deepEqual(
    Object.keys(messages.tr).sort(),
    Object.keys(messages.en).sort(),
  );
  for (const locale of locales)
    for (const [key, value] of Object.entries(messages[locale]))
      assert.ok(value.trim(), `${locale}.${key}`);
});
test("interpolation parameters match in both languages", () => {
  for (const key of Object.keys(messages.en)) {
    const params = (value) =>
      [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
    assert.deepEqual(params(messages.tr[key]), params(messages.en[key]), key);
  }
  assert.equal(translate("tr", "app.version", { version: "1.2" }), "Sürüm 1.2");
  assert.throws(
    () => translate("en", "app.version"),
    /Missing translation parameter/,
  );
});
test("localized URLs retain project, nested, and root bases", () => {
  for (const base of ["/", "/muse/", "/projects/muse/"]) {
    for (const locale of locales) {
      const url = localizedPath("software/real-app/", locale, base);
      assert.equal(localeFromPath(url, base), locale);
      assert.equal(pagePath(url, base), "software/real-app/");
    }
    assert.equal(localizedPath("", "tr", base), base);
    assert.equal(localizedPath("", "en", base), `${base}en/`);
  }
});
test("locale detection respects path-segment boundaries", () => {
  assert.equal(localeFromPath("/muse/enough/", "/muse/"), "tr");
  assert.equal(localeFromPath("/muse-other/en/", "/muse/"), "tr");
});
