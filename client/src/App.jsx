import { Routes, Route, useLocation } from "react-router-dom";
import ChatbotWidget from "./components/chatbot/ChatbotWidget";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "../src/components/Motion/AnimatePage";

import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "./utils/services/Stripe";

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
import PageMembresDashboard from "./admin/PageMembres/PageMembresDashboard";
import MembreDetail from "./admin/PageMembres/MembreDetail";
import UpdateMembre from "./admin/PageMembres/UpdateMembre"
import PageCommandesDashboard from "./admin/PageCommandes/PageCommandesDashboard";
import CommandeDetail from "./admin/PageCommandes/CommandeDetail"


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
      <ToastContainer position="center" autoClose={3000} />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {" "}
          {/* a definir */}
          {/* ROUTES FRONTEND PUBLIC */}
          <Route path="/" element={<Template />}>
            <Route index element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="Cookies" element={<AnimatedPage><Cookies /></AnimatedPage>} />
            <Route path="brookies" element={<AnimatedPage><Brookies /></AnimatedPage>} />
            <Route path="detail/:id" element={<AnimatedPage><DetailProduit /></AnimatedPage>} />
            <Route path="panier" element={<AnimatedPage><PagePanier /></AnimatedPage>} />
            <Route path="paiement" element={<AnimatedPage><PagePaiement /></AnimatedPage>} />
            <Route path="recette" element={<AnimatedPage><PageRecette /></AnimatedPage>} />
            <Route path="contact" element={<AnimatedPage><PageContact /></AnimatedPage>} />
            <Route path="apropos" element={<AnimatedPage><PageApropos /></AnimatedPage>} />
            <Route path="mentionslegales" element={<AnimatedPage><Mentionslegales /></AnimatedPage>} />
            <Route path="cgv" element={<AnimatedPage><CGV /></AnimatedPage>} />
            <Route path="rgpd" element={<AnimatedPage><RGPD /></AnimatedPage>} />

            {/* Routes publiques (non accessible si pas connecté) */}
            <Route element={<PublicRoute />}>
              <Route path="sign" element={<AnimatedPage><Sign /></AnimatedPage>} />
              <Route path="register" element={<AnimatedPage><Register /></AnimatedPage>} />
            </Route>


            {/* Routes privées (connexion requise) */}
            <Route element={<PrivateRoute />}>
              <Route path="profil" element={<AnimatedPage><Profil /></AnimatedPage>} />
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
              <Route path="recettedetail/:id" element={<RecetteDetail />} />
              {/* messages */}
              <Route path="contact" element={<PageContactDashboard />} />
              {/* comptes */}
              <Route path="membres" element={<PageMembresDashboard />} />
              <Route path="updatemembre/:id" element={<UpdateMembre/>} />
              <Route path="membredetail/:id" element={<MembreDetail />} />
              {/* commandes */}
              <Route path="commandes" element={<PageCommandesDashboard />} />
              <Route path="commandedetail/:id" element={< CommandeDetail/>} />

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
