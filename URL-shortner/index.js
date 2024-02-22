const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

const URL = require("./src/models/url.models");
const {connectToMongoDB} = require("./dbConnection");
const { loggedInUser, checkAuth } = require("./../URL-shortner/src/middlewares/auth");

const urlRoute = require("./../URL-shortner/src/routes/urlRoutes");
const staticRoute = require("./../URL-shortner/src/routes/staticRoute");
const userRoute = require("./../URL-shortner/src/routes/userRoutes");

const app = express();
const PORT = 8001;
dotenv.config({path: './.env'});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
//   console.log("Mongodb connected")
// );

const DB = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => {
    console.log('Database connected!!');
}).catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/urls", loggedInUser, urlRoute);
app.use("/", checkAuth,staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});