import type { Project } from "../types/project";

// Add a project only when its repository, preview image and explanation are ready.
export const projects: readonly Project[] = [
  {
    id: "admin-panel",
    title: "Admin Panel",
    category: "Dashboard / CRUD",
    description:
      "An admin dashboard with protected routes, data tables and CRUD forms. Built to practise authentication flows, form validation and reusable table components.",
    image: "/images/admin-panel.png",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "React Router",
      "React Query",
      "React Zustand",
    ],
    projectUrl: "https://github.com/Kaan-Developer/admin-panel",
  },
];