var sys = require("sys");

/**
 * Class Client
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function Client(connectionData, game, server, parser) {
    this.conn = connectionData;
    this.game = game;
    this.server = server;
    this.mp = parser;
    this.id = this.conn.sessionId;

    sys.log("New connection: " + this.id);
}

Client.prototype = {

    init: function() {
        // binding events
        this.conn.on("message", this._onMessage.bind(this));
        this.conn.on("disconnect", this._onClose.bind(this));

        // initialization
        this.game.newPlayer(this);

        return this;
    },

    send: function(message) {
        //~ sys.log("Client: send ' "+message+" ' to " + this.id);
        this.conn.send(message);
        return this;
    },

    _onMessage: function(msg) {
        //~ sys.log("Client: onMessage > " + msg);
        this.mp.parse(msg, this);
    },

    _onClose: function() {
        sys.log("Client: onClose");
        this.game.clientClose(this);
    },
}

module.exports = Client;
