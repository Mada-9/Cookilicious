import { useState, useEffect } from "react";
import URL from "../../utils/constant/url";
import { useNavigate, Link } from "react-router-dom";
import axiosinstance from "../../utils/axios/axiosinstance";
import { motion, useScroll, useTransform } from "framer-motion";

import "./Produit.css"; // CSS spécifique

const Cookies = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useState([]);
  const { scrollY } = useScroll();

  const ySlow = useTransform(scrollY, [0, 700], [0, -120]);

  useEffect(() => {
    getAllCookies();
  }, []);

  const getAllCookies = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_COOKIES);
      console.log(data);

      if (status === 200) {
        const cookiesActifs = data.filter((item) => item.isActive === true);
        setCookie(cookiesActifs);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="produit">
      <nav aria-label="breadcrumb" style={{ marginTop: "2rem" }}>
        <ol className="breadcrumb my-3">
          <li className="breadcrumb-item  px-3">
            <Link to="/" style={{ width: "3rem" }}>
              Home
            </Link>
          </li>

          <li className="breadcrumb-item" aria-current="page">
            Cookies
          </li>
        </ol>
      </nav>
      <div style={{ display: "flex", alignItems: "end" }}>
        <div className="enteteProduit row" style={{ width: "100%" }}>
          <h1
            className="titlePageProduit col-sm-2"
            style={{
              textAlign: "left",
              marginLeft: "3rem",
              paddingTop: "4rem",
            }}
          >
            Nos <br /> Cookies
          </h1>
        </div>{" "}
        <img
          src="https://static.wixstatic.com/media/82955a_99098664b7034f9b876c2b43ac70d615~mv2.jpg/v1/crop/x_71,y_71,w_938,h_938/fill/w_938,h_938,al_c,q_85,enc_avif,quality_auto/Cooies_Puffy2.jpg"
          alt="stuffed cookie"
          height={300}
          width={300}
        />
      </div>
      <motion.section style={{ y: ySlow }}>
        <p className="introPageProduit">
          Découvrez nos cookies fraîchement sortis du four : moelleux, généreux
          et préparés chaque jour avec des ingrédients de qualité.
        </p>
        <section className="sectionCookie">
          <div className="produitContainer2 ">
            {cookie.map((item) => (
              <div key={item._id} className="produit2">
                <p className="titreProduit2">{item.titre}</p>
                <img
                  style={{ padding: "1px" }}
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
                    onClick={() => navigate(`/cookie/${item._id}`)}
                  ></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </motion.section>
      <Link
        to="/recette"
        className="btnNavRecette"
        style={{
          marginBottom: "5rem",
          marginLeft: "2rem",
          width: "13rem",
          textAlign: "left",
        }}
      >
        Voir nos recettes
      </Link>
    </div>
  );
};

export default Cookies;
