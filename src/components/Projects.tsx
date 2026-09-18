import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/project";

const Projects = () => {
  return (
    <section aria-labelledby="projects-heading">
      <SectionHeading
        id="projects-heading"
        title="Selected Projects"
        description="Projects will appear here when their demos, repositories and explanations are ready."
      />

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;

