const mongoose = require("mongoose");

const Avis = mongoose.Schema(
  {
    //qui publie l'avis
  
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
