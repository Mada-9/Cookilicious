import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "./PagePaiement.css"; // 👈 styles

// 🔑 Initialisation Stripe (clé publique)
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

    alert("Paiement simulé ✅");
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

// -----------------------------
// 🔹 PAGE PAIEMENT
// -----------------------------
const PagePaiement = () => {
  const [formData, setFormData] = useState([]);

  const handleChange = (e) => {
    // const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handlesubmit form livraison = enregistrement de commande

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const { status, data } = await axiosinstance.post(
        URL.POST_COMMANDE,
        formData
      );
      console.log(formData);
      if (status === 201) {
        console.log("formulaire envoyé !");
        toast.success("Votre produit a été ajouté au panier!");
      }
    } catch (error) {
      console.error("erreur lors de l'envoie du message:", error.message);
    }
  };
  return (
    <div className="paiement-page" style={{ padding: "3rem", gap: "4rem" }}>
      {/* Fil d’Ariane */}
      <nav className="breadcrumb">
        <Link to="/panier">Panier</Link>
        <span> / Paiement</span>
      </nav>
      {/* form livraison */}
      <h2>Formulaire de Livraion</h2>
      <form
        style={{ border: "2px black solid", padding: "2rem", width: "auto" }}
        onSubmit={handleSubmitForm}
      >
        <div class="form-row">
          <label htmlFor="inputNom" className="form-label col-md-6 ">
            Nom
          </label>
          <input
            type="nom"
            className="form-control"
            id="inputNom"
            name="nom"
            autoComplete="nom"
            value={formData.email}
            onChange={handleChange}
            
          />
          <div class="form-group col-md-6">
            <label for="inputPrenom4">Prénom</label>
            <input
              type="prenom"
              class="form-control"
              id="inputPrenom4"
              placeholder="Prenom"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1 rue de Georges Brassens"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress2">Address 2</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Bâtiment, maison, ..."
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputCity">Ville</label>
            <input type="text" class="form-control" id="inputCity" />
          </div>
          <div class="form-group col-md-2">
            <label for="inputZip">Code Postal</label>
            <input type="text" class="form-control" id="inputZip" />
          </div>
          <div class="form-group col-md-4">
            <label for="inputState">Pays</label>
            <select id="inputState" class="form-control">
              <option value > Choose...</option>
              <option >France</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck" />
            <label class="form-check-label" for="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          proceder au paiement
        </button>{" "}
      </form>
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
