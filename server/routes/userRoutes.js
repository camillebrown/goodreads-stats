const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUser,
} = require("../controllers/userControllers");
const isLoggedIn = require("./middleware/isLoggedIn");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/:id").get(isLoggedIn, getUser);

module.exports = router;
