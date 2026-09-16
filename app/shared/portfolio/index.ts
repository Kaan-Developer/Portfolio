export type SkillCategory =
  | "language"
  | "frontend"
  | "styling"
  | "design"
  | "tool";

export type SkillLevel =
  | "learning"
  | "comfortable"
  | "advanced";

export interface PortfolioProfile {
  name: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  availability: string;
}

export interface PortfolioSkill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  featured: boolean;
  visible: boolean;
  icon: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  visible: boolean;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string;
  visible: boolean;
}

export interface PortfolioData {
  profile: PortfolioProfile;
  skills: PortfolioSkill[];
  projects: PortfolioProject[];
  socials: SocialLink[];
}

export const portfolioData: PortfolioData = {
  profile: {
    name: "Kaan Hamitler",

    title: "Frontend Developer",

    shortDescription:
      "I build modern, responsive and accessible web interfaces.",

    longDescription:
      "Frontend developer focused on transforming thoughtful designs into maintainable web experiences.",

    availability:
      "Available for selected projects",
  },

  skills: [
    {
      id: "javascript",
      name: "JavaScript",
      category: "language",
      level: "advanced",
      featured: true,
      visible: true,
      icon: "javascript",
    },
    {
      id: "typescript",
      name: "TypeScript",
      category: "language",
      level: "comfortable",
      featured: true,
      visible: true,
      icon: "typescript",
    },
    {
      id: "react",
      name: "React",
      category: "frontend",
      level: "comfortable",
      featured: true,
      visible: true,
      icon: "react",
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      category: "styling",
      level: "comfortable",
      featured: true,
      visible: true,
      icon: "tailwind",
    },
    {
      id: "figma",
      name: "Figma",
      category: "design",
      level: "advanced",
      featured: true,
      visible: true,
      icon: "figma",
    },
  ],

  projects: [],

  socials: [
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/Kaan-Developer",
      icon: "github",
      visible: true,
    },
  ],
};

export function getVisibleSkills(): PortfolioSkill[] {
  return portfolioData.skills.filter(
    (skill) => skill.visible,
  );
}

export function getFeaturedSkills(): PortfolioSkill[] {
  return portfolioData.skills.filter(
    (skill) =>
      skill.visible && skill.featured,
  );
}

export function getSkillsByCategory(
  category: SkillCategory,
): PortfolioSkill[] {
  return portfolioData.skills.filter(
    (skill) =>
      skill.visible &&
      skill.category === category,
  );
}

export function getVisibleProjects(): PortfolioProject[] {
  return portfolioData.projects.filter(
    (project) => project.visible,
  );
}

export function getVisibleSocials(): SocialLink[] {
  return portfolioData.socials.filter(
    (social) => social.visible,
  );
}

export function createAIContext(): string {
  const publicPortfolioInformation = {
    profile: portfolioData.profile,

    skills: getVisibleSkills().map((skill) => ({
      name: skill.name,
      category: skill.category,
      level: skill.level,
    })),

    projects: getVisibleProjects().map(
      (project) => ({
        title: project.title,
        description: project.description,
        technologies: project.technologies,
      }),
    ),

    socials: getVisibleSocials().map(
      (social) => ({
        label: social.label,
        url: social.url,
      }),
    ),
  };

  return JSON.stringify(
    publicPortfolioInformation,
    null,
    2,
  );
}