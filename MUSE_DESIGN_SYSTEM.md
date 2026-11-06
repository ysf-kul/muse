# MUSE — Design System

**Version:** 1.1  
**Foundation:** Google Material 3 Expressive  
**Principle:** One shared visual language, adapted to each product.

This document defines the shared visual and interaction standards for Muse applications. Use official Material 3 guidance and platform-native components where practical. This document is a shared design direction, not a replacement for platform documentation.

## 1. Design intent

Muse interfaces should feel modern, clear, friendly, expressive, and focused. Expressive design should make the interface easier to understand—not more distracting.

Products may use different layouts and navigation patterns when their workflows require them. Consistency comes from shared design decisions and component behavior, not from forcing every application into an identical screen.

## 2. Design tokens

Manage color, typography, spacing, shape, elevation, motion, and sizing through centralized design tokens. Avoid scattering arbitrary hard-coded values throughout the UI.

Recommended token groups:
- `color.*` — backgrounds, surfaces, text, outlines, accents, and status roles
- `type.*` — font families, sizes, weights, and line heights
- `space.*` — screen and component spacing
- `shape.*` — corner radii
- `elevation.*` — surface layers and shadows
- `motion.*` — durations and easing
- `size.*` — controls, icons, and touch targets

Use one source of truth for tokens within each project. Where practical, derive platform themes from the same token definitions.

## 3. Color

Use Material 3 color roles. Every application should provide coherent light and dark themes.

Core roles:
- `primary`, `onPrimary`, `primaryContainer`, `onPrimaryContainer`
- `secondary`, `onSecondary`, `secondaryContainer`, `onSecondaryContainer`
- `tertiary`, `onTertiary`, `tertiaryContainer`, `onTertiaryContainer`
- `error`, `onError`, `errorContainer`, `onErrorContainer`
- `background`, `onBackground`
- `surface`, `onSurface`, `surfaceVariant`, `onSurfaceVariant`
- `outline`, `outlineVariant`
- `inverseSurface`, `inverseOnSurface`, `inversePrimary`

Rules:
- Maintain sufficient text and control contrast.
- Never communicate important state through color alone; pair it with text, shape, or an icon.
- Use success, warning, and error colors only when they convey meaningful state.
- Use brand accents with restraint.
- Dynamic color may be supported where the platform and framework allow it. Otherwise, use a consistent Muse theme.
- Product-specific colors (such as audio-band colors in MuseLed) should be treated as functional data colors, separate from semantic theme roles.

## 4. Typography

Use a clear Material 3-inspired type hierarchy:
- Display
- Headline
- Title
- Body
- Label

Define sizes, weights, and line heights centrally. Avoid introducing many unrelated text sizes on one screen.

Rules:
- Body text must remain comfortable to read.
- Supporting text must not become excessively small.
- Headings should communicate information hierarchy.
- Respect system text scaling where supported.
- Consider line length and line spacing for longer content.

## 5. Shape and spacing

Use a deliberate shape system inspired by Material 3 Expressive. Do not round every element excessively.

- Select corner values from shared `shape.*` tokens.
- Use consistent shape behavior for components of the same type.
- Select spacing from a shared `space.*` scale.
- Keep screen margins, card padding, and component gaps consistent.
- Dense data-oriented screens may use tighter spacing when it improves usability.

## 6. Component language

Prefer Material 3 components appropriate to the project's framework. Custom components should remain compatible with the shared interaction and visual language.

Component families:
- **Buttons:** filled, tonal, outlined, text, and FAB where appropriate
- **Navigation:** navigation bar, rail, drawer, or tabs depending on information architecture
- **Surfaces:** cards, sheets, dialogs, and appropriate surface layers
- **Inputs:** text fields, switches, sliders, checkboxes, and selection controls
- **Feedback:** snackbars, progress indicators, tooltips, and status messages
- **Data display:** lists, tables, charts, and visual status indicators

Rules:
- Use a consistent action hierarchy throughout each application.
- Make the primary action clear; do not style every action as primary.
- Use a consistent icon family. Add text labels when an icon may be ambiguous.
- Design hover, focus, pressed, disabled, and loading states.
- Respect native platform interaction conventions rather than breaking them to achieve visual uniformity.

## 7. Navigation and layout

Choose navigation based on the product's information architecture. Not every Muse application needs the same navigation component.

- Choose navigation appropriate to the number and relationship of primary sections.
- Keep secondary settings and infrequent tools from cluttering the main interface.
- Make the current location clear.
- Adapt content to window size and available space.
- On narrow layouts, reflow controls rather than allowing overflow.
- Keep critical workflows reasonably easy to reach.

## 8. Motion and animation

Use motion to communicate feedback, state changes, and spatial relationships.

- Prefer short, natural transitions.
- Use a consistent motion character for similar interactions.
- Avoid continuous decorative animation.
- Maintain acceptable performance on lower-powered hardware.
- Respect reduced-motion preferences.
- Do not rely on animation as the only indication that an action completed.

## 9. Iconography and imagery

- Use one icon family or visually compatible sources.
- Do not use different icons for the same meaning without a reason.
- Keep icon sizes and visual weight consistent.
- Do not let decorative imagery compete with functional content.
- Treat product logos, application icons, and in-app icons as separate assets with separate purposes.

## 10. States and feedback

Design relevant states for every important screen and component:
- Default
- Loading
- Empty
- Error
- Offline or disconnected
- Permission denied
- Success
- Disabled

Error messages should explain the issue in plain language and, where possible, suggest a next step. Keep technical diagnostics separate from user-facing messages.

## 11. Accessibility

- Support keyboard navigation and visible focus.
- Provide meaningful accessible names and labels.
- Maintain adequate contrast.
- Never use color as the sole way to convey status.
- Use touch targets appropriate to the platform.
- Prevent clipping and overlap when text is enlarged.
- Respect reduced-motion preferences.
- Test with assistive technology where practical.

## 12. Cross-platform presentation

The shared design system should work across the current Muse desktop targets: **Windows and Linux**.

Do not force identical pixel layouts across operating systems. Window controls, keyboard shortcuts, menus, audio/device integrations, and other interactions should respect the host platform where appropriate.

macOS is not currently a supported or tested target. Do not advertise macOS support or claim macOS validation. Avoid unnecessary architectural decisions that would make future porting impossible, but do not spend current project scope implementing or validating macOS-specific behavior.

Linux is not one uniform environment. Account for differences in distributions, desktop environments, display scaling, audio systems, permissions, and packaging when relevant to the product.

## 13. Adding a component

Before creating a new component:
1. Check whether the design system already provides a suitable component.
2. Evaluate whether a native Material 3 component is sufficient.
3. Document the problem the custom component solves.
4. Define light/dark themes, accessibility, and interaction states.
5. Use shared tokens rather than arbitrary fixed values.

## 14. Design acceptance checklist

- [ ] Consistent with Material 3 Expressive.
- [ ] Light and dark themes are coherent.
- [ ] Shared color and typography tokens are used.
- [ ] Component interaction states are designed.
- [ ] Layout works at narrow and wide window sizes.
- [ ] Keyboard and screen-reader access have been considered.
- [ ] Empty, loading, and error states are present where needed.
- [ ] Motion does not harm performance or accessibility.
- [ ] Product-specific workflows remain clear.
- [ ] Windows and Linux presentation has been considered.

**Note:** This document defines Muse's shared design direction. It does not replace official Material 3 specifications or platform-specific accessibility guidance.
