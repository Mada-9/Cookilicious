import React from "react";
import { Link } from "react-router-dom";

const PageDashboard = () => {
  return (
    <div
      style={{
        height: "30rem",
        display: "flex",
        flexDirection: "column",
        justifySelf: "center",
      }}
    >
      <h1 style={{ fontSize: "5rem" }}>Dashboard Home </h1>
      <Link to="/admin/cookies">Crud cookies</Link>
      <Link to="/admin/brookies">Crud brookies</Link>
      <Link to="/admin/recette">Crud recettes</Link>
      <Link to="/admin/avis">Crud avis</Link>
      <Link to="/admin/membres">Crud membres</Link>
      <Link to="/admin/contact">Crud messages</Link>
      <Link to="/admin/commandes">Crud commandes</Link>
    </div>
  );
};

export default PageDashboard;
