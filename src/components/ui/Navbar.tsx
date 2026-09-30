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
    const sectionIds = ["home", ...site.bubbles.map((b) => b.target)];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
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
  <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-black/5 bg-white/80 p-1.5 shadow-soft backdrop-blur-md">
  {site.bubbles.map((bubble) => {
    const isActive = activeSection === bubble.target;

    return (
      <a
        key={bubble.target}
        href={`#${bubble.target}`}
        onClick={() => setActiveSection(bubble.target)}
        aria-current={isActive ? "location" : undefined}
        className={`
          rounded-full px-4 py-2
          text-sm font-medium
          transition-colors duration-200
          ${
            isActive
              ? "bg-primary-light text-black"
              : "text-muted hover:bg-black/5 hover:text-black"
          }
        `}
      >
        {bubble.label}
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