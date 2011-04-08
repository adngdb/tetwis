var sys         = require("sys"),
    Map         = require("./map.js"),
    Player      = require("./player.js");

function Game(server) {
    this.server = server;

    this.map = null;
    this.players = [];
    this.awaitings = [];

    this.maxPlayers = 4;
    this.refreshDelay = 100;
    this.gameDelay = 500;
    this.newBrickDelay = -1;

    this.nextBrick = 3;
}

Game.prototype = {

    init: function() {
        this.map = new Map(this).init();
        return this._computeNewBrickDelay();
    },

    start: function() {
        var instance = this;

        setInterval(function() {
            instance.refresh();
        }, this.refreshDelay);

        setInterval(function() {
            instance.update();
        }, this.gameDelay);

        setInterval(function() {
            instance.generateNewBrick();
        }, this.newBrickDelay);

        return this;
    },

    update: function() {
        this.map.checkLines();

        for (var i = 0; i < this.maxPlayers; i++) {
            var player = this.players[i];

            if (typeof player != undefined && player != null) {

                if (player.brick == null || player.brick.isBottom) {
                    //player.newBrick( this.map.nextBrick(i) );
                }
                else {
                    player.brick.moveBottom();
                }
            }
        }
    },

    refresh: function() {
        for (var i = 0; i < this.maxPlayers; i++) {
            var player = this.players[i];

            if (typeof player != undefined && player != null) {
                player.refresh();
            }
        }
    },

    generateNewBrick: function() {
        if (this.nextBrick >= this.maxPlayers) {
            this.nextBrick = 0;
        }

        //sys.log("GenerateNewBrick : start > " + this.nextBrick);

        var player = this.players[this.nextBrick];

        if (typeof player == "undefined" || player == null) {
            this.nextBrick++;
            return;
        }

        player.newBrick( this.map.nextBrick(this.nextBrick) );

        this.nextBrick++;
        sys.log("GenerateNewBrick : end");
    },

    countPlayers: function() {
        var count = 0;
        for (var i = 0; i < this.maxPlayers; i++) {
            var player = this.players[i];

            if (typeof player != undefined && player != null) {
                ++count;
            }
        }
        return count;
    },

    getMapAllData: function() {
        return this.map.toJSON();
    },

    getMapDisplayData: function() {
        return this.map.toJSON(true);
    },

    _createNewPlayer: function(client, playerId) {
        var newPlayer = new Player(this, client);
        newPlayer.init();

        this.players[playerId] = newPlayer;
        return this.updatePlayersInfo();
    },

    newPlayer: function(client) {
        this.awaitings.push(client);
        this.updatePlayersInfo().checkAwaitings();
        return this;
    },

    removePlayer: function(playerId) {
        delete this.players[playerId];
        delete this.map.bricks[playerId];
        return this.updatePlayersInfo();
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
                for (size = this.awaitings.length; cl < size - 1; cl++) {
                    this.awaitings[cl] = this.awaitings[cl+1];
                }
                this.awaitings.pop();
            }
        }
        return this.updatePlayersInfo();
    },

    checkAwaitings: function() {
        sys.log("Game: checkAwaitings >> " + this.awaitings.length);
        if (this.awaitings.length != 0) {
            for (var i = 0, size = this.maxPlayers; i < size; i++) {
                if (typeof this.players[i] == undefined || this.players[i] == null) {
                    this._createNewPlayer(this.awaitings.shift(), i);
                    return this.checkAwaitings();
                }
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

    updatePlayersInfo: function() {
        this.mp.updatePlayersInfo(this.countPlayers(), this.awaitings.length);
        return this;
    },

    _computeNewBrickDelay: function() {
        this.newBrickDelay = Math.floor(this.gameDelay * this.map.height / 4);
        return this;
    },
}

module.exports = Game;
