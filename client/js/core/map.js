/**
 * Map class
 * Manages the map, meaning all the cells and the current brick
 */
tetwis.Map = function(game, data) {
    this.game = game;

    this.width = tetwis.config.map.width;
    this.height = tetwis.config.map.height;
    this.cellSize = tetwis.config.map.cellSize;

    this.cells = data.cells;
    this.bricks = data.bricks;
}

tetwis.Map.prototype = {

    update: function(data) {
        if (typeof data.cells != undefined && data.cells != null) {
            this.cells = data.cells;
        }
        if (typeof data.bricks != undefined && data.bricks != null) {
            this.bricks = data.bricks;
            this.updateBricks();
        }
    },

    updateBricks: function() {
        for (var i = 0; i < this.bricks.length; i++) {
            var brick = this.bricks[i];
            this.bricks[i] = new tetwis.Brick(brick);
        }
    },
}
