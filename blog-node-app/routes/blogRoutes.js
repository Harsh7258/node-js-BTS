const express = require("express");
const blogController = require("./../controllers/blogController");

const router = express.Router();

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        title: 'Blog',
        user: req.user
    });
});

router.post("/", blogController.upload.single('coverImage'), blogController.uploadCoverImage);

module.exports = router;