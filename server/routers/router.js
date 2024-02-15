const express = require("express");
const router = express.Router();
const db = require("../db/config/mongodbConnection");
const UserController = require("../controllers/userController");

router.get("/register", UserController.register);

module.exports = router;
