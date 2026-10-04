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
    fixed top-4 left-1/2 z-50
    flex w-full max-w-[1400px] -translate-x-1/2 items-center justify-between
    px-8 lg:px-12
    transition-transform duration-300 ease-in-out
    motion-reduce:transition-none
    ${isHidden ? "-translate-y-[calc(100%+1rem)]" : "translate-y-0"}
  `}
>
  {/* Logo */}
  <a
    href="#home"
    aria-label="Kaan - Home"
    className="shrink-0 rounded-full bg-white p-2 shadow-soft"
  >
    <img
      src={kaanLogo}
      alt="Kaan"
      className="h-9 w-9"
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
      className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white p-2 shadow-soft"
    >
      <Menu
        size={21}
        strokeWidth={1.8}
        className="text-black"
      />
    </button>
  )}
</div>

{isOpen && (
  <div className="absolute top-16 right-8 flex w-[calc(100%-4rem)] flex-col gap-4 rounded-2xl bg-white p-5 shadow-medium lg:hidden">
        <Ul mobile />

        <div className="max-w-50">
                      <StarOnGithub />
        </div>
    
    {/* Kapat */}
    <button
      type="button"
      aria-label="Menüyü kapat"
      onClick={toggle}
      className="ml-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white shadow-soft"
    >
      <X
        size={21}
        strokeWidth={1.8}
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