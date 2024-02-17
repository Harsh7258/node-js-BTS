const User = require("../models/user.models");

exports.getAllUsersData = async (req, res) => {
    const allUsers = await User.find({ first_name });
    return res.status(200).json({
        status: "success",
        data: allUsers
    });
};

exports.getUserById = async (req, res) => {
    console.log(`${req.method} ${req.url}: ${new Date().toDateString()}`);

    const id = req.params.id;
    const user = await User.findById(id);
    if(!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
        status: "success",
        data: user
    });
};

exports.createUser = async (req, res) => {
    const body = req.body;
    if(!body.email) {
        return res.status(400).json({ message: "Email is requires." })
    }

    const result = await User.create({
        first_name: body.first_name,
        email: body.email,
        last_name: body.last_name,
        gender: body.gender,
        ip_address: body.ip_address
    });
    return res.status(201).json({
        status: "success",
        id: result._id
    });
};

exports.updateUser = async (req, res) => {
    console.log(`${req.method} ${req.url}: ${new Date().toDateString()}`);

    await User.findByIdAndUpdate(req.params.id, { last_name: "Dick" });
    return res.status(204).json({
        status: "success",
        message: "Updated!!"
    });
};

exports.deleteUser = async (req, res) => {
    console.log(`${req.method} ${req.url}: ${new Date().toDateString()}`);

    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({
        status: 'success',
        message: "Deleted..."
    });
};

