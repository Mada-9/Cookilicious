import { Routes, Route, useLocation } from "react-router-dom";
import ChatbotWidget from "./components/chatbot/ChatbotWidget";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";

import "react-toastify/dist/ReactToastify.css";

//PAGES CLIENT

import Home from "./pages/PageHome/Home";
import Cookies from "./pages/PageProduit/Cookies";
import Brookies from "./pages/PageProduit/Brookies";
import DetailProduit from "./pages/PageProduit/DetailProduit";
import PageRecette from "./pages/PageRecette/PageRecette";
import PageApropos from "./pages/PageApropos/PageApropos";
import PageContact from "./pages/PageContact/PageContact";
import PagePanier from "./pages/Pagepanier/Pagepanier";
import PagePaiement from "./pages/Pagepanier/PagePaiement";
import Profil from "./pages/PageAuth/Profil";
import Sign from "./pages/PageAuth/Sign";
import Register from "./pages/PageAuth/Register";
import Nothing from "./pages/PageNothing/Nothing";
import Mentionslegales from "./pages/PagesPolitiques/MentionsLegales";
import CGV from "./pages/PagesPolitiques/CGV";
import RGPD from "./pages/PagesPolitiques/RGPD";

//PAGES ADMIN
import PageProduitDashboard from "../src/admin/PageProduit/PageProduitDashboard";
import PostProduit from "./admin/PageProduit/PostProduit";
import UpdateProduit from "./admin/PageProduit/UpdateProduit";
import ProduitDetail from "./admin/PageProduit/ProduitDetail";
import PageRecetteDashboard from "./admin/PageRecette/PageRecetteDashboard";
import PostRecette from "./admin/PageRecette/PostRecette";
import UpdateRecette from "./admin/PageRecette/UpdateRecette";
import RecetteDetail from "./admin/PageRecette/RecetteDetail";
import Dashboard from "./admin/PageDashboard/PageDashboard";
import PageContactDashboard from "./admin/PageContact/PageContactDashboard";
import PageAproposDashboard from "./admin/PageApropos/PageAproposDashboard";
import PageMembresDashboard from "./admin/PageMembres/PageMembresDashboard";
import PageCommandesDashboard from "./admin/PageCommandes/PageCommandesDashboard";

// TEMPLATES
import Template from "./components/Template/Template";
import TemplateAdmin from "../../client/src/components/Template/TemplateAdmin";

// SERVICES
import PublicRoute from "./utils/helpers/PublicRoute";
import PrivateRoute from "./utils/helpers/PrivateRoute";
import PrivateRouteAdmin from "./utils/helpers/PrivateRouteAdmin";

//CSS
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {" "}
          {/* a definir */}
          {/* ROUTES FRONTEND PUBLIC */}
          <Route path="/" element={<Template />}>
            <Route index element={<Home />} />
            <Route path="Cookies" element={<Cookies />} />
            <Route path="brookies" element={<Brookies />} />
            <Route path="detail/:id" element={<DetailProduit />} />
            <Route path="panier" element={<PagePanier />} />
            <Route path="paiement" element={<PagePaiement />} />
            <Route path="recette" element={<PageRecette />} />
            <Route path="contact" element={<PageContact />} />
            <Route path="apropos" element={<PageApropos />} />
            <Route path="mentionslegales" element={<Mentionslegales />} />
            <Route path="cgv" element={<CGV />} />
            <Route path="rgpd" element={<RGPD />} />

            {/* Routes publiques (non accessible si pas connecté) */}
            <Route element={<PublicRoute />}>
              <Route path="sign" element={<Sign />} />
              <Route path="register" element={<Register />} />
            </Route>
            {/* Routes privées (connexion requise) */}
            <Route element={<PrivateRoute />}>
              <Route path="profil" element={<Profil />} />
            </Route>
          </Route>
          {/* ROUTES ADMIN */}
          <Route element={<PrivateRouteAdmin />}>
            <Route path="/admin" element={<TemplateAdmin />}>
              <Route index element={<Dashboard />} />
              {/* produit */}
              <Route path="produit" element={<PageProduitDashboard />} />
              <Route path="postproduit" element={<PostProduit />} />
              <Route path="updateproduit/:id" element={<UpdateProduit />} />
              <Route path="produitdetail/:id" element={<ProduitDetail />} />
              {/* recette */}
              <Route path="recette" element={<PageRecetteDashboard />} />
              <Route path="postrecette" element={<PostRecette />} />
              <Route path="updaterecette/:id" element={<UpdateRecette />} />
              <Route path="recetteDetail/:id" element={<RecetteDetail />} />
              {/* messages */}
              <Route path="contact" element={<PageContactDashboard />} />
              {/* comptes */}
              <Route path="membres" element={<PageMembresDashboard />} />
              {/* commandes */}
              <Route path="commandes" element={<PageCommandesDashboard />} />
            </Route>
          </Route>
          <Route path="*" element={<Nothing />} />
        </Routes>
      </AnimatePresence>

      <ChatbotWidget />
    </>
  );
}

export default App;
