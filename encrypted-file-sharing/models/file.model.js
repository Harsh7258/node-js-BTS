const mongoose = require("mongoose");

const file = new mongoose.Schema({
    filePath: {
        type: String,
        required: true,
      },
    originalName: {
        type: String,
        required: true,
      },
    password: String,
    downloadCount: {
        type: Number,
        required: true,
        default: 0,
      }
}, { timestamps: true });

const File = mongoose.model("File", file);

module.exports = File;