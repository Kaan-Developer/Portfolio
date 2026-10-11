import { useState } from "react";
import { ChevronRight } from "lucide-react";

import RobotCanvas from "../Robot/RobotCanvas";
import { site } from "../../data/site";
import { techIcons } from "../../data/techIcons";
import Button from "../ui/Button";
import clsx from "clsx";

const About = () => {
  const [showStacks, setShowStacks] = useState(false);

  const about = site.about[0];

  const groups = [
    { title: "Technologies", items: about.tech },
    { title: "Tools", items: about.tools },
  ];

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

        <div className="mt-8 flex gap-3">
          <Button arrow link="#projects" target="" variant="blue">
            Projects
          </Button>
          <Button
            variant="primary"
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
          </Button>

          <div className="flex lg:hidden">
            <Button arrow link={site.links.github} target="_blank">
              Github
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden min-h-screen w-full items-center md:flex">
        <div className="grid w-full">
          <div
            className={clsx(
              "col-start-1 row-start-1 h-[70vh] w-full self-center",
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
            className={clsx(
              "col-start-1 row-start-1 flex items-center justify-center px-6 py-8 lg:px-10",
              {
                "invisible pointer-events-none": !showStacks,
              },
            )}
            aria-hidden={!showStacks}
            inert={!showStacks}
          >
            <div className="w-full max-w-xl">
              <h2 className="mb-3 text-3xl font-semibold leading-[0.95] tracking-tight text-balance md:text-5xl">
                What I work with
              </h2>

              {groups.map((group) => (
                <section
                  key={group.title}
                  className="py-7 first:border-b first:border-border first:pt-0 last:pb-0"
                >
                  <h3 className="mb-6 text-2xl font-bold tracking-tight">
                    {group.title}
                  </h3>

                  <ul className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-3">
                    {group.items.map((name) => {
                      const Icon = techIcons[name];

                      return (
                        <li key={name} className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black p-2 text-white">
                            <Icon
                              size={24}
                              className="shrink-0"
                              aria-hidden="true"
                            />
                          </div>
                          <span className="text-sm font-medium text-ink">
                            {name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
