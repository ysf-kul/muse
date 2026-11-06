# Localization architecture and persistence audit

Investigated on 7 November 2026. The existing Astro website, Material 3 tokens, page templates, theme controls, and production catalog are preserved.

## Reproduced failures

Three regression tests failed against the previous implementation before any runtime changes:

1. Select English, select Turkish, then open `/muse/en/software/`: `muse-language` remained `tr`, but the entire document initialized as English. The same override applied to other English routes and refreshes.
2. A history event on an English URL selected English despite saved Turkish.
3. An English document receiving a cached-page `pageshow` event kept English after the persisted preference changed to Turkish.

The first two failures came from separate URL-first decisions: the inline script in `Layout.astro` overwrote the stored language whenever the path started with `en/`, and the `popstate` handler in `preferences.js` selected exclusively from the path. The third came from the absence of a `pageshow` preference refresh. Existing tests primarily navigated to links already rewritten for the active language, so they missed conflicting direct URLs and restored documents.

Regular same-language links were already rewritten correctly. The Software components do not own separate language state. No hardcoded English product copy or alternative translation system was found in them. The verified failures arise from initialization and document lifecycle rules.

## One language controller

`src/i18n/language-state.js` is installed by the shared layout before paint. It owns the current language and notifies one rendering subscriber in `preferences.js`. `html.lang` reflects that controller; components do not initialize another browser language state.

The resolution order is:

1. A valid explicit preference in `localStorage["muse-language"]`.
2. The explicit in-memory choice in the current document, if storage cannot retain it.
3. The route language when no valid explicit choice exists: English for `en/`, Turkish otherwise.

The selector saves before notifying subscribers. Initialization, history events, cached-document restoration, and cross-tab storage changes use the same resolver. Locale URLs never replace a valid saved preference. Known pages synchronize their URL and canonical metadata to the resolved language while preserving query parameters, fragments, and the configured repository base. Unknown URLs retain their HTTP 404 behavior and translate their recovery links.

There is no browser-language detection, sessionStorage language, cookie language, hydration island, translation fetch, or asynchronous language service. Theme preferences remain independent in `muse-theme`. Static HTML is generated from the route for SEO and no-JavaScript navigation; when saved language differs, the existing before-paint visibility gate prevents displaying the initial route-language body while its translations are applied.

## Page and component audit

| Area                                                             | Translation source and behavior                                                             |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Home, About, Software, 404                                       | Shared typed dictionary through `Text.astro`                                                |
| Header, footer, navigation, empty catalog                        | Same dictionary and controller; links rewritten for the resolved locale                     |
| Cards and detail pages                                           | Bilingual catalog fields plus shared status, platform, download, and unavailable-state keys |
| Features, requirements, installation, limitations, runtime notes | Non-empty `{ tr, en }` values enforced by catalog validation                                |
| Screenshots, captions, accessibility labels, tooltips            | Translated attributes and bilingual text, updated together                                  |
| Release dates                                                    | Locale-aware `Intl.DateTimeFormat`, in UTC                                                  |
| Titles, descriptions, canonical/social metadata                  | Same language update; static language alternatives remain available                         |
| Newly inserted content                                           | Translation-marked elements and their links translated by the same rendering subscriber     |

Proper names such as Muse, Windows, Linux, application names, version identifiers, and URLs retain their original values. Build diagnostics are developer messages and are not displayed as website content. Missing dictionary keys and missing bilingual text raise errors rather than silently falling back to English. The production application catalog is still empty.

## Verification

The browser DOM audit checks every dictionary-marked text/attribute, every bilingual app field, translated internal links, language/theme tooltips, social locale metadata, and unregistered visible text. Journey tests use a separate fixture build of the actual production templates and generated app routes; its synthetic catalog never enters the deployment artifact.

The nine new browser tests cover direct English links with saved Turkish, both complete language journeys at mobile/desktop widths, new tabs with conflicting direct URLs in both languages, inserted content, history events, cache restoration, and a modified language-selector click opening a new tab. Actual Back/Forward navigation is exercised; cache restoration is also tested through a controlled `pageshow` event with `persisted: true`.

See `VERIFICATION.md` for final build/test results and platform limits. Without JavaScript, static routes follow their HTML language and cannot read localStorage; the single GitHub Pages 404 uses Turkish. Cross-visit preference persistence requires usable browser storage.
