import type { Project, Note, Snippet, AIMemory, LearningItem } from "@/types/workspace";

// ---------------------------------------------------------------------------
// Seed Projects
// ---------------------------------------------------------------------------
export const seedProjects: Project[] = [
  {
    id: "p1",
    name: "devos-core",
    color: "#3B82F6", // blue
    icon: "FolderGit2",
    createdAt: "2026-07-01T09:00:00.000Z",
  },
  {
    id: "p2",
    name: "api-gateway",
    color: "#22C55E", // green
    icon: "Server",
    createdAt: "2026-07-05T10:00:00.000Z",
  },
  {
    id: "p3",
    name: "auth-service",
    color: "#A855F7", // purple
    icon: "Shield",
    createdAt: "2026-07-10T11:00:00.000Z",
  },
];

// ---------------------------------------------------------------------------
// Seed Notes  (all belong to p1 — devos-core)
// ---------------------------------------------------------------------------
export const seedNotes: Note[] = [
  {
    id: "n1",
    projectId: "p1",
    title: "Architecture Decision Record — Monorepo vs Polyrepo",
    body: `After evaluating both approaches for DevOS, we settled on a monorepo structure using Turborepo.

Key reasons:
- Shared types and utilities can live in a single \`packages/\` workspace.
- CI/CD pipelines benefit from affected-only task running.
- Atomic commits across the frontend, API, and auth layers.

Trade-offs acknowledged: monorepo tooling has a steeper learning curve for new contributors. We will document the setup in the README.`,
    createdAt: "2026-07-12T08:30:00.000Z",
    wordCount: 73,
  },
  {
    id: "n2",
    projectId: "p1",
    title: "Local Dev Environment Setup",
    body: `## Prerequisites
- Node.js 20+
- pnpm 9+
- Docker Desktop (for the Postgres container)

## Steps
1. Clone the repo: \`git clone git@github.com:org/devos.git\`
2. Install dependencies: \`pnpm install\`
3. Copy env file: \`cp .env.example .env.local\`
4. Start the DB: \`docker compose up -d\`
5. Run migrations: \`pnpm db:migrate\`
6. Start dev server: \`pnpm dev\`

Dev server runs at http://localhost:3000.`,
    createdAt: "2026-07-14T10:15:00.000Z",
    wordCount: 82,
  },
  {
    id: "n3",
    projectId: "p1",
    title: "UI Component Conventions",
    body: `All UI components live in \`components/\`. Rules:

1. **One component per file.** No barrel re-exports from component folders — import directly from the file.
2. **CSS Modules or Tailwind only.** No inline styles except for dynamic values (e.g., theme colors).
3. **Props interfaces** must be defined in the same file, above the component. Name them \`<ComponentName>Props\`.
4. **No logic in layout components.** Pass callbacks as props; keep layout components dumb.
5. **Accessibility first.** Every interactive element must have an accessible label.`,
    createdAt: "2026-07-16T14:00:00.000Z",
    wordCount: 87,
  },
];

// ---------------------------------------------------------------------------
// Seed Snippets  (p1 and p2)
// ---------------------------------------------------------------------------
export const seedSnippets: Snippet[] = [
  {
    id: "s1",
    projectId: "p1",
    title: "JWT verifyToken middleware",
    language: "TypeScript",
    code: `import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}`,
    createdAt: "2026-07-13T09:00:00.000Z",
  },
  {
    id: "s2",
    projectId: "p1",
    title: "Typed fetch wrapper with error handling",
    language: "JavaScript",
    code: `/**
 * Generic fetch wrapper that throws on non-2xx responses.
 * @template T  Expected response body type.
 */
async function fetchJSON(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(\`HTTP \${res.status}: \${error}\`);
  }

  return res.json();
}

export default fetchJSON;`,
    createdAt: "2026-07-15T11:30:00.000Z",
  },
  {
    id: "s3",
    projectId: "p2",
    title: "Rate limiting middleware (Express)",
    language: "TypeScript",
    code: `import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests, please try again after 15 minutes.",
  },
});`,
    createdAt: "2026-07-18T08:45:00.000Z",
  },
];

// ---------------------------------------------------------------------------
// Seed AI Memories  (both in p1)
// ---------------------------------------------------------------------------
export const seedAIMemories: AIMemory[] = [
  {
    id: "m1",
    projectId: "p1",
    title: "JWT Strategy — Stateless Auth with Refresh Token Rotation",
    summary: `Claude recommended using stateless JWTs for access tokens (short-lived, 15 min) paired with an opaque refresh token stored in an HttpOnly cookie. Refresh token rotation ensures each refresh issues a new token and invalidates the previous one, mitigating token theft. Store refresh tokens in a Redis set per user so you can invalidate all sessions at once on logout or compromise. Avoid storing sensitive claims in the JWT payload; use the sub claim as a user ID and look up permissions at the service boundary.`,
    tags: ["JWT", "auth", "security", "Redis", "refresh-tokens"],
    source: "Claude",
    createdAt: "2026-07-20T13:00:00.000Z",
  },
  {
    id: "m2",
    projectId: "p1",
    title: "API Rate Limiting Strategy",
    summary: `ChatGPT recommended a tiered rate-limiting approach: IP-level limits for unauthenticated routes (100 req/15 min) and user-level limits for authenticated routes (1000 req/hour). Use a sliding window counter in Redis for accuracy. For burst traffic, consider a token bucket algorithm. Return Retry-After headers so clients can back off gracefully. For the API gateway layer, use express-rate-limit with a Redis store adapter to share limits across multiple Node.js instances.`,
    tags: ["rate-limiting", "Redis", "API", "express", "performance"],
    source: "ChatGPT",
    createdAt: "2026-07-22T15:30:00.000Z",
  },
];

// ---------------------------------------------------------------------------
// Seed Learning Items  (both in p2)
// ---------------------------------------------------------------------------
export const seedLearningItems: LearningItem[] = [
  {
    id: "l1",
    projectId: "p2",
    title: "Next.js App Router — Official Docs",
    url: "https://nextjs.org/docs/app",
    type: "Docs",
    notes: "Focus on Server Components, streaming, and the new metadata API. The layouts and loading.tsx patterns are key for the DevOS shell.",
    status: "in-progress",
    createdAt: "2026-07-18T09:00:00.000Z",
  },
  {
    id: "l2",
    projectId: "p2",
    title: "Zustand — Official Docs",
    url: "https://zustand.docs.pmnd.rs",
    type: "Docs",
    notes: "Read the persist middleware section carefully. Check slice pattern for splitting large stores. Also review the Immer middleware for nested updates.",
    status: "todo",
    createdAt: "2026-07-20T10:00:00.000Z",
  },
];
