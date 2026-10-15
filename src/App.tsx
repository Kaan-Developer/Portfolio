import { BrowserRouter, Route, Routes } from "react-router-dom";

import AnaPage from "./pages/AnaPage";
import NotFound from "./components/feedback/NotFound";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AnaPage />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
    </BrowserRouter>
  );
};

export default App;