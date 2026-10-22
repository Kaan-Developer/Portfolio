import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/instrument-sans";
import "@fontsource/instrument-serif";
import "@fontsource/instrument-serif/400-italic.css";
import "./index.css";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
