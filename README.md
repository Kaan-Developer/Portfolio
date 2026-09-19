# Portfolio

Personal developer portfolio built with React, TypeScript, and Tailwind CSS.

**Live:** [your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

<img src="https://skillicons.dev/icons?i=react,ts,tailwind,vite&theme=dark" height="32" alt="React, TypeScript, Tailwind CSS, Vite" />

## Stack

React 19 · TypeScript · Tailwind CSS 4 · Zustand · React Router · Nitro

## Run locally

```bash
git clone https://github.com/Kaan-Developer/Portfolio.git
cd Portfolio
pnpm install
pnpm dev
```

## Structure

```
src/
  components/  # presentational components
  pages/       # /, /skills, /projects, /about, /contact
  store/       # Zustand: theme, sidebar, contact modal, AI chat
  data/        # typed project data
  features/    # ai/ chat client, contact/ + admin/ (planned)
  lib/         # supabase client (planned)
api/
  chat.post.ts # Groq-backed chat endpoint
```

## Env

```bash
cp .env.example .env
```
Required: `GROQ_API_KEY` (used by `api/chat.post.ts`).
Planned: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`.

## AI workflow (Claude)

This repository ships a single-file context bundle so an AI assistant can see the whole project at once.

```bash
pnpm share        # writes share/Portfolio-AI-Bundle.md (+ zip); share/ is git-ignored
```

- `docs/ai/claude-prompt.md` — the master prompt: role, architecture boundaries, code conventions, design tokens, task catalogue and output format.
- `tools/export-ai-bundle.ps1` — bundles that prompt plus every source file into one Markdown file, with git info, file tree, token estimate and secret redaction.
- `tools/Send-To-Claude.cmd` — double-click version: builds the bundle, copies its path to the clipboard and opens the folder.

The bundle never contains `.env`, private keys or binary assets, and any detected API key or JWT is masked as `REDACTED`.
Regenerate it after code changes so the assistant always reads the current working tree.

## Status

Core UI, theming, routing and the Groq-backed chat assistant are done.
The contact form (`src/components/Contact.tsx`, `src/features/contact`) and the admin dashboard (`src/features/admin`) are planned or in progress; the project list fills in as work ships.

## License

MIT
