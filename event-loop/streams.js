const fs = require("fs");
const server = require("http").createServer();

server.on("request",(req, res) => {
    // solution 1
    // fs.readFile('test.txt', (err, data) => {
    //     if (err) console.log('error');
    //     res.end(data);
    // })

    // solution 2: STREAMS
    // const readable = fs.createReadStream("test.txt");
    // readable.on("data", chunk => {
    //     res.write(chunk);
    // });
    // readable.on("end", () => {
    //     res.end();
    // });
    // readable.on("error", err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('file not found!');
    // })

    // solution 3: PIPE METHOD
    const readable = fs.createReadStream('test.txt');
    readable.pipe(res);
    // readableSource.pipe(writeableDest);
})

server.listen(8000, '127.0.0.1', () => {
    console.log('listening..');
})