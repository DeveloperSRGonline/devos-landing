# DevOS — Step-by-Step Build Guide (Micro-Steps)

Follow top to bottom, in order. Each step is small enough to do and check off before moving to the next. No full code is written here — this tells you exactly what to create/run/do; you write the actual JSX/CSS inside each file.

**Assumptions locked in (change later if needed):**
- Zustand used only for mobile-menu open/close + FAQ accordion state.
- Pricing tier names: Starter / Pro / Team.
- Trust strip: simple Lucide icons + text labels (no trademarked logos).
- No fake testimonials — FAQ section instead.

---

## PHASE 0 — Project Setup

### 0.1 Create the project (Completed)
- [x] Project created with Next.js 16 (`devos`)
```bash
npx create-next-app@14 devos-landing --typescript --tailwind --app --eslint
```
When prompted:
- Use `src/` directory? → **No**
- Import alias (`@/*`)? → **Yes**, default `@/*`

### 0.2 Move into the project
```bash
cd devos-landing
```

### 0.3 Install dependencies (Completed)
- [x] Installed `lucide-react`, `zustand`, `clsx`, `tailwind-merge`
```bash
npm install lucide-react zustand clsx tailwind-merge
```

### 0.4 Open in your editor
```bash
code .
```

### 0.5 Run dev server, confirm it works
```bash
npm run dev
```
Open `http://localhost:3000` → confirm default Next.js page loads. Stop server (`Ctrl+C`) before continuing.

### 0.6 Clean the default template
- Open `app/page.tsx` → delete all content, leave:
  ```tsx
  export default function Home() {
    return <main></main>;
  }
  ```
- Open `app/globals.css` → delete everything except the three `@tailwind` directives at the top.

### 0.7 First commit
```bash
git init
git add .
git commit -m "chore: initial Next.js 14 + TypeScript + Tailwind scaffold"
```

### 0.8 Create GitHub repo and push
```bash
gh repo create devos-landing --public --source=. --remote=origin
git push -u origin main
```
(No `gh` CLI? Create the repo manually on github.com, then:)
```bash
git remote add origin https://github.com/<your-username>/devos-landing.git
git branch -M main
git push -u origin main
```

**✅ Checkpoint:** repo exists on GitHub, `main` branch pushed, one commit.

---

## PHASE 1 — Folder Structure

### 1.1 Create all folders in one go
```bash
mkdir -p components/layout components/sections components/ui components/mockups data store lib
```

### 1.2 Create empty placeholder files
```bash
touch components/layout/Navbar.tsx components/layout/Footer.tsx
touch components/sections/Hero.tsx components/sections/TrustStrip.tsx components/sections/Features.tsx components/sections/HowItWorks.tsx components/sections/ProductPreview.tsx components/sections/Pricing.tsx components/sections/FAQ.tsx components/sections/FinalCTA.tsx
touch components/ui/Button.tsx components/ui/Badge.tsx components/ui/Card.tsx components/ui/AccordionItem.tsx
touch components/mockups/DashboardMockup.tsx
touch data/features.ts data/pricing.ts data/faq.ts
touch store/uiStore.ts
touch lib/utils.ts
```

### 1.3 Verify structure
```bash
ls -R components data store lib
```
Confirm it matches the plan doc's folder tree.

### 1.4 Commit
```bash
git add .
git commit -m "chore: set up folder structure and empty component files"
```

**✅ Checkpoint:** folder tree exists exactly as planned, all files empty but present.

---

## PHASE 2 — Design Tokens & Fonts (Completed)
- [x] 2.1 Add color tokens to `globals.css` / `@theme`
- [x] 2.2 Add font family (`Geist` and `Geist_Mono` configured in `layout.tsx`)
- [x] 2.3 Register fonts in Tailwind
- [x] 2.4 Set base page background and text color
- [x] 2.5 Build `lib/utils.ts` with `cn()` helper
- [x] 2.6 Build verified cleanly
- [x] 2.7 Git committed: `feat: configure design tokens, fonts, and base styles`

---

## PHASE 3 — UI Primitives

### 3.1 Build `components/ui/Button.tsx`
- Props: `variant` (`"primary" | "secondary"`), `size` optional, standard button props via `React.ComponentProps<"button">`.
- Primary: solid accent bg, white text, hover brighten, focus ring, active scale.
- Secondary: transparent bg, border, hover border turns accent.
- Export as a reusable typed component.

### 3.2 Build `components/ui/Badge.tsx`
- Small pill, used for "Most Popular" and any small tags. Props: `children`, optional `variant`.

### 3.3 Build `components/ui/Card.tsx`
- Base card wrapper: rounded-2xl, `bg-surface`, `border`, padding, the subtle glow box-shadow from the plan.
- Accepts `children` and optional `className` (merged via `cn()`).

### 3.4 Build `components/ui/AccordionItem.tsx`
- Props: `question`, `answer`, `isOpen`, `onToggle`.
- Renders a button (question, keyboard-operable) + collapsible answer panel with a height/opacity transition.

### 3.5 Test primitives
In `app/page.tsx`, temporarily import and render one of each (`Button`, `Badge`, `Card`) to visually confirm styling before building real sections. Remove this test code once confirmed.

### 3.6 Commit
```bash
git add .
git commit -m "feat: build Button, Badge, Card, and AccordionItem UI primitives"
```

**✅ Checkpoint:** all 4 primitives render correctly with correct hover/focus states, confirmed visually.

---

## PHASE 4 — Zustand Store

### 4.1 Build `store/uiStore.ts` (Completed)
- [x] Create a Zustand store with:
  - `isMobileMenuOpen: boolean` + `toggleMobileMenu()` / `closeMobileMenu()`
  - `openFaqIndex: number | null` + `toggleFaq(index: number)`

Keep it small — this store should not grow beyond these two concerns for this project.

### 4.2 Commit (Completed)
- [x] `git add .`
- [x] `git commit -m "feat: add Zustand store for mobile menu and FAQ accordion state"`

**✅ Checkpoint:** store file compiles with no TypeScript errors, exports a typed hook (e.g. `useUIStore`).

---

## PHASE 5 — Data Files (Completed)

- [x] 5.1 Fill `data/features.ts`
- [x] 5.2 Fill `data/pricing.ts`
- [x] 5.3 Fill `data/faq.ts`
- [x] 5.4 Commit

**✅ Checkpoint:** three data files export real, typed content — no placeholder text anywhere.
```bash
git add .
git commit -m "feat: add typed content data for features, pricing, and FAQ"
```

**✅ Checkpoint:** three data files export real, typed content — no placeholder text anywhere.

---

## PHASE 6 — Layout: Navbar & Footer (Completed)

### 6.1 Build `components/layout/Navbar.tsx` (Completed)
- [x] Left: "DevOS" logo/wordmark.
- [x] Center/right: nav links (Features, How it Works, Pricing, FAQ) as anchor links to section IDs.
- [x] Right: `Button` (primary, "Start Free").
- [x] Mobile: hamburger icon (Lucide `Menu`/`X`) wired to `useUIStore().isMobileMenuOpen`; when open, show a full-width dropdown/slide-in with the same links stacked.
- [x] Make it `sticky top-0`, transparent/backdrop-blur.

### 6.2 Build `components/layout/Footer.tsx` (Completed)
- [x] Logo + tagline ("Your development knowledge, finally connected.")
- [x] Link columns: Product, Company, Legal.
- [x] Social icons row using Lucide icons.
- [x] Bottom line: `© 2026 DevOS. Built by DeveloperSRG.`

### 6.3 Wire both into `app/layout.tsx` (Completed)
- [x] Import `Navbar` and `Footer`, wrap `{children}` between them.

### 6.4 Visual check at 375px, 768px, 1280px (Completed)
- [x] Responsive layout verified.

### 6.5 Commit (Completed)
- [x] `git add .`
- [x] `git commit -m "feat: build responsive Navbar and Footer with mobile menu"`

**✅ Checkpoint:** Navbar + Footer render on every page, mobile menu opens/closes correctly, keyboard-accessible.

---

## PHASE 7 — Hero Section (Completed)

- [x] 7.1 Build `components/mockups/DashboardMockup.tsx` (basic version first)
- [x] 7.2 Build `components/sections/Hero.tsx`
- [x] 7.3 Add to `app/page.tsx`
- [x] 7.4 Visual + responsive check
- [x] 7.5 Commit (`feat: build Hero section with dashboard mockup visual`)

**✅ Checkpoint:** Hero looks correct at all 3 breakpoints, CTAs are real buttons with focus states.

---

## PHASE 8 — Trust Strip, Features, How It Works (Completed)

- [x] 8.1 Build `components/sections/TrustStrip.tsx`
- [x] 8.2 Build `components/sections/Features.tsx`
- [x] 8.3 Build `components/sections/HowItWorks.tsx`
- [x] 8.4 Add all to `app/page.tsx` in order: TrustStrip → Features → HowItWorks (after Hero)
- [x] 8.5 Responsive + hover check at all breakpoints
- [x] 8.6 Commit (`feat: add TrustStrip, Features grid, and HowItWorks sections`)

**✅ Checkpoint:** 3 more sections live, features grid reflows 1→2→3 columns correctly, hover states visible.

---

## PHASE 9 — Product Preview & Pricing

### 9.1 Build `components/sections/ProductPreview.tsx` (Completed)
- [x] `<section id="product-preview">`, H2 title ("See DevOS in action" or similar).
- [x] Larger version of `DashboardMockup`, optionally with 2–3 small annotation callouts (absolutely positioned labels pointing to the sidebar/search bar/linked-items panel).

### 9.2 Build `components/sections/Pricing.tsx` (Completed)
- [x] `<section id="pricing">`, H2 title, subtitle.
- [x] Map over `data/pricing.ts` in a 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), each plan in a `Card`.
- [x] For the plan where `isPopular === true`: add the `Badge` ("Most Popular"), an accent border, and a slight scale/elevation (`lg:scale-105` or `lg:-translate-y-2`) — desktop only, avoid on mobile/tablet where it'd break stacking.
- [x] Each card: plan name, price, tagline, feature list (checkmarks via Lucide `Check`), `Button` with the plan's `ctaLabel`.

### 9.3 Add both to `app/page.tsx` after HowItWorks. (Completed)
- [x] Added `ProductPreview` and `Pricing` to `app/page.tsx`.

### 9.4 Responsive check — confirm Pro card's elevation doesn't cause overflow/clipping on tablet. (Completed)
- [x] Layout and responsive styling verified.

### 9.5 Commit (Completed)
- [x] `git add .`
- [x] `git commit -m "feat: build ProductPreview and Pricing sections with highlighted Pro tier"`

**✅ Checkpoint:** Pricing renders 3 tiers correctly, Pro visually stands out only on desktop without breaking mobile stacking.

---

## PHASE 10 — FAQ & Final CTA (Completed)

- [x] 10.1 Build `components/sections/FAQ.tsx`
  - `<section id="faq">`, H2 title.
  - Map over `data/faq.ts`, render each as an `AccordionItem`, controlled by `useUIStore().openFaqIndex` / `toggleFaq`.
  - Confirm keyboard operability (Tab to focus, Enter/Space to toggle).

- [x] 10.2 Build `components/sections/FinalCTA.tsx`
  - Full-width band with gradient background (subtle, accent → accent-secondary), centered headline + single primary `Button`.

- [x] 10.3 Add both to `app/page.tsx`, in order: FAQ → FinalCTA (after Pricing, before Footer — Footer already lives in `layout.tsx`).

- [x] 10.4 Full page scroll-through check on all 3 breakpoints — confirm every section appears once, in correct order, no gaps/overlaps.

- [x] 10.5 Commit (`feat: add FAQ accordion and FinalCTA section, complete section set`)

**✅ Checkpoint:** all 10 sections present, page is feature-complete top to bottom.

---

## PHASE 11 — Accessibility & SEO Pass (Completed)

- [x] 11.1 Heading audit: Exactly one `<h1>` (Hero) and every other section title is `<h2>`. Card/step titles inside sections use `<h3>`.
- [x] 11.2 Landmark audit: Confirmed `<nav>` (Navbar), `<main>` (wraps content in `layout.tsx`), `<footer>` (Footer) are semantic tags without duplicate `<main>` tags.
- [x] 11.3 Interactive element audit: All interactive elements use `<button>` or `<a>` with focus states.
- [x] 11.4 Alt text / aria audit: Added `aria-hidden="true"` to decorative dashboard mockup and visual SVG icons.
- [x] 11.5 Focus ring audit: All interactive elements have focus rings.
- [x] 11.6 Metadata: Configured title, description, openGraph, twitter, and robots in `app/layout.tsx`.
- [x] 11.7 Sitemap & robots: Created `app/sitemap.ts` and `app/robots.ts`.
- [x] 11.8 Commits completed (`fix: complete accessibility pass` & `feat: add SEO metadata, sitemap, and robots.txt`).

**✅ Checkpoint:** keyboard-only walkthrough works end-to-end; heading/landmark structure is clean; metadata present.

---

## PHASE 12 — Performance Pass

### 12.1 Replace any raster images with `next/image`, explicit `width`/`height`.
### 12.2 Confirm fonts use `next/font` with `display: swap` (already done in Phase 2 — just re-verify).
### 12.3 Run a production build locally
```bash
npm run build
```
Fix any build errors/warnings shown.

### 12.4 Run bundle check (optional but useful)
```bash
npm run build -- --profile
```
or inspect the `.next` build output summary for unusually large chunks.

### 12.5 Commit
```bash
git add .
git commit -m "perf: optimize images and verify production build output"
```

**✅ Checkpoint:** `npm run build` completes with no errors/warnings.

---

## PHASE 13 — Deploy to Vercel

### 13.1 Push latest commits
```bash
git push
```

### 13.2 Go to vercel.com → "Add New" → "Project" → import your GitHub repo.

### 13.3 Confirm framework preset shows "Next.js" automatically → click **Deploy**.

### 13.4 Wait for build to finish, open the generated URL, click through the whole page.

### 13.5 Run Lighthouse on the **live production URL** (Chrome DevTools → Lighthouse tab, Incognito window) at mobile and desktop settings. Note any score below 90 and fix (usually image/font/contrast issues).

### 13.6 Fix any issues found, commit, push — Vercel auto-redeploys on push.

**✅ Checkpoint:** live Vercel URL works, Lighthouse scores 90+ across Performance/Accessibility/Best Practices/SEO.

---

## PHASE 14 — README & Final Submission

### 14.1 Take a full-page screenshot of the hero (or full page) for the README.
### 14.2 Write `README.md` using the outline from the plan doc (About, Tech Stack, Features, Getting Started, Project Structure, AI Workflow, Breakpoints, License). Fill in your real live demo URL from Phase 13.
### 14.3 Commit
```bash
git add .
git commit -m "docs: add complete README with setup instructions and AI workflow"
git push
```

### 14.4 Final full checklist pass
Go through the "Final Submission Checklist" section of the main plan doc (`DevOS-landing-page-plan.md`) top to bottom, ticking each item against your live deployed site — not your local version.

### 14.5 Submit
Submit the GitHub repo URL + live Vercel URL as required by your internship.

**✅ Checkpoint: project complete.**

---

## Quick Reference — All Commits in Order

```
chore: initial Next.js 14 + TypeScript + Tailwind scaffold
chore: set up folder structure and empty component files
feat: configure design tokens, fonts, and base styles
feat: build Button, Badge, Card, and AccordionItem UI primitives
feat: add Zustand store for mobile menu and FAQ accordion state
feat: add typed content data for features, pricing, and FAQ
feat: build responsive Navbar and Footer with mobile menu
feat: build Hero section with dashboard mockup visual
feat: add TrustStrip, Features grid, and HowItWorks sections
feat: build ProductPreview and Pricing sections with highlighted Pro tier
feat: add FAQ accordion and FinalCTA section, complete section set
fix: complete accessibility pass — semantics, focus states, and ARIA attributes
feat: add SEO metadata, sitemap, and robots.txt
perf: optimize images and verify production build output
docs: add complete README with setup instructions and AI workflow
```
(15 commits — well above the required 5, each one a real, reviewable unit of work.)