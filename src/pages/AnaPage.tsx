import Navbar from "../components/ui/Navbar";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Stats from "../components/ui/Stats";

const AnaPage = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <About />

      <section id="projects" className="py-20 md:py-28">
        {/* Projects */}
      </section>
      <section id="skills" className="py-20 md:py-28">
        {/* Skills */}
      </section>
      <section id="contact" className="py-20 md:py-28">
        {/* Contact */}
      </section>
    </main>
  );
};

export default AnaPage;
