var sys = require("sys");

exports.Client = function(connectionData, game, server, parser) {
    this.conn = connectionData;
    this.game = game;
    this.server = server;
    this.mp = parser;
    this.id = this.conn.id;

    sys.log("New connection: " + this.conn.id);
}

exports.Client.prototype = {

    init: function() {
        // binding events
        var instance = this;
        this.conn.addListener("message", function(msg)
        {
            instance.onMessage(msg);
        });

        this.conn.addListener("close", function()
        {
            instance.onClose();
        });

        // initialization
        this.game.newPlayer(this);
    },

    send: function(message) {
        //sys.log("Client: send to " + this.conn.id);
        this.server.send(this.conn.id, message);
    },

    onMessage: function(msg) {
        //sys.log("Client: onMessage");
        this.mp.parse(msg, this);
    },

    onClose: function() {
        sys.log("Client: onClose");
        this.game.clientClose(this);
    },
}
