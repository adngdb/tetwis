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

//~ var server = http.createServer(function(req, res){
    //~ var html =  '<!DOCTYPE html><html><head><title>Tetwis ! JavaScript powered game</title>' +
                //~ '<link rel="stylesheet" type="text/css" href="http://tetwis.lqbs.fr/css/main.css" />' +
                //~ '<script src="http://tetwis.lqbs.fr/js/libs/load.js"></script>' +
                //~ '<script>' +
                //~ 'var staticFilesServer = "http://tetwis.lqbs.fr/";' +
                //~ 'load("http://cdn.socket.io/stable/socket.io.js", staticFilesServer+"js/libs/jquery.min.js")' +
                //~ //'.thenRun( function() { $("body").load(staticFilesServer+"content.html"); } )' +
                //~ '.thenLoad( staticFilesServer+"js/libs/jquery.timers.js", ' +
                //~ '       staticFilesServer+"js/libs/json2.js", ' +
                //~ '       staticFilesServer+"js/core/config.js", ' +
                //~ '       staticFilesServer+"js/core/cell.js", ' +
                //~ '       staticFilesServer+"js/core/brick.js", ' +
                //~ '       staticFilesServer+"js/core/map.js", ' +
                //~ '       staticFilesServer+"js/core/events.js", ' +
                //~ '       staticFilesServer+"js/core/message-parser.js", ' +
                //~ '       staticFilesServer+"js/core/socket.js", ' +
                //~ '       staticFilesServer+"js/core/game.js")' +
                //~ '.then( staticFilesServer+"js/main.js");' +
                //~ '</script>' +
                //~ '</head><body>' +
                //~ '<p>Loading...</p>' +
                //~ '<ul id="log"></ul>' +
                //~ '</body></html>';
    //~ res.writeHead(200, {'Content-Type': 'text/html'});
    //~ res.end(html);
//~ });
//~
//~ server.listen(port);

var socket = io.listen(server);

var game = new Game(server).init().start();
var parser = new MessageParser(game);

socket.on('connection', function(conn){
    sys.log('Client connected');
    new Client(conn, game, server, parser).init();
});

sys.log("Server created. Listening on port " + port + ". ");
