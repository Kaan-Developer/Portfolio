import { useState } from "react";

import RobotCanvas from "../Robot/RobotCanvas";
import { site } from "../../data/site";
import { techIcons } from "../../data/techIcons";
import Button from "../ui/Button";
import clsx from "clsx";
import { Pause, Play } from "lucide-react";

const About = () => {
  const [showStacks, setShowStacks] = useState(false);
  const [isMotionPaused, setIsMotionPaused] = useState(false);

  const about = site.about[0];

  const groups = [
    {
      title: "Stacks",
      items: about.tech,
      duration: 36,
      direction: "normal" as const,
    },
    {
      title: "Tools",
      items: about.tools,
      duration: 42,
      direction: "reverse" as const,
    },
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
            arrow
            variant="primary"
            onClick={() => setShowStacks((previous) => !previous)}
          >
            Stacks
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
            className={clsx("col-start-1 row-start-1 h-[70vh] min-h-[38rem] w-full self-center", {
              "invisible pointer-events-none": showStacks,
            })}
            aria-hidden={showStacks}
            inert={showStacks}
          >
            <RobotCanvas sceneId={2} />
          </div>

          <div
            className={clsx(
              "skills-orbits col-start-1 row-start-1 flex items-center justify-center px-4 py-10",
              {
                "invisible pointer-events-none": !showStacks,
              },
            )}
            aria-hidden={!showStacks}
            inert={!showStacks}
            data-paused={isMotionPaused || !showStacks}
          >
            <div className="w-full max-w-xl select-none">
              {groups.map((group) => (
                <section
                  key={group.title}
                  className="relative grid h-88 place-items-center first:mb-12"
                >
                  <h3 className="text-3xl text-primary-soft font-semibold tracking-tight">
                    {group.title}
                  </h3>

                  <ul className="absolute inset-0" aria-label={group.title}>
                    {group.items.map((name, index) => {
                      const Icon = techIcons[name];

                      return (
                        <li
                          key={name}
                          className="skill-orbit__item flex flex-col items-center justify-center gap-1 rounded-full border border-white/10 bg-black text-white shadow-soft"
                          style={{
                            offsetDistance: `${(index * 100) / group.items.length}%`,
                            animationDuration: `${group.duration}s`,
                            animationDelay: `${-(index * group.duration) / group.items.length}s`,
                            animationDirection: group.direction,
                          }}
                        >
                          <Icon size={28} aria-hidden="true" />
                          <span className="text-[11px] font-medium leading-4 tracking-tight">
                            {name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}

              <button
                type="button"
                onClick={() => setIsMotionPaused((previous) => !previous)}
                className="mx-auto mt-3 flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-muted transition-colors hover:text-ink motion-reduce:hidden"
              >
                {isMotionPaused ? (
                  <Play size={12} aria-hidden="true" />
                ) : (
                  <Pause size={12} aria-hidden="true" />
                )}
                {isMotionPaused ? "Resume animation" : "Pause animation"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
