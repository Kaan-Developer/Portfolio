import type { Project } from "../types/project";
import portfolioHero from "../assets/images/portfolioHero.png";

export const projects: Project[] = [
  {
    title: "Portfolio",
    image: portfolioHero,
    slug: "portfolio",
    description:
      "A bilingual React portfolio with project notes and a Supabase contact form.",
    tech: ["React", "TypeScript", "Tailwind", "Supabase"],
    github: "https://github.com/Kaan-Developer/Portfolio",
    live: "http://localhost:5173",
    caseStudy: {
      problem:
        "I needed one place to present my frontend work and receive enquiries.",
      contribution:
        "I designed the interface and built the responsive layouts, navigation, project pages, and contact function.",
      decisions: [
        "Project cards and detail pages read the same data, so descriptions and links can be updated in one place. Turkish and English content is stored separately.",
        "The homepage uses section links; React Router gives each project a direct URL. This keeps homepage navigation simple while making the details shareable.",
        "The contact function validates requests and saves messages before attempting a Resend notification. A failed notification leaves the database record intact; email delivery needs to be checked separately.",
        "The browser uses a publishable Supabase key. Database writes and the Resend key stay in the server function.",
      ],
      outcome:
        "The portfolio has Turkish and English content, directly addressable project pages, and a contact flow that can save a message even if its email notification fails.",
    },
    blogs: [
      {
        title: "Project content",
        content:
          "Project cards and detail pages use the active language's project data. Updating a title or link there updates both views.\n\nThe shared Project type checks each record's structure, while content files hold the copy. This keeps wording changes out of the rendering components. Because translations live in separate files, slugs and links need to be kept aligned.",
      },
    ],
  },
];
