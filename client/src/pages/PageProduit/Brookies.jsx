import { useState, useEffect } from "react";
import URL from "../../utils/constant/url";
import { useNavigate, Link } from "react-router-dom";
import axiosinstance from "../../utils/axios/axiosinstance";

import "./Produit.css"; // CSS spécifique

const Brookies = () => {
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
      <section className="enteteProduit" style={{ width: "100%" }}>
        <h1
          className="titlePageProduit"
          style={{
            textAlign: "center",
            marginLeft: "3rem",
            paddingTop: "5rem",
          }}
        >
          Nos Brookies
        </h1>
      </section>

      <nav aria-label="breadcrumb" style={{ marginTop: "3rem" }}>
        <ol className="breadcrumb my-3">
          <li className="breadcrumb-item  px-3">
            <Link to href="/" style={{ width: "3rem" }}>
              Home
            </Link>
          </li>

          <li className="breadcrumb-item" aria-current="page">
            Brookies
          </li>
        </ol>
      </nav>
      <p className="introPageProduit">
        Laissez-vous tenter par nos brookies fondants et croquants, préparés
        chaque jour avec des ingrédients de qualité. Un mariage gourmand qui
        réunit le meilleur du brownie et du cookie.
      </p>

      <div className="sectionBrookie">
        <div className="produitContainer2 ">
          {produit.map(
            (item, index) =>
              index > 8 && (
                <div key={item._id} className="produit2">
                  <p className="titreProduit2">{item.titre}</p>{" "}
                  <img
                    style={{
                      padding: "1px",
                    }}
                    src={item.photo}
                    alt="cookie"
                    width={235}
                    height={235}
                  />
                  <div className="prixBtn">
                    <p>{item.prix}€</p>
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
        to="/cookies"
        className="btnNavCookies"
        style={{ marginBottom: "5rem", marginLeft: "2rem", width: "13rem" }}
      >
        Voir nos cookies
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
          fontSize: "0.7rem",
        }}
        onClick={scrollToTop}
      >
        retour en haut
      </button>
    </div>
  );
};

export default Brookies;
