const express = require("express");
const MembreController = require("../controllers/Membre.Controller.js");
const AuthController = require("../controllers/Auth.Controller.js");

const router = express();

router.post("/post", AuthController.register); // La méthode register provient du controller Aut
router.get("/get", MembreController.get);
router.get("/get/:id", MembreController.getById);
router.put("/update/:id", MembreController.updateById);
router.delete("/delete/:id", MembreController.deleteById);

module.exports = router;