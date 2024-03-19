if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000; 

const indexRouter = require('./routes/index');
const authorRouter = require("./routes/authors");

app.set("view engine", "ejs");
app.set("views", __dirname + '/views')
app.set("layout", "layouts/layout")
app.use(expressLayout)
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL)
        console.log(`Database connected!!: ${conn.connection.host}`)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to mongoose'));
connectDB();

app.use('/', indexRouter);
app.use("/authors", authorRouter);

app.listen(PORT, () => {
    console.log(`Server started at: ${PORT}`)
});