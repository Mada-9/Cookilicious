import { useState, useEffect } from "react";
import URL from "../../utils/constant/url";
import { Link } from "react-router-dom";
import axiosinstance from "../../utils/axios/axiosinstance";

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

  return (
    <div
      className="raw"
      style={{ borderTop: "var(--marronRouge) 4px solid", padding: "1.5rem" }}
    >
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

      <div className="introRecette raw d-flex">
        <h1 className=" titrePageRecette col-sm-6  col-md-6 col-lg-7">
          Nos Recettes
        </h1>
        <p className=" phraseIntro col-sm-6  col-md-8 col-lg-6">
          Découvrez toutes nos recettes de créations gourmandes des généreuses.{" "}
          <br />
          Des idées simples et rapides à reproduire chez vous, avec le goût
          authentique de nos pâtisseries.
        </p>
      </div>
      {/* ************************************************************************************** */}

      <div className="row" style={{ marginBottom: "3rem" }}>
        <p className=" phraseIntroDeux col-xs-1 col-md-12 col-lg-12 ">
          Laissez-vous inspirer par nos variantes créatives et nos astuces pour
          réussir vos patisseries maison!
        </p>
      </div>
      <section>
        <div style={{ padding: "0rem", marginBottom: "3rem", }}>
          <div className="row d-flex">
             <img
                      className="img-fluid col-sm-10 col-md-4 col-lg-4"
                      src={cookiegemini}
                      alt="cookiePepiteChocolat"
                      width={190}
                      height={190}
                    />
            <div className="pSection col-sm-10 col-md-4 col-lg-7 ">
              {" "}
              <h2 className=" titreSection ">
                {recette[7]?.titre}
              </h2>
              {recette[7]?.description}
              {/* <!-- Button trigger modal --> */}
              <button
                type="button"
                className=" btn btn-primary col-sm-1  "
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
              </button>{" "}
              <p>Avis:</p>
            </div>
           
          </div>

          {/* <!-- Modal --> */}
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
              className="modal-dialog  modal-dialog-centered modal-dialog row "
              style={{ maxWidth: "90%", height: "auto", padding: "3rem" }}
            >
              <div
                className="modal-content"
                style={{ color: "var(--marronRouge)", fontSize: "1.2rem" }}
              >
                <div className="modal-header ">
                  <h1 className="modal-title " id="staticBackdropLabel">
                    {recette[7]?.titre}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body" style={{ textAlign: "justify" }}>
                  <h2 style={styles.titrePreparation}>
                    {recette[7]?.nbPersonne}
                  </h2>
                  <h2 style={styles.titrePreparation}>Ingrédients:</h2>
                  <p>{recette[7]?.ingredients}</p>
                  <h2 style={styles.titrePreparation}>Préparation: </h2>
                  <p>{recette[7]?.preparation}</p>
                  <h2 style={styles.titrePreparation}>Astuce: </h2>
                  <p>{recette[7]?.astuce}</p>
                 
                </div>
                <button
                  type="button"
                  className="btn btn-primary col-xs-5 col-md-3 "
                  data-bs-dismiss="modal"
                  style={{
                    backgroundColor: "var(--jaune)",
                    alignSelf: "end",
                    margin: "1rem",
                  }}
                >
                  Close
                </button>
                {/* <button type="button" class="btn btn-primary">Understood</button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2e recette  */}
      <section>
        <div style={{ padding: "0rem", marginBottom: "3rem" }}>
          <div className="row d-flex">
            <h2
              className=" titreSection col-sm-10 col-md-4 col-lg-5"
              style={{ color: "var(--marronFroid)" }}
            >
              {recette[8]?.titre}
            </h2>
            <p className="pSection col-sm-12  col-md-6 col-lg-6 ">
              {recette[8]?.description}
              {/* <!-- Button trigger modal --> */}
              <button
                type="button"
                className=" btn btn-primary col-sm-1  "
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
              </button>{" "}
            </p>
          </div>

          {/* <!-- Modal --> */}
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
              className="modal-dialog  modal-dialog-centered modal-dialog row "
              style={{ maxWidth: "90%", height: "auto", padding: "3rem" }}
            >
              <div
                className="modal-content"
                style={{ color: "var(--marronRouge)", fontSize: "1.2rem" }}
              >
                <div className="modal-header ">
                  <h1 className="modal-title " id="staticBackdropLabel">
                    {recette[8]?.titre}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body" style={{ textAlign: "justify" }}>
                  <h2 style={styles.titrePreparation}>
                    {recette[8]?.nbPersonne}
                  </h2>
                  <h2 style={styles.titrePreparation}>Ingrédients:</h2>
                  <p>{recette[8]?.ingredients}</p>
                  <h2 style={styles.titrePreparation}>Préparation: </h2>
                  <p>{recette[8]?.preparation}</p>
                  <h2 style={styles.titrePreparation}>Astuce: </h2>
                  <p>{recette[8]?.astuce}</p>
                  <div className=" w-50 w-sm-100 d-flex mt-2">
                    <img
                      className="img-fluid"
                      src={cookiechoco}
                      alt="cookiePepiteChocolat"
                      width={300}
                      height={300}
                    />
                    <p className="align-self-center">AVIS:</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary col-xs-5 col-md-3 "
                  data-bs-dismiss="modal"
                  style={{
                    backgroundColor: "var(--jaune)",
                    alignSelf: "end",
                    margin: "1rem",
                  }}
                >
                  Close
                </button>
                {/* <button type="button" class="btn btn-primary">Understood</button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3e recette */}
      <section>
        <div style={{ padding: "0rem", marginBottom: "3rem" }}>
          <div className="row d-flex">
            <h2
              className=" titreSection col-sm-10 col-md-4 col-lg-5"
              style={{ color: "var(--marronFroid)" }}
            >
              {recette[8]?.titre}
            </h2>
            <p className="pSection col-sm-12  col-md-6 col-lg-6 ">
              {recette[8]?.description}
              {/* <!-- Button trigger modal --> */}
              <button
                type="button"
                className=" btn btn-primary col-sm-1  "
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
              </button>{" "}
            </p>
          </div>

          {/* <!-- Modal --> */}
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
              className="modal-dialog  modal-dialog-centered modal-dialog row "
              style={{ maxWidth: "90%", height: "auto", padding: "3rem" }}
            >
              <div
                className="modal-content"
                style={{ color: "var(--marronRouge)", fontSize: "1.2rem" }}
              >
                <div className="modal-header ">
                  <h1 className="modal-title " id="staticBackdropLabel">
                    {recette[8]?.titre}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body" style={{ textAlign: "justify" }}>
                  <h2 style={styles.titrePreparation}>
                    {recette[8]?.nbPersonne}
                  </h2>
                  <h2 style={styles.titrePreparation}>Ingrédients:</h2>
                  <p>{recette[8]?.ingredients}</p>
                  <h2 style={styles.titrePreparation}>Préparation: </h2>
                  <p>{recette[6]?.preparation}</p>
                  <h2 style={styles.titrePreparation}>Astuce: </h2>
                  <p>{recette[6]?.astuce}</p>
                  <div className=" w-50 w-sm-100 d-flex mt-2">
                    <img
                      className="img-fluid"
                      src={cookiechoco}
                      alt="cookiePepiteChocolat"
                      width={300}
                      height={300}
                    />
                    <p className="align-self-center">AVIS:</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary col-xs-5 col-md-3 "
                  data-bs-dismiss="modal"
                  style={{
                    backgroundColor: "var(--jaune)",
                    alignSelf: "end",
                    margin: "1rem",
                  }}
                >
                  Close
                </button>
                {/* <button type="button" class="btn btn-primary">Understood</button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION AVIS */}

      <div
        className="sectionAvis"
        style={{ borderTop: "6px var(--marronRouge) solid" }}
      >
        <h2>Avis</h2>
        <p style={{ textAlign: "left" }}>
          <br />
          exemple avis :
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
            fontSize: "1.8rem",
            borderTop: "6px var(--marronRouge) solid",
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


// ********************************************

// import { useState, useEffect, useContext, useRef } from "react";
// import URL from "../../utils/constant/url";
// import { Link } from "react-router-dom";
// import axiosinstance from "../../utils/axios/axiosinstance";
// import { AuthContext } from "../../utils/context/AuthContext";
// import HEADER_LINKS from "../../utils/config/LinkHeader";
// import { SIGN_FIELDS } from "../../utils/config/FormFields";

// //ANIMATION
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// //CSS
// import "./Recette.css";

// //images
// import cookiegemini from "../../assets/images/Gemini_Generated_Image_jnk9izjnk9izjnk9-Photoroom.png";
// import cookiechoco from "../../assets/images/Cookiechoco.png";

// const PageRecette = () => {
//   const [recette, setRecette] = useState([]);
//   const [formData, setFormData] = useState([]);
//   const [avis, setAvis] = useState([]);

//   // connexion
//   const { user } = useContext(AuthContext);
//   const isAuthenticated = user;
//   const role = user?.role;
//   const { login } = useContext(AuthContext);
//   const [formDataUser, setFormDataUser] = useState({});

//   const visibleRecette = HEADER_LINKS.filter((link) => {
//     if (!isAuthenticated) return false;
//     if (link.auth === role) return true;
//   });

//   useEffect(() => {
//     getAllRecettes();
//   }, []);

//   const getAllRecettes = async () => {
//     try {
//       const { data, status } = await axiosinstance.get(URL.GET_ALL_RECETTES);
//       if (status === 200) setRecette(data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   // FORMULAIRE AVIS
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axiosinstance.post(URL.POST_AVIS, formData);
//       console.log(data);
//     } catch (error) {}
//   };

//   const getAvis = async () => {
//     try {
//       const { formData } = await axiosinstance.post(URL.POST_AVIS);
//       console.log(formData);
//     } catch (error) {}
//   };

//   // Connexion user
//   const handleChangeUser = (event) => {
//     const { name, value } = event.target;
//     setFormDataUser((user) => ({ ...user, [name]: value }));
//   };

//   const handleSubmitUser = async (e) => {
//     e.preventDefault();
//     await login(formDataUser);
//   };

//   // ANIMATION
//   // REFS pour l'animation scroll vertical
//   const wrapperRef = useRef(null);
//   const contentRef = useRef(null);
//   const titleRef = useRef(null);

//   useEffect(() => {
//     const wrapper = wrapperRef.current;
//     const content = contentRef.current;
//     const title = titleRef.current;

//     if (!wrapper || !content) return;

//     // Calculer la distance totale de scroll vertical
//     const getScrollAmount = () => {
//       const contentHeight = content.scrollHeight;
//       const viewportHeight = window.innerHeight;
//       return -(contentHeight - viewportHeight);
//     };

//     // Animation principale : scroll vertical du contenu
//     const verticalScroll = gsap.to(content, {
//       y: getScrollAmount,
//       ease: "none",
//       scrollTrigger: {
//         trigger: wrapper,
//         start: "top top",
//         end: () => `+=${content.scrollHeight * 1.5}`,
//         pin: true,
//         scrub: 1,
//         invalidateOnRefresh: true,
//         anticipatePin: 1,
//       },
//     });

//     // Animation des cartes de recettes individuelles
//     const recipeCards = content.querySelectorAll(".recetteContent");
//     recipeCards.forEach((card) => {
//       gsap.fromTo(
//         card,
//         {
//           scale: 0.85,
//         },
//         {
//           scale: 1,
//           scrollTrigger: {
//             trigger: card,
//             containerAnimation: verticalScroll,
//             start: "top bottom",
//             end: "center center",
//             scrub: 1,
//           },
//         }
//       );
//     });

//     // Animation du titre fixe (apparition)
//     gsap.fromTo(
//       title,
//       {
//         opacity: 0,
//         x: -50,
//       },
//       {
//         opacity: 1,
//         x: 0,
//         scrollTrigger: {
//           trigger: wrapper,
//           start: "top center",
//           end: "top top",
//           scrub: 1,
//         },
//       }
//     );

//     // Cleanup
//     return () => {
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, [recette]); // Recalculer quand les recettes sont chargées

//   return (
//     <div className="" style={{ marginTop: "3rem" }}>
//       <h1 className="titrePageRecette">
//         Nos <br />
//         Recettes
//       </h1>
//       <nav aria-label="breadcrumb">
//         <ol className="breadcrumb my-3">
//           <li className="breadcrumb-item px-3">
//             <Link to="/" style={{ width: "3rem" }}>
//               Home
//             </Link>
//           </li>
//           <li className="breadcrumb-item" aria-current="page">
//             Recettes
//           </li>
//         </ol>
//       </nav>

//       <div style={{ padding: "1.5rem" }}>
//         <p className="phraseIntro col-sm-6 col-md-8 col-lg-6"></p>

//         <div className="row" style={{ marginBottom: "3rem" }}>
//           <p
//             className="phraseIntroDeux col-xs-1 col-md-12 col-lg-12"
//             style={{ marginBottom: "3rem", fontSize: "1.4rem" }}
//           >
//             Laissez-vous inspirer par nos variantes créatives, gourmandes et
//             généreuses. Des idées simples et rapides à reproduire chez vous,
//             avec le goût authentique de nos pâtisseries.
//           </p>
//         </div>

//         {/* SECTION AVEC SCROLL VERTICAL */}
//         <section
//           className="homeRecipesWrapper"
//           ref={wrapperRef}
//           style={{
//             height: "100vh",
//             position: "relative",
//             overflow: "hidden",
//             marginBottom: "4rem",
//           }}
//         >
//           {/* Titre fixe */}
//           <h2
//             className="titreAnimRecette"
//             ref={titleRef}
//             style={{
//               position: "absolute",
//               left: "5vw",
//               top: "50%",
//               transform: "translateY(-50%)",
//               zIndex: 10,
//               fontSize: "clamp(2.5rem, 6vw, 5rem)",
//               lineHeight: "1.1",
//               maxWidth: "400px",
//             }}
//           >
//             Testez <br /> nos <br /> recettes
//           </h2>

//           {/* Contenu qui défile verticalement */}
//           <div
//             className="animRecette"
//             ref={contentRef}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               paddingTop: "10vh",
//               paddingLeft: "35vw", // Espace pour le titre fixe
//               justifyContent: "start",
//             }}
//           >
//             {/* Vous pouvez mapper vos recettes ici */}
//             <div className="recetteContent" style={cardStyles}>
//               {/* <div style={numberStyles}>01</div> */}
//               <h3 style={titleCardStyles}> {recette[8]?.titre}</h3>
//               <p style={descStyles}>
//                 Testez nos recettes gourmandes {recette[8]?.description}
//               </p>
//               <button
//                 type="button"
//                 className="btn btn-primary col-sm-1"
//                 data-bs-toggle="modal"
//                 data-bs-target="#staticBackdrop"
//                 style={{
//                   height: "2rem",
//                   marginLeft: "1rem",
//                   backgroundColor: "var(--caramel)",
//                   color: "var(--creme)",
//                   width: "9rem",
//                   alignContent: "center",
//                 }}
//               >
//                 Voir recette
//               </button>
//             </div>

//             <div className="recetteContent" style={cardStyles}>
//               <h3 style={titleCardStyles}>Recette 2</h3>
//               <p style={descStyles}>Des recettes testées et approuvées!</p>
//             </div>

//             <div className="recetteContent" style={cardStyles}>
//               <h3 style={titleCardStyles}>Recette 5 {recette[7]?.titre} </h3>
//               <p style={{marginBottom:"16rem"}}>
//                 Une dernière recette pour le scroll {recette[7]?.description}
//               </p>
//             </div>

//             {/* OU mapper vos vraies recettes depuis la BDD : */}
//             {/* {recette.slice(0, 5).map((r, index) => (
//               <div key={r.id} className="recetteContent" style={cardStyles}>
//                 <div style={numberStyles}>{String(index + 1).padStart(2, '0')}</div>
//                 <h3 style={titleCardStyles}>{r.titre}</h3>
//                 <p style={descStyles}>{r.description}</p>
//               </div>
//             ))} */}
//           </div>
//         </section>

//         {/* Modal premiere recette */}
//         <div
//           className="modal fade"
//           id="staticBackdrop"
//           tabIndex="-1"
//           aria-hidden="true"
//         >
//           <div
//             className="modal-dialog modal-dialog-centered modal-dialog row"
//             style={{ maxWidth: "90%", height: "auto", padding: "3rem" }}
//           >
//             <div
//               className="modal-content"
//               style={{ color: "var(--marronRouge)" }}
//             >
//               {isAuthenticated ? (
//                 <>
//                   <div className="modal-header">
//                     <h2 className="modal-title" id="staticBackdropLabel">
//                       {recette[8]?.titre}
//                     </h2>
//                     <button
//                       type="button"
//                       className="btn-close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                     ></button>
//                   </div>
//                   <div className="modal-body" style={{ textAlign: "justify" }}>
//                     <h2 className="titrePreparation">
//                       {recette[8]?.nbPersonne}
//                     </h2>
//                     <h2 className="titrePreparation">Ingrédients:</h2>
//                     <p>{recette[8]?.ingredients}</p>
//                     <h2 className="titrePreparation">Préparation:</h2>
//                     <p>{recette[8]?.preparation}</p>
//                     <h2 className="titrePreparation">Astuce:</h2>
//                     <p>{recette[8]?.astuce}</p>
//                   </div>
//                 </>
//               ) : (
//                 <div className="modal-body">
//                   <p>Veuillez vous connecter pour découvrir la recette 😉 </p>
//                   <h1 className="text-center mb-4">Sign</h1>
//                   <form onSubmit={handleSubmitUser}>
//                     {SIGN_FIELDS.map((field, index) => (
//                       <div className="input-group flex-nowrap mb-3" key={index}>
//                         <span
//                           className="input-group-text"
//                           id="addon-wrapping"
//                           style={{ border: "var(--marronRouge) 2px solid" }}
//                         >
//                           <i
//                             className={field.icon}
//                             style={{ color: "var(--marronRouge)" }}
//                           ></i>
//                         </span>
//                         <input
//                           type={field.type}
//                           className="form-control"
//                           placeholder={field.placeholder}
//                           aria-label={field.label}
//                           name={field.name}
//                           aria-describedby="addon-wrapping"
//                           onChange={handleChangeUser}
//                           style={{ border: "var(--marronRouge) 2px solid" }}
//                         />
//                       </div>
//                     ))}
//                     <div className="d-grid">
//                       <button
//                         type="submit"
//                         className="btn w-100"
//                         style={{
//                           border: "var(--marronRouge) 2px solid",
//                           color: "var(--marronRouge)",
//                           marginBottom: "2rem",
//                         }}
//                       >
//                         Je me connecte{" "}
//                       </button>
//                     </div>
//                   </form>
//                   <Link
//                     to="/register"
//                     onClick={() => {
//                       const modal = document.getElementById("staticBackdrop");
//                       const backdrop =
//                         document.querySelector(".modal-backdrop");

//                       if (modal) modal.classList.remove("show");
//                       if (backdrop) backdrop.remove();
//                       document.body.classList.remove("modal-open");
//                     }}
//                   >
//                     Vous n'avez pas de compte ?
//                   </Link>
//                 </div>
//               )}
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-primary col-xs-5 col-md-3"
//                   data-bs-dismiss="modal"
//                   style={{
//                     backgroundColor: "var(--jaune)",
//                     alignSelf: "end",
//                   }}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RESTE DU CONTENU */}
//         <section>
//           <div style={{ paddingTop: "2rem", marginBottom: "3rem" }}>
//             <div className="row d-flex">
//               <h2 className="titreSection col-sm-10 col-md-4 col-lg-5">
//                 {recette[7]?.titre}
//               </h2>
//               <p className="pSection col-sm-12 col-md-6 col-lg-6">
//                 {recette[7]?.description}
//                 <button
//                   type="button"
//                   className="btn btn-primary col-sm-1"
//                   data-bs-toggle="modal"
//                   data-bs-target="#staticBackdrop"
//                   style={{
//                     height: "2rem",
//                     marginLeft: "1rem",
//                     backgroundColor: "var(--caramel)",
//                     color: "var(--creme)",
//                     width: "9rem",
//                     alignContent: "center",
//                   }}
//                 >
//                   Voir recette
//                 </button>
//               </p>
//             </div>

//             {/* Modal */}
//             <div
//               className="modal fade"
//               id="staticBackdrop"
//               tabIndex="-1"
//               aria-hidden="true"
//             >
//               <div
//                 className="modal-dialog modal-dialog-centered modal-dialog row"
//                 style={{ maxWidth: "90%", height: "auto", padding: "3rem" }}
//               >
//                 <div
//                   className="modal-content"
//                   style={{ color: "var(--marronRouge)" }}
//                 >
//                   {isAuthenticated ? (
//                     <>
//                       <div className="modal-header">
//                         <h2 className="modal-title" id="staticBackdropLabel">
//                           {recette[7]?.titre}
//                         </h2>
//                         <button
//                           type="button"
//                           className="btn-close"
//                           data-bs-dismiss="modal"
//                           aria-label="Close"
//                         ></button>
//                       </div>
//                       <div
//                         className="modal-body"
//                         style={{ textAlign: "justify" }}
//                       >
//                         <h2 className="titrePreparation">
//                           {recette[7]?.nbPersonne}
//                         </h2>
//                         <h2 className="titrePreparation">Ingrédients:</h2>
//                         <p>{recette[7]?.ingredients}</p>
//                         <h2 className="titrePreparation">Préparation:</h2>
//                         <p>{recette[7]?.preparation}</p>
//                         <h2 className="titrePreparation">Astuce:</h2>
//                         <p>{recette[7]?.astuce}</p>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="modal-body">
//                       <p>
//                         Veuillez vous connecter pour découvrir la recette 😉{" "}
//                       </p>
//                       <h1 className="text-center mb-4">Sign</h1>
//                       <form onSubmit={handleSubmitUser}>
//                         {SIGN_FIELDS.map((field, index) => (
//                           <div
//                             className="input-group flex-nowrap mb-3"
//                             key={index}
//                           >
//                             <span
//                               className="input-group-text"
//                               id="addon-wrapping"
//                               style={{ border: "var(--marronRouge) 2px solid" }}
//                             >
//                               <i
//                                 className={field.icon}
//                                 style={{ color: "var(--marronRouge)" }}
//                               ></i>
//                             </span>
//                             <input
//                               type={field.type}
//                               className="form-control"
//                               placeholder={field.placeholder}
//                               aria-label={field.label}
//                               name={field.name}
//                               aria-describedby="addon-wrapping"
//                               onChange={handleChangeUser}
//                               style={{ border: "var(--marronRouge) 2px solid" }}
//                             />
//                           </div>
//                         ))}
//                         <div className="d-grid">
//                           <button
//                             type="submit"
//                             className="btn w-100"
//                             style={{
//                               border: "var(--marronRouge) 2px solid",
//                               color: "var(--marronRouge)",
//                               marginBottom: "2rem",
//                             }}
//                           >
//                             Je me connecte{" "}
//                           </button>
//                         </div>
//                       </form>
//                       <Link
//                         to="/register"
//                         onClick={() => {
//                           const modal =
//                             document.getElementById("staticBackdrop");
//                           const backdrop =
//                             document.querySelector(".modal-backdrop");

//                           if (modal) modal.classList.remove("show");
//                           if (backdrop) backdrop.remove();
//                           document.body.classList.remove("modal-open");
//                         }}
//                       >
//                         Vous n'avez pas de compte ?
//                       </Link>
//                     </div>
//                   )}
//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-primary col-xs-5 col-md-3"
//                       data-bs-dismiss="modal"
//                       style={{
//                         backgroundColor: "var(--jaune)",
//                         alignSelf: "end",
//                       }}
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* SECTION AVIS */}
//         <div
//           className="sectionAvis"
//           style={{ borderTop: "3px var(--marronRouge) solid" }}
//         >
//           <h2>Avis</h2>
//           <p style={{ textAlign: "left" }}>
//             <br />
//             exemple avis :
//             <br />
//             <br />
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione sit
//             nulla aliquam perferendis! Labore placeat perspiciatis velit dicta
//             aliquid blanditiis cum, iste maxime odio iure libero quam, suscipit
//             dolor laborum.
//           </p>
//         </div>

//         {/* FORMULAIRE AVIS */}
//         <div className="row justify-content-center">
//           <div
//             className="col-12 col-md-12 py-4"
//             style={{
//               fontSize: "1rem",
//               borderTop: "3px var(--marronRouge) solid",
//               alignItems: "center",
//             }}
//           >
//             <h1>Laisser un avis!</h1>
//             <form
//               onSubmit={handleSubmit}
//               className="row d-flex justify-content-center m-4"
//             >
//               <div className="form-group col-md-6 mb-3">
//                 <label htmlFor="inputRecette" onChange={handleChange}>
//                   Recette testée
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="inputRecette"
//                   placeholder="Recette testée"
//                   style={{
//                     border: "4px solid var(--marronRouge)",
//                     color: "var(--marronRouge)",
//                   }}
//                 />
//               </div>
//               <div className="form-group col-md-6">
//                 <label htmlFor="commentaire" onChange={handleChange}>
//                   Commentaire
//                 </label>
//                 <textarea
//                   type="text"
//                   name="comentaire"
//                   id="commentaire"
//                   className="form-control"
//                   placeholder="Votre Commentaire"
//                   style={{
//                     height: "10rem",
//                     border: "4px solid var(--marronRouge)",
//                     color: "var(--marronRouge)",
//                     marginBottom: "2rem",
//                   }}
//                 ></textarea>
//               </div>
//               <div className="">
//                 <button
//                   onSubmit={handleSubmit}
//                   type="submit"
//                   className="btn btn-primary px-5"
//                 >
//                   Publier
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Styles pour les cartes de recettes (vertical scrolling)
// const cardStyles = {
//   minHeight: "400px",
//   width: "45rem",
//   flexDirection: "column",
//   cursor: "pointer",
//   flexShrink: 0,
//   textAlign: "justify",
// };

// const numberStyles = {
//   fontSize: "4rem",
//   fontWeight: "bold",
//   color: "var(--caramel)",
//   marginBottom: "1rem",
//   lineHeight: 1,
// };

// const titleCardStyles = {
//   fontSize: "1.8rem",
//   marginBottom: "1rem",
//   fontWeight: "600",
// };

// const descStyles = {
 
  
// };

// export default PageRecette;
