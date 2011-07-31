var sys = require("sys"),
    Brick = require("./brick.js");

/**
 * Class Player
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function Player(game, user) {
    this.game   = game;
    this.user 	= user;
    this.brick  = null;

    this.id = user.id;
}

Player.prototype = {
    init: function() {
        this.user.send( this.game.getMapAllData() );
        this.brick = new Brick(null, null, null, true);
        this.brick.isBottom = true;
    },

    send: function(msg) {
        this.user.send(msg);
    },

    newBrick: function(newBrick) {
        this.brick = newBrick;
    },
};

module.exports = Player;
