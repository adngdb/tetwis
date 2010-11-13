function Game() {
    this.initialized = false;

    this.events = null;

    this.map = null;

    this.score = 0;
    this.level = 0;
}

Game.prototype = {

    init: function() {
        if (this.initialized == false)
        {
            this.map = new Map();
            this.map.init();

            this.events = new Events();

            this.initialized = true;
        }
        return this;
    },

    start: function() {
        var instance = this;
        $('#map').everyTime(1000, function() {
            instance.run();
        });
        return this;
    },

    run: function() {
        this.move().display();
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
            mapElt.append('<div class="cell" style="top: '+ cell.y * this.map.cellSize +'; left: '+ cell.x * this.map.cellSize +';"></div>');
        }

        this.events.bindAll();

        return this;
    }
}
