// const shortid = require("shortid");
const rg = require('rangen');
const URL = require("../models/url.models");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
//   console.log(body.shortId)

  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = rg.id({ length: 8 });
  // console.log(shortID);

  await URL.create({
    url: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.status(200).json({ 
      status: "success",
      id: shortID,
      message: `ID generated for ${body.url}`
    });
};

async function getURLByid (req, res) {

  try {
    const redirect = req.params.url;
    // console.log(redirect)
  
    const entry = await URL.findOneAndUpdate({ redirect }, {
      $push: {
        visitHistory: {
          timestamp: Date.now()
        }
      }
    });

    if (!entry) {
      console.log("No document found to update.");
    } else {
      console.log("Document updated successfully:", entry);
    }

    return res.status(301).json({
      status: "pending...",
      data: entry,
      message: `Error: ${entry} value on findOneAndUpdate()`
    });
  } catch (error) {
    console.log(error)
  };
};

async function handleGetAnalytics(req, res) {
  const shortId = req.params.id;
  const result = await URL.findById({ _id: shortId });
  return res.json({
    status: "success",
    data: result
    // totalClicks: result.visitHistory.length,
    // analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  getURLByid,
  handleGetAnalytics
};