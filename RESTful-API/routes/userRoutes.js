const express = require("express");
const userController = require("../controllers/userControllers");

const router = express.Router();

router.route("/").get(userController.getAllUsersData).post(userController.createUser);

// ROUTES
router.route("/:id").get(userController.getUserById).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;