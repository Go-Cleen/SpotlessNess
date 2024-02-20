const express = require("express");
const router = express.Router();
const db = require("../db/config/mongodbConnection");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const ProfileController = require("../Controllers/profileController");
const ServiceController = require("../Controllers/serviceController");
const ControllerTransaction = require("../Controllers/transactionController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/update-transaction", ControllerTransaction.updateStatus)
// router.get("/testing", ServiceController.seeding);

router.use(authentication);

router.put("/change-password", UserController.changePassword);
router.get("/profile", ProfileController.getProfile);
router.patch("/profile", ProfileController.patchProfile);

router.get("/services", ServiceController.getService);
router.get("/services/:id", ServiceController.getServiceById);

router.post("/midtrans-payment", ControllerTransaction.InitiateMidTrans)

module.exports = router;
