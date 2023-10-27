const express = require("express");
const session = require("express-session");
const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;

const app = express();

const routes = require("./routes/userRoutes");
const config = require("./config/config");

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET_HERE",
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, callback) {
  callback(null, user);
});
passport.deserializeUser(function (object, callback) {
  callback(null, object);
});

passport.use(
  new facebookStrategy(
    {
      clientID: config.facebookAuth.clientID,
      clientSecret: config.facebookAuth.clientSecret,
      callbackURL: config.facebookAuth.callbackURL,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      //   console.log(profile);
      return done(null, profile);
    }
  )
);

app.use("/", routes);

app.listen(port, () => {
  console.log("Server is started at " + port);
});
