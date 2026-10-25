import { useEffect, useState } from "react";
import LogoMark from "./LogoMark";
import Ul from "./Ul";
import { useSite } from "../../hooks/useSite";
import Language from "./Language";

import { useMenuStore } from "../../store/menu";

import { Menu, X } from "lucide-react";
import Button from "./Button";

export const Navbar = () => {
  const site = useSite();

  const { isOpen, toggle } = useMenuStore();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuToggle = () => {
    toggle();
  };

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
    <>
      <header
        className={`
    fixed top-5 md:top-6 left-1/2 z-50 isolate
    flex h-20 w-[calc(100%-3rem)] max-w-6xl -translate-x-1/2 items-center justify-between
    rounded-2xl px-4 sm:px-6 lg:px-8
  `}
      >
        <div
          aria-hidden={true}
          className={`pointer-events-none absolute inset-0 -z-10 rounded-2xl border
      transition-[background-color,border-color,box-shadow] duration-200
      motion-reduce:transition-none ${
        isScrolled
          ? "border-border bg-bg/95 supports-[backdrop-filter]:bg-bg/80 backdrop-blur-md shadow-soft"
          : "border-transparent bg-transparent"
      }`}
        />
        <a
          href="#home"
          aria-label="Kaan - Home"
          className="flex select-none shrink-0 text-black transition-opacity hover:opacity-80"
        >
          <LogoMark className="h-12 w-auto" />
        </a>

        <div className="hidden lg:flex items-center">
          <Ul />
        </div>

        <div className="flex lg:hidden">
          {!isOpen && (
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={handleMenuToggle}
              className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white p-2 shadow-soft transition-transform duration-200 active:scale-95"
            >
              <Menu size={24} strokeWidth={2} className="text-black" />
            </button>
          )}
        </div>

        <div
          id="mobile-menu"
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={`absolute top-[calc(100%+0.75rem)] right-0 left-0 flex flex-col gap-4 rounded-2xl bg-white/95 backdrop-blur-md p-6 shadow-medium lg:hidden border border-black/5 transition-[opacity,translate,visibility] duration-200 ease-out motion-reduce:transition-none ${
            isOpen
              ? "visible opacity-100 translate-y-0"
              : "invisible opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <Ul mobile />

          <div className="flex items-center justify-center">
                      <div className="flex flex-col">
            <Button arrow link="#contact" variant="primary">
              {site.buttons.letsContactBtn}
            </Button>
          </div>

          <Language />

                    <button
            type="button"
            aria-label="Close menu"
            onClick={handleMenuToggle}
            className="ml-auto flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-black/5 shadow-soft hover:bg-black/10 transition-colors"
          >
            <X size={24} strokeWidth={2} className="text-black" />
          </button>
                    </div>
        </div>

        <div className="hidden lg:flex gap-4">
          <Language />
          <Button arrow link="#contact" variant="primary">
            {site.buttons.letsContactBtn}
          </Button>
        </div>
      </header>

      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          tabIndex={-1}
          className="fixed inset-0 z-40 lg:hidden"
          onClick={handleMenuToggle}
        />
      )}
    </>
  );
};

export default Navbar;
