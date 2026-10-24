import { useSite } from "../../hooks/useSite";
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
  links: providedLinks,
  ariaLabel,
}: UlProps) => {
  const site = useSite();
  const links = providedLinks ?? site.bubbles;
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
  }, [links, site.bubbles]);

    return (
        <nav
  aria-label={ariaLabel ?? (mobile ? "Mobile navigation" : "Primary navigation")}
  className={
    inline
      ? mobile
        ? "flex flex-col items-start gap-2"
        : "flex flex-wrap justify-center rounded-md items-center gap-1 border border-black/5 bg-white/80 p-1.5 shadow-soft backdrop-blur-md"
      : mobile
        ? "flex flex-col items-start gap-3"
        : "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-8"
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
          inline
            ? mobile
              ? `w-full rounded-xl px-3 py-2.5 text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-primary-soft text-white"
                    : "text-muted hover:bg-black/5 hover:text-black"
                }`
              : `rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-primary-light text-black"
                    : "text-muted hover:bg-black/5 hover:text-black"
                }`
            : `relative py-1 ${mobile ? "text-base" : "text-sm"} font-medium transition-colors duration-200
 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-black
 after:transition-transform after:duration-200 motion-reduce:transition-none motion-reduce:after:transition-none
 ${isActive
   ? "text-black after:scale-x-100"
   : "text-muted after:scale-x-0 hover:text-black hover:after:scale-x-100"}`
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
