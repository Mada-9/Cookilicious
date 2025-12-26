import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import URL from "../../utils/constant/url";
import { AuthContext } from "../../utils/context/AuthContext";
import { PanierContext } from "../../utils/context/PanierContext";
import HEADER_LINKS from "../../utils/config/LinkHeader";
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

// Initialisation Stripe (clé publique)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// FORMULAIRE DE PAIEMENT
const CheckoutForm = () => {
  const stripe = useStripe(); // instance Stripe
  const elements = useElements(); // éléments Stripe

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Sécurité : Stripe pas encore chargé
    if (!stripe || !elements) return;

    // Ici viendra plus tard le vrai paiement

    alert("Paiement simulé ");
    toast.success("Paiement validé!");
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      {/* Champ carte bancaire Stripe */}
      <div className="card-element-wrapper">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#3a1f1f",
                "::placeholder": {
                  color: "#9c7c7c",
                },
              },
              invalid: {
                color: "#c0392b",
              },
            },
          }}
        />
      </div>

      {/* Bouton paiement */}
      <button className="pay-button" type="submit" disabled={!stripe}>
        Payer
      </button>
    </form>
  );
};

//  PAGE PAIEMENT
const PagePaiement = () => {
  const [formData, setFormData] = useState([]);
  const [formDataUser, setFormDataUser] = useState([]);
  const [panier, setPanier] = useState([]);
  const { user } = useContext(AuthContext);
  const isAuthenticated = user;
  const role = user?.role;
  const { login } = useContext(AuthContext);

  // CONNEXION

  const visibleform = HEADER_LINKS.filter((link) => {
    if (!isAuthenticated) return false; // pas connecté → pas d'accès
    if (link.auth === role) return true; // rôle correspondant
  });

  // Connexion user

  const handleChangeUser = (event) => {
    const { name, value } = event.target;
    setFormDataUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    await login(formDataUser);
  };

  // CREATION DE COMMANDE LORS DU PAIEMENT

  useEffect(() => {
    const storedPanier = JSON.parse(localStorage.getItem("panier")) || [];
    setPanier(storedPanier);
  }, []);

  const postCommande = async () => {
    try {
      const items = panier.map((item) => ({
        produit: item._id,
        quantity: item.quantite,
        prixUnitaire: item.prix,
        nom: item.nom,
        description: item.description,
        image: item.image,
      }));

      const prixTotal = items.reduce(
        (total, item) => total + item.quantity * item.prixUnitaire,
        0
      );

      const commandeData = {
        user: user._id,
        items, // items avec détail
        prixTotal,
        paiement: "carte",
        adresse_livraison: {
          nom: formData.nom,
          prenom: formData.prenom,
          adresse: formData.adresse,
          complementAddresse: formData.complementAddresse,
          ville: formData.ville,
          codePostal: formData.codePostal,
          pays: formData.pays,
        },
      };

      const { data } = await axiosinstance.post(
        URL.POST_COMMANDE,
        commandeData
      );

      toast.success("Commande créée avec succès 🎉");
      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création de la commande");
    }
  };

  const handleChange = (e) => {
    // const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handlesubmit form livraison = enregistrement de commande

  return (
    <div className="paiement-page" style={{ padding: "3rem", gap: "4rem" }}>
      {/* Fil d’Ariane */}
      <nav className="breadcrumb">
        <Link to="/panier">Panier</Link>
        <span> / Paiement</span>
      </nav>
      {isAuthenticated ? (
        <>
          {/* form livraison */}
          <h2>Formulaire de Livraion</h2>

          <form
            style={{
              border: "2px solid black",
              padding: "2rem",
              width: "100%",
              maxWidth: "600px",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              postCommande();
            }}
          >
            {/* NOM / PRÉNOM */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Nom</label>
                <input
                  type="text"
                  name="nom"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* EMAIL (optionnel pour la commande) */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="email@example.com"
                onChange={handleChange}
              />
            </div>

            {/* ADRESSE */}
            <div className="mb-3">
              <label className="form-label">Adresse</label>
              <input
                type="text"
                name="adresse"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>

            {/* COMPLÉMENT */}
            <div className="mb-3">
              <label className="form-label">Complément d’adresse</label>
              <input
                type="text"
                name="complementAddresse"
                className="form-control"
                placeholder="Bâtiment, étage, etc."
                onChange={handleChange}
              />
            </div>

            {/* VILLE / CODE POSTAL / PAYS */}
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Ville</label>
                <input
                  type="text"
                  name="ville"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Code postal</label>
                <input
                  type="text"
                  name="codePostal"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Pays</label>
                <select
                  name="pays"
                  className="form-control"
                  required
                  onChange={handleChange}
                >
                  <option value="">Choisir…</option>
                  <option value="France">France</option>
                </select>
              </div>
            </div>

            {/* BOUTON */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Procéder au paiement
            </button>
          </form>
        </>
      ) : (
        <>
          {" "}
          <h2 className="text-center mb-4">
            {" "}
            Connectez vous pour proceder au paiement
          </h2>
          <form onSubmit={handleSubmitUser}>
            {SIGN_FIELDS.map((field, index) => (
              <div className="input-group flex-nowrap mb-3" key={index}>
                <span
                  className="input-group-text"
                  id="addon-wrapping"
                  style={{
                    border: "var(--marronRouge) 2px solid",
                  }}
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
                  style={{
                    border: "var(--marronRouge) 2px solid",
                  }}
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
                onClick={() => {
                  document.body.classList.remove("modal-open");
                }}
              >
                Je me connecte
              </button>
            </div>
          </form>{" "}
        </>
      )}
      {/* carte paiement  */}
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
          style={{ height: "auto", padding: "3rem" }}
        >
          <div
            className="modal-content"
            style={{ color: "var(--marronRouge)" }}
          >
            <>
              <div className="modal-header">
                <h1 className="modal-title" id="staticBackdropLabel"></h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" style={{ textAlign: "justify" }}>
                {" "}
                {/* Carte paiement */}
                <div
                  className="paiement-card"
                  style={{
                    border: "2px solid black",
                    width: "20rem",
                    height: "10rem",
                    justifySelf: "right",
                  }}
                >
                  <h2>Paiement sécurisé</h2>

                  {/* Stripe Elements doit englober le formulaire */}
                  <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                  {/* paiement validé = envoie d'émail de confirmation avec recap panier */}
                </div>
              </div>
            </>
            <div className="modal-body">
              {/* Footer commun */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary col-xs-5 col-md-3"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default PagePaiement;
