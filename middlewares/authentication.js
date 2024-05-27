const { verifyUserByToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookiename) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookiename];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = verifyUserByToken(tokenCookieValue);
      req.user = userPayload;
      return next();
    } catch (error) {}
    return next();
  };
}

module.exports = { checkForAuthenticationCookie };
