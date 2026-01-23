const createError = require("../helpers/CreateError.js");
const ContactModel = require("../models/contact.Model.js");

const post = async (req, res, next) => {
  // METHODE POST, async=asynchone(actions simultanées) req= request, res=reponse, next=passer à la suite de la requête
  try {
    const contact = await ContactModel.create(req.body); //await
    res.status(201).json(contact); //reponse à la création de la requête, 201 code créa, en format json
  } catch (error) {
    // capturer les erreurs
    next(createError(error.status || 500, error.message, error.details)); // erreur 500= erreur serveur, +message erreur et details
  }
};

const get = async (req, res, next) => {
  try {
    const contact = await ContactModel.find(req.params);
    res.status(200).json(contact); // status 200 requete réussie
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await ContactModel.findById(req.params.id);
    if (!contact) {
      return next(next(createError(404, "Contact not found!")));
    }
    res.status(200).json(contact);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

const deleteById = async (req, res, next) => {
  try {
    const contact = await ContactModel.findByIdAndDelete(req.params.id); // req.params.id = pour recherhcer et suprimer grâce à l'id recupéré dans l'url
    if (!contact) {
      // si on ne trouve pas le contact alors erreur
      return next(createError(404, "Message not found!"));
    }
    res.status(200).json({ message: "Message deleted!" });
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
