const bcrypt = require("bcryptjs");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./keys");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../models/User");

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// Local strategy (email and password)
passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Email not found." });
      }

      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      });
    });
  })
);

// Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google_client_id,
      clientSecret: keys.google_client_secret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

module.exports = passport;
