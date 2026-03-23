import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "../src/components/Motion/AnimatePage";
import "react-toastify/dist/ReactToastify.css";


//PAGES CLIENT

import Home from "./pages/PageHome/Home";

import Cookies from "./pages/PageProduit/Cookies";
import Brookies from "./pages/PageProduit/Brookies";
import DetailCookie from "./pages/PageProduit/DetailCookie";
import DetailBrookie from "./pages/PageProduit/DetailBrookie";

import PageRecette from "./pages/PageRecette/PageRecette";

import PageContact from "./pages/PageContact/PageContact";
import PagePanier from "./pages/Pagepanier/Pagepanier";
import PagePaiement from "./pages/Pagepanier/PagePaiement";
import ValidationCommande from "./pages/Pagepanier/ValidationCommande"

import Profil from "./pages/PageProfil/Profil";
import Commandes from "./pages/PageProfil/Commandes";
import Paramètres from "./pages/PageProfil/Paramètres";

import Sign from "./pages/PageAuth/Sign";
import Register from "./pages/PageAuth/Register";
import Nothing from "./pages/PageNothing/Nothing";

import PageApropos from "./pages/PageApropos/PageApropos";
import Mentionslegales from "./pages/PagesPolitiques/MentionsLegales";
import CGV from "./pages/PagesPolitiques/CGV";
import RGPD from "./pages/PagesPolitiques/RGPD";
import VerifyEmail from "./components/VerifyEmail";

//PAGES ADMIN

import Dashboard from "./admin/PageDashboard/PageDashboard";

import PageCookiesDashboard from "../src/admin/PageCookies/PageCookiesDashboard";
import PostCookie from "./admin/PageCookies/PostCookies";
import UpdateCookie from "./admin/PageCookies/UpdateCookies";
import CookieDetail from "./admin/PageCookies/CookieDetail";


import PageBrookiesDashboard from "../src/admin/PageBrookies/PageBrookiesDashboard";
import PostBrookie from "./admin/PageBrookies/PostBrookies";
import UpdateBrookie from "./admin/PageBrookies/UpdateBrookies";
import BrookieDetail from "./admin/PageBrookies/BrookieDetail";

import PageRecetteDashboard from "./admin/PageRecette/PageRecetteDashboard";
import PostRecette from "./admin/PageRecette/PostRecette";
import UpdateRecette from "./admin/PageRecette/UpdateRecette";
import RecetteDetail from "./admin/PageRecette/RecetteDetail";


import PageContactDashboard from "./admin/PageContact/PageContactDashboard";
import PageMembresDashboard from "./admin/PageMembres/PageMembresDashboard";
import MembreDetail from "./admin/PageMembres/MembreDetail";
import UpdateMembre from "./admin/PageMembres/UpdateMembre"

import PageCommandesDashboard from "./admin/PageCommandes/PageCommandesDashboard";
import UpdateCommande from "./admin/PageCommandes/UpdateCommande";
import CommandeDetail from "./admin/PageCommandes/CommandeDetail";

import PageAvisDashboard from "./admin/PageAvis/PageAvisDashboard";
import AvisDetail from "./admin/PageAvis/AvisDetail";


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
      <ToastContainer position="top-right"autoClose={3000}/>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>

          {/* ROUTES FRONTEND PUBLIC */}
          <Route path="/" element={<Template />}>
            <Route index element={<AnimatedPage><Home /></AnimatedPage>} />

            <Route path="Cookies" element={<AnimatedPage><Cookies /></AnimatedPage>} />
            <Route path="cookie/:id" element={<AnimatedPage><DetailCookie /></AnimatedPage>} />

            <Route path="brookies" element={<AnimatedPage><Brookies /></AnimatedPage>} />
            <Route path="brookie/:id" element={<AnimatedPage><DetailBrookie /></AnimatedPage>} />

            <Route path="panier" element={<AnimatedPage><PagePanier /></AnimatedPage>} />
            <Route path="paiement" element={<AnimatedPage><PagePaiement /></AnimatedPage>} />
            <Route path="/paiement/redirect" element={<AnimatedPage><ValidationCommande /></AnimatedPage>} />

            <Route path="recette" element={<AnimatedPage><PageRecette /></AnimatedPage>} />

            <Route path="contact" element={<AnimatedPage><PageContact /></AnimatedPage>} />
            <Route path="apropos" element={<AnimatedPage><PageApropos /></AnimatedPage>} />
            <Route path="mentionslegales" element={<AnimatedPage><Mentionslegales /></AnimatedPage>} />
            <Route path="cgv" element={<AnimatedPage><CGV /></AnimatedPage>} />
            <Route path="rgpd" element={<AnimatedPage><RGPD /></AnimatedPage>} />


              {/* Routes réservées aux visiteurs : pas d'accès à ces pages si 
              l'utilisateur est déjà connecté.*/}            
              <Route element={<PublicRoute />}>
              <Route path="sign" element={<AnimatedPage><Sign /></AnimatedPage>} />
              <Route path="register" element={<AnimatedPage><Register /></AnimatedPage>} />
              <Route path="/verify/:token" element={<VerifyEmail />} /> 
            </Route>


            {/* Routes privées (connexion requise) */}
            <Route element={<PrivateRoute />}>
              <Route path="profil" element={<AnimatedPage><Profil /></AnimatedPage>} />
              <Route path="profil/commandes" element={<AnimatedPage><Commandes /></AnimatedPage>} />
              <Route path="profil/paramètres" element={<AnimatedPage><Paramètres /></AnimatedPage>} />
            </Route>

          </Route>


          {/* ROUTES ADMIN */}
          <Route element={<PrivateRouteAdmin />}>
            <Route path="/admin" element={<TemplateAdmin />}>
              <Route index element={<Dashboard />} />
            
              {/* cookies */}
              <Route path="cookies" element={<PageCookiesDashboard />} />
              <Route path="postcookie" element={<PostCookie/>} />
              <Route path="updatecookie/:id" element={<UpdateCookie />} />
              <Route path="cookiedetail/:id" element={<CookieDetail />} />

              {/* brookies */}
              <Route path="brookies" element={<PageBrookiesDashboard />} />
              <Route path="postbrookie" element={<PostBrookie/>} />
              <Route path="updatebrookie/:id" element={<UpdateBrookie />} />
              <Route path="brookiedetail/:id" element={<BrookieDetail />} />

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
              <Route path="updatecommande/:id" element={<UpdateCommande/>} />
              <Route path="commandedetail/:id" element={< CommandeDetail/>} />
                {/* abis */}
              <Route path="avis" element={<PageAvisDashboard />} />
              <Route path="avisdetail/:id" element={< AvisDetail/>} />

            </Route>
          </Route>
          <Route path="*" element={<Nothing />} />
        </Routes>
      </AnimatePresence>

    </>
  );
}

export default App;
