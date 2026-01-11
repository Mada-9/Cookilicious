const express = require("express");
const CookiesController = require("../controllers/Cookies.Controller")   //pour recuperer le fichier des méthodes crées


const router = express();// express pour ...


router.post("/post", CookiesController.post); // router.post pour créer les routes et le controlleur pour récuperer  et ensuite specifier la methodes
router.get("/get", CookiesController.get);
router.get("/get/:id", CookiesController.getById); // :id = pour un url dynamique 
router.delete("/delete/:id", CookiesController.deleteById)
router.put ("/update/:id", CookiesController.updateById) 

module.exports = router;
