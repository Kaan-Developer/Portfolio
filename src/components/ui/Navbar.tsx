import { useEffect, useState } from "react";
import kaanLogo from "../../assets/images/Logo.svg";
import StarOnGithub from "./StarOnGithub";
import Ul from "./Ul";

import { useMenuStore } from "../../store/menu";

import {
  Menu,
  X,
} from "lucide-react";

export const Navbar = () => {

const { isOpen, toggle } = useMenuStore();

  const [isHidden, setIsHidden] = useState(false);

  const handleMenuToggle = () => {
    setIsHidden(false);
    toggle();
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY;

      if (isOpen || currentScrollY <= 80) {
        setIsHidden(false);
        lastScrollY = currentScrollY;
        return;
      }

      if (Math.abs(difference) < 8) return;

      setIsHidden(difference > 0);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <>
    <header
  className={`
    fixed top-5 md:top-6 left-1/2 z-50
    flex w-full max-w-[1400px] -translate-x-1/2 items-center justify-between
    px-6 sm:px-8 lg:px-12
    transition-transform duration-300 ease-in-out
    motion-reduce:transition-none
    ${isHidden && !isOpen ? "-translate-y-[calc(100%+1.5rem)]" : "translate-y-0"}
  `}
>
  {/* Logo */}
  <a
    href="#home"
    aria-label="Kaan - Home"
    className="select-none shrink-0 rounded-full bg-white p-2.5 shadow-soft"
  >
    <img
      src={kaanLogo}
      alt=""
      className="h-11 w-11 md:h-12 md:w-12"
    />
  </a>

  {/* Sadece linkler */}
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
      <Menu
        size={24}
        strokeWidth={2}
        className="text-black"
      />
    </button>
  )}
</div>

  <div
    id="mobile-menu"
    aria-hidden={!isOpen}
    inert={!isOpen}
    className={`absolute top-20 right-6 left-6 flex flex-col gap-4 rounded-3xl bg-white/95 backdrop-blur-md p-6 shadow-medium lg:hidden border border-black/5 transition-[opacity,translate,visibility] duration-200 ease-out motion-reduce:transition-none ${
      isOpen
        ? "visible opacity-100 translate-y-0"
        : "invisible opacity-0 -translate-y-2 pointer-events-none"
    }`}
  >
        <Ul mobile />

        <div className="pt-2">
          <StarOnGithub mobile />
        </div>

    {/* Kapat */}
    <button
      type="button"
      aria-label="Close menu"
      onClick={handleMenuToggle}
      className="ml-auto flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-black/5 shadow-soft hover:bg-black/10 transition-colors"
    >
      <X
        size={24}
        strokeWidth={2}
        className="text-black"
      />
    </button>
  </div>

  {/* GitHub */}
  <div className="hidden lg:flex">
    <StarOnGithub />
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
