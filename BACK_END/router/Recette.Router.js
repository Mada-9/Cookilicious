const express = require("express");
const RecetteController = require("../controllers/Recette.Controller.js");
const auth = require("../middlewares/AuthMiddleware.js");

const router = express();

router.post("/post",auth, RecetteController.post);
router.get("/get", RecetteController.get);
router.get("/get/:id", RecetteController.getById);
router.delete("/delete/:id",auth, RecetteController.deleteById);
router.put("/update/:id",auth, RecetteController.updateById);

module.exports = router;
