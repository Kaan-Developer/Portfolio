import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { ProfileSummaryItem } from "../types/site";

export interface SocialLink {
  name: string; // Platform adı (Örn: "GitHub")
  username: string; // Oradaki hesap adın (Örn: "@Kaan-Developer")
  href: string; // Profil linkin
  icon: IconType; // İkon bileşeni
  color?: string; // İsteğe bağlı özel renk/hover efekti
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    username: "@Kaan-Developer",
    href: "https://github.com/Kaan-Developer",
    icon: FaGithub,
    color: "#18181b",
  },
  {
    name: "LinkedIn",
    username: "in/kaan-hamitler",
    href: "https://www.linkedin.com/",
    icon: FaLinkedin,
    color: "#0a66c2",
  },
  {
    name: "X (Twitter)",
    username: "@kaan_dev",
    href: "https://x.com/",
    icon: FaXTwitter,
    color: "#000000",
  },
];

export const site = {
  name: "Kaan Hamitler",
  role: "Frontend Developer",
  status: "Building",

  littleDesc:
    "I build clean, useful interfaces with React, TypeScript and Tailwind CSS.",

  links: {
    github: "https://github.com/Kaan-Developer",
  },

  // Navbar links
  bubbles: [
    { label: "About", target: "about" },
    { label: "Projects", target: "projects" },
    { label: "Contact", target: "contact" },
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
    eyebrow: "Projects",
    title: "Things I've built",
    description: "Small projects I made while learning. More on the way.",
    comingSoon: "Next project coming soon",
  },

  about: [
    {
      title: "ABOUT ME",
      hi: "About me",
      currently1: "Building my portfolio",
      currently2: "Learning React deeper",
      currently3: "Exploring 3D web experiences",
      description: "I’ve been learning web development for the past year and a half. I started with HTML and CSS, then moved on to JavaScript, learning through practice and building projects. Today, I build interfaces with React and Tailwind CSS, and I’m learning TypeScript to use in my React projects.I use Git and GitHub for version control, Figma for interface design, and Vite for development and builds. My current focus is strengthening my JavaScript and React foundations while gaining more experience with TypeScript.",
      tech: ["React", "TypeScript", "JavaScript", "Tailwind", "HTML", "CSS"],
      github: "https://github.com/Kaan-Developer/Portfolio",
      live: "",
    },
  ],

  // Contact section content and form
  contact: {
    title: "Let's build something together.",
    hi: "Send Message",
    description:
      "Have a project in mind, a role to fill, or just want to say hi? Send a message and I'll get back to you.",

    form: {
      title: "Send a message",
      description: "I read everything. Tell me a little about what you need.",
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
      privacyNote: "Your details stay private — never shared or spam.",
    },
  },
};
