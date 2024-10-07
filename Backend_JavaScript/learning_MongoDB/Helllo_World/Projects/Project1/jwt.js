/*====================================Importing Dependencies===================================*/
const jwt = require("jsonwebtoken");
require("dotenv").config();
/*==================================End Importing Dependencies=================================*/

/*==========================================Actual Code========================================*/
const jswonAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split("")[1];
  if (!token) {
    res.status(404).json("Unauthorized.");
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body = decoded;
  } catch (error) {
    console.log(error);
    res.status(500).json("Invalid Token");
  } finally {
    next();
  }
};
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "2d" });
};

/*=========================================End Actual Code=====================================*/

/*============================================Exporting========================================*/
module.exports = { jswonAuthMiddleware, generateToken };
/*==========================================End Exporting======================================*/
