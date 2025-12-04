import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./utils/context/AuthContext.jsx";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { PanierProvider } from "./utils/context/PanierContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PanierProvider>
      <BrowserRouter scrollRestoration="manual">
        <App />
      </BrowserRouter>
    </PanierProvider>
  </StrictMode>
);
