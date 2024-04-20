const fs = require('fs')
const http = require('http');
const index = fs.readFileSync('../presentation_layer/index.html')

const host = 'localhost'
const port = 8080;

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end("My first server!");
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})
