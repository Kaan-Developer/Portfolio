import Logo from "../../assets/images/Logo.svg";
import { site } from "../../data/site";
import { splineCredit } from "../../data/splineCredit";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-white px-6 py-6 md:px-10 md:py-8">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center md:gap-x-8">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="" width={32} height={32} className="shrink-0" />
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold text-black">
              {site.name}
            </p>
            <p className="text-sm text-muted">{site.role}</p>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-4">
          {site.bubbles.map((item) => (
            <a
              key={item.target}
              href={`#${item.target}`}
              className="inline-flex min-h-11 items-center text-sm text-ink underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-fit items-center text-sm text-ink underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>

      <div className="mt-4 flex flex-col items-start justify-between gap-4 text-sm leading-6 text-muted md:flex-row md:gap-8">
        <div className="min-w-0 max-w-3xl">
          <p>
            3D model:{" "}
            <a
              href={splineCredit.sourceUrl}
              className="inline-flex min-h-11 items-center align-middle underline underline-offset-4 transition-colors hover:text-primary"
            >
              {splineCredit.title}
            </a>{" "}
            by{" "}
            <a
              href={splineCredit.creatorUrl}
              className="inline-flex min-h-11 items-center align-middle underline underline-offset-4 transition-colors hover:text-primary"
            >
              {splineCredit.creator} ({splineCredit.creatorHandle})
            </a>
            . Licensed under{" "}
            <a
              href={splineCredit.licenseUrl}
              className="inline-flex min-h-11 items-center align-middle underline underline-offset-4 transition-colors hover:text-primary"
            >
              {splineCredit.license}
            </a>
            .
          </p>
          <p>{splineCredit.modifications}</p>
        </div>
        <p className="shrink-0 md:pt-2.5">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
