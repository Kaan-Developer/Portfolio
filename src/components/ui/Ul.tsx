import { site } from "../../data/site";
import { useEffect, useState } from "react";

interface UlProps {
    mobile?: boolean;
}


const Ul = ({ mobile = false }:UlProps) => {
      const [activeSection, setActiveSection] = useState(site.bubbles[0]?.target);

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
        <nav
  className={
    mobile
      ? "flex flex-col items-start gap-2"
      : "absolute left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-black/5 bg-white/80 p-1.5 shadow-soft backdrop-blur-md"
  }
>
  {site.bubbles.map((bubble) => {
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
          ? "bg-primary-light text-black"
          : "text-muted hover:bg-black/5 hover:text-black"
      }`
    : `rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
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