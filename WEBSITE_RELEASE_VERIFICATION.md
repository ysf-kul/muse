# Muse Video Bridge website integration

Muse Video Bridge uses the existing application catalog, cards, and detail template.
The catalog generates home-page selection, software listings, bilingual detail
routes, metadata, and sitemap entries without a separate product-page design.
The shared detail template now supports a validated release URL beside the source,
documentation, and issue links. Both language dictionaries include its label.

The application icon comes from the actual desktop application. The screenshot is
an optimized crop of the standalone 0.3.0 native Linux application's English,
light-theme start screen, captured during the new release launch smoke test with
the USB device disconnected. It does not claim a fresh hardware test. No generated
product mockup is used.

The page reuses the existing Material 3 color roles, typography, spacing, shapes,
buttons, responsive grid, theme controls, focus rings, and reduced-motion behavior.
Its features, requirements, installation steps, limitations, screenshot text, and
platform notes are bilingual. Device FPS claims are identified as previous
measurements, and the narrow Windows runner smoke is separate from interactive
Windows 10/11 or physical USB support.

## Repository preservation

The existing local website checkout was clean but behind four remote commits.
Those commits removed instruction and verification documents. Integration was
prepared in an isolated worktree from the current remote branch, preserving that
history and the complete original local instruction files. No authoritative Muse
instruction document was edited, removed, or restored over the remote history.

## Checks

- Locked dependency installation completed; npm reported zero vulnerabilities.
- All 22 catalog, localization, and deployment unit tests passed.
- Astro/TypeScript checks passed with zero errors, warnings, or hints.
- Source formatting and whitespace checks passed.
- The original 66 Chromium browser cases passed across the baseline and corrected
  fixture rerun. Initial fixture failures came from omitting the original catalog
  platform note when moving empty-catalog coverage to its isolated page; the note
  and all assertions were preserved and both cases then passed.
- Final published-catalog production build passed: nine static pages, zero
  Astro/TypeScript errors, warnings, or hints.
- All 70 Chromium browser cases passed, with zero skipped tests. An initial run
  exposed six 200%-text overflow failures in the previously unused app cards and
  detail content. Grid sizing, card wrapping, narrow headers, and long-text
  wrapping were corrected while retaining every assertion; the full rerun passed.
- Manual visual review checked the actual English light/wide and Turkish
  dark/narrow product pages. Both remained within their viewport.

Version 0.3.0 and every desktop download URL and file size were read from the
published GitHub Release, not inferred. The entry links its real
installation document and release notes/checksums. Linux AppImage, tar, DEB, RPM, and Windows
portable ZIP downloads are available from the existing detail sidebar.

The AppImage was read from the actual updated release after publication. Its native
rendering and clean close passed on CachyOS x86-64 through direct FUSE and
extract-and-run fallback; normal XDG configuration/cache storage stays outside the
image. It uses installed GTK3, WebKitGTK 4.1, libudev, and FFmpeg/FFprobe 8+.
All four product browser cases passed again after adding that fifth desktop
download, covering both languages/themes, every download, 200% text and keyboard
focus. The final build, 22 unit tests, formatting, and whitespace checks also
passed. Public source/release/setup/issue links, desktop assets and checksums
returned HTTP 200; download URLs are the real uploaded assets.

The published Windows ZIP also passed the application's
[Windows release smoke](https://github.com/ysf-kul/musevideobridge/actions/runs/43594244747)
on Microsoft Windows Server 2025 Datacenter AMD64: published download and hash
checks, native window creation/five-second survival, bundled FFprobe, and
320×240/10-frame conversion/decoding. This does not establish interactive
Windows 10/11 or physical USB behavior. Linux standalone startup was newly tested
on CachyOS x86-64; prior physical Linux transfer/playback remains marked as prior.

The new product cases cover the real entry, downloads, release/repository/setup
links, metadata/sitemap, Turkish and English, light and dark themes, automated
WCAG checks, widths from 320 to 1920 px, 200% text, reduced motion, keyboard focus,
and immediate language switching. Empty-catalog coverage remains in an isolated
fixture; no existing assertion was removed to accommodate the published app.

## Limits

Website browser verification runs on Linux with Chromium. It does not validate
Windows desktop execution, USB drivers, physical mobile devices, or human
screen-reader use. Product hardware measurements and operating-system boundaries
are maintained in the application's own release documentation.
