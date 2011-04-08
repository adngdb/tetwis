var util = require('util'),
    http    = require('http'),
    io = require('socket.io');

util.log('Starting server...');

server = http.createServer(function(req, res){});
socket = io.listen(this.server);

server.listen(9309);

socket.on('connection', function(conn){
    util.log('Connection accepted');
}

util.log('Server ready');
