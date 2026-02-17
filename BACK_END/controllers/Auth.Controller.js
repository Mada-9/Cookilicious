const createError = require("../helpers/CreateError.js");
const AuthModel = require("../models/User.Model.js");
const ENV = require("../config/Env.js");
const bcrypt = require("bcrypt"); // pour hasher le mot de passe , sécuriser
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/nodemailer"); //envoie d'email



const register = async (req, res, next) => {
  try {
    // Hashage de mot de passe avec bcrypt
    // "10" est le nombre de tours de salage (chaîne de caractères ajouté apres le mdp)
    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    const user = await AuthModel.create({
      ...req.body, //EXTRAIT TOUTES LES DONNEES
      password: passwordHashed, // ON 2CRASE LE MOT DE PASS POUR LE HASHER
      isVerified: false, // Compte bloqué par défaut car non vérifié
    });

    // Token de vérification (pour l'email)
    const verificationToken = jwt.sign({ id: user._id }, ENV.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Token de SESSION (pour la connexion immédiate)
    const sessionToken = jwt.sign({ id: user._id }, ENV.JWT_SECRET, {
      expiresIn: "24h",
    });

    //  ENVOIE LE MAIL
    await sendEmail(user, verificationToken);

    //  prépare les données utilisateur à renvoyer au front (sans le mot de passe)
    const { password, ...others } = user._doc;

    // res: On envoie le cookie + les infos user
    res
      .cookie("access_token", sessionToken, {
        httpOnly: true, // Sécurité : empêche l'accès via JS
        secure: false, // Mets à true seulement en HTTPS/Production
      })
      .status(201)
      .json(others); // On renvoie l'objet user complet au lieu du simple message
  } catch (error) {
    next(createError(error.status || 500, error.message, error.details));
  }
};







//  CONNEXION

const login = async (req, res, next) => {
  try {
    // Recherche l'utilisateur dans la base de données par son email
    const user = await AuthModel.findOne({ email: req.body.email });

    // si l'utilisateur n'est pas trouvé, renvoie une erreur 404.
    if (!user) return next(createError(404, "User not found !"));

    // Compare le mot de passe fourni dans la requete
    // avec le mot de passe de l'utilisateur qui est dans la bdd

    const comparePassword = await bcrypt.compare(
      //hash le mdp
      req.body.password,
      user.password,
    );
    if (!comparePassword) return next(createError(400, "Wrong Credentials !")); //bad request

    console.log("Tentative de connexion pour:", user.email);
    console.log(user.isVerified);

    // On vérifie si l'email est confirmé
    if (!user.isVerified) {
      return res.status(403).json({
        //erreur de permission
        message: "Veuillez vérifier votre email.",
      });
    }

    // Crée un jeton JWT
    // Le token contient l’id de l’utilisateur, il est transformé en JWT grâce à la clé secrète du serveur,
    // et expires c’est la durée pendant laquelle ce token reste valide (donc la durée de la connexion).

    const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_EXPIRES_IN,
    });

    // supprime le mot de passe de l'utilisateur  pour ne jamais renvoyer le mot de passe mais juste les infos
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true }) // access_token = nom du cookie, le token généré pour l'utilisateur, httpOnly= lecture et recuperation du cookie que coté serveur via http
      .status(200)
      .json(others); //  renvoie les infos de l'utilisateur sans le mot de passe
  } catch (error) {
    next(createError(500, error.message));
  }
};





const verifyEmail = async (req, res, next) => {
  try {
    //   récupère le token depuis l'URL (envoyé par le Front-end)
    const { token } = req.params;

    // vérifie si le token est valide avec ton secret JWT_SECRET
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    console.log("Token décodé:", decoded);

    //  active le compte de l'utilisateur
    const user = await AuthModel.findByIdAndUpdate(
      decoded.id,
      { isVerified: true },
      { new: true },
    );

    // Si l'utilisateur n'existe plus en base
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    return res.status(200).json({ message: "Email vérifié avec succès !" });
  } catch (error) {
    console.error("Erreur de vérification:", error);
    return res.status(400).json({ message: "Lien invalide ou expiré." });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
};
