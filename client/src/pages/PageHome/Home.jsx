import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axiosinstance from "../../utils/axios/axiosinstance";
import { motion, useScroll, useTransform } from "framer-motion";

//animation
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

// PAGES  ET URL
import URL from "../../utils/constant/url";

//CSS
import "./Home.css"; // CSS spécifique

//IMAGE

import cookiebananepecan from "../../assets/images/copeauxchocolat.webp";

const PageHome = ({}) => {
  const navigate = useNavigate();
  const [produit, setProduit] = useState([]);
  const [recette, setRecette] = useState([]);
  const [formData, setFormData] = useState({ email: "", message: "" });
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const { scrollY } = useScroll();

  // plus on scroll, plus ça monte lentement
  const ySlow = useTransform(scrollY, [0, 900], [0, -90]);

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
      position: "relative",
      height: "7rem",
      fontSize: isMobile
        ? "2.4rem"
        : isTablet
        ? "5rem"
        : isTabletL
        ? "7rem"
        : isDesktop
        ? "9.5rem"
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
      const { status } = await axiosinstance.post(URL.POST_CONTACT, formData);
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

  // PARALLAX
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      document.querySelectorAll(".sectionCategorie").forEach((el) => {
        // parallax subtil
        el.style.backgroundPosition = `center ${scrollY * 0.3}px`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="home">
        <h2 style={styles.titleHome} className="titleHome ">
          COOKILICIOUS
        </h2>
        <motion.section style={{ y: ySlow }}>
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
        </motion.section>
        <div className="defilantContainer">
          <p className="phraseDefilante">
            Irrésistible 100% fait maison Texture fondante & cœur gourmand
            Préparé chaque jour
          </p>
        </div>
        {/* 
        <section className="homeSignaturePremium">
          <div className="divHomeSignature">
          <h1>Des Cookies & <br />Brookies  uniques  Irrésistibles   </h1> 
            
    
          </div>
        </section> */}
        
        <div className="homeCategorieProduit row">
          <h2 className="phraseCategorie  col-sm-10 col-md-6 col-lg-4 ">
            Des Cookies & Brookies
            <br />
            uniques <br /> & <br /> irrésitibles
            <br />
            <p> Laissez-vous succomber…</p>
          </h2>
          <section className="sectionCategorie categorieUne col-3">
            <Link to="/cookies">
              {" "}
              <h2>COOKIES</h2>
              <button className="btnCommander">Commander</button>
            </Link>
          </section>

          <section className="sectionCategorie categorieDeux col-3 ">
            <h2>BROOKIES</h2>
            <Link to="/brookies">
              <button className="btnCommander">Commander</button>
            </Link>
          </section>
        </div>
        
        <section className="sectionRecette row ">
          {" "}
          <h1 className="recetteTitle col-12  mt-5">
            Découvrez nos recettes
          </h1>{" "}
          <Link
            to="/recette"
            className="sectionRecetteContent  col-sm-10 col-md-9 "
          >
            <p>Lorem ipsum dolor sit amet consectetur elit.</p>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </Link>{" "}
          <button
            className="btnRecette col-5"
            data-back="Je le veux"
            data-front="Je le veux"
            onClick={() => navigate("/recette")}
          ></button>
          <img
            className="moitieeBrookie col-5"
            src="https://www.harrisfarm.com.au/cdn/shop/files/brrokie.png?v=1694316224"
            alt="cookies pistache"
          />
        </section>{" "}
      
        <div className="containerJaune ">
          <h3 className="jauneP">F.A.Q</h3>{" "}
          <div className="faqContent">
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
                    Nos cookies se conservent jusqu’à <strong>7 jours</strong>
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
        <div className="homeProduit">
          <h1 className="homeProduitTitle text-left">One more sweetness...</h1>

          <div className="row g-5">
            {produit.map(
              (item, index) =>
                index < 4 && (
                  <div key={item._id} className="col-12 col-md-6 col-lg-3">
                    <div className=" produitCard">
                      <p>{item.titre}</p>

                      <img
                        className="img-fluid"
                        src={
                          item.photo ||
                          "https://static.wixstatic.com/media/82955a_99098664b7034f9b876c2b43ac70d615~mv2.jpg"
                        }
                        alt={item.titre}
                        width={200}
                        height={200}
                      />

                      <p>{item.prix} €</p>
                      <button
                        className="produitCardBtn"
                        onClick={() => navigate(`/detail/${item._id}`)}
                      >
                        voir
                      </button>
                    </div>
                  </div>
                )
            )}
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
        <p className="defilantTitle">COOKILIOUS</p>
      </div>
    </>
  );
};

export default PageHome;
