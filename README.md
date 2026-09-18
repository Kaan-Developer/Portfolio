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
├── stores/     # Zustand: theme, sidebar, AI panel
├── data/       # typed project data
└── pages/      # /, /skills, /projects, /about
api/
├── health.get.ts
└── chat.post.ts
```

## Env

```bash
cp .env.example .env
```
```
GROQ_API_KEY=
```

## Status

Core UI, theming, and routing are done. Chat backend (Groq integration) is in progress; project list fills in as work ships.

## License

MIT
