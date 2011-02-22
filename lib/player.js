var sys = require("sys"),
    m_brick = require("./brick.js");

exports.Player = function(game, client) {
    this.game   = game;
    this.client = client;
    this.brick  = null;

    this.id = client.id;
}

exports.Player.prototype = {
    init: function() {
        this.client.send( this.game.getMapAllData() );
        this.brick = new m_brick.Brick(null, null, null, true);
        this.brick.isBottom = true;
    },

    newBrick: function(newBrick) {
        this.brick = newBrick;
    },

    refresh: function() {
        this.client.send( this.game.getMapDisplayData() );
    }
}
