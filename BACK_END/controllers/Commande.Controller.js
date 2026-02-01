const createError = require("../helpers/CreateError.js");
const CommandeModel = require("../models/Commande.Model.js");

// POST COMMANDE
const post = async (req, res, next) => {
  try {
    const commande = await CommandeModel.create(req.body);
    res.status(201).json(commande);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

// GET COMMANDE
const get = async (req, res, next) => {
  try {
    const commandes = await CommandeModel.find();


    res.status(200).json(commandes);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

// GET BY ID COMMANDE
const getById = async (req, res, next) => {
  try {
    const commande = await CommandeModel.findById(req.params.id)
      .populate("user");

    res.status(200).json(commande);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};


// GET COMMANDES PAR UTILISATEUR 
const getByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Récupère l'ID depuis l'URL

    // Trouve toutes les commandes de cet utilisateur
    const commandes = await CommandeModel.find({ user: userId })
      .sort({ createdAt: -1 }); // Du plus récent au plus ancien

    res.status(200).json(commandes);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};





// DELETE COMMANDE
const deleteById = async (req, res, next) => {
  const commande = await CommandeModel.findByIdAndDelete(req.params.id);
  try {
    if (!commande) {
      return next(createError(404, "Commande not found !"));
    }
    res.status(200).json("Commande deleted ! ");
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};


const updateById = async (req, res, next) => {
  try { 
    const commande = await CommandeModel.findByIdAndUpdate(req.params.id,req.body,{new:true}) //{new:true})= retourne l'element mis à jour et non l'ancien
    if(!commande) {
      return next(createError(404, "Commande not found!"))
    }
    res.status(200).json(commande)
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details)); 
  }
};

module.exports = {
  post,
  get,
  getById,
  getByUser,
  deleteById,
  updateById
};
