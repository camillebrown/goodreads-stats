const express = require("express");
const { getUser } = require("../controllers/userControllers");
const isLoggedIn = require("../middleware/isLoggedIn");

const router = express.Router();

router.route("/:id").get(isLoggedIn, getUser);

module.exports = router;
