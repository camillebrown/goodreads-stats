require("dotenv").config({ path: ".env.development.local" });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

require("./config/passport");

const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

require("./models/User");
require("./models/Book");

mongoose
  .connect(keys.mongoURI)
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

const app = express();
const corsOptions = {
  origin: process.env.BASE_FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

////////////// MIDDLEWARE //////////////
// Every call goes thru this
app.use(express.json());
app.use(
  session({
    secret: keys.jwtSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/googleRoutes")(app);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`!!!!!!!!!!!! LISTENING ON PORT: ${PORT} !!!!!!!!!!!!`);
});
