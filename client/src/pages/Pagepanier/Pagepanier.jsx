import { useContext } from "react";

import "./panier.css"; // CSS spécifique

//CONTEXT
import { PanierContext } from "../../utils/context/PanierContext";
import { useNavigate } from "react-router-dom";

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
                      <button  className="btnSupprimer" onClick={() => removeProduit(produit)}>
                        <i className="bi bi-x-lg"> supprimer du panier </i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <p>Total du panier : {totalPrice} €</p>
              <button
                className="btnPasserCommande"
                onClick={() => navigate("/paiement")}
              >
                Passer la commande ({totalProduit()} produits)
              </button>
            </div>
         
        ) : (
          <p>panier vide </p>
        )} </div>
      </div>
    </div>
  );
};

export default PagePanier;
