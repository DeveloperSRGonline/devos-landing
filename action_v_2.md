# DevOS V2 — Step-by-Step Build Guide (Phase-by-Phase)

Follow top to bottom, in order. Each phase is an independent, completable unit with its own git commit. Complete and verify each phase before starting the next. The V1 landing page must remain intact and working throughout.

**Rules locked in for V2:**
- Do NOT rewrite V1 code — extend only.
- All new state lives in `workspaceStore.ts` (persisted) or the extended `uiStore.ts` (ephemeral).
- Zero backend — all data lives in `localStorage` via Zustand `persist`.
- Seed data prevents an empty first-load experience.
- Read `node_modules/next/dist/docs/` before touching any Next.js API you haven't used before.

---

## PHASE A — Types, Store Extensions & Seed Data

> **Goal:** Lay the data foundation. Nothing renders yet — this phase is purely TypeScript types, store logic, and seed content. All subsequent phases depend on this.

### A.1 Create `types/workspace.ts` (Done)
- Create the file at the project root under `types/workspace.ts`.
- Define and export all shared interfaces used across the app:
  - `Project` — `id`, `name`, `color`, `icon`, `createdAt`
  - `Note` — `id`, `projectId`, `title`, `body`, `createdAt`, `wordCount`
  - `Snippet` — `id`, `projectId`, `title`, `language`, `code`, `createdAt`
  - `AIMemory` — `id`, `projectId`, `title`, `summary`, `tags`, `source` (`"ChatGPT" | "Claude" | "Gemini" | "Other"`), `createdAt`
  - `LearningItem` — `id`, `projectId`, `title`, `url?`, `type` (`"Tutorial" | "Course" | "Docs" | "Video" | "Book"`), `notes`, `status` (`"todo" | "in-progress" | "done"`), `createdAt`
- No logic here — types only.

### A.2 Extend `store/uiStore.ts` (Done)
- Open the existing store. **Do not remove any existing state.**
- Add two new fields:
  - `billingPeriod: "monthly" | "yearly"`
  - `toggleBillingPeriod: () => void`
- The toggle should flip `"monthly"` ↔ `"yearly"`.
- Keep the store ephemeral (no `persist` middleware on `uiStore`).

### A.3 Create `store/workspaceStore.ts` (Done)
- Use Zustand with the `persist` middleware and `localStorage` as the storage adapter.
- Implement the full `WorkspaceStore` interface:
  - **Projects:** `projects`, `activeProjectId`, `setActiveProject`, `addProject`, `updateProject`, `deleteProject`
  - **Tab:** `activeTab` (`"notes" | "snippets" | "ai-memory" | "learning"`), `setActiveTab`
  - **Notes:** `notes`, `addNote`, `updateNote`, `deleteNote`
  - **Snippets:** `snippets`, `addSnippet`, `deleteSnippet`
  - **AI Memories:** `aiMemories`, `addAIMemory`, `deleteAIMemory`
  - **Learning Items:** `learningItems`, `addLearningItem`, `updateLearningStatus`, `deleteLearningItem`
  - **Search:** `searchQuery`, `isSearchOpen`, `setSearchQuery`, `openSearch`, `closeSearch`
- Use `crypto.randomUUID()` (or `Date.now().toString()`) for ID generation in `add*` actions.
- Compute `wordCount` automatically in `addNote` from `body.trim().split(/\s+/).length`.

### A.4 Create `data/demo.ts` (Done)
- Export the following seed arrays (all typed using `types/workspace.ts`):
  - `seedProjects` — 3 entries: `devos-core` (blue, `FolderGit2`), `api-gateway` (green, `Server`), `auth-service` (purple, `Shield`)
  - `seedNotes` — 3 notes belonging to `p1` (`devos-core`), with realistic developer content (architecture decisions, setup notes)
  - `seedSnippets` — 3 snippets across `p1` and `p2`, with real code bodies (e.g. `verifyToken` middleware in TypeScript, a fetch wrapper in JS)
  - `seedAIMemories` — 2 memories in `p1`: one from Claude about JWT strategy, one from ChatGPT about API rate limiting
  - `seedLearningItems` — 2 items in `p2`: Next.js App Router docs (`in-progress`), Zustand docs (`todo`)
- All IDs must be short stable strings (`"p1"`, `"n1"`, `"s1"`, etc.) so seed data can be reliably detected on first load.

### A.5 Extend `data/pricing.ts` (Done)
- Open the existing pricing data file.
- Add `priceMonthly` and `priceYearly` string fields to each plan (keep any existing `price` field for backwards compatibility if it is used elsewhere).
  - Starter: `"$0"` / `"$0"`
  - Pro: `"$9"` / `"$7"` (per-month equivalent)
  - Team: `"$24"` / `"$19"` (per-month equivalent)
- Add an optional `yearlyNote` string field: e.g. `"Billed $84/yr"` for Pro.

### A.6 Verify no TypeScript errors (Done)
```bash
npx tsc --noEmit
```
Fix any type errors before proceeding.

### A.7 Commit (Done)
```bash
git add .
git commit -m "feat: add workspace store, types, and demo seed data"
```

**✅ Checkpoint:** `npx tsc --noEmit` passes. The three store files and `types/workspace.ts` all compile cleanly with no errors.

---

## PHASE B — Landing Page Wiring (Minimal Edits) (Done)

> **Goal:** Wire up the existing V1 landing page buttons to real destinations and add the pricing toggle. No new routes yet — just plumbing.

### B.1 Update `components/sections/Hero.tsx` (Done)
- Change the primary CTA `<Button>` ("Start Building Free") to a Next.js `<Link href="/app">` wrapping a `<Button>` styled element (or use `asChild`-style pattern).
- Do not change the secondary CTA ("See How It Works") — it already scrolls correctly.
- Do not change any other markup, spacing, or visual in this component.

### B.2 Update `components/sections/Features.tsx` (Done)
- Below each feature card's description text, add a small `<Link href="/app#<tab>">Try it →</Link>` text link.
- Map each feature card to its relevant tab hash:
  - Project Workspaces → `/app`
  - Context-Linked Notes → `/app#notes`
  - AI Chat Memory → `/app#ai-memory`
  - Snippet Library → `/app#snippets`
  - Unified Search → `/app` (search opens via Cmd+K)
  - Learning Tracker → `/app#learning`
- Style the link small and muted (use an existing text utility class, not new CSS).
- Do not change card layout, grid, icons, or any other markup.

### B.3 Update `components/sections/Pricing.tsx` (Done)
- Import `useUIStore` from the existing store.
- Above the pricing grid, add a pill-style toggle: two buttons — "Monthly" and "Yearly".
  - The active period button has the accent background; the inactive one is outlined.
  - "Yearly" button shows a small inline "Save 20%" badge (reuse `<Badge>`).
- The toggle calls `useUIStore().toggleBillingPeriod` on click.
- Each plan card's displayed price reads from `priceMonthly` or `priceYearly` based on `billingPeriod`.
- When `billingPeriod === "yearly"`, show the plan's `yearlyNote` below the price.
- Change primary CTA buttons in each plan card to `<Link href="/app">`.
- Do not change the card layout, grid, feature lists, or badge positioning.

### B.4 Update `components/sections/FinalCTA.tsx` (Done)
- Change the CTA button to a Next.js `<Link href="/app">` (same pattern as Hero).
- No other changes to this component.

### B.5 Visual check (Done)
- `npm run dev` → scroll through the entire landing page.
- Confirm: pricing toggle changes prices, all CTA buttons navigate to `/app` (expect a 404 for now — that's fine), "Try it →" links are visible but small.
- Confirm: no existing section layout has broken.

### B.6 Commit (Done)
```bash
git add .
git commit -m "feat: wire landing page CTAs to /app route and add pricing toggle"
```

**✅ Checkpoint:** Pricing toggle switches prices with no page reload. All primary CTAs point to `/app`. V1 visual layout is completely unchanged.

---

## PHASE C — Interactive DashboardMockup (Done)

> **Goal:** Make the mockup in the ProductPreview section clickable. The Hero version stays static.

### C.1 Add `interactive` prop to `DashboardMockup.tsx` (Done)
- Add an optional `interactive?: boolean` prop (defaults to `false`).
- When `interactive={false}` (the default): component renders exactly as it does today — no changes to the Hero experience.
- When `interactive={true}`:
  - The sidebar project rows become clickable (`cursor-pointer`).
  - Track the active sidebar item in local component state (`useState`), cycling through the 3 seed projects.
  - Clicking a sidebar item updates the content area to display one of three views:
    1. A doc/note card (title, body excerpt, word count badge)
    2. A code snippet card (language badge, `<pre><code>` block, "Copy" button)
    3. An AI memory card (source badge, tags, truncated summary)
  - The transition between views uses `opacity` fade (`transition-opacity duration-200`).
  - Add a small "Live Demo" badge in the top-right corner of the mockup chrome.
  - Content data for the 3 views should use the seed data text (import strings from `data/demo.ts`) so the demo feels real.

### C.2 Update `components/sections/ProductPreview.tsx` (Done)
- Change the existing `<DashboardMockup />` call to `<DashboardMockup interactive={true} />`.
- No other changes to `ProductPreview.tsx`.

### C.3 Visual check (Done)
- Navigate to the landing page's "See DevOS in action" section.
- Click each sidebar item — confirm the content area changes with a smooth fade.
- Scroll to the Hero — confirm the DashboardMockup there is still static (unchanged).

### C.4 Commit (Done)
```bash
git add .
git commit -m "feat: make DashboardMockup interactive in ProductPreview"
```

**✅ Checkpoint:** ProductPreview mockup is clickable and updates content. Hero mockup is still static. No console errors.

---

## PHASE D — `/app` Route Shell

> **Goal:** Build the full product UI shell: layout, sidebar, topbar, and project switching. No tab content yet — just the frame.

### D.1 Read the Next.js docs on nested layouts
- Run: `Get-ChildItem "node_modules/next/dist/docs/" -Recurse -Filter "*.md"` (or use `ls`) to see what docs are available.
- Read the relevant guide on `app/` directory nested layouts before creating any files.

### D.2 Create `app/app/layout.tsx`
- This layout wraps only the `/app` route — it must NOT include the landing page `<Navbar>` or `<Footer>`.
- Layout structure: full-height (`h-screen overflow-hidden`) flex column:
  - **TopBar** row at the top (full width)
  - **Body** row below, flex row: `<AppSidebar />` (fixed width) + `<main>` (flex-grow, overflow-y-auto)
- No `<html>` or `<body>` tags here — the root `app/layout.tsx` already provides those.
- Import and render `<AppTopbar />` and `<AppSidebar />` (create stub files first if needed).

### D.3 Create `components/app/AppSidebar.tsx`
- Fixed-width left panel (e.g., `w-64`) with a dark surface background.
- Structure (top to bottom):
  1. **Brand row:** "DevOS" wordmark + a `<Link href="/">← Home</Link>` small link.
  2. **Projects section:** heading "Projects", then a list of projects from `useWorkspaceStore().projects`. Each item shows its color dot, icon, and name. The active project (`activeProjectId`) gets an accent left border. Clicking any project calls `setActiveProject(id)`.
  3. **New Project button:** `+ New Project` at the bottom of the list, opens `<NewProjectModal />`.
  4. **Footer row:** "Search (Cmd+K)" button that calls `openSearch()`.
- On hover of each project item, show a small `×` delete button (calls `deleteProject(id)` on click, with a confirmation check: do not delete if it's the last project).

### D.4 Create `components/app/AppTopbar.tsx`
- Full-width top bar with a subtle bottom border.
- Left: current active project name + icon (read from `workspaceStore`).
- Right: a search button ("⌘ K Search...") styled as a pill input — clicking it calls `openSearch()`.
- This component does not contain the search logic itself — it just triggers the overlay.

### D.5 Create `components/app/NewProjectModal.tsx`
- A centered modal dialog (backdrop overlay + card) with:
  - Text input for project name (required).
  - Color picker: 6 preset accent color swatches — clicking selects one (the selected swatch has a ring).
  - Icon picker: 6 Lucide icon options (e.g., `FolderGit2`, `Server`, `Shield`, `Zap`, `BookOpen`, `Code2`) — clicking selects one.
  - "Create Project" button → calls `addProject({ name, color, icon })`, then closes the modal.
  - "Cancel" button (or click outside) → closes without saving.
- Modal state (open/close) managed with local `useState` in `AppSidebar.tsx`, passed as a prop.

### D.6 Create `app/app/page.tsx`
- Mark as `"use client"` (this is a fully interactive page).
- On mount (`useEffect`), check if `workspaceStore.projects` is empty. If empty, hydrate with `seedProjects`, `seedNotes`, `seedSnippets`, `seedAIMemories`, `seedLearningItems` from `data/demo.ts`, then set `activeProjectId` to `"p1"`.
- Register a global keyboard listener for `Cmd+K` / `Ctrl+K` → calls `openSearch()`.
- Render `<WorkspaceView />` in the main content area (stub it for now).
- Render `<SearchOverlay />` conditionally when `isSearchOpen === true` (stub it for now).

### D.7 Handle URL hash tab routing
- In `app/app/page.tsx`, read `window.location.hash` on mount.
- Map hashes to tabs: `#notes`, `#snippets`, `#ai-memory`, `#learning`.
- If a valid hash is present, call `setActiveTab(tab)` after hydrating seed data.

### D.8 Visual check
- `npm run dev` → navigate to `http://localhost:3000/app`.
- Confirm: shell renders (topbar + sidebar + content area), no 404.
- Confirm: sidebar shows 3 seed projects, clicking each highlights the active one.
- Confirm: "New Project" modal opens and creates a new project.
- Confirm: landing page at `/` still works completely.

### D.9 Commit
```bash
git add .
git commit -m "feat: build /app route shell with sidebar, topbar, and project switching"
```

**✅ Checkpoint:** `/app` route loads, project switching works, seed data hydrates on first visit, `localStorage` persists after a page refresh.

---

## PHASE E — Workspace View + Notes Tab

> **Goal:** Build the tabbed workspace panel and implement the first (and most important) tab: Notes.

### E.1 Create `components/app/WorkspaceView.tsx`
- The main content panel rendered inside the `/app` page.
- Header row: active project name (large) + 4 tab buttons: Notes · Snippets · AI Memory · Learning.
- Tab buttons read `activeTab` from `workspaceStore` and call `setActiveTab` on click.
- The active tab button has the accent underline/fill treatment; others are muted.
- Below the header, render the correct tab content based on `activeTab`:
  - `"notes"` → `<NotesPanel />`  (created below)
  - `"snippets"` → stub `<div>Snippets coming soon</div>` for now
  - `"ai-memory"` → stub `<div>AI Memory coming soon</div>` for now
  - `"learning"` → stub `<div>Learning coming soon</div>` for now

### E.2 Create `components/app/NoteEditor.tsx`
- This component handles both the list view and the create/edit view for notes.
- **List state:** shows all notes for `activeProjectId` (filtered from `workspaceStore.notes`). Each note item shows: title, word count badge, creation date, and a trash icon on hover.
- **Empty state:** when no notes exist for the active project, show a centered icon + "No notes yet" message + "New Note" button.
- **"New Note" button:** switches the component to the editor state.
- **Editor state:** shows a title input and a `<textarea>` for the body. Below the textarea: live character count and word count. Two buttons: "Save Note" and "Cancel".
  - "Save Note" calls `addNote({ projectId: activeProjectId, title, body })`, then returns to list state.
  - "Cancel" returns to list state without saving.
  - Auto-save: use `useEffect` + a 2-second debounce to call `updateNote` while the user is typing (only if the note already exists — i.e., in edit mode).
- **Edit mode:** clicking on an existing note in the list opens it in the editor state with its data pre-filled. Saving calls `updateNote`.
- Deleting a note calls `deleteNote(id)`.

### E.3 Wire the Notes panel
- Export a small `<NotesPanel />` wrapper from `NoteEditor.tsx` (or a separate thin file) that just renders `<NoteEditor />` and is imported by `WorkspaceView.tsx`.

### E.4 Visual check
- Navigate to `/app` → Notes tab.
- Confirm: seed notes for `devos-core` are listed.
- Confirm: switch to `api-gateway` → notes list is empty → shows empty state.
- Confirm: create a new note → it appears in the list → word count badge is correct.
- Confirm: refresh the page → note persists.

### E.5 Commit
```bash
git add .
git commit -m "feat: implement workspace view with context-linked notes tab"
```

**✅ Checkpoint:** Notes tab fully functional — create, view, edit, delete, auto-save. Notes scoped to active project. Persistence verified after page refresh.

---

## PHASE F — Snippets Tab

> **Goal:** Implement the Snippet Library tab.

### F.1 Create `components/app/SnippetCard.tsx`
- Displays a single snippet.
- Shows: title (bold), language badge (color-coded: TypeScript=blue, Python=yellow, Go=cyan, JS=amber, Bash=gray, Other=slate), a `<pre><code>` block with the snippet body (Geist Mono font, dark bg, rounded corners, `overflow-x-auto`), and a "Copy" button.
- "Copy" button: calls `navigator.clipboard.writeText(code)` and changes its label to "Copied!" with a checkmark icon for 2 seconds, then reverts.
- Hover state: shows a trash icon in the top-right corner. Clicking calls `deleteSnippet(id)`.

### F.2 Create `components/app/SnippetForm.tsx`
- A form panel (inline, not a modal) for adding a new snippet.
- Fields:
  - Title (text input, required)
  - Language (dropdown `<select>`: JavaScript, TypeScript, Python, Go, Bash, Other)
  - Code body (`<textarea>` with monospace styling, tall enough for ~10 lines)
- Buttons: "Save Snippet" (calls `addSnippet({...})`), "Cancel".
- After saving, the form dismisses and the new snippet appears in the list.

### F.3 Wire the Snippets tab in `WorkspaceView.tsx`
- Replace the "Snippets coming soon" stub.
- Render: a "New Snippet" button at the top → toggles `SnippetForm` open.
- Below: map over `snippets.filter(s => s.projectId === activeProjectId)`, render a `<SnippetCard />` for each.
- Empty state (no snippets for active project): centered icon + "No snippets yet" + "New Snippet" button.

### F.4 Visual check
- Navigate to `/app` → switch to `devos-core` → Snippets tab.
- Confirm: seed snippets are listed with correct language badges.
- Confirm: "Copy" button works (paste somewhere to verify).
- Confirm: "Copied!" feedback shows for 2 seconds.
- Confirm: delete a snippet → it disappears.
- Confirm: add a new snippet → it appears and persists after refresh.

### F.5 Commit
```bash
git add .
git commit -m "feat: implement snippet library tab with copy-to-clipboard"
```

**✅ Checkpoint:** Snippets tab fully functional. Copy-to-clipboard works. Language badges display correctly. Snippets scoped to active project.

---

## PHASE G — AI Memory Tab

> **Goal:** Implement the AI Chat Memory tab with source badges and tag filtering.

### G.1 Create `components/app/AIMemoryCard.tsx`
- Displays a single AI memory item.
- Header: source badge (color-coded: ChatGPT=green, Claude=amber, Gemini=blue, Other=slate) + title.
- Body: truncated summary (first 100 chars + "…"). A "View Full" toggle button expands/collapses the full text — use local `useState` for this.
- Tags row: each tag rendered as a small `<Badge>` (clickable — clicking calls a filter callback prop).
- Footer: creation date (formatted as "Jul 27, 2026").
- Hover: trash icon in top-right. Clicking calls `deleteAIMemory(id)`.

### G.2 Create `components/app/AIMemoryForm.tsx`
- Inline form panel for saving a new AI memory.
- Fields:
  - Title (text input, required)
  - Source (dropdown `<select>`: ChatGPT, Claude, Gemini, Other)
  - Tags (text input, comma-separated — parse on save into `string[]`)
  - Summary (tall `<textarea>`)
- Buttons: "Save Memory", "Cancel".
- After saving, form dismisses and the new card appears in the list.

### G.3 Wire the AI Memory tab in `WorkspaceView.tsx`
- Replace the "AI Memory coming soon" stub.
- State: local `useState<string | null>` for the active tag filter (null = no filter).
- Render: "Save AI Memory" button → toggles `AIMemoryForm` open.
- Tag filter row: unique tags from all memories for the active project, each rendered as a clickable badge. Clicking a tag sets it as the active filter; clicking again clears it. An "All" pill at the start clears the filter.
- Below: filter `aiMemories` by `projectId` (and by tag if one is active), render a `<AIMemoryCard />` for each.
- Empty state: centered icon + "No AI memories yet" + "Save AI Memory" button.

### G.4 Visual check
- Navigate to `/app` → `devos-core` → AI Memory tab.
- Confirm: seed memories are listed with correct source badges.
- Confirm: "View Full" expands the summary text.
- Confirm: clicking a tag filters the visible cards.
- Confirm: clearing the tag filter shows all cards.
- Confirm: add a new memory → it appears and persists.

### G.5 Commit
```bash
git add .
git commit -m "feat: implement AI chat memory tab with tag filtering"
```

**✅ Checkpoint:** AI Memory tab fully functional. Source badges are color-coded. Tag filter works. Expand/collapse works.

---

## PHASE H — Learning Tracker Tab

> **Goal:** Implement the Learning Tracker tab with status cycling.

### H.1 Create `components/app/LearningItem.tsx`
- Displays a single learning resource.
- Shows: type icon (use Lucide: Tutorial=`BookOpen`, Course=`GraduationCap`, Docs=`FileText`, Video=`Play`, Book=`Book`), title (bold), URL as a small external link (if present), notes text (muted), status badge.
- **Status badge:** color shifts on click — calls `updateLearningStatus(id, nextStatus)`:
  - `todo` → gray badge "To Start"
  - `in-progress` → amber badge "In Progress"
  - `done` → green badge "Done"
  - Clicking cycles: todo → in-progress → done → todo
- Hover: trash icon in top-right. Clicking calls `deleteLearningItem(id)`.

### H.2 Create `components/app/LearningForm.tsx`
- Inline form panel for adding a learning resource.
- Fields:
  - Title (text input, required)
  - URL (text input, optional — `type="url"`)
  - Type (dropdown `<select>`: Tutorial, Course, Docs, Video, Book)
  - Notes (short `<textarea>`, max 2 lines)
  - Initial Status (dropdown `<select>`: To Start, In Progress, Done)
- Buttons: "Add Resource", "Cancel".

### H.3 Wire the Learning tab in `WorkspaceView.tsx`
- Replace the "Learning coming soon" stub.
- Progress bar at the top of the tab: `X of Y resources completed` (count where `status === "done"` / total, for `activeProjectId`). Render as a simple pill-bar progress indicator.
- Render: "Add Resource" button → toggles `LearningForm` open.
- Below: filter `learningItems` by `projectId`, render a `<LearningItem />` for each.
- Empty state: centered icon + "No resources yet" + "Add Resource" button.

### H.4 Visual check
- Navigate to `/app` → `api-gateway` → Learning tab.
- Confirm: seed learning items are listed.
- Confirm: clicking a status badge cycles correctly (with color change).
- Confirm: progress bar updates when an item is marked done.
- Confirm: add a resource → it appears and persists.
- Confirm: external URL opens in a new tab.

### H.5 Commit
```bash
git add .
git commit -m "feat: implement learning tracker tab with status cycling"
```

**✅ Checkpoint:** Learning tab fully functional. Status cycling works with color changes. Progress bar reflects real completion count. External links open correctly.

---

## PHASE I — Unified Search Overlay

> **Goal:** Implement the Cmd+K search that queries across all content types in real time.

### I.1 Create `components/app/SearchOverlay.tsx`
- Conditionally rendered when `isSearchOpen === true` (read from `workspaceStore`).
- **Structure:**
  - Full-screen backdrop (`fixed inset-0 bg-black/60 backdrop-blur-sm z-50`).
  - Centered modal card (max-width ~640px, auto height).
  - Search input at the top: prominent, focused on mount (`autoFocus`), placeholder rotates through 3 examples from seed data on 2s interval (e.g., "Try 'JWT middleware'…", "Try 'React hooks'…").
- **Real-time search logic:** on every keystroke, filter all 4 arrays from `workspaceStore` using `String.includes` (case-insensitive on title + body/code/summary/notes fields):
  - `notes` → match on `title` and `body`
  - `snippets` → match on `title` and `code`
  - `aiMemories` → match on `title` and `summary`
  - `learningItems` → match on `title` and `notes`
- **Results display:** grouped by type. Each group:
  - Group header: type label (Notes / Snippets / AI Memory / Learning) + count badge (only shown if count > 0).
  - Each result row: type icon (Lucide) + item title (bold) + project name (muted small text) + a snippet of the matching text (first 60 chars of the matched field).
- **Keyboard navigation:**
  - `Arrow Down` / `Arrow Up`: moves the highlighted result.
  - `Enter`: selects the highlighted result — closes overlay, calls `setActiveProject` to the result's project, calls `setActiveTab` to the correct tab.
  - `Esc`: closes the overlay (calls `closeSearch()`).
- **Empty state:** if query is non-empty and no results found, show "No results for '{query}'" centered in the modal.
- **Zero-query state:** when input is empty, show hint text ("Search across notes, snippets, AI memories, and learning resources").

### I.2 Wire Cmd+K in `app/app/page.tsx`
- Confirm the `useEffect` keyboard listener from Phase D is calling `openSearch()` correctly.
- Also wire the `AppTopbar` search button click (confirmed in Phase D).

### I.3 Visual check
- Press `Cmd+K` (or `Ctrl+K` on Windows) → overlay opens.
- Type "JWT" → results appear grouped under "Notes" and "AI Memory".
- Use arrow keys to navigate results.
- Press Enter → overlay closes, correct project and tab are activated, correct content is shown.
- Press Esc → overlay closes.
- Confirm the placeholder rotates.

### I.4 Commit
```bash
git add .
git commit -m "feat: implement unified search overlay with keyboard navigation"
```

**✅ Checkpoint:** Search overlay opens via Cmd+K, searches in real time across all 4 content types, keyboard navigation works, selecting a result navigates correctly.

---

## PHASE J — Polish & QA Pass

> **Goal:** Empty states, mobile layout, and a full regression check of the V1 landing page.

### J.1 Audit all empty states
- Visit `/app` in a fresh `localStorage`-cleared session (DevTools → Application → Storage → Clear Site Data).
- Confirm seed data loads automatically.
- After seeding, manually delete all items from one project and confirm every tab shows its empty state (icon + message + action button) rather than a blank white panel.

### J.2 Mobile responsive pass on `/app`
- At 375px viewport width, the sidebar must collapse to a hidden state.
- Add a hamburger / menu button in `AppTopbar.tsx` (visible only below `md:` breakpoint) that toggles the sidebar as a slide-in drawer.
- Use `translate-x` + `transition` for the drawer animation — no new libraries.
- Clicking outside the drawer (backdrop) closes it.
- Verify all 4 tabs are usable on mobile (forms don't overflow, code blocks scroll horizontally).

### J.3 Verify V1 landing page integrity
- Navigate to `http://localhost:3000`.
- Scroll through every section: Hero → TrustStrip → Features → HowItWorks → ProductPreview → Pricing → FAQ → FinalCTA.
- Confirm:
  - Pricing toggle works and prices update.
  - Interactive `DashboardMockup` in ProductPreview still cycles correctly.
  - All CTAs point to `/app`.
  - "Try it →" links on feature cards are visible.
  - No console errors.
  - All V1 sections are visually unchanged from before V2 work began.

### J.4 Production build check
```bash
npm run build
```
Fix any TypeScript errors, missing imports, or build warnings before committing.

### J.5 Commit
```bash
git add .
git commit -m "fix: polish empty states, mobile layout, and verify V1 landing page integrity"
```

**✅ Checkpoint:** `/app` works on mobile. All tabs have empty states. `npm run build` completes with zero errors. V1 landing page is pixel-perfect.

---

## PHASE K — Documentation & Final Checklist

> **Goal:** Update the README and do a final pass against the success criteria from `plan_v_2.md`.

### K.1 Update `README.md`
- Add a "V2 — Interactive Product Demo" section after the existing content.
- Include:
  - What V2 adds (one paragraph summary)
  - The `/app` route: what it is, how to reach it, what's pre-loaded
  - How localStorage persistence works (and how to reset: DevTools → Clear Site Data)
  - List of all 6 feature demos with one-line descriptions
  - Updated folder tree showing the new `components/app/`, `store/workspaceStore.ts`, `types/workspace.ts`, and `data/demo.ts` additions

### K.2 Success criteria checklist
Run through every item in the "Success Criteria for V2" section of `plan_v_2.md` manually:

- [ ] Clicking "Start Building Free" navigates to `/app`
- [ ] `/app` shows 3 pre-seeded projects in the sidebar
- [ ] Switching projects updates workspace content
- [ ] New project can be created via modal
- [ ] Notes tab: create, edit, delete, auto-save works
- [ ] Snippets tab: add, copy to clipboard, delete works
- [ ] AI Memory tab: save with tags, filter by tag, expand/collapse works
- [ ] Learning tab: add resource, status cycles through 3 states, progress bar updates
- [ ] Cmd+K opens search overlay, returns grouped results, Enter navigates correctly
- [ ] Pricing toggle switches between Monthly and Yearly prices
- [ ] ProductPreview DashboardMockup sidebar is clickable
- [ ] All V1 landing page sections render correctly
- [ ] `npm run build` passes with zero errors
- [ ] `/app` sidebar collapses to a drawer on mobile
- [ ] localStorage data persists after page refresh

Check off each item. Do not proceed until all pass.

### K.3 Final commit
```bash
git add .
git commit -m "docs: update README for V2 interactive product demo"
```

### K.4 Push to GitHub
```bash
git push origin main
```

**✅ Checkpoint: V2 complete.** All 15 success criteria pass. README updated. Repository pushed.

---

## Quick Reference — V2 Commit Sequence

```
feat: add workspace store, types, and demo seed data
feat: wire landing page CTAs to /app route and add pricing toggle
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
(11 commits — each one a discrete, independently reviewable unit of work.)

---

## Phase Dependencies at a Glance

```
Phase A (Types & Store)
    ↓
Phase B (Landing Wiring)   Phase C (Interactive Mockup)
    ↓                              ↓
Phase D (/app Shell) ─────────────┘
    ↓
Phase E (Notes Tab)
    ↓
Phase F (Snippets Tab)
    ↓
Phase G (AI Memory Tab)
    ↓
Phase H (Learning Tab)
    ↓
Phase I (Search Overlay)
    ↓
Phase J (Polish & QA)
    ↓
Phase K (Docs & Final Check)
```

Phases B and C can be done in either order after Phase A. All other phases must be done in sequence — each depends on the shell and stores from the phase before it.
