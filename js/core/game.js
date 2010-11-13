function Game() {
    this.initialized = false;

    this.events = null;

    this.map = null;

    this.score = 0;
    this.level = 0;

    this.time = 500;
}

Game.prototype = {

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

    start: function() {
        var instance = this;
        $('#map').everyTime(instance.time, function() {
            instance.run();
        });
        return this;
    },

    stop: function() {
        $('#map').stopTime();
        return this;
    },

    run: function() {
        this.move().display();
        this.map.checkLines();
        return this;
    },

    move: function() {
        this.map.currentBrick.moveBottom();
        return this;
    },

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

    gameOver: function() {
        alert('Game OVER!');
        this.stop();
        return this;
    }
}
