const express = require("express");
const RecetteController = require("../controllers/Recette.Controller.js");
const ProduitModel = require("../models/Produit.Model.js");

const router = express();

router.post("/post", RecetteController.post);
router.get("/get", RecetteController.get);
router.get("/get/:id", RecetteController.getById);
router.delete("/delete/:id", RecetteController.deleteById);
router.put("/update/:id", RecetteController.updateById);

module.exports = router;
