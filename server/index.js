const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();

    const log = `${new Date().toISOString()}: [${req.method}] [${req.url}] -- New Request received\n`;
    const myURL = url.parse(req.url, { parseQueryString: true });
    // console.log(myURL);

    // Non-blocking operation....
    fs.appendFile('log.txt', log, (err, data) => {
        switch (myURL.pathname) {
            case '/':
                if (req.method === "GET") return res.end('Hello from server!!')
                break;
            case '/about':
                const username = myURL.query.name;
                res.end(`Hyy ${username}`)
                break;
            case '/search':
                const search = myURL.query.search_query;
                if (req.method === "GET") {
                    res.end(`Showing the result for search: ${search}`)
                } else if (req.method === "POST") {
                    // DB query
                    res.end("success!")
                }
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