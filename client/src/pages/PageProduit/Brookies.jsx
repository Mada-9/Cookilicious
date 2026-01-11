import { useState, useEffect } from "react";
import URL from "../../utils/constant/url";
import { useNavigate, Link } from "react-router-dom";
import axiosinstance from "../../utils/axios/axiosinstance";
import { motion, useScroll, useTransform } from "framer-motion";

import "./Produit.css"; // CSS spécifique

const Brookies = () => {
  const navigate = useNavigate();
  const [brookie, setBrookie] = useState([]);
  const { scrollY } = useScroll();

  // plus on scroll, plus ça monte lentement
  const ySlow = useTransform(scrollY, [0, 700], [0, -120]);

  useEffect(() => {
    getAllBrookies();
  }, []);

  const getAllBrookies = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_BROOKIES);
      if (status === 200) {
      const brookiesActifs = data.filter((item) => item.isActive === true);
      setBrookie(brookiesActifs);}
    } catch (error) {
      console.log(error.message);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="produit">
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
      <section className="enteteProduit" style={{ width: "100%" }}>
        <h1
          className="titlePageProduit"
          style={{
            textAlign: "center",
            paddingTop: "4rem",
          }}
        >
          Nos Brookies
        </h1>
      </section>

      <motion.section style={{ y: ySlow }}>
        <p className="introPageProduit">
          Laissez-vous tenter par nos brookies fondants et croquants, préparés
          chaque jour avec des ingrédients de qualité. Un mariage gourmand qui
          réunit le meilleur du brownie et du cookie.
        </p>

        <div className="sectionBrookie">
          <div className="produitContainer2 ">
            {brookie.map(
              (item) =>
               (
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
                        className="btnDetail"
                        data-back="Je le veux"
                        data-front="Je le veux"
                        onClick={() => navigate(`/brookie/${item._id}`)}
                      ></button>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </motion.section>
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
