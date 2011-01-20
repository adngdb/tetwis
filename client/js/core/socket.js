function Socket(game, mp) {
    this.game = game;
    this.mp = mp; // MessageParser

    this._ws;

    this.host = game.config.server.host;
    this.port = game.config.server.port;
    this.protocol = game.config.server.protocol;
}

Socket.prototype = {
    init: function() {
        var serverURI = this.protocol + "://" + this.host + ":" + this.port;

        this._ws = new WebSocket(serverURI);

        var instance = this;

        this._ws.onopen = function() {
            log("Socket: onOpen");
            $('#loading-state').text("Connected. Receiving data...");
        };

        this._ws.onmessage = function(msg) {
            log("Socket: onMessage = " + msg.data);
            instance.mp.parse(msg.data);
        };

        this._ws.onclose = function() {
            log("Socket: onClose");
            instance.game.stop();
        };

        this.mp = new MessageParser(this.game);

        log("Socket initialized");
    },

    send: function(msg) {
        this._ws.send(msg);
    }
}
