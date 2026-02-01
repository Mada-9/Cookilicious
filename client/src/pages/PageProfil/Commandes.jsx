import React, { useState, useEffect, useContext } from "react";
import URL from "../../utils/constant/url";
import { AuthContext } from "../../utils/context/AuthContext";
import axiosInstance from "../../utils/axios/axiosinstance";
import { Link } from "react-router-dom";

const Commandes = () => {
  const { user, isLoading } = useContext(AuthContext);
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    if (isLoading || !user?._id) return;
    getCommandes();
  }, [user, isLoading]);

  const getCommandes = async () => {
    try {
      const { data } = await axiosInstance.get(
        URL.GET_USER_COMMANDES + user._id
      );
      console.log(data);

      setCommandes(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    border: "1px solid #eee",
    fontFamily: "sans-serif",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "2px solid #f8f8f8",
    paddingBottom: "10px",
    marginBottom: "15px",
  };

  const sectionTitle = {
    fontSize: "14px",
    color: "#888",
    textTransform: "uppercase",
    marginBottom: "10px",
    fontWeight: "bold",
  };

  return (
    <div className="container py-5">
      <h2
        className="mb-5 fw-bold text-center"
        style={{ color: "var(--marronRouge)" }}
      >
        <i className="bi bi-box-seam me-3"></i>Mes commandes
      </h2>

      {commandes.length === 0 ? (
        <div className="text-center py-5 shadow-sm rounded bg-white">
          <p className="text-muted">
            Vous n'avez pas encore passé de commande.
          </p>
        </div>
      ) : (
        commandes.map((item) => (
          <div
            key={item._id}
            className="card shadow-sm border-0 mb-4 overflow-hidden"
            style={{ borderRadius: "15px" }}
          >
            <div
              className="
                card-header 
                border-0 
                d-flex 
                flex-column 
                flex-md-row 
                justify-content-between 
                align-items-start 
                align-items-md-center 
                py-3
              "
              style={{
                backgroundColor: "var(--marronRouge)",
                color: "var(--creme)",
              }}
            >
              <div className="mb-3 mb-md-0 text-center text-md-start w-100 w-md-auto">
                <p className="small opacity-75 mb-1">Commande n°</p>
                <h5 className="mb-0 fw-bold">{item._id}</h5>
              </div>

              <div className="text-center text-md-end w-100 w-md-auto">
                <span className="small opacity-75">Passée le</span>
                <p className="mb-0 fw-bold">
                  {new Date(item.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>

            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-6 border-end">
                  <h5
                    className="text-uppercase small fw-bold mb-3"
                    style={{
                      color: "var(--marronRouge)",
                    }}
                  >
                    Adresse de livraison
                  </h5>
                  <div className="small text-muted">
                    <h5 className="mb-2 text-muted fw-bold">
                      <span
                        style={{
                          color: "var(--marronRouge)",
                          marginRight: "1rem",
                        }}
                      >
                        Prénom:
                      </span>
                      {item.adresse_livraison.prenom}
                    </h5>
                    <h5 className="mb-2">
                      <span
                        style={{
                          color: "var(--marronRouge)",
                          marginRight: "1rem",
                        }}
                      >
                        Nom:
                      </span>
                      {item.adresse_livraison.nom}
                    </h5>
                    <h5 className="mb-2">
                      <span
                        style={{
                          color: "var(--marronRouge)",
                          marginRight: "1rem",
                        }}
                      >
                        Addresse:
                      </span>
                      {item.adresse_livraison.adresse}
                    </h5>

                    <h5 className="mb-2 ">
                      {" "}
                      <span
                        style={{
                          color: "var(--marronRouge)",
                          marginRight: "1rem",
                        }}
                      >
                        Complément d'adresse:
                      </span>
                      {item.adresse_livraison.complementAdresse}
                    </h5>

                    <h5 className="mb-2">
                      {" "}
                      <span
                        style={{
                          color: "var(--marronRouge)",
                          marginRight: "1rem",
                        }}
                      >
                        Code Postal:
                      </span>
                      {item.adresse_livraison.codePostal}{" "}
                    </h5>
                    <h5 className="mb-2">
                      <span
                        style={{
                          marginRight: "1rem",
                          color: "var(--marronRouge)",
                        }}
                      >
                        Ville:
                      </span>
                      {item.adresse_livraison.ville}
                    </h5>
                    <h5 className="mb-2">
                      {" "}
                      <span
                        style={{
                          color: "var(--marronRouge)",
                          marginRight: "1rem",
                        }}
                      >
                        Pays:
                      </span>
                      {item.adresse_livraison.pays}
                    </h5>
                  </div>
                </div>

                {/* Colonne Articles */}
                <div className="col-md-6 ps-md-4 mt-4 mt-md-0">
                  <h6
                    className="text-uppercase small fw-bold mb-3"
                    style={{
                      color: "var(--marronRouge)",
                      letterSpacing: "1px",
                    }}
                  >
                    Détails des articles
                  </h6>
                  <div className="mb-3">
                    {item.items.map((article, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between align-items-center mb-2"
                      >
                        <div className="d-flex align-items-center">
                          {article.image && (
                            <img
                              src={article.image}
                              alt={article.titre}
                              style={{
                                width: "40px",
                                height: "40px",
                                objectFit: "cover",
                                borderRadius: "5px",
                                marginRight: "10px",
                              }}
                            />
                          )}
                          <span className="small text-muted">
                            <span
                              className="fw-bold"
                              style={{ color: "var(--marronRouge)" }}
                            >
                              {article.quantity}x
                            </span>
                            {article.titre}
                          </span>
                        </div>
                        <span className="small fw-bold">
                          {article.prixUnitaire}€
                        </span>
                      </div>
                    ))}
                  </div>

                  <hr className="my-3" />

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-muted">Total réglé</span>
                    <span
                      className="h5 mb-0 fw-bold"
                      style={{ color: "var(--marronRouge)" }}
                    >
                      {item.prixTotal} €
                    </span>
                  </div>
                  <div className="mt-2 text-end">
                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}
                    >
                      ● {item.statut || "Validée"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="text-center mt-5 mb-5">
        <button
          className="btn  btn-lg px-5 rounded-pill
                 fw-bold"
          style={{
            backgroundColor: "var(--creme)",
            color: "var(--marronRouge",
            border: "1px solid var(--marronRouge",
          }}
        >
          <Link to="/profil">Retour aux commandes</Link>
        </button>
      </div>
    </div>
  );
};

export default Commandes;
