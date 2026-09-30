import { site } from "../data/site";
import RobotCanvas from "../components/Robot/RobotCanvas";
import Navbar from "../components/ui/Navbar";

const AnaPage = () => {
  return (
    <main>
      <Navbar />
      <section
        id="home"
        className="relative min-h-screen overflow-hidden px-6 py-10 md:px-10"
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
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2"
      >
        <div className="flex flex-col justify-center gap-3 px-6 py-16 md:px-12">
          <span className="text-4xl font-black leading-[0.95] tracking-[-0.05em] text-black sm:text-6xl md:text-7xl lg:text-8xl">
            {site.role1}
          </span>
          <span className="text-4xl font-black leading-[0.95] tracking-[-0.05em] text-black sm:text-6xl md:text-7xl lg:text-8xl">
            {site.role2}
          </span>

          <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {site.about[0].description}
          </p>
        </div>

        <div className="min-h-[500px] w-full">
          <RobotCanvas sceneId={2} />
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="min-h-screen">
        {/* Projects */}
      </section>

      {/* SKILLS */}
      <section id="skills" className="min-h-screen">
        {/* Skills */}
      </section>

      {/* CONTACT */}
      <section id="contact" className="min-h-screen">
        {/* Contact */}
      </section>
    </main>
  );
};

export default AnaPage;
