/**
 * Map class
 * Manages the map, meaning all the cells and the current brick
 */
function Map(game, data) {
    this.game = game;

    this.width = game.config.map.width;
    this.height = game.config.map.height;
    this.cellSize = game.config.map.cellSize;

    this.cells = data.cells;
    this.bricks = data.bricks;
}

Map.prototype = {

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
            this.bricks[i] = new Brick(brick);
        }
    },
}
