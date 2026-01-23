const express = require("express");
const BrookiesController = require("../controllers/Brookies.Controller")   //pour recuperer le fichier des méthodes crées
const auth = require("../middlewares/AuthMiddleware.js");


const router = express();// express pour ...


router.post("/post", auth, BrookiesController.post); // router.post pour créer les routes et le controlleur pour récuperer  et ensuite specifier la methodes
router.get("/get", auth, BrookiesController.get);
router.get("/get/:id", auth, BrookiesController.getById); // :id = pour un url dynamique 
router.delete("/delete/:id", auth, BrookiesController.deleteById)
router.put ("/update/:id", auth, BrookiesController.updateById) 

module.exports = router;
