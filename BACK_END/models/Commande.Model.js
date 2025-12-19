const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema(
  {
    // Qui a passé la commande
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

module.exports = mongoose.model("Commande", commandeSchema);
