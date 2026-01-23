import { useState, useEffect, useContext, useRef } from "react";
import URL from "../../utils/constant/url";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useScroll, useTransform } from "framer-motion";
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
import cookie from "../../assets/images/cookiebananepecan.webp";
import cookiebananepecan from "../../assets/images/cookiebananepecan.webp";
import cookiedough from "../../assets/images/cookiedough.webp";

const PageRecette = () => {
  const navigate = useNavigate();
  const [recette, setRecette] = useState([]);
  const [avis, setAvis] = useState([]);
  const { scrollY } = useScroll();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRecette, setSelectedRecette] = useState(null);

  // connexion
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    user: user?._id || "", // On stocke l'ID de l'user connecté
    recetteTest: "",
    commentaire: "",
    image: "",
  });

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
      if (status === 200) {
        const recetteActifs = data.filter((item) => item.isActive === true);
        setRecette(recetteActifs);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // FORMULAIRE AVIS

  useEffect(() => {
    if (user?._id) {
      setFormData((prev) => ({ ...prev, user: user._id }));
    }
  }, [user]);

  const handleChange = (e) => {
    // const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("FormData envoyé :", formData);

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
      if (status === 200) {
        const avisActifs = data.filter((item) => item.isActive === true);
        setAvis(avisActifs);
      }
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

  // 1. Déclare la ref en haut de ton composant
  const scrollRef = useRef(null);

  // 2. Fonction pour faire défiler de la largeur d'une carte (ex: 340px)
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      if (direction === "left") {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  //pour le header

  useEffect(() => {
    // Ajoute la classe au body quand on arrive sur la page
    document.body.classList.add("bg-recette-global");

    // Retire la classe quand on quitte la page
    return () => {
      document.body.classList.remove("bg-recette-global");
    };
  }, []);

  // MODAL RECETTE
  const openModal = (recetteItem) => {
    setSelectedRecette(recetteItem);
  };
  return (
    <div className="pageRecette">
      <div className="header-recette-background">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb pt-3">
            {" "}
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

        <div className="titre">
          <h1 className="titrePageRecette px-4">
            Lancez-vous <br /> en cuisine
          </h1>
          <h2 className="titrePageRecetteh2 px-4">
            et testez nos meilleures recettes
          </h2>
        </div>
      </div>

      <div>
        <div className="horizontalTitle">
          <h2>Amusez-vous & pâtissez</h2>
        </div>
        <p className=" intro col-sm-6 col-md-8 col-lg-12 px-5 mt-5 pb-5">
          Laissez-vous inspirer par nos variantes créatives, gourmandes et
          généreuses. Des idées simples et rapides à reproduire chez vous, avec
          le goût authentique de nos pâtisseries. <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis,
          doloribus laboriosam quas iste aut magni!
        </p>
        <section className="recipesContainerHorizontal">
          <div className="horizontalScrollWrapper">
            {recette.map((item) => (
              <div key={item._id} className="recetteCard">
                <div className="recetteCardBadge">Recette</div>
                <div className="recetteCardBody">
                  <h3 className="titreRecetteCard">{item.titre}</h3>
                  <p className="descRecetteCard">
                    <img src={item.image} alt="" height={250} width={250} />
                  </p>
                  <button
                    type="button"
                    className="btnVoirRecetteCard"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => openModal(item)}
                  >
                    Découvrir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Modal  */}
        <div
          className="modal fade"
          id="staticBackdrop"
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
                selectedRecette && ( //  AFFICHE LES DONNÉES SI UNE RECETTE EST SÉLECTIONNÉE
                  <>
                    <div className="modal-header">
                      <h2 className="modal-title" id="staticBackdropLabel">
                        {selectedRecette.titre}
                      </h2>
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
                      <h2 className="titrePreparation">
                        {selectedRecette.nbPersonne}
                      </h2>
                      <h2 className="titrePreparation">Ingrédients:</h2>
                      <p>{selectedRecette.ingredients}</p>
                      <h2 className="titrePreparation">Préparation:</h2>
                      <p>{selectedRecette.preparation}</p>
                      <h2 className="titrePreparation">Astuce:</h2>
                      <p>{selectedRecette.astuce}</p>
                    </div>
                  </>
                )
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
                          type={
                            field.type === "password"
                              ? showPassword
                                ? "text"
                                : "password"
                              : field.type
                          }
                          className="form-control"
                          placeholder={field.placeholder}
                          name={field.name}
                          onChange={handleChangeUser}
                          style={{
                            border: "var(--marronRouge) 2px solid",
                            borderRight: "none",
                          }}
                        />
                        {field.type === "password" && (
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              border: "var(--marronRouge) 2px solid",
                              borderLeft: "none",
                            }}
                          >
                            <i
                              className={
                                showPassword ? "bi bi-eye-slash" : "bi bi-eye"
                              }
                              style={{ color: "var(--marronRouge)" }}
                            ></i>
                          </button>
                        )}
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

        <div className="row m-0">
          <div className="col-md-8 d-flex flex-column justify-content-center p-5">
            <h2 style={{ color: "var(--marronRouge)", marginBottom: "3rem" }}>
              Le Stuffed Cookie
            </h2>
            <p>
              Tout a commencé dans une petite cuisine artisanale, avec l'envie
              folle de fusionner le croquant d'un biscuit traditionnel et la
              générosité d'une pâtisserie fourrée. C’est ainsi qu’est né le{" "}
              <strong>Stuffed Cookie</strong> : une création audacieuse venue
              des États-Unis, réinterprétée ici avec passion pour transformer
              chaque bouchée en une véritable explosion de textures.
            </p>{" "}
            <p>
              Le secret de notre gourmandise ? Un cœur <strong>fondant</strong>{" "}
              caché à l'intérieur d'un cookie croustillant. Nutella, caramel ou
              beurre de cacahuète... lequel choisirez-vous ?
            </p>
            <button
              className="btn"
              style={{
                backgroundColor: "var(--jaune)",
                color: "var(--marronRouge)",
                width: "fit-content",
              }}
              onClick={() => navigate("/cookies")}
            >
              Découvrir les articles
            </button>
          </div>

          <div className="col-md-2 text-center p-5">
            <img src={cookie} alt="Stuffed Cookie" />
          </div>
        </div>
        {/* SECTION AVIS */}
        <div
          className="sectionAvis"
          style={{
            borderTop: "3px var(--marronRouge) solid",
            marginBottom: "3rem",
            marginTop: "10rem",
            padding: "3rem",
          }}
        >
          <h2 className="vosAvis">Vos Avis</h2>
          {avis.map((item) => (
            <div key={item._id} className="vosAvisSection">
              <div className="vosAvisCommentaire">
                <p> {item.user?.pseudo || "Utilisateur anonyme"}</p>{" "}
                <p className="text-muted small">
                  Posté le :{" "}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("fr-FR")
                    : "Date inconnue"}
                </p>{" "}
                <p> Nom de la recette : {item.recetteTest}</p>
                <p>Commentaire: {item.commentaire}</p>
              </div>
            </div>
          ))}
          <img
            src={cookie}
            alt="cookie"
            height={200}
            width={200}
            className="vosAvisImg"
          />
        </div>
        {/* FORMULAIRE AVIS */}

        <p className="ligne"></p>

        <div className="row justify-content-center">
          <div className="avisSection" style={{}}>
            <h2 className="avisTitre">Laisser un avis!</h2>

            {isAuthenticated ? (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="row justify-content-center m-4"
                >
                  <div className="form-group col-8 mb-3">
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
                  <div className="form-group col-8">
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
                  <div className="form-group col-8 mb-3">
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
            ) : (
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
                <Link to="/register" onClick={() => {}}>
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
