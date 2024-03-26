const asyncHandler = require("express-async-handler");

const Book = require("../models/Book");
const User = require("../models/User");

const testRoute = asyncHandler(async (req, res) => {
  res.send("book route testing!");
});

/***
 * @action GET USER BOOKS
 * @route http://localhost:8080/api/books
 * @method GET
 */

const getBooks = asyncHandler(async (req, res) => {
  const foundUser = await User.findOne({ _id: req.params.id }).populate(
    "books"
  );

  if (foundUser) {
    res.status(201).json(foundUser.books);
  } else {
    res.status(400);
    throw new Error("Error Occurred: Unable to get user books");
  }
});

/***
 * @action ADD A NEW BOOK
 * @route http://localhost:8080/api/books
 * @method POST
 */
const createBook = asyncHandler(async (req, res) => {
  const book = await Book.create({ ...req.body, user: req.user._id });

  if (book) {
    const user = await User.findById({ _id: book.user });
    user.books.push(book);
    await user.save();
    res.status(200).json({ ...book });
  } else {
    res.status(400);
    throw new Error("Error occurred: Unable to create new book");
  }
});

/***
 * @action UPDATE AN EXISTING BOOK
 * @route http://localhost:8080/api/books/:id
 * @method PUT
 */
const updateBook = asyncHandler(async (req, res) => {
  console.log(req.body);
  // const { email, password } = req.body;
  // const user = await User.findOne({ email });

  // if (user && (await user.matchPassword(password))) {
  //   res.json({
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     pic: user.pic,
  //     token: generateToken(user._id),
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error('Invalid Email or Password!');
  // }
});

/***
 * @action DELETE AN EXISTING BOOK
 * @route http://localhost:8080/api/books/:id
 * @method DELETE
 */
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findOne({
    _id: req.params.id,
    user: req.session.user._id,
  });
  if (!book) {
    return res
      .status(404)
      .send("Book not found or does not belong to the user");
  }

  await Book.deleteOne({ _id: req.params.id });

  await User.findByIdAndUpdate(req.session.user._id, {
    $pull: { books: req.params.id },
  });

  res.status(200).send("Book deleted successfully");
});

module.exports = { testRoute, getBooks, createBook, updateBook, deleteBook };
