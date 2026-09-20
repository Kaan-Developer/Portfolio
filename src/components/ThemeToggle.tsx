import { useThemeStore } from "../store/themeStore";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-surface-elevated text-text-secondary transition duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent/30"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={18} strokeWidth={1.5} />
      ) : (
        <Moon size={18} strokeWidth={1.5} />
      )}
    </button>
  );
};

export default ThemeToggle;
