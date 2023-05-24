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
    _id: user._id,
    activated: false,
  });

  await tokenService.storeRefreshToken(refreshToken, user._id);

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
    .json({ user: user });
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
    // console.log("userfromaceesstoken", user);
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
      user._id,
      { name, photo: user.photo, activated: true },
      { new: true }
    );
    // console.log("updatedUser", updatedUser);
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
  // get refresh token
  const { refreshtoken: refreshTokenFromCookie } = req.cookies;

  // console.log(refreshTokenFromCookie)

  // check if token is valid or not
  let userdata;
  try {
    userdata = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    // console.log(userdata)
  } catch (err) {
    return res.status(401).json({ message: "invalid token" });
  }

  // check if token is in database or not
  try {
    const token = await tokenService.findRefreshToken(
      userdata._id,
      refreshTokenFromCookie
    );
    // console.log(token)
    if (!token) {
      return res.status(401).json({ message: "invalid token" });
    }
  } catch (err) {
    return res.status(500).json({ message: "internal error" });
  }

  // check if user is valid
  const user = await userService.findUser({ _id: userdata._id });
  console.log(user);
  if (!user) {
    return res.status(401).json({ message: "invalid user" });
  }

  // generate new token
  const { refreshToken, accessToken } = tokenService.generateTokens({
    _id: userdata._id,
  });

  // update refreshtoken
  try {
    await tokenService.updateRefreshToken(userdata._id, refreshToken);
  } catch (err) {
    return res.status(500).json({ message: "internal error" });
  }

  // put in cookie
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
    .json({ user: user });
};

exports.logout = async (req, res) => {
  // delete refresh token from db
  const { refreshtoken } = req.cookies;
  await tokenService.removeToken(refreshtoken);
  // clear cookie
  res
    .clearCookie("refreshtoken")
    .clearCookie("accessToken")
    .status(200)
    .json({ user: null, auth: false });
};
