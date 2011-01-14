var sys = require("sys");

exports.Client = function(connectionData, game, server) {
    this.conn = connectionData;
    this.game = game;
    this.server = server;
    this.mp = this.server.parser;

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
        this.server.send(this.conn.id, message);
    },

    onMessage: function(msg) {
        this.mp.parse(msg, this);
    },

    onClose: function() {
    },
}
