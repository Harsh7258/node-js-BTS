const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/authentication");

const userRoute = require("./routes/userRoute");

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

app.get("/", (req, res) => {
    return res.render("home", {
        title: "Home",
        user: req.user,
        // name: req.user.email
    });
});

app.use("/user", userRoute)

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});