import React from "react";
import { Link } from "react-router-dom";

const ValidationCommande = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center ">
      <div
        className="  p-5 text-center"
        style={{
          boxShadow: "#ded5b6ff 0px 0px 5px 5px",
          maxWidth: "42rem",
          borderRadius: "15px",
          marginBottom: "5rem",
          marginTop: "5rem",
        }}
      >
        {/* Icône de succès */}
        <div className="mb-4">
          <i
            className="bi bi-check-circle-fill text-success"
            style={{ fontSize: "2rem" }}
          ></i>
        </div>

        <h2 className="fw-bold mb-3">Commande validée !</h2>

        <p className="mb-4">
          Merci pour votre achat. Votre commande a bien été prise en compte et
          est en cours de préparation.
        </p>

        <hr className="my-4" />

        <div className="d-grid gap-2">
          <Link
            to="/profil/commandes"
            className="btn btn-lg"
            style={{
              backgroundColor: "var(--marronRouge)",
              color: "var(--creme)",
            }}
          >
            <i className="bi bi-box-seam me-2"></i>Voir mes commandes
          </Link>

          <Link
            to="/"
            className="btn"
            style={{ border: "2px solid var(--marronRouge)" }}
          >
            Retour à la page d'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ValidationCommande;
