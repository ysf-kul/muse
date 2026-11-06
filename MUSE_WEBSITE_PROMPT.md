# AI BUILD PROMPT — MUSE OFFICIAL WEBSITE

Build the official website for **Muse**, an independent personal collection of simple, useful, AI-assisted software projects.

The website is the central place where visitors can discover Muse applications, understand what each one does, view screenshots, and find the correct download or project links.

## 1. Read the standards first

Before implementation, read:
- `MUSE_GUIDELINES.md`
- `MUSE_DESIGN_SYSTEM.md`
- `AGENTS.md`

The website is itself a Muse project and must follow the same identity and design rules.

## 2. Brand and tone

**Name:** Muse  
**Slogan:** Simple software that makes everyday life better.  
**Design philosophy:** Different Apps. One Muse.

Muse is not a company or corporation. It is an independent personal software project and a collection of tools developed with AI assistance.

Do not invent:
- A company history, team, employees, departments, or offices.
- Customer counts, user statistics, testimonials, or reviews.
- Partnerships, certifications, or endorsements.
- Features, downloads, release dates, or platform support that have not been supplied or verified.

The writing style should be personal, clear, modest, and friendly. Avoid corporate language and exaggerated marketing copy.

## 3. Main goal

Create a polished software showcase website that makes it easy to:
1. Understand what Muse is.
2. Browse all published Muse applications.
3. Open a dedicated page for each application.
4. See screenshots, descriptions, features, requirements, and supported platforms.
5. Reach verified downloads, source repositories, documentation, and issue trackers.

The site should be easy to update when a new Muse application is released.

## 4. Visual direction

Use **Google Material 3 Expressive** as the design foundation, following `MUSE_DESIGN_SYSTEM.md`.

The website should feel:
- Modern and expressive, but not visually noisy.
- Minimal, welcoming, and product-focused.
- Carefully spaced, with strong typography and clear hierarchy.
- Consistent with the future Muse desktop applications.

Requirements:
- Light and dark theme support.
- A clear theme toggle, with system preference respected by default.
- Responsive layouts for mobile, tablet, laptop, and large desktop.
- Accessible contrast, keyboard navigation, focus indicators, and semantic HTML.
- Subtle, purposeful transitions; respect reduced-motion preferences.
- Consistent buttons, cards, chips, navigation, icons, and typography.
- No excessive gradients, glass effects, floating decorations, or generic AI-generated landing-page styling.
- Avoid huge empty hero sections that push useful content below the fold.

Use shared design tokens. Do not scatter arbitrary colors, spacing, or radii throughout the code.

## 5. Website structure

Create these pages or sections:

### Home
- A concise hero introducing Muse.
- Display the slogan: “Simple software that makes everyday life better.”
- A short explanation that Muse is an independent collection of useful software projects.
- A featured applications section.
- A clear link to browse all applications.
- A small section explaining the shared Muse philosophy: different apps, one design identity.
- A simple footer with source and contact links only when real URLs are provided.

### Software catalog
- Display all published applications using reusable product cards.
- Each card should show the app name, icon or logo, short description, development/release status, and supported platforms.
- Include search or filtering only if it improves usability for the number of apps.
- Do not show fictional apps or placeholder products in the production catalog.
- If there are no published apps yet, show a thoughtful empty state that explains the catalog will grow.

### Individual application page
Each app should have a dedicated route or page containing:
- App name and icon.
- A concise description and purpose.
- Screenshots or media supplied by the project.
- Key features that are actually implemented.
- Supported operating systems and tested status.
- Requirements and installation instructions.
- Latest version and release information, only when verified.
- Download links for available builds.
- Source repository link.
- Documentation and issue tracker links, if provided.
- A clear note for features or platforms that are not yet available.

Never invent a download URL, release version, feature, screenshot, or compatibility claim.

### About Muse
Explain that Muse is an independent personal software collection, built with the assistance of AI tools. It is not a company and is not tied to one AI provider. The tools used to create the projects may change; the projects and their source repositories remain the source of truth.

Keep this section short and genuine.

## 6. Software catalog data

Store application information in a central, easy-to-edit data file (for example JSON, YAML, or a typed source module appropriate to the chosen stack).

Each app entry should support fields such as:
- `id`
- `name`
- `tagline`
- `description`
- `icon` or `logo`
- `screenshots`
- `features`
- `status` (for example: prototype, in-development, released, archived)
- `platforms`
- `testedPlatforms`
- `requirements`
- `version`
- `releaseDate`
- `downloads`
- `repositoryUrl`
- `documentationUrl`
- `issuesUrl`
- `featured`

Use only verified values. Optional fields should be omitted cleanly when unavailable. Do not render empty buttons or broken links.

Platform status must be precise:
- Windows and Linux are the current target platforms for Muse desktop software, subject to actual project testing.
- macOS is not currently supported or tested. Do not display it as a supported platform.
- A platform must not be marked “tested” just because a build exists.

Make it possible to add a new app by adding one data entry and its assets, without rewriting the catalog layout.

## 7. Technical requirements

Choose a lightweight, maintainable web stack that is suitable for static hosting such as GitHub Pages.

- Prefer static generation or a static frontend; do not require a backend unless there is a real need.
- Ensure all routes work when hosted under a GitHub Pages project path if applicable.
- Configure the base path correctly; do not assume the site is hosted at the domain root.
- Avoid unnecessary dependencies.
- Optimize images and avoid shipping oversized assets.
- Provide metadata, page titles, descriptions, favicon, and social preview metadata.
- Include a custom 404 page.
- Ensure links work with keyboard and screen readers.
- Avoid analytics, tracking, cookies, or external services unless explicitly requested.
- Do not make the site depend on an AI API at runtime.
- Document local development, build, and deployment commands.

If the repository is intended to be the GitHub user site (for example, `<username>.github.io`), configure it accordingly. If it is a project site, account for its repository path. Inspect the actual repository and hosting setup rather than guessing.

## 8. Content and asset rules

- Use the real Muse logo if one exists in the repository.
- If no logo exists, create a simple text-based wordmark treatment using the site typography; do not invent an elaborate brand symbol.
- Use real application screenshots supplied in the repository.
- If screenshots are not available, use a restrained placeholder state clearly marked as unavailable during development. Do not fabricate application screenshots.
- Keep all copy in English initially, but structure text so localization can be added later.
- Avoid emoji as a substitute for application icons.

## 9. Quality and testing

Before declaring the website complete:
- Run the production build.
- Check all routes and internal links.
- Test the responsive layout at narrow and wide sizes.
- Test light and dark themes.
- Test keyboard navigation and visible focus.
- Check for missing images, broken links, console errors, and empty catalog states.
- Verify GitHub Pages base-path behavior.
- Confirm that no fictional product claims or unsupported platform badges are present.

Report exactly what was tested and what still requires manual verification.

## 10. Expected deliverables

Produce:
1. A complete working website implementation.
2. A central editable software catalog data file.
3. Reusable application cards and application detail pages.
4. Responsive light/dark Material 3 Expressive styling.
5. GitHub Pages-compatible build and deployment configuration.
6. A README with local run, build, and deployment instructions.
7. A short completion report listing tests and any remaining limitations.

Do not stop after producing a mockup or static screenshot. Implement the functioning website and verify the build.

**Final principle: Different Apps. One Muse.**
