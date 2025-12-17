const express = require("express");
const CommandeController = require("../controllers/Commande.Controller.js");

const router = express();
 
router.post("/post", CommandeController.post);
router.get("/get", CommandeController.get);
router.get("/get/:id", CommandeController.getById);
router.delete("/get/:id", CommandeController.deleteById);

module.exports = router;