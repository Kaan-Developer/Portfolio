import { useSite } from "../../hooks/useSite";
import { techIcons } from "../../data/techIcons";

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";

import Button from "../ui/Button";

interface projectBtnType {
  hideDetails?: boolean;
}

const Projects = ({ hideDetails = false }: projectBtnType) => {
  const site = useSite();
  const projects = site.projects;
  const { title, description } = site.projectsSection;

  return (
    <section id="projects" className="py-10 md:py-14">
      <Reveal className="mb-10 max-w-xl">
        <h2 className="mt-4 text-balance text-4xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl">
          {title}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-xl md:leading-8">
          {description}
        </p>
      </Reveal>

      <div className="flex gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <Reveal key={project.slug}>
            <article className="grid grid-cols-1 md:grid-cols-2 rounded-3xl p-3 shadow-soft transition-shadow duration-200 hover:shadow-medium motion-reduce:transition-none">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="aspect-[16/10] md:h-full object-contain w-full rounded-md bg-muted/10 p-6 md:p-0 md:aspect-auto"
              />

              <div className="flex flex-col justify-center gap-3 pt-5 md:p-8">
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <h3 className="text-balance text-2xl font-bold tracking-tight lg:text-4xl">
                    {project.title}
                  </h3>
                </div>

                <p className="max-w-md text-lg leading-7 text-muted lg:text-xl">
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => {
                      const Icon = techIcons[tech];

                      return (
                        <li
                          key={tech}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-ink"
                        >
                          {Icon && (
                            <Icon
                              size={14}
                              className="shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          {tech}
                        </li>
                      );
                    })}
                  </ul>

                <div className="flex items-center flex-wrap gap-3 pt-2">
                  <Button arrow link={project.github} target="_blank">
                    GitHub
                  </Button>
                  {project.live && (
                    <Button
                      arrow
                      link={project.live}
                      target="_blank"
                      variant="outline"
                    >
                      Live demo
                    </Button>
                  )}

                  {!hideDetails && (
                    <Link
                      to={`/projects/${project.slug}`}
                      aria-label={`View details for ${project.title}`}
                      className="group inline-flex h-12 w-full shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-md border border-border-strong bg-white px-5 text-sm font-medium tracking-tight text-ink transition-[background-color,border-color,color] duration-200 hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none sm:w-auto"
                    >
                      {site.buttons.viewDetailsBtn}
                      <ArrowRight
                        size={18}
                        strokeWidth={1.75}
                        aria-hidden="true"
                        className="shrink-0 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Projects;
