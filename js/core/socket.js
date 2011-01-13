function Socket(game) {
    this.game = game;
    this.mp = null; // MessageParser

    this._ws;

    this.host = "localhost";
    this.port = "3401";
    this.protocole = "ws";
}

Socket.prototype = {
    init: function() {
        var serverURI = this.protocole + "://" + this.host + ":" + this.port;

        this._ws = new WebSocket(serverURI);
        this._ws.onopen = this.onOpen();
        this._ws.onmessage = this.onMessage();
        this._ws.onclose = this.onClose();

        this.mp = new MessageParser(this.game);
    },

    onOpen: function() {
        this.game.init();
    },

    onMessage: function(data) {
    },

    onClose: function() {
        this.game.stop();
    },

    send: function(msg) {
        this._ws.send(msg);
    }
}
