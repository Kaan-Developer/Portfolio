import { ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { Project } from "../types/project";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-panel border border-border-strong bg-surface-elevated shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-card-hover">
      <div className="border-b border-border bg-background-deep/60 p-2 pb-0">
        <div className="aspect-[16/10] overflow-hidden rounded-t-xl border border-b-0 border-border bg-background-deep">
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <h3 className="text-lg font-semibold tracking-[-0.025em] text-text-primary">
          {project.title}
        </h3>

        <p className="mt-0.5 text-xs font-medium text-accent">
          {project.category}
        </p>

        <p className="mt-3 text-sm leading-6 text-text-muted">
          {project.description}
        </p>

        <ul
          className="mt-4 flex flex-wrap gap-2"
          aria-label={`${project.title} technologies`}
        >
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-pill border border-border bg-surface px-2.5 py-1 text-[0.65rem] font-medium text-text-secondary"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={project.projectUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between border-t border-border px-4 py-3.5 text-sm font-medium text-accent transition-colors duration-200 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        aria-label={`${project.title} projesini yeni sekmede aç`}
      >
        <span className="flex items-center gap-2">
          <FaGithub className="h-4 w-4" aria-hidden="true" />
          <span>View on GitHub</span>
        </span>
        <ArrowRight
          size={17}
          strokeWidth={1.7}
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </a>
    </article>
  );
};

export default ProjectCard;
