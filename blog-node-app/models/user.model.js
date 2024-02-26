const mongoose = require("mongoose");
const crypto = require("crypto");
const { createTokenForUser } = require("./../service/authentication");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profileImage: {
        type: String,
        default: '/images/default.png'
    }
}, { timestamps: true });

//DOCUMENT MIDDLEWARE
userSchema.pre("save", function(next) {
    const user = this; // this is the current user
    // console.log(user);

    if(!user.isModified("password")) return;

    const salt = crypto.randomBytes(16).toString();
    // console.log(salt);
    const hashedPassword = crypto.createHmac('sha256', salt).update(user.password).digest('hex');
    // console.log(hashedPassword);

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

//MONGOOSE VIRTUAL FUNCTION
userSchema.static("matchPassword", async function(email, password) {
    const user = await this.findOne({ email });
    // console.log(user);

    if(!user) throw new Error("User not found!");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = crypto.createHmac('sha256', salt).update(password).digest('hex');

    if (hashedPassword !== userProvidedHash)
      throw new Error("Incorrect Password");

    const token = createTokenForUser(user);
    return token;
});

const User = mongoose.model("User", userSchema);

module.exports = User;