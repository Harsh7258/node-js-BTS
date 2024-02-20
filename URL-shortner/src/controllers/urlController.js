// const shortid = require("shortid");
const rg = require('rangen');
const URL = require("../models/url.models");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    // console.log(body.url)
    if (!body.url) return res.status(400).json({ error: "url is required" });
    const shortID = rg.id({ length: 8 });

    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    console.log(`${req.method}: ${req.path}`);
    return res.status(201).json({ 
      status: "success",
      id: shortID 
    });
};

async function getUrlRedirect (req, res) {

  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: `${new Date().toLocaleString()}`,
        },
      },
    }
  );
  // console.log(entry.redirectURL);

  if (!entry) {
    console.log("No document found to update.");
  } else {
    console.log(`Document updated successfully: ${req.method}`);
  };

  res.status(301).redirect(entry.redirectURL);
};

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  console.log(`${req.method}: ${req.path}`);
  return res.status(200).json({
    status: "success",
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  getUrlRedirect
};