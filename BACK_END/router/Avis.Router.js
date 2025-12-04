const express = require("express");
const AvisController= require("../controllers/Avis.Controller.js")    //pour recuperer le fichier des méthodes crées

const router = express();

router.post("/post", AvisController.post); // router.post pour créer les routes et le controlleur pour récuperer les methodes
router.get("/get", AvisController.get);
router.get("/get/:id", AvisController.getById);
router.delete("/delete/:id", AvisController.deleteById)

module.exports = router;