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
}

const About = () => {
  const about = site.about[0];

    return (
        <section
        id="about"
        className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2"
      >
        <div className="flex flex-col justify-center gap-3 px-6 py-16 md:px-12">
          <span className="text-primary font-medium text-md tracking-[0.16em]">{site.about[0].title}</span>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#111111] md:text-5xl">
            {site.about[0].hi}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-[#71717a] md:text-lg md:leading-8">
            {site.about[0].description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {about.tech.map((tech) => {
              const Icon = techIcons[tech];

              return (
                 <div
                key={tech}
                className="flex items-center gap-2 rounded-full border border-[#e7e5eb] bg-[#f1edff] px-4 py-2 text-sm font-medium text-[#18181b]"
              >
                {Icon && (
                  <Icon
                    size={18}
                    className="text-primary"
                  />
                )}

                <span>{tech}</span>
              </div>
              )
            })}
          </div>

           <div className="mt-8">
          <Button
            children="GitHub"
          />
        </div>

        </div>

        <div className="min-h-[500px] w-full">
          <RobotCanvas sceneId={2} />
        </div>
        </section>
    )
}

export default About;