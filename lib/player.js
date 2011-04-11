var sys = require("sys"),
    Brick = require("./brick.js");

/**
 * Class Player
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
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

    send: function(msg) {
        this.client.send(msg);
    },

    newBrick: function(newBrick) {
        this.brick = newBrick;
    },

    refresh: function() {
        this.client.send( this.game.getMapDisplayData() );
    }
};

module.exports = Player;
