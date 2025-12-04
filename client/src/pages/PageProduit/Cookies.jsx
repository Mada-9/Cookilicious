import { useState, useEffect } from "react";
import URL from "../../utils/constant/url";
import { useNavigate, Link } from "react-router-dom";
import axiosinstance from "../../utils/axios/axiosinstance";


import DetailProduit from "./DetailProduit";

import "./Produit.css"; // CSS spécifique

const Produit = () => {
  const navigate = useNavigate();
  const [produit, setProduit] = useState([]);

  useEffect(() => {
    getAllProduits();
  }, []);

  const getAllProduits = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_PRODUITS);
      if (status === 200) setProduit(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="produit">
      <section
        className="enteteProduit"
        style={{ color: "var(--creme)", width: "100%" }}
      >
        <h1
          className="titlePageProduit"
          style={{
            textAlign: "center",
          }}
        >
          Nos Cookies
        </h1>
        <p
          className="introPageProduit"
          style={{ color: "var(--creme)", fontSize: "1.5rem" }}
        >
          Découvrez nos cookies fraîchement sortis du four : moelleux, généreux
          et préparés chaque jour avec des ingrédients de qualité.
        </p>
      </section>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-3">
          <li className="breadcrumb-item  px-3">
            <a href="/" style={{ width: "3rem" }}>
              Home
            </a>
          </li>

          <li className="breadcrumb-item" aria-current="page">
            Cookies
          </li>
        </ol>
      </nav>

      <section
        className="sectionCookie"
        style={{ marginBottom: "5rem", marginTop: "3.5rem" }}
      >
        <h3
          className="sectionTitleCookie"
          style={{ backgroundColor: " #ae662c" }}
        >
          COOKIE
        </h3>
        <div className="produitContainer2 ">
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
                      borderBottom: "var(--marronRouge) 3px solid",
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
                      className="btnDetail"
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
          height: "4rem",
          fontSize: "1rem",
        }}
        onClick={scrollToTop}
      >
        retour en haut
      </button>
    </div>
  );
};

export default Produit;
