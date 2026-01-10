const mongoose = require("mongoose");

const Avis = mongoose.Schema(
  {
    //qui publie l'avis
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    recetteTest: {
      type: String,
      required: true,
    },
    commentaire: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Avis", Avis);
