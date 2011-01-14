var sys = require("sys"),
    m_map = require("./map.js"),
    m_player = require("./player.js");

exports.Game = function() {
    this.map = null;
    this.players = [];
    this.awaitings = [];

    this.maxPlayers = 4;
    this.delay = 500;
}

exports.Game.prototype = {
    init: function() {
        this.map = new m_map.Map(this).init();
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
        //sys.log("tick");
        this.map.checkLines();

        for (var i = 0; i < this.maxPlayers; i++) {
            var player = this.players[i];

            if (typeof player != undefined && player != null) {
                //sys.log("Game: player " + i);

                if (player.brick == null || player.brick.isBottom) {
                    player.newBrick( this.map.nextBrick(i) );
                }
                else {
                    player.brick.moveBottom();
                }

                player.update();
            }
        }
    },

    getMapAllData: function() {
        return this.map.toJSON();
    },

    getMapDisplayData: function() {
        //sys.log("Game: getMapDisplayData");
        return this.map.toJSON(true);
    },

    createNewPlayer: function(client, playerId) {
        var newPlayer = new m_player.Player(this, client);
        newPlayer.init();

        this.players[playerId] = newPlayer;
    },

    newPlayer: function(client) {
        this.awaitings.push(client);
        this.checkAwaitings();
        return this;
    },

    removePlayer: function(playerId) {
        delete this.players[playerId];
        delete this.map.bricks[playerId];
        return this;
    },

    clientClose: function(client) {
        var cl = this.findClientIn(client, this.players);
        if (cl != null) {
            this.removePlayer(cl);
            this.checkAwaitings();
        }
        else {
            cl = this.findClientIn(client, this.awaitings);
            if (cl != null) {
                for (size = this.awaitings.length; cl < nb - 1; cl++) {
                    this.awaitings[cl] = this.awaitings[cl+1];
                }
                this.awaitings.pop();
            }
        }
        return this;
    },

    findClientIn: function(client, array) {
        for (var i = 0; i < array.length; i++) {
            if (typeof array[i] != undefined && array[i] != null && client.id == array[i].id) {
                return i;
            }
        }
        return null;
    },

    getPlayer: function(client) {
        var i = this.findClientIn(client, this.players);
        if (i == null) return null;
        if (typeof this.players[ i ] == undefined) return null;
        return this.players[ i ];
    },

    checkAwaitings: function() {
        sys.log("Game: checkAwaitings >> " + this.awaitings.length);
        if (this.awaitings.length != 0) {
            for (var i = 0, size = this.maxPlayers; i < size; i++) {
                if (typeof this.players[i] == undefined || this.players[i] == null) {
                    this.createNewPlayer(this.awaitings.shift(), i);
                    return this.checkAwaitings();
                }
            }
        }
        return this;
    },

    moveLeft: function(client) {
        var player = this.getPlayer(client);
        if (player != null) {
            player.brick.moveLeft();
        }
    },

    moveRight: function(client) {
        var player = this.getPlayer(client);
        if (player != null) {
            player.brick.moveRight();
        }
    },

    changeShape: function(client) {
        var player = this.getPlayer(client);
        if (player != null) {
            player.brick.changeShape();
        }
    },
}
