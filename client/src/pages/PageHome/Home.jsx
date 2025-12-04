import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axiosinstance from "../../utils/axios/axiosinstance";


// PAGES  ET URL
import URL from "../../utils/constant/url";
// import DetailProduit from "../PageProduit/DetailProduit";

//IMAGES
// import cookie2 from "../../assets/images/Gemini_Generated_Image_jnk9izjnk9izjnk9-Photoroom.png";
// import cookie from "../../assets/images/cookiepistache.png";
// import cookiefraise from "../../assets/images/cookiefraise.png";
// import cookiechoco from "../../assets/images/cookiechoco.png";
// import cookie4 from "../../assets/images/CaptureE299e81cran20a80_11.53.01-removebg-preview.png";

//CSS
import "./Home.css"; // CSS spécifique

const PageHome = ({}) => {
  const navigate = useNavigate();
  const [produit, setProduit] = useState([]);
  const [recette, setRecette] = useState([]);
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
      marginTop: "3rem ",
      
      position: "relative",
      height: "7rem",
      fontSize: isMobile
        ? "2.4rem"
        : isTablet
        ? "5rem"
        : isTabletL
        ? "7rem"
        : isDesktop
        ? "9rem"
        : "3rem",
    },

    // phraseDefilante: {
    //   fontSize: isMobile ? "1rem" : "1.7rem",
    // },
  };

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

  useEffect(() => {
    getAllRecettes();
  }, []);

  const getAllRecettes = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_RECETTES);
      if (status === 200) setRecette(data);
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
        <h1 style={styles.titleHome} className="titleHome">
          COOKILICIOUS
        </h1>

        <div className="imageHome" onClick={() => navigate("/cookies")}>
          <img
            className="imagesHome"
            src="https://static.wixstatic.com/media/82955a_99098664b7034f9b876c2b43ac70d615~mv2.jpg/v1/crop/x_71,y_71,w_938,h_938/fill/w_938,h_938,al_c,q_85,enc_avif,quality_auto/Cooies_Puffy2.jpg"
            alt="COOKIE"
          />
          <img
            className="imagesHome"
            src="https://static.wixstatic.com/media/82955a_99098664b7034f9b876c2b43ac70d615~mv2.jpg/v1/crop/x_71,y_71,w_938,h_938/fill/w_938,h_938,al_c,q_85,enc_avif,quality_auto/Cooies_Puffy2.jpg"
            alt="COOKIE"
          />
          <img
            className="imagesHome"
            src="https://static.wixstatic.com/media/82955a_99098664b7034f9b876c2b43ac70d615~mv2.jpg/v1/crop/x_71,y_71,w_938,h_938/fill/w_938,h_938,al_c,q_85,enc_avif,quality_auto/Cooies_Puffy2.jpg"
            alt="COOKIE"
          />
        </div>

        <div className="defilantContainer">
          <p className="phraseDefilante">
            Des cookies & brookies uniques faits maison pour succomber à la
            tentation.
          </p>
        </div>

        <div className="homeCategorieProduit row ">
          <h2 className="phraseCategorie  col-lg-4 col-lg-2 ">
            Parcourez nos différentes catégories, <br /> et <br /> laissez vous
            succomber...
          </h2>

          <section className="sectionCategorie  categorieUne  col-md-5 col-lg-3 ">
            COOKIES
            <Link to="/cookies">
              <button className="btnCommander">Commander</button>
            </Link>
          </section>
          <section className="sectionCategorie categorieDeux col-md-5 col-lg-3 ">
            BROOKIES
            <Link to="/brookies">
              {/*  HASHLINK  NE FONCTIONNE PAS*/}
              <button className="btnCommander">Commander</button>
            </Link>
          </section>
        </div>

        <div className="homeRecipes text-center ">
          <h2 className="homeRecipesTitle col-lg-12  ">Testez nos recettes</h2>
          <div className="row mx-auto  px-3">
            <div className="recetteHome mx-auto col-lg-6  ">
              (mettre slide recettes )
              {/* {recette.map((item) => (
              <p>{item.titre}</p>
            ))} */}
              <button
                onClick={() => navigate("/recette")}
                className="btnRecette col-sm-4"
              >
                Je découvre !
              </button>
            </div>

            <img
              className="moitieeBrookie mx-auto  col-sm-12 col-md-2"
              src={
                "https://www.harrisfarm.com.au/cdn/shop/files/brrokie.png?v=1694316224"
              }
              alt="cookies pistache"
            />
          </div>
        </div>
        <div className="containerJaune ">
          <h3 className="jauneP">FAQ</h3>{" "}
          <div>
            <div
              className=" accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className=" accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    Quels sont les délais de livraison ?
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Les commandes sont préparées sous 24h et expédiées sous 48h.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Comment conserver les cookies ?{" "}
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Nos cookies se conservent jusqu’à <strong>7 jours</strong>{" "}
                    dans une boîte hermétique.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    Comment sont faits les cookies ?
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Tous nos cookies sont <strong>faits maison</strong>,
                    quotidiennement.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUITS AFFICHES SUR HOME */}

        <div className="homeProduit row">
          <h2 className="homeProduitTitle mx-auto ">One more sweetness...</h2>
          <div className="containerProduit row">
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
                              className="produitCard col-sm-8 col-md-6 col-lg-4 col-xl-3"
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
            <div className="row" style={{color:"black"}}>
              <button
                className="carousel-control-prev col-sm-4 "
                style={{
                  height: "2rem",
                  marginTop: "35rem",
                  marginLeft:"5rem",
                  color: "var(--marronFonce)",
                }}
                type="button"
                data-bs-target="#carouselProduit"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-bi bi-caret-left-fill "
                  aria-hidden="false"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                style={{
                  height: "2rem",
                  marginTop: "35rem",
                                    marginRight:"5rem",

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

        <div className="contactHome my-5 p-3">
          <div className="row">
            <form className=" homeFormContact " onSubmit={handleSubmit}>
              <h1 className="homeContactTitle">Contactez nous!</h1>
              {/* Champs du formulaire */}

              <div className="row justify-content-center m-4">
                <div className="row form-group  mb-3">
                  <label htmlFor="email" className="email justify-self-center ">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="emailInput form-control"
                    placeholder="Ecrivez votre email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="message ">
                    Message
                  </label>

                  <textarea
                    type="text"
                    name="message"
                    id="message"
                    autoComplete="message"
                    className="messageInput form-control"
                    placeholder="Votre message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Bouton */}
                <div className=" row">
                  <button
                    type="submit"
                    className="homeBtnContact btn mx-auto m-5"
                    onSubmit={handleSubmit}
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </form>
          </div>
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
