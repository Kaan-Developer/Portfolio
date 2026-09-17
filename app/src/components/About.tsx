import ContactBtn from "./ContactBtn";

const profileCode = [
  "const kaan = {",
  '  role: "Student Frontend Developer",',
  '  core: ["JavaScript", "React", "Tailwind CSS"],',
  '  learning: ["TypeScript"],',
  "} as const;",
].join("\n");

const About = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full overflow-hidden"
    >
      <div className="w-full">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-start xl:gap-16">
          <div className="min-w-0 animate-fade-up">
            <h2
              id="about-heading"
              className="max-w-text text-section-title-mobile text-text-primary sm:text-[2.6rem] md:text-section-title lg:text-[2.8rem] xl:text-section-title"
            >
              A student developer learning by{" "}
              <span className="text-accent">building real things.</span>
            </h2>

            <div className="mt-6 max-w-text space-y-4 sm:mt-8 sm:space-y-5">
              <p className="text-sm leading-7 text-text-secondary sm:text-[0.9375rem] md:text-base md:leading-8">
                I&apos;m Kaan Hamitler, a student frontend developer based in
                Türkiye. I build responsive React interfaces and improve my
                JavaScript skills by turning ideas into working projects.
              </p>
              <p className="text-sm leading-7 text-text-muted sm:text-[0.9375rem] md:text-base md:leading-8">
                I&apos;m currently learning TypeScript and building an AI
                chatbot. As each project becomes ready, I&apos;ll publish its
                source code and explain what I learned, what challenged me and
                what I would improve.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-2.5">
              {[
                "React & JavaScript",
                "Learning TypeScript",
                "Responsive UI",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex min-h-9 items-center justify-center rounded-pill border border-border bg-surface/50 px-3 py-2 text-center text-[0.6875rem] font-medium text-text-secondary sm:px-4 sm:text-ui-sm"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <ContactBtn name="Contact me" />
            </div>

            <div className="mt-10 w-full overflow-hidden rounded-panel border border-border-strong bg-surface-elevated shadow-panel sm:mt-12">
              <div className="flex min-h-12 items-center justify-between gap-3 border-b border-border bg-surface px-4 py-2">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-status-error" />
                  <span className="h-2.5 w-2.5 rounded-full bg-status-warning" />
                  <span className="h-2.5 w-2.5 rounded-full bg-status-available" />
                </div>
                <span className="font-mono text-technical tracking-[0.1em] text-text-muted">
                  kaan.profile.ts
                </span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-xs leading-7 text-text-secondary sm:p-6 sm:text-[0.8125rem]">
                <code>{profileCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
