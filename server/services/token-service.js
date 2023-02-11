const jwt = require("jsonwebtoken");
const RefreshModel = require("../models/RefreshModel");
const accessTokenSecret = "thisisaccesstokensecret";
const refreshTokenSecret = "thisisrefreshtokensecret";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1m",
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
        userid: userId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }

  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenSecret);
  }

  async findRefreshToken(userid, refreshtoken) {
    return await RefreshModel.findOne({
      userid: userid,
      tokens: refreshtoken,
    });
  }

  async updateRefreshToken(userid, refreshtoken) {
    return await RefreshModel.updateOne(
      { userid: userid },
      { token: refreshtoken }
    );
  }
}

module.exports = new TokenService();
