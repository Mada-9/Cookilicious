const createError = require("../helpers/CreateError.js");
const UserModel = require("../models/User.Model.js");
const ENV = require('../config/Env.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


/**
 * Récupère la liste de tous les éléments.
 * Méthode HTTP GET.
 *
 * Exemple de requête :
 *  ExempleModel.find()
 *
 * @param {object} req - Objet de requête Express.
 * @param {object} res - Objet de réponse Express.
 * @returns {object[]} Liste des éléments.
 */
const get = async (req, res, next) => {
  try {
    const membres = await UserModel.find();
    res.status(200).json(membres);
  } catch (error) {
     next(createError(error.status || 500, error.message, error.details));
  }
};

/**
 * Récupère un élément par son identifiant.
 * Méthode HTTP GET.
 *
 * Exemple de requête :
 *   ExempleModel.findById(req.params.id)
 *
 * @param {object} req - Objet de requête Express (contient l'id dans req.params).
 * @param {object} res - Objet de réponse Express.
 * @returns {object} Élément correspondant à l'identifiant.
 */
const getById = async (req, res, next) => {
  try {
    const membre = await UserModel.findById(req.params.id);
    if(!membre) return next(createError(404, "User not found !")); 
    res.status(200).json(membre);
  } catch (error) {
     next(createError(error.status || 500, error.message, error.details)); 
  }
};

/**
 * Supprime un élément par son identifiant.
 * Méthode HTTP DELETE.
 *
 * Exemple de requête :
 *   ExempleModel.findByIdAndDelete(req.params.id);
 *
 * @param {object} req - Objet de requête Express (contient l'id dans req.params).
 * @param {object} res - Objet de réponse Express.
 * @returns {object} Message de confirmation de suppression.
 */
const deleteById = async (req, res, next) => {
  try {
    const auth = await UserModel.findById(req.auth.id)
    
    if(auth.role === "admin" ){      
      const user = await UserModel.findByIdAndDelete(req.params.id);
      if(!user) return next(createError(404, "user not found !"));
      res.status(200).json({message: "user deleted ! "});
    }
    
    res.status(403).json("permission denied !")
  } catch (error) {
     next(createError(error.status || 500, error.message, error.details));
  }
};

/**
 * Met à jour un élément existant par son identifiant.
 * Méthode HTTP PUT.
 *
 * Exemple de requête :
 *   ExempleModel.findByIdAndUpdate(
 *    req.params.id,
 *    req.body, {
 *      new: true
 *    });
 * @param {object} req - Objet de requête Express (contient l'id dans req.params et les données dans req.body).
 * @param {object} res - Objet de réponse Express.
 * @returns {object} Élément mis à jour.
 */
const updateById = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true}
    )
    if(!user) return next(createError(404, "user not found !"))
    res.status(200).json(user);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details)); 
  }
};

module.exports = {
  get,
  getById,
  deleteById,
  updateById
};
