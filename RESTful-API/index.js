const express = require("express");
const { logReqRes } = require("./middlewares/index");
const userRouter = require("./routes/userRoutes");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

//Middlware
app.use(logReqRes("log.txt"));

app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
// comment