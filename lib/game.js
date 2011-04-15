var sys         = require("sys"),
    Map         = require("./map.js"),
    Player      = require("./player.js");

/**
 * Class Game
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
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

    /**
     * Initialize this game.
     *
     * @return this.
     */
    init: function() {
        this.map = new Map(this).init();
        return this._computeNewBrickDelay();
    },

    /**
     * Start the different timers for the game to run.
     *
     * @return this.
     */
    start: function() {
        setInterval(this.refresh.bind(this), this.refreshDelay);
        setInterval(this.update.bind(this), this.gameDelay);
        setInterval(this.generateNewBrick.bind(this), this.newBrickDelay);

        return this;
    },

    /**
     * Update the game by moving down all bricks.
     *
     * @return this.
     */
    update: function() {
        var aBrickIsAtBottom = false;

        // Move every player's brick down
        for (var i = 0; i < this.maxPlayers; i++) {
            var player = this.players[i];

            if (typeof player != undefined && player != null) {

                if (player.brick != null && !player.brick.isBottom) {
                    player.brick.moveBottom();

                    if (player.brick.isBottom) {
                        aBrickIsAtBottom = true;
                    }
                }
            }
        }

        // If a brick touched down, check the lines
        if (aBrickIsAtBottom) {
            this.map.checkLines();
        }

        return this;
    },

    /**
     * Send the new map data to all players of the game.
     * @return this.
     */
    refresh: function() {
        var mapData = this.getMapDisplayData();

        this.sendAll(mapData);
        return this;
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
        //~ sys.log("GenerateNewBrick : end");
        return this;
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
        //~ sys.log("Game: checkAwaitings >> " + this.awaitings.length);
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
        if (player != null && player.brick != null) {
            player.brick.moveLeft();
        }
        return this;
    },

    moveRight: function(client) {
        var player = this.getPlayer(client);
        if (player != null && player.brick != null) {
            player.brick.moveRight();
        }
        return this;
    },

    changeShape: function(client) {
        var player = this.getPlayer(client);
        if (player != null && player.brick != null) {
            player.brick.changeShape();
        }
        return this;
    },

    updatePlayersInfo: function() {
        this.mp.updatePlayersInfo(this.countPlayers(), this.awaitings.length);
        return this;
    },

    sendAll: function(msg) {
        var i = 0,
            ln = this.players.length;

        for (; i < ln; i++) {
            var player = this.players[i];
            if (typeof player != undefined && player != null) {
                this.players[i].client.send(msg);
            }
        }

        i = 0,
        ln = this.awaitings.length;

        for (; i < ln; i++) {
            this.awaitings[i].send(msg);
        }
        return this;
    },

    gameOver: function() {
        this.map.reset().init();
        return this;
    },

    _computeNewBrickDelay: function() {
        this.newBrickDelay = Math.floor(this.gameDelay * this.map.height / 4);
        return this;
    },
}

module.exports = Game;
