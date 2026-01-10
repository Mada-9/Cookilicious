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
    nom: String,
    description: String,
    image: String,
  }
]
,

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
        "payée",
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
      type: {
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        adresse: { type: String, required: true },
        complementAddresse: { type: String },
        ville: { type: String, required: true },
        codePostal: { type: String, required: true },
        pays: { type: String, required: true },
      },
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

module.exports = mongoose.model("Commande", commandeSchema);
