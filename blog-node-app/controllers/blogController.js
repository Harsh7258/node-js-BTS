const multer = require("multer");
const path = require("path");
const Blog = require("./../models/blog.model");
const Comment = require("./../models/comment.blog");

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

const getBlogs = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate( "createdBy" );
    const comments = await Comment.find({ blogBy: req.params.id }).populate("createdBy");

    return res.render("blog", {
        title: 'Blogs',
        user: req.user,
        blog,
        comments
    });
};

const postComment = async (req, res) => {
  // console.log(req.user);
  await Comment.create({ 
    content: req.body.content,
    blogBy: req.params.blogId,
    createdBy: req.user.id
   });

   return res.redirect(`/blog/${req.params.blogId}`);
};

const uploadCoverImage = async (req, res) => {
  const { title, body } = req.body;
  // console.log(req.body);
  // console.log(req.user)
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user.id,
    coverImage: `/uploads/${req.file.filename}`,
  });
  // console.log(blog._id)
  return res.redirect(`/blog/${blog._id}`);
};

module.exports = { upload, uploadCoverImage, getBlogs, postComment };