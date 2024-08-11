const passport = require("passport");

module.exports = (app) => {
  // Route for initiating Google login
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  // Route for Google callback
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect(`${process.env.BASE_FRONTEND_URL}/browse?content=discover`);
    }
  );
};
