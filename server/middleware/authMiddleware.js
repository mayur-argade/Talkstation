const tokenService = require('../services/token-service')

exports.isLoggedin = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
     if ( !accessToken ) {
        throw new Error();
    }

    const userData = await tokenService.verifyAccessToken(accessToken);

    // console.log(userData)
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid token"})
  }
};
