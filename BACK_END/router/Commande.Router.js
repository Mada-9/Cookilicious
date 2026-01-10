const express = require("express");
const CommandeController = require("../controllers/Commande.Controller.js");

const router = express();
 
router.post("/post", CommandeController.post);
router.get("/get", CommandeController.get);
router.get("/get/:id", CommandeController.getById);
router.get("/get/user/:userId", CommandeController.getByUser); //protger par un token ?
router.delete("/delete/:id", CommandeController.deleteById);
router.put("/update/:id", CommandeController.updateById);


module.exports = router;