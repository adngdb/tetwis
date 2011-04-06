var sys             = require("sys"),
    ws              = require("websocket-server"),
    Game            = require("./lib/game.js"),
    Client          = require("./lib/client.js"),
    MessageParser   = require("./lib/message-parser.js");


var port = 9309;
var server = ws.createServer();

var game = new Game(server).init().start();
var parser = new MessageParser(game);

server.listen(port);

server.addListener("connection", function(conn)
{
    new Client(conn, game, server, parser).init();
});

sys.log("Server created. Listening on port " + port + ". ");
