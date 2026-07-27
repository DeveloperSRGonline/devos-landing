# DevOS — Developer Context & Knowledge Operating System

DevOS is a modern, high-performance landing page and developer context management platform built to unify code snippets, project notes, architecture specifications, and AI chat memory into one structured workspace.

![DevOS Landing Page](https://raw.githubusercontent.com/DeveloperSRGonline/devos-landing/main/public/file.svg)

---

## ⚡ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom Design Tokens
- **State Management:** Zustand
- **Icons:** Lucide React
- **Typography:** Geist & Geist Mono (`next/font/google`)
- **Deployment:** Vercel

---

## ✨ Features

- **Hero & Interactive Dashboard Mockup:** Modern dark-mode aesthetic with live visual annotations highlighting quick search, knowledge graph, and AI context synthesis.
- **Trust Strip & Integrations:** Highlights seamless integration across developer tools, version control, documentation, and AI assistants.
- **Feature Matrix:** 6 core features covering context graph, prompt memory, code snippet hub, unified search, team knowledge base, and IDE sync.
- **Workflow Walkthrough (How It Works):** 3-step intuitive breakdown of workspace creation, context drop-in, and instant search retrieval.
- **Product Preview:** Detailed annotated preview showing DevOS context graph and real-time LLM indexing.
- **Transparent Pricing:** Tiered pricing cards (Starter, Pro, Team) with prominent visual elevation for the Pro tier.
- **Interactive FAQ Accordion:** Accessible accordion powered by Zustand store state.
- **High-Conversion Final CTA:** Full-width gradient section with call-to-action triggers.
- **Accessibility & SEO:** 100% semantic HTML (`<nav>`, `<main>`, `<footer>`), keyboard navigation, custom ARIA attributes, full metadata, `sitemap.xml`, and `robots.txt`.

---

## 📁 Project Structure

```
devos/
├── app/
│   ├── layout.tsx         # Root layout with Geist font & SEO metadata
│   ├── page.tsx           # Home page aggregating all 8 sections
│   ├── globals.css        # Tailwind directives & core CSS design tokens
│   ├── robots.ts          # Automated robots.txt generation
│   └── sitemap.ts         # Dynamic sitemap generation
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx     # Glassmorphic header with mobile drawer
│   │   └── Footer.tsx     # Comprehensive footer with quick links
│   ├── mockups/
│   │   └── DashboardMockup.tsx # Accessible SVG/CSS developer dashboard UI
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── TrustStrip.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── ProductPreview.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   └── ui/
│       ├── Button.tsx     # Reusable typed button primitive
│       ├── Badge.tsx      # Tag/Pill UI primitive
│       ├── Card.tsx       # Standard card layout container
│       └── AccordionItem.tsx # Accessible collapsible accordion item
├── data/
│   ├── faq.ts            # FAQ structured data
│   ├── features.ts       # Features matrix data
│   └── pricing.ts        # Pricing plan tiers data
├── lib/
│   └── utils.ts          # clsx + tailwind-merge helper (cn)
├── store/
│   └── uiStore.ts        # Zustand UI state (mobile menu & FAQ accordion)
└── action.md             # Micro-step build tracking guide
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or pnpm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DeveloperSRGonline/devos-landing.git
   cd devos-landing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🎨 Responsive Breakpoints

DevOS is tailored for flawless display across all device sizes:
- **Mobile:** 375px+
- **Tablet:** 768px+
- **Desktop:** 1280px+

---

## 📄 License

MIT © 2026 DeveloperSRG
