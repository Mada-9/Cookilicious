const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        produitId: { type: String, required: true },
        titre: { type: String, required: true },
        image: { type: String },
        quantite: { type: Number, required: true },
        prixUnitaire: { type: Number, required: true },
        description: String,
      },
    ],
    prixTotal: {
      type: Number,
      required: true,
    },
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

    paiement: {
      type: String,
      enum: ["carte"],
      required: true,
    },

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
    timestamps: true, 
  }
);

module.exports = mongoose.model("Commande", commandeSchema);
