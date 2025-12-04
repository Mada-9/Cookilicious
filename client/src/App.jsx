import React from "react";
import { Routes, Route } from "react-router-dom";

//PAGES CLIENT

import Home from "./pages/PageHome/Home";
import Cookies from "./pages/PageProduit/Cookies"; //transformer en cookies
import Brookies from "./pages/PageProduit/Brookies"
import DetailProduit from "./pages/PageProduit/DetailProduit";
import PageRecette from "./pages/PageRecette/PageRecette";
import PageApropos from "./pages/PageApropos/PageApropos";
import PageContact from "./pages/PageContact/PageContact";
import PagePanier from "./pages/Pagepanier/Pagepanier";
import PagePaiement from "./pages/PagePanier/PagePaiement";
import PageConnexion from "./pages/PageConnexion/PageConnexion";
import Nothing from "./pages/PageNothing/Nothing";
import Mentionslegales from "./pages/PagesPolitiques/MentionsLegales";
import CGV from "./pages/PagesPolitiques/CGV"
import RGPD from "./pages/PagesPolitiques/RGPD"

//PAGES ADMIN
import PageProduitDashboard from "../src/admin/PageProduit/PageProduitDashboard";
import PageRecetteDashboard from "./admin/PageRecette/PageRecetteDashboard";
import Dashboard from "./admin/PageDashboard/PageDashboard";
import PageContactDashboard from "./admin/PageContact/PageContactDashboard";
import PageAproposDashboard from "./admin/PageApropos/PageAproposDashboard";
import PageCompteDashboard from "./admin/PageCompte/PageCompteDashboard";

// TEMPLATES
import Template from "./components/Template/Template";
import TemplateAdmin from "../../client/src/components/Template/TemplateAdmin";

//CSS
import "./App.css";

function App() {
  return (
    <Routes>
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
        <Route path="connexion" element={<PageConnexion />} />
        <Route path="mentionslegales" element={<Mentionslegales />} />
        <Route path="cgv"element={<CGV />}/>
        <Route path="rgpd"element={<RGPD />}/>

        
      </Route>

      <Route path="/admin" element={<TemplateAdmin />}>
        <Route index element={<Dashboard />} />
        <Route path="produit" element={<PageProduitDashboard />} />
        <Route path="recette" element={<PageRecetteDashboard />} />
        <Route path="apropos" element={<PageAproposDashboard />} />
        <Route path="contact" element={<PageContactDashboard />} />
        <Route path="compte" element={<PageCompteDashboard />} />
      </Route>
      <Route path="*" element={<Nothing />} />
    </Routes>
  );
}

export default App;
