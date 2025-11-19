const mongoose = require('mongoose');

const User = mongoose.Schema(
  {
     
  },
  { timestamps: true } // crée createdAt et updatedAt automatiquement
)

module.exports = mongoose.model('User', User)