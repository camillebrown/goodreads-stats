const User = require("../models/User");
const passport = require("passport");

const getCurrentUser = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ msg: "Not authenticated" });
  }

  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
};

const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ msg: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    });
  })(req, res, next);
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
    });

    await user.save();

    req.logIn(user, (err) => {
      if (err)
        return res.status(500).json({ msg: "Login after signup failed" });
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ msg: "Failed to log out" });
    }
    res.json({ msg: "Logged out successfully" });
  });
};

module.exports = { getCurrentUser, registerUser, loginUser, logoutUser };
