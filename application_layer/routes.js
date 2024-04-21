const http = require("http");
const express = require('express')

const app = express()

const host = 'localhost';
const port = 8000;

app.get('/', (req, res) => {
    response.send('Hello World!')
})

const requestListener = function (req, res) {};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

