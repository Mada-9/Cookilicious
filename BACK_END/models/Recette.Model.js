const mongoose = require("mongoose");

const Recette = mongoose.Schema(
    {
      

        titre: { 
          type: String, 
          required: true, 
        },
        description: {
          type: String,
          required:true
        },
        image: { 
          type: String, 
          required: false, 
        },
        nbPersonne:{
            type: String,
            required: false
        },
        ingredients: {
            type: String,
            required:true
        },
        preparation:{
            type: String,
            required: true
        },
        astuce:{
          type:String,
          required:false
          
        },
        isActive: {
    type: Boolean,
    default: true
  }
      },
      { timestamps: true } // crée createdAt et updatedAt automatiquement
    )
    
    module.exports = mongoose.model('Recette', Recette)

