import { useState } from "react";
import { ChevronRight } from "lucide-react";

import RobotCanvas from "../Robot/RobotCanvas";
import { site } from "../../data/site";
import Button from "../ui/Button";
import clsx from "clsx";

import Stacks from "./Stacks";

const About = () => {
  const [showStacks, setShowStacks] = useState(false);

  const about = site.about[0];

  return (
    <section
      id="about"
      className="grid w-full grid-cols-1 md:grid-cols-2"
    >
      <div className="flex flex-col justify-center gap-3 px-6 py-10 md:px-12 md:py-14">
        <h2 className="mt-4 text-4xl text-balance font-black leading-[0.95] tracking-[-0.05em] tracking-tight md:text-6xl">
          {about.hi}
        </h2>

        <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-xl md:leading-8">
          {about.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button arrow link="#projects" target="" variant="blue">
            Projects
          </Button>
          <button
            type="button"
            aria-expanded={showStacks}
            aria-controls="about-stacks"
            className="hidden md:flex group h-12 items-center justify-center gap-2 rounded-full px-7 cursor-pointer whitespace-nowrap text-sm font-medium tracking-tight transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 bg-black text-white hover:bg-ink"
            onClick={() => setShowStacks((previous) => !previous)}
          >
            Stacks
            <ChevronRight
              size={18}
              aria-hidden="true"
              className={clsx(
                "transition-transform duration-200 motion-reduce:transition-none",
                { "rotate-90": showStacks },
              )}
            />
          </button>

          <div className="flex lg:hidden">
            <Button arrow link={site.links.github} target="_blank">
              Github
            </Button>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 md:hidden">
          <Stacks />
        </div>
      </div>

      <div className="hidden w-full items-center md:flex">
        <div className="grid w-full">
          <div
            className={clsx(
              "col-start-1 row-start-1 h-[70vh] w-full self-center bg-[#F8FAFC]",
              {
                "invisible pointer-events-none": showStacks,
              },
            )}
            aria-hidden={showStacks}
            inert={showStacks}
          >
            <RobotCanvas sceneId={2} />
          </div>
          <div
            id="about-stacks"
            className={clsx(
              "col-start-1 row-start-1 flex items-center justify-center px-6 py-8 lg:px-10",
              { "invisible pointer-events-none": !showStacks },
            )}
            aria-hidden={!showStacks}
            inert={!showStacks}
          >
            <Stacks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
