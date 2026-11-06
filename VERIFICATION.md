# Website verification

This document records verification of the website implementation and its Turkish/English localization. It does not claim desktop application compatibility. The production catalog remains empty.

Verified on 7 November 2026 in **CachyOS Linux (Arch based)** using **Node.js 22.23.4** and Playwright Chromium. No Windows or macOS runtime testing was performed.

| Check                                            | Result                                                               |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| Catalog, localization, and deployment unit tests | 22 passed                                                            |
| Chromium browser suite                           | 57 passed under `/muse/`; root checks passed after one focused rerun |
| Astro/TypeScript production check                | Zero errors, warnings, or hints                                      |
| Static production build                          | Passed for project-path and root hosting                             |
| Production dependency audit                      | Zero known vulnerabilities                                           |
| Formatting                                       | Prettier checked; project standards preserved without reformatting   |
| Catalog honesty                                  | Empty production catalog; no fixture application routes shipped      |

Browser checks cover all production navigation links, direct routes, 404 status and recovery, Turkish and English metadata, canonical URLs, language alternatives, sitemap, favicon and both social image paths, 320/375/768/1024/1440/1920 px layouts in light and dark themes, system-theme changes, manual theme persistence, keyboard activation and focus rings, 200% text, reduced motion, blocked storage, disabled JavaScript, missing media/download states, optional app sections, and accurate platform verification labels.

Localization checks verify Turkish as the first-visit default even with an English browser locale; immediate switching without replacing the document; preserved theme, query, and fragment; preference restoration after refresh and navigation; invalid preference fallback; translated accessibility attributes; and synchronization between tabs. Both languages have matching, non-empty translation keys and interpolation parameters. Static English pages and language navigation work with JavaScript disabled. The rich app fixture checks translated descriptions, release dates, image alt text, captions, download labels, and card statuses while switching in both directions.

Automated Axe checks found no WCAG 2 A/AA or WCAG 2.1 AA violations on the production pages in light and dark themes and the isolated application detail fixtures. This is not a guarantee of complete accessibility. Human screen-reader testing remains unverified.

Browser captures were made for home, about, catalog, and 404 pages in both languages, light/dark themes, and 320/1440 px widths (32 combinations). Representative home pages, the Turkish about and catalog pages, the English 404, and the Turkish social image were visually reviewed. No clipped text was found in those captures; overflow checks pass across all tested widths. The website uses locally served Latin and Latin Extended Manrope subsets, inline icons, and static HTML/CSS. The inline bilingual dictionary and preference script add no third-party requests or translation service. Browser checks confirm no cookies and less than 40 KB of inline script/data per production page. The complete static output is approximately 332 KB, including both languages, font subsets, and social images. No Lighthouse score or real-user performance claim is made.

The synthetic app fixtures are served from a separate test-only project. They exercise optional screenshots, features, requirements, installation, release details, downloads, project links, and Windows/Linux support records without adding applications to `src/data/apps.ts` or the deployed site.

Initial implementation test failures involved missing development types, an obsolete font stylesheet import, and test server/fixture configuration. Localization's new card-status assertion initially matched both status and platform chips; its selector was corrected and the failed root-hosting test passed on a focused rerun. The final complete `/muse/` suite passes all 57 checks. Playwright used an Ubuntu fallback Chromium package on CachyOS. These browser results apply to this Linux environment, not every distribution.

The [initial GitHub Actions run](https://github.com/ysf-kul/muse/actions/runs/42305782496) successfully completed locked dependency installation, formatting, all unit and browser tests, the production build, artifact upload, and GitHub Pages deployment. GitHub Pages uses the workflow source and enforces HTTPS. The repository homepage points to **https://ysf-kul.github.io/muse/**.

The initial English deployment was also checked in Chromium: home, software, and about pages returned HTTP 200 in light and dark themes at 375 and 1440 px (12 combinations), with no horizontal overflow, script exceptions, or detected Axe WCAG violations. Canonical URLs matched the deployed project path. The empty catalog, custom HTTP 404 and recovery link, sitemap, robots file, favicon, and social-preview image were verified live. The localization deployment and its live verification are reported separately on completion.

Remaining verification limits: actual Windows desktop/browser workflows, physical mobile devices, human screen readers, and additional browser engines. GitHub Pages serves one custom 404 document; without JavaScript, it uses Turkish even for an unknown English URL. Language preference persistence requires working localStorage. No macOS support is claimed. No application screenshots, builds, or desktop functionality can be validated until real projects are published.
