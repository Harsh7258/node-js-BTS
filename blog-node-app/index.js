const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const userRoute = require("./routes/userRoute");

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/blogBlog')
    .then(() => console.log('Mongoose local database connected!!'))
    .catch((err)=> console.log(err));

app.set("view engine", "ejs");
app.set("views", path.resolve( './views' ));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    return res.render("home", {
        title: "HomePage"
    });
});

app.use("/user", userRoute)

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});