import type { ComponentType } from "react";
import { Box } from "lucide-react";
import reactLogo from "../assets/tech/react.svg";
import typescriptLogo from "../assets/tech/typescript.svg";
import javascriptLogo from "../assets/tech/javascript.svg";
import tailwindLogo from "../assets/tech/tailwind.svg";
import htmlLogo from "../assets/tech/html.svg";
import cssLogo from "../assets/tech/css.svg";
import gitLogo from "../assets/tech/git.svg";
import githubLogo from "../assets/tech/github.svg";
import figmaLogo from "../assets/tech/figma.svg";
import viteLogo from "../assets/tech/vite.svg";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiSass,
  SiVite,
  SiNextdotjs,
  SiReactrouter,
  SiThreedotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiPhp,
  SiC,
  SiCplusplus,
  SiGo,
  SiRust,
  SiOpenjdk,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiSupabase,
  SiFirebase,
  SiPrisma,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiFigma,
  SiVercel,
  SiNetlify,
  SiCloudflare,
  SiPnpm,
  SiNpm,
  SiEslint,
  SiVitest,
} from "react-icons/si";

export type TechIcon = ComponentType<{
  size?: number | string;
  className?: string;
}>;

// Anahtar, projects.ts içindeki tech yazısıyla BİREBİR aynı olmalı
export const techIcons: Record<string, TechIcon> = {
  React: SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss,
  Tailwind: SiTailwindcss,
  Sass: SiSass,
  Vite: SiVite,
  "Next.js": SiNextdotjs,
  "React Router": SiReactrouter,
  "Three.js": SiThreedotjs,
  Spline: Box,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Python: SiPython,
  PHP: SiPhp,
  C: SiC,
  "C++": SiCplusplus,
  Go: SiGo,
  Rust: SiRust,
  Java: SiOpenjdk,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Supabase: SiSupabase,
  Firebase: SiFirebase,
  Prisma: SiPrisma,
  Docker: SiDocker,
  Git: SiGit,
  GitHub: SiGithub,
  Linux: SiLinux,
  Figma: SiFigma,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  Cloudflare: SiCloudflare,
  pnpm: SiPnpm,
  npm: SiNpm,
  ESLint: SiEslint,
  Vitest: SiVitest,
};

export const techLogos: Record<string, string> = {
  React: reactLogo,
  TypeScript: typescriptLogo,
  JavaScript: javascriptLogo,
  Tailwind: tailwindLogo,
  HTML: htmlLogo,
  CSS: cssLogo,
  Git: gitLogo,
  GitHub: githubLogo,
  Figma: figmaLogo,
  Vite: viteLogo,
};
