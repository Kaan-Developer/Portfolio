import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    title: "Portfolio",
    description:
      "A personal portfolio that brings my projects, background and contact details together, with a Spline scene loaded separately from the main content.",
    tech: ["React", "TypeScript", "Tailwind", "Spline", "Supabase"],
    github: "https://github.com/Kaan-Developer/Portfolio",
    caseStudy: {
      context: "Independent learning project",
      problem:
        "I needed one place to introduce my work and give visitors a way to contact me, rather than relying on separate profile and repository pages.",
      contribution:
        "My work covers the React page sections, project data, navigation and contact form integration. Spline provides the 3D rendering, while Supabase provides the database and server function infrastructure.",
      decisions: [
        "I keep site and project content in typed data files instead of repeating it inside components. This separates content updates from layout changes without introducing a content management service for a small personal site.",
        "I use a single page with section links instead of separate routes for each introduction section. The current content fits one page; detailed project pages can be added when they need their own space.",
        "The Spline component is loaded separately and enabled near its section. Rendering is skipped on small screens and devices without a fine pointer, and paused when the section is out of view. Always loading and running the scene would do unnecessary work on devices that do not use it.",
        "The contact form calls a Supabase server function instead of sending email directly from the browser. Database writes and the email provider credential are handled on the server.",
      ],
      challenges: [
        "Changing the profile summary from technology lists to text values exposed a data mismatch: the component called .map() on a string. I replaced the mixed structure with typed label/value entries and updated the component to render text directly.",
        "The 3D scene needs different behavior on desktop and touch devices. The integration checks screen size and pointer support, loads near the visible section, and starts or stops the scene based on visibility. Its behavior still needs browser testing.",
      ],
      outcome:
        "The site combines my introduction, project links and contact form in one page. The profile summary data mismatch is resolved, and lint, TypeScript and production build checks pass. I have not measured visitor outcomes or a performance improvement.",
      evidence: {
        screenshots: [],
        checks: ["pnpm lint", "pnpm exec tsc -b", "pnpm build"],
        checkedOn: "2026-10-10",
        automatedTests: "No automated test suite is configured.",
        limitations: [
          "Project screenshots and a live demo URL have not been added to this entry.",
          "Desktop and mobile behavior, keyboard access, and end-to-end contact delivery have not been verified in a browser.",
          "No user, business or before-and-after performance metrics have been collected.",
          "The production build still reports JavaScript chunks larger than 500 kB.",
        ],
      },
    },
  },
];

export const projectDrafts: Pick<Project, "title" | "tech">[] = [
  {
    title: "K AI",
    tech: ["React", "TypeScript", "Tailwind"],
  },
];
