import clsx from "clsx";

type ProductionStep = Readonly<{
  id: string;
  title: string;
  description: string;
  featured?: boolean;
}>;

const PRODUCTION_STEPS = [
  { id: "01", title: "Discover", description: "Goals, users & scope" },
  { id: "02", title: "Design", description: "Wireframes & UI system" },
  {
    id: "03",
    title: "Frontend",
    description: "React, TypeScript & responsive UI",
    featured: true,
  },
  {
    id: "04",
    title: "Backend",
    description: "API, authentication & validation",
  },
  {
    id: "05",
    title: "Database",
    description: "PostgreSQL, schema & security",
  },
  { id: "06", title: "Ship", description: "Testing, Vercel & monitoring" },
] as const satisfies readonly ProductionStep[];

const Eyebrow = ({ children }: Readonly<{ children: string }>) => (
  <p className="text-eyebrow uppercase text-text-muted">{children}</p>
);

const AboutPanel = () => (
  <section aria-labelledby="footer-about-heading" className="max-w-[42rem]">
    <Eyebrow>About</Eyebrow>

    <h2
      id="footer-about-heading"
      className="mt-7 text-[2.35rem] font-semibold leading-[1.12] tracking-[-0.045em] text-text-primary sm:text-[2.75rem] lg:text-[3rem]"
    >
      Designing interfaces,
      <br className="hidden sm:block" /> learning the code behind them.
    </h2>

    <p className="mt-7 max-w-[39rem] text-base leading-7 text-text-secondary sm:text-lg sm:leading-7">
      I&apos;m a frontend developer who cares about clean design, thoughtful
      implementation and the details that make a difference. I enjoy turning
      ideas into simple, effective interfaces while continuously learning and
      improving.
    </p>
  </section>
);

const WorkflowStep = ({ step }: Readonly<{ step: ProductionStep }>) => (
  <li className="grid grid-cols-[2rem_1rem_minmax(0,1fr)] gap-x-5 pb-7 last:pb-0 sm:pb-8">
    <span
      className={clsx(
        "w-fit text-base font-semibold leading-none text-accent-light",
        step.featured && "bg-accent/15 px-0.5 shadow-accent",
      )}
    >
      {step.id}
    </span>

    <span
      aria-hidden="true"
      className="relative z-10 mt-0.5 size-2.5 place-self-start bg-accent-light shadow-[0_0_10px_rgb(var(--c-accent)/0.45)]"
    />

    <div className="min-w-0">
      <h3 className="text-base font-semibold leading-none text-text-primary">
        {step.title}
      </h3>
      <p className="mt-2 text-sm leading-5 text-text-secondary">
        {step.description}
      </p>
    </div>
  </li>
);

const WorkflowPanel = () => (
  <section
    aria-labelledby="footer-workflow-heading"
    className="w-full max-w-[28rem] lg:justify-self-end"
  >
    <Eyebrow>Full-stack workflow</Eyebrow>

    <h2
      id="footer-workflow-heading"
      className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-[2rem]"
    >
      From idea to production
    </h2>

    <ol className="relative mt-8 before:absolute before:bottom-2 before:left-[3.75rem] before:top-1 before:w-px before:bg-accent/35 before:content-['']">
      {PRODUCTION_STEPS.map((step) => (
        <WorkflowStep key={step.id} step={step} />
      ))}
    </ol>
  </section>
);

const Workflow = () => {

    return (
        <>
    <div className="grid w-full gap-12 sm:gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(22rem,0.75fr)] lg:items-center lg:gap-20">
      <AboutPanel />
      <WorkflowPanel />
    </div></>
    )
}

export default Workflow;
