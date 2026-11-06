import { test, expect } from "@playwright/test";
import { messages, locales } from "../../src/i18n/messages";

test("first-time visitors use Turkish regardless of browser language", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ locale: "en-US" });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(page.locator("h1")).toContainText(
    messages.tr["home.titleFirst"],
  );
  await expect(page.locator("#language-label")).toHaveText("Türkçe");
  expect(
    await page.evaluate(() => localStorage.getItem("muse-language")),
  ).toBeNull();
  await context.close();
});

test("language switches immediately, preserving the document, theme, query, and hash", async ({
  page,
  baseURL,
}) => {
  await page.goto("about/?from=test#about-heading");
  await page.locator("#theme-toggle").click();
  await page.locator("#theme-toggle").click();
  const main = await page.locator("main").elementHandle();
  await page.locator("#language-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(
    await main!.evaluate(
      (element) => element === document.querySelector("main"),
    ),
  ).toBe(true);
  expect(new URL(page.url()).pathname).toBe(
    `${new URL(baseURL!).pathname}en/about/`,
  );
  expect(new URL(page.url()).search).toBe("?from=test");
  expect(new URL(page.url()).hash).toBe("#about-heading");
  await expect(page).toHaveTitle(messages.en["seo.aboutTitle"]);
  await expect(page.locator("meta[name=description]")).toHaveAttribute(
    "content",
    messages.en["seo.aboutDescription"],
  );
  await expect(page.locator("#theme-toggle")).toHaveAttribute(
    "aria-label",
    /Theme: Dark/,
  );
  await expect(page.locator("#language-status")).toHaveText(
    messages.en["language.announcement"],
  );
  await page.locator("#language-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("#theme-toggle")).toHaveAttribute(
    "aria-label",
    /Tema: Koyu/,
  );
  await expect(page.locator("#language-label")).toHaveText("Türkçe");
});

test("preference survives refresh, navigation, and a new visit to the Turkish root", async ({
  page,
  baseURL,
}) => {
  await page.goto("");
  await page.locator("#language-toggle").click();
  expect(await page.evaluate(() => localStorage.getItem("muse-language"))).toBe(
    "en",
  );
  await page.getByRole("link", { name: "Software", exact: true }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toHaveText(messages.en["catalog.title"]);
  await page.goto(baseURL!);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.locator("#language-toggle").click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  expect(await page.evaluate(() => localStorage.getItem("muse-language"))).toBe(
    "tr",
  );
});

test("blocked storage still supports immediate language switching", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    }),
  );
  await page.goto("");
  await page.locator("#language-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("link", { name: "About", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.locator("#language-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
});

test("invalid saved preferences fall back to Turkish and the system theme", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("muse-language", "unknown");
    localStorage.setItem("muse-theme", "unknown");
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("");
  await expect(page.locator("html")).toHaveAttribute("lang", "tr");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("#theme-label")).toHaveText("Sistem");
  await page.locator("#language-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  expect(await page.evaluate(() => localStorage.getItem("muse-language"))).toBe(
    "en",
  );
});

test("keyboard users can select a language and retain visible focus", async ({
  page,
}) => {
  await page.goto("");
  await page.locator("#language-toggle").focus();
  expect(
    await page
      .locator("#language-toggle")
      .evaluate((element) => getComputedStyle(element).outlineStyle),
  ).toBe("solid");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("#language-toggle")).toBeFocused();
});

for (const locale of locales) {
  test(`${locale}: static SEO and navigation also work without JavaScript`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    const prefix = locale === "en" ? "en/" : "";
    for (const [route, titleKey, descriptionKey] of [
      ["", "seo.homeTitle", "brand.description"],
      ["about/", "seo.aboutTitle", "seo.aboutDescription"],
      ["software/", "seo.softwareTitle", "catalog.description"],
    ] as const) {
      await page.goto(new URL(prefix + route, baseURL!).href);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page).toHaveTitle(messages[locale][titleKey]);
      await expect(page.locator("meta[name=description]")).toHaveAttribute(
        "content",
        messages[locale][descriptionKey],
      );
      await expect(page.locator("link[hreflang=tr]")).toHaveCount(1);
      await expect(page.locator("link[hreflang=en]")).toHaveCount(1);
    }
    await page.locator("#language-toggle").click();
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      locale === "tr" ? "en" : "tr",
    );
    await context.close();
  });
}

test("all page text and attributes use the selected translations", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of ["", "about/", "software/", "missing/"]) {
    await page.goto(route);
    for (const locale of locales) {
      if ((await page.locator("html").getAttribute("lang")) !== locale)
        await page.locator("#language-toggle").click();
      const failures = await page.evaluate(
        ({ copy, locale }) => {
          const problems: string[] = [];
          const text = (key: string, element: HTMLElement) =>
            copy[key as keyof typeof copy].replace(/\{(\w+)\}/g, (_, key) => {
              const params = JSON.parse(element.dataset.i18nParams || "{}");
              return typeof params[key] === "string"
                ? params[key]
                : params[key][locale];
            });
          document
            .querySelectorAll<HTMLElement>("[data-i18n]")
            .forEach((element) => {
              if (element.textContent !== text(element.dataset.i18n!, element))
                problems.push(element.dataset.i18n!);
            });
          for (const attribute of ["aria-label", "title", "alt", "content"])
            document
              .querySelectorAll<HTMLElement>(`[data-i18n-${attribute}]`)
              .forEach((element) => {
                const key = element.getAttribute(`data-i18n-${attribute}`)!;
                if (element.getAttribute(attribute) !== text(key, element))
                  problems.push(key);
              });
          return problems;
        },
        { copy: messages[locale], locale },
      );
      expect(failures).toEqual([]);
    }
  }
  expect(errors).toEqual([]);
});

test("application content, release dates, image descriptions, and cards switch together", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4322/muse/rich/");
  for (const locale of ["tr", "en", "tr"] as const) {
    if ((await page.locator("html").getAttribute("lang")) !== locale)
      await page.locator("#language-toggle").click();
    await expect(page).toHaveTitle(
      locale === "tr" ? "Yalıtılmış bileşen testi" : "Isolated rendering test",
    );
    await expect(page.locator(".detail-description")).toHaveText(
      locale === "tr"
        ? "Bu yalıtılmış sayfa, ortak uygulama bileşenlerini test eder."
        : "This isolated page verifies the reusable application components.",
    );
    await expect(page.locator("time")).toHaveText(
      locale === "tr" ? "7 Kasım 2026" : "November 7, 2026",
    );
    await expect(page.locator(".screenshot-grid img")).toHaveAttribute(
      "alt",
      locale === "tr"
        ? "Sitenin paylaşım görseliyle oluşturulmuş test görseli; uygulama ekran görüntüsü değildir"
        : "Test image using the site’s social preview, not an application screenshot",
    );
    await expect(page.locator("figcaption")).toHaveText(
      locale === "tr"
        ? "Yalnızca bileşen testi için kullanılır."
        : "Used only for component testing.",
    );
    await expect(page.locator(".detail-actions .button")).toContainText(
      locale === "tr"
        ? "Deneme bağlantısı (indirme yok)"
        : "Synthetic link test (no download)",
    );
    await expect(
      page
        .getByRole("article")
        .getByText(messages[locale]["status.prototype"], {
          exact: true,
        }),
    ).toBeVisible();
    await page.setViewportSize({ width: 320, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
  }
});

test("locale storage updates synchronize across open tabs", async ({
  context,
  page,
}) => {
  await page.goto("");
  const second = await context.newPage();
  await second.goto("about/");
  await page.locator("#language-toggle").click();
  await expect(second.locator("html")).toHaveAttribute("lang", "en");
  await expect(second).toHaveTitle(messages.en["seo.aboutTitle"]);
});
