import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { socialLinks } from "../../data/socialLinks";
import { useSite } from "../../hooks/useSite";
import LogoMark from "../ui/LogoMark";

const Footer = () => {
  const site = useSite();

  return (
    <footer className="mt-12 border-t border-border bg-white">
      <div className="mx-auto w-full max-w-6xl px-10 xl:px-0">
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="flex min-w-0 flex-col items-start">
            <Link
              to="/#home"
              aria-label={site.accessibility.home}
              className="inline-flex max-w-full items-center gap-3 rounded-md"
            >
              <LogoMark className="h-12 w-12 shrink-0" />

              <div className="min-w-0">
                <p className="font-display text-xl font-semibold tracking-tight text-black">
                  {site.name}
                </p>

                <p className="mt-1 text-sm text-muted">
                  {site.role}
                </p>
              </div>
            </Link>

            <a
              href={"mailto:" + site.contact.email}
              className="mt-4 inline-flex min-h-11 max-w-full items-center break-all text-sm text-muted underline-offset-4 hover:text-primary hover:underline"
            >
              {site.contact.email}
            </a>
          </div>

          <div className="flex min-w-0 flex-col items-start gap-5 md:items-end">
            <nav aria-label={site.accessibility.footerNavigation}>
              <ul className="flex flex-wrap gap-x-6 gap-y-1 md:justify-end">
                {site.bubbles.map((item) => (
                  <li key={item.target}>
                    <Link
                      to={"/#" + item.target}
                      className="inline-flex min-h-11 items-center text-sm font-medium text-ink underline-offset-4 hover:text-primary hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-ink transition-colors hover:border-border-strong hover:bg-bg motion-reduce:transition-none"
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{name}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />

                  <span className="sr-only">
                    {" "}
                    {site.accessibility.opensInNewTab}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 border-t border-border py-5 text-xs leading-6 text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p>
            © {new Date().getFullYear()} {site.name}.{" "}
            <span className="block sm:inline">
              {site.footer.Allrightsreserved}
            </span>
          </p>

          <Link
            to="/privacy"
            className="inline-flex min-h-11 items-center underline-offset-4 hover:text-primary hover:underline"
          >
            {site.contact.form.privacyTitle}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;