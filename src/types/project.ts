export interface ProjectCaseStudy {
  problem: string;
  contribution: string;
  decisions: string[];
  outcome: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  github: string;
  live?: string;
  caseStudy: ProjectCaseStudy;
  blogs?: { title: string; content: string }[];
  slug: string;
}
