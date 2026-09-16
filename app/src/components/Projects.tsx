import { ArrowUpRight, Bot } from "lucide-react";
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

      {projects.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-panel border border-border-strong bg-surface-elevated p-6 shadow-panel sm:p-8">
          <div className="flex max-w-2xl flex-col items-start">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
              <Bot size={24} aria-hidden="true" />
            </span>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-text-primary">
              AI chatbot project
            </h3>
            <p className="mt-3 text-sm leading-6 text-text-muted">
              I&apos;m currently building and documenting this project. I&apos;ll
              publish it here when the repository, live experience and technical
              decisions are ready to show together.
            </p>
            <a
              href="https://github.com/Kaan-Developer"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Follow progress on GitHub
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
