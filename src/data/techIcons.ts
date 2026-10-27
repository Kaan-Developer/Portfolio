import type { ComponentType } from "react";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
} from "react-icons/si";

export type TechIcon = ComponentType<{
  size?: number | string;
  className?: string;
}>;

export const techIcons: Record<string, TechIcon> = {
  React: SiReact,
  TypeScript: SiTypescript,
  Tailwind: SiTailwindcss,
  Supabase: SiSupabase,
};
