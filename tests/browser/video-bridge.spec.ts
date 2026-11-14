import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { apps } from "../../src/data/apps";
import { messages, locales } from "../../src/i18n/messages";
import { expectLanguage } from "./localization";

const app = apps.find((entry) => entry.id === "video-bridge")!;

for (const locale of locales) {
  for (const theme of ["light", "dark"] as const) {
    test(`Video Bridge · ${locale} · ${theme} · catalog, detail, downloads and access`, async ({
      page,
      baseURL,
    }) => {
      expect(app.published).toBe(true);
      expect(app.releaseUrl).toMatch(/\/releases\/tag\/v\d+\.\d+\.\d+$/);
      expect(app.downloads?.some((item) => item.platform === "Linux")).toBe(
        true,
      );
      expect(app.downloads?.some((item) => item.platform === "Windows")).toBe(
        true,
      );
      await page.addInitScript((language) => {
        localStorage.setItem("muse-language", language);
      }, locale);
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("");
      const card = page.locator(".app-card").filter({ hasText: app.name });
      await expect(card).toHaveCount(1);
      await card.getByRole("link", { name: app.name, exact: true }).click();
      await expect(page.locator("h1")).toHaveText(app.name);
      await expectLanguage(page, locale);
      await expect(
        page.getByText(app.description[locale], { exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", {
          name: messages[locale]["app.releaseNotes"],
          exact: true,
        }),
      ).toHaveAttribute("href", app.releaseUrl!);
      await expect(
        page.getByRole("link", {
          name: messages[locale]["app.repository"],
          exact: true,
        }),
      ).toHaveAttribute("href", "https://github.com/ysf-kul/musevideobridge");
      await expect(
        page.getByRole("link", {
          name: messages[locale]["app.documentation"],
          exact: true,
        }),
      ).toHaveAttribute("href", app.documentationUrl!);
      for (const download of app.downloads!) {
        expect(download.url).toContain("/releases/download/v");
        await expect(page.locator(`a[href='${download.url}']`)).toBeVisible();
      }
      await expect(page.locator("a[href=''], a[href='#']")).toHaveCount(0);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
      for (const width of [320, 375, 768, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          `${width}px`,
        ).toBe(false);
        await expect(page.locator("#language-toggle")).toBeVisible();
      }
      await page.setViewportSize({ width: 375, height: 900 });
      await page.addStyleTag({ content: "html { font-size: 200%; }" });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      ).toBe(false);
      await page.locator("#language-toggle").focus();
      expect(
        await page
          .locator("#language-toggle")
          .evaluate((element) => getComputedStyle(element).outlineStyle),
      ).toBe("solid");
      await page.keyboard.press("Enter");
      await expectLanguage(page, locale === "tr" ? "en" : "tr");
      expect(errors).toEqual([]);
      const sitemap = await (
        await page.request.get(new URL("sitemap.xml", baseURL!).href)
      ).text();
      expect(sitemap).toContain("/software/video-bridge/");
      expect(sitemap).toContain("/en/software/video-bridge/");
    });
  }
}
