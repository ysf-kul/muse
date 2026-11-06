import {
  translate,
  type Locale,
  type TranslationKey,
  type TranslationParams,
} from "./messages";
import { localeFromPath, localizedPath } from "./routing";
export function currentLocale(pathname: string): Locale {
  return localeFromPath(pathname, import.meta.env.BASE_URL);
}
export function localeUrl(path: string, locale: Locale): string {
  return localizedPath(path, locale, import.meta.env.BASE_URL);
}
export function translatedAttribute(
  attribute: "aria-label" | "title" | "content" | "alt",
  key: TranslationKey,
  locale: Locale,
  params?: TranslationParams,
) {
  return {
    [attribute]: translate(locale, key, params),
    [`data-i18n-${attribute}`]: key,
    ...(params ? { "data-i18n-params": JSON.stringify(params) } : {}),
  };
}
