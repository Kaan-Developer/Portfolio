import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useSite } from "../hooks/useSite";
import Language from "../components/ui/Language";
import Button from "../components/ui/Button";

const PageLayout = () => {
  const { dashbord, accessibility } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div className="min-h-screen relative bg-bg">
      <header
        className="fixed top-5 md:top-6 left-1/2 z-50 isolate
    flex h-20 w-[calc(100%-3rem)] max-w-6xl -translate-x-1/2 items-center justify-between
    rounded-2xl px-4 sm:px-6 lg:px-8"
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 -z-10 rounded-2xl border
    transition-[background-color,border-color,box-shadow] duration-200
    motion-reduce:transition-none ${
      isScrolled
        ? "border-border bg-bg/95 supports-[backdrop-filter]:bg-bg/80 backdrop-blur-md shadow-soft"
        : "border-transparent bg-transparent"
    }`}
        />
        <Link
          to="/"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-md bg-black px-4 md:px-7 text-sm font-medium tracking-tight whitespace-nowrap text-white transition-[background-color,transform] duration-200 ease-out hover:bg-ink active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none motion-reduce:active:scale-100"
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          <span className="hidden md:flex">{dashbord.backto}</span>
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
            <span className="hidden md:ml-2 md:inline">GitHub</span>
          </Button>
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default PageLayout;
