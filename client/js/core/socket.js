tetwis.Socket = function() {
    this._socket = null;

    this.host = tetwis.config.server.host;
    this.port = tetwis.config.server.port;

    this.callback = null;
}

tetwis.Socket.prototype = {

    init: function(callback) {
        tetwis.log("Trying to open a connection to the server... ");

		this.callback = callback;

        this._socket = new io.Socket(this.host, { port: 80, rememberTransport: false });
        this._socket.on('connect', this._onOpen.bind(this));
        this._socket.on('message', this._onMessage.bind(this));
        this._socket.on('disconnect', this._onClose.bind(this));

        this._socket.connect();

        tetwis.log("Socket initialized");
        return this;
    },

    send: function(msg) {
        this._socket.send(msg);
        return this;
    },

    _onOpen: function() {
        tetwis.log("Socket: onOpen");
        this.callback();
    },

    _onMessage: function(msg) {
        //log("Socket: onMessage = " + msg);
        tetwis.mp.parse(msg);
    },

    _onClose: function() {
        log("Socket: onClose");
        // TODO
        // Display: cannot connect to server
    },

}
