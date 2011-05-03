tetwis.Socket = function(game, mp) {
    this.game = game;
    this.mp = mp; // MessageParser

    this._socket = null;

    this.host = game.config.server.host;
    this.port = game.config.server.port;
}

tetwis.Socket.prototype = {
    init: function() {

        this._socket = new io.Socket(this.host, { port: this.port, rememberTransport: false });
        this._socket.on('connect', this._onOpen.bind(this));
        this._socket.on('message', this._onMessage.bind(this));
        this._socket.on('disconnect', this._onClose.bind(this));

        this._socket.connect();

        log("Socket initialized");
    },

    send: function(msg) {
        this._socket.send(msg);
    },

    _onOpen: function() {
        log("Socket: onOpen");
        $('#loading-state').text("Connected. Receiving data...");
    },

    _onMessage: function(msg) {
        //log("Socket: onMessage = " + msg);
        this.mp.parse(msg);
    },

    _onClose: function() {
        log("Socket: onClose");
        // TODO
        // Display: cannot connect to server
    },
}
