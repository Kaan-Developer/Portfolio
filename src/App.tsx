import { BrowserRouter, Route, Routes } from "react-router-dom";

import AnaPage from "./pages/AnaPage";
import NotFound from "./components/feedback/NotFound";
import Details from "./components/ui/Details";
import PrivacyPage from "./pages/PrivacyPage";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AnaPage />}></Route>
      <Route path="*" element={<NotFound />}></Route>
      <Route path="/projects/:slug" element={<Details />}></Route>
      <Route path="/privacy" element={<PrivacyPage />}></Route>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
