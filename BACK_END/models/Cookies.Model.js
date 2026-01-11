const mongoose = require('mongoose');

const Cookies = mongoose.Schema(
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
    ingredients: { 
      type: String, 
      required: true, 
    },
     photo: { 
      type: String, 
      required: true, 
    },
    isActive: {
    type: Boolean,
    default: true
  }
  },
  { timestamps: true } // crée createdAt et updatedAt automatiquement
)

module.exports = mongoose.model('Cookies', Cookies)