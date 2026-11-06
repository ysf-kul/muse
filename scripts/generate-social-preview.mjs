// Reproducible, typography-only metadata image; no application imagery is invented.
import { chromium } from "@playwright/test";
import { mkdir, readFile } from "node:fs/promises";
import { messages, locales } from "../src/i18n/messages.ts";
const font = await readFile(
  new URL(
    "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
    import.meta.url,
  ),
);
const browser = await chromium.launch();
const extendedFont = await readFile(
  new URL(
    "../node_modules/@fontsource-variable/manrope/files/manrope-latin-ext-wght-normal.woff2",
    import.meta.url,
  ),
);
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await mkdir(new URL("../public/assets/", import.meta.url), {
    recursive: true,
  });
  for (const locale of locales) {
    await page.setContent(
      `<style>@font-face{font-family:Manrope;src:url(data:font/woff2;base64,${font.toString("base64")});font-weight:200 800;unicode-range:U+0000-00FF,U+0131,U+2000-206F}@font-face{font-family:Manrope;src:url(data:font/woff2;base64,${extendedFont.toString("base64")});font-weight:200 800;unicode-range:U+0100-02BA}*{box-sizing:border-box}body{margin:0;background:#183d34;color:#f1f8ee;font-family:Manrope,sans-serif;padding:72px 80px}.brand{font-size:100px;line-height:1.1;font-weight:750;letter-spacing:-7px}.brand span{color:#cbe0ac}h1{font-size:52px;line-height:1.25;font-weight:550;letter-spacing:-2px;max-width:900px;margin:48px 0}p{font-size:22px;color:#cbe0ac;margin-top:60px}</style><div class="brand">Muse<span>.</span></div><h1></h1><p></p>`,
    );
    await page.evaluate((copy) => {
      document.querySelector("h1").textContent = copy["brand.slogan"];
      document.querySelector("p").textContent = copy["brand.philosophy"];
    }, messages[locale]);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: new URL(
        `../public/assets/${locale === "tr" ? "social-preview-tr.png" : "social-preview.png"}`,
        import.meta.url,
      ).pathname,
    });
  }
} finally {
  await browser.close();
}
