import { projects } from "./projects";
import { enPrivacy } from "./enPrivacy";

export const enSite = {
  name: "Kaan Hamitler",
  role: "Frontend Developer",

  littleDesc: "I build responsive web interfaces with React and Tailwind CSS.",

  links: {
    github: "https://github.com/Kaan-Developer",
  },

  bubbles: [
    { label: "Home", target: "home" },
    { label: "Projects", target: "projects" },
    { label: "About", target: "about" },
  ],

  projects,

  projectDetails: {
    problem: "The problem",
    contribution: "What I built",
    decisions: "Technical decisions",
    outcome: "Result",
    blogs: "Development notes",
    imageAlt: "project preview",
  },

  privacy: enPrivacy,

  buttons: {
    projectBtn: "View projects",
    letsContactBtn: "Let's talk",
    contactBtn: "Get in touch",
    viewDetailsBtn: "View details",
    copyEmailBtn: "Copy Email",
    copyLoading: "Copyin...",
    succesCopy: "Copied",
    sendBtn: "Send message",
  },

  dashbord: {
    allProjects: "All Projects",
    privacyNote: "Contact privacy notice",
    backto: "Back to portfolio.",
  },

    footer: {
    Allrightsreserved: "All rights reserved."
  },

  projectsSection: {
    title: "Things I've built",
    description: "Frontend projects with source code and development notes.",
  },

  about: [
    {
      hi: "About me",
      description:
        "I build responsive interfaces with React and Tailwind CSS. I started with HTML, CSS and JavaScript, and I’m now adding TypeScript to my React projects.",
      description2:
        "I designed and built this portfolio, including its navigation, project pages and contact form. My current focus is improving my JavaScript and React foundations.",
      tech: ["React", "TypeScript", "JavaScript", "Tailwind", "HTML", "CSS"],
      tools: ["Git", "GitHub", "Figma", "Vite"],
    },
  ],

  skills: {
    title: "My Skills",
    technologies: "Technologies",
    tools: "Tools",
  },

  contact: {
    email: "kaandeveloperr07@gmail.com",
    title: "Get in touch",
    description:
      "Send a message about a project, a role, or another enquiry. I aim to reply within 24 hours.",

    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      subjectLabel: "Subject",
      subjectOptionalLabel: "Optional",
      subjectPlaceholder: "Select a subject",
      subjectOptions: [
        { label: "Project inquiry", value: "project" },
        { label: "Job opportunity", value: "job" },
        { label: "Collaboration", value: "collaboration" },
        { label: "Other", value: "other" },
      ],
      messageLabel: "Message",
      messagePlaceholder: "What are you working on?",
      submitLabel: "Send message",
      submittingLabel: "Sending…",
      successMessage: "Message saved. Thank you.",
      errorMessage:
        "Message could not be sent. Check the fields and try again.",
      privacyNote: "Your details are used to respond to your enquiry.",
      privacyTitle: "Contact privacy notice",
    },
  },
};
