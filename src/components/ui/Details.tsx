import { useParams } from "react-router-dom";

import { useSite } from "../../hooks/useSite";
import { techIcons } from "../../data/techIcons";

import NotFound from "../feedback/NotFound";
import Footer from "../sections/Footer";
import ScrollToTop from "./ScrollToTop";

const Details = () => {
  const { projects, projectDetails } = useSite();
  const { slug } = useParams();

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen relative bg-bg px-6 py-8 md:px-10">
      <article className="mx-auto mt-24 max-w-4xl">
        <h1 className="text-4xl font-bold">
          {project.title}
        </h1>

        <div className="relative py-4">
          <img
            src={project.image}
            alt={project.title}
            className="w-full object-contain border border-border rounded-md"
          />
        </div>

        <ul className="mt-2 flex flex-wrap gap-2">
          {project.tech.map((tech) => {
            const Icon = techIcons[tech];

            return (
              <li
                key={tech}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-2 text-xs font-medium text-ink"
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

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            {projectDetails.problem}
          </h2>

          <p className="mt-3 leading-7">
            {project.caseStudy.problem}
          </p>
        </section>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">
            {projectDetails.contribution}
          </h2>

          <p className="mt-3 leading-7">
            {project.caseStudy.contribution}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">
            {projectDetails.decisions}
          </h2>

          <ul className="mt-3 list-disc space-y-3 pl-5 leading-7">
            {project.caseStudy.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">
            {projectDetails.outcome}
          </h2>

          <p className="mt-3 leading-7">
            {project.caseStudy.outcome}
          </p>
        </div>

        <section className="mt-10 pt-8 border-t border-border">
          <h3 className="text-4xl font-semibold mb-4">
            {projectDetails.blogs}
          </h3>

          {project.blogs?.map((blog) => (
            <article key={blog.title} className="mb-8">
              <h3 className="text-xl font-semibold">
                {blog.title}
              </h3>

              <p className="mt-2 whitespace-pre-line leading-7 text-muted">
                {blog.content}
              </p>
            </article>
          ))}
        </section>
      </article>

      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Details;