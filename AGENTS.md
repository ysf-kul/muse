# AGENTS.md — Instructions for AI Coding Agents

This repository is part of Muse, an independent personal collection of AI-assisted software projects. Follow these instructions when inspecting, modifying, testing, or documenting the project.

## 1. Read the project standards first

Before making changes, read:
1. `MUSE_GUIDELINES.md`
2. `MUSE_DESIGN_SYSTEM.md`
3. This `AGENTS.md`

If a required document is missing, say so. Do not pretend to have read it or invent its contents.

## 2. Understand the existing project

Before coding:
- Inspect the repository structure.
- Read the README and local project instructions.
- Identify the language, framework, build system, and test setup.
- Trace the relevant architecture and data flows.
- Find existing design tokens and reusable components.
- Identify working features and known limitations.

Do not replace the project's technology stack merely because you prefer another one.

## 3. Follow the Muse design system

- Use Google Material 3 Expressive as the design foundation.
- Follow the tokens and component guidance in `MUSE_DESIGN_SYSTEM.md`.
- Do not invent a separate visual identity.
- Inspect existing components before creating duplicates.
- Keep similar controls visually and behaviorally consistent.
- Support light and dark themes.
- Consider accessibility and responsive layouts.
- Preserve product-specific workflows. Do not force every Muse application into the same layout.

## 4. Current platform targets

The current desktop targets are **Windows and Linux**.

- Prefer portable technologies and cross-platform libraries where sensible.
- Isolate operating-system-specific functionality behind clear interfaces.
- Consider differences between Linux distributions, desktop environments, audio systems, permissions, and package formats.
- Document platform-specific dependencies and limitations.
- Do not assume that compiling on Linux means the application works on every Linux distribution.
- Do not claim Windows or Linux support until the relevant workflows have been tested.
- Distinguish clearly between implemented, build-verified, and runtime-tested functionality.

**macOS is not currently a supported or tested target.** There is no available Mac test device. Do not claim macOS compatibility, create macOS release promises, or report macOS runtime validation. Keep the architecture reasonably portable where practical, but do not spend project scope on macOS support unless the user explicitly changes this requirement.

## 5. Keep Muse independent of any single AI provider

Muse is AI-assisted, but it must not depend on one specific AI coding assistant, model, provider, subscription, or chat history.

- Store essential project knowledge in repository files.
- Keep build and test workflows reproducible without a particular AI agent.
- Do not add a runtime AI service dependency unless it is an explicit product requirement.
- If a product feature uses an AI API, document the dependency, protect credentials, and consider a provider-neutral interface where practical.
- Do not add provider-specific SDKs simply because an AI coding tool recommends them.
- Review and test generated code as carefully as human-written code.
- Never imply that an AI provider owns, sponsors, or endorses Muse.

## 6. Functional correctness

- Every visible control must perform its advertised action.
- Do not present placeholders, mock data, or temporary behavior as completed functionality.
- Clearly label planned or unavailable features.
- Handle errors instead of silently ignoring them.
- Preserve user data and existing working behavior.
- Prioritize security, privacy, and data integrity.
- Ask before destructive operations or major architectural changes.

## 7. Code quality

- Follow the repository's existing conventions.
- Avoid unnecessary dependencies and abstractions.
- Use shared design tokens instead of repeated hard-coded values.
- Prefer clear names and understandable modules.
- Handle errors and resource cleanup correctly.
- Keep platform-specific code within appropriate boundaries.
- Explain the reason for any necessary architectural change.

## 8. Testing and verification

After changes, run the relevant checks where available:
- Unit tests
- Integration or end-to-end tests
- Linter and formatter
- Type checking or compilation
- Manual verification of affected workflows

Never claim a test passed if it was not run. Report tests that could not run and explain why.

For platform-sensitive changes, test on the actual target environment when possible. A successful build is not proof of runtime compatibility.

## 9. UI and UX review

For interface changes, check:
- Light and dark themes.
- Narrow and wide window sizes.
- Loading, empty, error, disabled, and disconnected states.
- Keyboard navigation and visible focus.
- Text overflow, clipping, and accessibility labels.
- Performance and reduced-motion behavior.

## 10. Change discipline

- Stay within the requested scope.
- Do not reformat or rewrite unrelated files.
- Preserve user settings and data.
- Never commit secrets, passwords, API keys, or private user data.
- Do not delete files, reset data, or rewrite project history without explicit approval.
- Ask a concise question when an unresolved decision materially affects the result.

## 11. Completion report

At the end of the task, provide a concise and accurate report:

1. **Changes:** What was implemented.
2. **Design:** How the Muse design system was followed.
3. **Tests:** Which checks ran and their actual results.
4. **Platforms:** Which operating systems were build-verified or runtime-tested.
5. **Limitations:** What remains incomplete or unverified.
6. **Run instructions:** Relevant commands, if changed or needed.

Never hide failed tests, known issues, or unverified hardware/platform behavior.

## 12. Priority order

When instructions conflict, follow this order:

1. Safety, security, privacy, and data integrity.
2. Explicit user requirements and core product functionality.
3. Accessibility and usability.
4. `MUSE_GUIDELINES.md`.
5. `MUSE_DESIGN_SYSTEM.md`.
6. Local project conventions.

Muse principle: **Different Apps. One Muse.**
