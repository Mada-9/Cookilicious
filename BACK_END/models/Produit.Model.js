const mongoose = require('mongoose');

const Produit = mongoose.Schema(
  {
    titre: { 
      type: String, 
      required: true, 
    },
     prix: { 
      type: Number, 
      required: true, 
    },
     description: { 
      type: String, 
      required: true, 
    },
     photo: { 
      type: String, 
      required: true, 
    },
  },
  { timestamps: true } // crée createdAt et updatedAt automatiquement
)

module.exports = mongoose.model('Produit', Produit)