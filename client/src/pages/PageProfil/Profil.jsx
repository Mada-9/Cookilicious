import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/context/AuthContext";

const Profile = () => {
  const { user, logout, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  // 1. Gestion du chargement (évite le crash au rafraîchissement)
  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  // 2. Sécurité si pas d'utilisateur connecté
  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h4>Veuillez vous connecter pour accéder à votre espace.</h4>
        <Link to="/" className="btn btn-primary mt-3">Retour à l'accueil</Link>
      </div>
    );
  }

  // 3. Récupération des données (Gère le cas où l'API renvoie {user: {...}})
  const userData = user.user ? user.user : user;

  return (
    <div className="container py-5">
      <div className="row">
        {/* Sidebar Menu */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0">
            <div
              className="card-body text-center"
              style={{
                backgroundColor: "var(--marronRouge)",
                color: "var(--creme)",
              }}
            >
              <div className="mb-3">
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: "4rem", color: "var(--creme)" }}
                ></i>
              </div>
              <h4 className="mb-0">
                {user.prenom} {user.nom}
              </h4>
              <p className="small mt-2" style={{ opacity: 0.8 }}>
                {user.email}
              </p>
              <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />

              <div className="list-group list-group-flush text-start">
                <Link
                  to="/profil/commandes"
                  className="list-group-item list-group-item-action border-0"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--creme)",
                  }}
                >
                  <i className="bi bi-box-seam me-2"></i> Mes Commandes
                </Link>
                <Link
                  to="/profil/paramètres"
                  className="list-group-item list-group-item-action border-0"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--creme)",
                  }}
                >
                  <i className="bi bi-gear me-2"></i> Paramètres
                </Link>
                <button
                  onClick={logout}
                  className="list-group-item list-group-item-action border-0 text-start"
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--creme)",
                    cursor: "pointer",
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-md-8" >
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0" style={{color:"var(--marronRouge)"}}>Informations personnelles</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Nom </div>
                <div className="col-sm-8" style={{color:"var(--marronRouge)"}}>
                 {user.nom}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Prénom</div>
                <div className="col-sm-8" style={{color:"var(--marronRouge)"}}>{user.prenom}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Pseudo</div>
                <div className="col-sm-8" style={{color:"var(--marronRouge)"}}>{user.pseudo}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Adresse Email</div>
                <div className="col-sm-8" style={{color:"var(--marronRouge)"}}>{user.email}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Civilité</div>
                <div className="col-sm-8" style={{color:"var(--marronRouge)"}}>{user.civilite}</div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Identifiant client</div>
                <div className="col-sm-8 text-monospace small" style={{color:"var(--marronRouge)"}}>{user._id}</div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4 text-muted">Membre depuis</div>
                <div className="col-sm-8" style={{color:"var(--marronRouge)"}}>
                  {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1" style={{color:"var(--marronRouge)"}}>Historique d'achats</h5>
                <p className="text-muted mb-0 small">
                  Consultez et suivez vos commandes passées.
                </p>
              </div>
              <Link
                to="/profil/commandes"
                className="btn"
                style={{
                  backgroundColor: "var(--marronRouge)",
                  color: "var(--creme)",
                }}
              >
                Gérer mes commandes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
