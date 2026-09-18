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

## Status

Core UI, theming, and routing are done. Chat backend (Groq integration) is in progress; project list fills in as work ships.

## License

MIT
