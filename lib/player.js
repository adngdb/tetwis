var sys = require("sys"),
    Brick = require("./brick.js");

function Player(game, client) {
    this.game   = game;
    this.client = client;
    this.brick  = null;

    this.id = client.id;
}

Player.prototype = {
    init: function() {
        this.client.send( this.game.getMapAllData() );
        this.brick = new Brick(null, null, null, true);
        this.brick.isBottom = true;
    },

    newBrick: function(newBrick) {
        this.brick = newBrick;
    },

    refresh: function() {
        this.client.send( this.game.getMapDisplayData() );
    }
}

module.exports = Player;
