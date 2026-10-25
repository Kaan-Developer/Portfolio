import { useSite } from "../../hooks/useSite";
import Button from "../ui/Button";
import clsx from "clsx";
import Reveal from "../ui/Reveal";

import Stacks from "./Stacks";

const About = () => {
  const site = useSite();

  const about = site.about[0];

  return (
    <section
      id="about"
      className="grid w-full grid-cols-1 gap-10 py-10 md:py-14 lg:gap-16"
    >
      <div className="flex min-w-0 flex-col gap-3">
        <Reveal className="flex min-w-0 flex-col gap-3">
          <h2 className="text-4xl text-balance font-black leading-[0.95] tracking-[-0.05em] tracking-tight md:text-6xl">
            {about.hi}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-black md:text-xl md:leading-8">
            {about.description}
          </p>
          <p className="text-muted max-w-md">{about.description2}</p>

          <div className="flex flex-col mt-6 gap-4">
            <span className="text-black text-md font-semibold">
              {about.techTitle}
            </span>
            <ul className="flex flex-wrap gap-3">
              {about.tech.map((tech) => (
                <li
                  key={tech}
                  className="inline-flex items-center rounded-md border border-border bg-black/[0.03] px-4 py-2 text-sm font-medium text-ink"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
              <Button arrow link={site.links.github} target="_blank">
                Github
              </Button>
          </div>
        </Reveal>
        <div className="mt-8 border-t border-border pt-8 lg:hidden"></div>
      </div>

      <div className="hidden w-full min-w-0 self-start lg:grid">
        <div className="relative grid w-full">
          <div
            className={clsx(
              "col-start-1 row-start-1 aspect-square max-h-[480px] w-full bg-bg",
              "invisible pointer-events-none absolute inset-0",
            )}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default About;
