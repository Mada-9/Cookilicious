import { useState, useEffect, useContext, useRef } from "react";
import URL from "../../utils/constant/url";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {  useScroll, useTransform } from "framer-motion";

import axiosinstance from "../../utils/axios/axiosinstance";
import { AuthContext } from "../../utils/context/AuthContext";
import HEADER_LINKS from "../../utils/config/LinkHeader";
import { SIGN_FIELDS } from "../../utils/config/FormFields";

//ANIMATION
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

//CSS
import "./Recette.css";

//images
import cookiegemini from "../../assets/images/Gemini_Generated_Image_jnk9izjnk9izjnk9-Photoroom.png";
import cookiechoco from "../../assets/images/Cookiechoco.png";
import cookiebananepecan from "../../assets/images/cookiebananepecan.webp";
import cookiedough from "../../assets/images/cookiedough.webp";

const PageRecette = () => {
  const [recette, setRecette] = useState([]);
  const [formData, setFormData] = useState({
    pseudo:"",
    recetteTest: "",
    commentaire: "",
    image: "",
  });
  const [avis, setAvis] = useState([]);
  const { scrollY } = useScroll();

  // connexion
  const { user } = useContext(AuthContext);
  const isAuthenticated = user;
  const role = user?.role;
  const { login } = useContext(AuthContext);
  const [formDataUser, setFormDataUser] = useState({});

  const visibleRecette = HEADER_LINKS.filter((link) => {
    if (!isAuthenticated) return false;
    if (link.auth === role) return true;
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

  // FORMULAIRE AVIS

  const handleChange = (e) => {
    // const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("FormData envoyé :", formData); // <- Vérifie ici

    try {
      const { status, data } = await axiosinstance.post(
        URL.POST_AVIS,
        formData
      );
      console.log(formData);
      if (status === 201) {
        console.log("Avis publié !");
        toast.success("Avis publié!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllAvis();
  }, []);

  const getAllAvis = async () => {
    try {
      const { data, status } = await axiosinstance.get(URL.GET_ALL_AVIS);
      console.log(data);
      if (status === 200) setAvis(data);
    } catch (error) {
      console.log(error.message);
    }
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

  // ANIMATION

  // plus on scroll, plus ça monte lentement (parallax)
  const ySlow = useTransform(scrollY, [0, 600], [0, -120]);

  // REFS pour l'animation scroll vertical
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current || !titleRef.current) return;

    ScrollTrigger.matchMedia({
      // =========================
      // DESKTOP : animation active
      // =========================
      "(min-width: 769px)": () => {
        const wrapper = wrapperRef.current;
        const content = contentRef.current;
        const title = titleRef.current;

        const getScrollAmount = () => {
          const contentHeight = content.scrollHeight;
          const viewportHeight = window.innerHeight;
          const extraSpace = viewportHeight * 0.5;
          return -(contentHeight + extraSpace);
        };

        const verticalScroll = gsap.to(content, {
          y: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${content.scrollHeight + window.innerHeight}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        const recipeCards = content.querySelectorAll(".recetteContent");
        recipeCards.forEach((card) => {
          gsap.fromTo(
            card,
            { scale: 0.85 },
            {
              scale: 1,
              scrollTrigger: {
                trigger: card,
                containerAnimation: verticalScroll,
                start: "top bottom",
                end: "center center",
                scrub: 1,
              },
            }
          );
        });

        gsap.fromTo(
          title,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: wrapper,
              start: "top center",
              end: "top top",
              scrub: 1,
            },
          }
        );

        return () => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      },

      // MOBILE : AUCUNE ANIMATION
      "(max-width: 768px)": () => {
        // On s'assure que tout est clean
        gsap.set([contentRef.current, titleRef.current], {
          clearProps: "all",
        });
      },
    });

    return () => ScrollTrigger.clearMatchMedia();
  }, [recette]);

  return (
    <div className="pageRecette" style={{ marginTop: "2rem" }}>
        <h1 className="titrePageRecette">
          Nos <br />
          Recettes
        </h1>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-3">
          <li className="breadcrumb-item px-3">
            <Link to="/" style={{ width: "3rem" }}>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            Recettes
          </li>
        </ol>
      </nav>

      <div style={{ padding: "3rem" }}>
        <p className="phraseIntro col-sm-6 col-md-8 col-lg-6"></p>
        <div className="row" style={{ marginBottom: "3rem" }}>
          <p
            className="phraseIntroDeux col-xs-1 col-md-12 col-lg-12"
            style={{ marginBottom: "3rem", fontSize: "1.4rem" }}
          >
            Laissez-vous inspirer par nos variantes créatives, gourmandes et
            généreuses. Des idées simples et rapides à reproduire chez vous,
            avec le goût authentique de nos pâtisseries.
          </p>
        </div>
        {/* SECTION AVEC SCROLL VERTICAL */}
        <section className="homeRecipesWrapper row" ref={wrapperRef}>
          {/* Titre fixe */}
          <h2 className="titreAnimRecette" ref={titleRef}>
            Amusez <br /> vous ! <br />
            et pâtissez
          </h2>

          {/* Contenu qui défile verticalement */}
          <div className="animRecette" ref={contentRef}>
            {/* Vous pouvez mapper vos recettes ici */}
            <div className="recetteContent">
              {/* <div style={numberStyles}>01</div> */}
              <h3 className="titreRecetteContent"> {recette[5]?.titre}</h3>
              <p>Testez nos recettes gourmandes {recette[5]?.description}</p>
              <button
                type="button"
                className="btnVoirRecette"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop1"
              >
                Voir la recette
              </button>
            </div>

            <div className="recetteContent">
              <h3 className="titreRecetteContent">{recette[6]?.titre}</h3>
              <p style={descStyles}>
                Des recettes testées et approuvées! {recette[6]?.description}
              </p>
              <button
                type="button"
                className="btnVoirRecette"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop2"
              >
                Voir la recette
              </button>
            </div>

            <div className="recetteContent">
              <h3 className="titreRecetteContent"> {recette[7]?.titre} </h3>
              <p>
                Une dernière recette pour le scroll {recette[7]?.description}
              </p>
              <button
                type="button"
                className="btnVoirRecette"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop3"
              >
                Voir la recette
              </button>
            </div>
          </div>
        </section>
        {/* Modal premiere recette */}
        <div
          className="modal fade"
          id="staticBackdrop1"
          tabIndex="-1"
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
                    <h2 className="modal-title" id="staticBackdropLabel">
                      {recette[8]?.titre}
                    </h2>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body" style={{ textAlign: "justify" }}>
                    <h2 className="titrePreparation">
                      {recette[8]?.nbPersonne}
                    </h2>
                    <h2 className="titrePreparation">Ingrédients:</h2>
                    <p>{recette[8]?.ingredients}</p>
                    <h2 className="titrePreparation">Préparation:</h2>
                    <p>{recette[8]?.preparation}</p>
                    <h2 className="titrePreparation">Astuce:</h2>
                    <p>{recette[8]?.astuce}</p>
                  </div>
                </>
              ) : (
                <div className="modal-body">
                  <p>Veuillez vous connecter pour découvrir la recette 😉 </p>
                  <h1 className="text-center mb-4">Sign</h1>
                  <form onSubmit={handleSubmitUser}>
                    {SIGN_FIELDS.map((field, index) => (
                      <div className="input-group flex-nowrap mb-3" key={index}>
                        <span
                          className="input-group-text"
                          id="addon-wrapping"
                          style={{ border: "var(--marronRouge) 2px solid" }}
                        >
                          <i
                            className={field.icon}
                            style={{ color: "var(--marronRouge)" }}
                          ></i>
                        </span>
                        <input
                          type={field.type}
                          className="form-control"
                          placeholder={field.placeholder}
                          aria-label={field.label}
                          name={field.name}
                          aria-describedby="addon-wrapping"
                          onChange={handleChangeUser}
                          style={{ border: "var(--marronRouge) 2px solid" }}
                        />
                      </div>
                    ))}
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn w-100"
                        style={{
                          border: "var(--marronRouge) 2px solid",
                          color: "var(--marronRouge)",
                          marginBottom: "2rem",
                        }}
                      >
                        Je me connecte{" "}
                      </button>
                    </div>
                  </form>
                  <Link
                    to="/register"
                    onClick={() => {
                      const modal = document.getElementById("staticBackdrop1");
                      const backdrop =
                        document.querySelector(".modal-backdrop");

                      if (modal) modal.classList.remove("show");
                      if (backdrop) backdrop.remove();
                      document.body.classList.remove("modal-open");
                    }}
                  >
                    Vous n'avez pas de compte ?
                  </Link>
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary col-xs-5 col-md-3"
                  data-bs-dismiss="modal"
                  style={{
                    backgroundColor: "var(--jaune)",
                    alignSelf: "end",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal 2e recette */}
        <div
          className="modal fade"
          id="staticBackdrop2"
          tabIndex="-1"
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
                    <h2 className="modal-title" id="staticBackdropLabel">
                      {recette[6]?.titre}
                    </h2>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body" style={{ textAlign: "justify" }}>
                    <h2 className="titrePreparation">
                      {recette[6]?.nbPersonne}
                    </h2>
                    <h2 className="titrePreparation">Ingrédients:</h2>
                    <p>{recette[6]?.ingredients}</p>
                    <h2 className="titrePreparation">Préparation:</h2>
                    <p>{recette[6]?.preparation}</p>
                    <h2 className="titrePreparation">Astuce:</h2>
                    <p>{recette[8]?.astuce}</p>
                  </div>
                </>
              ) : (
                <div className="modal-body">
                  <p>Veuillez vous connecter pour découvrir la recette 😉 </p>
                  <h1 className="text-center mb-4">Sign</h1>
                  <form onSubmit={handleSubmitUser}>
                    {SIGN_FIELDS.map((field, index) => (
                      <div className="input-group flex-nowrap mb-3" key={index}>
                        <span
                          className="input-group-text"
                          id="addon-wrapping"
                          style={{ border: "var(--marronRouge) 2px solid" }}
                        >
                          <i
                            className={field.icon}
                            style={{ color: "var(--marronRouge)" }}
                          ></i>
                        </span>
                        <input
                          type={field.type}
                          className="form-control"
                          placeholder={field.placeholder}
                          aria-label={field.label}
                          name={field.name}
                          aria-describedby="addon-wrapping"
                          onChange={handleChangeUser}
                          style={{ border: "var(--marronRouge) 2px solid" }}
                        />
                      </div>
                    ))}
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn w-100"
                        style={{
                          width: "30rem",
                          background: "var(--marronRouge)",
                          border: "1px solid var(--marronFroid)",
                          color: "var(--creme)",
                          padding: "12px 28px",
                          borderRadius: "50px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          justifySelf: "center",
                          fontSize: "1rem",
                        }}
                      >
                        Je me connecte{" "}
                      </button>
                    </div>
                  </form>
                  <Link
                    to="/register"
                    onClick={() => {
                      const modal = document.getElementById("staticBackdrop2");
                      const backdrop =
                        document.querySelector(".modal-backdrop");

                      if (modal) modal.classList.remove("show");
                      if (backdrop) backdrop.remove();
                      document.body.classList.remove("modal-open");
                    }}
                  >
                    Vous n'avez pas de compte ?
                  </Link>
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary col-xs-5 col-md-3"
                  data-bs-dismiss="modal"
                  style={{
                    backgroundColor: "var(--jaune)",
                    alignSelf: "end",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal 3e recette */}
        <div
          className="modal fade"
          id="staticBackdrop3"
          tabIndex="-1"
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
                    <h2 className="modal-title" id="staticBackdropLabel">
                      {recette[7]?.titre}
                    </h2>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body" style={{ textAlign: "justify" }}>
                    <h2 className="titrePreparation">
                      {recette[7]?.nbPersonne}
                    </h2>
                    <h2 className="titrePreparation">Ingrédients:</h2>
                    <p>{recette[7]?.ingredients}</p>
                    <h2 className="titrePreparation">Préparation:</h2>
                    <p>{recette[7]?.preparation}</p>
                    <h2 className="titrePreparation">Astuce:</h2>
                    <p>{recette[7]?.astuce}</p>
                  </div>
                </>
              ) : (
                <div className="modal-body">
                  <p>Veuillez vous connecter pour découvrir la recette 😉 </p>
                  <h1 className="text-center mb-4">Sign</h1>
                  <form onSubmit={handleSubmitUser}>
                    {SIGN_FIELDS.map((field, index) => (
                      <div className="input-group flex-nowrap mb-3" key={index}>
                        <span
                          className="input-group-text"
                          id="addon-wrapping"
                          style={{ border: "var(--marronRouge) 2px solid" }}
                        >
                          <i
                            className={field.icon}
                            style={{ color: "var(--marronRouge)" }}
                          ></i>
                        </span>
                        <input
                          type={field.type}
                          className="form-control"
                          placeholder={field.placeholder}
                          aria-label={field.label}
                          name={field.name}
                          aria-describedby="addon-wrapping"
                          onChange={handleChangeUser}
                          style={{ border: "var(--marronRouge) 2px solid" }}
                        />
                      </div>
                    ))}
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn w-100"
                        style={{
                          border: "var(--marronRouge) 2px solid",
                          color: "var(--marronRouge)",
                          marginBottom: "2rem",
                        }}
                      >
                        Je me connecte{" "}
                      </button>
                    </div>
                  </form>
                  <Link
                    to="/register"
                    onClick={() => {
                      const modal = document.getElementById("staticBackdrop3");
                      const backdrop =
                        document.querySelector(".modal-backdrop");

                      if (modal) modal.classList.remove("show");
                      if (backdrop) backdrop.remove();
                      document.body.classList.remove("modal-open");
                    }}
                  >
                    Vous n'avez pas de compte ?
                  </Link>
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary col-xs-5 col-md-3"
                  data-bs-dismiss="modal"
                  style={{
                    backgroundColor: "var(--jaune)",
                    alignSelf: "end",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>{" "}
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus
          quo voluptatibus quisquam explicabo neque error exercitationem,
          asperiores, cumque porro voluptate laborum facilis sint vel placeat
          eligendi corrupti dolorem, eveniet sunt.
        </p>
        {/* RESTE DU CONTENU */}
        <div>
          <img src={cookiebananepecan} alt="cookie" height={400} width={400} />
        </div>
        {/* SECTION AVIS */}
        <div
          className="sectionAvis"
          style={{
            borderTop: "3px var(--marronRouge) solid",
            marginBottom: "3rem",
          }}
        >
          <h2 className="vosAvis">Vos Avis</h2>
          {avis.map((item) => (
            <div key={item._id} className="vosAvisSection">
              <div className="vosAvisCommentaire">
                <p> user :{item.user}</p>
                <p> Nom de la recette : {item.recetteTest}</p>
                <p>Commentaire: {item.commentaire}</p>
              </div>
            </div>
          ))}
          <img
            src={cookiechoco}
            alt="cookie"
            height={200}
            width={200}
            className="vosAvisImg"
          />
        </div>
        {/* FORMULAIRE AVIS */}
        
        <div className="row justify-content-center">
          <div
            className=" avisSection"
            style={{
             
            }}
          >
            <h1 className="avisTitre">Laisser un avis!</h1>

            {isAuthenticated ?(
                 <>
           
            <form
              onSubmit={handleSubmit}
              className="row d-flex justify-content-center m-4"
            >
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="recetteTest">
                  <h3> Recette testée</h3>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="recetteTest"
                  name="recetteTest"
                  placeholder="Recette testée"
                  onChange={handleChange}
                  style={{
                    border: "4px solid var(--marronRouge)",
                    color: "var(--marronRouge)",
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="commentaire">
                  <h3>Commentaire</h3>
                </label>
                <textarea
                  type="text"
                  name="commentaire"
                  id="commentaire"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Votre Commentaire"
                  style={{
                    height: "10rem",
                    border: "4px solid var(--marronRouge)",
                    color: "var(--marronRouge)",
                    marginBottom: "1rem",
                  }}
                ></textarea>
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="image">
                  <h3> Joindre une image</h3>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  name="image"
                  placeholder="Inserez une image"
                  onChange={handleChange}
                  style={{
                    border: "4px solid var(--marronRouge)",
                    color: "var(--marronRouge)",
                  }}
                />
              </div>
              <button
                onSubmit={handleSubmit}
                type="submit"
                className="btnPublier"
              >
                Publier
              </button>
            </form>
         
         </>
             ):(
                <form onSubmit={handleSubmitUser}>
                                <h2>Connectez vous pour rédiger un avis!</h2>

                    {SIGN_FIELDS.map((field, index) => (
                      <div className="input-group flex-nowrap mb-3" key={index}>
                        <span
                          className="input-group-text"
                          id="addon-wrapping"
                          style={{ border: "var(--marronRouge) 2px solid" }}
                        >
                          <i
                            className={field.icon}
                            style={{ color: "var(--marronRouge)" }}
                          ></i>
                        </span>
                        <input
                          type={field.type}
                          className="form-control"
                          placeholder={field.placeholder}
                          aria-label={field.label}
                          name={field.name}
                          aria-describedby="addon-wrapping"
                          onChange={handleChangeUser}
                          style={{ border: "var(--marronRouge) 2px solid" }}
                        />
                      </div>
                    ))}
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn w-100"
                        style={{
                          border: "var(--marronRouge) 2px solid",
                          color: "var(--marronRouge)",
                          marginBottom: "2rem",
                        }}
                      >
                        Je me connecte{" "}
                      </button>
                    </div>
                        <Link
                    to="/register"
                    onClick={() => {
                     
                    }}
                  >
                    Vous n'avez pas de compte ?
                  </Link>
                  </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const descStyles = {};

export default PageRecette;
