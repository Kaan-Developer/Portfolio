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

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY;

      if (currentScrollY <= 80) {
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
  }, []);

  // Active section

  return (
    <header
  className={`
    fixed top-5 md:top-6 left-1/2 z-50
    flex w-full max-w-[1400px] -translate-x-1/2 items-center justify-between
    px-6 sm:px-8 lg:px-12
    transition-transform duration-300 ease-in-out
    motion-reduce:transition-none
    ${isHidden ? "-translate-y-[calc(100%+1.5rem)]" : "translate-y-0"}
  `}
>
  {/* Logo */}
  <a
    href="#home"
    aria-label="Kaan - Home"
    className="shrink-0 rounded-full bg-white p-2.5 shadow-soft transition-transform duration-200 hover:scale-105"
  >
    <img
      src={kaanLogo}
      alt="Kaan"
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
      aria-label="Menüyü aç"
      onClick={toggle}
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

{isOpen && (
  <div className="absolute top-20 right-6 left-6 flex flex-col gap-4 rounded-3xl bg-white/95 backdrop-blur-md p-6 shadow-medium lg:hidden border border-black/5">
        <Ul mobile />

        <div className="pt-2">
          <StarOnGithub />
        </div>
    
    {/* Kapat */}
    <button
      type="button"
      aria-label="Menüyü kapat"
      onClick={toggle}
      className="ml-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-black/5 shadow-soft hover:bg-black/10 transition-colors"
    >
      <X
        size={24}
        strokeWidth={2}
        className="text-black"
      />
    </button>
  </div>
)}

  {/* GitHub */}
  <div className="hidden lg:flex">
    <StarOnGithub />
  </div>
</header>
  );
};

export default Navbar;