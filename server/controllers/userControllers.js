const asyncHandler = require("express-async-handler");

const keys = require("../config/keys");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const getUser = asyncHandler(async (req, res) => {
  const foundUser = await User.findOne({ _id: req.params.id }).populate(
    "books"
  );

  if (foundUser) {
    res.status(201).json({
      id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      books: foundUser.books,
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred: Unable to get user");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

const logout = (req, res) => {
  req.session = null;

  res.clearCookie(keys.cookieKey);
  res.status(200).send("Logged out successfully");
};

module.exports = { getUser, registerUser, loginUser, logout };
