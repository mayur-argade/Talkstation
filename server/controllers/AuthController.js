const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const User = require("../models/UserModel");
const UserDTO = require("../dto/userDTO");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.sendotp = async (req, res) => {
  // get phone number
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone filed is mandatory" });
  }

  // generate random number using crypto module
  // const otp = otpService.generateOtp();
  const otp = 1234;

  //   generating hash for otp
  const ttl = 1000 * 60 * 2;
  const expires = Date.now() + ttl;
  const data = `${phone}.${otp}.${expires}`;
  const hash = hashService.hashotp(data);

  //   send otp
  try {
    // await otpService.sendOtp(phone, otp);
    return res.json({
      hash: `${hash}.${expires}`,
      phone,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

exports.verifyotp = async (req, res) => {
  const { otp, hash, phone } = req.body;
  if (!otp || !hash || !phone) {
    return res.status(400).json("all fields are required");
  }

  const [hashedOtp, expires] = hash.split(".");
  if (Date.now() > +expires) {
    return res.status(400).json("otp expired");
  }

  const data = `${phone}.${otp}.${expires}`;

  const isValid = otpService.verifyOtp(hashedOtp, data);

  if (!isValid) {
    return res.status(400).json("invalid otp");
  }

  let user;

  try {
    user = await userService.findUser({ phone: phone });
    if (!user) {
      user = await userService.createUser({ phone: phone });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }

  const { accessToken, refreshToken } = tokenService.generateTokens({
    id: user._id,
    activated: false,
  });

  const userdto = new UserDTO(user);

  await tokenService.storeRefreshToken(refreshToken, userdto._id);

  res
    .status(200)
    .cookie("refreshtoken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })
    .cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })
    .json({ user: userdto });
};

exports.activate = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    const { name, avatar } = req.body;

    if (!name || !avatar) {
      return res
        .status(400)
        .json({ msg: "Both 'name' and 'avatar' are required." });
    }

    const user = await tokenService.verifyAccessToken(accessToken);
    console.log("userfromaceesstoken", user);
    try {
      const photourl = await cloudinary.uploader.upload(avatar, {
        folder: "talkstaion/users",
      });

      user.photo = photourl.secure_url;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Failed to upload the avatar." });
    }

    user.name = name;
    user.activated = true;

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      { name, photo: user.photo, activated: true },
      { new: true }
    );
    console.log("updatedUser", updatedUser);
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found." });
    }
    const fuser = new UserDTO(updatedUser);
    return res.status(200).json({ user: fuser, auth: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Something went wrong." });
  }
};

exports.refresh = async (req, res) => {
  // get refresh token from header
  const { refreshtoken: refreshTokenFromCookie } = req.cookies;

  // check if refresh token is valid or not
  let userData;
  try {
    userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    console.log("userdata",userData);
    // check passed
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "invalid token" });
  }

  // check if user is in database or not
  try {
    const token = await tokenService.findRefreshToken(
      userData.id,
      refreshTokenFromCookie
    );

    console.log("token-", token);

    if (!token) {
      return res.status(401).json({ msg: "token not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "internal error" });
  }
  // check if valid user
  const user = await userService.findUser({ _id: userData.id });
  if (!user) {
    return res.status(401).json({ msg: "user is not found" });
  }
  // create new tokens
  const { refreshToken, accessToken } = await tokenService.generateTokens({
    _id: userData.id,
  });

  // update refresh token
  try {
    await tokenService.updateRefreshToken(userData.id, refreshToken);
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }

  // add them in cookies
  const userdto = new UserDTO(user);

  res
    .status(200)
    .cookie("refreshtoken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })
    .cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    })
    .json({ user: userdto, auth: true });
};
