import { useSite } from "../../hooks/useSite";
import { Link } from "react-router-dom";
import LogoMark from "../ui/LogoMark";

const Footer = () => {
  const site = useSite();
  return (
    <footer className="relative max-w-6xl w-full mx-auto py-6 md:py-8">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center md:gap-x-8">
        <div className="flex items-center gap-3">
          <LogoMark className="h-10 w-auto" />
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold text-black">
              {site.name}
            </p>
            <p className="text-sm text-muted">{site.role}</p>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-4">
          {site.bubbles.map((item) => (
            <Link
              key={item.target}
              to={`/#${item.target}`}
              className="inline-flex min-h-11 items-center text-sm text-ink underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {item.label}
            </Link>
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

      <div className="mt-4 flex flex-col items-start border-t border-border justify-between gap-4 text-sm leading-6 text-muted md:flex-row md:gap-8">
        <p className="shrink-0 md:pt-2.5 text-base">
          © {new Date().getFullYear()} {site.name}. {site.footer.Allrightsreserved}
        </p>
      </div>

       <div className="mx-auto max-w-7xl overflow-hidden px-5 sm:px-8">
        <h2
          aria-hidden="true"
          className="translate-y-[25%] select-none whitespace-nowrap text-center text-[clamp(3.5rem,10vw,11rem)] leading-none font-black tracking-[-0.06em]"
          style={{
            WebkitTextStroke: "1px rgba(148,163,184,0.35)",
            WebkitTextFillColor: "transparent",
          }}
        >
          Kaan Hamitler
        </h2>
      </div>

      <div className="border-t border-white/20" />
    </footer>
  );
};

export default Footer;
