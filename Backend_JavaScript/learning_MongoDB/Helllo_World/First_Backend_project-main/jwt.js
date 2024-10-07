const jwt = require("jsonwebtoken");
const jwtAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split("")[1];
  if (!token) return res.status(404).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Invaid Token" });
  }
};
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET);
};
module.exports = { jwtAuthMiddleware, generateToken };
