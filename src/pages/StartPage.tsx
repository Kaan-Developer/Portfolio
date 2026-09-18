import Skills from "../components/Skills";
import Projects from "../components/Projects";
import About from "../components/About";
import LinkBtn from "../components/ProjectBtn";
import ContactBtn from "../components/ContactBtn";

import Workflow from "../components/Workflow";

const StartPage = () => {
  return (
    <>
      <section className="relative min-h-[100dvh] w-full overflow-hidden bg-transparent">
        <div className="relative z-content mx-auto flex min-h-[100dvh] w-full max-w-content flex-col px-6 pb-12 pt-28 sm:px-hero-mobile-x lg:px-hero-x lg:pt-36">
          <div className="flex flex-1 items-start pt-10 sm:items-center sm:pt-0">
            <div className="w-full max-w-hero-copy">
              <div className="mb-6 flex items-center gap-3 animate-fade-up">
                <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-accent sm:text-hero-label">
                  Student Frontend Developer
                </span>
              </div>

              <h1
                className="
                max-w-hero-copy
                animate-fade-up
                text-[3.25rem]
                leading-[0.98]
                tracking-[-0.055em]
                text-text-primary
                [animation-delay:100ms]
                sm:text-hero-tablet
                lg:text-hero-desktop
              "
              >
                Learning by building{" "}
                <span className="text-accent">real projects</span> for the web.
              </h1>

              <p
                className="
                mt-8
                max-w-hero-body
                animate-fade-up
                text-base
                leading-7
                text-text-muted
                [animation-delay:200ms]
              "
              >
                I&apos;m Kaan, a student developer building responsive React
                interfaces, learning TypeScript and documenting the process.
              </p>

              <div
                className="
                mt-8
                flex
                flex-col
                items-center
                gap-2.5
                sm:flex-row
                sm:gap-4
                md:gap-6
                animate-fade-up
                [animation-delay:300ms]
              "
              >
                <LinkBtn name="View projects" to="/projects" />
                <ContactBtn to="/contact" title="Contact me" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-content mx-auto w-full max-w-content px-6 py-16 sm:px-hero-mobile-x sm:py-20 lg:px-hero-x lg:py-24">
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          <section>
            <Skills />
          </section>

          <section>
            <Projects />
          </section>

          <section>
            <About />
          </section>

          <section>
            <Workflow />
          </section>
        </div>
      </main>
    </>
  );
};

export default StartPage;
