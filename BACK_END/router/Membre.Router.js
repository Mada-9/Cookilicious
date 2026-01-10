const express = require("express");
const MembreController = require("../controllers/Membre.Controller.js");
const AuthController = require("../controllers/Auth.Controller.js");
const auth = require("../middlewares/AuthMiddleware.js");


const router = express();

router.post("/post", AuthController.register); // La méthode register provient du controller Aut
router.get("/get", MembreController.get);
router.get("/get/:id", MembreController.getById);
router.put("/update/:id",  auth, MembreController.updateById);
router.delete("/delete/:id", auth, MembreController.deleteById);

module.exports = router;