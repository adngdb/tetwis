var util = require("util");

/**
 * Class Client
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function Client(connectionData, engine) {
    this.engine = engine;
    this.conn = connectionData;
    this.mp = engine.messageParser;
    this.id = this.conn.id;
}

Client.prototype = {

    init: function() {
        // binding events
        this.conn.on("message", this._onMessage.bind(this));
        this.conn.on("disconnect", this._onClose.bind(this));

        // initialization
        this.engine.addUser(this);

        return this;
    },

    send: function(message) {
        //~ util.log("Client: send ' "+message+" ' to " + this.id);
        this.conn.send(message);
        return this;
    },

    _onMessage: function(msg) {
        //~ util.log("Client: onMessage > " + msg);
        this.mp.parse(msg, this.id);
    },

    _onClose: function() {
        this.engine.clientClose(this);
    },
}

module.exports = Client;
