const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const URL = require("./src/models/url.models");

const urlRoute = require("./../URL-shortner/src/routes/urlRoutes");

const app = express();
const PORT = 8001;
dotenv.config({path: './.env'});

const DB = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => {
    console.log('Database connected!!');
}).catch((err) => console.log(err));

app.use(express.json());
app.use("/api/v1/urls", urlRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});