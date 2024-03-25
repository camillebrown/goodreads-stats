const jwt = require("jsonwebtoken");

const keys = require("../config/keys");

const generateToken = (id) => {
  const expiresIn = 24 * 60 * 60;
  const token = jwt.sign({ id }, keys.jwtSecret, { expiresIn });
  return { token, expiresIn };
};

module.exports = generateToken;
