import { site } from "../../data/site";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface UlProps {
    mobile?: boolean;
    inline?: boolean;
    links?: { label: ReactNode; target: string }[];
    ariaLabel?: string;
}


const Ul = ({
  mobile = false,
  inline = false,
  links = site.bubbles,
  ariaLabel,
}: UlProps) => {
      const [activeSection, setActiveSection] = useState(site.bubbles[0]?.target);

    useEffect(() => {
    const sectionIds = [...new Set([
      "home",
      "contact",
      ...site.bubbles.map((b) => b.target),
      ...links.map((link) => link.target),
    ])];
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
  }, [links]);

    return (
        <nav
  aria-label={ariaLabel ?? (mobile ? "Mobile navigation" : "Primary navigation")}
  className={
    mobile
      ? "flex flex-col items-start gap-2"
      : `${inline ? "flex flex-wrap justify-center rounded-md" : "absolute left-1/2 flex -translate-x-1/2 rounded-full"} items-center gap-1 border border-black/5 bg-white/80 p-1.5 shadow-soft backdrop-blur-md`
  }
>
  {links.map((bubble) => {
    const isActive = activeSection === bubble.target;

    return (
      <a
        key={bubble.target}
        href={`#${bubble.target}`}
        onClick={() => setActiveSection(bubble.target)}
        aria-current={isActive ? "location" : undefined}
        className={
  mobile
    ? `w-full rounded-xl px-3 py-2.5 text-base font-medium transition-colors duration-200 ${
        isActive
          ? "bg-primary-soft text-white"
          : "text-muted hover:bg-black/5 hover:text-black"
      }`
    : `${inline ? "rounded-md" : "rounded-full"} px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "bg-primary-light text-black"
          : "text-muted hover:bg-black/5 hover:text-black"
      }`
}
      >
        {bubble.label}
      </a>
    );
  })}
</nav>
    )
}

export default Ul;
