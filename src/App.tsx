import { BrowserRouter, Route, Routes } from "react-router-dom";

import AnaPage from "./pages/AnaPage";
import PrivacyPage from "./pages/PrivacyPage";
import Details from "./components/ui/Details";
import NotFound from "./components/feedback/NotFound";
import PageLayout from "./layouts/PageLayout";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AnaPage />} />

      <Route element={<PageLayout />}>
        <Route path="/projects/:slug" element={<Details />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
