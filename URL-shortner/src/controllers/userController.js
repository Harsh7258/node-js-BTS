const { v4: uuidv4 } = require('uuid');
const User = require("./../models/user.models");

async function userSignup(req, res) {
    const { name, email, password } = req.body;
    // console.log(req.body);

    await User.create({
        name,
        email,
        password
    });
    console.log(`${req.method}: ${req.path} Signup`);

    return res.status(301).redirect("/");
};

async function userLogin(req, res) {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await User.findOne({
        email,
        password
    });
    console.log(`${req.method}: ${req.path} Login`);

    if(!user) return res.render("logIn", {
        title: "Login",
        error: "Invalid username or password. Please try again!!"
    });

    const sessionId = uuidv4();
    console.log(sessionId);
    return res.status(301).redirect("/");
};

module.exports = { userSignup, userLogin };