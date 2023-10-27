const passport = require("passport");
const express = require("express");
const axios = require("axios");

const router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

router.get("/", (req, res) => {
  res.render("pages/index.ejs");
});

router.get("/profile", isLoggedIn, (req, res) => {
  console.log(req.user);
  res.render("pages/profile.ejs", {
    user: req.user,
  });
});

router.get("/error", isLoggedIn, (req, res) => {
  res.render("pages/error.ejs");
});

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/error",
  })
);

router.get("/logout", (req, res) => {
  req.logout(); // Passport's logout method
  res.redirect("/"); // Redirect to the home page or any other page after logout
});

module.exports = router;
