/**
 * Game class
 * Launches, handles and displays the current game
 */
function Game() {
    this.initialized = false;

    this.config = null;

    this.events = null;
    this.socket = null;
    this.mp = null;

    this.map = null;

    this.score = 0;
    this.level = 0;

    this.onReady = null;
}

Game.prototype = {

    loadConfig: function() {
        this.config = new Config(this).load();
        return this;
    },

    /**
     * Launches the game: connects to the server and waits for data.
     */
    launch: function() {
        log("Game: launch");
        $('#loading-state').text("Connecting to server...");
        this.mp = new MessageParser(this);

        this.socket = new Socket(this, this.mp);
        this.socket.init();

        return this;
    },

    /**
     * Sets a callback function when the game is ready.
     * @param callback Function to call.
     */
    ready: function(callback) {
        this.onReady = callback;
    },

    /**
     * Initializes the Game object
     */
    init: function(data) {
        log("Game: init");
        if (this.initialized == false)
        {
            this.events = new Events(this);
            this.events.bindAll();

            this.map = new Map(this, data);

            this.onReady.call();

            this.initialized = true;
        }
        return this;
    },

    /**
     * Updates the map with data comming from the server, then displays the game.
     * @param data Object containing the new Map data.
     */
    updateMap: function(data) {
        this.map.update(data);
        this.display();
    },

    /**
     * Displays the game
     */
    display: function() {
        var mapElt = $('#map'),
            id = 0,
            cellSize = this.map.cellSize,
            cellSizeCSS = cellSize - 1;

        // Reset current map
        mapElt.empty();

        // Displaying map
        for (var i = 0, size = this.map.cells.length; i < size; i++) {
            var cell = this.map.cells[i];
            mapElt.append('<div class="cell" style="top: '+ cell.y * cellSize +'px; left: '+ cell.x * cellSize +'px; background-color: '+ cell.color +'; width: '+cellSizeCSS+'px; height: '+cellSizeCSS+'px;"></div>');
        }

        for (var k = 0, nb = this.map.bricks.length; k < nb; k++) {
            var currentBrick = this.map.bricks[k];
            for (var i = 0, size = currentBrick.cells.length; i < size; i++) {
                var cell = currentBrick.cells[i];
                mapElt.append('<div class="cell" style="top: '+ (currentBrick.y + cell.y) * cellSize +'px; left: '+ (currentBrick.x + cell.x) * cellSize +'px; background-color: '+ cell.color +'; width: '+cellSizeCSS+'px; height: '+cellSizeCSS+'px;"></div>');
            }
        }

        return this;
    },

    /**
     * The game is lost, tell so to the player and stop it
     */
    gameOver: function() {
        alert('Game OVER!');
        return this;
    },

    /**
     * Sends a message to the server.
     * @param msg String containing the message to send.
     */
    send: function(msg) {
        this.socket.send(msg);
    },

    /**
     * Asks the server to move our brick to the left.
     */
    moveLeft: function() {
        this.send( this.mp.getMoveLeft() );
    },

    /**
     * Asks the server to move our brick to the right.
     */
    moveRight: function() {
        this.send( this.mp.getMoveRight() );
    },

    /**
     * Asks the server to change the shape of our brick.
     */
    changeShape: function() {
        this.send( this.mp.getChangeShape() );
    },
}

function log(msg) {
    $('#log').append('<li>' + msg + '</li>');
}
