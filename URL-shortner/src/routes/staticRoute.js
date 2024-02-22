const express = require("express");
const URL = require("./../models/url.models");

const router = express.Router();

router.get("/", async (req, res) => {

    const allUrls = await URL.find({});
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