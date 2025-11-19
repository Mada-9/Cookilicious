import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import URL from "../../utils/constant/url";
import { PanierContext } from "../../utils/context/PanierContext";

const DetailProduit = () => {
  const { panier, addPanier } = useContext(PanierContext);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [produit, setProduit] = useState(null);

  useEffect(() => {
    if (id) {
      getProduit(id);
    }
  }, [id]);

  const getProduit = async (id) => {
    try {
      const { data, status } = await axios.get(
        `${URL.GET_DETAIL_PRODUIT}/${id}`
      );
      console.log(id);

      if (status === 200) {
        setProduit(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //ajout au panier

  return (
    <>
      <a
        href="/produit"
        style={{ width: "30rem", marginBottom: "1rem", paddingLeft: "2rem" }}
      >
        {" "}
        <i className="bi bi-arrow-left"> retour à la page produit</i>
      </a>

      {!produit ? (
        <p>Chargement</p>
      ) : (
        <div>
          <div key={produit._id} style={{}}>
            <p
              style={{
                color: "var(--creme)",
                // backgroundColor: " #67200dff",
                backgroundColor: "var(--marronRouge)",
                height: "6rem",
                fontSize: "3.5rem",
                width: "90%",
              }}
            >
              {produit.titre}
            </p>
            <div
              style={{
                display: "flex",
                padding: "3rem",
                justifyContent: "center",
              }}
            >
              <img
                style={{ border: "5px var(--marronRouge) solid " }}
                src={produit.photo}
                alt={produit.titre}
                width={460}
                height={460}
              />
              <div style={{ padding: "3rem" }}>
                <p style={{ fontSize: "3.5rem" }}>{produit.prix} €</p>
                <div>
                  <button onClick={() => decremente(index)}>-</button>
                  <p>{produit.index}</p>
                  <button onClick={() => incremente(index)}>+</button>
                </div>{" "}
                <p>{produit.description}</p>
                <button
                  style={{
                    width: "30rem",
                    height: "3rem",
                    fontSize: "1.5rem",
                    color: "var(--creme)",
                    // backgroundColor: " #976658ff",
                    border: "var(--marronRouge) 3px solid",
                    backgroundColor: "var(--jaune)",
                    type: "submit",
                  }}
                  onClick={() => addPanier(produit)}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailProduit;
