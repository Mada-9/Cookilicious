import React from "react";
import { Link } from "react-router-dom";
// import TemplateAdmin from "../../components/Template/TemplateAdmin";

const PageDashboard = () => {
  const styles = {
    dashboardContent: {
      display: "flex",
      flexWrap: "wrap",
      gap: "2rem",
      margin: "3rem",
    },

    card: {
      maxWidth: "23rem",
      height: "14rem",
      padding: "0",
      border: "5px solid var(--marronRouge)",
    },
    cardLink: {
      width: "23rem",
      height: "7rem",
      alignSelf: "center",
      justifyContent: "center",
      backgroundColor: "var(--marronRouge)",
      color: "var(--creme)",
    },
    cardContent: { fontSize: "1.3rem", justifySelf: "center" },
  };
  return (
    <div style={styles.dashboardContent}>
      {/* ********************************************************************* */}
      <section className="card  mb-3" style={styles.card}>
        <a
          href="/admin/compte"
          className="card-header"
          style={styles.cardLink}
        >
          Gestion des comptes
        </a>
        <div className="card-body text-primary" style={styles.cardContent}>
          <p className="card-text" style={styles.cardDescription}>
            voir details et suppression des comptes
          </p>
        </div>
      </section>
      {/* ************************************************************** */}
      <section className="card  mb-3" style={styles.card}>
        <a
          href="/admin/contact"
          className="card-header"
          style={styles.cardLink}
        >
          Gestion des messages (page des form contact)
        </a>
        <div className="card-body text-primary" style={styles.cardContent}>
          <p className="card-text" style={styles.cardDescription}>
            Ajouter, supprimer, update, voir les messages et avis?
          </p>
        </div>
      </section>
      {/* ************************************************************** */}
      <section className="card mb-3" style={styles.card}>
        <a
          href="/admin/recette"
          className="card-header"
          style={styles.cardLink}
        >
          Gestion des recettes
        </a>
        <div className="card-body text-primary" style={styles.cardContent}>
          <p className="card-text" style={styles.cardDescription}>
            Ajouter, supprimer, update, voir les recttes
          </p>
        </div>
      </section>
      {/* *********************************************************** */}

      <section className="card  mb-3" style={styles.card}>
        <a
          href="/admin/produit"
          className="card-header"
          style={styles.cardLink}
        >
          Gestion des produits
        </a>
        <div className="card-body text-primary" style={styles.cardContent}>
          <p className="card-text" style={styles.cardDescription}>
            Ajouter, supprimer, update, voir les produits
          </p>
        </div>
      </section>
      {/* ****************************************************************** */}

      <section className="card  mb-3" style={styles.card}>
        <a
          href="/admin/commandes"
          className="card-header"
          style={styles.cardLink}
        >
          Gestion des commandes
        </a>
        <div className="card-body text-primary" style={styles.cardContent}>
          <p className="card-text" style={styles.cardDescription}>
            stock, articles envoyés, suivi des commandes
          </p>
        </div>
      </section>

      {/* ********************************************************************* */}
      {/* <section className="card  mb-3" style={styles.card}>
        <a
          href="/admin/apropos"
          className="card-header"
          style={styles.cardLink}
        >
          A propos
        </a>
        <div className="card-body text-primary" style={styles.cardContent}>
          <p className="card-text" style={styles.cardDescription}>
            Gestion de la pages à propos
          </p>
        </div>
      </section> */}
    </div>
  );
};

export default PageDashboard;
