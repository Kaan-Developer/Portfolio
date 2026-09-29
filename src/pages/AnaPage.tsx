import { site } from "../data/site";
import RobotCanvas from "../components/Robot/RobotCanvas";

const AnaPage = () => {
  return (
    <main>
      <section
        id="home"
        className="relative min-h-screen overflow-hidden bg-bg px-6 py-10 md:px-10"
      >
        <div
          className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center justify-between text-center"
        >
          {/* Üst Başlık & Giriş Bilgileri */}
          <div className="relative z-20 flex flex-col items-center pt-4 md:pt-8">
            <span
              className="mb-3 inline-block rounded-full border border-primary/20 bg-primary-light px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm"
            >
              {site.role}
            </span>

            <h1
              className="max-w-6xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.05em] text-black sm:text-7xl md:text-8xl lg:text-9xl"
            >
              {site.name}
            </h1>

            <p
              className="mt-4 max-w-2xl text-balance text-sm leading-relaxed text-muted sm:text-base md:text-lg"
            >
              {site.intro}
            </p>
          </div>

          {/* 3D Robot Alanı */}
          <div className="absolute inset-x-0 bottom-[-13vh] z-10 h-[58vh] md:bottom-[-8vh] md:h-[64vh]">
            <RobotCanvas />
          </div>

          {/* Navigasyon Butonları */}
          <nav
            className="relative z-30 mb-2 flex max-w-3xl flex-wrap items-center justify-center gap-3 px-4 pb-4"
          >
            {site.bubbles.map((bubble) => (
              <a
                key={bubble.target}
                href={`#${bubble.target}`}
                className="
                  pointer-events-auto
                  rounded-full
                  border
                  border-black/5
                  bg-white/80
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-black
                  shadow-soft
                  backdrop-blur-md
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-primary-soft
                  hover:text-primary
                  hover:shadow-medium
                "
              >
                {bubble.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section id="about" className="min-h-screen">
        {/* About */}
      </section>

      <section id="projects" className="min-h-screen">
        {/* Projects */}
      </section>

      <section id="skills" className="min-h-screen">
        {/* Skills */}
      </section>

      <section id="contact" className="min-h-screen">
        {/* Contact */}
      </section>
    </main>
  );
};

export default AnaPage;