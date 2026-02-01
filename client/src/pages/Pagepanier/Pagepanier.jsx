import { useContext } from "react";
import { toast } from "react-toastify";


import "./panier.css"; // CSS

//CONTEXT
import { PanierContext } from "../../utils/context/PanierContext";
import { Link, useNavigate } from "react-router-dom";

const PagePanier = () => {
  const navigate = useNavigate();
  const {
    incremente,
    decremente,
    removeProduit,
    priceProduitByQuantity,
    totalProduit,
    panier,
    totalPrice,
  } = useContext(PanierContext);

  return (
    <div className="row pagePanier">
      <div className="px-5 ">
        <h1 className="panierTitle">Panier</h1>
        <div className="produitsPanier row ">
          {panier ? (
            <div className="container ">
              {panier.map((produit, index) => (
                <div key={index} className="mapProduit mx-auto px-5">
                  <div className="imgTitrePanier">
                    <p className="titrePanier">{produit.titre}</p>
                    <img
                      src={produit.photo}
                      alt={produit.titre}
                      className="imgPanier"
                    />
                  </div>
                  {console.log("PRODUIT PANIER => ", produit)}
                  <div className="actionPanier">
                    <div className="prixQuantity">
                      <p>
                        Prix:
                        {priceProduitByQuantity(produit.prix, produit.quantite)}
                        €
                      </p>
                      <div className="btnQuantityDiv">
                        <button
                          className="btnQuantity"
                          onClick={() => decremente(index)}
                        >
                          -
                        </button>
                        <p>{produit.quantite}</p>
                        <button
                          className="btnQuantity"
                          onClick={() => incremente(index)}
                        >
                          +
                        </button>
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
              <p className="totalPanier">
                Total du panier : {totalPrice} € ({totalProduit()} produits)
              </p>
             <button
  className="btnPasserCommande"
  type="button"
  data-back="Passer la commande"
  data-front="Passer la commande"
  onClick={() => {
    if (panier.length === 0) {
      toast.error("Votre panier est vide ❌");
      return;
    }
    navigate("/paiement");
  }}
>
</button>
            </div>
          ) : (
            <p>panier vide </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PagePanier;
