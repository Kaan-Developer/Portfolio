import { useEffect, useState } from "react";
import LogoMark from "./LogoMark";
import Ul from "./Ul";
import { useSite } from "../../hooks/useSite";
import Language from "./Language";

import { useMenuStore } from "../../store/menu";

import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export const Navbar = () => {
  const site = useSite();
  const reduce = useReducedMotion();

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
    <motion.header
  initial={reduce ? false : { opacity: 0, y: -18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: reduce ? 0 : 0.6,
    delay: reduce ? 0 : 0.2,
  }}
  className="
    fixed top-5 md:top-6 left-1/2 z-50 isolate
    flex h-20 w-[calc(100%-3rem)] max-w-6xl
    -translate-x-1/2 items-center justify-between
    rounded-2xl px-4 sm:px-6 lg:px-8
  "
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
          aria-label={site.accessibility.home}
          className="flex items-center gap-2 select-none shrink-0 text-black transition-opacity hover:opacity-80"
        >
          <LogoMark className="h-12 w-auto" />
          <span className="text-2xl md:text-3xl font-medium">{site.name}</span>
        </a>

        <div className="flex lg:hidden">
          <button
  type="button"
  aria-label={isOpen ? site.accessibility.closeMenu : site.accessibility.openMenu}
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
  onClick={handleMenuToggle}
  className="flex h-12 w-12 items-center justify-center rounded-md bg-white shadow-soft"
>
  {isOpen ? (
    <X size={24} aria-hidden="true" />
  ) : (
    <Menu size={24} aria-hidden="true" />
  )}
</button>
        </div>

        <div
          id="mobile-menu"
          aria-hidden={!isOpen}
          inert={!isOpen}
          className={`absolute top-[calc(100%+0.75rem)] right-0 left-0 flex flex-col gap-4 rounded-2xl bg-white/95 backdrop-blur-md p-6 shadow-medium lg:hidden border border-black/5 transition-[opacity,translate,visibility] duration-200 ease-out motion-reduce:transition-none lg:hidden ${
            isOpen
              ? "visible opacity-100 translate-y-0"
              : "invisible opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <Ul mobile onNavigate={toggle} />

                    <Language />

        </div>

<div className="hidden items-center gap-4 lg:flex">
  <Ul />

  <span
    aria-hidden="true"
    className="h-6 shrink-0 border-l border-border-strong"
  />

  <Language />
</div>
      </motion.header>

      {isOpen && (
        <button
          type="button"
          aria-label={site.accessibility.closeMenu}
          tabIndex={-1}
          className="fixed inset-0 z-40 lg:hidden"
          onClick={toggle}
        />
      )}
    </>
  );
};

export default Navbar;
