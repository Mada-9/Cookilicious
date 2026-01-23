const express = require("express");
const CommandeController = require("../controllers/Commande.Controller.js");
const auth = require("../middlewares/AuthMiddleware.js");

const router = express();

router.post("/post", auth, CommandeController.post);
router.get("/get", auth, CommandeController.get);
router.get("/get/:id", auth, CommandeController.getById);
router.get("/get/user/:userId", auth, CommandeController.getByUser); //protger par un token ?
router.delete("/delete/:id", auth, CommandeController.deleteById);
router.put("/update/:id", auth, CommandeController.updateById);

module.exports = router;
