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
