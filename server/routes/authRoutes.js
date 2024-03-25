const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/User");

module.exports = (app) => {
  app.get("/api/current_user", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ msg: "User token not provided, not authorized." });
    }

    try {
      const decoded = jwt.verify(token, keys.jwtSecret);
      req.user = decoded;
    } catch (error) {
      if (error.message === "jwt expired") {
        return res.status(401).json({ msg: "Token expired. Route to login" });
      } else
        return res
          .status(500)
          .json({ msg: "An error occurred trying to verify your token" });
    }

    // Now that we know the token is valid, find the user in the database
    User.findById(req.user.id)
      .then((user) => {
        if (!user) {
          res.status(404).send(null);
        } else {
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
          });
        }
      })
      .catch((error) => {
        res.status(500).send(null);
      });
  });
};
