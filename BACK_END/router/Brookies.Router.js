const express = require("express");
const BrookiesController = require("../controllers/Brookies.Controller")   //pour recuperer le fichier des méthodes crées


const router = express();// express pour ...


router.post("/post", BrookiesController.post); // router.post pour créer les routes et le controlleur pour récuperer  et ensuite specifier la methodes
router.get("/get", BrookiesController.get);
router.get("/get/:id", BrookiesController.getById); // :id = pour un url dynamique 
router.delete("/delete/:id", BrookiesController.deleteById)
router.put ("/update/:id", BrookiesController.updateById) 

module.exports = router;
