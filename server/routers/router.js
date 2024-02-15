const express = require("express");
const router = express.Router();
const db = require("../db/config/mongodbConnection");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/", authentication, (req, res) => {
  console.log(req.user, "<<< ini requser dari router");
});

module.exports = router;
