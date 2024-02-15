const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const log = `${new Date().toString()}: [${req.url}] New Request received\n`;

    // Non-blocking operation....
    fs.appendFile('log.txt', log, (err, data) => {
        switch (req.url) {
            case '/':
                res.end('Hello from server!!')
                break;
            case '/about':
                res.end('Jadon Sancho Server entered!!')
                break;
            default:
                res.end("404 NOT FOUND");
        }
    });
});

const port = 8000;

server.listen(port, () => {
    console.log(`Server started on port: ${port}`)
});