const express = require("express");
const path = require("path");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve( './views' ));

app.get("/", (req, res) => {
    return res.render("home", {
        title: "HomePage"
    });
});

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});