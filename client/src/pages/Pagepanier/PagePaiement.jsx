import React from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Composant enfant → hooks Stripe ici
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    alert("Paiement simulé ✅");
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Payer</button>
    </form>
  );
};

const PagePaiement = () => {
  return (
    <div style={{ marginTop: "4rem" }}>
      <h1>Paiement sécurisé</h1>
      <nav>
        <Link to="/panier">Panier</Link> / Paiement
      </nav>

      {/* ⚡ Elements englobe le formulaire */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default PagePaiement;
