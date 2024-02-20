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

module.exports = router;