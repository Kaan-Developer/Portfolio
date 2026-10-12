import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 300px'den fazla aşağı kaydırıldığında görünür
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="#home"
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-primary-soft text-white shadow-soft transition-all duration-300 ease-out hover:bg-primary-soft-hover hover:scale-105 hover:shadow-medium active:scale-95 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp
        size={22}
        strokeWidth={2.5}
        className="transition-transform duration-200 hover:-translate-y-0.5"
      />
    </a>
  );
};

export default ScrollToTop;
