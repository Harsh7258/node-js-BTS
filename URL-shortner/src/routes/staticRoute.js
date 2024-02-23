const express = require("express");
const URL = require("./../models/url.models");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get("/admin/urls", restrictTo(["admin"]),async (req, res) => {
  // console.log(req.user);

  const allUrls = await URL.find({ });
  return res.render("home", {
    title: "Homepage",
    urls: allUrls
  });
});

router.get("/", restrictTo(["normal", "admin"]),async (req, res) => {
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