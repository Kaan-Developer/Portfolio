import { socialLinks } from "../data/socialLinks";
import { useSite } from "../hooks/useSite";
import Button from "../components/ui/Button";
import Language from "../components/ui/Language";
import ScrollToTop from "../components/ui/ScrollToTop";
import LogoMark from "../components/ui/LogoMark";

import { Link, NavLink, Outlet } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

const navigationLinkClassName =
  "flex min-h-11 w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors duration-150 hover:bg-neutral-100 hover:text-ink active:bg-neutral-200 aria-[current=page]:bg-neutral-200 aria-[current=page]:font-semibold aria-[current=page]:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

const Dashboard = () => {
  const site = useSite();
  return (
    <div className="grid min-h-dvh w-full grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="hidden lg:flex flex-col border-r border-border bg-white p-4 md:sticky md:top-0 md:h-dvh md:self-start">
        <div className="flex items-center gap-2 border-b border-border py-4">
          <LogoMark className="h-10 w-auto" />
          <h2 className="text-balance text-xl md:text-2xl font-semibold">
            {site.name}
          </h2>
        </div>

        <nav
          aria-label="Portfolio navigation"
          className="min-h-0 overflow-y-auto py-6"
        >
          <ul className="space-y-1">
            <li className="font-medium text-subtle">
              {site.dashbord.allProjects}
            </li>

            {site.projects.map((project) => (
              <li key={project.slug}>
                <NavLink
                  to={`/projects/${project.slug}`}
                  end
                  className={navigationLinkClassName}
                >
                  {project.title}
                </NavLink>
              </li>
            ))}

            <li className="border-t border-border pt-3">
              <NavLink to="/privacy" end className={navigationLinkClassName}>
              {site.dashbord.privacyNote}
              </NavLink>
            </li>
          </ul>


        </nav>
        <div className="mt-auto shrink-0 space-y-4 pt-4">
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  title={item.name}
                  className="inline-flex size-10 shrink-0 items-center
                   justify-center rounded-lg border border-neutral-200
                    bg-neutral-100 text-ink transition-colors duration-150
                     hover:bg-neutral-200 active:bg-neutral-300
                      focus-visible:outline-2 focus-visible:outline-offset-2
                       focus-visible:outline-primary motion-reduce:transition-none
                       "
                >

                  <Icon size={20} aria-hidden="true" />
                </a>
              );
            })}
          </div>
          <Button arrow variant="primary" link="/#contact">{site.buttons.letsContactBtn}</Button>

        </div>
      </aside>
       <div className="min-w-0">
        <div className="sticky top-0 z-20 flex items-center justify-between bg-bg mx-4">
          <Link
            to="/"
            className="group ml-6 mt-6 inline-flex h-11 items-center gap-2
              rounded-full border border-black bg-black px-4
              text-sm font-medium text-white
              transition-colors hover:border-ink hover:bg-ink
              focus-visible:outline-2 focus-visible:outline-offset-4
              focus-visible:outline-primary motion-reduce:transition-none"
          >
            <ArrowLeft
              size={16}
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span>{site.dashbord.backto}</span>
          </Link>
          <Language />
        </div>
        <Outlet />
      </div>
      {/* 2. Buraya ekle */}
      <ScrollToTop />
    </div>
  );
};

export default Dashboard;
