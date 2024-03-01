const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/authentication");

const Blog = require("./models/blog.model");
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoutes");
const User = require("./models/user.model");

const app = express();
const PORT = 8000;

dotenv.config({ path: './.env' })

mongoose.connect('mongodb://localhost:27017/blogBlog')
    .then(() => console.log('Mongoose local database connected!!'))
    .catch((err)=> console.log(err));

app.set("view engine", "ejs");
app.set("views", path.resolve( './views' ));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware.checkForAuthenticationCookie("jwt"));
app.use(express.static(path.resolve('./public')));

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    // const name = await User.findById( req.user.id ).select("fullname");
    // console.log(req.user)
    return res.render("home", {
        title: "Home",
        user: req.user,
        blogs: allBlogs,
        // userName: name.fullname,
        // name: req.user.email
    });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});