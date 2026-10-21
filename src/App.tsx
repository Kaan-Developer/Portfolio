import { BrowserRouter, Route, Routes } from "react-router-dom";

import AnaPage from "./pages/AnaPage";
import Dashboard from "./pages/Dashboard";
import PrivacyPage from "./pages/PrivacyPage";
import Projects from "./components/sections/Projects";
import Details from "./components/ui/Details";
import NotFound from "./components/feedback/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AnaPage />} />

      <Route element={<Dashboard />}>
        <Route path="/dashboard" element={<Projects />} />
        <Route path="/projects/:slug" element={<Details />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;