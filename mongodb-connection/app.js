const express = require("express")
const bodyParser = require("body-parser")
require("dotenv").config()

const mongoController = require("./mongoose")

const app = express()
const PORT = 3000

app.use(bodyParser.json())

app.post('/products', mongoController.createProducts)
app.get('/products', mongoController.getProducts)


app.listen(PORT, () => {
    console.log(`server started at: ${PORT}`)
})
