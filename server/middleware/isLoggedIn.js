module.exports = (req, res, next) => {
  req.session.returnTo = req.originalUrl;
  if (!req.session.user) {
    const error = new Error("User not logged in");
    error.status = 500; 
    next(error);
  } else {
    next();
  }
};


