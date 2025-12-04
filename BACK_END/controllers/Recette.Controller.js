const createError = require("../helpers/CreateError.js");
const RecetteModel = require("../models/Recette.Model.js");

const post = async (req, res, next) => {
  try {
    const recette = await RecetteModel.create(req.body);
    res.status(201).json(recette);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

const get = async (req, res, next) => {
  try {
    const recette = await RecetteModel.find(req.body);
    res.status(200).json(recette);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

const getById = async (req, res, next) => {
  try {
    const recette = await RecetteModel.findById(req.params.id);
    if (!recette) {
      return next(createError(404, "Recette not found!"));
    }
    res.status(200).json(recette);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

const deleteById = async (req, res, next) => {
  const recette = await RecetteModel.findByIdAndDelete(req.params.id);
  try {
    if (!recette) {
      return next(createError(404, "Recette not found!"));
    }
    res.status(200).json("Recette deleted");
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

const updateById = async (req, res, next) => {
  const recette = await RecetteModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  try {
    if (!recette) {
      return next(createError(404, "Recette not found!"));
    }
    res.status(200).json("Recette updated!");
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
