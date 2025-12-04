import { useState, useEffect } from "react";
import URL from "../../utils/constant/url";
import axios from "axios"

const PageRecette = () => {
  const [recette, setRecette] = useState([]);

  useEffect(() => {
    getRecette();
  }, []);

  const getRecette = async () => {
    try {
      const { data, status } = await axios.get(URL.GET_ALL_RECETTES);
      console.log(data);
    } catch (error) {}
  };

  return (
    <div>
      <div
        style={{
          height: "20rem",
          backgroundColor: "var(--marronRouge)",
                      color: "var(--marronFonce) #742e1f",

          marginBottom: "3rem",
        }}
      >
        <h1 style={{ fontSize: "5rem", color: "#fff3e4" }}>Ma Page Recette</h1>
        <p
          style={{
            color: "#fff3e4",
            fontSize: "1.5rem",
            textAlign: "left",
            marginTop: "2rem",
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime,
          distinctio, Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Corrupti, fuga.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          height: "23rem",
          backgroundColor: "var(--jaune)",
          borderTop: "var(--marronRouge) 4px solid",
          borderBottom: "var(--marronRouge) 4px solid",
          padding: "2rem",
          marginBottom: "3rem",
          zIndex: "1", //superpositionner l'image
        }}
      >
        <p
          style={{
            color: "var(--marronRouge)",
            fontSize: "2rem",
            width: "70%",
            textAlign: "left",
            lineHeight: "70px",
            margin: "0",
          }}
        >
          Recette: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Assumenda praesentium molestiae harum unde et nihil.
          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{
              width: "15rem",
              height: "5rem",
              backgroundColor: "var(--caramel)",
              color: "var(--creme)",
              width: "9rem",
              alignSelf: "end",
              marginLeft: "4rem",
            }}
          >
            cliquer ici
          </button>
        </p>
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
          <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
            <div
              className="modal-content"
              style={{ color: "var(--marronRouge)", fontSize: "2rem" }}
            >
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Recette Cookie{" "}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ... Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Inventore eligendi optio laborum voluptatibus atque, ipsam
                  rerum maxime voluptas commodi repudiandae nihil nesciunt iure,
                  quisquam architecto fugit eos, deserunt at distinctio. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. In natus
                  non earum, quas aspernatur, vel magni iste maiores labore
                  molestiae iure. Mollitia, ullam dolorem. Quam aspernatur nihil
                  quidem totam eos?
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ backgroundColor: "var(--jaune)" }}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {/* <button type="button" class="btn btn-primary">Understood</button> */}
              </div>
            </div>
          </div>
        </div>

        <img
          src="https://static.wixstatic.com/media/82955a_c48b31b6d3c143829ed3cb6ff83f7d69~mv2.png/v1/crop/x_69,y_0,w_2588,h_2629/fill/w_402,h_344,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/PUFFY%20AVRIL%20(46).png"
          alt="cookiePepiteChocolat"
          width={340}
          height={300}
        />
      </div>

      {/* *************************************************** */}

      <div
        style={{
          height: "23rem",
          backgroundColor: "var(--marronRouge)",
          color: "var(--creme)",
          padding: "2rem",
          marginBottom: "3rem",
        }}
      >
        <p
          style={{
            fontSize: "2rem",
            width: "70%",
            textAlign: "left",
            lineHeight: "70px",
          }}
        >
          Recette: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Assumenda praesentium molestiae harum unde et nihil.
          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{
              width: "15rem",
              height: "5rem",
              backgroundColor: "var(--jaune)",
              color: "var(--creme)",
              width: "9rem",
              alignSelf: "end",
              marginLeft: "4rem",
            }}
          >
            cliquer ici
          </button>
        </p>

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
          <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
            <div
              className="modal-content"
              style={{ color: "var(--marronRouge)", fontSize: "2rem" }}
            >
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Recette Cookie{" "}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ... Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Inventore eligendi optio laborum voluptatibus atque, ipsam
                  rerum maxime voluptas commodi repudiandae nihil nesciunt iure,
                  quisquam architecto fugit eos, deserunt at distinctio. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. In natus
                  non earum, quas aspernatur, vel magni iste maiores labore
                  molestiae iure. Mollitia, ullam dolorem. Quam aspernatur nihil
                  quidem totam eos?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ backgroundColor: "var(--jaune)" }}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {/* <button type="button" class="btn btn-primary">Understood</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ***************************************************** */}

      <div
        style={{
          height: "23rem",
          display: "flex",
          backgroundColor: "var(--jaune)",
          borderTop: "var(--marronRouge) 5px solid",
          borderBottom: "var(--marronRouge) 5px solid",
          padding: "2rem",
          marginBottom: "3rem",
        }}
      >
        <p
          style={{
            fontSize: "2rem",
            width: "70%",
            textAlign: "left",
            lineHeight: "70px",
            margin: "0",
          }}
        >
          Recette cookie aux noix: Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Assumenda praesentium molestiae harum unde et nihil.
          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{
              width: "15rem",
              height: "5rem",
              backgroundColor: "var(--marronClair)",
              color: "var(--creme)",
              width: "9rem",
              alignSelf: "end",
              marginBottom: "0rem",
            }}
          >
            cliquer ici
          </button>
        </p>

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
          <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
            <div
              className="modal-content"
              style={{ color: "var(--marronRouge)", fontSize: "2rem" }}
            >
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Recette Cookie{" "}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  ... Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Inventore eligendi optio laborum voluptatibus atque, ipsam
                  rerum maxime voluptas commodi repudiandae nihil nesciunt iure,
                  quisquam architecto fugit eos, deserunt at distinctio. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. In natus
                  non earum, quas aspernatur, vel magni iste maiores labore
                  molestiae iure. Mollitia, ullam dolorem. Quam aspernatur nihil
                  quidem totam eos?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ backgroundColor: "var(--jaune)" }}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {/* <button type="button" class="btn btn-primary">Understood</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* formulaire uniquement sous connexion */}

      <form
        action="submit"
        style={{ margin: "3rem", display: "flex", gap: "2rem" }}
      >
        Rédiger votre avis
        <input
          type="text"
          placeholder="recette testée"
          style={{
            color: "var(--marronFroid)",
            border: " 4px solid var(--marronFroid)",
          }}
        />
        <input
          type="text"
          placeholder="commentaire"
          style={{
            color: "var(--marronFroid)",
            border: " 4px solid var(--marronFroid)",
          }}
        />
        <button
          style={{
            width: "15rem",
            height: "3rem",
            backgroundColor: "var(--marronFroid)",
            color: "var(--creme)",
            width: "8rem",
          }}
        >
          {" "}
          envoyer
        </button>
      </form>
      {recette}
    </div>
  );
};

export default PageRecette;
