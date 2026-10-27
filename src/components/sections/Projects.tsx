import { useSite } from "../../hooks/useSite";
import { techIcons } from "../../data/techIcons";
import { useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";
import Zoom from "../ui/Zoom";

import Button from "../ui/Button";

interface projectBtnType {
  hideDetails?: boolean;
}

const Projects = ({ hideDetails = false }: projectBtnType) => {
  const site = useSite();
  const projects = site.projects;
  const { title, description } = site.projectsSection;

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const slider = sliderRef.current;
  if (!slider) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  let drag: {
    id: number;
    x: number;
    left: number;
    moved: boolean;
  } | null = null;

  const handleDown = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    if (slider.scrollWidth <= slider.clientWidth) return;

    if (
      event.target instanceof Element &&
      event.target.closest("a, button, input, textarea, select")
    ) return;

    const contentBottom =
      slider.getBoundingClientRect().top +
      slider.clientTop +
      slider.clientHeight;

    if (event.clientY >= contentBottom) return;

    slider.scrollTo({
      left: slider.scrollLeft,
      behavior: "instant",
    });

    drag = {
      id: event.pointerId,
      x: event.clientX,
      left: slider.scrollLeft,
      moved: false,
    };

    event.preventDefault();
    slider.setPointerCapture(event.pointerId);
    slider.dataset.dragging = "true";
  };

  const handleMove = (event: PointerEvent) => {
    if (!drag || event.pointerId !== drag.id) return;

    const distance = event.clientX - drag.x;
    if (!drag.moved && Math.abs(distance) < 5) return;

    drag.moved = true;

    slider.scrollTo({
      left: drag.left - distance,
      behavior: "instant",
    });
  };

  const handleEnd = (event: PointerEvent) => {
    if (!drag || event.pointerId !== drag.id) return;

    const shouldSnap = drag.moved && event.type === "pointerup";

    drag = null;
    delete slider.dataset.dragging;

    if (slider.hasPointerCapture(event.pointerId)) {
      slider.releasePointerCapture(event.pointerId);
    }

    const card = slider.firstElementChild;
    if (!shouldSnap || !(card instanceof HTMLElement)) return;

    const gap = parseFloat(getComputedStyle(slider).columnGap) || 0;
    const step = card.getBoundingClientRect().width + gap;

    if (step <= 0) return;

    slider.scrollTo({
      left: Math.round(slider.scrollLeft / step) * step,
      behavior: reduceMotion.matches ? "instant" : "smooth",
    });
  };

  slider.addEventListener("pointerdown", handleDown);
  slider.addEventListener("pointermove", handleMove);
  slider.addEventListener("pointerup", handleEnd);
  slider.addEventListener("pointercancel", handleEnd);
  slider.addEventListener("lostpointercapture", handleEnd);

  return () => {
    slider.removeEventListener("pointerdown", handleDown);
    slider.removeEventListener("pointermove", handleMove);
    slider.removeEventListener("pointerup", handleEnd);
    slider.removeEventListener("pointercancel", handleEnd);
    slider.removeEventListener("lostpointercapture", handleEnd);
    delete slider.dataset.dragging;
  };
}, []);

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

<div
  ref={sliderRef}
  className="lg:flex cursor-grab gap-4 lg:overflow-x-auto lg:py-3 data-[dragging=true]:cursor-grabbing data-[dragging=true]:select-none md:gap-6"
  data-lenis-prevent
  role="region"
  aria-label={title}
  tabIndex={0}
>
        {projects.map((project) => (
          <Reveal
            key={project.slug}
            className={`min-w-0 shrink-0 ${projects.length > 1 ? "w-[84%] md:w-[90%]" : "w-full"}`}
          >
            <article className="grid h-full bg-white grid-cols-1 md:grid-cols-2 rounded-3xl p-3 shadow-soft transition-shadow duration-200 hover:shadow-medium motion-reduce:transition-none">
              <div className="relative self-center">
                <img
                draggable={false}
                src={project.image}
                alt={project.title}
                className="aspect-[16/10] w-full rounded-md border border-border bg-muted/10 object-contain"
              />

              {project.image && (
              <Zoom src={project.image} alt={project.title} />
              )}
              </div>

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
                  <Button github link={project.github} target="_blank">
                    Github
                  </Button>
                  {project.live && (
                    <Button
                      arrow
                      link={project.live}
                      target="_blank"
                      variant="outline"
                    >
                      {site.buttons.liveDemoBtn}
                    </Button>
                  )}

                  {!hideDetails && (
                    <Link
                      to={`/projects/${project.slug}`}
                      aria-label={`${site.buttons.viewDetailsBtn}: ${project.title}`}
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
