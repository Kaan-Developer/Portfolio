import type { Project } from "../types/project";
import portfolioHero from "../assets/images/portfolioHero.png";

export const projects: Project[] = [
  {
    title: "Portfolio",
    image: portfolioHero,
    slug: "portfolio",
    description:
      "My personal portfolio, which I designed and built as the sole developer to present my work and provide a way to contact me.",
    tech: ["React", "TypeScript", "Tailwind", "Supabase"],
    github: "https://github.com/Kaan-Developer/Portfolio",
    caseStudy: {
      problem:
        "I needed a personal website where visitors could learn about me, see my projects and skills, and get in touch.",
      contribution:
        "I designed and developed this website myself. As the sole developer, I built the responsive React interface, navigation, project detail pages, and contact form, including the Supabase server function for saving messages and sending email notifications through Resend when configured.",
      decisions: [
        "I keep site and project content in TypeScript data files so I can update the text without editing page components.",
        "I use section links for the main page and React Router for project detail pages, giving each project a direct URL.",
        "I use Tailwind CSS for responsive layouts and shared styles across the site.",
        "I send contact form submissions to a Supabase server function, which validates requests and saves messages. Email notifications use Resend when its API key is configured, keeping that key out of browser code.",
      ],
      outcome:
        "The site brings together my introduction, skills, and project links, with a dedicated detail page for each project. The contact form is implemented with validation and a Supabase integration for saving messages.",
    },
    blogs: [
      {
        title: "Building my portfolio",
        content:
          "I designed and built this portfolio myself using React, TypeScript, Vite, and Tailwind CSS. The main page introduces me, presents my projects and skills, and includes a contact form.\n\nProject content lives in a TypeScript data file. The project cards and detail pages read from the same data, so I can update a project's description, technologies, and development notes in one place. React Router uses each project's slug to open its detail page.\n\nThe contact form sends submissions to a Supabase server function. The function validates the input, checks rate limits, and saves accepted messages to the database. It also attempts an email notification through Resend when an API key is configured.",
      },
    ],
  },
];
