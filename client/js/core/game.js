/**
 * Game class
 * Launches, handles and displays the current game
 */
function Game() {
    this.initialized = false;

    this.events = null;
    this.socket = null;
    this.mp = null;

    this.map = null;

    this.score = 0;
    this.level = 0;

    this.time = 500;

    this.id = null;

    this.onReady = null;
}

Game.prototype = {

    launch: function() {
        log("Game: launch");
        this.mp = new MessageParser(this);

        this.socket = new Socket(this, this.mp);
        this.socket.init();

        return this;
    },

    ready: function(callback) {
        this.onReady = callback;
    },

    /**
     * Initialize the Game object
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

    updateMap: function(data) {
        this.map.update(data);
        this.display();
    },

    /**
     * Display the game
     */
    display: function() {
        var mapElt = $('#map'),
            id = 0,
            cellSize = this.map.cellSize;

        // Reset current map
        mapElt.empty();

        // Displaying map
        for (var i = 0, size = this.map.cells.length; i < size; i++) {
            var cell = this.map.cells[i];
            mapElt.append('<div class="cell" style="top: '+ cell.y * cellSize +'px; left: '+ cell.x * cellSize +'px; background-color: '+ cell.color +'; width: '+cellSize+'px; height: '+cellSize+'px;"></div>');
        }

        for (var k = 0, nb = this.map.bricks.length; k < nb; k++) {
            var currentBrick = this.map.bricks[k];
            for (var i = 0, size = currentBrick.cells.length; i < size; i++) {
                var cell = currentBrick.cells[i];
                mapElt.append('<div class="cell" style="top: '+ (currentBrick.y + cell.y) * cellSize +'px; left: '+ (currentBrick.x + cell.x) * cellSize +'px; background-color: '+ cell.color +'; width: '+cellSize+'px; height: '+cellSize+'px;"></div>');
            }
        }

        return this;
    },

    /**
     * The game is lost, tell so to the player and stop it
     */
    gameOver: function() {
        alert('Game OVER!');
        this.stop();
        return this;
    },

    send: function(msg) {
        this.socket.send(msg);
    },

    moveLeft: function() {
        this.send( this.mp.getMoveLeft() );
    },

    moveRight: function() {
        this.send( this.mp.getMoveRight() );
    },

    changeShape: function() {
        this.send( this.mp.getChangeShape() );
    },
}

function log(msg) {
    $('#log').append('<li>' + msg + '</li>');
}
