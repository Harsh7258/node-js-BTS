const express = require("express");
const multer = require("multer");
const path = require("path")

const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage })

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'))

app.get("/", (req, res) => {
    console.log(`${req.method}: ${new Date().toISOString()}`);

    return res.status(200).render("homepage", {
        title: 'Homepage',
    });
});

app.post("/upload", upload.single('profileimage'),(req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    console.log(`Uploaded Successfully: ${req.file.originalname} type: ${req.file.mimetype}`);

    // <!-- <% if (message) { %>
    //     <div class="upload-success-message">
    //       <p><%= message %></p>
    //     </div>
    //   <% } %> -->

    return res.redirect("/");
    //  res.render("homepage", {
    //     message: `Uploaded Successfully: ${req.file.originalname} type: ${req.file.mimetype}`
    //  })
})

app.listen(PORT, () => console.log(`server running... ${PORT}`));