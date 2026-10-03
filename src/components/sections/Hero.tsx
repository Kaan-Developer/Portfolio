import RobotCanvas from "../Robot/RobotCanvas";
import { site } from "../../data/site";

const Hero = () => {

    return (
    <section
            id="home"
            className="grid min-h-screen grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.8fr]relative min-h-screen overflow-hidden px-6 py-14 md:px-10"
          >
            <div>
              <span className="text-balance text-5xl lg:text-8xl font-black leading-[0.95] tracking-[-0.05em] tracking-tight">Hi, I'm
                <p>{site.name}</p>
              </span>
            </div>
          </section>
    );
};

export default Hero;