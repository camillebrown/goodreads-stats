const express = require("express");
const router = express.Router();

const {
  testRoute,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookControllers");

router.route("/test").get(testRoute);
router.route("/").get(getBooks);
router.route("/").post(createBook);
router.route("/:id").put(updateBook);
router.route("/:id").delete(deleteBook);

module.exports = router;
