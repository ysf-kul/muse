import { test, expect } from "@playwright/test";
import { messages, locales } from "../../src/i18n/messages";
import { expectLanguage } from "./localization";

test("saved Turkish wins over direct English section URLs and refresh", async ({
  page,
}) => {
  await page.goto("");
  await page.locator("#language-toggle").click();
  await page.locator("#language-toggle").click();
  for (const route of ["en/software/", "en/about/", "en/", "en/missing/"]) {
    await page.goto(route);
    await expectLanguage(page, "tr");
    await expect(page.locator("#language-label")).toHaveText("Türkçe");
    await expect(page.locator("nav")).toContainText("Yazılımlar");
    await expect(page.locator(".site-footer")).toContainText(
      messages.tr["footer.description"],
    );
    await page.reload();
    await expectLanguage(page, "tr");
  }
});

for (const width of [375, 1440]) {
  test(`complete language journeys through production templates and app details at ${width}px`, async ({
    page,
    context,
  }) => {
    const base = "http://127.0.0.1:4324/muse/";
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base);
    await expectLanguage(page, "tr");
    for (const locale of ["en", "tr"] as const) {
      await page.locator("#language-toggle").click();
      await expectLanguage(page, locale);
      await page
        .getByRole("link", {
          name: messages[locale]["nav.software"],
          exact: true,
        })
        .click();
      await expectLanguage(page, locale);
      await page.getByRole("link", { name: "MuseTest", exact: true }).click();
      await expectLanguage(page, locale);
      await expect(page.locator(".detail-description")).toBeVisible();
      await page.reload();
      await expectLanguage(page, locale);
      await page.locator(".breadcrumb").click();
      await expectLanguage(page, locale);
      await page
        .getByRole("link", { name: messages[locale]["nav.about"], exact: true })
        .click();
      await expectLanguage(page, locale);
      await page
        .getByRole("link", { name: messages[locale]["nav.home"], exact: true })
        .click();
      await expectLanguage(page, locale);
      await page.goBack();
      await expectLanguage(page, locale);
      await page.goForward();
      await expectLanguage(page, locale);
      await page.reload();
      await expectLanguage(page, locale);
      const second = await context.newPage();
      const oppositePrefix = locale === "tr" ? "en/" : "";
      for (const route of [
        "",
        "software/",
        "software/render-fixture/",
        "about/",
        "missing/",
      ]) {
        await second.goto(`${base}${oppositePrefix}${route}`);
        await expectLanguage(second, locale);
      }
      await second.close();
    }
    expect(errors).toEqual([]);
  });
}

for (const locale of locales) {
  test(`${locale}: saved preference governs every production route in a new tab`, async ({
    page,
    context,
    baseURL,
  }) => {
    await page.goto(baseURL!);
    await page.locator("#language-toggle").click();
    if (locale === "tr") await page.locator("#language-toggle").click();
    const second = await context.newPage();
    for (const prefix of ["", "en/"])
      for (const route of ["", "software/", "about/", "missing/"]) {
        await second.goto(new URL(prefix + route, baseURL!).href);
        await expectLanguage(second, locale);
        await second.reload();
        await expectLanguage(second, locale);
      }
    await second.close();
  });
}

test("new translated content consumes the current global language", async ({
  page,
}) => {
  await page.goto("");
  for (const locale of ["en", "tr"] as const) {
    await page.locator("#language-toggle").click();
    await page.evaluate(() => {
      document.getElementById("dynamic-content")?.remove();
      const section = document.createElement("section");
      section.id = "dynamic-content";
      const text = document.createElement("p");
      text.dataset.localized = JSON.stringify({
        tr: "Yeni eklenen içerik",
        en: "Newly inserted content",
      });
      const link = document.createElement("a");
      link.dataset.i18n = "nav.software";
      link.dataset.route = "software/";
      section.append(text, link);
      document.querySelector("main")!.append(section);
    });
    await expectLanguage(page, locale);
    await expect(page.locator("#dynamic-content p")).toHaveText(
      locale === "tr" ? "Yeni eklenen içerik" : "Newly inserted content",
    );
  }
});

test("history events cannot replace the saved language with the route language", async ({
  page,
  baseURL,
}) => {
  await page.goto("");
  await page.locator("#language-toggle").click();
  await page.locator("#language-toggle").click();
  await page.evaluate((url) => {
    history.replaceState(history.state, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, new URL("en/", baseURL!).pathname);
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(page.locator("h1")).toContainText(
    messages.tr["home.titleFirst"],
  );
});

test("restoring a cached document reapplies the latest saved language", async ({
  page,
}) => {
  await page.goto("");
  await page.locator("#language-toggle").click();
  // A cached document can retain English after another document saves Turkish.
  await page.evaluate(() => {
    localStorage.setItem("muse-language", "tr");
    window.dispatchEvent(
      new PageTransitionEvent("pageshow", { persisted: true }),
    );
  });
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(page.locator("h1")).toContainText(
    messages.tr["home.titleFirst"],
  );
});

test("opening the language selector in a new tab saves the explicit choice", async ({
  page,
  context,
}) => {
  await page.goto("");
  const opened = context.waitForEvent("page");
  await page.locator("#language-toggle").click({ modifiers: ["Control"] });
  const second = await opened;
  await second.waitForLoadState();
  await expectLanguage(second, "en");
  await expectLanguage(page, "en");
  expect(
    await second.evaluate(() => localStorage.getItem("muse-language")),
  ).toBe("en");
  await second.close();
});
