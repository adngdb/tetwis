tetwis.Socket = function() {
    this._socket = null;

    this.host = tetwis.config.server.host;
    this.port = tetwis.config.server.port;

    this.callback = null;

    this._queue = [];
    this.delay = 50; // (ms)
}

tetwis.Socket.prototype = {

    init: function(callback) {
        tetwis.log("Trying to open a connection to the server... ");

    this.callback = callback;

        this._socket = new io.connect(this.host, { port: this.port, rememberTransport: false });
        this._socket.on('connect', this._onOpen.bind(this));
        this._socket.on('message', this._onMessage.bind(this));
        this._socket.on('disconnect', this._onClose.bind(this));

        setInterval(this._sendAllMessages.bind(this), this.delay);

        tetwis.log("Socket initialized");
        return this;
    },

    send: function(msg) {
        this._queue.push(msg);
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

    _sendAllMessages: function() {
    if (this._queue.length > 0) {
      this._socket.send( tetwis.mb.createQueue(this._queue) );
      this._queue = [];
    }
  },

}
