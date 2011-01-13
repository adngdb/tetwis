/**
 * Game class
 * Launches, handles and displays the current game
 */
function Game() {
    this.initialized = false;

    this.events = null;
    this.socket = null;

    this.map = null;

    this.score = 0;
    this.level = 0;

    this.time = 500;

    this.id = null;
}

Game.prototype = {

    launch: function() {
        this.socket = new Socket(this);
        this.socket.init();
    }

    /**
     * Initialize the Game object
     */
    init: function() {
        if (this.initialized == false)
        {
            this.map = new Map(this);
            this.map.init();

            this.events = new Events(this);
            this.events.bindAll();

            this.initialized = true;
        }
        return this;
    },

    /**
     * Start a game, launch the main loop
     */
    start: function() {
        var instance = this;
        $('#map').everyTime(instance.time, function() {
            instance.run();
        });
        return this;
    },

    /**
     * Stop the current game
     */
    stop: function() {
        $('#map').stopTime();
        return this;
    },

    /**
     * Do all the actions of an iteration of the main loop
     */
    run: function() {
        this.move().display();
        if (this.map.checkLines())
            this.display();
        return this;
    },

    /**
     * Move the current brick
     */
    move: function() {
        this.map.currentBrick.moveBottom();
        return this;
    },

    /**
     * Display the game
     */
    display: function() {
        var mapElt = $('#map');
        var id = 0;

        // Reset current map
        mapElt.empty();

        // Displaying map
        for (var i = 0, size = this.map.cells.length; i < size; i++) {
            var cell = this.map.cells[i];
            mapElt.append('<div class="cell" style="top: '+ cell.y * this.map.cellSize +'px; left: '+ cell.x * this.map.cellSize +'px; background-color: '+ cell.color +';"></div>');
        }

        for (var i = 0, size = this.map.currentBrick.cells.length; i < size; i++) {
            var cell = this.map.currentBrick.cells[i];
            mapElt.append('<div class="cell" style="top: '+ (this.map.currentBrick.y + cell.y) * this.map.cellSize +'px; left: '+ (this.map.currentBrick.x + cell.x) * this.map.cellSize +'px; background-color: '+ cell.color +';"></div>');
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
    }
}

function log(msg) {
    $('#log').append('<li>' + msg + '</li>');
}
