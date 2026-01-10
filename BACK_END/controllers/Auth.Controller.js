const createError = require("../helpers/CreateError.js");
const AuthModel = require("../models/User.Model.js");
const ENV = require("../config/Env.js");
const bcrypt = require("bcrypt"); // pour hasher le mot de passe , sécuriser
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/nodemailer"); // <--- NE PAS OUBLIER CET IMPORT

// --- INSCRIPTION (C'est ici qu'on envoie le mail !) ---
const register = async (req, res, next) => {
  try {
    const passwordHashed = await bcrypt.hash(req.body.password, 10);
    const user = await AuthModel.create({
      ...req.body,
      password: passwordHashed,
      isVerified: false, // Compte bloqué par défaut
    });

    // 1. Token de vérification (pour l'email)
    const verificationToken = jwt.sign({ id: user._id }, ENV.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 2. Token de SESSION (pour la connexion immédiate)
    // On utilise le même secret que pour le login
    const sessionToken = jwt.sign({ id: user._id }, ENV.JWT_SECRET, {
      expiresIn: "24h",
    });

    // ON ENVOIE LE MAIL 
    await sendEmail(user, verificationToken);

    // On prépare les données utilisateur à renvoyer au front (sans le mot de passe)
    const { password, ...others } = user._doc;

    // 3. RÉPONSE : On envoie le cookie + les infos user
    res
      .cookie("access_token", sessionToken, {
        httpOnly: true, // Sécurité : empêche l'accès via JS
        secure: false, // Mets à true seulement en HTTPS/Production
      })
      .status(201)
      .json(others); // On renvoie l'objet user complet au lieu du simple message
  } catch (error) {
    // Cela va nous dire SI c'est expiré ou SI c'est une erreur de signature
    if (error.name === "TokenExpiredError") {
      console.log("❌ Le token a expiré à :", error.expiredAt);
    } else {
      console.log("❌ Erreur JWT :", error.message);
    }
    return res
      .status(400)
      .json({ message: "Lien invalide ou expiré.", detail: error.message });
  }
};

// --- CONNEXION ---
const login = async (req, res, next) => {
  try {
    const user = await AuthModel.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found !"));

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) return next(createError(400, "Wrong Credentials !"));

    console.log("Tentative de login pour:", user.email);
    console.log("Valeur de isVerified en DB:", user.isVerified);
    // On vérifie si l'email est confirmé
    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "Veuillez vérifier votre email pour accéder à cette fonctionnalité.",
      });
    }

    // Si OK, on crée le token de session
    const token = jwt.sign({ id: user._id }, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_EXPIRES_IN,
    });

    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (error) {
    next(createError(500, error.message));
  }
};
// Cette fonction va vérifier l'email de l'utilisateur
const verifyEmail = async (req, res, next) => {
  try {
    // 1. On récupère le token depuis l'URL (envoyé par le Front-end)
    const { token } = req.params;

    // 2. On vérifie si le token est valide avec ton secret JWT_SECRET
    // On utilise env.JWT_SECRET car c'est le nom dans ton fichier config/Env.js
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    console.log("✅ Token décodé:", decoded);

    // 3. On active le compte de l'utilisateur
    // On utilise AuthModel car c'est le nom que tu as importé en haut de ton fichier
    const user = await AuthModel.findByIdAndUpdate(
      decoded.id,
      { isVerified: true },
      { new: true }
    );

    // Si l'utilisateur n'existe plus en base
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Tout s'est bien passé! 
    return res.status(200).json({ message: "Email vérifié avec succès !" });
  } catch (error) {
    // Si le token a expiré (plus de 5 ou 15 min) ou s'il est faux
    console.error("Erreur de vérification:", error);
    return res.status(400).json({ message: "Lien invalide ou expiré." });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
};
