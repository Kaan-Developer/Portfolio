import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/instrument-serif/400-italic.css";
import "./index.css";
import App from "./App.tsx";

const entryUrl = new URL(window.location.href);

if (entryUrl.pathname === "/") {
  window.history.scrollRestoration = "manual";
  entryUrl.hash = "";

  window.history.replaceState(window.history.state, "", entryUrl);
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);