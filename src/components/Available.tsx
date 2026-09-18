import { FaGithub } from "react-icons/fa";

const Available = () => {
  return (
    <div className="flex items-center gap-3 w-full lg:w-auto">
      <div className="flex h-10 items-center gap-3 rounded-full border border-border bg-surface-elevated px-3 shadow-panel">
        <span className="relative flex h-2.5 w-2.5">
          {/* pulsing outer */}
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          {/* solid dot */}
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(59,130,246,0.18)]" />
        </span>

        <span className="text-sm font-medium tracking-[0.12em] text-text-primary">
          Building
        </span>
      </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Kaan-Developer"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-elevated text-text-secondary transition duration-200 hover:border-border-hover hover:bg-surface-hover hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent/30"
            aria-label="Open Kaan's GitHub profile in a new tab"
          >
            <FaGithub className="h-5 w-5" />
          </a>
        </div>
    </div>
  );
};

export default Available;
