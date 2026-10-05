import Navbar from "../components/ui/Navbar";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Stats from "../components/ui/Stats";
import Projects from "../components/sections/Projects";

const AnaPage = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Projects />

      <section className="py-20 md:py-28">
        {/* Projects */}
      </section>
      <section className="py-20 md:py-28">
        {/* Contact */}
      </section>
    </main>
  );
};

export default AnaPage;
