const express = require("express");
const router = express.Router();

const {
  testRoute,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookControllers");
const isLoggedIn = require("../middleware/isLoggedIn");


router.route("/test").get(testRoute);
router.route("/").get(isLoggedIn, getBooks);
router.route("/").post(isLoggedIn, createBook);
router.route("/:id").put(isLoggedIn, updateBook);
router.route("/:id").delete(isLoggedIn, deleteBook);

module.exports = router;
