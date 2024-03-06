require("dotenv").config();
const cookieSession = require("cookie-session");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const keys = require("./config/keys");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

require("./models/User");
require("./models/Book");

mongoose.connect(keys.mongoURI);

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

////////////// MIDDLEWARE //////////////
// Every call goes thru this
app.use(
  cookieSession({
    name: 'goodreader-session',
    keys: [keys.cookieKey],
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
);

app.use(express.json());

require("./routes/authRoutes")(app);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`!!!!!!!!!!!! LISTENING ON PORT: ${PORT} !!!!!!!!!!!!`);
});
