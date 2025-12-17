import { useContext, useState } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import HEADER_LINKS from "../../utils/config/LinkHeader";

import { SIGN_FIELDS } from "../../utils/config/FormFields";

import "./panier.css"; // CSS spécifique

//CONTEXT
import { PanierContext } from "../../utils/context/PanierContext";
import { Link, useNavigate } from "react-router-dom";

const PagePanier = () => {
  const navigate = useNavigate();
  const {
    incremente,
    decremente,
    addPanier,
    removeProduit,
    priceProduitByQuantity,
    totalProduit,
    panier,
    totalPrice,
  } = useContext(PanierContext); //pour gérer le panier grâce aux fonctions récupéré du paniercontext
  // connexion
  const { user } = useContext(AuthContext);
  const isAuthenticated = user;
  const role = user?.role;
  const { login } = useContext(AuthContext);
  const [formDataUser, setFormDataUser] = useState({});

  const visibleRecette = HEADER_LINKS.filter((link) => {
    if (!isAuthenticated) return false; // pas connecté → pas d'accès
    if (link.auth === role) return true; // rôle correspondant
  });

  // Connexion user

  const handleChangeUser = (event) => {
    const { name, value } = event.target;
    setFormDataUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    await login(formDataUser);
  };

  return (
    <div className="row pagePanier">
      <nav aria-label="breadcrumb col-sm-12">
        <ol className="breadcrumb my-3 ">
          <li className="breadcrumb-item  px-3">
            <a href="/" style={{ width: "3rem" }}>
              RETOUR
            </a>
          </li>

          <li
            className="breadcrumb-item
            aria-current=page px-0"
            style={{ width: "6rem" }}
          >
            Panier
          </li>
        </ol>
      </nav>
      <div className="px-5 ">
        <h1 className="panierTitle">Panier</h1>
        <div className="produitsPanier row ">
          {panier ? (
            <div className="container ">
              {panier.map((produit, index) => (
                <div key={index} className="mapProduit mx-auto px-5">
                  <div className="imgTitrePanier">
                    <p className="titrePanier">{produit.titre}</p>
                    <img src={produit.photo} alt="" className="imgPanier" />
                  </div>
                  {console.log("PRODUIT PANIER => ", produit)}
                  <div className="actionPanier">
                    <div className="prixQuantity">
                      <p>
                        Prix:
                        {priceProduitByQuantity(produit.prix, produit.quantite)}
                        €
                      </p>
                      <div className="btnQuantity">
                        <button onClick={() => decremente(index)}>-</button>
                        <p>{produit.index}</p>
                        <button onClick={() => incremente(index)}>+</button>
                      </div>
                    </div>
                    <div>
                      <button
                        className="btnSupprimer"
                        onClick={() => removeProduit(produit)}
                      >
                        <i className="bi bi-x-lg"> supprimer du panier </i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <p>Total du panier : {totalPrice} €</p>
              <button
                className="btnPasserCommande col-sm-1"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Passer la commande ({totalProduit()} produits)
              </button>
              <div
                className="modal fade"
                id="staticBackdrop"
                tabIndex="-1"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered modal-dialog row"
                  style={{ maxWidth: "90%", padding: "3rem" }}
                >
                  <div
                    className="modal-content"
                    style={{ color: "var(--marronRouge)" }}
                  >
                    {isAuthenticated ? (
                      <>
                        <Link to="/paiement">Proceder au paiement</Link>
                      </>
                    ) : (
                      <div className="modal-body">
                        <p>
                          Veuillez vous connecter afin de proceder au paiement
                        </p>
                        <h1 className="text-center mb-4">Sign</h1>
                        <form onSubmit={handleSubmitUser}>
                          {SIGN_FIELDS.map((field, index) => (
                            <div
                              className="input-group flex-nowrap mb-3"
                              key={index}
                            >
                              <span
                                className="input-group-text"
                                id="addon-wrapping"
                                style={{
                                  border: "var(--marronRouge) 2px solid",
                                }}
                              >
                                <i
                                  className={field.icon}
                                  style={{ color: "var(--marronRouge)" }}
                                ></i>
                              </span>
                              <input
                                type={field.type}
                                className="form-control"
                                placeholder={field.placeholder}
                                aria-label={field.label}
                                name={field.name}
                                aria-describedby="addon-wrapping"
                                onChange={handleChangeUser}
                                style={{
                                  border: "var(--marronRouge) 2px solid",
                                }}
                              />
                            </div>
                          ))}
                          <div className="d-grid">
                            <button
                              type="submit"
                              className="btn  w-100"
                              style={{
                                border: "var(--marronRouge) 2px solid",
                                color: "var(--marronRouge)",
                              }}
                            >
                              Je me connecte{" "}
                            </button>
                          </div>
                        </form>
                        <Link
                          to="/register"
                          onClick={() => {
                            const modal =
                              document.getElementById("staticBackdrop");
                            const backdrop =
                              document.querySelector(".modal-backdrop");

                            if (modal) modal.classList.remove("show");
                            if (backdrop) backdrop.remove();
                            document.body.classList.remove("modal-open");
                          }}
                        >
                          Vous n'avez pas de compte ?
                        </Link>
                      </div>
                    )}
                    {/* Footer commun */}
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary col-xs-5 col-md-3"
                        data-bs-dismiss="modal"
                        style={{
                          backgroundColor: "var(--jaune)",
                          alignSelf: "end",
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>panier vide </p>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default PagePanier;
