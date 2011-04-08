var sys             = require("util"),
    http            = require('http'),
    io              = require('socket.io'),
    Game            = require("./lib/game.js"),
    Client          = require("./lib/client.js"),
    MessageParser   = require("./lib/message-parser.js");

sys.log("Starting server... ");

var port = 9309;

var server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html', 'Location': 'http://tetwis.lqbs.fr'});
    res.end('');
});

server.listen(port);

var socket = io.listen(server);

var game = new Game(server).init().start();
var parser = new MessageParser(game);

socket.on('connection', function(conn){
{
    sys.log('Client connected');
    new Client(conn, game, server, parser).init();
});

sys.log("Server created. Listening on port " + port + ". ");
