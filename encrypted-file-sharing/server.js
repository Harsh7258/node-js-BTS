const express = require("express");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");

const File = require("./models/file.model");

const app = express();
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE_URL).then(() => console.log('Database connected!')).catch((error) => console.log(error));

app.set("view engine", "ejs");
app.set("views", path.resolve( './views' ));

const upload = multer({ dest: 'uploads' });

app.get("/", (req, res) => {
    console.log(`${req.method}: ${new Date().toISOString()}`);

    return res.render("index", {
        title: 'encryption'
    });
});

app.post("/upload", upload.single('file'), async (req, res) => {
    console.log(`${req.method}: ${new Date().toISOString()}`);
    

    const fileData = {
        filePath: req.file.path,
        originalName: req.file.originalname
    };
    const password = req.body.password;
    // console.log(password);

    if(req.body.password != null && req.body.password !== "") {
        fileData.password = await bcrypt.hash(password, 10);
    };

    const file = await File.create(fileData);
    // console.log(file);
    console.log('server host:', req.headers.origin);

    res.render("index", {
        title: 'ecryption',
        fileLink: `${req.headers.origin}/file/${file.id}` 
    });
});

app.route("/file/:id").get(handleDownload).post(handleDownload);

async function handleDownload(req, res) {
    console.log(`${req.params}: ${new Date().toISOString()}`)
    const findFile = await File.findById(req.params.id);

    if (findFile.password != null) {
        if (req.body.password == null) {
          res.render("password", { title: "Password error" })
          return
        }
    
        if (!(await bcrypt.compare(req.body.password, findFile.password))) {
          res.render("password", { error: true, title: 'download file' })
          return
        }
      }

    findFile.downloadCount++
    await findFile.save();
    // console.log(findFile.downloadCount)

    res.download(findFile.filePath, findFile.originalName);
    // await res.download(findFile.filePath, findFile.originalName, (err) => {
    //     if (err) {
    //       console.error('Error downloading file:', err);
    //       return res.status(500).send('Error downloading file');
    //     }
    //     res.redirect('/'); // Redirect to home page after successful download
    //   });
    // res.send("downloading..")
}

app.listen(PORT, () => {
    console.log(`server running: ${PORT}`);
});