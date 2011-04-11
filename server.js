var sys             = require("util"),
    libpath         = require('path'),
    http            = require("http"),
    fs              = require('fs'),
    url             = require("url"),
    mime            = require('mime'),
    io              = require('socket.io'),
    Game            = require("./lib/game.js"),
    Client          = require("./lib/client.js"),
    MessageParser   = require("./lib/message-parser.js");

sys.log("Starting server... ");

var port = 9309;

var path = "/client";

http.createServer(function (request, response) {

    var uri = url.parse(request.url).pathname;
    var filename = libpath.join(path, uri);

    libpath.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) {
            filename += '/index.html';
        }

        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.write(err + "\n");
                response.end();
                return;
            }

            var type = mime.lookup(filename);
            response.writeHead(200, {
                "Content-Type": type
            });
            response.write(file, "binary");
            response.end();
        });
    });
}).listen(port);

var socket = io.listen(server);

var game = new Game(server).init().start();
var parser = new MessageParser(game);

socket.on('connection', function(conn){
    sys.log('Client connected');
    new Client(conn, game, server, parser).init();
});

sys.log("Server created. Listening on port " + port + ". ");
