const express = require("express");
const URL = require("./../models/url.models");

const router = express.Router();

router.get("/", async (req, res) => {
    if(!req.user) return res.redirect("/login");
    // console.log(req.user);

    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
      title: "Homepage",
      urls: allUrls
    });
  });

router.get("/signup", (req, res) => {
  return res.render("signUp", {
    title: "SignUp"
  });
});

router.get("/login", (req, res) => {
  return res.render("logIn", {
    title: "Login"
  });
});

module.exports = router;