const express = require("express");
const ContactController= require("../controllers/Contact.Controller.js")    //pour recuperer le fichier des méthodes crées

const router = express(); // express (framework) pour utiliser le système de routes?

router.post("/post", ContactController.post); // router.post pour créer les routes et le controlleur pour récuperer les methodes
router.get("/get", ContactController.get);
router.get("/get/:id", ContactController.getById);
router.delete("/delete/:id", ContactController.deleteById)

module.exports = router;