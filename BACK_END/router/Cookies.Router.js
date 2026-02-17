const express = require("express");
const CookiesController = require("../controllers/Cookies.Controller")   
const auth = require("../middlewares/AuthMiddleware.js");


const router = express.Router();


router.post("/post",auth, CookiesController.post);
router.get("/get", CookiesController.get);
router.get("/get/:id", CookiesController.getById); 
router.delete("/delete/:id",auth, CookiesController.deleteById)
router.put ("/update/:id",auth, CookiesController.updateById) 

module.exports = router;
