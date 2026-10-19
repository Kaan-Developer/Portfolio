import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../../data/projects";
import NotFound from "../feedback/NotFound";
import { techIcons } from "../../data/techIcons";

const Details = () => {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen relative bg-bg px-6 py-8 md:px-10">
      <Link
        to="/#projects"
        aria-label="Projelere dön."
        className="inline-flex fixed top-8 left-6 z-50 size-12 items-center justify-center rounded-full bg-white text-black shadow-sm transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:left-10"
      >
        <ArrowLeft size={24} strokeWidth={1.75} aria-hidden="true" />
      </Link>

      <article className="mx-auto mt-10 max-w-4xl">
        <h1 className="text-4xl font-bold">{project.title}</h1>

        {project.image && (
          <img
            src={project.image}
            alt={`${project.title} proje görünümü.`}
            className="mt-8 w-full rounded-2xl"
          />
        )}

        <ul className="mt-2 flex flex-wrap gap-2">
          {project.tech.map((tech) => {
            const Icon = techIcons[tech];

            return (
              <li
                key={tech}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-3 py-1 text-xs font-medium text-ink"
              >
                {Icon && (
                  <Icon size={14} className="shrink-0" aria-hidden="true" />
                )}
                {tech}
              </li>
            );
          })}
        </ul>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">The Problem</h2>
          <p className="mt-3 leading-7">{project.caseStudy.problem}</p>
        </section>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">What I build</h2>
          <p className="mt-3 leading-7">{project.caseStudy.contribution}</p>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Technical decisions</h2>
          <p className="mt-3 leading-7">{project.caseStudy.decisions}</p>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Result</h2>
          <p className="mt-3 leading-7">{project.caseStudy.outcome}</p>
        </div>

        <section className="mt-10 pt-8 border-t border-border">
          <h3 className="text-4xl font-semibold mb-4">Blogs</h3>
          {project.blogs?.map((blog) => (
            <article key={blog.title} className="mb-8">
              <h3 className="text-xl font-semibold">{blog.title}</h3>

              <p className="mt-2 whitespace-pre-line leading-7 text-muted">
                {blog.content}
              </p>
            </article>
          ))}
        </section>
      </article>
    </main>
  );
};

export default Details;
