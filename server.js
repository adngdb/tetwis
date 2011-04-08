var util    = require('util'),
    http    = require('http'),
    io      = require('socket.io');

util.log('Starting server...');

server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>Hello world</h1>');
});
server.listen(9309);

socket = io.listen(server);

socket.on('connection', function(conn){
    util.log('Connection accepted');
});

util.log('Server ready');
