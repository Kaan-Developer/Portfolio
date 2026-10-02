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

  return (
    <section
      id="about"
      className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2"
    >
      <div className="flex flex-col justify-center gap-3 px-6 py-16 md:px-12">
        <h2 className="mt-4 text-3xl text-balance font-black leading-[0.95] tracking-[-0.05em] font-semibold tracking-tight md:text-5xl">
          {about.hi}
        </h2>

        <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
          {about.description}
        </p>

<div className="mt-8">
  <span className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
    Currently
  </span>

  <div className="mt-4 space-y-3">
    <div className="flex items-center gap-3">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      <span className="text-sm text-muted">
        Building my portfolio
      </span>
    </div>

    <div className="flex items-center gap-3">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      <span className="text-sm text-muted">
        Learning React deeper
      </span>
    </div>

    <div className="flex items-center gap-3">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      <span className="text-sm text-muted">
        Exploring 3D web experiences
      </span>
    </div>
  </div>
</div>

        <div className="mt-8">
          <Button arrow>
            Projects
          </Button>
        </div>
      </div>

      <div className="min-h-[500px] w-full">
        <RobotCanvas sceneId={2} />
      </div>
    </section>
  );
};

export default About;