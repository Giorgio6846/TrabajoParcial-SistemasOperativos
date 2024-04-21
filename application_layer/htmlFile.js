const http = require("http");
const fs = require('fs').promises;
const path = require('path')

const server = http.createServer(requestListener);
const host = 'localhost';
const port = 8000;

let indexFile;

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexFile);
};

fs.readFile(path.join(__dirname + '/../presentation_layer/index.html'))
    .then(contents => {
        indexFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch( err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    })