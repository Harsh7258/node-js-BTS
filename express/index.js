const express = require("express");

const app = express();
const port = 8000;

app.get('/', (req, res) => {
    console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`)
    return res.send('Hello from express!')
});

app.get('/about', (req, res) => {
    console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`)
    return res.send('Its Jadon Sancho here..')
});

app.listen(port, () => {
    console.log(`Server is runnig on port: ${port}`)
});