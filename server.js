var sys             = require("util"),
    ws              = require("websocket-server");/*,
    Game            = require("./lib/game.js"),
    Client          = require("./lib/client.js"),
    MessageParser   = require("./lib/message-parser.js");*/

sys.log("Starting server... ");

var port = 9309;
var server = ws.createServer();

//~ var game = new Game(server).init().start();
//~ var parser = new MessageParser(game);

server.listen(port);

server.addListener("connection", function(conn)
{
    sys.log('Client connected');
    //~ new Client(conn, game, server, parser).init();
});

sys.log("Server created. Listening on port " + port + ". ");
