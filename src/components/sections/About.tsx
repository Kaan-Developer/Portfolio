import { useState } from "react";
import { useSite } from "../../hooks/useSite";
import Button from "../ui/Button";
import clsx from "clsx";

import Stacks from "./Stacks";

const About = () => {
  const site = useSite();
  const [showStacks] = useState(false);

  const about = site.about[0];

  return (
    <section
      id="about"
      className="grid w-full grid-cols-1 lg:grid-cols-2 gap-10
      px-6 py-10 md:px-12 md:py-14 lg:gap-16"
    >
      <div className="flex min-w-0 flex-col gap-3">
        <h2 className="text-4xl text-balance font-black leading-[0.95] tracking-[-0.05em] tracking-tight md:text-6xl">
          {about.hi}
        </h2>

        <p className="mt-5 max-w-lg text-base leading-7 text-black md:text-xl md:leading-8">
          {about.description}
        </p>

        <p className="text-muted max-w-md">{about.description2}</p>
        

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="flex lg:hidden">
            <Button arrow link={site.links.github} target="_blank">
              Github
            </Button>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 lg:hidden">
          <Stacks />
        </div>
      </div>

      <div className="hidden w-full min-w-0 self-start lg:grid">
        <div className="relative grid w-full">
          <div
            className={clsx(
              "col-start-1 row-start-1 aspect-square max-h-[480px] w-full bg-bg",
              {
                "invisible pointer-events-none absolute inset-0": showStacks,
              },
            )}
            aria-hidden={showStacks}
            inert={showStacks}
          >
          </div>
          <div
            id="about-stacks"
            className={clsx(
              "col-start-1 row-start-1 flex min-w-0 items-start gap-3",
            )}
          >
            <Stacks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
