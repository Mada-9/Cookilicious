const mongoose = require('mongoose');

const Contact = mongoose.Schema(
  { // objet formulaire
    email: { 
      type: String, 
      required: true, 
    },
     message: { 
      type: String, 
      required: true, 
    },
  },
  { timestamps: true } // crée createdAt et updatedAt automatiquement
)

module.exports = mongoose.model('Contact', Contact)