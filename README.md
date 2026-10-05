<div align="center">

# Kaan Hamitler — Portfolio

**A fast, responsive personal portfolio with an interactive 3D robot.**
Built with React, TypeScript, Tailwind CSS and Spline.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

<!-- Add your deployed site here, for example: -->
<!-- [**Live Demo →**](https://your-domain.com) -->

</div>

---

## Overview

This is my personal portfolio website. It introduces who I am, what I'm currently working on and the projects I've built. The page is a single-page layout (Hero → Stats → About → Projects) with a floating navbar, smooth anchor scrolling and an interactive 3D robot rendered with [Spline](https://spline.design).

All of the text content lives in plain data files, so updating the site rarely means touching the components.

## Features

- **Interactive 3D robot** — a Spline scene that is lazy-loaded with `React.lazy`, so it never blocks the first paint.
- **Device-aware loading** — the 3D scene is skipped on small screens and touch-only devices (width under 768px or no hover/fine pointer) to save bandwidth and battery.
- **Scroll-friendly 3D** — scrolling the mouse wheel over the robot scrolls the page instead of getting trapped inside the scene.
- **Smart navbar** — hides while scrolling down, reappears while scrolling up, and highlights the active section using `IntersectionObserver`.
- **Mobile menu** — a compact dropdown menu with its open/close state managed by Zustand.
- **Data-driven content** — name, bio, stats, navigation and projects are all defined in `src/data/`.
- **Tech icon system** — project tags are mapped to brand icons through a single lookup table.
- **Design tokens** — colors, fonts, radii and shadows are defined once with Tailwind CSS v4's `@theme`.
- **Self-hosted fonts** — Bricolage Grotesque and Instrument Sans are served through Fontsource, so there are no third-party font requests.
- **Accessibility-minded** — visible focus rings, descriptive `aria-label`s, decorative icons hidden from screen readers and full `prefers-reduced-motion` support.

## Tech Stack

| Area          | Tools                                                              |
| ------------- | ------------------------------------------------------------------ |
| Framework     | [React 19](https://react.dev)                                      |
| Language      | [TypeScript](https://www.typescriptlang.org)                       |
| Build tool    | [Vite](https://vite.dev)                                           |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/vite`)   |
| 3D            | [Spline](https://spline.design) (`@splinetool/react-spline`)       |
| State         | [Zustand](https://zustand-demo.pmnd.rs)                            |
| Icons         | [Lucide](https://lucide.dev) and [React Icons](https://react-icons.github.io/react-icons/) |
| Class helpers | [clsx](https://github.com/lukeed/clsx)                             |
| Linting       | [Oxlint](https://oxc.rs/docs/guide/usage/linter)                   |
| Package manager | [pnpm](https://pnpm.io)                                          |

## Getting Started

### Prerequisites

- **Node.js** `20.19+` or `22.12+` (required by Vite 8)
- **pnpm** `10+` — install it with `npm install -g pnpm` if you don't have it

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Kaan-Developer/Portfolio.git
cd Portfolio

# 2. Install dependencies
pnpm install

# 3. Create your environment file
cp .env.example .env

# 4. Start the dev server
pnpm dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`).

## Available Scripts

| Command        | Description                                              |
| -------------- | -------------------------------------------------------- |
| `pnpm dev`     | Start the Vite dev server with hot module replacement.   |
| `pnpm build`   | Type-check with `tsc -b`, then create a production build in `dist/`. |
| `pnpm preview` | Serve the production build locally to test it.           |
| `pnpm lint`    | Lint the project with Oxlint.                            |

## Environment Variables

Create a `.env` file in the project root (see [`.env.example`](./.env.example)):

| Variable           | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `VITE_ROBOT_1_URL` | Public `.splinecode` scene URL for robot scene 1.    |
| `VITE_ROBOT_2_URL` | Public `.splinecode` scene URL for robot scene 2.    |

> **Note:** Vite embeds every `VITE_*` variable into the final JavaScript bundle at build time. They are public by design, so never store secrets such as API keys here. If you deploy the site, add these variables in your hosting dashboard **before** building.

## Project Structure

```text
.
├── index.html
├── vite.config.ts
├── tsconfig.json
├── .oxlintrc.json
├── .env.example
└── src
    ├── main.tsx                 # App entry point, fonts and global CSS
    ├── App.tsx
    ├── index.css                # Tailwind v4 theme tokens and base styles
    ├── assets
    │   └── images               # Logo and illustrations
    ├── components
    │   ├── Robot
    │   │   └── RobotCanvas.tsx  # Lazy-loaded Spline scene
    │   ├── feedback
    │   │   └── Loading.tsx      # Loading state for the 3D scene
    │   ├── sections
    │   │   ├── Hero.tsx
    │   │   ├── About.tsx
    │   │   └── Projects.tsx
    │   └── ui
    │       ├── Navbar.tsx
    │       ├── Ul.tsx           # Navigation links and active-section tracking
    │       ├── Button.tsx
    │       ├── Stats.tsx
    │       └── StarOnGithub.tsx
    ├── data
    │   ├── site.ts              # Name, bio, navigation, stats
    │   ├── projects.ts          # Project list
    │   └── techIcons.ts         # Tech name → icon lookup
    ├── pages
    │   └── AnaPage.tsx          # Page composition
    ├── store
    │   └── menu.ts              # Mobile menu state (Zustand)
    └── types
        └── project.ts
```

## Customization

**Personal info, navigation and stats** — edit `src/data/site.ts`.

**Adding a project** — add an object to the array in `src/data/projects.ts`:

```ts
{
  title: "My New Project",
  description: "A short sentence about what it does.",
  tech: ["React", "TypeScript", "Tailwind"],
  github: "https://github.com/Kaan-Developer/my-new-project",
  live: "https://my-new-project.com", // optional
}
```

Each name in `tech` must match a key in `src/data/techIcons.ts` exactly (for example `"Node.js"`, not `"NodeJS"`). To support a new technology, import its icon and add one line to that file.

**Theme** — colors, fonts, radii and shadows are CSS variables inside the `@theme` block of `src/index.css`.

## Deployment

The project builds to a plain static site, so it works on any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, ...).

| Setting          | Value        |
| ---------------- | ------------ |
| Build command    | `pnpm build` |
| Output directory | `dist`       |
| Install command  | `pnpm install` |

Remember to add `VITE_ROBOT_1_URL` and `VITE_ROBOT_2_URL` in the host's environment variable settings before the first build.

## Roadmap

- [x] Hero, About and Projects sections
- [x] Responsive layout and mobile navigation
- [x] Interactive 3D robot
- [ ] Contact section
- [ ] Skills section
- [ ] Real screenshots for each project
- [ ] SEO metadata, favicon and social preview image

## Author

**Kaan Hamitler** — Frontend Developer based in Turkey

- GitHub: [@Kaan-Developer](https://github.com/Kaan-Developer)

If you like this project, consider giving it a ⭐ on [GitHub](https://github.com/Kaan-Developer/Portfolio).
