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
    { label: "Skills", target: "skills" },
    { label: "Contact", target: "contact" },
  ],

  // Stats strip under the hero
stats: [
  { icon: "status", label: "Status", value: "Building", pulse: true },
  { icon: "stack", label: "Stack", value: "React · TypeScript · Tailwind" },
  { icon: "tools", label: "Tools", value: "Vite · Git" },
  { icon: "location", label: "Location", value: "Turkey" },
],

  about: [
    {
      title: "ABOUT ME",
      hi: "About me",
      currently1: "Building my portfolio",
      currently2: "Learning React deeper",
      currently3: "Exploring 3D web experiences",
      description:
        "I'm a frontend developer focused on building clean, responsive, and interactive web experiences. I enjoy turning ideas into real products, exploring modern technologies, and constantly improving my skills. I care about writing maintainable code, creating thoughtful interfaces, and understanding how the things I build actually work.",
      tech: ["React", "TypeScript", "Tailwind"],
      github: "https://github.com/Kaan-Developer/Portfolio",
      live: "",
    },
  ],

  projects: [
    {
      title: "Portfolio",
      description: "The site you're looking at.",
      tech: ["React", "TypeScript", "Tailwind"],
      github: "https://github.com/Kaan-Developer/Portfolio",
      live: "",
    },
  ],
};