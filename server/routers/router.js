const express = require("express");
const router = express.Router();
const db = require("../db/config/mongodbConnection");
const UserController = require("../controllers/userController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
