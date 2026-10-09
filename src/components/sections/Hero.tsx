import { site } from "../../data/site";
import Button from "../ui/Button";

const Hero = () => {
  return (
    <section
      id="home"
      className="grid min-h-screen grid-cols-1 items-center gap-12 lg:grid-cols-2 relative min-h-screen overflow-hidden px-6 py-14 md:px-10"
    >
      <div className="flex flex-col gap-4">
        <div>
                  <span className="text-2xl lg:5xl text-primary-soft">Hi, I'm</span>
          <h1 className="text-balance flex flex-col text-5xl lg:text-8xl font-black leading-[0.95] tracking-[-0.05em] tracking-tight">{site.name}</h1>
        </div>


        <p className="text-md md:text-lg text-muted max-w-md">
          {site.littleDesc}
        </p>

        <div className="flex gap-2">
          <Button arrow link="#projects" variant="blue" >
            Projects
          </Button>
          <Button arrow link="#contact" variant="outline">
            Contact me
          </Button>
        </div>
      </div>

      <div>

      </div>
    </section>
  );
};

export default Hero;
