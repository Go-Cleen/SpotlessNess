const express = require("express");
const router = express.Router();
const cron = require("node-cron");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const ProfileController = require("../Controllers/profileController");
const ServiceController = require("../Controllers/serviceController");
const TransactionController = require("../Controllers/transactionController");
const ScheduleController = require("../Controllers/scheduleController");
const updateStatus = require("../helper/scheduleValidate");
const authorization = require("../middlewares/authorization");

router.post("/register", UserController.register); //done testing
router.post("/login", UserController.login); //done testing
router.post("/update-transaction", TransactionController.updateStatus);
// router.get("/testing", ServiceController.seeding);

router.use(authentication);

router.put("/change-password", UserController.changePassword); //done testing
router.get("/profile", ProfileController.getProfile); //done testing
router.patch("/profile", ProfileController.patchProfile); //done testing

router.get("/employee", UserController.getEmployee); //done testing
router.post("/employee", authorization, UserController.addEmployee);

router.get("/services", ServiceController.getService); //done testing
router.get("/services/:id", ServiceController.getServiceById); //done testing
router.post("/services", ServiceController.addService);
router.delete("/services/:id", ServiceController.deleteService);

router.post("/midtrans-payment", TransactionController.InitiateMidTrans);

router.get("/all-transaction", TransactionController.getAllTransaction);
router.get("/get-transaction/:id", TransactionController.getTransactionById);
router.get(
  "/get-success-transaction",
  TransactionController.getSuccessTransaction
);

router.get("/all-schedule", ScheduleController.getAllSchedule);
router.get("/get-schedule-user", ScheduleController.getScheduleByUser);
router.get("/get-schedule/:id", ScheduleController.getScheduleById);

cron.schedule(
  "*/1 * * * *",
  () => {
    updateStatus().catch((error) =>
      console.error("Error updating service status:", error)
    );
  },
  {
    scheduled: true,
    timezone: "Asia/Jakarta",
  }
);

module.exports = router;
