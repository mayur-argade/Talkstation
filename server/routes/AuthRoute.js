const express = require("express");

//import homeController
const {
  sendotp,
  verifyotp,
  activate,
} = require("../controllers/AuthController");
const router = express.Router(); // New router instance from express library

//routes
router.route("/send-otp").post(sendotp);
router.route("/verify-otp").post(verifyotp);
router.route("/activate").post(activate);

module.exports = router;
