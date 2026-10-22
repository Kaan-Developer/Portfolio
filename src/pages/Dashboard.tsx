import Logo from "../assets/images/Logo.svg";
import { site, socialLinks } from "../data/site";
import Details from "../components/ui/Details";
import PrivacyPage from "./PrivacyPage";
import { ArrowUpRight } from "lucide-react";

import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { projects } from "../data/projects";

import { ArrowLeft } from "lucide-react";

const navigationLinkClassName =
  "flex min-h-11 w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors duration-150 hover:bg-neutral-100 hover:text-ink active:bg-neutral-200 aria-[current=page]:bg-neutral-200 aria-[current=page]:font-semibold aria-[current=page]:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

const Dashboard = () => {
  return (
    <div className="grid min-h-dvh w-full grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="flex flex-col border-r border-border bg-white p-4 md:sticky md:top-0 md:h-dvh md:self-start">
        <div className="flex items-center gap-2 border-b border-border py-4">
          <img
            src={Logo}
            alt=""
            width={48}
            height={48}
            className="shrink-0 object-contain"
          />
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
              All Project
            </li>

            {projects.map((project) => (
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
                Contact privacy notice
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
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-ink transition-colors duration-150 hover:bg-neutral-200 active:bg-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              );
            })}
          </div>
          <a
            href="/#contact"
            className="group inline-flex h-12 w-full items-center justify-between gap-3 rounded-xl bg-black px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none"
          >
            <span>Let's talk</span>
            <ArrowUpRight
              size={18}
              strokeWidth={1.75}
              aria-hidden="true"
              className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          </a>
        </div>
      </aside>
      <div className="min-w-0">
        <Link
  to="/"
  className="group sticky ml-6 mt-6 inline-flex h-11 items-center gap-2
    rounded-full border border-border bg-white px-4
    text-sm font-medium text-ink
    transition-colors hover:bg-neutral-100
    focus-visible:outline-2 focus-visible:outline-offset-4
    focus-visible:outline-primary motion-reduce:transition-none"
>
  <ArrowLeft
    size={16}
    strokeWidth={1.75}
    aria-hidden="true"
  />
    <span>Back to portfolio</span>
</Link>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
