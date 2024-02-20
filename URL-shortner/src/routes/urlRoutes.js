const express = require("express");
const urlController = require("../controllers/urlController");

const router = express.Router();

router.post("/", urlController.handleGenerateNewShortURL);
router.get("/:shortId", urlController.getUrlRedirect);
router.get('/analytics/:shortId', urlController.handleGetAnalytics);

module.exports = router;