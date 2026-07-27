# DevOS — Landing Page Project Plan

Assignment: Internship-defined project, self-conceived product ("second brain for developers"), built as a SaaS marketing landing page. Next.js 14 + TypeScript + Tailwind. No backend/db/auth.

---

## 1. Product Refinement — Why DevOS Fits the Assignment

DevOS as briefed is good but slightly broad ("keeps everything organized"). For a landing page assignment, the product needs a **sharp, defensible angle** — not "yet another notes app."

**Refined positioning:** DevOS is not a notes app or a bookmarking tool. It's the missing layer between *where developers learn* (tutorials, docs, AI chats) and *where developers build* (projects, code). The core pain it solves: developers lose the **context** behind decisions — why a snippet was saved, which AI conversation led to an architecture choice, which tutorial a feature came from. DevOS links all of that back to the project it belongs to.

Why this fits the assignment well:
- It naturally has 3–6 distinct features (grid maps cleanly).
- It has a believable 3-tier pricing model (solo dev / freelancer / team-of-devs).
- It's visually rich — you can mock a real dashboard (project workspace, connected notes/snippets/AI chats) without needing a working backend.
- It matches your own tooling philosophy (AI-assisted dev, PRD-first, anti-vibe-coding) so the copy will sound authentic instead of generic.

**Recommendation:** keep the name **DevOS**, but anchor the pitch on "context," not "organization." Organization is a feature category (Notion, Obsidian already own that word). Context-linking is a niche you can own.

---

## 2. Positioning & Copy

**Product name:** DevOS
**One-line positioning:** The workspace that keeps your projects, notes, code, and AI chats connected — not just stored.

**Tagline (footer/logo area):**
> Your development knowledge, finally connected.

**Hero headline:**
> Stop losing the context behind your code.

**Hero subheadline:**
> DevOS connects your projects, notes, snippets, and AI conversations — so you always know *why*, not just *what*.

**Primary CTA:** `Start Building Free`
**Secondary CTA:** `See How It Works` (scrolls to product preview / how-it-works, not a fake signup)

**Trust strip line (above features):**
> Built for developers who learn fast, ship fast, and forget nothing.

**Final CTA section headline:**
> Your next project deserves a second brain.

**Final CTA button:** `Get Started — It's Free`

---

## 3. Landing Page Structure (final order)

1. Navbar (sticky, transparent → solid on scroll)
2. Hero (headline, subheadline, 2 CTAs, dashboard mockup visual)
3. Trust/social-proof strip (short line + logos of tech stacks it integrates with — VS Code, GitHub, Notion-style icons, not fake company logos)
4. Features grid (5 features)
5. How It Works (3-step process)
6. Product preview (larger dashboard mockup, annotated)
7. Pricing (3 tiers, Pro highlighted)
8. FAQ (5–6 questions — safer than fake testimonials, see note in section 18)
9. Final CTA banner
10. Footer

---

## 4. Design System

**Color palette**
| Token | Hex | Use |
|---|---|---|
| `--bg-base` | `#0B0F17` | page background (near-black navy, not pure black) |
| `--bg-surface` | `#131826` | cards, nav |
| `--bg-surface-2` | `#1A2033` | hover states, nested cards |
| `--border` | `#232A3D` | card borders, dividers |
| `--text-primary` | `#F4F6FB` | headings |
| `--text-secondary` | `#9AA4BF` | body text |
| `--text-muted` | `#6B7488` | captions, footer text |
| `--accent` | `#5B7FFF` | electric blue — primary actions, links |
| `--accent-hover` | `#4368FF` | button hover |
| `--accent-soft` | `#5B7FFF1A` | badge backgrounds, subtle glows (10% opacity) |
| `--accent-secondary` | `#7C6BFF` | used sparingly — gradient endpoint only, never a second dominant color |
| `--success` | `#3DD68C` | "Most Popular" badge, checkmarks |

Rule: **one accent family** (blue → violet gradient), used only for CTAs, active states, and the pricing highlight. Everything else stays neutral navy/gray. This avoids the "generic purple AI gradient" look the brief explicitly wants to avoid.

**Typography**
- Font: `Geist` (via `next/font`, pairs naturally with a dev-tool aesthetic) — fallback `Inter`.
- Monospace accent font for code snippets / small labels: `Geist Mono` or `JetBrains Mono`.

| Style | Size (desktop) | Size (mobile) | Weight |
|---|---|---|---|
| H1 (hero) | 56–64px | 32–36px | 700 |
| H2 (section title) | 36–40px | 26–28px | 700 |
| H3 (card title) | 20–22px | 18px | 600 |
| Body large | 18px | 16px | 400 |
| Body | 16px | 15px | 400 |
| Caption/label | 13–14px | 13px | 500, uppercase, letter-spacing 0.05em |

**Spacing scale:** Tailwind default 4px base — stick to `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Section vertical padding: `py-24` desktop / `py-16` mobile.

**Border radius:** cards `rounded-2xl` (16px), buttons `rounded-lg` (8px), badges/pills `rounded-full`.

**Shadows:** no heavy drop shadows on dark UI — use **subtle border + inner glow** instead:
```css
box-shadow: 0 0 0 1px var(--border), 0 8px 24px -12px rgba(91,127,255,0.15);
```
On hover, increase the glow opacity slightly rather than adding a bigger shadow.

**Button styles**
- Primary: solid `--accent` bg, white text, `rounded-lg`, subtle scale(1.02) + brighten on hover.
- Secondary: transparent bg, `1px solid var(--border)`, text `--text-primary`, border turns `--accent` on hover.
- Both: visible focus ring (`outline: 2px solid var(--accent); outline-offset: 2px`) for keyboard nav — this is one of your 3 required interactive states.

---

## 5. Responsive Behavior

**375px (mobile)**
- Single column everywhere. Nav collapses to hamburger → slide-in/dropdown menu.
- Hero: text centered, CTAs stacked full-width, mockup visual below text (not beside).
- Features/pricing grids: 1 column, cards stack vertically.
- Font sizes drop per the type table above; section padding tightens to `py-16`/`px-4`.

**768px (tablet)**
- Nav: full horizontal links reappear (no hamburger) if they fit; otherwise keep hamburger up to ~900px.
- Features grid: 2 columns.
- Pricing: 2 columns wrapping to a 3rd row, OR horizontal scroll — recommend 2-column grid with Pro spanning full width on its own row for emphasis at this breakpoint.
- Hero: text still centered, mockup can sit below or start moving beside text near the top of this range.

**1280px+ (desktop)**
- Nav: full horizontal, logo left, links center/right, CTA button right.
- Hero: two-column — text left, mockup visual right.
- Features grid: 3 columns (5 features → 3+2 layout, or make it 6 by adding one more to fill a clean 2x3/3x2 grid — see note below).
- Pricing: 3 columns side-by-side, Pro visually elevated (scaled 1.05, accent border, "Most Popular" badge).
- Max content width: `1280px` container with `px-8` gutters; sections beyond that get a subtle background treatment (gradient mesh or grid pattern) so it doesn't feel empty on ultra-wide screens.

**Note:** 5 features creates an awkward grid at 3-column desktop width. Recommend going to **6 features** (clean 3x2 desktop, 2x3 tablet, 1x6 mobile). See section 6.

---

## 6. Section Content

**Navbar:** Logo "DevOS" · Links: Features, How it Works, Pricing, FAQ · CTA button: "Start Free"

**Hero:** headline + subheadline (section 2) + 2 CTAs + dashboard mockup (a project workspace showing linked notes/snippets/AI-chat panels — this is your main hero visual, built as static JSX/SVG, not a real screenshot).

**Trust strip:** small caption `"Works alongside the tools you already use"` + a row of tech icons (VS Code, GitHub, Notion, Slack, ChatGPT/Claude) — logos are of real tools you integrate/reference conceptually, not fake client logos claiming these are customers. Use Lucide/simple icons, not brand-restricted marks if you want to stay safe — or a neutral "Works with your stack" line without logos at all if you'd rather avoid trademark icons entirely.

**Features (6):**
1. **Project Workspaces** — Group everything about a project — notes, links, snippets, tasks — in one place.
2. **Context-Linked Notes** — Every note stays attached to the project and decision it came from.
3. **AI Chat Memory** — Save and tag key AI conversations next to the code they helped you write.
4. **Snippet Library** — Reusable code, searchable by project, language, or tag.
5. **Unified Search** — Find anything — a note, a snippet, a chat — in one search bar.
6. **Learning Tracker** — Attach tutorials/courses to the project you used them for, so you remember *why* you learned it.

**How It Works (3 steps):** 1) Create a project → 2) Drop in notes, snippets, AI chats as you work → 3) Search and resurface context instantly, months later.

**Product preview:** larger annotated version of the hero mockup — callouts pointing to workspace sidebar, linked-items panel, search bar.

**Pricing:** see section 7.

**FAQ (recommended over testimonials):** "Is there a free plan?", "Do I need to install anything?", "Can I use this without a team?", "Does DevOS store my code?", "Can I export my data?", "Which AI tools does it work with?"

**Final CTA:** headline + button, same visual weight as hero, gradient background band to bookend the page.

**Footer:** Logo + tagline · Nav link groups (Product / Company / Legal placeholders) · social icons (GitHub, Twitter/X, LinkedIn) · `© 2026 DevOS. Built by [Your Name].`

---

## 7. Pricing Plans

| | **Starter** | **Pro** ⭐ Most Popular | **Team** |
|---|---|---|---|
| Price | $0 / forever | $9 / month | $24 / month |
| For | Solo learners, students | Active developers, freelancers | Small dev teams |
| Projects | Up to 3 | Unlimited | Unlimited |
| Notes & snippets | Unlimited | Unlimited | Unlimited |
| AI chat linking | Basic (10 saved/mo) | Unlimited | Unlimited |
| Search | Basic | Unified semantic search | Unified semantic search |
| Collaboration | — | — | Shared workspaces, up to 10 members |
| Support | Community | Priority email | Priority + onboarding call |
| CTA | `Start Free` | `Start Pro Trial` | `Talk to Us` |

("Enterprise" from your brief is renamed "Team" to stay realistic for a dev-tool at this stage — a true "Enterprise" tier reads as unbelievable without SSO/compliance features you're not building. If you want to keep the literal 3-tier names Basic/Pro/Enterprise from the brief, that's fine too — just say so and I'll rename Starter→Basic, Team→Enterprise.)

---

## 8. Component Architecture & Folder Structure

```
devos-landing/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # composes all sections
│   ├── globals.css
│   └── favicon.ico
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── ProductPreview.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   └── AccordionItem.tsx    # for FAQ
│   └── mockups/
│       └── DashboardMockup.tsx  # the hero/preview SVG-or-JSX illustration
├── data/
│   ├── features.ts
│   ├── pricing.ts
│   └── faq.ts
├── store/
│   └── uiStore.ts                # Zustand — see note below
├── lib/
│   └── utils.ts                  # cn() class merge helper etc.
├── public/
│   ├── og-image.png
│   └── icons/
├── next.config.js
├── tailwind.config.ts
└── README.md
```

**On Zustand (you flagged this — my recommendation):** Use Zustand only for small, client-only UI state that doesn't need persistence — e.g. mobile nav open/close, pricing toggle (monthly/yearly, if you add one), active FAQ accordion item. No dummy JSON "data layer" is needed for a static landing page — `data/*.ts` as plain typed arrays is simpler and sufficient than either Zustand or a JSON file for content like features/pricing. I've assumed this default; tell me if you'd rather skip Zustand entirely and use plain `useState` (also completely fine at this scale — Zustand is genuinely optional here, not required).

---

## 9. Project Setup Commands

```bash
npx create-next-app@14 devos-landing --typescript --tailwind --app --eslint
cd devos-landing

npm install lucide-react
npm install zustand          # only if you confirm you want it
npm install clsx tailwind-merge   # for the cn() utility

# fonts: use next/font/google or next/font/local — no separate install needed
```

`tailwind.config.ts` — extend theme with the color tokens from section 4, and register the font families under `theme.extend.fontFamily`.

Set up path aliases in `tsconfig.json` (`@/components/*`, `@/data/*`, etc.) — `create-next-app` scaffolds this by default with the `--app` flag if you accept the prompt.

---

## 10. Implementation Phases

**Phase 0 — Setup (30–45 min)**
Scaffold project, install deps, configure Tailwind tokens/fonts, set up folder structure, first commit.

**Phase 1 — Design system & primitives (1–2 hrs)**
Build `Button`, `Card`, `Badge` in `components/ui`. Get color/typography/spacing tokens working and visually confirmed with a throwaway test page.

**Phase 2 — Static sections, mobile-first (3–5 hrs)**
Build Navbar → Footer → Hero → Features → Pricing in that order, mobile layout first, no interactivity yet. Use real copy from section 6 immediately — never placeholder text.

**Phase 3 — Remaining sections (2–3 hrs)**
TrustStrip, HowItWorks, ProductPreview, FAQ, FinalCTA.

**Phase 4 — Dashboard mockup visual (2–4 hrs)**
This is the highest-effort single component. Build it as layered JSX/CSS (panels, mock sidebar, mock cards) — not an actual screenshot. Reuse a simplified version in both Hero and ProductPreview.

**Phase 5 — Responsive pass (2 hrs)**
Go breakpoint by breakpoint (375 → 768 → 1280) fixing layout, not section by section.

**Phase 6 — Interactivity & states (1–2 hrs)**
Hover states, focus rings, mobile menu open/close, FAQ accordion, pricing highlight animation.

**Phase 7 — Accessibility, SEO, performance pass (1–2 hrs)**
Semantic tags, alt text, metadata, image/font optimization, Lighthouse run + fixes.

**Phase 8 — README, deploy, final commits**

Total realistic estimate: **14–20 focused hours**, spread across your schedule.

---

## 11. Interactions & Animations

Keep it restrained — the brief explicitly warns against "unnecessary animations."

- **Hover:** buttons brighten/scale slightly; feature cards lift with a soft border-glow (translateY(-2px) + border color shift); pricing Pro card already elevated, gets a subtle glow pulse on hover only.
- **Focus:** visible accent outline on all interactive elements (required for keyboard nav + your 3-states requirement).
- **Click/active:** button press state (scale(0.98)); FAQ accordion expand/collapse (height transition, ~200ms ease).
- **Scroll-based (optional, use sparingly):** fade/slide-up on section entry using `IntersectionObserver` or CSS `@starting-style` — apply to section headers only, not every card, to avoid visual noise.
- **Avoid:** parallax, auto-playing carousels, animated gradients that loop infinitely, cursor-follow effects.

---

## 12. Accessibility, SEO, Semantic HTML

- Use real landmarks: `<header>`, `<nav>`, `<main>`, `<section aria-labelledby="...">`, `<footer>`.
- Every section has one `<h2>`; page has exactly one `<h1>` (hero headline).
- All interactive elements are real `<button>`/`<a>`, never `<div onClick>`.
- Color contrast: verify text vs background combos meet WCAG AA (your `--text-secondary` on `--bg-base` should be checked — likely fine, but confirm with a contrast checker).
- Keyboard nav: tab order follows visual order; mobile menu traps focus while open and returns focus on close; FAQ accordion is keyboard-operable (Enter/Space).
- Images: all decorative SVG mockups get `aria-hidden="true"`; any meaningful image gets real `alt` text.
- `next/font` for zero layout shift from web fonts; set `metadata` export in `layout.tsx` (title, description, OG image, Twitter card) for SEO.
- Add a `robots.txt` and basic `sitemap.ts` (Next.js supports this natively) — small but signals completeness.

---

## 13. Performance Optimization

- `next/image` for every raster asset (og-image, any photos) with explicit width/height to avoid layout shift.
- Build the dashboard mockup as SVG/CSS, not a PNG — zero image weight, infinitely crisp.
- `next/font` with `display: swap`, subset to Latin only.
- Avoid heavy animation libraries (Framer Motion is fine but adds bundle weight — CSS transitions/keyframes are sufficient for this scope; only add Framer Motion if you specifically want scroll-reveal orchestration).
- Lazy-load below-the-fold sections is usually unnecessary at this page size — Next.js code-splits by route already; focus more on image/font weight than JS splitting for a single-page site.
- Run `next build` and check the bundle analyzer if size feels off.

---

## 14. Testing at Required Breakpoints

- Use Chrome DevTools device toolbar, test at exactly **375px**, **768px**, **1280px**, plus a quick check at **1920px** to confirm the max-width container doesn't look broken on ultra-wide.
- Test with keyboard only (Tab/Shift+Tab/Enter/Space) — no mouse — to confirm focus states and mobile menu work.
- Run Lighthouse (Chrome DevTools → Lighthouse tab, or `npx unlighthouse`) in **incognito mode** on the deployed Vercel URL (local dev server scores are unreliable) for Performance/Accessibility/Best Practices/SEO.
- Test real content overflow: longest feature title, longest FAQ answer — make sure nothing breaks layout.

---

## 15. Git Workflow — Conventional Commits

```
feat: scaffold Next.js 14 project with Tailwind and TypeScript config
feat: add design system tokens and base UI components (Button, Card, Badge)
feat: build navbar, hero, and footer sections with responsive layout
feat: implement features, how-it-works, and pricing sections
feat: add dashboard mockup visual for hero and product preview
feat: add FAQ accordion and final CTA section
fix: correct mobile nav focus trap and keyboard accessibility
perf: optimize fonts and images, add metadata for SEO
docs: add README with setup instructions and AI workflow notes
chore: configure Vercel deployment and final polish pass
```
That's 10 — comfortably above the required 5, and each is atomic/reviewable.

---

## 16. README Outline

```
# DevOS — Landing Page

[Screenshot of hero section]

## Live Demo
https://devos-landing.vercel.app

## About
Short paragraph: what DevOS is, the problem it solves, who it's for.

## Tech Stack
Next.js 14 · TypeScript · Tailwind CSS · Zustand (if used) · Lucide React · Vercel

## Features
Bullet list mirroring the 6 landing-page features.

## Getting Started
git clone ...
cd devos-landing
npm install
npm run dev

## Project Structure
(short version of the folder tree from section 8)

## AI Workflow
Explain HOW AI was used in building this — e.g. "Planned architecture and design
system manually; used Claude/ChatGPT for boilerplate component scaffolding,
copy refinement, and accessibility review, with all architecture decisions
and final code review done manually." Be specific and honest — this is
explicitly required by the assignment and shows AI-assisted (not AI-replaced)
development, matching your own dev philosophy.

## Responsive Breakpoints
375px / 768px / 1280px+ — tested manually + via Lighthouse.

## License
MIT (or your preference)
```

---

## 17. Deployment to Vercel

1. Push repo to GitHub (public, as required).
2. Go to vercel.com → "Add New Project" → import the GitHub repo.
3. Framework preset auto-detects Next.js — no config needed.
4. Set project name, deploy.
5. After first deploy, copy the live URL into the README's "Live Demo" line and re-commit.
6. Optional: add a custom Vercel subdomain (`devos-landing.vercel.app` → rename in project settings) for a cleaner URL.
7. Re-check Lighthouse on the **production** URL, not localhost, since minification/CDN affects real scores.

---

## 18. Common Mistakes to Avoid

- Fake testimonials with invented names/photos claiming to be real users — reads as dishonest on a portfolio piece reviewers may scrutinize; use FAQ instead, or clearly-labeled "early access" quotes if you want social proof (e.g., attributed to "Beta tester" not a fabricated full name + headshot).
- Overusing the purple/blue AI-generic gradient look — keep gradients subtle and only in 1–2 spots (hero background glow, Pro pricing card).
- Cramming all 10 sections without enough whitespace — generous `py-24` spacing between sections matters more than people expect for "premium SaaS" feel.
- Skipping the focus-state requirement — easy to forget, explicitly graded (interactive states requirement).
- Committing everything in one giant commit at the end instead of incrementally.
- Using a raster screenshot for the "dashboard mockup" instead of building it as a real component — a coded mockup is more impressive and lighter-weight.
- Forgetting `alt` text and heading hierarchy until the accessibility pass — bake it in as you build each section, not retroactively.
- Pricing numbers that don't feel realistic for the target user (over/under-pricing a dev tool) — the $0/$9/$24 range in section 7 is calibrated to comparable real tools (Linear, Raycast, etc.).

---

## 19. Final Submission Checklist

- [ ] All 10 sections built and in correct order
- [ ] Responsive verified at 375px, 768px, 1280px (+ spot-check 1920px)
- [ ] 3+ interactive states implemented (hover, focus, click) and keyboard-testable
- [ ] Pricing: 3 tiers, Pro marked "Most Popular"
- [ ] No placeholder/Lorem Ipsum copy anywhere
- [ ] Consistent design tokens applied (colors, type, spacing, radius, shadow)
- [ ] Lighthouse 90+ on Performance, Accessibility, Best Practices, SEO (production URL)
- [ ] Public GitHub repo with 5+ conventional commits
- [ ] README complete: screenshot, live demo link, tech stack, setup steps, AI workflow section
- [ ] Deployed live on Vercel, URL verified working
- [ ] Semantic HTML + alt text + metadata/OG tags in place
- [ ] Manually tested keyboard-only navigation end to end

---

## Open Questions for You

1. **Zustand or not?** Recommended default: yes, but only for mobile-menu/FAQ-accordion/pricing-toggle state — nothing else. Confirm or say plain `useState` only.
2. **Pricing tier names:** keep Starter/Pro/Team (realistic) or literal Basic/Pro/Enterprise from the original brief (matches assignment wording exactly)?
3. **Trust strip:** real tool logos (VS Code/GitHub/etc. — trademark-safe if used as "works with," not "endorsed by") or a logo-free text-only version?
4. **Testimonials vs FAQ-only:** confirm you're fine skipping fake testimonials in favor of FAQ (section 18 recommendation), or want a labeled "early access feedback" section instead?

Once you confirm these, I'll move to detailed section-by-section content specs before any code.