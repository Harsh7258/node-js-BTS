const MongoClient = require("mongodb").MongoClient
const Products = require("./models/products");

const url = process.env.DATABASE_URL

const createProducts = async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        prize: req.body.prize
    }

    console.log(req.body)

    const client = new MongoClient(url)

    try {
        await client.connect()
        const db = client.db()
        const result = db.collection('products').insertOne(newProduct)
    } catch (error) {
        return res.json({ messge: 'Could not store data.' })
    }

    // client.close()

    res.status(200).json(newProduct)
}

const getProducts = async (req, res, next) => {
    const client = new MongoClient(url)
    let products;

    try {
        await client.connect()
        const db = client.db()
        products = await db.collection('products').find().toArray()
    } catch (error) {
        return res.json({ messge: 'Could not store data.' })
    }
    res.json(products)
}

module.exports = { createProducts, getProducts }