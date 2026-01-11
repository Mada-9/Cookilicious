import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosinstance from "../../utils/axios/axiosinstance";
import { motion, useScroll, useTransform } from "framer-motion";
import { toast } from "react-toastify";

//animation
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

// PAGES  ET URL
import URL from "../../utils/constant/url";

//CSS
import "./Home.css"; // CSS spécifique

//IMAGE
import Brookie from "../../assets/images/brookie.webp"

const PageHome = ({}) => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useState([]);
  const [brookie, setBrookie] = useState([]);

  const [recette, setRecette] = useState([]);
  const [formData, setFormData] = useState({ email: "", message: "" });
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const { scrollY } = useScroll();

  // plus on scroll, plus ça monte lentement
  const ySlow = useTransform(scrollY, [0, 900], [0, -90]);

  useEffect(() => {
    getAllCookies();
  }, []);

  const getAllCookies = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_COOKIES);
      if (status === 200) setCookie(data);
    } catch (error) {
      console.log(error.message);
    }
  };


   useEffect(() => {
    getAllBrookies();
  }, []);
    const getAllBrookies = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_BROOKIES);
      if (status === 200) setBrookie(data);
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
        toast.success("message envoyé !");
      } else {
        toast.error("veuillez ecrire un message valide");
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
        <h1 className="titleHome ">COOKILICIOUS</h1>
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
            {/* Irrésistible 100% fait maison Texture fondante & cœur gourmand
            Préparé chaque jour */}
            Des cookies & brookies uniques faits maison pour succomber à la
            tentation.
          </p>
        </div>
        {/* 
        <section className="homeSignaturePremium">
          <div className="divHomeSignature">
          <h1>Des Cookies & <br />Brookies  uniques  Irrésistibles   </h1> 
            
    
          </div>
        </section> */}
        <div className="homeCategorieProduit row ">
          <h2 className="phraseCategorie  col-sm-10 col-md-6 col-lg-4 ">
            Des Cookies & Brookies
            <br />
            uniques <br /> & <br /> irrésitibles
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
        <section className="sectionRecette row px-5">
          <h1 className="recetteTitle col-12  mt-5 ">Découvrez nos recettes</h1>{" "}
          <Link
            to="/recette"
            className="sectionRecetteContent col-sm-10 col-md-11  "
          >
            {/* <p>Explorez des recettes savoureuses, pensées pour sublimer chaque ingrédient et transformer vos moments en véritables instants de plaisir..</p> */}
            <p>
              Des recettes inspirantes et accessibles pour éveiller votre
              créativité en cuisine.
            </p>
            {/* <p>
              Des recettes soigneusement élaborées pour sublimer les saveurs et
              transformer chaque moment en expérience gourmande.
            </p> */}
            <p>
              Des créations culinaires inspirées, conçues pour mettre en valeur
              les ingrédients
            </p>
          </Link>{" "}
          <button
            className="btnRecette col-5"
            data-back="Je décrouvre"
            data-front="Je décrouvre"
            onClick={() => navigate("/recette")}
          ></button>
          <img
            className="moitieeBrookie col-5"
            src={Brookie}
            alt="cookies pistache"
          />
        </section>
        {/* <section className="sectionJaune row px-5">
          <h1 className="col-12">
            100% fait
            <br /> maison.
          </h1>
          <p className="col-12 ">
            Texture fondante & cœur gourmand Préparé chaque jour Lorem ipsum,
            dolor sit amet consectetur adipisicing elit. Repellendus quo
            voluptatibus quisquam explicabo neque error exercitationem.
          </p>
        </section> */}
        <div
          style={{
            backgroundColor: "var(--jaune)",
            padding: "4rem 0rem 4rem 0rem",
            justifyItems: "center",
          }}
        >
          <h3 style={{ marginBottom: "0.7rem", wordSpacing: "20px" }}>
            Texture fondante, cœur ultra gourmand… un plaisir 100 %
            Cookilicious.
          </h3>
          <h3 style={{ marginBottom: "0.7rem", wordSpacing: "20px" }}>
            Texture fondante, cœur ultra gourmand… un plaisir 100 %
            Cookilicious.
          </h3>
          <h3 style={{ marginBottom: "0.7rem", wordSpacing: "20px" }}>
            Texture fondante, cœur ultra gourmand… un plaisir 100 %
            Cookilicious.
          </h3>
          <h3 style={{ marginBottom: "0.7rem", wordSpacing: "20px" }}>
            Texture fondante, cœur ultra gourmand… un plaisir 100 %
            Cookilicious.
          </h3>
          <h3 style={{ marginBottom: "0.7rem", wordSpacing: "20px" }}>
            Texture fondante, cœur ultra gourmand… un plaisir 100 %
            Cookilicious.
          </h3>
          <h3 style={{ marginBottom: "0.7rem", wordSpacing: "20px" }}>
            Texture fondante, cœur ultra gourmand… un plaisir 100 %
            Cookilicious.
          </h3>
          <h3 style={{ marginBottom: "0.7rem", wordSpacing: "20px" }}>
            Texture fondante, cœur ultra gourmand… un plaisir 100 %
            Cookilicious.
          </h3>
        </div>
        {/* PRODUITS AFFICHES SUR HOME */}
        <div className="homeProduit px-5 ">
          <h1 className="homeProduitTitle text-left ">One more sweetness...</h1>

          <div className="row g-5">
            {cookie.map(
              (item, index) =>
                index < 2 && (
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
                        onClick={() => navigate(`/cookie/${item._id}`)}
                      >
                        voir
                      </button>
                    </div>
                  </div>
                )
            )}
            {brookie.map(
              (brookie, index) =>
                index < 2 && (
                  <div key={brookie._id} className="col-12 col-md-6 col-lg-3">
                    <div className=" produitCard">
                      <p>{brookie.titre}</p>

                      <img
                        className="img-fluid"
                        src={
                          brookie.photo ||
                          "https://static.wixstatic.com/media/82955a_99098664b7034f9b876c2b43ac70d615~mv2.jpg"
                        }
                        alt={brookie.titre}
                        width={200}
                        height={200}
                      />

                      <p>{brookie.prix} €</p>
                      <button
                        className="produitCardBtn"
                        onClick={() => navigate(`/brookie/${item._id}`)}
                      >
                        voir
                      </button>
                    </div>
                  </div>
                )
            )}
           


          </div>
        </div>
        <section className="sectionFaq">
          <h2 className="faqP">F.A.Q</h2>{" "}
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
        </section>
        {/* SECTION CONTACT */}
        <section className="contactHome">
          <div className="contactWrapper">
            <div className="contactInfoSide">
              <h2 className="contactTitle">Parlons de gourmandise.</h2>
              <p className="contactText">
                Une idée, une collaboration ou une envie particulière ?
                <br />
                Écris-nous. Le reste suivra.
              </p>
            </div>

            <form className="contactForm" onSubmit={handleSubmit}>
              <div className="contactField">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="tonemail@exemple.com"
                  className="contactInput"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contactField">
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Dites-nous tout..."
                  className="contactTextarea"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="contactBtn">
                Envoyer
              </button>
            </form>
          </div>
        </section>

        {/* fin de page  */}
        <button className="btnBackToTop" onClick={scrollToTop}>
          Retour en haut
        </button>
      </div>
    </>
  );
};

export default PageHome;
