const express = require("express");
const router = express.Router();
const db = require("../db/config/mongodbConnection");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const ProfileController = require("../Controllers/profileController");
const ServiceController = require("../Controllers/serviceController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
// router.get("/testing", ServiceController.seeding);

router.use(authentication);

router.put("/change-password", UserController.changePassword);
router.get("/profile", ProfileController.getProfile);
router.post("/profile", ProfileController.postProfile);

router.get('/services', ServiceController.getService)
router.get('/services/:id', ServiceController.getServiceById)

module.exports = router;
