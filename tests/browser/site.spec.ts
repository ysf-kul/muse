import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

import { messages, locales } from "../../src/i18n/messages";
const routes = ["", "software/", "about/"];

for (const locale of locales) {
  test.describe(locale, () => {
    const copy = messages[locale];
    test.beforeEach(async ({ page }) => {
      await page.addInitScript((language) => {
        try {
          localStorage.setItem("muse-language", language);
        } catch {}
      }, locale);
    });

    for (const route of routes) {
      for (const theme of ["light", "dark"] as const) {
        test(`${route || "home"} · ${theme} · accessible and intact`, async ({
          page,
          baseURL,
        }) => {
          await page.emulateMedia({ colorScheme: theme });
          const errors: string[] = [];
          page.on("pageerror", (error) => errors.push(error.message));
          page.on("console", (message) => {
            if (message.type() === "error") errors.push(message.text());
          });
          const response = await page.goto(route);
          expect(response?.status()).toBe(200);
          await expect(page.locator("html")).toHaveAttribute("lang", locale);
          await expect(page.locator("html")).toHaveAttribute(
            "data-theme",
            theme,
          );
          await expect(page.locator("h1")).toHaveCount(1);
          await expect(page.locator("nav a[aria-current='page']")).toHaveCount(
            1,
          );
          const result = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          expect(result.violations).toEqual([]);
          const links = await page
            .locator("a[href]")
            .evaluateAll((anchors) =>
              anchors.map((anchor) => (anchor as HTMLAnchorElement).href),
            );
          for (const link of [...new Set(links)]) {
            if (
              link.startsWith(new URL(baseURL!).origin) &&
              !link.includes("#")
            )
              expect((await page.request.get(link)).status(), link).toBe(200);
          }
          expect(errors).toEqual([]);
          expect(
            await page
              .locator("img")
              .evaluateAll((images) =>
                images.every(
                  (image) =>
                    image instanceof HTMLImageElement &&
                    image.complete &&
                    image.naturalWidth > 0,
                ),
              ),
          ).toBe(true);
        });
      }
    }

    test("system theme reacts, manual choice persists, and system can be restored", async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: "dark" });
      await page.goto("");
      await expect(page.locator("html")).toHaveAttribute(
        "data-theme-preference",
        "system",
      );
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await page.emulateMedia({ colorScheme: "light" });
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
      await page.locator("#theme-toggle").click();
      await page.locator("#theme-toggle").click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await page
        .getByRole("link", { name: copy["nav.software"], exact: true })
        .click();
      await expect(page.locator("html")).toHaveAttribute(
        "data-theme-preference",
        "dark",
      );
      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await page.locator("#theme-toggle").click();
      await expect(page.locator("html")).toHaveAttribute(
        "data-theme-preference",
        "system",
      );
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    });

    test("keyboard skip link, focus rings, navigation, and theme button work", async ({
      page,
    }) => {
      await page.goto("");
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("link", { name: copy["a11y.skip"] }),
      ).toBeFocused();
      expect(
        await page
          .getByRole("link", { name: copy["a11y.skip"] })
          .evaluate((element) => getComputedStyle(element).outlineStyle),
      ).toBe("solid");
      await page.keyboard.press("Enter");
      await expect(page.locator("main")).toBeFocused();
      await page.locator("#theme-toggle").focus();
      await page.keyboard.press("Enter");
      await expect(page.locator("html")).toHaveAttribute(
        "data-theme-preference",
        "light",
      );
      await page
        .getByRole("link", { name: copy["nav.software"], exact: true })
        .focus();
      await page.keyboard.press("Enter");
      await expect(page.locator("h1")).toHaveText(copy["catalog.title"]);
    });

    for (const width of [320, 375, 768, 1024, 1440, 1920]) {
      test(`responsive layout and navigation at ${width}px`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 900 });
        for (const theme of ["light", "dark"] as const) {
          await page.emulateMedia({ colorScheme: theme });
          for (const route of routes) {
            await page.goto(route);
            await expect(
              page.getByRole("navigation", { name: copy["a11y.navigation"] }),
            ).toBeVisible();
            for (const name of [
              copy["nav.home"],
              copy["nav.software"],
              copy["nav.about"],
            ])
              await expect(
                page.getByRole("link", { name, exact: true }),
              ).toBeVisible();
            const overflow = await page.evaluate(
              () => document.documentElement.scrollWidth > window.innerWidth,
            );
            expect(overflow, `${route} · ${theme}`).toBe(false);
          }
        }
        await page
          .getByRole("link", { name: copy["nav.software"], exact: true })
          .click();
        await expect(page.locator("h1")).toHaveText(copy["catalog.title"]);
      });
    }

    test("200% text and reduced motion remain usable", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("");
      await page.addStyleTag({ content: "html { font-size: 200%; }" });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth,
        ),
      ).toBe(false);
      expect(
        await page
          .locator("html")
          .evaluate((element) => getComputedStyle(element).scrollBehavior),
      ).toBe("auto");
      expect(
        await page
          .locator("#theme-toggle")
          .evaluate((element) => getComputedStyle(element).transitionDuration),
      ).toBe("0s");
    });

    test("isolated empty catalog publishes no fictional product or unsupported badges", async ({
      page,
    }) => {
      await page.goto("http://127.0.0.1:4322/muse/empty/");
      await expect(
        page.getByText(copy["catalog.emptyDescription"], {
          exact: false,
        }),
      ).toBeVisible();
      await expect(page.locator(".app-card")).toHaveCount(0);
      await expect(page.locator(".platform-chips")).toHaveCount(0);
      await expect(
        page.getByText(
          locale === "tr" ? "Windows ve Linux" : "Windows and Linux",
          { exact: false },
        ),
      ).toBeVisible();
      await expect(page.locator("a[href=''], a[href='#']")).toHaveCount(0);
    });

    test("metadata, social image, sitemap, and project-prefixed assets resolve", async ({
      page,
      baseURL,
    }) => {
      for (const route of routes) {
        await page.goto(route);
        const canonical = await page
          .locator("link[rel='canonical']")
          .getAttribute("href");
        expect(canonical).toBe(
          `https://ysf-kul.github.io${new URL(baseURL!).pathname}${locale === "en" ? "en/" : ""}${route}`,
        );
        const image = await page
          .locator("meta[property='og:image']")
          .getAttribute("content");
        expect(image).toContain(
          `/assets/${locale === "tr" ? "social-preview-tr.png" : "social-preview.png"}`,
        );
        const localImage = image!.replace(
          "https://ysf-kul.github.io",
          new URL(baseURL!).origin,
        );
        expect((await page.request.get(localImage)).status()).toBe(200);
        const favicon = await page
          .locator("link[rel='icon']")
          .getAttribute("href");
        expect(
          (await page.request.get(new URL(favicon!, baseURL!).href)).status(),
        ).toBe(200);
        for (const href of await page
          .locator("script[src], link[rel='stylesheet']")
          .evaluateAll((elements) =>
            elements.map(
              (element) =>
                element.getAttribute("src") || element.getAttribute("href"),
            ),
          )) {
          expect(href).toMatch(new RegExp(`^${new URL(baseURL!).pathname}`));
          expect(
            (await page.request.get(new URL(href!, baseURL!).href)).status(),
          ).toBe(200);
        }
      }
      expect((await page.request.get("sitemap.xml")).status()).toBe(200);
      expect(await (await page.request.get("sitemap.xml")).text()).toContain(
        "https://ysf-kul.github.io",
      );
    });

    test("unknown pages return the custom 404 with working recovery links", async ({
      page,
    }) => {
      const response = await page.goto("not-a-page/");
      expect(response?.status()).toBe(404);
      await expect(page.locator("h1")).toHaveText(copy["error.title"]);
      await expect(page.locator("meta[name='robots']")).toHaveAttribute(
        "content",
        "noindex, follow",
      );
      await page.getByRole("link", { name: copy["error.home"] }).click();
      await expect(page.locator("h1")).toContainText(copy["home.titleFirst"]);
    });

    test("content and navigation work without JavaScript", async ({
      browser,
      baseURL,
    }) => {
      const context = await browser.newContext({
        javaScriptEnabled: false,
        colorScheme: "dark",
      });
      const page = await context.newPage();
      await page.goto(new URL(locale === "en" ? "en/" : "", baseURL!).href);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("#theme-toggle")).toBeHidden();
      expect(
        await page
          .locator("html")
          .evaluate((element) => getComputedStyle(element).colorScheme),
      ).toBe("dark");
      await page
        .getByRole("link", { name: copy["nav.software"], exact: true })
        .click();
      await expect(page.locator("h1")).toHaveText(copy["catalog.title"]);
      await context.close();
    });

    test("blocked preference storage does not break theme switching", async ({
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
      await page.locator("#theme-toggle").click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    });

    test("production pages load locally with a small script budget and no cookies", async ({
      page,
      baseURL,
    }) => {
      for (const route of routes) {
        await page.goto(route);
        await page.evaluate(() => document.fonts.ready);
        const resources = await page.evaluate(() =>
          performance.getEntriesByType("resource").map((entry) => entry.name),
        );
        expect(
          resources.every(
            (url) => new URL(url).origin === new URL(baseURL!).origin,
          ),
        ).toBe(true);
        const scriptBytes = await page
          .locator("script")
          .evaluateAll((scripts) =>
            scripts.reduce(
              (total, script) =>
                total +
                new TextEncoder().encode(script.textContent || "").length,
              0,
            ),
          );
        expect(scriptBytes).toBeLessThan(40000);
        expect(await page.context().cookies()).toEqual([]);
      }
    });

    for (const rich of [false, true]) {
      test(`isolated application detail template · ${rich ? "complete" : "minimal"} entry`, async ({
        page,
      }) => {
        await page.goto(`http://127.0.0.1:4322/muse/${rich ? "rich/" : ""}`);
        await expect(page.locator("h1")).toHaveText("MuseTest");
        await expect(page.getByText(copy["app.built"])).toBeVisible();
        await expect(page.getByText(copy["app.macos"])).toBeVisible();
        if (rich) {
          await expect(
            page.getByText(copy["app.supported"], { exact: true }),
          ).toBeVisible();
          for (const name of [
            copy["app.features"],
            copy["app.requirements"],
            copy["app.installation"],
            copy["app.limitations"],
            copy["app.release"],
          ])
            await expect(page.getByRole("heading", { name })).toBeVisible();
          await expect(
            page.getByRole("link", {
              name: copy["app.repository"],
              exact: true,
            }),
          ).toHaveAttribute("href", "https://github.com/ysf-kul/muse");
          expect(
            await page
              .locator(".screenshot-grid img")
              .evaluate((image) => (image as HTMLImageElement).naturalWidth),
          ).toBeGreaterThan(0);
        } else {
          await expect(
            page.getByText(copy["app.mediaUnavailable"]),
          ).toBeVisible();
          await expect(
            page.getByText(copy["app.downloadsUnavailable"]),
          ).toBeVisible();
          await expect(
            page.getByRole("heading", { name: copy["app.release"] }),
          ).toHaveCount(0);
          await expect(
            page.getByRole("heading", { name: copy["app.links"] }),
          ).toHaveCount(0);
        }
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        expect(result.violations).toEqual([]);
        await page.setViewportSize({ width: 320, height: 900 });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
        ).toBe(false);
      });
    }
  });
}
