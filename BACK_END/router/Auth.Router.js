const express = require("express");
const AuthController = require("../controllers/Auth.Controller.js");

// const router = express();
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/verify/:token", AuthController.verifyEmail);

module.exports = router;
