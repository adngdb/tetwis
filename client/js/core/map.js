/**
 * Map class
 * Manages the map, meaning all the cells and the current brick
 */
function Map(game, data) {
    this.game = game;

    this.width = data.width;
    this.height = data.height;
    this.cellSize = data.cellSize;

    this.grid = data.grid;

    this.cells = data.cells;

    this.colors = data.colors;
    this.shapes = data.shapes;

    this.bricks = data.bricks;
}

Map.prototype = {

    /**
     * Initialize the map
     */
    init: function() {
        // First brick
        //this.currentBrick = this.newBrick();

        return this;
    },

    update: function(data) {
        this.cells = data.cells;
        this.bricks = data.bricks;
        this.updateBricks();
    },

    updateBricks: function() {
        for (var i = 0; i < this.bricks.length; i++) {
            var brick = this.bricks[i];
            this.bricks[i] = new Brick(brick);
        }
    },

    /**
     * Tell wether a brick can go to a given position or not
     */
    canGo: function(brick, x, y) {
        var i, j;
        var shape = brick.getShape();
        for (i = 0; i < 4; ++i) {
            for (j = 0; j < 4; ++j) {
                if (shape[i][j] == 1) {
                    var cellx = i + x;
                    var celly = j + y;
                    // tester si la forme sort des frontières
                    if (cellx >= this.width || cellx < 0) {
                        return false;
                    }
                    else if (celly >= this.height) {
                        return false;
                    }
                    // tester si la forme est sur une cellule existante
                    for (var k = 0, nb = this.cells.length; k < nb; k++) {
                        if (cellx == this.cells[k].x && celly == this.cells[k].y) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    },

    /**
     * Generate a new random brick
     */
    newBrick: function() {
        var r = 1 + Math.random() * 7;
        var shapeId = parseInt(r > 7 ? 7 : r, 10);
        var brick = new Brick(this, this.shapes[shapeId], this.colors[shapeId]);
        return brick;
    },

    /**
     * Create and assign the next brick
     */
    nextBrick: function() {
        for (var i = 0, nb = this.currentBrick.cells.length; i < nb; i++) {
            this.currentBrick.cells[i].x += this.currentBrick.x;
            this.currentBrick.cells[i].y += this.currentBrick.y;

            this.cells.push(this.currentBrick.cells[i]);
            this.grid[this.currentBrick.cells[i].x][this.currentBrick.cells[i].y] = this.currentBrick.cells[i];
        }
        var newBrick = this.newBrick();

        // Is the game lost?
        if (!this.canGo(newBrick, newBrick.x, newBrick.y)) {
            this.game.gameOver();
        }
        else {
            this.currentBrick = newBrick;
        }

        return this;
    },

    /**
     * Check wether there are complete lines, and delete them if so
     */
    checkLines: function() {
        var i, j, res = false;
        for (j = 0; j < this.height; j++) {
            for (i = 0; i < this.width; i++) {
                if (this.grid[i][j] == null) {
                    break;
                }
            }
            if (i == this.width) {
                // complete line found
                res = true;
                // remove cells of the line
                for (var k = j; k > 0; k--) {
                    for (i = 0; i < this.width; i++) {
                        this.grid[i][k] = this.grid[i][k-1];
                    }
                }
                for (var l = 0, nb = this.cells.length; l < nb; l++) {
                    if (this.cells[l].y == j) {
                        this.cells.splice(l, 1);
                        --l;
                        --nb;
                    }
                    else if (this.cells[l].y < j) {
                        ++this.cells[l].y;
                    }
                }
            }
        }
        return res;
    }
}
