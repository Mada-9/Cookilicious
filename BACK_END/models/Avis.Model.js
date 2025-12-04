const mongoose = require("mongoose");

const Avis = mongoose.Schema(
  {
    recetteTest: {
      type: String,
      required: true,
    },
    commentaire: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Avis", Avis);
