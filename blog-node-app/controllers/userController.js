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
    try {
        const token = await User.matchPassword(email, password);

    // console.log("promise", token);
    return res.cookie("jwt", token).redirect("/");
    } catch (error) {
        return res.render("signin", {
            title: 'Sign In',
            error: 'Incorrect Email or Password. Please try again!'
        });
    };
};

const clearCookieToLogout = (req, res) => {
    res.clearCookie('jwt').redirect("/");
};

module.exports = { signup, signin, clearCookieToLogout };