# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
npm test         # Vitest — unit tests for lib/ai pure modules
```

## Architecture

This is a single-page portfolio site built with Next.js 13 (App Router). The entire site renders as one scrollable page — `src/app/page.tsx` → `HomePage` — with anchor-linked sections (`#profile`, `#academicJob`, `#skills`, `#projects`, `#contact`).

### Directory layout

All source lives under `src/app/` which is the TypeScript `baseUrl`, so `@/` resolves there:

- `pages/` — full-section page components (`HomePage`, `AcademicJob`, `Contact`, `DetailsColumn`, `Projects`, `Skills`)
- `components/` — smaller UI components used by pages (`Menu`, `MyProfile`, `AcademicJob/Academic`, `AcademicJob/Job`, `Projects/Card`, `DetailsColumn/ExperienceProjectCount`)
- `lib/animation/trail.tsx` — `Trail` wrapper that uses `@react-spring/web` for entrance animations
- `lib/hooks/useMediaQuery.ts` — `useCustomMediaQuery()` hook (wraps `react-responsive`); use this instead of raw Tailwind breakpoints when conditional JS logic is needed
- `lib/hooks/useOpenNewTab.ts` — `openInNewTabHandler(url)` utility
- `lib/ai/` — chatbot internals: `knowledge.ts` compiles site constants into the grounding
  block, `systemPrompt.ts` assembles the prompt, `tools.ts` defines and validates `submit_lead`,
  `rateLimit.ts` throttles requests and lead sends, `conversation.ts` runs the Anthropic tool loop
- `lib/email/sendLead.ts` — shared nodemailer transport used by both `/api/contact` and the chat tool
- `components/Chat/` — `Launcher`, `Panel`, `Message`
- `constants/Projects.ts` — source of truth for project cards and deck data
- `constants/Voice.ts` — hand-written voice and FAQ content; treat as public
- `types/` — TypeScript types (`CardType`, `ViewingProject`)
- `assets/fonts/` — local `.ttf` files (Alphaget, LouisGeorgeCafe, LouisGeorgeCafeBold)

### Styling

Most components are styled with hand-written BEM CSS in `globals.css`, not Tailwind utility
classes — e.g. `site-nav` / `site-nav__inner`, `profile-card` / `profile-card__photo`,
`chat-panel` / `chat-panel__header`. Colors are CSS custom properties defined once on `:root`
in the `oklch()` color space:

| Token | Role |
|-------|------|
| `--bg`, `--bg-deep` | page background |
| `--surface`, `--surface-raised` | panel/card surfaces |
| `--paper` | primary text |
| `--muted`, `--faint` | secondary/tertiary text |
| `--accent`, `--accent-strong` | interactive accent |
| `--mauve` | decorative accent |
| `--line`, `--line-strong` | borders |
| `--success`, `--danger` | status colors |
| `--shadow` | elevation shadow |

Tailwind (with `tailwind.config.js` and its `primaryBackground` / `secondaryBackground` /
`pastelPink` / `greenApple` / `menuPrimary` / `menuLightPrimary` token palette) is still
installed and `@tailwind base/components/utilities` is still imported in `globals.css`, but in
practice only a handful of older components lean on it for small utility classes (layout
helpers like `flex`, `object-cover`) — it is not the primary styling approach. Prefer adding a
new BEM block + custom-property-driven rule in `globals.css` over reaching for Tailwind
utilities in new code.

Custom fonts registered in `globals.css` via `@font-face` and exposed as Tailwind font-family
utilities: `font-Alphaget`, `font-Louis`, `font-LouisBold` (also referenced directly as
`font-family` values in some hand-written CSS, e.g. `Louis, system-ui, sans-serif`).

NextUI (v2) is used for the `Modal` in `Projects`. MUI Lab `Timeline` is used in `Academic`. Both require `"use client"` on the component.

### Key patterns

- Components that use hooks (`useState`, `useMediaQuery`, `useSprings`, etc.) must include `"use client"` at the top.
- `Menu` renders a `site-nav` header (desktop) and a separate fixed-position `mobile-nav` bottom bar (mobile), both BEM-styled in `globals.css`; the active section is tracked via a scroll listener and reflected with `aria-current`.
- `Projects` uses `@react-spring/web` + `react-use-gesture` to implement a draggable card deck; project data (image URLs, live URLs) lives in `constants/Projects.ts` — add new projects there.
- Images are hosted on Google Cloud Storage (`storage.googleapis.com`). Update `next.config.js` image domains if a new host is added.
