import { useCallback, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "motion/react";

import Navbar from "../components/ui/Navbar";
import Intro from "../components/ui/Intro";
import Reveal from "../components/ui/Reveal";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";
import SmoothScroll from "../components/ui/SmoothScroll";

type Phase = "intro" | "reveal" | "ready";

const AnaPage = () => {
  const { hash, key } = useLocation();
  const reduce = useReducedMotion();

  const [phase, setPhase] = useState<Phase>(() =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "ready"
    : "intro",
);

  const skipIntro = reduce === true;
  const showIntro = phase !== "ready" && !skipIntro;
  const showPage = phase !== "intro" || skipIntro;

  const handleReveal = useCallback(() => setPhase("reveal"), []);

  useLayoutEffect(() => {
    if (!showIntro) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;

    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [showIntro]);

  useLayoutEffect(() => {
    if (!showPage) return;

if (!hash) {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  return;
}

    document.getElementById(hash.slice(1))?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  }, [hash, key, showPage]);

  return (
    <>
      {showIntro && (
        <Intro
          leaving={phase === "reveal"}
          onReveal={handleReveal}
          onComplete={() => setPhase("ready")}
        />
      )}

      {showPage && (
        <div inert={showIntro}>
          <main className="bg-bg w-full mx-auto min-w-0 max-w-6xl px-10 xl:px-0 gap-2">
            <Navbar />
            <Hero />
            <Projects />
            <About />

            <Reveal>
              <Contact />
            </Reveal>
          </main>

          <Reveal>
            <Footer />
          </Reveal>

          <ScrollToTop />
          {!showIntro && <SmoothScroll />}
        </div>
      )}
    </>
  );
};

export default AnaPage;