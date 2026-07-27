# DevOS — Developer Context & Knowledge Operating System

DevOS is a modern, high-performance landing page and developer context management platform built to unify code snippets, project notes, architecture specifications, and AI chat memory into one structured workspace.

![DevOS Landing Page](https://raw.githubusercontent.com/DeveloperSRGonline/devos-landing/main/public/file.svg)

---

## ⚡ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom Design Tokens
- **State Management:** Zustand (`persist` middleware for `/app` storage)
- **Icons:** Lucide React
- **Typography:** Geist & Geist Mono (`next/font/google`)
- **Deployment:** Vercel

---

## 🚀 DevOS V2 — Interactive Product Workspace

DevOS V2 introduces a fully interactive product workspace at `/app`, allowing developers to manage context without needing any backend or external setup:

- **Context-Linked Notes:** Scaffold project architecture, setup guides, and decisions with automatic word count computation and auto-save.
- **Snippet Library:** Store and organize code snippets with syntax tagging and instant one-click copy-to-clipboard functionality.
- **AI Chat Memory:** Track LLM suggestions across Claude, ChatGPT, and Gemini with tag filtering and full summary expansion.
- **Learning Tracker:** Log tutorials, documentation, and courses with interactive 3-state status cycling and progress tracking.
- **Unified Global Search (`Cmd+K` / `Ctrl+K`):** Real-time multi-collection search across all projects, notes, snippets, AI memories, and learning items with keyboard navigation.
- **Local Persistence & Seed Data:** Built with Zustand persistent `localStorage` storage adapter and rich initial seed data so the workspace is immediately interactive on first visit.

---

## ✨ Features

- **Hero & Interactive Dashboard Mockup:** Modern dark-mode aesthetic with live visual annotations highlighting quick search, knowledge graph, and AI context synthesis.
- **Trust Strip & Integrations:** Highlights seamless integration across developer tools, version control, documentation, and AI assistants.
- **Feature Matrix:** 6 core features covering context graph, prompt memory, code snippet hub, unified search, team knowledge base, and IDE sync.
- **Workflow Walkthrough (How It Works):** 3-step intuitive breakdown of workspace creation, context drop-in, and instant search retrieval.
- **Product Preview:** Detailed interactive preview showing DevOS context graph with clickable tab/card switches.
- **Transparent Pricing:** Tiered pricing cards (Starter, Pro, Team) with an interactive Monthly / Yearly billing toggle.
- **Interactive FAQ Accordion:** Accessible accordion powered by Zustand store state.
- **High-Conversion Final CTA:** Full-width gradient section with call-to-action triggers.
- **Accessibility & SEO:** 100% semantic HTML (`<nav>`, `<main>`, `<footer>`), keyboard navigation, custom ARIA attributes, full metadata, `sitemap.xml`, and `robots.txt`.

---

## 📁 Project Structure

```
devos/
├── app/
│   ├── app/               # V2 /app interactive workspace shell & route
│   │   ├── layout.tsx     # App workspace shell layout (Topbar + Sidebar)
│   │   └── page.tsx       # Main workspace view & seed hydration logic
│   ├── layout.tsx         # Root layout with Geist font & SEO metadata
│   ├── page.tsx           # Home page aggregating all landing page sections
│   ├── globals.css        # Tailwind directives & core CSS design tokens
│   ├── robots.ts          # Automated robots.txt generation
│   └── sitemap.ts         # Dynamic sitemap generation
├── components/
│   ├── app/               # V2 Workspace Components
│   │   ├── AIMemoryCard.tsx
│   │   ├── AIMemoryForm.tsx
│   │   ├── AppSidebar.tsx
│   │   ├── AppTopbar.tsx
│   │   ├── LearningForm.tsx
│   │   ├── LearningItem.tsx
│   │   ├── NewProjectModal.tsx
│   │   ├── NoteEditor.tsx
│   │   ├── SearchOverlay.tsx
│   │   ├── SnippetCard.tsx
│   │   ├── SnippetForm.tsx
│   │   └── WorkspaceView.tsx
│   ├── layout/
│   │   ├── Navbar.tsx     # Glassmorphic header with mobile drawer
│   │   └── Footer.tsx     # Comprehensive footer with quick links
│   ├── mockups/
│   │   └── DashboardMockup.tsx # Accessible interactive developer dashboard UI
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
│   ├── demo.ts           # Pre-seeded V2 projects, notes, snippets & AI memories
│   ├── faq.ts            # FAQ structured data
│   ├── features.ts       # Features matrix data
│   └── pricing.ts        # Pricing plan tiers data
├── lib/
│   └── utils.ts          # clsx + tailwind-merge helper (cn)
├── store/
│   ├── uiStore.ts        # Zustand ephemeral UI state
│   └── workspaceStore.ts # Persistent workspace state store
├── types/
│   └── workspace.ts      # TypeScript interfaces for V2 models
└── action_v_2.md         # V2 Step-by-Step build guide & checklist
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

4. Open [http://localhost:3000](http://localhost:3000) in your browser (or visit [http://localhost:3000/app](http://localhost:3000/app) directly).

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

