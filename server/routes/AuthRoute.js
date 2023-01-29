const express = require('express')

//import homeController
const { sendotp } = require('../controllers/AuthController') 
const router = express.Router(); // New router instance from express library

//routes
router.route("/send-otp").post(sendotp)

module.exports = router
