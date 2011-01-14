var sys = require("sys");

exports.Player = function(game, client) {
    this.game   = game;
    this.client = client;
}

exports.Player.prototype = {
    init: function() {
        this.client.send( this.game.getMapAllData() );
    },
}
