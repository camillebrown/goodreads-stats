const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode);

  if (err.code === 11000) {
    res.status(400).json({ message: "Book Already Saved" });
  } else if (statusCode === 500 && err.message === "User not logged in") {
    res.json({
      message: err.message,
      action: "redirect",
      redirectTo: "/login",
    });
  } else {
    res.json({
      message: err.message || "An unexpected error occurred",
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
};

module.exports = { errorHandler };
