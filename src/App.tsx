import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import TopNav from "./components/TopNav";

import StartPage from "./pages/StartPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

import AIBot from "./components/AIBot";
import AIButton from "./components/AIButton";
import Pattern from "./components/Pattern";
import ContactModal from "./components/ContactModal";
import Footer from "./components/Footer";

import { useThemeStore } from "./store/themeStore";
import { useAIStore } from "./store/aiToggleStore";
import { useToggleStore } from "./store/contactStore";

const App = () => {
  const { isDark } = useThemeStore();
  const { isOpen } = useAIStore();
  const { contactOpen } = useToggleStore();

  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className="relative z-0 min-h-screen text-text-primary">
            <Pattern />
      <BrowserRouter>
        <TopNav />

        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/work" element={<StartPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

      <Footer />
      </BrowserRouter>

      <AIButton />

      {isOpen && (
        <AIBot />
      )}

      {contactOpen && (
        <ContactModal />
      )}
    </div>
  );
};

export default App;
