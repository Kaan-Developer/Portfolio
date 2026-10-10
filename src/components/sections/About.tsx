import { useState } from "react";

import RobotCanvas from "../Robot/RobotCanvas";
import { site } from "../../data/site";
import { techIcons } from "../../data/techIcons";
import Button from "../ui/Button";

const About = () => {
  const [showStacks, setShowStacks] = useState(false);

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

        <div className="mt-8 flex gap-3">
          <Button arrow link="#projects" target="" variant="blue">
            Projects
          </Button>
          <Button arrow variant="primary">
            Stacks
          </Button>

          <div className="flex lg:hidden">
            <Button onClick={() => setShowStacks((previous => !previous))} arrow link={site.links.github} target="_blank">
              Github
            </Button>
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
