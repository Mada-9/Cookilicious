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

  //useState

  //MON CSS

  const styles = {
    titleHome: {
      fontFamily: "kaftus",
      marginTop: "1rem",
      fontSize: isMobile
        ? "2.2rem"
        : isTablet
        ? "5rem"
        : isTabletL
        ? "7rem"
        : isDesktop
        ? "9rem"
        : "3rem",
      color: "#880a0cff",
      marginBottom: "0",
      flex: "1",
    },

    imageHome: {
      display: "flex",
    },
    imagesHome: {
      flex: "1",
      width: "50px",
    },

    defilantContainer: {
      width: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      animation: " scroll-left 28s linear infinite",
    },
    phraseDefilante: {
      fontSize: isMobile ? "1rem" : "1.7rem",
      marginTop: "1.2rem",
      whiteSpace: "nowrap",
      display: "inline-block",
    },

    // section categorie
    homeCategorieProduit: {
      backgroundColor: "#880a0cff",
      marginTop: "2rem",
      height: "33rem",
      display: "flex",
      padding: "10px",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      gap: "3rem",
      justifyContent: "center",
      alignItems: "center",
    },

    sectionCategorie: {
      color: "rgb(245, 232, 216)",
      border: "rgb(242, 242, 242), 2px, solid",
      borderRadius: "2%",
      width: "20rem",
      height: "25rem",
      fontSize: "3rem",
      backgroundImage:
        "url(" +
        "https://togetherasfamily.com/wp-content/uploads/2024/01/brookies-vertical-2.jpg" +
        ")",
      paddingTop: "3rem",
      flexDirection: "column",
      position: "relative",
      backgroundSize: "25rem",
      backgroundRepeat: "noRepeat",
      backgroundPosition: "40%",
    },

    btnCommander: {
      position: "absolute",
      fontSize: "1.2rem",
      bottom: "30px",
      padding: "10px",
      left: "5.5rem",
      backgroundColor: " #973d24",
      color: " #fefaef",
      border: "3px #67200dff solid",
      borderRadius: "2%",
    },

    // section recette

    homeRecipes: {
      display: "flex",
      height: "33rem",
      justifyContent: "center",
      position: "relative",
      marginBottom: "3rem",
    },

    // moitieeCookie: {
    //   position: "absolute",
    //   width: " 470px",
    //   right: "-15rem",
    //   overflow: "hidden"
    // },

    moitieeBrookie: {
      position: "absolute",
      width: " 500px",
      height: "40rem",
      top: "0.5rem",
      left: "-15rem",
      overflow: "hidden",
    },

    recetteHome: {
      height: "22rem",
      width: "42rem",
      position: "relative",
      marginTop: "7rem",
      border: "3px #bd5505ff solid",
      display: "flex",
      justifyContent: "center",
      alignSelf: "center",
    },

    homeRecipesTitle: {
      fontSize: "4.8rem",
      // color: " #7a2223ff",
      color: " #880a0cff",

      display: "flex",
      position: "absolute",
      marginTop: "2rem",
    },

    btnRecette: {
      width: "10rem",
      height: "3rem",
      color: " #fefaef",
      border: "3px #976658ff solid",
      backgroundColor: " #7a2223ff ",
      borderRadius: "2%",
      alignSelf: "center",
      justifySelf: "center",
      position: "absolute",
    },

    jauneP: {
      fontSize: "2.5rem",
      color: " #880a0cff",
      width: "70%",
      paddingLeft: "2rem",
      textAlign: "left",
    },

    // CSS PRODUIT

    homeProduit: {
      height: "33rem",
      paddingTop: "2rem",
      marginBottom: "7rem",
      fontSize: " 4rem",
      position: "relative",
      // justifyItems:"right"
    },
    homeProduitTitle: {
      justifySelf: "center",
      marginLeft: "1.5rem",
      fontSize: "5.6rem",
      wordSpacing: "0.5rem",
      position: "absolute",
      zIndex: "1",
    },

    ContainerProduit: {
      display: "flex",
      flexWrap: "wrap",
      gap: "2rem",
      marginTop: "8rem",
      justifyContent: "center",
    },

    produit: { display: "flex", gap: "3rem" },

    produitCard: {
      padding: "1rem",
      borderRadius: "8px",
      width: "14rem",
      height: "20rem",
      textAlign: "center",
      boxShadow: " 0 0 5px rgba(104, 18, 18, 0.95)",
      backgroundColor: " #fefaef",
      fontSize: "1.5rem",
      zIndex: "1",
    },

    moitieeCookieProduit: {
      position: "absolute",
      width: " 560px",
      height: "600px",
      right: "-22rem",
      top: "1rem",
      display: "flex",
      overflow: "hidden",
      zIndex: "0",
    },

    // contact

    btnBackToTop: {
      width: "5rem",
      display: "flex",
      justifySelf: "end",
      margin: "2rem",
      backgroundColor: "#833f3fff",
      color: " #fefaef",
      border: "2px solid #833f3fff",
    },
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

        <div style={styles.imageHome} onClick={() => navigate("/produit")}>
          <img style={styles.imagesHome} src={cookiefraise} alt="COOKIE" />
          <img style={styles.imagesHome} src={cookie} alt="COOKIE" />
          <img style={styles.imagesHome} src={cookiechoco} alt="COOKIE" />
        </div>

        <div style={styles.defilantContainer}>
          <style>{` @keyframes scroll-left {0% {transform: translateX (0) ; } 100% { transform: translateX(-100%); } }`}</style>
          <p style={styles.phraseDefilante}>
            Des cookies & brookies uniques faits maison pour succomber à la
            tentation.
          </p>
        </div>

        <div style={styles.homeCategorieProduit}>
          <p
            style={{
              color: " rgb(245, 232, 216)",
              width: "40%",
              fontSize: "3rem",
            }}
          >
            Parcourez nos différentes catégories, <br /> et <br /> laissez vous
            succomber...
          </p>

          <section style={styles.sectionCategorie}>
            COOKIE
            {/*  HASHLINK  NE FONCTIONNE PAS*/}
            <HashLink smooth to="/produit#">
              <button style={styles.btnCommander}>Commander</button>
            </HashLink>
          </section>
          <section style={styles.sectionCategorie}>
            BROOKIE
            <HashLink smooth to="/produit#brookie">
              <button style={styles.btnCommander}>Commander</button>
            </HashLink>
          </section>
        </div>

        <div style={styles.homeRecipes}>
          <h3 style={styles.homeRecipesTitle}>Testez nos recettes</h3>

          <div style={styles.recetteHome} className="recetteHome">
            (mettre slide recettes )
            <button
              onClick={() => navigate("/recette")}
              style={styles.btnRecette}
            >
              Je découvre !
            </button>
          </div>
          {/* <img
            style={styles.moitieeCookie}
            src={
              "https://cdn.shopify.com/s/files/1/1265/3499/products/Untitleddesign.png?v=1599464139"
            }
            alt="cookies pistache"
          /> */}
          <img
            style={styles.moitieeBrookie}
            src={
              "https://www.harrisfarm.com.au/cdn/shop/files/brrokie.png?v=1694316224"
            }
            alt="cookies pistache"
          />
        </div>

        <div
          style={{
            height: "28rem",
            backgroundColor: " rgb(222, 146, 23)",
            alignContent: "center",
          }}
        >
          <p style={styles.jauneP}>
            Lorem ipsum dolor sit amet consectetur adipisicing Corporis.
            <br /> elit Corporis itaqueimpedit <br /> bralias mollitia,
            consequuntur quasi?
          </p>
        </div>

        {/* PRODUITS AFFICHES SUR HOME */}

        <div style={styles.homeProduit}>
          <p style={styles.homeProduitTitle}>One more sweetness...</p>
          <div style={styles.ContainerProduit}>
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
                              <div key={item._id} style={styles.produitCard}>
                                <p>{item.titre}</p>
                                <img
                                  src={item.photo}
                                  alt={item.titre}
                                  width={150}
                                  height={150}
                                />
                                <p>{item.prix} €</p>
                                <button
                                  style={{
                                    fontSize: "1rem",
                                    width: "4rem",
                                    color: " rgb(222, 146, 23)",
                                    border: "#976658ff 2px solid",
                                    backgroundColor: " #fefaef",
                                  }}
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

            <div>
              <button
                className="carousel-control-prev  "
                style={{
                  height: "2rem",
                  marginTop: "35rem",
                  marginLeft: "18rem",
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
                }}
                type="button"
                data-bs-target="#carouselProduit"
                data-bs-slide="next"
              >
                <span
                  className="carousel-bi bi-caret-right-fill"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <img
              style={styles.moitieeCookieProduit}
              src={cookie}
              alt="cookies pistache"
            />
          </div>
        </div>

        {/* contact home */}

        <div className="contactHome" style={{ marginBottom: "5rem" }}>
          <p className="homeContactTitle">Contactez nous</p>
          <form className="homeFormContact" onSubmit={handleSubmit}>
            {/* FAIRE handlesubmit dans form et definir */}
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
              style={{ color: "#833f3fff", fontSize: "1.5rem" }}
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
              style={{ color: "#833f3fff", fontSize: "1.5rem" }}
            />
            <button
              id="homeBtnContact"
              onSubmit={handleSubmit}
              style={{ color: "#833f3fff", fontSize: "1.6rem" }}
            >
              Envoyer
            </button>
          </form>
        </div>
        {/* fin de page  */}
        <button style={styles.btnBackToTop} onClick={scrollToTop}>
          retour en haut
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
