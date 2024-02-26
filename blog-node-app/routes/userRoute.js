const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

router.get("/signin", (req, res) => {
    return res.render("signin", {
        title: 'Sign In'
    });
})
router.get("/signup", (req, res) => {
    return res.render("signup", {
        title: 'Sign Up'
    })
});

router.get("/logout", userController.clearCookieToLogout);
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

module.exports = router;