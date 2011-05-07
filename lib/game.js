var util         = require("util"),
    Map         = require("./map.js"),
    Player      = require("./player.js");

/**
 * Class Game
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function Game(id, engine) {
	this.id = id;
    this.engine = engine;

    this.map = null;
    this.players = [];
    this.awaitings = [];

    this.maxPlayers = 4;
    this.refreshDelay = 100;
    this.gameDelay = 500;
    this.newBrickDelay = -1;

    this.nextBrick = 3;

    this.level = 0;
    this.score = 0;
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

    refresh: function() {
        var i = 0,
            ln = this.players.length,
            mapData = this.getMapDisplayData();

        for (; i < ln; i++) {
            var player = this.players[i];

            if (typeof player != undefined && player != null) {
                player.send(mapData);
            }
        }
    },

    generateNewBrick: function() {
        if (this.nextBrick >= this.maxPlayers) {
            this.nextBrick = 0;
        }

        //util.log("GenerateNewBrick : start > " + this.nextBrick);

        var player = this.players[this.nextBrick];

        if (typeof player == "undefined" || player == null) {
            this.nextBrick++;
            return;
        }

        player.newBrick( this.map.nextBrick(this.nextBrick) );

        this.nextBrick++;
        //~ util.log("GenerateNewBrick : end");
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

    _createNewPlayer: function(user, playerId) {
        var newPlayer = new Player(this, user);
        newPlayer.init();

        this.players[playerId] = newPlayer;
        return this.updatePlayersInfo();
    },

    newPlayer: function(user) {
		user.inGame = this.id;
        this.awaitings.push(user);
        this.updatePlayersInfo().checkAwaitings();
        return this;
    },

    removePlayer: function(playerId) {
        delete this.players[playerId];
        delete this.map.bricks[playerId];
        return this.updatePlayersInfo();
    },

    clientClose: function(user) {
        var cl = this.findUserIn(user, this.players);
        if (cl != null) {
            this.removePlayer(cl);
            this.checkAwaitings();
        }
        else {
            cl = this.findUserIn(user, this.awaitings);
            if (cl != null) {
                for (var size = this.awaitings.length; cl < size - 1; cl++) {
                    this.awaitings[cl] = this.awaitings[cl+1];
                }
                this.awaitings.pop();
            }
        }
        return this.updatePlayersInfo();
    },

    checkAwaitings: function() {
        //~ util.log("Game: checkAwaitings >> " + this.awaitings.length);
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

    findUserIn: function(user, array) {
        for (var i = 0; i < array.length; i++) {
            if (typeof array[i] != undefined && array[i] != null && user.id == array[i].id) {
                return i;
            }
        }
        return null;
    },

    getPlayer: function(user) {
        var i = this.findUserIn(user, this.players);
        if (i == null) return null;
        if (typeof this.players[ i ] == undefined) return null;
        return this.players[ i ];
    },

    moveLeft: function(user) {
        var player = this.getPlayer(user);
        if (player != null && player.brick != null) {
            player.brick.moveLeft();
        }
    },

    moveRight: function(user) {
        var player = this.getPlayer(user);
        if (player != null && player.brick != null) {
            player.brick.moveRight();
        }
    },

    changeShape: function(user) {
        var player = this.getPlayer(user);
        if (player != null && player.brick != null) {
            player.brick.changeShape();
        }
    },

    updatePlayersInfo: function() {
        var message = this.engine.messageBuilder.updatePlayersInfo(this.countPlayers(), this.awaitings.length);
        this.sendAll(message);
        return this;
    },

    sendAll: function(msg) {
        var i = 0,
            ln = this.players.length;

        for (; i < ln; i++) {
            var player = this.players[i];
            if (typeof player != undefined && player != null) {
                this.players[i].user.send(msg);
            }
        }

        i = 0,
        ln = this.awaitings.length;

        for (; i < ln; i++) {
            this.awaitings[i].send(msg);
        }
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
