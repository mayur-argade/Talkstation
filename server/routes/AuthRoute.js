const express = require("express");

//import Authcontorller
const {
  sendotp,
  verifyotp,
  activate,
  refresh,
  logout,
} = require("../controllers/AuthController");
const { isLoggedin } = require("../middleware/authMiddleware");
const router = express.Router(); // New router instance from express library

//routes
router.route("/send-otp").post(sendotp);
router.route("/verify-otp").post(verifyotp);
router.route("/activate").post(isLoggedin, activate);
router.route("/refresh").get(refresh);
router.route("/logout").post(isLoggedin, logout);
module.exports = router;
