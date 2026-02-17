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
    pseudo: {
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
      minLength: 12,
      required: true,
    },
    civilite: {
      type: String,
      enum: ["femme", "homme", "x"],
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"], 
      default: "user", 
    },
     isActive: {
    type: Boolean,
    default: true
  },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true } // crée createdAt et updatedAt automatiquement
);

module.exports = mongoose.model("User", User);
