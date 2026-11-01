import { useEffect, useLayoutEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useSite } from "../hooks/useSite";
import Language from "../components/ui/Language";
import Button from "../components/ui/Button";

const PageLayout = () => {
  const { dashbord, accessibility } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-bg">
      <header className="fixed left-1/2 top-5 z-50 isolate flex h-20 w-[calc(100%_-_3rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-2xl px-4 sm:px-6 md:top-6 lg:px-8">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 rounded-2xl border transition-[background-color,border-color,box-shadow] duration-200 motion-reduce:transition-none ${
            isScrolled
              ? "border-border bg-bg/95 shadow-soft backdrop-blur-md supports-[backdrop-filter]:bg-bg/80"
              : "border-transparent bg-transparent"
          }`}
        />

        <Link
          to="/"
          aria-label={dashbord.backto}
          className="group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-black px-4 text-sm font-medium tracking-tight text-white transition-[background-color,transform] duration-200 ease-out hover:bg-ink active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:active:scale-100 md:px-7"
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />

          <span className="hidden md:flex">
            {dashbord.backto}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Language />

          <Button
            github
            target="_blank"
            iconSize={20}
            aria-label={`GitHub ${accessibility.opensInNewTab}`}
            link="https://github.com/Kaan-Developer"
          >
            <span className="hidden md:ml-2 md:inline">
              GitHub
            </span>
          </Button>
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default PageLayout;