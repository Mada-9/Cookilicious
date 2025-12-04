const createError = require("../helpers/CreateError.js");
const ProduitModel = require("../models/Produit.Model.js");

/**
 * Méthode pour créer un nouvel élément.
 * Utilise la méthode HTTP POST.
 *
 * Exemple de requête :
 *   ExempleModel.create(req.body)
 *
 * @param {object} req - Objet de requête (données à créer).
 * @param {object} res - Objet de réponse.
 * @returns {object} L'objet créé.
 */
const post = async (req, res, next) => {
  try {
    const produit = await ProduitModel.create(req.body)
    res.status(201).json(produit)
  } catch (error) {
     next(createError(error.status || 500, error.message, error.details));
  }
};

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
    const produit = await ProduitModel.find(req.body)
    res.status(200).json(produit)
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
    const produit = await ProduitModel.findById(req.params.id)
    if(!produit) {
      return next(next(createError(404, "Produit not found!")))
    }
    res.status(200).json(produit)
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
    const produit = await ProduitModel.findByIdAndDelete(req.params.id)
    if(!produit) {
      return next(createError(404, "Produit not found!"))
    }
    res.status(200).json({message:"Produit deleted!"})
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
    const produit = await ProduitModel.findByIdAndUpdate(req.params.id,req.body,{new:true}) //{new:true})= retourne l'element mis à jour et non l'ancien
    if(!produit) {
      return next(createError(404, "Produit not found!"))
    }
    res.status(200).json(produit)
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details)); 
  }
};





// Export des méthodes pour les réutiliser dans le router
module.exports = {
  post,
  get,
  getById,
  deleteById,
  updateById
};
