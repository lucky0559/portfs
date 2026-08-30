# Time-aware portfolio theme specification

Last synchronized: 2026-08-30

## Scope and source reconciliation

Authoritative user requirement: add a light mode and a toggle switch, with the default theme based on time.

Repository-verified context:

- The portfolio is a Next.js 13 App Router single-page site.
- Theme colors are centralized in `src/app/globals.css`.
- The fixed desktop header and mobile header are rendered by `src/app/components/Menu.tsx`.
- There was no theme state, persistence key, or light palette before this feature.
- The repository was clean before implementation.
- This feature does not add or change an HTTP API endpoint, persistence schema, migration, or server-side transaction.

Inferred product decisions, made explicit because the requirement did not define them:

- “Based on time” means the visitor's device-local time.
- Light mode is the automatic default from 07:00 through 18:59.
- Dark mode is the automatic default from 19:00 through 06:59.
- An explicit switch choice takes precedence over the time default and is stored in browser local storage.
- When no preference is stored, an open page updates automatically at the next 07:00 or 19:00 boundary.
- The existing dark theme remains the no-JavaScript fallback.

## Behavior specification

### Initial resolution

1. A small script in the document head reads `portfolio-theme` from local storage.
2. If the value is exactly `light` or `dark`, the stored value wins.
3. Otherwise, the script resolves the visitor's local hour against the 07:00 and 19:00 boundaries.
4. It writes `data-theme` and `data-theme-source` to the root HTML element before body content renders, minimizing a wrong-theme flash.
5. Storage access failures fall back safely to the time-derived theme.

### Manual switch

- The switch is visible in the fixed header at desktop and mobile widths.
- It uses a native button with `role="switch"`, a current `aria-checked` state, and an action-oriented accessible label.
- Activating it swaps the root theme immediately and stores the explicit choice under `portfolio-theme`.
- The label, sun/moon icons, thumb position, focus ring, and browser color scheme reflect the selected theme.
- A storage event synchronizes changes made in another same-origin tab.
- A manual or automatic theme change applies a 440 ms ease-out transition to semantic colors, borders, shadows, icons, and the toggle thumb.
- When `prefers-reduced-motion: reduce` is active, the transition class is skipped and the theme changes immediately.

### Automatic boundary updates

- Automatic boundary timers run only while no valid manual choice is stored.
- During automatic operation, the page schedules the nearest next boundary rather than polling.
- A manual preference cancels the need for automatic boundary changes on the current page.

## Theme design

The light palette is a warm paper interpretation of the existing aubergine and lime identity. Both palettes share the same semantic token names, typography, spacing, imagery, content hierarchy, and component structure.

Theme-sensitive roles include page and alternate backgrounds, raised surfaces, primary and muted text, accent states, rules, success and danger feedback, navigation overlays, image overlays, shadows, chat messages, selection colors, and on-accent text.

Company-logo tiles use dedicated `--logo-surface`, `--logo-border`, and `--logo-shadow` roles. This prevents the light theme's dark text token from becoming a dark logo background and keeps the marks on a warm neutral tile that complements the job cards.

The implementation uses OKLCH tokens. Pure black and pure white are not used. The light accent is deliberately darker than the dark-theme accent so links, labels, controls, and focus indicators retain useful contrast on warm light surfaces.

## Implementation map

| Surface | File | Responsibility | State |
|---|---|---|---|
| Theme rules | `src/app/lib/theme.ts` | Types, storage key, time resolver, next-boundary calculation, head bootstrap | Implemented |
| Theme control | `src/app/components/ThemeToggle.tsx` | Accessible switch, persistence, cross-tab sync, boundary scheduling, transition lifecycle | Implemented |
| Navigation placement | `src/app/components/Menu.tsx` | Places the control in the fixed header | Implemented |
| Startup integration | `src/app/layout.tsx` | Runs theme resolution before hydration | Implemented |
| Theme palettes | `src/app/globals.css` | Dark and light semantic tokens, logo surfaces, smooth theme motion, switch styling, responsive treatment | Implemented |
| Logic tests | `src/app/lib/theme.test.ts` | Boundaries, validation, next transition, bootstrap precedence | Verified |
| Progress artifact | `docs/theme-system-progress.html` | Responsive local implementation and verification report | Implemented; browser visual QA pending |

## Acceptance matrix

| Requirement | Acceptance criteria | Evidence | Result |
|---|---|---|---|
| Light mode | All primary portfolio surfaces use the light semantic palette | Light token set and replacement of theme-sensitive hard-coded colors in `globals.css`; production build | Implemented, visual QA pending |
| Toggle switch | Header control switches between themes and exposes switch semantics | `ThemeToggle.tsx`; server markup inspection; production type check | Implemented, interactive browser QA pending |
| Time-based default | 07:00–18:59 resolves light; remaining hours resolve dark | Unit and bootstrap-script tests | Verified |
| Persisted choice | Valid local-storage choice takes precedence on the next load | Bootstrap-script test and component implementation | Logic verified, interactive browser QA pending |
| No startup flash | Theme is applied from the document head before body rendering | Server-rendered head script and `suppressHydrationWarning` | Repository verified |
| Responsive control | Label hides below 768px while the switch remains touch accessible | Responsive CSS and 44px-equivalent control height | Implemented, visual QA pending |
| Accessibility | Keyboard-focusable button, visible focus, switch role, state and action label | Component and global focus CSS | Repository verified, browser interaction pending |
| Theme consistency | Portfolio, modal, form, mobile navigation, and chatbot consume semantic tokens | Changed-file audit in `globals.css` | Repository verified, visual QA pending |
| Company-logo treatment | Logo backgrounds complement job cards in both themes without reusing a text token | Dedicated logo-surface tokens and user-provided light-mode screenshot diagnosis | Implemented after screenshot feedback; post-change visual QA pending |
| Smooth transition | Theme-dependent colors, borders, shadows, icons, and toggle thumb ease together; reduced-motion users are not animated | Transient `theme-is-changing` state and reduced-motion guard | Build verified, interactive browser QA pending |

## Verification evidence

Commands run on 2026-08-30:

- `npm test`: passed, 5 test files and 43 tests. Coverage includes theme boundaries and bootstrap precedence. One unrelated Vitest configuration warning reports future native-loader compatibility.
- `npm run build`: passed after correcting the browser timer type. Next.js compiled, linted, type-checked, generated static pages, and completed route optimization.
- `git diff --check`: passed.
- Local server: started successfully at `http://localhost:3001` because port 3000 was already occupied.
- Server-rendered markup inspection: confirmed the bootstrap script is in the document head and the header includes the switch role, accessible action label, theme icons, and both visual state labels.
- Key light-theme contrast calculation: primary text 15.39:1, muted text 7.46:1, faint text 5.05:1, accent on page 5.28:1, accent on surface 5.68:1, and on-accent text 5.52:1.
- User-provided desktop screenshot: confirms the light theme renders and identified that company-logo tiles inherited the dark light-theme text token. The implementation now uses dedicated warm-neutral logo tokens instead.
- Browser/Playwright connection: unavailable on three earlier verification attempts. No post-polish screenshots, viewport interaction pass, or browser-console-zero claim is recorded yet.

Environment warnings:

- Browserslist reports that `caniuse-lite` is outdated. This is pre-existing dependency metadata and does not block compilation.
- Vitest reports that `vitest.config.ts` uses ESM syntax while loaded as CommonJS. All tests still pass.

## Remaining work

The requested polish is implemented. The remaining delivery gate is an in-browser pass when a browser connection becomes available:

1. Verify automatic light startup with cleared local storage during daytime and automatic dark startup during nighttime, using a controlled browser clock if available.
2. Toggle light to dark and dark to light by pointer and keyboard.
3. Reload and verify the explicit selection persists.
4. Verify desktop at 1440 × 900 and mobile at 390 × 844, including header fit, bottom navigation, modal, form, and chatbot.
5. Inspect text and focus contrast in both themes.
6. Confirm the HTML progress artifact's filters and links work at both viewport sizes.
7. Require zero browser-console errors and capture verified screenshots.
8. Confirm the warm-neutral company-logo tiles and 440 ms theme transition match the latest user feedback.

## Dependencies and rollback

There are no new runtime packages, backend dependencies, migrations, or network calls. Removing the theme bootstrap, switch component placement, light token override, and theme utility/test files restores the prior dark-only behavior. The only user-owned state is the non-sensitive `portfolio-theme` local-storage string.
