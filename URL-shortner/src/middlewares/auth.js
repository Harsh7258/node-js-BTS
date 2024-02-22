const { getUser } = require("./../service/jwtBased");

async function loggedInUser(req, res, next) {
    const userUid = req.cookies.uid;
    // console.log(req.cookies.uid);

    if(!userUid) return res.redirect("/login");
    const user = getUser(userUid);
    // console.log(user);
    
    if(!user) return res.redirect("/login");

    req.user = user;
    // console.log(req.user);
    next();
};

async function checkAuth(req, res, next) {
    const userUid = req.cookies.uid;
    // console.log(req.cookies.uid);
    const user = getUser(userUid);
    // console.log(user);

    req.user = user;
    // console.log(req.user);
    next();
};

module.exports = { loggedInUser, checkAuth };