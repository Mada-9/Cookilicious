import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import axios from "axios";

//CSS

import "./Recette.css";

//images

import cookiegemini from "../../assets/images/Gemini_Generated_Image_jnk9izjnk9izjnk9-Photoroom.png";
import cookiechoco from "../../assets/images/cookiechoco.png";

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
      const { data, status } = await axios.get(URL.GET_ALL_RECETTES);
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
      const { data } = await axios.post(URL.POST_AVIS, formData);
      console.log(data);
    } catch (error) {}
  };

   const getAvis = async() => {

    try {
      const { formData} = await axios.post(URL.POST_AVIS);
      console.log(formData);
    } catch (error) {}
  };

  return (
    <div
      className="raw"
      style={{ borderTop: "var(--marronRouge) 4px solid", padding: "1.5rem", }}
    >
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb my-3">
          <li className="breadcrumb-item  px-3">
            <a href="/" style={{ width: "3rem" }}>
              Home
            </a>
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
        <div style={{ padding: "0rem", marginBottom: "3rem" }}>
          <div className="row d-flex">
            <h2 className=" titreSection col-sm-10 col-md-4 col-lg-5">
              {recette[7]?.titre}
            </h2>
            <p className="pSection col-sm-12  col-md-6 col-lg-6 ">
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
                  <div className=" w-50 w-sm-100 d-flex mt-2">
                    <img
                      className="img-fluid"
                      src={cookiegemini}
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

      {/* 2e recette  */}
      <section>
        <div style={{ padding: "0rem", marginBottom: "3rem" }}>
          <div className="row d-flex">
            <h2 className=" titreSection col-sm-10 col-md-4 col-lg-5" style={{color:"var(--marronFroid)"}}>
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

      {/* SECTION AVIS */}

      <div style={{ borderTop: "3px var(--marronRouge) solid" }}>
        <h2>Avis</h2>
        <p style={{textAlign:'left'}}>
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
