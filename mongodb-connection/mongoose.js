const mongoose = require("mongoose")
const Products = require("./models/products");

mongoose.connect(process.env.DATABASE_URL).then(() => { console.log('Connected databases!!') }).catch(() => { console.log('connection failed') })

const createProducts = async (req, res, next) => {
    const newProduct = new Products({
        name: req.body.name,
        prize: req.body.prize
    })

    console.log(req.body)
    const result = await newProduct.save()

    res.status(200).json(result)
}

const getProducts = async (req, res, next) => {
    const result = await Products.find()
    res.status(200).json(result)

}

module.exports = {createProducts, getProducts}