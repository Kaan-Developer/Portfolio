import RobotCanvas from "../Robot/RobotCanvas";
import { site } from "../../data/site";
import Button from "../ui/Button";

const Hero = () => {

    return (
    <section
            id="home"
            className="grid min-h-screen grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.8fr]relative min-h-screen overflow-hidden px-6 py-14 md:px-10"
          >
            <div className="flex flex-col gap-4">
              <span className="text-balance text-5xl lg:text-8xl font-black leading-[0.95] tracking-[-0.05em] tracking-tight">Hi, I'm
                <p>{site.name}</p>
              </span>
              <p className="text-md md:text-lg text-muted max-w-md">{site.littleDesc}</p>

              <div>
                                          <Button arrow link="#contact" target="">Contact me</Button>
              </div>

            </div>
          </section>
    );
};

export default Hero;