import Navbar from "../components/ui/Navbar";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";

const AnaPage = () => {
  return (
    <main>
      <Navbar />

      <main>
        <Hero />

        <About />
      </main>

      {/* PROJECTS */}
      <section id="projects" className="min-h-screen">
        {/* Projects */}
      </section>

      {/* SKILLS */}
      <section id="skills" className="min-h-screen">
        {/* Skills */}
      </section>

      {/* CONTACT */}
      <section id="contact" className="min-h-screen">
        {/* Contact */}
      </section>
    </main>
  );
};

export default AnaPage;
