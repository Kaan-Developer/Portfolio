import { useSidebarStore } from "../store/sidebarStore";
import Typing from "./Typing";
import Ul from "./Ul";
import Availeble from "./Available";
import ThemeToggle from "./ThemeToggle";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

const TopNav = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();

  return (
    <>
      <nav
        className="
          absolute
          top-8
          left-6
          right-6
          z-nav
          mx-auto
          flex
          max-w-content
          items-center
          justify-between
          gap-4
          rounded-panel
          px-5
          py-3
          bg-transparent
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="
             flex
             h-9
             w-9
             items-center
             justify-center
             border
             border-border-strong
             text-lg
             font-medium
             text-text-primary
           "
          >
            K
          </div>

          <div className="hidden lg:flex text-sm font-medium tracking-[0.16em] text-text-primary">
            <Typing />
          </div>
        </div>

        <div className="hidden flex-1 justify-center lg:flex">
          <Ul />
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <Availeble />
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
          onClick={toggleSidebar}
          aria-label="Open navigation menu"
          aria-expanded={isOpen}
        >
          <Menu className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 z-overlay bg-background-deep/60 backdrop-blur-[2px] transition-colors duration-300 lg:hidden"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              toggleSidebar();
            }
          }}
          role="presentation"
        >
          <Sidebar />
        </div>
      )}
    </>
  );
};

export default TopNav;
