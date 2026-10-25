// src/components/ui/SmoothScroll.tsx
import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: true, autoRaf: true });
    return () => lenis.destroy();
  }, []);
  return null;
};
export default SmoothScroll;