export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: readonly string[];
  projectUrl: string;
}