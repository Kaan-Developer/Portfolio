import { X } from "lucide-react";

import Typing from "./Typing";
import Ul from "./Ul";
import Availeble from "./Available";
import ThemeToggle from "./ThemeToggle";
import { useSidebarStore } from "../store/sidebarStore";

const Sidebar = () => {
  const { toggleSidebar } = useSidebarStore();

  return (
    <aside
      className="
        lg:hidden
        fixed
        right-6
        top-6
        z-sidebar
        flex
        flex-col
        gap-4
        w-[250px]
        h-[calc(100vh-48px)]
        max-w-[calc(100vw-48px)]
        rounded-panel
        border
        border-border-strong
        bg-background-mobile/95
        text-text-primary
        backdrop-blur-xl
        p-5
        shadow-panel
        transition-colors
        duration-300
      "
    >
      <div className="flex items-center justify-between">
        <Typing />
        <button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition-colors duration-200 hover:border-border-hover hover:bg-surface-hover hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent/30"
          aria-label="Close menu"
        >
          <X size={20} strokeWidth={1.25} />
        </button>
      </div>

      <div className="flex flex-col items-start gap-2 text-sm text-text-primary">
        <Ul variant="sidebar" />
      </div>

      <div className="mt-auto flex w-full flex-col items-center justify-between gap-4">
        <Availeble />

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
