import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// Ponto de entrada: encontra a div do HTML e renderiza nossa aplicação nela.
// StrictMode ajuda a descobrir problemas durante o desenvolvimento.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
