import { useSite } from "../../hooks/useSite";
import Button from "../ui/Button";
import Pattern from "../ui/Pattern";
import Reveal from "../ui/Reveal";

const Hero = () => {
  const site = useSite();
  return (
    <section
      id="home"
      className="grid min-h-screen grid-cols-1 items-center gap-12 lg:grid-cols-2 relative isolate overflow-hidden px-6 py-14 md:px-10"
    >
      <Pattern />
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <Reveal>
                      <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-black lg:text-7xl">
  {site.name}
  <span className="block text-muted">{site.role}</span>
</h1>
          </Reveal>

          <Reveal>
            <p className="max-w-md text-base text-muted md:text-lg">
  {site.littleDesc}
</p>
          </Reveal>
        </div>

        <div className="flex gap-2">
          <Reveal>
                      <Button arrow link="#projects" variant="primary">
            {site.buttons.projectBtn}
          </Button>
          </Reveal>

          <Reveal>
                      <Button arrow link="#contact" variant="outline">
            {site.buttons.contactBtn}
          </Button>
          </Reveal>
        </div>
      </div>

      <div className="relative z-10"></div>
    </section>
  );
};

export default Hero;
