
var http = require('http');

var server = http.createServer(function (req, res) {
    res.end("Hola~");
});

server.listen(8076);

console.log("server running on http://localhost:8076");