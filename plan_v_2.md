# DevOS V2 — Making the Features Actually Work

**Version:** 2.0  
**Goal:** Everything promised on the landing page should be demonstrable in-browser. V1 is a beautiful static marketing site. V2 turns it into a live interactive product demo — a working proof of concept that a visitor can touch and feel, backed by the same Next.js + TypeScript + Tailwind stack, with zero backend (client-only state, localStorage persistence).

> **Core rule for V2:** The existing codebase is the foundation — we DO NOT rewrite. We extend. Every V1 section, component, UI primitive, data file, and design token stays intact. V2 adds new routes, new interactive demo components, and wires the CTA buttons to things that actually work.

---

## What V1 Built (Preserve All of This)

| Component | File | Status |
|---|---|---|
| Navbar + mobile menu | `components/layout/Navbar.tsx` | Keep as-is |
| Footer | `components/layout/Footer.tsx` | Keep as-is |
| Hero section | `components/sections/Hero.tsx` | Keep, wire CTAs |
| Trust strip | `components/sections/TrustStrip.tsx` | Keep as-is |
| Features grid | `components/sections/Features.tsx` | Keep, add "Try it" links |
| How It Works | `components/sections/HowItWorks.tsx` | Keep as-is |
| Product Preview | `components/sections/ProductPreview.tsx` | Keep, make mockup interactive |
| Pricing | `components/sections/Pricing.tsx` | Keep, add billing toggle |
| FAQ accordion | `components/sections/FAQ.tsx` | Keep as-is |
| Final CTA | `components/sections/FinalCTA.tsx` | Keep, wire CTA button |
| DashboardMockup | `components/mockups/DashboardMockup.tsx` | Keep, add interactive mode |
| Button, Badge, Card, AccordionItem | `components/ui/*` | Keep as-is |
| Design tokens, globals | `app/globals.css` | Keep as-is |
| Data files | `data/*.ts` | Keep, extend with demo data |
| Zustand store | `store/uiStore.ts` | Extend with billing period |

---

## What V2 Adds

### 1. App Router: `/app` Route — The Working Demo

A new Next.js route at `/app` that acts as the actual product UI. When a user clicks "Start Building Free" or "Start Pro Trial," they land here — not a dead sign-up form. They get a real interactive session.

### 2. Six Feature Demos — Each Landing Page Feature Made Real

| Feature (from landing page) | What "Working" Means in V2 |
|---|---|
| **Project Workspaces** | Create, name, switch between, and delete projects. Each project holds its own notes/snippets/chats. |
| **Context-Linked Notes** | Write and save markdown notes scoped to the active project. Notes persist in localStorage. |
| **AI Chat Memory** | Paste or type an "AI conversation summary." Tag it. Save it to the active project. Search it. |
| **Snippet Library** | Add code snippets with a title, language tag, and body. Copy to clipboard. |
| **Unified Search** | One search bar that queries across all notes, snippets, and AI summaries in real time. |
| **Learning Tracker** | Log a tutorial/resource (title + URL + linked project). Mark as in-progress or done. |

### 3. Interactive DashboardMockup Upgrade

The current `DashboardMockup` is static/decorative. In V2 the same component in `ProductPreview` becomes "live" — clicking sidebar items updates the content area to show different data types (Doc, Snippet, AI chat). Fully in-browser.

### 4. Pricing Section — Monthly/Yearly Toggle

The Pricing section gets a real billing period toggle (Monthly / Yearly with a "Save 20%" badge). Prices update when toggled. Zustand-powered, no page reload.

### 5. "Start Building Free" CTA Routes to `/app`

Every primary CTA on the landing page becomes a real `<Link href="/app">` instead of a dead button. Secondary CTA "See How It Works" already scrolls — keep that.

---

## V2 New Folder Structure (additions only, everything else stays)

```
devos/
├── app/
│   ├── layout.tsx              <- existing, unchanged
│   ├── page.tsx                <- existing landing page, unchanged
│   ├── globals.css             <- existing, unchanged
│   └── app/                   <- NEW: product demo route
│       ├── layout.tsx          <- NEW: app shell layout (sidebar + topbar)
│       └── page.tsx            <- NEW: main workspace view
├── components/
│   ├── layout/                 <- existing, unchanged
│   ├── sections/               <- existing, minor edits to wire CTAs
│   ├── ui/                     <- existing, unchanged
│   ├── mockups/
│   │   └── DashboardMockup.tsx <- existing + interactive mode prop added
│   └── app/                   <- NEW: all product demo components
│       ├── AppSidebar.tsx      <- project list + nav
│       ├── AppTopbar.tsx       <- search bar + user area
│       ├── WorkspaceView.tsx   <- main content panel (tabbed)
│       ├── NoteEditor.tsx      <- markdown note creator/viewer
│       ├── SnippetCard.tsx     <- code snippet display + copy
│       ├── SnippetForm.tsx     <- add/edit snippet
│       ├── AIMemoryCard.tsx    <- saved AI chat summary card
│       ├── AIMemoryForm.tsx    <- save new AI memory
│       ├── LearningItem.tsx    <- learning tracker row
│       ├── LearningForm.tsx    <- add learning resource
│       ├── SearchOverlay.tsx   <- unified search modal (Cmd+K)
│       └── NewProjectModal.tsx <- create project dialog
├── data/
│   ├── features.ts             <- existing, unchanged
│   ├── pricing.ts              <- existing, extended with yearly prices
│   ├── faq.ts                  <- existing, unchanged
│   └── demo.ts                 <- NEW: seed data for the /app demo session
├── store/
│   ├── uiStore.ts              <- existing + billingPeriod toggle added
│   └── workspaceStore.ts       <- NEW: all product demo state
├── lib/
│   └── utils.ts                <- existing, unchanged
└── types/
    └── workspace.ts            <- NEW: shared TypeScript types
```

---

## Detailed Feature Breakdown

### Feature 1 — Project Workspaces

**Where:** `/app` sidebar (`AppSidebar.tsx`)

**What it does:**
- Displays a list of projects in the sidebar
- "New Project" button opens `NewProjectModal.tsx` — a dialog with a name input and color/icon picker
- Clicking a project sets it as the active workspace — the main content area updates
- Projects can be renamed (inline edit on double-click) or deleted (x button on hover)
- Project list persists to `localStorage` via Zustand `workspaceStore`

**State shape:**
```ts
interface Project {
  id: string;
  name: string;
  color: string;       // one of 6 accent colors
  icon: string;        // lucide icon name
  createdAt: string;
}
```

**UX detail:** 3 seed projects pre-loaded from `data/demo.ts` so the UI never looks empty on first load.

---

### Feature 2 — Context-Linked Notes

**Where:** `WorkspaceView.tsx` -> "Notes" tab -> `NoteEditor.tsx`

**What it does:**
- Notes tab shows a list of notes for the active project
- "New Note" button opens an in-panel editor (title + textarea, no external modal)
- Saving a note appends it to the project's note list in store
- Notes display creation date and a word count badge
- Notes persist to `localStorage`
- Each note is "linked" to its project — visible in the note's metadata line ("in devos-core")

**State shape:**
```ts
interface Note {
  id: string;
  projectId: string;
  title: string;
  body: string;
  createdAt: string;
  wordCount: number;
}
```

**UX detail:** Character count updates live as user types. Auto-save on 2s idle (debounced).

---

### Feature 3 — AI Chat Memory

**Where:** `WorkspaceView.tsx` -> "AI Memory" tab -> `AIMemoryCard.tsx` / `AIMemoryForm.tsx`

**What it does:**
- "AI Memory" tab shows saved AI conversation summaries for the active project
- "Save AI Memory" button opens `AIMemoryForm` — fields: title, summary text (textarea), tags (comma-separated), source (dropdown: ChatGPT / Claude / Gemini / Other)
- Saved memories render as cards showing the source badge, tags, truncated summary, and a "View Full" expand
- Tags are clickable — clicking a tag filters the visible memories by that tag
- Memories persist in `localStorage` via store

**State shape:**
```ts
interface AIMemory {
  id: string;
  projectId: string;
  title: string;
  summary: string;
  tags: string[];
  source: "ChatGPT" | "Claude" | "Gemini" | "Other";
  createdAt: string;
}
```

**UX detail:** Source badge is color-coded (ChatGPT=green, Claude=orange, Gemini=blue, Other=gray).

---

### Feature 4 — Snippet Library

**Where:** `WorkspaceView.tsx` -> "Snippets" tab -> `SnippetCard.tsx` / `SnippetForm.tsx`

**What it does:**
- "Snippets" tab lists code snippets saved to the active project
- "New Snippet" opens `SnippetForm` — fields: title, language (dropdown: JS/TS/Python/Go/Bash/Other), code body (textarea with monospace styling)
- Each snippet card shows title, language badge, code block (pre/code), and a "Copy" button
- Copy button uses `navigator.clipboard.writeText()` and shows a "Copied!" confirmation for 2s
- Snippets can be deleted (hover -> trash icon)
- Snippets persist in `localStorage`

**State shape:**
```ts
interface Snippet {
  id: string;
  projectId: string;
  title: string;
  language: string;
  code: string;
  createdAt: string;
}
```

**UX detail:** Language badge color matches standard code conventions (TypeScript=blue, Python=yellow, Go=cyan, Bash=gray).

---

### Feature 5 — Unified Search

**Where:** `SearchOverlay.tsx` — triggered by Cmd+K / Ctrl+K or the search bar in `AppTopbar.tsx`

**What it does:**
- Full-screen modal overlay with a prominent search input
- Queries in real time (instant `String.includes` filter) against all items across all projects: Notes, Snippets, AI Memories, Learning items
- Results grouped by type (Notes, Snippets, AI Memory, Learning) with a count badge per group
- Each result shows: type icon, item title, project name, and a snippet of matching text
- Clicking a result closes the overlay, switches to the correct project, and opens the correct tab
- Empty state with "No results for '...'" message
- Keyboard navigable (arrow keys to move, Enter to select, Esc to close)

**UX detail:** The search input shows a placeholder that rotates through real examples from seed data ("Try 'JWT middleware'", "Try 'React hooks'") — matches the landing page copy.

---

### Feature 6 — Learning Tracker

**Where:** `WorkspaceView.tsx` -> "Learning" tab -> `LearningItem.tsx` / `LearningForm.tsx`

**What it does:**
- "Learning" tab shows a list of learning resources attached to the active project
- "Add Resource" opens `LearningForm` — fields: title, URL (optional), type (Tutorial / Course / Docs / Video / Book), notes (short textarea), status (To Start / In Progress / Done)
- Each item shows: type icon, title, URL link, notes, status badge, and progress toggle
- Status cycles on click: To Start -> In Progress -> Done — with color shift (gray -> amber -> green)
- Items persist in `localStorage`

**State shape:**
```ts
interface LearningItem {
  id: string;
  projectId: string;
  title: string;
  url?: string;
  type: "Tutorial" | "Course" | "Docs" | "Video" | "Book";
  notes: string;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
}
```

**UX detail:** A small progress bar at the top of the Learning tab shows "X of Y resources completed" for the active project.

---

## Landing Page Wiring Changes (Minimal Edits to V1 Code)

### `components/sections/Hero.tsx`
- Change the "Start Building Free" Button to a `<Link href="/app">` (use Next.js `<Link>` wrapped with Button styling)
- Keep the secondary CTA scroll behavior unchanged

### `components/sections/Features.tsx`
- Add a small "Try it ->" text link below each feature card description that links to `/app` with a hash indicating which tab to open (e.g., `/app#snippets`)
- No structural changes to the card layout

### `components/sections/Pricing.tsx`
- Add the billing toggle (Monthly / Yearly) above the grid — powered by `useUIStore().billingPeriod`
- Yearly prices = monthly price × 10 (2 months free)
- The toggle state comes from Zustand; no prop drilling
- Primary CTA buttons -> `<Link href="/app">`

### `components/mockups/DashboardMockup.tsx`
- Add an optional `interactive?: boolean` prop
- When `interactive={true}` (used in ProductPreview), the sidebar project items are clickable and update the content area to cycle through: Doc view -> Snippet view -> AI Memory view
- When `interactive={false}` (default, used in Hero), behavior unchanged

### `components/sections/FinalCTA.tsx`
- Change CTA button to `<Link href="/app">`

---

## State Management Plan

### Extend `store/uiStore.ts` (add only, don't remove existing state)

```ts
// Add to existing store:
billingPeriod: "monthly" | "yearly";
toggleBillingPeriod: () => void;
```

### New `store/workspaceStore.ts`

```ts
interface WorkspaceStore {
  // Projects
  projects: Project[];
  activeProjectId: string | null;
  setActiveProject: (id: string) => void;
  addProject: (project: Omit<Project, "id" | "createdAt">) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Active tab in workspace view
  activeTab: "notes" | "snippets" | "ai-memory" | "learning";
  setActiveTab: (tab: WorkspaceStore["activeTab"]) => void;

  // Notes
  notes: Note[];
  addNote: (note: Omit<Note, "id" | "createdAt" | "wordCount">) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;

  // Snippets
  snippets: Snippet[];
  addSnippet: (snippet: Omit<Snippet, "id" | "createdAt">) => void;
  deleteSnippet: (id: string) => void;

  // AI Memories
  aiMemories: AIMemory[];
  addAIMemory: (memory: Omit<AIMemory, "id" | "createdAt">) => void;
  deleteAIMemory: (id: string) => void;

  // Learning Items
  learningItems: LearningItem[];
  addLearningItem: (item: Omit<LearningItem, "id" | "createdAt">) => void;
  updateLearningStatus: (id: string, status: LearningItem["status"]) => void;
  deleteLearningItem: (id: string) => void;

  // Search
  searchQuery: string;
  isSearchOpen: boolean;
  setSearchQuery: (q: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
}
```

**Persistence:** Use Zustand `persist` middleware with `localStorage` as the storage adapter. Only `workspaceStore` persists — `uiStore` stays ephemeral (no reason to persist mobile menu state).

---

## New `data/demo.ts` — Seed Data

Pre-loaded data so the `/app` experience never starts empty. This is what makes the demo feel real to a first-time visitor:

```ts
// Seed projects
export const seedProjects = [
  { id: "p1", name: "devos-core", color: "#5B7FFF", icon: "FolderGit2" },
  { id: "p2", name: "api-gateway", color: "#3DD68C", icon: "Server" },
  { id: "p3", name: "auth-service", color: "#7C6BFF", icon: "Shield" },
];

// Seed notes (belong to p1)
export const seedNotes = [
  {
    id: "n1",
    projectId: "p1",
    title: "Architecture Decision: Auth Flow",
    body: "We chose OAuth2 + JWT over session-based auth because...",
  },
  // + 2 more
];

// Seed snippets (belong to p1 and p2)
export const seedSnippets = [
  {
    id: "s1",
    projectId: "p1",
    title: "verifyToken middleware",
    language: "TypeScript",
    code: `export async function verifyToken(req: Request) {\n  const token = req.headers.get("Authorization")?.split(" ")[1];\n  if (!token) throw new Error("No token provided");\n  return jwt.verify(token, process.env.JWT_SECRET!);\n}`,
  },
  // + 2 more
];

// Seed AI memories (belong to p1)
export const seedAIMemories = [
  {
    id: "a1",
    projectId: "p1",
    title: "JWT refresh strategy from Claude",
    summary: "Use short-lived access tokens (15 min) + long-lived refresh tokens (7 days)...",
    tags: ["auth", "jwt", "security"],
    source: "Claude",
  },
];

// Seed learning items (belong to p2)
export const seedLearningItems = [
  {
    id: "l1",
    projectId: "p2",
    title: "Next.js App Router Deep Dive",
    url: "https://nextjs.org/docs/app",
    type: "Docs",
    notes: "Focus on RSC vs client components boundary",
    status: "in-progress",
  },
];
```

---

## `/app` Route — Layout & UX

### `app/app/layout.tsx`
- Full-height flex layout: sidebar (fixed width, collapsible) + main content area
- No landing page Navbar/Footer — this is the product UI
- TopBar spanning the full width above both sidebar and content
- A "<- Back to site" link in the top-left for easy return to the landing page
- Responsive: sidebar collapses to a slide-in drawer on mobile

### `app/app/page.tsx`
- Renders `<AppSidebar />` + `<WorkspaceView />`
- On first load: hydrates from `localStorage` (or seeds from `data/demo.ts` if no stored data)
- Global keyboard listener registered here for Cmd+K / Ctrl+K -> opens `<SearchOverlay />`

### `AppSidebar.tsx` Layout

```
+---------------------+
| DevOS   [<- Home]   |
+---------------------+
| Projects            |
|  * devos-core       |  <- active (accent border)
|  o api-gateway      |
|  o auth-service     |
|  + New Project      |
+---------------------+
| All Items           |
|  Search (Cmd+K)     |
+---------------------+
```

### `WorkspaceView.tsx` Layout

```
+-----------------------------------------------+
| devos-core   [Notes] [Snippets] [AI Memory] [Learning] |
+-----------------------------------------------+
|                                               |
|   [Active Tab Content]                        |
|                                               |
+-----------------------------------------------+
```

---

## `/app` Route — Visual Design

Inherits the full V1 design system:
- Same CSS custom properties (`--bg-base`, `--accent`, etc.)
- Same `globals.css` 
- Same font (Geist / Geist Mono)
- Same Card/Button/Badge primitives

The `/app` route should feel like the DashboardMockup component came to life — not a different product.

**New UI elements needed (all using existing design tokens):**
- Tab bar: pill-style tabs using `--accent` for active state
- Form inputs: dark background (`--bg-surface-2`), `--border` outline, `--accent` focus ring
- Status badges: reuse existing Badge component with variant colors
- Code blocks: `--bg-base` background, Geist Mono font, no syntax highlighting library needed

---

## Pricing Toggle Implementation

### Add to `store/uiStore.ts`

```ts
billingPeriod: "monthly" | "yearly";
toggleBillingPeriod: () => void;
```

### Extend `data/pricing.ts`

```ts
interface PricingPlan {
  // existing fields stay...
  priceMonthly: string;   // "$0", "$9", "$24"
  priceYearly: string;    // "$0", "$7", "$19" (per-month equivalent)
  yearlyNote?: string;    // "Billed $84/yr"
}
```

### Update `components/sections/Pricing.tsx`

- Above the grid: add a div with Monthly | Yearly toggle buttons
- The toggle reads `useUIStore().billingPeriod`
- Displayed price switches between `priceMonthly` and `priceYearly`
- Yearly toggle shows a small "Save 20%" badge next to the "Yearly" label

---

## Interactive DashboardMockup

### Add `interactive` prop to `DashboardMockup.tsx`

```tsx
interface DashboardMockupProps {
  interactive?: boolean;
}
```

When `interactive={true}`:
- Sidebar project rows become clickable (cursor-pointer, active accent highlight)
- Content area cycles through 3 states: Doc card -> Snippet card -> AI Memory card
- Clicking a sidebar item updates the content area with a smooth opacity transition
- Adds a small "Live Demo" badge in the top-right of the mockup chrome

When `interactive={false}` (default):
- Exactly the same as the current V1 behavior (no changes to Hero section)

**Update `ProductPreview.tsx`:**

```tsx
<DashboardMockup interactive={true} />
```

---

## Implementation Phases

### Phase A — Types & Store Extensions (1-2 hrs)
1. Create `types/workspace.ts` — all shared interfaces (Project, Note, Snippet, AIMemory, LearningItem)
2. Extend `store/uiStore.ts` with `billingPeriod` state and `toggleBillingPeriod` action
3. Create `store/workspaceStore.ts` with Zustand persist middleware
4. Create `data/demo.ts` with all seed data
5. **Commit:** `feat: add workspace store, types, and demo seed data`

### Phase B — Landing Page Wiring (30 min)
1. Update `Hero.tsx` — CTA button -> `<Link href="/app">`
2. Update `Features.tsx` — add "Try it ->" links per feature
3. Update `FinalCTA.tsx` — CTA button -> `<Link href="/app">`
4. Update `Pricing.tsx` — add billing toggle + yearly prices in data
5. **Commit:** `feat: wire landing page CTAs to app route and add pricing toggle`

### Phase C — Interactive DashboardMockup (1 hr)
1. Add `interactive` prop to `DashboardMockup.tsx`
2. Implement click-to-cycle sidebar and content area when interactive
3. Update `ProductPreview.tsx` to pass `interactive={true}`
4. **Commit:** `feat: make DashboardMockup interactive in ProductPreview`

### Phase D — `/app` Shell (2 hrs)
1. Create `app/app/layout.tsx` — shell with sidebar slot + content slot
2. Create `components/app/AppSidebar.tsx` — project list, new project button
3. Create `components/app/AppTopbar.tsx` — search bar, back link
4. Create `components/app/NewProjectModal.tsx` — create project dialog
5. Create `app/app/page.tsx` — compose shell, hydrate seed data on first load
6. **Commit:** `feat: build /app route shell with sidebar, topbar, and project switching`

### Phase E — Workspace View + Notes Tab (2 hrs)
1. Create `components/app/WorkspaceView.tsx` — tabs + tab content router
2. Create `components/app/NoteEditor.tsx` — list view + inline create/edit with auto-save
3. Wire notes tab to `workspaceStore` (filtered by `activeProjectId`)
4. **Commit:** `feat: implement workspace view with context-linked notes tab`

### Phase F — Snippets Tab (1.5 hrs)
1. Create `components/app/SnippetCard.tsx` — display + copy button with clipboard API
2. Create `components/app/SnippetForm.tsx` — add new snippet with language selector
3. Wire snippets tab to store
4. **Commit:** `feat: implement snippet library tab with copy-to-clipboard`

### Phase G — AI Memory Tab (1.5 hrs)
1. Create `components/app/AIMemoryCard.tsx` — card display + expand/collapse
2. Create `components/app/AIMemoryForm.tsx` — save new memory with source and tags
3. Wire AI memory tab to store, implement tag filter UI
4. **Commit:** `feat: implement AI chat memory tab with tag filtering`

### Phase H — Learning Tracker Tab (1.5 hrs)
1. Create `components/app/LearningItem.tsx` — item row + clickable status toggle
2. Create `components/app/LearningForm.tsx` — add resource form with type selector
3. Wire learning tab to store, add progress bar at top of tab
4. **Commit:** `feat: implement learning tracker tab with status cycling`

### Phase I — Unified Search (2 hrs)
1. Create `components/app/SearchOverlay.tsx` — full-screen modal with grouped results
2. Implement real-time cross-collection search (filter all store arrays on query string)
3. Implement keyboard navigation (arrow keys, Enter to select, Esc to close)
4. Wire Cmd+K / Ctrl+K global keyboard listener in `app/app/page.tsx`
5. **Commit:** `feat: implement unified search overlay with keyboard navigation`

### Phase J — Polish & QA Pass (1 hr)
1. Empty states for all tabs (icon + friendly message for zero items)
2. Mobile responsive pass on `/app` route — sidebar collapses to drawer
3. Verify all existing V1 landing page sections still render correctly
4. Run `npm run build` and confirm zero errors
5. **Commit:** `fix: polish empty states, mobile layout, and verify V1 landing page integrity`

### Phase K — Documentation (30 min)
1. Update `README.md` to add V2 section describing the `/app` interactive demo
2. Final checklist pass
3. **Commit:** `docs: update README for V2 interactive product demo`

**Total realistic estimate: 14-18 hours** (each phase is an independent, completable unit — can be done across sessions).

---

## V2 Commit Sequence

```
feat: add workspace store, types, and demo seed data
feat: wire landing page CTAs to app route and add pricing toggle
feat: make DashboardMockup interactive in ProductPreview
feat: build /app route shell with sidebar, topbar, and project switching
feat: implement workspace view with context-linked notes tab
feat: implement snippet library tab with copy-to-clipboard
feat: implement AI chat memory tab with tag filtering
feat: implement learning tracker tab with status cycling
feat: implement unified search overlay with keyboard navigation
fix: polish empty states, mobile layout, and verify V1 landing page integrity
docs: update README for V2 interactive product demo
```

---

## What NOT to Add in V2

These are intentionally out of scope — they require a real backend:

- User authentication / accounts (no real auth)
- Server-side data persistence (DB / API)
- Real AI API calls (no OpenAI/Claude integration)
- File upload / attachment support
- Collaboration / multi-user features
- Markdown rendering library (plain text is fine for V2)
- Syntax highlighting library (CSS-only styling is sufficient)
- Email capture / waitlist form

> **Note:** The demo is honest — it is clearly a local session (data lives in the browser). The "Start Building Free" CTA lands you in a working demo, not a broken sign-up. This is more impressive to a portfolio reviewer than a dead form.

---

## Success Criteria for V2

- [ ] Clicking "Start Building Free" on the landing page navigates to `/app`
- [ ] `/app` shows 3 pre-seeded projects in the sidebar
- [ ] Switching between projects updates the workspace content
- [ ] Can create a new project via the "New Project" button
- [ ] Can write and save a note in the Notes tab
- [ ] Can add a code snippet and copy it to clipboard
- [ ] Can save an AI memory with tags and filter by tag
- [ ] Can add a learning resource and toggle its status (To Start -> In Progress -> Done)
- [ ] Cmd+K opens the search overlay and returns results across all content types
- [ ] Pricing section has a working Monthly/Yearly toggle with price changes
- [ ] ProductPreview DashboardMockup sidebar is clickable and updates content area
- [ ] All V1 landing page sections still render and look correct
- [ ] `npm run build` passes with zero errors
- [ ] `/app` is responsive — sidebar collapses to a drawer on mobile
- [ ] localStorage data persists across page refreshes
