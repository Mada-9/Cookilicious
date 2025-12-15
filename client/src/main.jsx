import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import { PanierProvider } from "./utils/context/PanierContext.jsx";
import { ThemeProvider } from "./utils/context/ThemeContext.jsx";
import { AuthProvider } from "./utils/context/AuthContext.jsx";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {" "}
    <BrowserRouter scrollRestoration="manual">
      <AuthProvider>
        <PanierProvider>
          <ScrollToTop />
          <ThemeProvider>
            <App />{" "}
          </ThemeProvider>
        </PanierProvider>
      </AuthProvider>{" "}
    </BrowserRouter>{" "}
  </StrictMode>
);
