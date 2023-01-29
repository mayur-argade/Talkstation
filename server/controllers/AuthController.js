const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");

exports.sendotp = async (req, res) => {
  // get phone number
  const { phone } = req.body;

  if (!phone) {
    res.send(400).json({ message: "Phone filed is mandatory" });
  }

  // generate random number using crypto module
  const otp = otpService.generateOtp();

  //   generating hash for otp
  const ttl = 1000 * 60 * 2;
  const expires = Date.now() + ttl;
  const data = `${phone}.${otp}.${expires}`;
  const hash = hashService.hashotp(data);

  //   send otp
  try {
    await otpService.sendOtp(phone, otp);
    return res.json({
      hash: `${hash}.${expires}`,
      phone,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.verifyotp = async (req, res) => {
  const { otp, hash, phone } = req.body;
  if (!otp || !hash || !phone) {
    res.status(400).json("all fields are required");
  }

  const [hashedOtp, expires] = hash.split(".");
  if (Date.now() > +expires) {
    res.status(400).json("otp expired");
  }

  const data = `${phone}.${otp}.${expires}`;

  const isValid = otpService.verifyOtp(hashedOtp, data);

  if (!isValid) {
    res.status(400).json("invalid otp");
  }

  let user;

  try {
    user = await userService.findUser({ phone: phone });
    if (!user) {
      user = await userService.createUser({ phone: phone });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

  const { accessToken, refreshToken } = tokenService.generateTokens({
    id: user._id,
    activated: false,
  });

  res.cookie("refreshtoken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  res.json({ accessToken });
};
