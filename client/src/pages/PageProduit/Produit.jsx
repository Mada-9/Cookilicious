import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import { useNavigate, Link } from "react-router-dom";

import DetailProduit from "./DetailProduit";

import "./Produit.css"; // CSS spécifique

const Produit = () => {
  const navigate = useNavigate();
  const [produit, setProduit] = useState([]);

  useEffect(() => {
    getAllProduit();
  }, []);

  const getAllProduit = async () => {
    try {
      const { data, status } = await axios.get(URL.GET_ALL_PRODUIT);
      if (status === 200) setProduit(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div id="produit">
      <section id="enteteProduit" style={{ color: "var(--creme)" }}>
        <h1
          id="titlePageProduit"
          style={{
            textAlign: "center",
            paddingBottom: "3rem",
            fontSize: "5rem",
          }}
        >
          Nos Produits
        </h1>
        <p
          id="introPageProduit"
          style={{ color: "var(--creme)", fontSize: "1.5rem" }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
          suscipit officia sapiente repellat qui ipsum.Lorem ipsum dolor sit
          amet consectetur adipisicing.
        </p>
      </section>

      <section
        id="cookie"
        className="sectionCookie"
        style={{ marginBottom: "5rem", marginTop: "3.5rem" }}
      >
        <h3
          className="sectionTitleCookie"
          style={{ backgroundColor: " #ae662c" }}
        >
          COOKIE
        </h3>
        <div
          className="produitContainer2 "
          
        >
          {produit.map(
            (item, index) =>
              index > 4 && (
                <div key={item._id} className="produit2">
                  <img
                    style={{ padding: "1px" }}
                    src={item.photo}
                    alt="cookie"
                    width={235}
                    height={235}
                  />
                  <p
                    style={{
                      fontSize: "1.8rem",
                      margin: "0",
                      padding: "1px",
                      borderBottom:  "var(--marronRouge) 3px solid",
                    }}
                  >
                    {item.titre}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: " 5rem",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "2rem",
                        margin: "0",
                        display: "flex",
                      }}
                    >
                      {item.prix}€
                    </p>
                    <button className="btnDetail"
                      onClick={() => navigate(`/detail/${item._id}`)}
                     
                    >
                      VOIR
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </section>

      {/************* SECTION BROOKIE**************/}

      <div
        id="brookie"
        className="sectionBrookie"
        style={{ marginBottom: "8rem" }}
      >
        <h3
          className="sectionTitleBrookie"
          style={{ backgroundColor: "#911a1c" }}
        >
          BROOKIE
        </h3>
        <div
          className="produitContainer2 "
          
        >
          {produit.map(
            (item, index) =>
              index > 8 && (
                <div key={item._id} className="produit2">
                  <img
                    style={{
                      padding: "1px",
                    }}
                    src={item.photo}
                    alt="cookie"
                    width={235}
                    height={235}
                  />

                  <p
                    style={{
                      fontSize: "1.8rem",
                      margin: "0",
                      borderBottom:  "var(--marronRouge) 3px solid",
                    }}
                  >
                    {item.titre}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: " 5rem",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "2rem",
                        margin: "0",
                        display: "flex",
                      }}
                    >
                      {item.prix}€
                    </p>
                    <button
                      onClick={() => navigate(`/detail/${item._id}`)}
                     className="btnDetail"
                    >
                      VOIR
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <Link
        to="/recette"
        className="btnNavRecette"
        style={{ marginBottom: "5rem", marginLeft: "2rem", width: "13rem" }}
      >
        Voir nos recettes
      </Link>
      <button
        style={{
          display: "flex",
          justifySelf: "end",
          marginBottom: "10rem",
          marginRight: "2rem",
          backgroundColor: "#833f3fff",
          color: " #fefaef",
          border: "2px solid #833f3fff",
          width: "5rem",
          height:"4rem",
          fontSize:"1rem"
        
        }}
        onClick={scrollToTop}
      >
        retour en haut
      </button>
    </div>
  );
};

export default Produit;
