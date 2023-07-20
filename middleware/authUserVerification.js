const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtVerification = (req, res, next) => {
  // Get auth header VALUES
  try {
    let token = req.cookies.token;
    const userPayload = jwt.verify(token, process.env.NODE_JWT_SIGN_TOKEN_KEY);
    req.userPayload = userPayload;
    next();
  } catch {
    res.clearCookie("token");
    res.redirect("/login");
  }
};
 
module.exports = {
  jwtVerification,
};
   