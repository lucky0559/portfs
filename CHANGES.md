# Portfolio Changelog & Overview

## About the Portfolio

A personal portfolio site for **Lucky Angelo**, a Full-Stack Developer based in the Philippines.
Built with **Next.js 13 (App Router)** and deployed as a single-page application with anchor-linked sections.

### Developer Profile
- **Name:** Lucky Angelo Rabosa
- **Title:** Full-Stack / Mid Frontend Developer
- **Email:** angelorabosa5@gmail.com
- **GitHub:** [lucky0559](https://github.com/lucky0559)
- **LinkedIn:** [lucky-angelo-aa7253217](https://www.linkedin.com/in/lucky-angelo-aa7253217/)

---

## Portfolio Sections

### 1. Profile (`#profile`)
The landing section. Displays Lucky's profile photo, name, title, contact info, location, and social links (Facebook, Instagram, GitHub, LinkedIn).

### 2. Academic / Job (`#academicJob`)
Split into two sub-columns:
- **Academic Qualification** — Educational background shown as a vertical MUI timeline (BS Information Technology, Higher Secondary Certificate, Secondary School Certificate).
- **Job Experience** — All professional roles shown as a staggered card timeline.

### 3. Skills (`#skills`)
Tech stack organized into three groups:
- **Front-End:** React JS, Next.js, React Native, TypeScript, Tailwind CSS, Styled Components, HTML, CSS, TanStack Query, TanStack Form, Zustand, Zod, shadcn/ui, Axios
- **Back-End:** NestJS, Node.js, Express, TypeScript, PostgreSQL, Firebase, Firestore, AWS DynamoDB, AWS S3, Elastic Beanstalk, Route 53
- **Other Tools:** VS Code, Git, GitHub, GitLab, Bitbucket, Jira, Trello

### 4. Projects (`#projects`)
Card grid of all professional projects. Clicking a card opens a full-screen modal showing a draggable image deck (if screenshots are available), or a private/no-preview message. Includes a link to visit the live project where applicable.

### 5. Contact (`#contact`)
Contact form section. Collects name, email, subject, and message; submitting opens the system email client pre-filled via `mailto:`. Includes a direct email link, location, and quick GitHub/LinkedIn buttons.

---

## Work History

| Period | Company | Role |
|--------|---------|------|
| Dec 2021 – Apr 2023 | Internet Strategy Branding and Execution (ISBX) | Javascript Fullstack Developer |
| Dec 2023 – Mar 2025 | Vertere Global Solutions | Junior Fullstack Developer |
| Mar 2025 – Oct 2025 | Virtual Staffing Solution | Javascript Fullstack Developer |
| Dec 2025 – Present | Asti Business Services Inc. (ABSI) | Mid Frontend Developer |

---

## Projects List

| Project | Company | Public |
|---------|---------|--------|
| Chloe by People Science | ISBX | Yes — [peoplescience.health](https://peoplescience.health/) |
| Vurple | ISBX | Yes — [vurple.org](https://www.vurple.org/) |
| Brass Capital | ISBX | Yes — [brasscapital.finance](https://staging.brasscapital.finance/) |
| Guard Grabber | ISBX | Yes — [guardgrabber.com](https://www.guardgrabber.com/) |
| Digitized Document Processing System (CvSU) | Freelance | Yes |
| Insurance SaaS Platform | Vertere Global Solutions | Private |
| Vooks | Virtual Staffing Solution | Yes — [vooks.com](https://www.vooks.com/) |
| Client Back-office Web App (Telco) | ABSI | Private |

---

## Changes Made (Rework — May 2026)

### Auto-computed Stats
- `ExperienceProjectCount` now derives **years of experience** by summing actual months worked at each company (gaps between jobs are excluded).
- **Total projects** is derived from the length of the `projects` array — both update automatically as new entries are added.

### New File: `src/app/constants/Experience.ts`
- Stores all work history as typed data (`WorkExperienceEntry[]`).
- Exports `computeTotalYearsExperience()` — sums worked months across all jobs and floors to whole years.
- Exports `formatDateRange()` — formats a `"YYYY-MM"` pair into a human-readable string like `"Dec 2021 – Apr 2023"`.

### Job Experience Section (`Job.tsx`)
- **Before:** Only ISBX was listed.
- **After:** All 4 companies displayed as a vertical staggered card timeline.
  - ISBX uses the existing logo image.
  - Vertere, VSS, and ABSI use styled initials avatars with company-specific accent colors.
  - Each card shows: role (highlighted in green), company name, date range, and a "Current" badge for the active role.
- Framer Motion `staggerChildren` slide-in animation on scroll.

### Skills Section (`Skills.tsx`)
- Redesigned from expanding icon-only buttons to an **always-visible card grid** (icon + label).
- New front-end skills added: Zustand, TanStack Query, TanStack Form, Zod, shadcn/ui, React Native.
- New back-end skills added: Node.js, Express, Firebase, Firestore, AWS DynamoDB, AWS Elastic Beanstalk, AWS Route 53.
- New tools added: Trello, GitLab.
- Skills without a `react-icons` entry use a short text abbreviation badge instead.
- Framer Motion staggered reveal per skill card on scroll.

### Projects Section
- **3 new projects added:**
  - Insurance SaaS Platform (Vertere Global Solutions) — private
  - Vooks (Virtual Staffing Solution) — public
  - Client Back-office Web App / Telco (ABSI) — private
- Private projects show a lock icon and "Confidential" label on the card.
- Modal for private projects shows a lock screen with a message instead of screenshots.
- The "Visit" link in the modal is suppressed for private or URL-less projects.
- `isPrivate` field added to `CardType` and `ViewingDeckProject` types.
- Project cards redesigned: dark glassmorphism style with border and hover lift effect.
- Framer Motion staggered card reveal on scroll.

### Animations & Motion (Framer Motion)
All scroll-triggered animations use `whileInView` with `viewport: { once: true }` so they fire once as the section enters view.
- **Job timeline:** staggered slide-in from left per entry.
- **Skill cards:** staggered fade-in + scale-up.
- **Project cards:** staggered fade-up.
- **Academic/Job section:** section-level fade-up entrance.
- **Experience stats:** individual count-up entrance with staggered delay.

### Config
- `next.config.js` — added `www.vooks.com` to the allowed image domains list.

---

## Changes Made (Polish & Fixes — May 2026)

### Copyright Year
- `MyProfile.tsx` — replaced hardcoded `@2023` with `@{new Date().getFullYear()}` so it updates automatically each year.

### Profile Section Blank Space Fix
- Removed `Trail` (react-spring) from `MyProfile` and `DetailsColumn`; both now use Framer Motion `initial → animate` entrance which respects natural content height.
- Removed `min-h-screen` from the profile section container in `HomePage.tsx` — the section now sizes to its content.
- Tightened vertical padding across all sections.

### Menu Responsiveness
- **Desktop (xl+):** keeps the original 3D skewed floating panel; repositioned to `bottom-[8%]` to accommodate 5 items.
- **Mobile/tablet:** replaced the oversized floating panel with a frosted-glass fixed bottom navigation bar (icon + label per section). Extra bottom padding added to page sections so content is never hidden behind it.

### Project Cards — Consistent Sizing
- All cards are now a fixed `w-[168px] h-[230px]` with an explicit `h-[140px]` image zone and a `flex-1` info zone.
- Project name is clamped to 2 lines; "from" label is truncated — every card is the same size regardless of content length.
- Cards are **centered on mobile** (`justify-center`) and left-aligned on desktop (`xl:justify-start`).

### Vooks Project Image
- Updated card image URL to the Google Play Store asset provided.

---

## Changes Made (Job Timeline & Contact — May 2026)

### Job Experience — Order & Connector
- Timeline order reversed: **current role first** (ABSI → VSS → Vertere → ISBX).
- Connector line changed from a single absolute background line to **per-item connectors** — a line renders between entries but not after the last one, removing the dangling line at the bottom.

### Company Logos
- Added `logoUrl` field to `WorkExperienceEntry` type.
- **ABSI** — `ccap.ph` static logo image.
- **VSS** — TikTok profile avatar URL.
- **Vertere** — Facebook CDN image URL.
- **ISBX** — unchanged, uses local `.png` static import.
- `CompanyLogo` component handles `onError` gracefully: falls back to initials avatar if the external image fails to load.

### New Contact Section (`src/app/pages/Contact/Contact.tsx`)
- Form fields: name, email (optional), subject, message.
- Submit opens `mailto:angelorabosa5@gmail.com` pre-filled — no backend or API keys required.
- Right-side info panel: direct email link, location, GitHub and LinkedIn quick-link buttons.
- Full Framer Motion stagger animation on scroll.
- Added `#contact` anchor to `HomePage.tsx`.

### Menu — Contact Item Added
- "Contact" added as the 5th nav item in both the desktop 3D menu and the mobile bottom nav bar.
- Desktop menu repositioned to `bottom-[8%]` to keep all 5 items on screen.

---

## Changes Made (Menu Fix — May 2026)

### Desktop Menu Restored
- Reverted desktop floating panel back to original proportions: `w-52`, `p-4`, `bottom-15%`.
- The only desktop change from the original is the addition of the Contact item.
- Mobile bottom nav bar remains unchanged.

### Menu Z-index Fix
- Root cause: z-index classes were built dynamically (`z-[${5 - i}]`) so Tailwind never saw them as static strings at build time and did not generate the CSS. Without z-index stacking, every item's top-face pseudo-element covered the item above it, hiding all labels except the bottom one ("Contact").
- Fix: desktop items are now hardcoded in JSX (like the original) so `z-[5]` through `z-[1]` appear as complete string literals that Tailwind can detect and include.

### `Cannot find module './undefined'` Fix
- Root cause: `import isbx from "@/assets/images/isbx.png"` in `Job.tsx` used a specific tsconfig alias (`@/assets/images/*` → `assets/imgs/*`) that webpack's alias resolver silently loses when the catch-all `@/*` alias takes precedence. With the path unresolved, webpack records the module as `undefined` and later tries `require('./undefined')`, crashing the dev server.
- Fix: copied `isbx.png` to `public/isbx.png` and changed the import to a plain `<img src="/isbx.png">` — no webpack static import needed, path is always valid.
- Also deleted the stale `.next` build cache so the dev server starts clean.

---

## Changes Made (EmailJS Integration & Logo Updates — May 2026)

### In-App Email Sending via EmailJS
- Replaced `mailto:` approach with **EmailJS** (`@emailjs/browser` package) — emails are sent directly from the browser without any redirect or backend.
- `Contact.tsx` now uses `emailjs.sendForm()` with a `useRef` on the form element, matching field `name` attributes to EmailJS template variables (`from_name`, `from_email`, `subject`, `message`).
- Status states: `idle` → `loading` (spinner, button disabled) → `success` (green banner) or `error` (red banner). Form resets on success.
- Credentials loaded from `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` env vars.
- `.env.local.example` created at repo root with setup instructions (sign up at emailjs.com, add an Email Service, create a Template, copy the keys).

### Company Logo URLs Updated
- **Vertere Global Solutions** — changed to `https://graph.facebook.com/myvertere/picture?type=large` (public Facebook Graph API, always serves the current page profile picture).
- **Virtual Staffing Solution** — changed to the Instagram CDN URL via Facebook's crawler (`lookaside.fbsbx.com/…/virtualstaffingsolutionsleyte/profile_pic.jpg`). Both retain the `onError` initials fallback.

---

## Changes Made (Nodemailer Switch — May 2026)

### Contact Form — Switched to Nodemailer (server-side)
- **Root cause of EmailJS failure:** Gmail OAuth scope error — `Gmail_API: Request had insufficient authentication scopes`. EmailJS's Gmail integration requires a full OAuth grant which it does not request by default.
- **Replacement:** Removed `@emailjs/browser`; added `nodemailer` (server-side only).
- **New API route:** `src/app/api/contact/route.ts` — Next.js App Router POST handler.
  - Reads `GMAIL_USER` and `GMAIL_APP_PASSWORD` from server-side env vars (no `NEXT_PUBLIC_` prefix).
  - Creates a Nodemailer Gmail transporter using an App Password (2FA required on the Google account).
  - Sends email `from` the portfolio Gmail address, `replyTo` the visitor's email, `to` `GMAIL_USER`.
  - Subject prefixed with `[Portfolio]`; body is HTML with sender details and message.
- **`Contact.tsx` updated:** `emailjs.sendForm()` replaced with a plain `fetch("/api/contact", { method: "POST", ... })` call. Status flow (idle → loading → success/error) unchanged.
- **`.env.local.example` updated:** Replaced EmailJS vars with `GMAIL_USER` and `GMAIL_APP_PASSWORD` with setup instructions.

### Setup Required (one-time)
1. Enable 2-Step Verification on the Google account.
2. Google Account → Security → App Passwords → create one for "Mail".
3. Copy `.env.local.example` to `.env.local` and set `GMAIL_APP_PASSWORD` to the generated 16-character password.

---

## Changes Made (Company Logo URLs — May 2026)

### Company Logo URLs Updated (from official websites)
- **Vertere Global Solutions** — changed to `https://vertere-gs.com/wp-content/uploads/2021/11/unnamed.png` (image hosted on their own WordPress site).
- **Virtual Staffing Solution** — changed to `https://static.wixstatic.com/media/1f031c_48de669844b140f4be33cb4556e88545~mv2.png/…/VSS_FAITH.png` (logo from their official Wix site at virtualstaffing.net). Both retain the `onError` initials fallback.

---

## Changes Made (Logo Processing & Bio Update — May 2026)

### Company Logos — Local PNG with Transparent Backgrounds
- Downloaded all company logos and processed with Python/Pillow to remove white backgrounds → saved as transparent PNGs in `public/`:
  - `vss_logo.png` (TikTok CDN source)
  - `vertere_logo.png` (Facebook CDN source)
  - `absi_logo.png` (external URL source) — reverted back to `https://ccap.ph/…` (external URL)
- Logo container background changed from white to `bg-light` (cream `#EFE1D1`) to ensure all logos (transparent or opaque) render clearly against the dark portfolio background.

### Profile Bio — More Professional Tone
- **Before:** "I do Front-end and Back-end programming. I use Javascript Frameworks and I love it."
- **After:** "Full-stack developer specializing in JavaScript frameworks. I build scalable, high-performance applications with a focus on clean code and exceptional user experiences."
- Updated in `src/app/pages/DetailsColumn/DetailsColumn.tsx`

### Email Contact Form — Nodemailer Integration Complete
- API route at `src/app/api/contact/route.ts` logs email send attempts for debugging.
- `.env.local` requires:
  - `GMAIL_USER=angelorabosa5@gmail.com`
  - `GMAIL_APP_PASSWORD=<16-char-no-spaces>`
- Note: Gmail may filter self-emails (sent from your account to itself) to spam/All Mail — check those folders if the email doesn't appear in inbox.

---

## Changes Made (SEO — May 2026)

### Full SEO implementation for `https://luckyme.vercel.app`

- **`src/app/layout.tsx`** — replaced placeholder metadata with:
  - `metadataBase` set to `https://luckyme.vercel.app`
  - Proper `title` (default + template for future pages)
  - Full `description`, `keywords`, `authors`, `creator`
  - `openGraph` with type, locale, url, siteName, title, description, and `og-image.png`
  - `twitter` card (`summary_large_image`) with image reference
  - `robots` directives for Google (`max-image-preview: large`, `max-snippet: -1`)
  - `canonical` URL

- **`src/app/page.tsx`** — added JSON-LD `Person` structured data:
  - name, alternateName, jobTitle, url, email, image, sameAs (GitHub + LinkedIn), address (PH), knowsAbout

- **`src/app/sitemap.ts`** — generates `/sitemap.xml` (portfolio root URL with lastModified date)

- **`src/app/robots.ts`** — generates `/robots.txt` (allow all, sitemap reference)

- **`public/og-image.png`** — generated 1200×630 Open Graph image matching portfolio color palette (dark background, name, title, tech tags, URL)

---

## 2026-05-16 — Full Portfolio Redesign (Huashu-Design Premium UI)

A comprehensive visual redesign across all components applying editorial dark-luxury design principles.

### Infrastructure
- **`tailwind.config.js`** — restored missing base colors (`transparent`, `white`, `black`, `red-*`) that were accidentally stripped by the theme override
- **`globals.css`** — added custom scrollbar, `::selection` with greenApple tint, `.section-label` CSS utility (uppercase tag with leading gradient line), enhanced ambient radial gradient backdrop and reduced noise opacity

### Layout & Navigation
- **`pages/HomePage.tsx`** — restructured all sections as semantic `<section>` elements; added `SectionLabel` component with numbered tags (01–05); applied consistent `max-w-7xl mx-auto` container; hero section gets `min-h-screen flex items-center` for full-viewport feel

### Hero Section
- **`components/MyProfile.tsx`** — replaced heavy-bordered card with glassmorphism panel (subtle border, gradient background, top accent stripe, corner highlight); photo uses `fill` layout with `aspect-ratio: 3/4`; 3D tilt animation on mouse; availability badge overlay; social links as a compact 4-column icon grid
- **`pages/DetailsColumn/DetailsColumn.tsx`** — bolder three-tier typography hierarchy (`Say Hi to` / `Lucky` in greenApple / `Full-Stack Developer` at smaller weight); added tech-tag pills for key frameworks; section label included
- **`components/DetailsColumn/ExperienceProjectCount.tsx`** — added vertical gradient divider between stats; refined label typography
- **`components/DetailsColumn/HeroDecoration.tsx`** — more particles, dashed middle ring, pulsing dot animation on outer ring marker

---

## 2026-05-16

### Visibility & Consistency Fixes
- **`components/DetailsColumn/HeroDecoration.tsx`** — overhauled decoration visibility: ring borders raised from 0.18 → 0.5 opacity; orbiting dots now fully opaque with glow box-shadows; `</>` glyph changed to solid `#CECE5A` with green text-shadow glow; removed low-contrast floating particles; added tighter central ambient glow blur
- **`components/Projects/Card.tsx`** — added `min-h-[2.25rem]` to project name `h4` so all cards reserve space for two lines of title text, keeping grid rows uniform regardless of name length
- **`components/MyProfile.tsx`** — constrained profile card width on mobile/tablet (`w-52 sm:w-60`) and centered it with `mx-auto xl:mx-0` to prevent the card from stretching too wide on small screens; raised social icon opacity from `/45` to `/70` and border from `/12` to `/30` for legibility
- **`components/Projects/Card.tsx`** — raised "from" label opacity `/45` → `/65`; lock icon and "Confidential" text `/35` → `/65`
- **`pages/Projects/Projects.tsx`** — modal lock icon `/35` → `/65`
- **`pages/Contact/Contact.tsx`** — description text `/55` → `/75`; placeholder text `/30` → `/50`; input borders `/15` → `/25`; social icon buttons `/45` → `/70` with stronger border; hover states brightened
- **`components/AcademicJob/Job.tsx`** — date range text `/40` → `/65`; company name `/65` → `/85`
- **`components/DetailsColumn/ExperienceProjectCount.tsx`** — stat labels `/55` → `/80`
- **`components/Projects/Card.tsx`** — added `h-[15rem]` fixed height to all cards so Private-badge cards and non-badge cards share identical dimensions

### Content Sections
- **`pages/AcademicJob/AcademicJob.tsx`** — switched to CSS Grid layout; `position: relative` for the vertical column divider
- **`components/AcademicJob/Academic.tsx`** — replaced inline MUI sx overrides with cleaner structured objects; added greenApple gradient underline on heading; extracted degree data to an array
- **`components/AcademicJob/Job.tsx`** — boosted card background contrast; gradient connector line; tighter avatar border; "Current" badge with greenApple border
- **`pages/Skills/Skills.tsx`** — replaced 80×80 square cards with horizontal pill-shaped skill items (icon left, label right); category headers get a gradient underline rule; pills use `secondaryBackground/50` base for better contrast against primary sections
- **`pages/Projects/Projects.tsx`** — removed inner padding wrappers (now handled by `HomePage`); refined modal header/footer borders; external link icon in modal
- **`components/Projects/Card.tsx`** — wider cards (208px), subtle border that brightens on hover, spotlight radial gradient follows cursor, hover overlay reveals external-link icon; private badge uses rounded-full pill style
- **`pages/Contact/Contact.tsx`** — input hover/focus now targets `greenApple/30` ring instead of pink; info panel items use a shared map pattern; added `FaMapMarkerAlt` for location; layout uses `max-w-4xl`

---

## 2026-05-16 — Project Cards & Subtitle Visibility Fixes

### Project Cards (`components/Projects/Card.tsx`)
- **Text visibility:** "from" label changed from `text-pastelPink/65` to `text-light/50`; project name changed from `text-light/85` to `text-light` (full opacity cream) — both now clearly legible on the dark card background.
- **Private badge overflow fix:** moved the "Private" pill from inside the info section (where it was clipped by `overflow-hidden`) to an `absolute` overlay on the image area (`bottom-2 left-2.5`). Badge no longer overflows or gets cut by the card boundary. Styling updated: `bg-primaryBackground/70 border-pastelPink/30 text-pastelPink/80 font-LouisBold`.
- **Layout simplification:** removed `min-h-[2.25rem]` from the name `h4` and removed the Private badge from the info flex column — info section now contains only "from" label and name, always fitting within the fixed card height.

### Subtitle Visibility (`pages/Skills/Skills.tsx`, `pages/Projects/Projects.tsx`)
- **Skills subtitle** ("Technologies and tools I work with daily"): increased from `text-base xl:text-lg` to `text-xl xl:text-2xl` with `font-LouisBold text-light/75` — renders at 24px, clearly visible.
- **Projects subtitle** ("A selection of work I've built professionally and independently"): changed to `text-light font-LouisBold text-base xl:text-lg` — full opacity cream at 18px, clearly visible.
- Root cause: `LouisGeorgeCafe` is a thin script font; at ≤16px it renders with barely-visible strokes. Subtitles must use `font-LouisBold` at ≥18–20px (or `text-xl`+) to be legible.

---

## 2026-05-16 — New Project Added

### Projects (`constants/Projects.ts`)
- Added **My HR** (Asti Business Services Inc. / ABSI) — private project, no public URL or screenshots.

---

## 2026-07-31 — Project Modal Click-Outside-to-Close

### Projects (`pages/Projects/Projects.tsx`)
- Since the project detail modal renders `size="full"`, there is no visible backdrop to click away from. Added an `onClick` on the modal's outer content wrapper that closes the dialog, with `stopPropagation()` on each "About this project" description box (private, image-gallery, and no-preview variants) so clicking the description text itself does not close it.
- Clicking anywhere else in the modal — header, image gallery, dot indicators, the "Visit project" link, footer — now also closes the modal, per explicit user choice over excluding interactive elements.

---

## 2026-07-31 — Insurance SaaS Platform Renamed to PruServices

### Projects (`constants/Projects.ts`, `public/pruservices-logo.png`)
- Renamed **Insurance SaaS Platform** (Vertere Global Solutions) to **PruServices** in both the `cards` and `projects` data.
- Added the Pru Life U.K. wordmark logo, downloaded from `pruservices.prulifeuk.com.ph` and saved locally at `public/pruservices-logo.png` (referenced as `/pruservices-logo.png`) rather than hotlinked, since the source is a live third-party app.
- Flipped `isPrivate` from `true` to `false` for this project — `Card.tsx` and the modal both short-circuit to a lock icon / "Confidential" placeholder whenever `isPrivate` is true, so the logo would never have rendered otherwise. Confirmed with the user before making this change since it also removes the "Private" badge treatment.

---

## 2026-07-31 — Client Back-office Web App Renamed to VSAH

### Projects (`constants/Projects.ts`)
- Renamed **Client Back-office Web Application (Telco)** (ABSI) to **Vendor Service Access Hub (VSAH)** in both the `cards` and `projects` data, and marked it `isSaas: true`.
- Stayed `isPrivate: true`, so the card and modal keep the lock icon / "Confidential" treatment — the added description still renders underneath it, same as the Stock Investment Market System entry.
- Added description naming the end client, **Globe** (Philippine telco), and covering the ticketing workflow (vendors raise tickets for work orders, routed through a multi-level approver chain) and the user management module's blacklist feature, named **Arnitikos**, which supports flagging, searching, and managing blacklisted individuals.

---

## 2026-07-31 — Google Cloud Run Added to Skills

### Skills (`pages/Skills/Skills.tsx`)
- Added **Google Cloud Run** to the Back-End skills group, using the `SiGooglecloud` icon (simple-icons has no dedicated Cloud Run glyph) linking to `cloud.google.com/run`.

---

## 2026-07-31 — New Project Added: Himis

### Projects (`constants/Projects.ts`, `public/himis-*.png`)
- Added **Himis** (Freelance, Frontend), placed right after Vooks in both the `cards` and `projects` data. Sourced details from the live site at `https://himis.nl/` — a Dutch interim-management/freelance staffing platform for logistics, operations, and business support roles, based in Hoevelaken, Netherlands.
- Card thumbnail uses the HIMIS wordmark logo, downloaded from the site's asset CDN and saved locally at `public/himis-logo.png` (`/himis-logo.png`) rather than hotlinked, consistent with the PruServices logo.
- Modal gallery ("sample UI") uses three Playwright screenshots taken directly of the live homepage — hero section, job-search/services section, and the industry-knowledge grid — saved locally as `public/himis-hero.png`, `public/himis-search.png`, and `public/himis-industries.png`, since the site is a public marketing/job-board page with no separate screenshot assets to hotlink.

---

## 2026-07-31 — Gallery Navigation Fix & Larger Modal Images

### Projects (`pages/Projects/Projects.tsx`)
- Fixed a regression from the earlier click-outside-to-close change: clicking the gallery's next/prev arrows or dot indicators bubbled up to the modal's outer `onClick` and closed the dialog before the image could advance. Added `stopPropagation()` to all three gallery controls.
- The gallery image was capped at `max-w-[400px]`, sized for portrait mobile screenshots (Chloe, Vurple). This made landscape screenshots like Himis's render small. Changed to `max-w-full` (still bounded by `max-h-[700px]` and `object-contain`) so images use the available pane width regardless of orientation.

---

## 2026-07-31 — Clicking the Gallery Image No Longer Closes the Modal

### Projects (`pages/Projects/Projects.tsx`)
- Clicking anywhere on the screenshot/mockup itself (not just the prev/next/dot controls) still bubbled up and closed the modal. Moved `stopPropagation()` from the individual gallery buttons to the `ImageGallery` component's root wrapper, so any click within the gallery pane — image, arrows, or dots — stays inside the modal; the per-button `stopPropagation()` calls became redundant and were removed.

---

## 2026-07-31 — New Project Added: Visual Blueprint

### Projects (`constants/Projects.ts`, `public/visual-blueprint-*.png`)
- Added **Visual Blueprint** (Freelance, Frontend), placed right after Himis in both the `cards` and `projects` data. Sourced details primarily by running the local project at `/Users/luckyangelo/Astravisium/visual-blueprint` (`npm run dev` on port 3055) rather than only the live site at `https://www.visual-blueprint.com/`, then cross-checked against the live URL set as `projectUrl`.
- The studio is a Netherlands-based (Tilburg) 3D visualization service for architects, developers, and real estate — offering Interior Design Visualization, 360-Degree Virtual Tours, 3D Blueprint conversion, and Exterior Design Visualization.
- Card thumbnail uses the Visual Blueprint wordmark, extracted from the live-rendered navbar logo element and re-cropped locally to trim the transparent margin (the raw source asset was correctly transparent but the PNG previewer rendered stray unmultiplied RGB in the alpha-0 regions, which looked like a muddy gradient until inspected pixel-by-pixel) — saved at `public/visual-blueprint-logo.png`.
- Modal gallery ("sample UI") uses three Playwright screenshots taken directly from the running local dev server — hero section, 360° virtual tour service section, and the `/portfolio` project grid — saved locally as `public/visual-blueprint-hero.png`, `public/visual-blueprint-services.png`, and `public/visual-blueprint-portfolio.png`.

---

## 2026-07-31 — New Project Added: B&O Safety And Care

### Projects (`constants/Projects.ts`, `public/bo-safety-*.png`)
- Added **B&O Safety And Care** (Freelance, Frontend — role confirmed with the user since it wasn't specified), placed right before Vooks in both the `cards` and `projects` data. Sourced details from the live site at `https://www.bosafetyandcare.com/` — a Dutch private security company offering event, hospitality/venue, object, and personal security services, 24/7, with more than a decade of experience.
- Card thumbnail uses the colored "B&O Safety and Care" wordmark from the site's footer brand asset (the navbar logo variant was white-on-transparent and invisible against a white background when previewed), saved locally at `public/bo-safety-logo.png`.
- Modal gallery ("sample UI") uses three Playwright screenshots of the live site — hero section, services grid (event/hospitality/object/personal security), and the 24/7-protection CTA/footer section — saved locally as `public/bo-safety-hero.png`, `public/bo-safety-services.png`, and `public/bo-safety-cta.png`.

---

## 2026-07-31 — New Project Added: Panotaryo (Corporate Website)

### Projects (`constants/Projects.ts`, `public/panotaryo-*.png`)
- Added **Panotaryo (Corporate Website)** (Freelance, Frontend), placed right after Visual Blueprint in both the `cards` and `projects` data. Sourced details by running the local source at `/Users/luckyangelo/WhatsApp/pa-notaryo-ph/corporate-website` (`npm run dev` on port 3007) — no public production URL was found in the source (no custom domain in configs, `.well-known` files, or `next.config`), so `projectUrl` was left empty.
- The site is the marketing front-end for PA Notaryo PH, a Philippine online notarization and legal-consultation platform — covering Notarization, Consultation, and Online Legal Support services, a "Meet Our Lawyers" roster, and a client/lawyer workflow explainer (mobile app for clients, desktop browser for lawyers).
- Card thumbnail has no dedicated logo asset in the corporate-website repo itself (just the default Next.js favicon), so the actual brand mark — a justice-scale icon on a navy circle — was located in a sibling project in the same WhatsApp folder (`pa-notaryo-ph/admin-website/assets/common/logo.png`) and copied in as `public/panotaryo-logo.png`.
- Modal gallery ("sample UI") uses three Playwright screenshots from the locally running dev server — hero section, services grid, and the "Meet Our Lawyers" section — saved locally as `public/panotaryo-hero.png`, `public/panotaryo-services.png`, and `public/panotaryo-lawyers.png`.

---

## 2026-07-31 — PruServices Sample Image Added

### Projects (`constants/Projects.ts`, `public/pruservices-onboarding.png`)
- Added a second gallery image to the existing **PruServices** entry: a Playwright screenshot of the live onboarding/sign-in screen at `https://pruservices.prulifeuk.com.ph/app/onboarding/welcome`, saved locally as `public/pruservices-onboarding.png` and appended after the existing logo in `imageURLs`.

---

## 2026-07-31 — PruServices Logo Removed From Details Slider

### Projects (`constants/Projects.ts`)
- Removed `/pruservices-logo.png` from the **PruServices** `imageURLs` at the user's request, leaving only `/pruservices-onboarding.png` in the modal gallery. The card-grid thumbnail (`cards` entry, separate field) still uses the logo and is unaffected.

---

## 2026-07-31 — New Projects Added: Panotaryo (Admin) & Panotaryo (Lawyer Website)

### Projects (`constants/Projects.ts`, `public/panotaryo-admin-*.png`, `public/panotaryo-lawyer-*.png`)
- Added **Panotaryo (Admin)** and **Panotaryo (Lawyer Website)** (both Freelance, Frontend), placed right after Panotaryo (Corporate Website) and after each other, in both `cards` and `projects` data. Both reuse the shared `/panotaryo-logo.png` card thumbnail.
- Sourced from `/Users/luckyangelo/WhatsApp/pa-notaryo-ph/admin-website` (port 3008) and `/Users/luckyangelo/WhatsApp/pa-notaryo-ph/lawyer-website` (port 3009). Both apps require a real backend (`*-api-service.internal`, unreachable locally) to load any data, so their protected screens only rendered empty loading skeletons out of the box.
- To get real-looking screenshots without fabricating a live backend or exposing real user data, used Playwright's `page.route` to intercept the specific API calls each screen makes and return synthetic, clearly-placeholder JSON matching each app's actual response types (`DashboardStats` for admin's `/analytics/*` calls made directly from the browser; `Activity[]` for the lawyer app's own `/api/activities` Next.js route) — then bypassed the client-side auth redirect by seeding the same `auth-storage` zustand/localStorage shape each app already uses. This is the same technique as normal browser dev-tools network mocking, just scripted; no backend or real user data was touched.
- **Panotaryo (Admin)**: OTP email login screen (`public/panotaryo-admin-login.png`) plus the tabbed dashboard — Users, Witness, Lawyers/Legal, Admins, Lawyer Categories, Lawyer Applicants — with populated stat cards (`public/panotaryo-admin-dashboard.png`).
- **Panotaryo (Lawyer Website)**: matching OTP login screen (`public/panotaryo-lawyer-login.png`) plus the lawyer's Activities dashboard — Consult Now/Consult Later/Chat/Notarization tabs — showing a populated schedule table with client names and live status badges (`public/panotaryo-lawyer-activities.png`).

---

## 2026-07-31 — All Panotaryo Projects Renamed to Pa-Abogado

### Projects (`constants/Projects.ts`)
- Renamed all three Panotaryo entries — Corporate Website, Admin, Lawyer Website — to **Pa-Abogado** in both `cards` and `projects` `name` fields, per the user's request. Also updated the "PA Notaryo PH" brand mentions inside the description copy to "Pa-Abogado PH" so the text stays consistent with the new name. Image filenames (`public/panotaryo-*.png`) and asset paths were left as-is since they're internal, not user-facing.
- Later the same day, **Pa-Abogado (Admin)** was renamed again to **Pa-Abogado (Admin Website)** for consistency with the "Corporate Website" / "Lawyer Website" naming pattern.

---

## 2026-07-31 — New Project Added: Cineserye

### Projects (`constants/Projects.ts`, `public/cineserye-*.png`)
- Added **Cineserye** (Freelance, Frontend), placed right after My HR in both `cards` and `projects` data. Sourced by running the local source at `/Users/luckyangelo/WhatsApp/cinedrama/cinedrama-web` (`npm run dev` on port 3010, package name `stremit-next` — built on the "Streamit" video-streaming Next.js template) — no public production URL was found in the source, so `projectUrl` was left empty.
- Unlike the Pa-Abogado apps, this one renders fully without any backend — it has no `fetch`/`axios` calls at all, driving everything from local `StaticData`, so the real screenshots needed no API mocking.
- Cineserye is a Filipino teleserye/movie streaming (OTT) platform: a Netflix-style browsing home (featured-title hero, Top 10, "Only On Cineserye" rails), genres/cast/tags browsing, a tiered membership/subscription system (Basic, Premium, Standard plans with checkout), watchlists, a merchandise store, and a blog.
- Card thumbnail uses the real brand logo found at `public/assets/images/logo.png` in the source repo, copied in as `public/cineserye-logo.png`. Modal gallery uses three Playwright screenshots from the running dev server — the featured-title hero, the Top 10/"Only On Cineserye" content rails, and the pricing/membership plans page — saved as `public/cineserye-hero.png`, `public/cineserye-catalog.png`, and `public/cineserye-pricing.png`.

---

## 2026-07-31 — Cineserye Card Logo Fix (Too Small)

### Public assets (`public/cineserye-logo.png`)
- The user reported the Cineserye logo looked too small on its project card. Root cause: the source PNG was a 1563×1563 canvas that was fully transparent except for a small icon+wordmark lockup in the middle, and that lockup itself was a wide ~3:1 horizontal shape — inside the card's narrow, roughly-square image slot, `object-contain` was scaling it down to fit the width, leaving it visually tiny.
- First pass cropped tight to the full icon+wordmark's alpha bounding box (detected via PIL by reading the alpha channel, since the visible "white background" in previews was actually fully transparent pixels, not opaque white — a naive RGB-diff crop against white returned the whole canvas as bbox). This helped but the lockup's wide aspect ratio still capped how large it could render in a near-square slot.
- Second pass cropped down further to just the square icon mark (the play-button "C" shape, dropping the "CineSerye" wordmark), matching how the other card logos in this grid are already icon-only marks in roughly square canvases. This is the version now in place.
- Note for future image swaps: the browser's HTTP cache will keep serving a stale cached copy of a static asset if the filename doesn't change between edits — had to hard-clear the browser cache (CDP `Network.clearBrowserCache`) mid-session to see the updated crop while testing.

---

## 2026-07-31 — New Project Added: Cineserye (Admin Website)

### Projects (`constants/Projects.ts`, `public/cineserye-admin-*.png`)
- Added **Cineserye (Admin Website)** (Freelance, Frontend), placed right after Cineserye in both `cards` and `projects` data, reusing the shared `/cineserye-logo.png` card thumbnail.
- Sourced from `/Users/luckyangelo/WhatsApp/cinedrama/cineserye-admin-website` (`npm run dev` on port 3011). This is a full content-management back office for the Cineserye streaming platform — Titles, Movies, Series, Seasons, Episodes, Collections/Rows, Genres, Artists (Cast & Crew), Availability rules, Regions, Languages, Age Ratings, Content Warnings, Subscription Plans, PPV pricing, and Admin user management — authenticated via OTP email login (plus a separate super-admin path).
- The Dashboard page's stat cards, recent-activity table, and system-health table are fully hardcoded static UI (not wired to any API yet), so that screenshot needed no mocking at all. The Titles catalog page does call a real (unreachable) backend API directly from the browser (`http://weba-api-service.internal/v1`, no Next.js proxy in front of it), so that screenshot used the same Playwright `page.route` mocking technique as the Pa-Abogado admin projects — intercepting the literal internal API host and returning synthetic `TitleItem[]` data matching the app's real response shape — after bypassing the client-side auth guard by seeding the same `sessionStorage` keys (`admin_auth_tokens_v1`, `admin_auth_user_v1`) the app itself uses.
- Screenshots: OTP login screen (`public/cineserye-admin-login.png`), the dashboard with stat cards/recent activity/system health (`public/cineserye-admin-dashboard.png`), and the Titles catalog table (`public/cineserye-admin-titles.png`).

---

## 2026-07-31 — Vooks Details Added

### Projects (`constants/Projects.ts`, `public/vooks-*.png`)
- Filled in the previously-empty **Vooks** entry (`imageURLs: []`, no description) by browsing the live site at `https://www.vooks.com/`. Vooks is an award-winning online library of animated, read-aloud storybooks for kids — physical picture books turned into gently narrated videos with read-along highlighted text, music, and sound — plus classroom/educator pricing (1M+ teachers), a library-partnership program, and a "Vooks Creator" program for authors/publishers.
- Added three Playwright screenshots of the live site — the hero ("For Those Who Believe In the Magic of Storytime"), the "What is Vooks?" / award badges section, and the Teachers/classroom pricing page — saved as `public/vooks-hero.png`, `public/vooks-about.png`, and `public/vooks-teachers.png`. The existing card-grid thumbnail (Google Play Store icon URL) was left as-is; only the `projects` array (`imageURLs` + `description`) was updated, not `cards`.
- Appended a note to the description that Vooks is developed across Web, Mobile, and TV platforms, per the user.
