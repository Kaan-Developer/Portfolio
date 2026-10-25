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
    <div>
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
