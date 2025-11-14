import { useState, useEffect } from "react";
import { useNavigate, Link, isCookie } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

// PAGES  ET URL
import URL from "../../utils/constant/url";
// import DetailProduit from "../PageProduit/DetailProduit";

//IMAGES
import cookie from "../../assets/images/cookiepistache.png";
import cookiefraise from "../../assets/images/cookiefraise.png";
import cookiechoco from "../../assets/images/cookiechoco.png";

//CSS
import "./Home.css"; // CSS spécifique

const PageHome = ({}) => {
  const navigate = useNavigate();
  const [produit, setProduit] = useState([]);
  const [formData, setFormData] = useState({ email: "", message: "" });

  // MEDIA QUERY

  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 426px) and ( max-width:768px)",
  });
  const isTabletL = useMediaQuery({
    query: "(min-width: 769px) and ( max-width:1024px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  // POUR DETECTER LA TAILLE DE L'ECRAN

  //MON CSS

  const styles = {
    titleHome: {
      fontFamily: "kaftus",
      margin: "1rem 0 0 0",
      fontSize: isMobile
        ? "2.2rem"
        : isTablet
        ? "5rem"
        : isTabletL
        ? "7rem"
        : isDesktop
        ? "9rem"
        : "3rem",
      color: "var(--marronRouge)",
    },

    
    // phraseDefilante: {
    //   fontSize: isMobile ? "1rem" : "1.7rem",
    // },

  
  };

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

  // ENVOIE FORMULAIRE

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data, status } = await axios.post(URL.POST_CONTACT, formData);
      console.log(formData);
      if (status === 200) {
        console.log("Données du formualire bien récupérées:");
      }
    } catch (error) {
      console.error("erreur lors de l'envoie du message:", error.message);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="home">
        <h1 style={styles.titleHome}>COOKILICIOUS</h1>

        <div className="imageHome" onClick={() => navigate("/produit")}>
          <img className="imagesHome" src={cookiefraise} alt="COOKIE" />
          <img className="imagesHome" src={cookie} alt="COOKIE" />
          <img className="imagesHome" src={cookiechoco} alt="COOKIE" />
        </div>

        <div className="defilantContainer">
          <p className="phraseDefilante">
            Des cookies & brookies uniques faits maison pour succomber à la
            tentation.
          </p>
        </div>

        <div className="homeCategorieProduit">
          <h2
            className="phraseCategorie"
          >
            Parcourez nos différentes catégories, <br /> et <br /> laissez vous
            succomber...
          </h2>

          <section className="sectionCategorie">
            COOKIE
            {/*  HASHLINK  NE FONCTIONNE PAS*/}
            <HashLink smooth to="/produit#">
              <button className="btnCommander">Commander</button>
            </HashLink>
          </section>
          <section className="sectionCategorie">
            BROOKIE
            <HashLink smooth to="/produit#brookie">
              <button className="btnCommander">Commander</button>
            </HashLink>
          </section>
        </div>

        <div className="homeRecipes">
          <h2 className="homeRecipesTitle">Testez nos recettes</h2>

          <div  className="recetteHome">
            (mettre slide recettes )
            <button
              onClick={() => navigate("/recette")}
              className="btnRecette"
            >
              Je découvre !
            </button>
          </div>

          <img
            className="moitieeBrookie"
            src={
              "https://www.harrisfarm.com.au/cdn/shop/files/brrokie.png?v=1694316224"
            }
            alt="cookies pistache"
          />
        </div>

        <div  className="containerJaune">
          <h3 className="jauneP">
            Lorem ipsum dolor sit amet consectetur adipisicing Corporis.
            <br /> elit Corporis itaqueimpedit <br /> bralias mollitia,
            consequuntur quasi?
          </h3>
        </div>

        {/* PRODUITS AFFICHES SUR HOME */}

        <div className="homeProduit">
          <h2 className="homeProduitTitle">One more sweetness...</h2>
          <div className="containerProduit">
            <div
              id="carouselProduit"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner" style={{ marginBottom: "2rem" }}>
                {produit.length > 0 &&
                  [...Array(Math.ceil(produit.length / 4))].map(
                    (_, slideIndex) => (
                      <div
                        key={slideIndex}
                        className={`carousel-item ${
                          slideIndex === 0 ? "active" : ""
                        }`}
                      >
                        <div
                          className="d-flex "
                          style={{ gap: "2rem", padding: "2rem" }}
                        >
                          {produit
                            .slice(slideIndex * 4, slideIndex * 4 + 4)
                            .map((item) => (
                              <div key={item._id} className="produitCard">
                                <p>{item.titre}</p>
                                <img
                                  src={item.photo}
                                  alt={item.titre}
                                  width={150}
                                  height={150}
                                />
                                <p>{item.prix} €</p>
                                <button
                                 className="produitCardBtn"
                                  onClick={() =>
                                    navigate(`/detail/${item._id}`)
                                  }
                                >
                                  Voir
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
 {/* BOUTON CARROUSEL */}
            <div>
              <button
                className="carousel-control-prev  "
                style={{
                  height: "2rem",
                  marginTop: "35rem",
                  marginLeft: "18rem",
                  color: "var(--marronFonce)",
                }}
                type="button"
                data-bs-target="#carouselProduit"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-bi bi-caret-left-fill"
                  aria-hidden="false"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>

              <button
                className="carousel-control-next"
                style={{
                  height: "2rem",
                  marginTop: "35rem",
                  marginRight: "20rem",
                  color: "var(--marronFonce)"
                }}
                type="button"
                data-bs-target="#carouselProduit"
                data-bs-slide="next"
              >
                <span
                  className="carousel-bi bi-caret-right-fill "
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <img
              className="moitieeCookieProduit"
              src={cookie}
              alt="cookies pistache"
            />
          </div>
        </div>

        {/* SECTION CONTACT */}

        <div className="contactHome" style={{ marginBottom: "5rem" }}>
          <p className="homeContactTitle">Contactez nous</p>
          <form className="homeFormContact" onSubmit={handleSubmit}>
            <label className="email" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="écrivez votre email"
              value={formData.email}
              onChange={handleChange}
              style={{ color: "var(--marronFroid)", fontSize: "1.5rem" }}
            />
            <label className="message" htmlFor="message">
              Message:
            </label>
            <input
              type="texte"
              name="message"
              id="message"
              placeholder="Votre message"
              value={formData.message}
              onChange={handleChange}
              style={{ color: "var(--marronFroid)", fontSize: "1.5rem" }}
            />
            <button
              id="homeBtnContact"
              onSubmit={handleSubmit}
              style={{ color: "var(--marronFroid)", fontSize: "1.6rem" }}
            >
              Envoyer
            </button>
          </form>
        </div>
        {/* fin de page  */}
        <button className="btnBackToTop" onClick={scrollToTop}>
          Retour en haut
        </button>
        <p className="defilantTitle">
          COOKILIOUS <span> . </span> COOKILIOUS <span> . </span>COOKILIOUS
          <span> . </span>COOKILIOUS <span> . </span>COOKILIOUS <span> . </span>
          COOKILIOUS <span> . </span>COOKILIOUS <span> . </span>COOKILIOUS
          <span> . </span>COOKILIOUS<span> . </span>COOKILIOUS<span> . </span>
          COOKILIOUS<span> . </span>COOKILIOUS<span> . </span>COOKILIOUS
          <span> . </span>COOKILIOUS<span> . </span>COOKILIOUS<span> . </span>
          COOKILIOUS<span> . </span>COOKILIOUS<span> . </span>COOKILIOUS
          <span> . </span>COOKILIOUS<span> . </span>COOKILIOUS<span> . </span>
          COOKILIOUS<span> . </span>COOKILIOUS<span> . </span>COOKILIOUS
          <span> . </span>COOKILIOUS<span> . </span>COOKILIOUS
        </p>
      </div>
    </>
  );
};

export default PageHome;
