const createError = require("../helpers/CreateError.js");
const ContactModel = require("../models/Contact.Model.js"); // require de la page model pour

const post = async (req, res, next) => { // METHODE POST, async=asynchone(actions simultanées) req= request, res=reponse, next=passer à la suite de la requête
  try {
    const contact = await ContactModel.create(req.body) //await
    res.status(201).json(contact) //reponse à la création de la requête, 201 code créa, en format json
  } catch (error) { // cpaturer les erreurs
     next(createError(error.status || 500, error.message, error.details)); // erreur 500= erreur serveur, +message erreur et details
  }
};


const get = async (req, res, next) => {
  try {
    const contact = await ContactModel.find() 
    res.status(200).json(contact) // status 200 requete réussie
  } catch (error) {
     next(createError(error.status || 500, error.message, error.details));
  }
};


const deleteById = async (req, res, next) => {
  try {
    const contact = await ContactModel.findByIdAndDelete(req.params.id) // req.params.id = pour recherhcer et suprimer grâce à l'id recupéré dans l'url
    if(!contact) { // si on ne trouve pas le contact alors erreur
      return next(createError(404, "Message not found!"))
    }
    res.status(200).json({message:"Message deleted!"})
  } catch (error) {
     next(createError(error.status || 500, error.message, error.details));
  }
};

module.exports = { // pour exporter les méthodes et les utiliser dans les différents fichiers
  post,
  get,
  deleteById,
};