const express = require("express");
const CookiesController = require("../controllers/Cookies.Controller")   //pour recuperer le fichier des méthodes crées
const auth = require("../middlewares/AuthMiddleware.js");


const router = express();// express pour ...


router.post("/post",auth, CookiesController.post); // router.post pour créer les routes et le controlleur pour récuperer  et ensuite specifier la methodes
router.get("/get",auth, CookiesController.get);
router.get("/get/:id",auth, CookiesController.getById); // :id = pour un url dynamique 
router.delete("/delete/:id",auth, CookiesController.deleteById)
router.put ("/update/:id",auth, CookiesController.updateById) 

module.exports = router;
