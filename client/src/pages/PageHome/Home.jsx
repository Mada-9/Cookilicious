import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosinstance from "../../utils/axios/axiosinstance";
import { motion, useScroll, useTransform } from "framer-motion";
import { toast } from "react-toastify";

// PAGES  ET URL
import URL from "../../utils/constant/url";

//CSS
import "./Home.css"; // CSS

//IMAGE
import Brookie from "../../assets/images/brookie.webp";

const PageHome = ({}) => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useState([]);
  const [brookie, setBrookie] = useState([]);
  const [formData, setFormData] = useState({ email: "", message: "" });
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const { scrollY } = useScroll();

  // plus on scroll, plus ça monte lentement
  const ySlow = useTransform(scrollY, [0, 700], [0, -90]);

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
            Des cookies & brookies uniques faits maison pour succomber à la
            tentation.
          </p>
        </div>

        <div className="homeCategorieProduit row ">
          <div className="phraseCategorie  col-sm-10 col-md-6 col-lg-4 ">
            <h2>Des Stuffed Cookies </h2>
            <h2>& Brookies</h2>
            <p>
              uniques <br /> & <br /> irrésitibles
            </p>
          </div>

          <section className="sectionCategorie categorieUne col-3">
            <h2>NOS STUFFED COOKIES</h2>
            <Link to="/cookies">
              <button className="btnCommander">Commander</button>
            </Link>
          </section>

          <section className="sectionCategorie categorieDeux col-3 ">
            <h2> NOS BROOKIES</h2>
            <Link to="/brookies">
              <button className="btnCommander">Commander</button>
            </Link>
          </section>
        </div>

        {/* SECTION RECETTE */}
        <div className="row m-0 recetteSection ">
          <div className="col-md-8 p-5">
            <motion.section style={{ y: ySlow }}>
              <h2>
                Découvrez nos <br /> recettes
              </h2>
            </motion.section>
            <p>
              Des recettes inspirantes et accessibles pour éveiller votre
              créativité en cuisine.
            </p>
            <p>
              Des créations soigneusement élaborées pour sublimer les saveurs et
              transformer chaque moment en expérience gourmande.
            </p>

            <button className="btnStyle" onClick={() => navigate("/recette")}>
              Découvrir
            </button>
          </div>
          <div className="col-md-1 text-center">
            <img src={Brookie} alt="brookie" className="brookie" height={800} />
          </div>
        </div>

        <section className="phrasesContainer">
          <div style={{ zIndex: 2, wordSpacing: "0.5rem" }}>
            <h3 className="phraseSection">
              Une texture fondante, un cœur ultra gourmand… et un plaisir 100%
              Cookilicious.
            </h3>
            <h3 className="phraseSection">
              Une texture fondante, un cœur ultra gourmand… et un plaisir 100%
              Cookilicious.
            </h3>{" "}
            <h3 className="phraseSection">
              Une texture fondante, un cœur ultra gourmand… et un plaisir 100%
              Cookilicious.
            </h3>
            <h3 className="phraseSection">
              Une texture fondante, un cœur ultra gourmand… et un plaisir 100%
              Cookilicious.
            </h3>
            <h3 className="phraseSection">
              Une texture fondante, un cœur ultra gourmand… et un plaisir 100%
              Cookilicious.
            </h3>
            <h3 className="phraseSection">
              Une texture fondante, un cœur ultra gourmand… et un plaisir 100%
              Cookilicious.
            </h3>{" "}
            <h3 className="phraseSection">
              Une texture fondante, un cœur ultra gourmand… et un plaisir 100%
              Cookilicious.
            </h3>
            <h3 className="phraseSection">
              Une texture fondante, un cœur ultra gourmand… et un plaisir 100%
              Cookilicious.
            </h3>
          </div>

          {/* IMAGE COOKIE FLOTTANTE */}
          <div className="cookieImageWrapper">
            <img
              src="https://static.wixstatic.com/media/82955a_c48b31b6d3c143829ed3cb6ff83f7d69~mv2.png/v1/crop/x_69,y_0,w_2588,h_2629/fill/w_402,h_344,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/PUFFY%20AVRIL%20(46).png"
              alt="cookie cookilicious"
              className="moitieCookie"
            />
          </div>
        </section>

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
                          "https://cdn-icons-png.freepik.com/256/17797/17797810.png?semt=ais_white_label"
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
              <h2 className="contactTitle">
                Une question? une idée <br />
                une envie particulière ?
              </h2>
              <p className="contactText">Ecris nous! </p>
            </div>

            <form className="contactForm" onSubmit={handleSubmit}>
              <div className="contactField">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
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
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
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
      </div>
    </>
  );
};

export default PageHome;
