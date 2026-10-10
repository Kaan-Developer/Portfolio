export interface ProjectCaseStudy {
  context: string;
  problem: string;
  contribution: string;
  decisions: string[];
  challenges: string[];
  outcome: string;
  evidence: {
    screenshots: string[];
    checks: string[];
    checkedOn: string;
    automatedTests: string;
    limitations: string[];
  };
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  github: string;
  live?: string;
  caseStudy: ProjectCaseStudy;
}
