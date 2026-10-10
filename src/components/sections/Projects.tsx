import { site } from "../../data/site";
import { projects } from "../../data/projects";
import { techIcons } from "../../data/techIcons";


import Button from "../ui/Button";

const Projects = () => {
  const { title, description } = site.projectsSection;

  return (
    <section id="projects" className="px-6 py-20 md:px-10 md:py-28">
      <div className="mb-10 max-w-xl">
        <h2 className="mt-4 text-balance text-4xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl">
          {title}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-xl md:leading-8">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="grid lg:grid-cols-2 rounded-3xl border border-border bg-white p-3 shadow-soft transition-shadow duration-200 hover:shadow-medium motion-reduce:transition-none"
            >
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="aspect-[16/10] w-full rounded-2xl bg-primary-light object-contain p-6 md:aspect-auto md:h-full"
              />

              <div className="flex flex-col justify-center gap-3 px-3 pb-3 pt-5 md:p-8">
                <h3 className="text-balance text-2xl font-bold tracking-tight lg:text-4xl">
                  {project.title}
                </h3>

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

                <div className="flex flex-wrap gap-3 pt-2">
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
                </div>
              </div>

{/*                             <img
                src={project.image}
                alt={`${project.title} preview`}
                className="aspect-[16/10] w-full rounded-2xl bg-primary-light object-contain p-6 md:aspect-auto md:h-full"
              />

              <div className="flex flex-col justify-center gap-3 px-3 pb-3 pt-5 md:p-8">
                <h3 className="text-balance text-2xl font-bold tracking-tight lg:text-4xl">
                  {project.title}
                </h3>

                <p className="max-w-md text-lg leading-7 text-muted lg:text-xl">
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-2">
                </ul>

                <div className="flex flex-wrap gap-3 pt-2">
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
                </div>
              </div> */}
            </article>
          ))}

      </div>
    </section>
  );
};

export default Projects;
