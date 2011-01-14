var sys = require("sys"),
    map = require("./map.js"),
    player = require("./player.js");

exports.Game = function() {
    this.map = null;
    this.players = [];
    this.awaiting = [];

    this.maxPlayers = 4;
    this.delay = 500;
}

exports.Game.prototype = {
    init: function() {
        this.map = new map.Map(this).init();
        return this;
    },

    start: function() {
        var instance = this;

        setInterval(function() {
            instance.onTimer();
        }, this.delay);
        return this;
    },

    onTimer: function() {
        sys.log("tick");
    },

    getMapAllData: function() {
        return this.map.toJSON();
    },

    createNewPlayer: function(client) {
        var newPlayer = new player.Player(this, client);
        newPlayer.init();

        this.players.push(newPlayer);
    },

    newPlayer: function(client) {
        if (this.players.length == this.maxPlayers) {
            this.awaiting.push(client);
        }
        else {
            this.createNewPlayer(client);
        }
        return this;
    },
}
