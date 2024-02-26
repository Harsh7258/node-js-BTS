const User = require("./../models/user.model");

const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    const user = await User.create({
        fullname,
        email,
        password
    });

    return res.redirect("/")
    // res.status(201).json({
    //     status: 'success',
    //     user,
    // })
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.matchPassword(email, password);

    console.log("promise", user);
    return res.redirect("/");
}

module.exports = { signup, signin };