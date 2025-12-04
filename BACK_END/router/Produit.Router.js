const express = require("express");
<<<<<<< HEAD
const ProduitController = require("../controllers/Produit.Controller.js")   //pour recuperer le fichier des méthodes crées


const router = express();// express pour ...


router.post("/post", ProduitController.post); // router.post pour créer les routes et le controlleur pour récuperer  et ensuite specifier la methodes
router.get("/get", ProduitController.get);
router.get("/get/:id", ProduitController.getById); // :id = pour un url dynamique 
router.delete("/delete/:id", ProduitController.deleteById)
router.put ("/update/:id", ProduitController.updateById) 
=======
const ProduitController = require("../controllers/Produit.Controller.js")

const router = express();

// définir vos routes ici : Controller.Methode
router.post("/post", ProduitController.post);
router.get("/get", ProduitController.get);
router.get("/get/:id", ProduitController.getById);
router.delete("/delete/:id", ProduitController.deleteById)
router.put ("/update/:id", ProduitController.updateById)



>>>>>>> 1b20691f17c33f2ba5dd0f904bf7942c6deb498e

module.exports = router;
