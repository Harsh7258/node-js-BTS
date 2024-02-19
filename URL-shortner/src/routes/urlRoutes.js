const express = require("express");
const urlController = require("../controllers/urlController");

const router = express.Router();

router.post("/", urlController.handleGenerateNewShortURL);
router.get("/:url", urlController.getURLByid);
router.get('/analytics/:id', urlController.handleGetAnalytics);

module.exports = router;