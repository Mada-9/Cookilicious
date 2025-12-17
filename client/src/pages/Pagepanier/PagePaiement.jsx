import React from "react";
import { Link } from "react-router-dom";
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

// -----------------------------
// 🔹 FORMULAIRE DE PAIEMENT
// -----------------------------
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
      >
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword4">Password</label>
            <input
              type="password"
              class="form-control"
              id="inputPassword4"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress2">Address 2</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputCity">City</label>
            <input type="text" class="form-control" id="inputCity" />
          </div>
          <div class="form-group col-md-4">
            <label for="inputState">State</label>
            <select id="inputState" class="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div class="form-group col-md-2">
            <label for="inputZip">Zip</label>
            <input type="text" class="form-control" id="inputZip" />
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
          proceder au paiement{" "}
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
