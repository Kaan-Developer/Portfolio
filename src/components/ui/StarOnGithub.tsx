import { Star, ArrowUpRight } from "lucide-react";

const StarOnGitHub = () => {
  return (
    <a
      href="https://github.com/Kaan-Developer/Portfolio"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Star this repository on GitHub"
      className="
        group inline-flex items-center gap-2
        rounded-full
        border border-black/10
        bg-white
        px-3.5 py-2
        text-sm font-medium text-black
        shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5
        hover:border-primary/30
        hover:bg-primary-light
        hover:text-primary
        hover:shadow-medium
        active:translate-y-0
      "
    >
      {/* GitHub */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4 fill-current"
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.85 10.91.57.1.78-.25.78-.55v-2.13c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.28-1.67-1.28-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.77 1.07.77 2.16v3.2c0 .31.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>

      <span>Star on GitHub</span>

      <Star
        size={15}
        strokeWidth={1.8}
        className="
          transition-all duration-200
          group-hover:fill-current
          group-hover:rotate-12
        "
      />

      <ArrowUpRight
        size={13}
        strokeWidth={1.8}
        className="
          -ml-1
          translate-y-0.5
          opacity-0
          -translate-x-1
          transition-all duration-200
          group-hover:translate-x-0
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      />
    </a>
  );
};

export default StarOnGitHub;