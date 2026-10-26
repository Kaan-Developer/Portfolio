import { BrowserRouter, Route, Routes } from "react-router-dom";

import AnaPage from "./pages/AnaPage";
import PrivacyPage from "./pages/PrivacyPage";
import Details from "./components/ui/Details";
import NotFound from "./components/feedback/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AnaPage />} />


        <Route path="/projects/:slug" element={<Details />} />
        <Route path="/privacy" element={<PrivacyPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;