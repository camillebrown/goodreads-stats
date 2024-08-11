const express = require("express");
const {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();

router.get("/current_user", getCurrentUser);
router.post("/login", loginUser);
router.post("/signup", registerUser);
router.get("/logout", logoutUser);

module.exports = router;
