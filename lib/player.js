var sys = require("sys");

exports.Player = function(game, client) {
    this.game   = game;
    this.client = client;
    this.brick  = null;

    this.id = client.id;
}

exports.Player.prototype = {
    init: function() {
        this.client.send( this.game.getMapAllData() );
    },

    newBrick: function(newBrick) {
        this.brick = newBrick;
    },

    refresh: function() {
        this.client.send( this.game.getMapDisplayData() );
    }
}
