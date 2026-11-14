import { expect, type Page } from "@playwright/test";
import {
  messages,
  translate,
  languageNames,
  type Locale,
} from "../../src/i18n/messages";
import { apps } from "../../src/data/apps";

/** Check the complete DOM contract, including unregistered text and app fields. */
export async function expectLanguage(page: Page, locale: Locale) {
  await expect(page.locator("html")).toHaveAttribute("lang", locale);
  await expect(page.locator("#language-label")).toHaveText(
    locale === "tr" ? "Türkçe" : "English",
  );
  const failures = await page.evaluate(
    ({ copy, locale, catalogValues }) => {
      const problems: string[] = [];
      const expected = (element: Element, attribute?: string) => {
        const suffix = attribute ? `-${attribute}` : "";
        const key = element.getAttribute(`data-i18n${suffix}`);
        if (!key)
          return JSON.parse(element.getAttribute(`data-localized${suffix}`)!)[
            locale
          ];
        const value = copy[key as keyof typeof copy];
        if (value === undefined) return undefined;
        const params = JSON.parse(
          element.getAttribute("data-i18n-params") || "{}",
        );
        return value.replace(/\{(\w+)\}/g, (_, key) =>
          typeof params[key] === "string" ? params[key] : params[key]?.[locale],
        );
      };
      for (const element of document.querySelectorAll(
        "[data-i18n], [data-localized]",
      )) {
        const value = expected(element);
        if (!value || element.textContent !== value)
          problems.push(`text: ${element.outerHTML}`);
      }
      for (const attribute of ["aria-label", "title", "alt", "content"])
        for (const element of document.querySelectorAll(
          `[data-i18n-${attribute}], [data-localized-${attribute}]`,
        )) {
          const value = expected(element, attribute);
          if (!value || element.getAttribute(attribute) !== value)
            problems.push(`${attribute}: ${element.outerHTML}`);
        }
      for (const element of document.querySelectorAll<HTMLAnchorElement>(
        "[data-route]",
      )) {
        const base = document.documentElement.dataset.basePath!;
        const href = `${base}${locale === "en" ? "en/" : ""}${element.dataset.route}`;
        if (element.getAttribute("href") !== href)
          problems.push(`link: ${element.href}`);
      }
      const allowedNames = new Set([
        "Muse",
        "m.",
        "MuseTest",
        "M",
        "Windows",
        "Linux",
        ...catalogValues,
      ]);
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
      );
      while (walker.nextNode()) {
        const element = walker.currentNode.parentElement!;
        const value = walker.currentNode
          .textContent!.trim()
          .replace(/^[·\s]+/, "");
        if (!/[A-Za-zÇĞİÖŞÜçğıöşü]/.test(value)) continue;
        if (
          element.closest(
            "script, style, [data-i18n], [data-localized], time[data-date], #language-label, #theme-label, #language-status, [aria-hidden=true]",
          )
        )
          continue;
        if (!allowedNames.has(value))
          problems.push(`unregistered text: ${value}`);
      }
      return problems;
    },
    {
      copy: messages[locale],
      locale,
      catalogValues: apps.flatMap((app) => [
        app.name,
        ...(app.downloads ?? []).map(
          (download) =>
            `${download.platform}${download.size ? ` · ${download.size}` : ""}`,
        ),
      ]),
    },
  );
  expect(failures).toEqual([]);
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    locale === "tr" ? "tr_TR" : "en_US",
  );
  const nextLocale = locale === "tr" ? "en" : "tr";
  const languageAction = translate(locale, "language.action", {
    current: languageNames[locale],
    next: languageNames[nextLocale],
  });
  await expect(page.locator("#language-toggle")).toHaveAttribute(
    "aria-label",
    languageAction,
  );
  await expect(page.locator("#language-toggle")).toHaveAttribute(
    "title",
    languageAction,
  );
  const themes = ["system", "light", "dark"] as const;
  const preference = (await page
    .locator("html")
    .getAttribute("data-theme-preference")) as (typeof themes)[number];
  const themeAction = translate(locale, "theme.action", {
    current: translate(locale, `theme.${preference}`),
    next: translate(
      locale,
      `theme.${themes[(themes.indexOf(preference) + 1) % themes.length]}`,
    ),
  });
  await expect(page.locator("#theme-toggle")).toHaveAttribute(
    "aria-label",
    themeAction,
  );
  await expect(page.locator("#theme-toggle")).toHaveAttribute(
    "title",
    themeAction,
  );
}
