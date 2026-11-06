import type { APIRoute } from "astro";
import { apps } from "../data/apps";
import { publishedApps } from "../lib/catalog";
import { locales } from "../i18n/messages";
import { localeUrl } from "../i18n/server";

export const GET: APIRoute = ({ site }) => {
  const paths = [
    "",
    "software/",
    "about/",
    ...publishedApps(apps).map((app) => `software/${app.id}/`),
  ];
  const urls = site
    ? paths
        .flatMap((path) =>
          locales.map(
            (locale) =>
              `<url><loc>${new URL(localeUrl(path, locale), site).href.replaceAll("&", "&amp;")}</loc></url>`,
          ),
        )
        .join("")
    : "";
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
