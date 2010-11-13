function Map(game) {
    this.game = game;

    this.width = 40;
    this.height = 40;
    this.cellSize = 10;

    this.currentBrick = null;
    this.grid = [];

    this.cells = [];

    this.colors = ['#eaeaea','#ff6600','#eec900','#0000ff',
        '#cc00ff','#00ff00','#66ccff','#ff0000'];
    this.shapes = [
        // 0 = none
        [],
        // 1 = I
        [[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
         [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]],
        // 2 = T
        [[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],
         [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]],
         [[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
         [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
        // 4 = L
        [[[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],
         [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
         [[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
         [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]]],
        // 5 = J
        [[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
         [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
         [[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]],
         [[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]]],
        // 6 = Z
        [[[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],
         [[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]],
        // 7 = S
        [[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],
         [[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]]],
        // 8 = O
        [[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]]];
}

Map.prototype = {
    init: function() {
        // Init the grid
        //~ for (var x = 0; x < this.width + 2; x++) {
            //~ this.grid[x] = [];
            //~ for (var y = 0; y < this.height; y++) {
                //~ var i = 0;
                //~ if (x == 0 || x == this.width + 1)
                    //~ i = 1;
                //~ this.grid[x][y] = i;
            //~ }
        //~ }
        //~ this.grid[this.height] = [];
        //~ for (var x = 0; x <= this.width + 2; x++) {
            //~ this.grid[this.height][x] = 1;
        //~ }

        // First brick
        this.currentBrick = this.newBrick();

        return this;
    },

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

    newBrick: function() {
        var r = 1 + Math.random() * 7;
        var shapeId = parseInt(r > 7 ? 7 : r, 10);
        var brick = new Brick(this, this.shapes[shapeId], this.colors[shapeId]);
        return brick;
    },

    nextBrick: function() {
        for (var i = 0, nb = this.currentBrick.cells.length; i < nb; i++) {
            this.currentBrick.cells[i].x += this.currentBrick.x;
            this.currentBrick.cells[i].y += this.currentBrick.y;

            this.cells.push(this.currentBrick.cells[i]);
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
    }
}
