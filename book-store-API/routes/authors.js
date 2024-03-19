const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");

//All authors route
router.route("/").get( authorController.getAllAuhtors).post(authorController.createAuthor);
// new authors route
router.get('/new', authorController.getNewAuthor);

module.exports = router;