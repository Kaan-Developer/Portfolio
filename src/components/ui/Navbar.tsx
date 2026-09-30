import { useEffect, useState } from "react";
import { site } from "../../data/site";

import StarOnGithub from "./StarOnGithub";

export const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState(site.bubbles[0]?.target);

  // Navbar hide/show
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
  useEffect(() => {
    const sections = site.bubbles
      .map((bubble) => document.getElementById(bubble.target))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

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
      src="/kaan-k-logo.svg"
      alt="Kaan"
      className="h-9 w-9"
    />
  </a>

  {/* Sadece linkler */}
  <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-7 rounded-full border border-black/5 bg-white/80 px-6 py-3 shadow-soft backdrop-blur-md">
    {site.bubbles.map((bubble) => {
      const isActive = activeSection === bubble.target;

      return (
        <a
          key={bubble.target}
          href={`#${bubble.target}`}
          onClick={() => setActiveSection(bubble.target)}
          className={`
            relative py-1
            text-sm font-medium
            transition-all duration-200
            hover:-translate-y-0.5
            ${
              isActive
                ? "text-primary"
                : "text-muted hover:text-black"
            }
          `}
        >
          {bubble.label}

          <span
            className={`
              absolute
              -bottom-1 left-1/2
              h-0.5
              -translate-x-1/2
              rounded-full
              bg-primary
              transition-all duration-200
              ${
                isActive
                  ? "w-4 opacity-100"
                  : "w-0 opacity-0"
              }
            `}
          />
        </a>
      );
    })}
  </nav>

  {/* GitHub */}
  <StarOnGithub />
</header>
  );
};

export default Navbar;