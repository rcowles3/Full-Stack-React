/*
  * Telling passport specifically on how our users are going to use passport to
  * to authenticate into application.
  * Passport is making use of cookies to keep track of users logging in/out
*/

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

// Puts uniquie identifying information into the browser cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // record already exists with given profile id.
        return done(null, existingUser);
      }
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }

    // (accessToken, refreshToken, profile, done) => {
    //   User.findOne({ googleId: profile.id }).then(existingUser => {
    //     if (existingUser) {
    //       // record already exists with given profile id.
    //       done(null, existingUser);
    //     } else {
    //       new User({ googleId: profile.id })
    //         .save()
    //         .then(user => done(null, user));
    //     }
    //   });
    // }
  )
);
