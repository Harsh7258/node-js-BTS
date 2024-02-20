const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const URL = require("./src/models/url.models");
const {connectToMongoDB} = require("./dbConnection");

const urlRoute = require("./../URL-shortner/src/routes/urlRoutes");

const app = express();
const PORT = 8001;
dotenv.config({path: './.env'});

// connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
//   console.log("Mongodb connected")
// );

const DB = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => {
    console.log('Database connected!!');
}).catch((err) => console.log(err));

app.use(express.json());
app.use("/api/v1/urls", urlRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});