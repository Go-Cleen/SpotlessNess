const express = require("express");
const router = express.Router();
const db = require("../db/config/mongodbConnection");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);

router.get("/profile", UserController.getProfile);
router.post("/profile", UserController.postProfile);

module.exports = router;
