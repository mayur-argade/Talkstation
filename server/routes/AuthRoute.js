const express = require("express");

//import homeController
const {
  sendotp,
  verifyotp,
  activate,
  refresh,
} = require("../controllers/AuthController");
const { isLoggedin } = require("../middleware/authMiddleware");
const router = express.Router(); // New router instance from express library

//routes
router.route("/send-otp").post(sendotp);
router.route("/verify-otp").post(verifyotp);
router.route("/activate").post(isLoggedin , activate);
router.route("/refresh").get(refresh);

module.exports = router;
