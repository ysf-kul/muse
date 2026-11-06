import type { APIRoute } from "astro";
import { apps } from "../data/apps";
import { publishedApps } from "../lib/catalog";
import { withBase } from "../lib/paths";

export const GET: APIRoute = ({ site }) => {
  const paths = [
    "",
    "software/",
    "about/",
    ...publishedApps(apps).map((app) => `software/${app.id}/`),
  ];
  const urls = site
    ? paths
        .map(
          (path) =>
            `<url><loc>${new URL(withBase(path), site).href.replaceAll("&", "&amp;")}</loc></url>`,
        )
        .join("")
    : "";
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
