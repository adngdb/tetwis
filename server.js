var sys             = require("util"),
    http            = require('http'),
    io              = require('socket.io'),
    Game            = require("./lib/game.js"),
    Client          = require("./lib/client.js"),
    MessageParser   = require("./lib/message-parser.js");

sys.log("Starting server... ");

var port = 9309;

var server = http.createServer(function(req, res){
    var html =  '<!DOCTYPE html><html><head><title>Tetwis ! JavaScript powered game</title>' +
                '<link rel="stylesheet" type="text/css" href="css/main.css" />' +
                '<script src="http://tetwis.lqbs.fr/js/libs/load.js"></script>' +
                '<script>' +
                'var staticFilesServer = "http://tetwis.lqbs.fr/"' +
                'load("http://cdn.socket.io/stable/socket.io.js", staticFilesServer+"js/libs/jquery.min.js")' +
                '.then( staticFilesServer+"js/libs/jquery.timers.js", ' +
                '       staticFilesServer+"js/libs/json2.js", ' +
                '       staticFilesServer+"js/core/config.js", ' +
                '       staticFilesServer+"js/core/cell.js", ' +
                '       staticFilesServer+"js/core/brick.js", ' +
                '       staticFilesServer+"js/core/map.js", ' +
                '       staticFilesServer+"js/core/events.js", ' +
                '       staticFilesServer+"js/core/message-parser.js", ' +
                '       staticFilesServer+"js/core/socket.js", ' +
                '       staticFilesServer+"js/core/game.js")' +
                '</script>' +
                '</head><body>' +
                '<p>Loading...</p>' +
                '</body></html>';
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

server.listen(port);

var socket = io.listen(server);

var game = new Game(server).init().start();
var parser = new MessageParser(game);

socket.on('connection', function(conn){
    sys.log('Client connected');
    new Client(conn, game, server, parser).init();
});

sys.log("Server created. Listening on port " + port + ". ");
