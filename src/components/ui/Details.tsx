import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSite } from "../../hooks/useSite";
import NotFound from "../feedback/NotFound";
import { techIcons } from "../../data/techIcons";
import Footer from "../sections/Footer";
import { useEffect, useLayoutEffect, useState } from "react";
import Language from "./Language";
import ScrollToTop from "./ScrollToTop";
import Button from "./Button";

const Details = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const { projects, projectDetails, dashbord, accessibility } = useSite();
  const { slug } = useParams();
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [slug]);
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen relative bg-bg px-6 py-8 md:px-10">
      <header
        className="fixed top-5 md:top-6 left-1/2 z-50 isolate
    flex h-20 w-[calc(100%-3rem)] max-w-6xl -translate-x-1/2 items-center justify-between
    rounded-2xl px-4 sm:px-6 lg:px-8"
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 rounded-2xl border
    transition-[background-color,border-color,box-shadow] duration-200
    motion-reduce:transition-none ${
      isScrolled
        ? "border-border bg-bg/95 supports-[backdrop-filter]:bg-bg/80 backdrop-blur-md shadow-soft"
        : "border-transparent bg-transparent"
    }`}
        />
        <Link
          to="/"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-black px-4 md:px-7 text-sm font-medium tracking-tight whitespace-nowrap text-white transition-[background-color,transform] duration-200 ease-out hover:bg-ink active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          <span className="hidden md:flex">{dashbord.backto}</span>
        </Link>

        <div className="flex items-center gap-2">
          <Language />

          <Button
            github
            target="_blank"
            iconSize={20}
            aria-label={`GitHub ${accessibility.opensInNewTab}`}
            link="https://github.com/Kaan-Developer"
          >
            <span className="hidden md:ml-2 md:inline">GitHub</span>
          </Button>
        </div>
      </header>

      <article className="mx-auto mt-24 max-w-4xl">
        <h1 className="text-4xl font-bold">{project.title}</h1>

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
                  <Icon size={14} className="shrink-0" aria-hidden="true" />
                )}
                {tech}
              </li>
            );
          })}
        </ul>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">{projectDetails.problem}</h2>
          <p className="mt-3 leading-7">{project.caseStudy.problem}</p>
        </section>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">
            {projectDetails.contribution}
          </h2>
          <p className="mt-3 leading-7">{project.caseStudy.contribution}</p>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">{projectDetails.decisions}</h2>
          <ul className="mt-3 list-disc space-y-3 pl-5 leading-7">
            {project.caseStudy.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">{projectDetails.outcome}</h2>
          <p className="mt-3 leading-7">{project.caseStudy.outcome}</p>
        </div>

        <section className="mt-10 pt-8 border-t border-border">
          <h3 className="text-4xl font-semibold mb-4">
            {projectDetails.blogs}
          </h3>
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

      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Details;
