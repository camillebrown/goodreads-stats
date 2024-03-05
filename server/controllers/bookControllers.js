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
  const foundUser = await User.findOne({ _id: req.body._id }).populate("books");

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
  console.log(req.body);
  res.status(201).json({});
  const {
    book_name,
    author,
    rating,
    start_date,
    end_date,
    page_count,
    category,
    user,
  } = req.body;
  //   const meal = await Meal.create({
  //     meal_name,
  //     protein,
  //     fat,
  //     carbs,
  //     total_calories,
  //     user: user._id,
  //   });

  //   if (meal) {
  //     const user = await User.findById({ _id: meal.user });
  //     user.meals.push(meal);
  //     await user.save();
  //     res.status(201).json({
  //       _id: meal._id,
  //       meal_name: meal_name,
  //       protein: protein,
  //       fat: fat,
  //       carbs: carbs,
  //       total_calories: total_calories,
  //     });
  //   } else {
  //     res.status(400);
  //     throw new Error('Error occurred: Unable to create new meal');
  //   }
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
const deleteBook = (req, res) => {
  console.log(req.body);
  // res.status(200);
};

module.exports = { testRoute, getBooks, createBook, updateBook, deleteBook };
