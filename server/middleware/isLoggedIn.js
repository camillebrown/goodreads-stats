const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Authorization token not provided." });
  }

  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return res.status(401).json({ msg: "Token expired. Please log in again." });
    } else {
      return res.status(500).json({ msg: "An error occurred during token verification." });
    }
  }
};
