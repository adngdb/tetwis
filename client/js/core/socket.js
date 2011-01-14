function Socket(game, mp) {
    this.game = game;
    this.mp = mp; // MessageParser

    this._ws;

    //~ this.host = "192.168.1.86";
    //~ this.host = "134.214.241.255";
    this.host = "localhost";
    this.port = "3401";
    this.protocole = "ws";
}

Socket.prototype = {
    init: function() {
        var serverURI = this.protocole + "://" + this.host + ":" + this.port;

        this._ws = new WebSocket(serverURI);

        var instance = this;

        this._ws.onopen = function() {
            log("Socket: onOpen");
            instance.game.init();
        };

        this._ws.onmessage = function(msg) {
            log("Socket: onMessage = " + msg.data);
            instance.mp.parse(msg.data);
        };

        this._ws.onclose = function() {
            log("Socket: onClose");
            alert("Connection lost!");
            instance.game.stop();
        };

        this.mp = new MessageParser(this.game);

        log("Socket initialized");
    },

    send: function(msg) {
        this._ws.send(msg);
    }
}
