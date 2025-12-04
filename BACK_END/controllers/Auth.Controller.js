const createError = require("../helpers/CreateError.js");
const AuthModel = require("../models/User.Model.js");
const ENV = require("../config/Env.js");
const bcrypt = require("bcrypt"); // pour hasher le mot de passe , sécuriser
const jwt = require("jsonwebtoken");

// Methode pour s'inscrire
const register = async (req, res, next) => {
  try {
    const passwordHashed = await bcrypt.hash(req.body.password, 10);   // Hashage de mot de passe avec bcrypt , "10" est le nombre de tours de salage

    // CODE HERE...
    const user = await AuthModel.create({
      ...req.body, //
      password: passwordHashed,
    })
    res.status(201).json(user);
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

// Methode pour se connecter
const login = async (req, res) => {
  try {
    // CODE HERE...
     // Recherche l'utilisateur dans la base de données par son email
    const user = await AuthModel.findOne({ email: req.body.email }); 
    // si l'utilisateur n'est pas trouvé, renvoie une erreur 404.
    if(!user) return next(createError(404, 'User not found !'));

    // Compare le mot de passe fourni dans la requete
    // avec le mot de passe de l'utilisateur qui est dans la bdd
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // Si le mot de passe est incorrect, renvoie une erreur 400
    if(!comparePassword) return next(createError(400, "Wrong Credentials !"));

    // Crée un jeton JWT
    const token = jwt.sign({ id: user._id  }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN });

    // supprime le mot de passe de l'utilisateur
    const { password, ...others } = user._doc
   


   
   res.cookie('access_token', token, { httpOnly: true }) 
   .status(200)
   .json(others);

  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};

module.exports = {
  register,
  login,
};
