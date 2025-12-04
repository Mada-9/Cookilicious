const express = require("express");
const ProduitController = require("../controllers/Produit.Controller.js")   //pour recuperer le fichier des méthodes crées


const router = express();// express pour ...


router.post("/post", ProduitController.post); // router.post pour créer les routes et le controlleur pour récuperer  et ensuite specifier la methodes
router.get("/get", ProduitController.get);
router.get("/get/:id", ProduitController.getById); // :id = pour un url dynamique 
router.delete("/delete/:id", ProduitController.deleteById)
router.put ("/update/:id", ProduitController.updateById) 

module.exports = router;
