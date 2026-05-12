# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
```

There are no tests in this project.

## Architecture

This is a single-page portfolio site built with Next.js 13 (App Router). The entire site renders as one scrollable page — `src/app/page.tsx` → `HomePage` — with anchor-linked sections (`#profile`, `#academicJob`, `#skills`, `#projects`).

### Directory layout

All source lives under `src/app/` which is the TypeScript `baseUrl`, so `@/` resolves there:

- `pages/` — full-section page components (`HomePage`, `AcademicJob`, `DetailsColumn`, `Projects`, `Skills`)
- `components/` — smaller UI components used by pages (`Menu`, `MyProfile`, `AcademicJob/Academic`, `AcademicJob/Job`, `Projects/Card`, `DetailsColumn/ExperienceProjectCount`)
- `lib/animation/trail.tsx` — `Trail` wrapper that uses `@react-spring/web` for entrance animations
- `lib/hooks/useMediaQuery.ts` — `useCustomMediaQuery()` hook (wraps `react-responsive`); use this instead of raw Tailwind breakpoints when conditional JS logic is needed
- `lib/hooks/useOpenNewTab.ts` — `openInNewTabHandler(url)` utility
- `constants/Projects.ts` — source of truth for project cards and deck data
- `types/` — TypeScript types (`CardType`, `ViewingProject`)
- `assets/fonts/` — local `.ttf` files (Alphaget, LouisGeorgeCafe, LouisGeorgeCafeBold)

### Styling

Tailwind CSS with a custom theme defined in `tailwind.config.js`. The design token palette:

| Token | Hex |
|-------|-----|
| `primaryBackground` | `#331D2C` |
| `secondaryBackground` | `#3F2E3E` |
| `pastelPink` | `#A78295` |
| `light` | `#EFE1D1` |
| `greenApple` | `#CECE5A` |
| `menuPrimary` | `#48594a` |
| `menuLightPrimary` | `#9abf9e` |

Custom fonts registered in `globals.css` and exposed as Tailwind font-family utilities: `font-Alphaget`, `font-Louis`, `font-LouisBold`.

NextUI (v2) is used for the `Modal` in `Projects`. MUI Lab `Timeline` is used in `Academic`. Both require `"use client"` on the component.

### Key patterns

- Components that use hooks (`useState`, `useMediaQuery`, `useSprings`, etc.) must include `"use client"` at the top.
- The floating `Menu` is a fixed-position element styled entirely with Tailwind, including 3D skew effects via custom `skew-*` utilities.
- `Projects` uses `@react-spring/web` + `react-use-gesture` to implement a draggable card deck; project data (image URLs, live URLs) lives in `constants/Projects.ts` — add new projects there.
- Images are hosted on Google Cloud Storage (`storage.googleapis.com`). Update `next.config.js` image domains if a new host is added.
