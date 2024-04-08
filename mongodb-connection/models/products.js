const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    prize: {
        type: Number,
    }
}, { timestamps: true })

const Products = mongoose.model('Products', productSchema)
module.exports = Products