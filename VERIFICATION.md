# Website verification

This document records verification of the website implementation. It does not claim desktop application compatibility. The production catalog remains empty.

Verified on 7 November 2026 in **CachyOS Linux (Arch based)** using **Node.js 22.23.4** and Playwright Chromium. No Windows or macOS runtime testing was performed.

| Check                             | Result                                                             |
| --------------------------------- | ------------------------------------------------------------------ |
| Catalog and deployment unit tests | 17 passed                                                          |
| Chromium browser suite            | 23 passed under `/muse/`; 23 passed with root hosting              |
| Astro/TypeScript production check | Zero errors, warnings, or hints                                    |
| Static production build           | Passed for project-path and root hosting                           |
| Dependency audit                  | Zero known vulnerabilities after updating to patched Astro 7       |
| Formatting                        | Prettier checked; project standards preserved without reformatting |
| Catalog honesty                   | Empty production catalog; no fixture application routes shipped    |

Browser checks cover all production navigation links, direct routes, 404 status and recovery, English language metadata, canonical URLs, sitemap, favicon and social image paths, 320/375/768/1024/1440/1920 px layouts in light and dark themes, system-theme changes, manual theme persistence, keyboard activation and focus rings, 200% text, reduced motion, blocked storage, disabled JavaScript, missing media/download states, optional app sections, and accurate platform verification labels.

Automated Axe checks found no WCAG 2 A/AA or WCAG 2.1 AA violations on the production pages in light and dark themes and the isolated application detail fixtures. This is not a guarantee of complete accessibility. Human screen-reader testing remains unverified.

Visual browser captures were reviewed for the home page in light and dark themes at desktop and mobile widths. The website uses a single locally served Latin variable font, inline icons, and static HTML/CSS with only small theme scripts. Browser checks confirm no third-party resource requests, no cookies, and less than 8 KB of inline script per production page. The complete static output is approximately 110 KB, including the social-preview image. No Lighthouse score or real-user performance claim is made.

The synthetic app fixtures are served from a separate test-only project. They exercise optional screenshots, features, requirements, installation, release details, downloads, project links, and Windows/Linux support records without adding applications to `src/data/apps.ts` or the deployed site.

Initial test failures involved missing development types, an obsolete font stylesheet import, and test server/fixture configuration. They were corrected; the final suites pass. Playwright used an Ubuntu fallback Chromium package on CachyOS. These browser results apply to this Linux environment, not every distribution.

GitHub Pages deployment evidence is recorded in [the workflow runs](https://github.com/ysf-kul/muse/actions) and the `github-pages` environment. The configured project URL is **https://ysf-kul.github.io/muse/**. Hosting is verified separately after pushing; a successful local build alone does not prove deployment.

Remaining verification limits: actual Windows desktop/browser workflows, physical mobile devices, human screen readers, and additional browser engines. No macOS support is claimed. No application screenshots, builds, or desktop functionality can be validated until real projects are published.
