import Logo from "../assets/images/Logo.svg";
import { site, socialLinks } from "../data/site";
import Details from "../components/ui/Details";
import PrivacyPage from "./PrivacyPage";

import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { projects } from "../data/projects";

import { ArrowLeft } from "lucide-react";

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
          <ul className="space-y-3 gap-4">
            <li>
              <Link to="/dashboard">All projects</Link>
            </li>

            {projects.map((project) => (
              <li key={project.slug}>
                <Link to={`/projects/${project.slug}`}>{project.title}</Link>
              </li>
            ))}

            <Link to="/privacy" className="border-t pt-1 border-border text-sm">
              Contact privacy notice
            </Link>
          </ul>


        </nav>
        <div className="mt-auto flex shrink-0 flex-wrap gap-2 pt-4">
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
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-black text-white"
                >
                <Icon
                  size={20}
                  aria-hidden="true" />
                  </a>
            );
          })}
              </div>
      </aside>
      <div className="min-w-0">
                          <Link
        to="/#projects"
        aria-label="Projelere dön."
        className="inline-flex sticky top-6 ml-6 mt-6 z-50 size-12 items-center justify-center rounded-full bg-white text-black shadow-sm transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
      >
        <ArrowLeft size={24} strokeWidth={1.75} aria-hidden="true" />
      </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
