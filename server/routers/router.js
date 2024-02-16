const express = require("express");
const router = express.Router();
const db = require("../db/config/mongodbConnection");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const ProfileController = require("../Controllers/profileController");
const authorization = require("../middlewares/authorization");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);

router.put("/change-password", authentication, UserController.changePassword)
router.get("/profile", ProfileController.getProfile);
router.post("/profile", ProfileController.postProfile);

module.exports = router;
