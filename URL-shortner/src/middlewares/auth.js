const { getUser } = require("./../service/jwtBased");

function cookiesToken(req, res, next) {
    const userJwt = req.cookies?.jwt;
    req.user = null;
    // console.log(userJwt);

    if(!userJwt) return next();

    const token = userJwt;
    const user = getUser(token);
    req.user = user;

    // console.log("ldl",user)
    return next();
};

function restrictTo(roles = []){
    return function (req, res, next) {
        // console.log('maaki ',req.user)
        if(!req.user) return res.redirect("/login");

        const restrict = req.user.role;
        // console.log(restrict)
        if(!roles.includes(restrict)) return res.end("unAuthorized");

        return next();
    }
}

// async function loggedInUser(req, res, next) {
//     // const userUid = req.cookies.uid;
//     const userUid = req.headers["authorization"]
//     // console.log(userUid);

//     if(!userUid) return res.redirect("/login");
//     const token = userUid.split('Bearer ')[1];
//     // console.log('token',token);
//     const user = getUser(token);
//     // console.log(user);
    
//     if(!user) return res.redirect("/login");

//     req.user = user;
//     // console.log(req.user);
//     next();
// };

// async function checkAuth(req, res, next) {
//     // const userUid = req.cookies.uid;

//     const userUid = req.headers["authorization"];
//     // console.log(req.cookies.uid);
//     const token = userUid.split('Bearer ')[1];
//     // console.log('token',token);
//     const user = getUser(token);
//     // console.log(user);

//     req.user = user;
//     // console.log(req.user);
//     next();
// };

module.exports = { cookiesToken, restrictTo };