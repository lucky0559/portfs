# Portfolio UI/UX Improvements — Design Spec

**Date:** 2026-05-13  
**Scope:** Comprehensive UI/UX polish across all 6 sections (Global, Navigation, Hero, Academic/Job, Skills, Projects, Contact)  
**Approach:** All improvements (A + B + C) — fixes, new features, and enhanced interactions

---

## 1. Global / Cross-Cutting

### 1.1 Scroll Progress Bar
- A 3px gradient bar fixed to the very top of the viewport (`position: fixed; top: 0; z-index: 50`)
- Gradient: left `#CECE5A` → right `#A78295`
- Width driven by a `scroll` event listener: `(scrollY / (documentHeight - viewportHeight)) * 100`%
- Implemented as a new client component `components/ScrollProgressBar.tsx`, mounted in `layout.tsx`

### 1.2 Scroll-to-Top Button
- Fixed bottom-right button (`position: fixed; bottom: 96px; right: 24px` — above mobile nav)
- Icon: `FaArrowUp` from react-icons
- Appears with a fade-in after `scrollY > 300`, hides below that threshold
- On click: `window.scrollTo({ top: 0, behavior: 'smooth' })`
- Styled: circular, `bg-greenApple/20 border border-greenApple/50 text-greenApple`, hover brightens border
- Implemented as `components/ScrollToTopButton.tsx`, mounted in `layout.tsx`

### 1.3 Smooth Scroll
- Add `html { scroll-behavior: smooth; }` to `globals.css`

### 1.4 Cursor Glow (Desktop Only)
- A soft radial gradient `div` (`pointer-events: none; position: fixed; z-index: 9999`) that follows the mouse
- Gradient: `radial-gradient(200px circle, rgba(206,206,90,0.06), transparent 70%)`
- Tracks `mousemove` event; hidden on touch devices via `@media (hover: none)`
- Implemented as `components/CursorGlow.tsx`, mounted in `layout.tsx`

### 1.5 Section Transition Dividers
- Replace hard background-color cuts between sections with a `div` carrying a gradient:  
  `background: linear-gradient(to bottom, #331D2C, #3F2E3E)` (and reverse for the return)
- Height: `48px`. Inserted between each `<div id="...">` block in `HomePage.tsx`

### 1.6 Accessibility — aria-labels
- All icon-only interactive elements across the codebase must carry `aria-label`
- Social buttons in `MyProfile.tsx` (Facebook, Instagram, GitHub, LinkedIn)
- Nav items in `Menu.tsx` mobile bar
- Modal close button in `Projects.tsx`
- Scroll-to-top button

### 1.7 .superpowers in .gitignore
- Add `.superpowers/` line to `.gitignore`

---

## 2. Navigation (Menu)

### 2.1 Active Section Detection
- Use `IntersectionObserver` in `Menu.tsx` (already a client component) to watch all 5 section anchor elements (`#profile`, `#academicJob`, `#skills`, `#projects`, `#contact`)
- Observer threshold: `0.4` — section is "active" when 40% visible
- Active section ID stored in local state `activeSection`
- Desktop: active `<li>` gets `bg-primaryBackground text-light -translate-x-50-px` applied immediately (same as hover state) via conditional class
- Mobile: active icon gets `text-greenApple scale-110` treatment

---

## 3. Hero / Profile Section

### 3.1 CTA Buttons (`DetailsColumn.tsx`)
- Add two buttons below the bio paragraph, before `ExperienceProjectCount`:
  - **"Hire Me"** (primary): `bg-greenApple text-primaryBackground`, `href="mailto:angelorabosa5@gmail.com"`, icon `FaEnvelope`
  - **"View Work"** (secondary): `border border-greenApple/50 text-greenApple`, `href="#projects"` smooth scroll, icon `FaArrowDown`
- Both get `whileHover={{ scale: 1.04, y: -2 }}` and `whileTap={{ scale: 0.97 }}` from framer-motion

### 3.2 Typewriter Role Animation (`DetailsColumn.tsx`)
- Replace static "Full-Stack Developer" in the hero heading with a cycling typewriter
- Roles array: `["Full-Stack Developer", "React Specialist", "Node.js Engineer"]`
- New client sub-component `components/TypewriterText.tsx` — uses `useState` + `useEffect` intervals
- Algorithm: type characters one at a time (50ms/char), pause 1800ms, backspace (30ms/char), advance to next role, repeat
- Renders a blinking cursor `|` via CSS animation

### 3.3 Profile Image Glow (`MyProfile.tsx`)
- Add `hover:shadow-[0_0_24px_rgba(206,206,90,0.25)]` and `transition-shadow duration-500` to the `<Image>` wrapper div

### 3.4 Magnetic Social Buttons (`MyProfile.tsx`)
- Replace raw icon clicks with a `MagneticButton` wrapper component (`components/MagneticButton.tsx`)
- On `mousemove` within the button's bounding box, apply a subtle `translate(x, y)` transform (max ±8px) proportional to cursor distance from center
- On `mouseleave`, spring back to `translate(0, 0)` using CSS transition
- `aria-label` added to each button

---

## 4. Academic / Job Section

### 4.1 Replace MUI Timeline (`Academic.tsx`)
- Remove `@mui/lab` Timeline entirely; replace with a custom component using Tailwind + framer-motion
- Structure: vertical line (`w-px bg-pastelPink/30`) with absolutely-positioned dots (`w-3 h-3 rounded-full bg-greenApple`) and content cards to the right
- Each item animates in with `whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -30 }}` staggered via `containerVariants`
- Remove `react-device-detect` import entirely from `Academic.tsx`

### 4.2 Add Dates to Academic Entries
Academic data hardcoded in `Academic.tsx` with estimated date ranges:
| Entry | Dates |
|---|---|
| BS Information Technology | 2017 – 2021 |
| Higher Secondary Certificate | 2015 – 2017 |
| Secondary School Certificate (Elementary) | 2009 – 2015 |

### 4.3 Remove Inline Style / Hardcoded Colors
- Replace `style={{ backgroundColor: "#331D2C" }}` on `TimelineDot` with Tailwind `bg-primaryBackground`
- This is already moot once MUI is removed, but verify no other inline color strings remain in the file

### 4.4 Replace isMobile
- Remove `react-device-detect` import; use `useCustomMediaQuery` hook already in `lib/hooks/useMediaQuery.ts`
- Already moot once MUI Timeline is removed (icon sizes were the only isMobile use)

---

## 5. Skills Section

### 5.1 Consistent Skill Card Fallback
- Skills without an `Icon` currently display a plain text abbreviation (`abbr`)
- New treatment: render a small styled circular badge `w-7 h-7 rounded-full bg-pastelPink/20 border border-pastelPink/30 flex items-center justify-center text-[9px] font-LouisBold text-pastelPink`
- This replaces the plain `<span>` abbreviation, making all cards visually consistent

### 5.2 Animated Progress Ring on Hover
- On hover, the skill card's border transitions from `border-pastelPink/20` to `border-greenApple/60`
- A subtle `box-shadow: 0 0 12px rgba(206,206,90,0.2)` glow appears via Tailwind `hover:shadow-[0_0_12px_rgba(206,206,90,0.2)]`
- The icon scales up slightly: `whileHover={{ scale: 1.15 }}` on the icon element (already present as `scale: 1.08` on the card — increase to `1.1` on card, `1.15` on icon separately)
- On mouse leave, all effects revert via existing `transition-colors duration-200`

### 5.3 Section Subtitle
- Add below `<span className="...">Skills</span>`:  
  `<p className="text-pastelPink font-Louis text-sm xl:text-base mt-2 mb-4 max-w-lg">Technologies and tools I use to build full-stack applications.</p>`

---

## 6. Projects Section

### 6.1 Swipe Hint Animation
- On first mount, after a 600ms delay, play a one-time animation: top card translates `x: -40px` then returns to center (spring, 300ms each way)
- Controlled with a `useRef` flag so it only fires once per page load
- Implementation: add a `hintAnimation` state in `Deck` component; on mount, trigger via `api.start` then reset

### 6.2 Drag Instruction Label
- Below the card deck, add:  
  `<p className="text-pastelPink/60 font-Louis text-xs text-center mt-4 flex items-center justify-center gap-2"><FaArrowLeft size={10}/> Swipe to explore <FaArrowRight size={10}/></p>`
- Fades out after the first swipe (`gone.size > 0`)

### 6.3 Accessibility
- Modal close button: add `aria-label="Close project details"`
- Project card: add `role="button"` and `aria-label={project.name}`

---

## 7. Contact Section

### 7.1 Client-Side Validation
- Each field validates on `onBlur`; result shown as inline message below the field
- **Name**: required, min 2 chars → error: "Name must be at least 2 characters"
- **Email**: required, regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` → error: "Please enter a valid email"
- **Subject**: required, min 3 chars → error: "Subject is too short"
- **Message**: required, min 10 chars → error: "Message is too short"
- Valid fields show a subtle `border-greenApple/50` border color
- Invalid fields show `border-red-400/50` with error text in `text-red-400 text-xs mt-1`
- Submit button disabled if any field is invalid

### 7.2 Textarea Character Counter
- Below `<textarea>`, add a right-aligned counter: `{messageLength} / 500`
- `maxLength={500}` added to textarea
- Counter turns `text-red-400` when > 450 characters

### 7.3 Email Field Required
- Add `required` attribute to the `from_email` input (currently optional)

---

## Implementation Notes

- **No new heavy dependencies** — all changes use existing libraries (framer-motion, react-spring, react-icons, Tailwind)
- MUI Lab (`@mui/lab`) can be removed from `package.json` once Academic.tsx is migrated
- `react-device-detect` can be removed from `package.json` once Academic.tsx is migrated
- All new components go in `src/app/components/` following existing conventions
- All new components that use hooks must include `"use client"` directive

---

## Out of Scope
- Changing the color palette or typography system
- Adding new portfolio sections
- Backend/API changes
- New project entries
