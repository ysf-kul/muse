# Muse

Simple software that makes everyday life better.

Muse is an independent personal collection of useful software projects, built with AI assistance. This repository contains its static showcase website. **Different Apps. One Muse.**

The software catalog is intentionally empty until actual applications are ready to be published. No application features, screenshots, downloads, or contact details have been invented.

## Develop and build

Install **Node.js 22.23.4 or newer** and npm. These commands work without any AI tool or account:

```sh
npm ci
npm run dev
```

Open **http://localhost:4321/muse/**. The default `/muse/` base matches the verified repository, [ysf-kul/muse](https://github.com/ysf-kul/muse).

```sh
npm run check        # Astro and TypeScript checks
npm run format:check # Source formatting
npm test             # Catalog and deployment unit tests
npm run build        # Type checking and static production build
npm run preview      # Serve the build at http://localhost:4321/muse/
```

The production output is `dist/`. There is no backend, runtime AI API, analytics, tracking, cookie use, or remotely hosted font dependency. A localStorage entry stores an explicitly selected theme; if storage is blocked, the control still works for the current page. System preference is the default and follows changes to the operating system’s theme.

For a different hosting path, set `BASE_PATH` with a leading and trailing slash. Set `SITE_URL` to the production origin, without a path. Both are shell environment variables; `.env.example` documents their format. `astro.config.mjs` reads `process.env`, so importing these through a particular dotenv tool is optional.

```sh
# POSIX shells: verify root hosting
BASE_PATH=/ SITE_URL=https://ysf-kul.github.io npm run build

# POSIX shells: verify the actual project hosting path
BASE_PATH=/muse/ SITE_URL=https://ysf-kul.github.io npm run build
```

In PowerShell, set `$env:BASE_PATH = '/muse/'` and `$env:SITE_URL = 'https://ysf-kul.github.io'` before the commands. Every navigation URL, asset, app route, sitemap, canonical URL, and 404 recovery link uses the configured base. A GitHub user-site repository named `<owner>.github.io` resolves to `/`; other repositories resolve to `/<repository>/`.

## Browser tests

After building:

```sh
npx playwright install chromium
npm run test:e2e
```

On supported Linux CI distributions, install the browser and system libraries with `npx playwright install --with-deps chromium`. Playwright may use a fallback browser package on other distributions; that is not a claim of universal Linux compatibility.

The tests start a production preview and a separate development-only fixture site. Synthetic fixture data lives under `tests/detail-fixture/` and is never included in the production catalog or production routes. It exercises optional app fields and platform verification without publishing a fictional application.

Tests cover internal links, HTTP status codes, custom 404 recovery, metadata and local assets, 320–1920 px widths, 200% text, keyboard access, focus rings, reduced motion, disabled JavaScript, blocked preference storage, theme persistence, and automated WCAG accessibility checks in light and dark themes. Automated accessibility checks complement human screen-reader testing.

## Publish to GitHub Pages

The repository is a **project site**, intended for **https://ysf-kul.github.io/muse/**.

1. In the GitHub repository, open **Settings → Pages** and choose **GitHub Actions** as the source. The authenticated owner can alternatively run `gh api --method POST repos/ysf-kul/muse/pages -f build_type=workflow` once, if Pages is not enabled yet.
2. Push to `main`, or manually run **Build and deploy Muse** from Actions.
3. The workflow installs locked dependencies, checks formatting, runs unit tests, builds static pages, and runs Chromium browser tests before uploading and deploying `dist/`.
4. Pull requests run validation without deploying. The `github-pages` environment records the deployed URL.

No force push, history replacement, backend configuration, or credentials in source files are required. Keep the default repository path unless the hosting configuration changes. Custom domains require updating `SITE_URL` and setting the correct `BASE_PATH` as workflow environment variables before rebuilding.

## Add a real application

Edit **`src/data/apps.ts`**. The `MuseApp` type in `src/lib/catalog.ts` documents every supported field. Add one verified entry and its optimized assets under `public/assets/`; cards, home selection, app routes, and the sitemap update automatically.

Required fields are `id` (a unique lowercase slug), `name`, `tagline`, `description`, `status`, and `published`. Set `published: true` only when the information is ready to appear publicly. Valid statuses are `prototype`, `in-development`, `released`, and `archived`. Use `featured: true` to select a home-page feature; if none are selected, the home page shows up to three published entries.

Optional fields:

| Field                                            | Verified content to provide                                                  |
| ------------------------------------------------ | ---------------------------------------------------------------------------- |
| `icon`                                           | Local `/assets/` path; otherwise a text initial is used                      |
| `screenshots`                                    | `{ src, alt, width, height, caption? }` entries using real local screenshots |
| `features`                                       | Implemented features, as plain text                                          |
| `platforms`                                      | Supported `Windows` and/or `Linux`, backed by runtime records                |
| `testedPlatforms`                                | `{ platform, environment, notes? }` records of actual runtime testing        |
| `buildVerifiedPlatforms`                         | Build verification only; never treated as runtime support                    |
| `requirements`, `installation`, `limitations`    | Plain-text lists of verified requirements, steps, and limitations            |
| `version`, `releaseDate`                         | Verified version and real ISO `YYYY-MM-DD` date                              |
| `downloads`                                      | `{ label, platform, url, size? }` entries for actual available builds        |
| `repositoryUrl`, `documentationUrl`, `issuesUrl` | Real HTTP(S) project links                                                   |

Unknown optional fields should be omitted. Empty sections and buttons are not rendered. Missing screenshots and downloads have explicit unavailable states. Preserve accurate screenshot dimensions to prevent layout shifts, and use compressed WebP/PNG assets appropriate to their display size.

**Windows and Linux are desktop targets, not blanket support claims.** `platforms` requires corresponding runtime test details; a build alone cannot establish support. Linux records should identify the distribution and relevant environment. macOS is not currently supported or tested and cannot be entered as a supported desktop platform. Catalog validation rejects inconsistent platform claims, invalid dates, unsafe URLs, and invalid asset paths. It cannot establish whether supplied project claims are true; verify the underlying projects before publication.

## Structure and design

```text
src/data/             Central English site copy and application catalog
src/lib/              Catalog validation and base-path helpers
src/components/       Shared cards, detail content, icons, and empty state
src/layouts/          Semantic page shell, navigation, metadata, theme behavior
src/pages/            Home, software, generated app routes, about, 404, sitemap
src/styles/tokens.css Material 3 color roles, typography, spacing, shape, motion
src/styles/global.css Responsive components and interaction states
tests/                Unit and browser tests, isolated rendering fixtures
.github/workflows/    GitHub Pages validation and deployment
```

The interface follows `MUSE_DESIGN_SYSTEM.md` with centralized Material 3 roles, filled and text buttons, tonal navigation, consistent outlined icons, restrained expressive shapes, responsive layouts, visible focus, and reduced-motion support. The wordmark is typography based because no existing brand logo was supplied. Manrope is served locally through Fontsource under its bundled SIL Open Font License. English copy is centralized where shared; remaining page copy lives in static templates for future localization.

The social preview is a typography-only image, not an application screenshot. Regenerate it with `node scripts/generate-social-preview.mjs` after installing Chromium. No image generation API is required.

## Contribution attribution

Project authorship remains with the repository owner. AI assistance is acknowledged without implying ownership or endorsement by an AI provider.

OpenAI’s [official Codex source](https://github.com/openai/codex/blob/main/codex-rs/ext/git-attribution/src/world_state.rs) publishes `Co-authored-by: Codex <noreply@openai.com>`. The official [oai-codex GitHub organization](https://github.com/oai-codex) lists that email and links to OpenAI Codex. It is an organization, so the trailer acknowledges the tool; it does not promise a separate human contributor or contribution-graph entry.

Anthropic’s [Claude Code settings reference](https://code.claude.com/docs/en/settings-reference) documents its attribution settings, and [claude](https://github.com/claude) lists Anthropic affiliation. A GitHub-associated co-author email was not publicly verified in this investigation. This implementation was completed with Codex; no Claude co-author trailer is added without evidence of a Claude contribution and a verified identity.

## Verification limits

See `VERIFICATION.md` for actual checks and environment results. No published desktop applications are present. Windows desktop workflows, macOS, human screen-reader behavior, and physical mobile devices are not validated by this website’s Linux browser tests.
