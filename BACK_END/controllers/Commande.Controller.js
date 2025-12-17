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
    const commandes = await CommandeModel.find()
      .populate("user")
      .populate("produit");

    res.status(200).json(commandes);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

// GET BY ID COMMANDE
const getById = async (req, res, next) => {
  try {
    const commande = await CommandeModel.findById(req.params.id)
      .populate("user")
      .populate("produit");
    res.status(200).json(commande);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

// DELETE COMMANDE
const deleteById = async (req, res, next) => {
  try {
    const commande = await CommandeModel.findByIdAndDelete(req.params.id);
    if (!commande) return next(createError(404, "Commande not found !"));
    res.status(200).json({ message: "Commande deleted ! " });
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

module.exports = {
  post,
  get,
  getById,
  deleteById,
};
