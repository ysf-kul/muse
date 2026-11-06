# MUSE — Brand, Product & Development Guidelines

**Slogan:** Simple software that makes everyday life better.  
**Design philosophy:** Different Apps. One Muse.  
**Project nature:** Independent, personal, AI-assisted software projects.

This document defines the shared identity and development principles for software published under the Muse name. It is intended for human contributors and AI coding agents.

## 1. What is Muse?

Muse is an independent personal software project and a collection of useful tools created to make everyday tasks easier, nicer, or more enjoyable.

Muse is **not a company, corporation, agency, or commercial software organization**. Do not describe it as one. Avoid corporate language, invented teams, fictional departments, or claims of company-scale support.

Muse projects may be designed and implemented with the assistance of AI tools. Be transparent about this when relevant, but do not imply that an AI provider owns, operates, sponsors, or officially endorses Muse.

Muse software should be:
- Useful and focused on a real purpose.
- Simple to understand without being simplistic.
- Thoughtfully designed and pleasant to use.
- Reliable, maintainable, and respectful of user privacy.
- Free from unnecessary features added only to inflate feature lists.

## 2. One identity, different products

Muse applications are not copies of one another. Each product should have its own information architecture and controls based on its purpose.

For example:
- MuseLed may focus on audio analysis, lighting, and device control.
- MusePlayer may focus on music playback and library management.
- Other Muse projects may solve entirely different problems.

They should still feel like members of the same product family through consistent design principles, typography, color roles, component behavior, accessibility, and quality.

**Shared identity does not mean identical interfaces.**

## 3. Cross-platform commitment

Muse desktop software should target **Windows and Linux** wherever the product's purpose and technical dependencies make this practical.

macOS is currently outside the supported and tested platform scope because there is no available Mac device for validation. Do not claim macOS support, advertise macOS builds, or imply that macOS behavior has been verified. The architecture should avoid unnecessary platform lock-in so that future macOS support remains possible, but it is not a current delivery requirement.

Cross-platform rules:
- Prefer portable technologies and well-maintained cross-platform libraries.
- Keep operating-system-specific code behind clear interfaces or adapters.
- Do not assume a particular Linux distribution, desktop environment, audio server, package manager, or hardware configuration.
- Document platform-specific requirements and limitations.
- Provide appropriate packaging or installation instructions for the supported Windows and Linux targets.
- Test on Windows and at least one real Linux environment; test additional Linux distributions when practical.
- Do not claim a platform is supported merely because the code compiles for it.
- If a feature cannot work on a platform, explain the limitation and provide a sensible fallback when possible.

A platform is considered supported only when its key workflows have been tested in a real environment. Keep a clear distinction between **implemented**, **build-verified**, and **runtime-tested**.

## 4. Design foundation

All Muse applications should use **Google Material 3 Expressive** as their shared design foundation.

This includes more than colors and rounded corners. Visual hierarchy, component behavior, motion, accessibility, feedback, and responsive layouts should follow a coherent design approach.

All applications should:
- Provide light and dark themes.
- Use shared design tokens for color, typography, spacing, shape, elevation, and motion.
- Remain usable at different window sizes and display scales.
- Respect platform conventions where appropriate.
- Use animation purposefully and avoid sacrificing performance.
- Prioritize readability and accessibility over decoration.

See `MUSE_DESIGN_SYSTEM.md` for detailed visual standards.

## 5. Product and UX principles

1. **Simplicity:** Common tasks should be easy to discover and complete.
2. **Consistency:** Similar actions should behave similarly across an application.
3. **Predictability:** Controls should do what users expect.
4. **Feedback:** Loading, success, error, empty, and offline states should be clear.
5. **User control:** Preferences should be respected; consequential actions should not happen unexpectedly.
6. **Accessibility:** Keyboard use, screen readers, contrast, and text scaling matter.
7. **Performance:** Effects and animations must not make the software sluggish.
8. **Honesty:** Incomplete or untested features must never be presented as finished.
9. **Privacy:** Collect and transmit as little user data as the product reasonably can.

## 6. AI-assisted and tool-independent development

Muse projects may be created with help from different AI coding tools and models. No single AI provider, model, subscription, proprietary agent, or hosted service should be a required dependency for the identity or continued development of Muse.

- Project instructions and essential knowledge must live in repository files, not only in an AI chat history.
- Use portable, documented formats for specifications, prompts, and project knowledge.
- Do not make the application depend on an AI service unless that dependency is an explicit product feature.
- If an AI API is an actual product feature, make the provider and dependency clear, protect credentials, and consider a provider-neutral interface where practical.
- Do not add provider-specific SDKs merely because an AI coding agent prefers them.
- Keep build, test, and release workflows reproducible without requiring one particular AI assistant.
- AI-generated code must still be reviewed, tested, and documented like any other code.
- Never claim that generated code has been physically or operationally validated unless it has been tested.

Muse is independent of the tools used to create it.

## 7. Technical standards

Technology choices may differ between projects. There is no requirement to use one language or framework across all Muse applications.

Every project should:
- Prefer readable, maintainable code.
- Avoid unnecessary dependencies and abstractions.
- Handle errors and resource cleanup correctly.
- Protect user data and credentials.
- Include automated tests for important behavior where practical.
- Document setup, build, run, and release steps.
- Document supported operating systems and known limitations.
- Avoid unnecessary network access, telemetry, or account requirements.

## 8. Brand voice and writing

Muse communication should feel personal, clear, calm, and approachable—not corporate.

- Use concise, natural language.
- Avoid exaggerated marketing claims and fake testimonials.
- Do not invent a company, staff, customers, partnerships, or certifications.
- Describe what a program actually does.
- Clearly distinguish available features from planned features.
- Use consistent terminology throughout each application.
- Make translations complete and maintainable when multiple languages are offered.

## 9. AI and contributor workflow

Before making changes, contributors and AI agents must:
1. Read `MUSE_GUIDELINES.md`, `MUSE_DESIGN_SYSTEM.md`, and `AGENTS.md`.
2. Inspect the existing repository, architecture, tests, and design tokens.
3. Preserve working functionality unless a change is requested or justified.
4. Follow the shared design system without forcing every product into the same layout.
5. Respect Windows and Linux as the current desktop targets.
6. Avoid claiming macOS support or runtime validation.
7. Run relevant tests and report their actual results.
8. Explain assumptions, incomplete work, and platform limitations.
9. Ask before destructive or hard-to-reverse actions.

## 10. Rule precedence

When requirements conflict, use this order:

1. Safety, security, privacy, and data integrity.
2. Explicit product requirements and core functionality.
3. Accessibility and usability.
4. This document.
5. `MUSE_DESIGN_SYSTEM.md`.
6. Project-specific visual preferences and implementation conventions.

Document necessary exceptions and their reasons.

## 11. The Muse principle

Muse is a personal, independent collection of useful software—not a corporation and not a product of any single AI provider.

Different tools, different purposes, one recognizable design philosophy.

**Different Apps. One Muse.**
