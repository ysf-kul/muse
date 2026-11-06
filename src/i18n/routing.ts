import type { Locale } from "./messages.ts";

/** Pure helpers shared by static generation and tests. */
export function stripBase(pathname: string, base: string): string {
  const prefix = base.replace(/\/$/, "");
  if (pathname === prefix) return "";
  if (!pathname.startsWith(`${prefix}/`)) return "";
  return pathname.slice(prefix.length + 1);
}

export function localeFromPath(pathname: string, base: string): Locale {
  const path = stripBase(pathname, base);
  return path === "en" || path.startsWith("en/") ? "en" : "tr";
}

export function pagePath(pathname: string, base: string): string {
  return stripBase(pathname, base).replace(/^en(?:\/|$)/, "");
}

export function localizedPath(
  path: string,
  locale: Locale,
  base: string,
): string {
  return `${base.replace(/\/$/, "")}/${locale === "en" ? "en/" : ""}${path.replace(/^\//, "")}`;
}
