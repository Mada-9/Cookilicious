const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema(
  {
    // Qui a passé la commande
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Produits commandés
    items: [
      {
        produit: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Produit",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        prixUnitaire: {
          type: Number,
          required: true,
        },
      },
    ],

    // Prix total de la commande
    prixTotal: {
      type: Number,
      required: true,
    },

    // Statut de la commande
    statut: {
      type: String,
      enum: [
        "commande_validée",
        "en_attente",
        "payee",
        "expediee",
        "livree",
        "annulee",
      ],
      default: "commande_validée",
    },

    // Moyen de paiement
    paiement: {
      type: String,
      enum: ["carte"],
      required: true,
    },

    // Adresse de livraison
    adresse_livraison: {
      nom: String,
      prenom: String,
      adresse: String,
      complementAddresse:String,
      ville: String,
      code_postal: String,
      pays: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

module.exports = mongoose.model("Commande", commandeSchema);
