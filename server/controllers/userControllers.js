const asyncHandler = require("express-async-handler");
const User = require("../models/User");

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

module.exports = { getUser };
