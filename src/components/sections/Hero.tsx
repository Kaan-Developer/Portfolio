import RobotCanvas from "../Robot/RobotCanvas";
import { site } from "../../data/site";

const Hero = () => {

    return (
    <section
            id="home"
            className="relative min-h-screen overflow-hidden px-6 py-14 md:px-10"
          >
            <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center justify-between text-center">
              {/* Header */}
              <div className="relative z-20 flex flex-col items-center pt-4 md:pt-8">
    
                <h1 className="max-w-6xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.05em] text-black sm:text-7xl md:text-8xl lg:text-9xl">
                  {site.name}
                </h1>
    
                <p className="mt-4 max-w-2xl text-balance text-sm leading-relaxed text-muted sm:text-base md:text-lg">
                  {site.intro}
                </p>
              </div>
    
              {/* 3D Robot */}
              <div className="absolute inset-x-0 bottom-[14vh] z-10 h-[42vh] md:bottom-[-4vh] md:h-[48vh]">
                <RobotCanvas sceneId={1} />
              </div>
            </div>
          </section>
    );
};

export default Hero;