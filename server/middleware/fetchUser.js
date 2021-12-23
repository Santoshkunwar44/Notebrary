const JWT = require("jsonwebtoken");
const JWT_SECRET = "tokenfromsantosh$";
const fetchUser = async (req, res, next) => {
  //  get the user from the jwt token and add id to the req object

  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({
      success: false,
      error: "should not be empty",
    });
  }
  console.log(token);
  try {
    const string = JWT.verify(token, JWT_SECRET);
    req.user = string.user;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      error: "please authenticate using the valid token",
    });
  }
};

module.exports = fetchUser;
