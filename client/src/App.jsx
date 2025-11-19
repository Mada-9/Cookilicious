import React from "react";
import { Routes, Route } from "react-router-dom";

//MES PAGES

import Home from "./pages/PageHome/Home";
import Template from "./components/Template/Template";
import Produit from "./pages/PageProduit/Produit";
import DetailProduit from "./pages/PageProduit/DetailProduit";
import PageRecette from "./pages/PageRecette/PageRecette";
import PageApropos from "./pages/PageApropos/PageApropos";
import PageContact from "./pages/PageContact/PageContact";
import PagePanier from "./pages/PagePanier/PagePanier";
import PagePaiement from "./pages/PagePanier/PagePaiement";
//pages admin
import PageProduitDashboard from "../src/admin/PageProduit/PageProduitDashboard";
import PageRecetteDashboard from "./admin/PageRecette/PageRecetteDashboard";
import Dashboard from "./admin/PageDashboard/PageDashboard";
import TemplateAdmin from "../../client/src/components/Template/TemplateAdmin";
import PageContactDashboard from "./admin/PageContact/PageContactDashboard";
import PageAproposDashboard from "./admin/PageApropos/PageAproposDashboard"

//CSS
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route index element={<Home />} />
        <Route path="produit" element={<Produit />} />
        <Route path="detail/:id" element={<DetailProduit />} />
        <Route path="panier" element={<PagePanier />} />
        <Route path="paiement" element={<PagePaiement/>}/>

        <Route path="recette" element={<PageRecette />} />
        <Route path="contact" element={<PageContact />} />
        <Route path="apropos" element={<PageApropos />} />
      </Route>
      <Route path="/admin" element={<TemplateAdmin />}>
        <Route index element={<Dashboard />} />
        <Route path="produit" element={<PageProduitDashboard />} />
        <Route path="recette" element={<PageRecetteDashboard />} />
        <Route path="apropos" element={<PageAproposDashboard />} />
        <Route path="contact" element={<PageContactDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
