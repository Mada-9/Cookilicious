import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import URL from "../../utils/constant/url";
import { AuthContext } from "../../utils/context/AuthContext";
import { PanierContext } from "../../utils/context/PanierContext";
import { SIGN_FIELDS } from "../../utils/config/FormFields";
import axiosinstance from "../../utils/axios/axiosinstance";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "./PagePaiement.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const CheckoutForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    // Simulation du traitement Stripe (à remplacer par stripe.confirmCardPayment plus tard)
    setTimeout(async () => {
      setLoading(false);
      toast.success("Paiement validé !");
      await onPaymentSuccess(); // <--- C'est ici qu'on appelle handleFinalSuccess
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-3 border rounded mb-3">
        <CardElement />
      </div>
      <button
        className="btn btn-success w-100"
        disabled={!stripe || loading}
        data-bs-dismiss="modal"
      >
        {loading ? "Traitement..." : "Confirmer le paiement"}
      </button>
    </form>
  );
};

// *********************************************************************************************************************

// *********************************************************************************************************************

const PagePaiement = () => {
    const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  // const [panier, setPanier] = useState([]);
  const [formData, setFormData] = useState({});
  const [livraison, setLivraison] = useState({});
  const {
    incremente,
    decremente,
    addPanier,
    removeProduit,
    priceProduitByQuantity,
    totalProduit,
    panier,
    totalPrice,
  } = useContext(PanierContext);

  // useEffect(() => {
  //   setPanier(JSON.parse(localStorage.getItem("panier")) || []);
  // }, []);

  // mettre dans checkform
  const handleFinalSuccess = async () => {
    try {
      // Calcul du total
      const prixTotalCommande = panier.reduce(
        (acc, i) => acc + i.prix * i.quantite,
        0
      );

      const commande = {
        user: user._id,
        // On passe directement l'objet livraison tel quel
        adresse_livraison: {
          nom: livraison.nom,
          prenom: livraison.prenom,
          email: livraison.email,
          adresse: livraison.adresse,
          complementAdresse: livraison.complementAddresse || "",
          ville: livraison.ville,
          pays: livraison.pays,
          codePostal: livraison.CodePostal,
        },
        items: panier.map((i) => ({
          produitId: i._id,
          titre: i.titre, // On l'envoie pour qu'il soit sauvegardé dans la commande
          image: i.photo, // On l'envoie aussi
          prixUnitaire: i.prix,
          quantite: i.quantite,
        })),
        prixTotal: prixTotalCommande,
        paiement: "carte",
      };

      console.log("Envoi de la commande :", commande); // Pour débugger

      const { status } = await axiosinstance.post(URL.POST_COMMANDE, commande);

      if (status === 201 || status === 200) {
        toast.success("Commande réussie !");
        localStorage.removeItem("panier");
        navigate("/paiement/redirect");
      }
    } catch (error) {
      console.error("Détails erreur :", error.response?.data || error.message);
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  // formulaire livraison
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setLivraison((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  // user

  const handleChangeUser = (event) => {
    const { name, value } = event.target;
    setFormData((user) => ({ ...user, [name]: value }));
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="pagePaiement">
      <h2 className="text-center my-4">Finalisation paiement</h2>

      <div className="container py-5">
        <div className="row g-5">
          <div className="col-12 col-lg-7">
            {user ? (
              <div className="border p-4 rounded shadow-sm">
                <h3 className="mb-4 text-center">Détails de livraison</h3>
                <form
                  onSubmit={handleSubmitForm}
                  className="p-2"
                  style={{ color: "var(--jaune)", fontSize: "1rem" }}
                >
                  <label htmlFor="nom" className="form-label">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="nom"
                    id="nom"
                    className="form-control mb-3"
                    placeholder="Votre nom"
                    onChange={handleChangeForm}
                    required
                    style={{ color: "var(--marronRouge)" }}
                  />

                  <label htmlFor="prenom" className="form-label">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    id="prenom"
                    className="form-control mb-3"
                    placeholder="Votre prénom"
                    onChange={handleChangeForm}
                    required
                    style={{ color: "var(--marronRouge)" }}
                  />

                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control mb-3"
                    placeholder="Votre email"
                    onChange={handleChangeForm}
                    required
                    style={{ color: "var(--marronRouge)" }}
                  />

                  <label htmlFor="adresse" className="form-label">
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    id="adresse"
                    className="form-control mb-3"
                    placeholder="Votre adresse postale"
                    onChange={handleChangeForm}
                    required
                    style={{ color: "var(--marronRouge)" }}
                  />
                  <label htmlFor="complementAdresse" className="form-label">
                    Complement d'adresse
                  </label>
                  <input
                    type="text"
                    name="complementAdresse"
                    id="complementAdresse"
                    className="form-control mb-3"
                    placeholder="Etage, bâtiment, résidence, maison,... "
                    onChange={handleChangeForm}
                    required
                    style={{ color: "var(--marronRouge)" }}
                  />

                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="ville" className="form-label">
                        Ville
                      </label>
                      <input
                        type="text"
                        name="ville"
                        id="ville"
                        className="form-control mb-3"
                        placeholder="Paris"
                        onChange={handleChangeForm}
                        required
                        style={{ color: "var(--marronRouge)" }}
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="pays" className="form-label">
                        Pays
                      </label>
                      <select
                        name="pays"
                        id="pays"
                        className="form-select mb-3"
                        onChange={handleChangeForm}
                        required
                        style={{ color: "var(--marronRouge)" }}
                      >
                        <option value="">Choisir...</option>
                        <option value="france">France</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="CodePostal" className="form-label">
                        CP
                      </label>
                      <input
                        type="number"
                        name="CodePostal"
                        id="CodePostal"
                        className="form-control mb-3"
                        placeholder="75014"
                        onChange={handleChangeForm}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 btn-lg mt-4"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Aller au paiement sécurisé
                  </button>
                </form>
              </div>
            ) : (
              /* Ton bloc connexion reste ici */
              <div className="col-md-9 mx-auto  p-5  text-center" style={{border:"1px solid var(--marronRouge)", borderRadius:"5%"}}>
                <h4>Veuillez vous connecter</h4>
                <form onSubmit={handleSubmitUser}>
                  {SIGN_FIELDS.map((field, index) => (
                   <div className="input-group flex-nowrap mb-3 " key={index} style={{marginRight:"5rem"}}>
                      <span className="input-group-text" id="addon-wrapping" style={{ border: "var(--marronRouge) 2px solid" }}>
                        <i className={field.icon} style={{ color: "var(--marronRouge)" }} ></i>
                      </span>
                      <input
                        type={field.type === "password" ? (showPassword ? "text" : "password") : field.type}
                        className="form-control"
                        placeholder={field.placeholder}
                        name={field.name}
                        onChange={handleChangeUser}
                        style={{ border: "var(--marronRouge) 2px solid", borderRight: "none" }}
                      />
                      {field.type === "password" && (
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ border: "var(--marronRouge) 2px solid", borderLeft: "none" }}
                        >
                          <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"} style={{ color: "var(--marronRouge)" }}></i>
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="d-grid">
                    <button className="btn btn-primary w-100">Sign</button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/*  RÉSUMÉ PANIER*/}
          <div
            className="col-12 col-lg-5"
            style={{
              border: "3px solid var(--marronRouge)",
              padding: "2rem",
              height: "fit-content",
              position: "sticky",
              top: "20px",
            }}
          >
            <h3 className="text-center mb-4" style={{ color: "var(--jaune)" }}>
              Détail panier
            </h3>

            {/* BARRE DE SCROLL  */}
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                overflowX: "hidden",
                paddingRight: "10px",
                marginBottom: "20px",
              }}
            >
              {panier.map((produit, index) => (
                <div
                  key={index}
                  className="mapProduit row mb-3 "
                  style={{
                    display: "flex",
                    borderBottom: "1px solid var(--marronRouge",
                    paddingBottom: "10px",
                  }}
                >
                  <div className="col-4">
                    {" "}
                    <p className="">{produit.titre}</p>
                    <img
                      className="img-fluid "
                      src={produit.photo}
                      alt={produit.titre}
                    />
                  </div>
                  <div className="col-4 ">
                    <p className="">Prix: {produit.prix}€</p>
                    <div style={{ alignContent: "center" }}>
                      <p className="">Qté: x{produit.quantite}</p>
                      <Link
                        to="/panier"
                        className="btn "
                        style={{
                          marginRight: "2rem",
                          borderRadius: "20px",
                          border: "1px var(--marronRouge) solid",
                        }}
                      >
                        Modifier
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-top text-center">
              <p>
                Total : {totalPrice} € ({totalProduit()} produits)
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL PAIEMENT */}
      <div
        className="modal"
        id="staticBackdrop"
        data-bs-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Paiement : {panier.reduce((t, i) => t + i.prix * i.quantite, 0)}
                €
              </h5>
            </div>
            <div className="modal-body">
              <Elements stripe={stripePromise}>
                <CheckoutForm onPaymentSuccess={handleFinalSuccess} />
              </Elements>
            </div>{" "}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagePaiement;
