var sys     = require("sys"),
    ws      = require("websocket-server"),
    game    = require("./lib/game.js"),
    client  = require("./lib/client.js"),
    mp      = require("./lib/message-parser.js");


var game = new game.Game().init().start();
var parser = new mp.MessageParser(this.game);

var port = 3401;
var server = ws.createServer();
server.listen(port);

server.addListener("connection", function(conn)
{
    new client.Client(conn, game, server).init();
});

sys.log("Server created. Listening on port " + port + ". ");
