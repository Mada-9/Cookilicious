const express = require("express");
const AvisController= require("../controllers/Avis.Controller.js")    //pour recuperer le fichier des méthodes crées
const auth = require("../middlewares/AuthMiddleware.js");

const router = express();

router.post("/post", auth, AvisController.post); // router.post pour créer les routes et le controlleur pour récuperer les methodes
router.get("/get", auth, AvisController.get);
router.get("/get/:id", auth, AvisController.getById);
router.delete("/delete/:id", auth, AvisController.deleteById)

module.exports = router;