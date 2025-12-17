import { useState, useEffect, useContext, useRef } from "react";
import URL from "../../utils/constant/url";
import { Link } from "react-router-dom";
import axiosinstance from "../../utils/axios/axiosinstance";
import { AuthContext } from "../../utils/context/AuthContext";
import HEADER_LINKS from "../../utils/config/LinkHeader";
import { SIGN_FIELDS } from "../../utils/config/FormFields";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


//CSS

import "./Recette.css";

//images

import cookiegemini from "../../assets/images/Gemini_Generated_Image_jnk9izjnk9izjnk9-Photoroom.png";
import cookiechoco from "../../assets/images/Cookiechoco.png";

// regarder doc https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Optional_chaining

const PageRecette = () => {
  const [recette, setRecette] = useState([]);
  const [formData, setFormData] = useState([]);
  const [avis, setAvis] = useState([]);
  // connexion
  const { user } = useContext(AuthContext);
  const isAuthenticated = user;
  const role = user?.role;
  const { login } = useContext(AuthContext);
  const [formDataUser, setFormDataUser] = useState({});

  const visibleRecette = HEADER_LINKS.filter((link) => {
    if (!isAuthenticated) return false; // pas connecté → pas d'accès
    if (link.auth === role) return true; // rôle correspondant
  });

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

  // FORMULAIRE AVIS  faire back avis

  const handleChange = (e) => {
    // const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosinstance.post(URL.POST_AVIS, formData);
      console.log(data);
    } catch (error) {}
  };

  const getAvis = async () => {
    try {
      const { formData } = await axiosinstance.post(URL.POST_AVIS);
      console.log(formData);
    } catch (error) {}
  };

  // Connexion user

  const handleChangeUser = (event) => {
    const { name, value } = event.target;
    setFormDataUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    await login(formDataUser);
  };


  const recetteRef = useRef(null);

  useEffect(() => {
    const el = recetteRef.current;
    if (!el) return;

    const totalScroll = el.scrollWidth - el.offsetWidth;

    gsap.to(el, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: () => `+=${el.scrollWidth}`,
        scrub: true,
        pin: true,
      },
    });
  }, []);

  return (
    <div className="" style={{marginTop:"3rem"}}>
     

      <h1 className=" titrePageRecette ">
        {/* <h1 className=" titrePageRecette col-sm-6  col-md-6 col-lg-7"> */}
        Nos <br />
        Recettes
      </h1>
       <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-3">
          <li className="breadcrumb-item  px-3">
            <Link to="/" style={{ width: "3rem" }}>
              Home
            </Link>
          </li>

          <li className="breadcrumb-item" aria-current="page">
            Recettes
          </li>
        </ol>
      </nav>
      <div style={{ padding: "1.5rem" }}>
        <p className=" phraseIntro col-sm-6  col-md-8 col-lg-6"></p>
        {/* ************************************************************************************** */}

        <div className="row" style={{ marginBottom: "3rem" }}>
          <p
            className=" phraseIntroDeux col-xs-1 col-md-12 col-lg-12 "
            style={{ marginBottom: "3rem", fontSize: "1.4rem" }}
          >
            Laissez-vous inspirer par nos variantes créatives, gourmandes et
            généreuses. Des idées simples et rapides à reproduire chez vous,
            avec le goût authentique de nos pâtisseries.
          </p>
        </div>



        {/* **************************** */}
        <section className="homeRecipesWrapper">
      <h2 className="homeRecipesTitle">
        Testez <br /> nos <br /> recettes
      </h2>
      <div className="homeRecipes">
        <div className="recetteContent" ref={recetteRef}>
          <div className="recetteItem">
            Testez nos recettes gourmandes <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </div>
          <div className="recetteItem">
            Des recettes testées et approuvées! <br />
            Maxime dolorem rem non cumque! Sed, architecto?
          </div>
          <div className="recetteItem">
            Le plaisir du fait maison <br />
            Pariatur minus doloribus sit consequatur, quidem culpa nulla aut delectus.
          </div>
          <div className="recetteItem">
            Encore plus de gourmandises <br />
            Inventore, vero! Lorem ipsum dolor sit amet consectetur.
          </div>
        </div>
      </div>
    </section>


        {/* **************************** */}
        <section>
          <div style={{ paddingTop: "2rem", marginBottom: "3rem" }}>
            <div className="row d-flex">
              <h2 className="titreSection col-sm-10 col-md-4 col-lg-5">
                {recette[7]?.titre}
              </h2>
              <p className="pSection col-sm-12 col-md-6 col-lg-6">
                {recette[7]?.description}
                <button
                  type="button"
                  className="btn btn-primary col-sm-1"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  style={{
                    height: "2rem",
                    marginLeft: "1rem",
                    backgroundColor: "var(--caramel)",
                    color: "var(--creme)",
                    width: "9rem",
                    alignContent: "center",
                  }}
                >
                  Voir recette
                </button>
              </p>
            </div>

            {/* Modal */}
            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-dialog row"
                style={{ maxWidth: "90%", height: "auto", padding: "3rem" }}
              >
                <div
                  className="modal-content"
                  style={{ color: "var(--marronRouge)" }}
                >
                  {isAuthenticated ? (
                    <>
                      <div className="modal-header">
                        <h1 className="modal-title" id="staticBackdropLabel">
                          {recette[7]?.titre}
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div
                        className="modal-body"
                        style={{ textAlign: "justify" }}
                      >
                        <h2 style={styles.titrePreparation}>
                          {recette[7]?.nbPersonne}
                        </h2>
                        <h2 style={styles.titrePreparation}>Ingrédients:</h2>
                        <p>{recette[7]?.ingredients}</p>
                        <h2 style={styles.titrePreparation}>Préparation:</h2>
                        <p>{recette[7]?.preparation}</p>
                        <h2 style={styles.titrePreparation}>Astuce:</h2>
                        <p>{recette[7]?.astuce}</p>
                      </div>
                    </>
                  ) : (
                    <div className="modal-body">
                      <p>
                        Veuillez vous connecter pour découvrir la recette 😉{" "}
                      </p>
                      <h1 className="text-center mb-4">Sign</h1>
                      <form onSubmit={handleSubmitUser}>
                        {SIGN_FIELDS.map((field, index) => (
                          <div
                            className="input-group flex-nowrap mb-3"
                            key={index}
                          >
                            <span
                              className="input-group-text"
                              id="addon-wrapping"  style={{border:"var(--marronRouge) 2px solid",}}
                            >
                              <i className={field.icon} style={{color:"var(--marronRouge)",}}></i>
                            </span>
                            <input
                              type={field.type}
                              className="form-control"
                              placeholder={field.placeholder}
                              aria-label={field.label}
                              name={field.name}
                              aria-describedby="addon-wrapping"
                              onChange={handleChangeUser}
                              style={{border:"var(--marronRouge) 2px solid",}}
                            />
                          </div>
                        ))}
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn  w-100"
                            style={{border:"var(--marronRouge) 2px solid", color:"var(--marronRouge)",  marginBottom:"2rem" }}
                          >
Je me connecte                          </button>
                        </div>
                      </form>
                      <Link to="/register">Vous n'avez pas de compte ?</Link>
                    </div>
                  )}
                  {/* Footer commun */}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary col-xs-5 col-md-3"
                      data-bs-dismiss="modal"
                      style={{
                        backgroundColor: "var(--jaune)",
                        alignSelf: "end",
                        margin: "1rem",
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

       

        {/* SECTION AVIS */}

        <div
          className="sectionAvis"
          style={{ borderTop: "3px var(--marronRouge) solid" }}
        >
          <h2>Avis</h2>
          <p style={{ textAlign: "left" }}>
            <br />
            exemple avis :
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione sit
            nulla aliquam perferendis! Labore placeat perspiciatis velit dicta
            aliquid blanditiis cum, iste maxime odio iure libero quam, suscipit
            dolor laborum.
          </p>
        </div>

        {/* ******************************************* */}

        {/* formulaire uniquement sous connexion */}

        <div className="row justify-content-center">
          <div
            className=" col-12 col-md-12 py-4"
            style={{
              fontSize: "1rem",
              borderTop: "3px var(--marronRouge) solid",
              alignItems: "center",
            }}
          >
            {/* Champs du formulaire */}
            <h1>Laisser un avis!</h1>
            <form
              onSubmit={handleSubmit}
              className="row d-flex justify-content-center m-4"
            >
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="inputRecette" onChange={handleChange}>
                  Recette testée
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputRecette"
                  placeholder="Recette testée"
                  style={{
                    border: "4px solid var(--marronRouge)",
                    color: "var(--marronRouge)",
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="commentaire" onChange={handleChange}>
                  Commentaire
                </label>

                <textarea
                  type="text"
                  name="comentaire"
                  id="commentaire"
                  className="form-control"
                  placeholder="Votre Commentaire"
                  style={{
                    height: "10rem",
                    border: "4px solid var(--marronRouge)",
                    color: "var(--marronRouge)",
                    marginBottom: "2rem",
                  }}
                ></textarea>
              </div>{" "}
              {/* Bouton */}
              <div className="">
                <button
                  onSubmit={handleSubmit}
                  type="submit"
                  className="btn btn-primary px-5"
                >
                  Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
const styles = {
  titrePreparation: {
    justifySelf: "center",
    margin: "3rem",
    color: "var(--jaune)",
  },
};

export default PageRecette;
