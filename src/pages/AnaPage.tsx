import Navbar from "../components/ui/Navbar";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const AnaPage = () => {
  const { hash, key } = useLocation();

  useLayoutEffect(() => {
    if (!hash) return;

    const section = document.getElementById(hash.slice(1));

    section?.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  }, [hash, key]);

  return (
    <>
      <main className="bg-bg w-full px-6 md:px-12 p-6 md:p-8 gap-2">
        <Navbar />
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default AnaPage;
