import type { Project } from "../types/project";
import portfolio1 from "../assets/projects/portfolio-1.webp";
import portfolio2 from "../assets/projects/portfolio-2.webp";

export const projects: Project[] = [
  {
    title: "Portfolio",
    description:
      "My personal site with an interactive 3D robot and a responsive layout.",
    tech: ["React", "TypeScript", "Tailwind", "Spline"],
    images: [portfolio1, portfolio2],
    github: "https://github.com/Kaan-Developer/Portfolio",
  },
];