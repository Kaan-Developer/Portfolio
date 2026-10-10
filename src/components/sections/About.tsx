import RobotCanvas from "../Robot/RobotCanvas";
import { site } from "../../data/site";
import Button from "../ui/Button";

import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import type { IconType } from "react-icons";

const techIcons: Record<string, IconType> = {
  React: SiReact,
  TypeScript: SiTypescript,
  Tailwind: SiTailwindcss,
};

const About = () => {
  const about = site.about[0];

  const currently = [about.currently1, about.currently2, about.currently3];

  return (
    <section
      id="about"
      className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2"
    >
      <div className="flex flex-col justify-center gap-3 px-6 py-16 md:px-12">
        <h2 className="mt-4 text-4xl text-balance font-black leading-[0.95] tracking-[-0.05em] font-semibold tracking-tight md:text-6xl">
          {about.hi}
        </h2>

        <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-xl md:leading-8">
          {about.description}
        </p>

       <div className="max-w-md">

  <ul className="mt-4 flex flex-wrap gap-2">
    {about.tech.map((tech) => {
      const Icon = techIcons[tech];

      return (
        <li
          key={tech}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-sm font-medium text-ink"
        >
          {Icon && (
            <Icon
              size={16}
              className="shrink-0"
              aria-hidden="true"
            />
          )}
          {tech}
        </li>
      );
    })}
  </ul>
</div>

<div className="mt-8">
  <span className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
    Currently
  </span>

  {currently.map((current) => (
      <div className="mt-4 space-y-3" key={current}>
    <div className="flex items-center gap-3">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      <span className="text-md text-muted">
        {current}
      </span>
    </div>
  </div>
  ))}
  </div>

        <div className="mt-8 flex gap-3">
          <Button arrow link="#projects" target="" variant="blue">
            Projects
          </Button>

          <div className="flex lg:hidden">
            <Button arrow link={site.links.github} target="_blank">Github</Button>
          </div>
        </div>
      </div>

<div className="hidden min-h-[100vh] w-full md:block">
  <RobotCanvas sceneId={2} />
</div>
    </section>
  );
};

export default About;