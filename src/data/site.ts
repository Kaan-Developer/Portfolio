import { FaGithub, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { ProfileSummaryItem } from "../types/site";

export interface SocialLink {
  name: string;
  username: string;
  href: string;
  icon: IconType;
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    username: "@Kaan-Developer",
    href: "https://github.com/Kaan-Developer",
    icon: FaGithub,
  },
  {
    name: "X (Twitter)",
    username: "@KHamitler78641",
    href: "https://x.com/KHamitler78641",
    icon: FaXTwitter,
  },
];

export const site = {
  name: "Kaan Hamitler",
  role: "Frontend Developer",

  littleDesc:
    "I build responsive web interfaces with React and TypeScript",

  links: {
    github: "https://github.com/Kaan-Developer",
  },

  // Navbar links
  bubbles: [
    {label: "Home", target: "home"},
    { label: "Projects", target: "projects" },
    { label: "About", target: "about" },
  ],

  profileSummary: [
    {
      icon: "focus",
      label: "Focus",
      value: "Frontend Development",
    },
    { icon: "location", label: "Location", value: "Türkiye · UTC+3" },
    { icon: "status", label: "Status", value: "Building", pulse: true },
  ] satisfies ProfileSummaryItem[],

  // Projects section heading and intro text
  projectsSection: {
    title: "Things I've built",
    description: "Small projects I made while learning. More on the way.",
  },

  about: [
    {
      hi: "About me",
      currently: "I’m learning TypeScript and improving my responsive design skills.",
      description: "I’ve been learning web development for the past year and a half. I started with HTML and CSS, then moved on to JavaScript, learning through practice and building projects. Today, I build interfaces with React and Tailwind CSS, and I’m learning TypeScript to use in my React projects.I use Git and GitHub for version control, Figma for interface design, and Vite for development and builds. My current focus is strengthening my JavaScript and React foundations while gaining more experience with TypeScript.",
      tech: ["React", "TypeScript", "JavaScript", "Tailwind", "HTML", "CSS"],
      tools: ["Git", "GitHub", "Figma", "Vite"],
    },
  ],

  // Contact section content and form
  contact: {
    email: "kaandeveloperr07@gmail.com",
    title: "Get in touch",
    hi: "Send Message",
    description:
      "Send a message about a project, a role, or another enquiry. I aim to reply within 24 hours.",

    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "Select a subject",
      subjectOptions: [
        { label: "Project Inquiry", value: "project" },
        { label: "Job Opportunity", value: "job" },
        { label: "Collaboration", value: "collaboration" },
        { label: "Other", value: "other" },
      ],
      messageLabel: "Message",
      messagePlaceholder: "What are you working on?",
      submitLabel: "Send message",
      submittingLabel: "Sending...",
      successMessage: "Your message has been sent.",
      errorMessage: "Something went wrong. Please try again.",
      privacyNote: "I use Supabase to store your message and Resend to send me an email notification.",
    },
  },
};
