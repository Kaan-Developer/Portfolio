import RobotCanvas from "../Robot/RobotCanvas";
import { site } from "../../data/site";
import { techIcons } from "../../data/techIcons";
import Button from "../ui/Button";

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

        <div className="mt-5 max-w-xl border-t border-border pt-4">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">
            What I use
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-ink">
            {about.tech.map((tech, index) => {
              const Icon = techIcons[tech];

              return (
                <li key={tech} className="inline-flex items-center gap-2">
                  {index > 0 && (
                    <span className="text-subtle" aria-hidden="true">
                      ·
                    </span>
                  )}
                  {Icon && (
                    <Icon
                      size={15}
                      className="text-subtle"
                      aria-hidden="true"
                    />
                  )}
                  <span>{tech}</span>
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
