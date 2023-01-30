const jwt = require("jsonwebtoken");
const RefreshModel = require("../models/RefreshModel");

const accessTokenSecret = "thisisaccesstokensecret";
const refreshTokenSecret = "thisisrefreshtokensecret";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });
    return { accessToken, refreshToken };
  }

  async storeRefreshToken(token, userId) {
    try {
      await RefreshModel.create({
        tokens: token,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new TokenService();
