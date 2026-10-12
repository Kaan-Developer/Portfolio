import Navbar from "../components/ui/Navbar";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import ProfileSummary from "../components/ui/ProfileSummary";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";

const AnaPage = () => {
  return (
    <>
      <main className="bg-bg">
        <Navbar />
        <Hero />
        <ProfileSummary />
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
