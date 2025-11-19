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
import cookie4 from "../../assets/images/CaptureE299e81cran20a80_11.53.01-removebg-preview.png";

//CSS
import "./Home.css"; // CSS spécifique

const PageHome = ({}) => {
  const navigate = useNavigate();
  const [produit, setProduit] = useState([]);
  const [formData, setFormData] = useState({ email: "", message: "" });
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

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

  //a refaire dans  CSS, (bootstrap)row

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
    setFormData((prevformData) => ({ ...prevformData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status } = await axios.post(URL.POST_CONTACT, formData);
      console.log(formData);
      if (
        formData.message.length >= 5 &&
        status === 201 &&
        formData.email.match(isValidEmail)
      ) {
        alert("message envoyé !");
      } else {
        alert("veuillez ecrire un message valide");
      }
    } catch (error) {
      console.error("erreur lors de l'envoie du message:", error.message);
    }
  };

  // BACK TO TOP
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="home">
        <h1 style={styles.titleHome}>COOKILICIOUS</h1>

        <div className="imageHome" onClick={() => navigate("/produit")}>
          <img className="imagesHome" src={cookiechoco} alt="COOKIE" />
          <img className="imagesHome" src={cookiechoco} alt="COOKIE" />
          <img className="imagesHome" src={cookiechoco} alt="COOKIE" />
        </div>

        <div className="defilantContainer">
          <p className="phraseDefilante">
            Des cookies & brookies uniques faits maison pour succomber à la
            tentation.
          </p>
        </div>

        <div className="homeCategorieProduit row ">
          <h2 className="phraseCategorie col-sm-10 col-md-4">
            Parcourez nos différentes catégories, <br /> et <br /> laissez vous
            succomber...
          </h2>

          <section
            className="sectionCategorie col-sm-6 col-md-3 "
            id="categorieUne"
          >
            COOKIE
            <HashLink smooth to="/produit#cookie">
              <button className="btnCommander">Commander</button>
            </HashLink>
          </section>
          <section
            className="sectionCategorie col-sm-6 col-md-3"
            id="categorieDeux"
          >
            BROOKIE
            <HashLink smooth to="/produit#sectionBrookie">
              {/*  HASHLINK  NE FONCTIONNE PAS*/}
              <button className="btnCommander">Commander</button>
            </HashLink>
          </section>
        </div>

        <div className="homeRecipes">
          <h2 className="homeRecipesTitle">Testez nos recettes</h2>

          <div className="recetteHome">
            (mettre slide recettes )
            <button onClick={() => navigate("/recette")} className="btnRecette">
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

        <div className="containerJaune">
          <h3 className="jauneP">
            Lorem ipsum dolor sit amet consectetur adipisicing Corporis.
            <br /> elit Corporis itaqueimpedit <br /> bralias mollitia,
            consequuntur quasi?
          </h3>
        </div>

        {/* PRODUITS AFFICHES SUR HOME */}

        <div className="homeProduit row">
          <h2 className="homeProduitTitle col-sm-12 ">One more sweetness...</h2>
          <div className="containerProduit ">
            <div
              className="carousel slide "
              id="carouselProduit"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner mx-auto row ">
                {produit
                  .filter((_, i) => i % 4 === 0) // on prend un produit sur 4 = début d'une diapo
                  .map((_, i) => (
                    <div
                      key={i}
                      className={`carousel-item ${i === 0 ? "active" : ""}`}
                    >
                      <div className="d-flex" style={{}}>
                        {produit
                          .slice(i, i + 4) // on prend 4 produits
                          .map((item) => (
                            <div
                              key={item._id}
                              className="produitCard col-sm-11 col-md-3"
                            >
                              <p>{item.titre}</p>
                              <img
                                className="img-fluid"
                                src={
                                  item.photo ||
                                  "https://static.wixstatic.com/media/82955a_99098664b7034f9b876c2b43ac70d615~mv2.jpg/v1/crop/x_71,y_71,w_938,h_938/fill/w_938,h_938,al_c,q_85,enc_avif,quality_auto/Cooies_Puffy2.jpg"
                                }
                                alt={item.titre}
                                width={150}
                                height={150}
                              />
                              <p>{item.prix} €</p>
                              <button
                                className="produitCardBtn"
                                onClick={() => navigate(`/detail/${item._id}`)}
                              >
                                Voir
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* BOUTON CARROUSEL */}
            <div>
              <button
                className="carousel-control-prev "
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
                  color: "var(--marronFonce)",
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
          </div>
        </div>

        {/* SECTION CONTACT */}

        <div className="contactHome">
          <p className="homeContactTitle">Contactez nous</p>
          <form className="homeFormContact" onSubmit={handleSubmit}>
            <label className="email" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="emailInput"
              placeholder="écrivez votre email"
              value={formData.email}
              onChange={handleChange}
            />
            <label className="message" htmlFor="message">
              Message:
            </label>
            <input
              type="texte"
              name="message"
              className="messageInput"
              placeholder="Votre message"
              value={formData.message}
              onChange={handleChange}
            />
            <button className="homeBtnContact" onSubmit={handleSubmit}>
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
          COOKILIOUS<span> . </span>COOKILIOUS
        </p>
      </div>
    </>
  );
};

export default PageHome;
