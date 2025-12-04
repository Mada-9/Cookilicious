const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // minLength: 12,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"], // permet de mettre une contrainte pour specifier ce que l'on veut, choisir une option parmis celles-ci
      default: "user", // par défaut: quand on une personne s'insrit sur le site c'est user par defaut
    },
  },
  { timestamps: true } // crée createdAt et updatedAt automatiquement
);

module.exports = mongoose.model("User", User);
