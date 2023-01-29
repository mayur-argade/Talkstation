const crypto = require("crypto");
const hashService = require("./hash-service");
const smssid = "AC72a1bffe91111f737b3b24c0ffba4178";
const smsAuthToken = "1e516a0ff9b40f716840e2c5353f7a28";
const twilio = require("twilio")(smssid, smsAuthToken, {
  lazyLoading: true,
});

class Otpservice {
  generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }

  async sendOtp(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: process.env.SMS_NO,
      body: `Your Talkstation OTP is ${otp}`,
    });
  }

  verifyOtp(hashedOtp, data) {
    let computedHash = hashService.hashotp(data);

    if (computedHash === hashedOtp) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = new Otpservice();
