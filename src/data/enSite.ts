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

  accessibility: {
    home: "Kaan - Home",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    primaryNavigation: "Primary navigation",
    mobileNavigation: "Mobile navigation",
    contactNavigation: "Contact navigation",
    footerNavigation: "Footer navigation",
    language: "Language",
    opensInNewTab: "(opens in a new tab)",
    backToTop: "Back to top",
    enlargeImage: "Enlarge project image",
    imagePreview: "Image preview",
    closePreview: "Close preview",
  },

  notFound: {
    title: "Page not found",
    description: "The page you’re looking for doesn’t exist.",
    backToHome: "Back to home",
  },

  buttons: {
    projectBtn: "View projects",
    letsContactBtn: "Let's talk",
    contactBtn: "Get in touch",
    viewDetailsBtn: "View details",
    liveDemoBtn: "Live demo",
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
      hi: "Hi, I'm Kaan.",
description:
  "I build web interfaces and apply what I learn about React and TypeScript in my projects.",
description2:
  "Currently, I'm working on accessibility, using APIs, and creating better user experiences.",
        techTitle: "Technologies I use",
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
      otherSubjectPlaceholder: "Briefly describe the subject",
      otherSubjectLabel: "Other subject",
      characters: "characters",
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
