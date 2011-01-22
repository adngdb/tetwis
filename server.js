var sys     = require("sys"),
    ws      = require("websocket-server"),
    m_game    = require("./lib/game.js"),
    m_client  = require("./lib/client.js"),
    m_mp      = require("./lib/message-parser.js");


var port = 3401;
var server = ws.createServer();

var game = new m_game.Game(server).init().start();
var parser = new m_mp.MessageParser(game);

server.listen(port);

server.addListener("connection", function(conn)
{
    new m_client.Client(conn, game, server, parser).init();
});

sys.log("Server created. Listening on port " + port + ". ");
