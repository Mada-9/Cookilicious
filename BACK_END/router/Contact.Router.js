const express = require("express");
const ContactController= require("../controllers/Contact.Controller.js")    //pour recuperer le fichier des méthodes crées
const auth = require("../middlewares/AuthMiddleware.js");


const router = express(); // express (framework) pour 

router.post("/post", ContactController.post); // router.post pour créer les routes et le controlleur pour récuperer les methodes
router.get("/get",auth, ContactController.get);
router.get("/get/:id",auth, ContactController.getById);
router.delete("/delete/:id", auth, ContactController.deleteById)

module.exports = router;