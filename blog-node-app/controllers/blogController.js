const multer = require("multer");
const path = require("path");
const Blog = require("./../models/blog.model");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads`));
      },
      filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
      },
});

const upload = multer({ storage: storage });

const uploadCoverImage = async (req, res) => {
    const { title, body } = req.body;
    // console.log(req.file);
    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImage: `/uploads/${req.file.filename}`,
    });
    // console.log(blog)
    return res.redirect(`/blog/${blog._id}`);
  };

module.exports = { upload, uploadCoverImage };