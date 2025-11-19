import React, { useContext } from "react";

import "./panier.css"; // CSS spécifique

//CONTEXT
import { PanierContext } from "../../utils/context/PanierContext";
import { useNavigate } from "react-router-dom";


const PagePanier = () => {
  const navigate = useNavigate()
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

  const styles = {
    produitsPanier: {
      margin: "3rem",
      borderTop: "2px solid var(--marronRouge)",
    },

    mapProduit: {
      display: "flex",
      borderBottom: "2px solid var(--marronRouge)",
      //justifySelf: "center",
      paddingLeft: "8rem",
      gap:"7rem"
    },

    imgTitrePanier: {
      flexDirection: "column",
      width:"10rem"
    },

    imgPanier: {
      width: "150px",
      height: "150px",
    },
    titrePanier: {},
    btnPasserCommande: {},
  };

  return (
    <div>
      <h1 style={{fontSize:"4rem"}}>Panier</h1>
      {panier ? (
        <>
          <div style={styles.produitsPanier}>
            {panier.map((produit, index) => (
              <div key={index} style={styles.mapProduit}>
                <div style={styles.imgTitrePanier}>
                  <p style={styles.titrePanier}>{produit.titre}</p>
                  <img src={produit.photo} alt="" style={styles.imgPanier} />
                </div>
{console.log("PRODUIT PANIER => ", produit)}
                <p>
                  Prix:{priceProduitByQuantity(produit.prix, produit.quantite)}
                  €
                </p>
                <div>
                  <button onClick={() => decremente(index)}>-</button>
                  <p>{produit.index}</p>
                  <button onClick={() => incremente(index)}>+</button>
                </div>
                <div>
                 
                  <button onClick={() => removeProduit(produit)}>
                    <i className="bi bi-x-lg"> supprimer du panier </i>
                  </button>
                </div>
              </div>
            ))}
             <p>Total du panier : {totalPrice}</p>
            <button style={styles.btnPasserCommande} onClick={()=>navigate("/paiement")}>
              Passer la commande ({totalProduit()} produits)
            </button>
          </div>
        </>
      ) : (
        <p>panier vide </p>
      )}
    </div>
  );
};

export default PagePanier;
