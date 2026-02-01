const createError = require("../helpers/CreateError.js");
const AvisModel = require("../models/Avis.Model.js");

const post = async (req, res, next) => {
  try {
    const avis = await AvisModel.create(req.body)
   
    res.status(201).json(avis);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

const get = async (req, res, next) => {
  try {
    const avis = await AvisModel.find(req.params).populate(
      "user",
      "username _id"
    );
    res.status(200).json(avis);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};
const getById = async (req, res, next) => {
  try {
    const avis = await AvisModel.findById(req.params.id);
    if (!avis) {
      return createError(404, "Avis not found!");
    }
    res.status(200).json(avis);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

const deleteById = async (req, res, next) => {
  try {
    const avis = await AvisModel.findByIdAndDelete(req.params.id);
    if (!avis) {
      return createError(404, "Avis not found!");
    }
    res.status(200).json("Avis deleted!");
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};
const updateById = async (req, res, next) => {
  try {
    const avis = await AvisModel.findByIdAndUpdate(req.params.id, req.body, {new: true}
    );
    if (!avis) {
      return createError(404, "Avis not found!");
    }
    res.status(200).json("Avis updated!");
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

module.exports = {
  post,
  get,
  getById,
  deleteById,
  updateById,
};
