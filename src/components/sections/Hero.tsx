import { useSite } from "../../hooks/useSite";
import Button from "../ui/Button";
import Pattern from "../ui/Pattern";
import Reveal from "../ui/Reveal";
import Heroİmage from "../../assets/images/portfolioHero.png";

const Hero = () => {
  const site = useSite();

  return (
    <section
      id="home"
      className="relative min-h-screen items-center gap-12 overflow-hidden pt-32 mt-24 pb-8"
    >
      <Pattern />

      <Reveal className="relative z-10 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl text-center font-semibold leading-[1.02] tracking-[-0.03em] text-black lg:text-7xl">
            {site.name}
            <span className="block text-muted">{site.role}</span>
          </h1>

          <p className="text-base text-muted md:text-lg text-center">
            {site.littleDesc}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <Button arrow link="#projects" variant="primary">
            {site.buttons.projectBtn}
          </Button>

          <Button arrow link="#contact" variant="outline">
            {site.buttons.contactBtn}
          </Button>
        </div>
      </Reveal>
    </section>
  );
};

export default Hero;