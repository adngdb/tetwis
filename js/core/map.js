function Map() {
    this.width = 40;
    this.height = 100;
    this.cellSize = 10;

    this.currentBrick = null;
    this.grid = [];

    this.cells = [];

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
        for (i = 0; i < 4; ++i) {
            for (j = 0; j < 4; ++j) {
                //~ alert(i + ', ' + j);
                //~ alert(this.grid[y + j][x + i]);
                //~ alert(brick.shape[j][i]);
                if (brick.shape[j][i] && this.grid[y + j][x + i]) {
                    return false;
                }
            }
        }
        return true;
    },

    newBrick: function() {
        var r = 1 + Math.random() * 7;
        var shapeId = parseInt(r > 7 ? 7 : r, 10);
        var brick = new Brick(this, this.shapes[shapeId]);
        return brick;
    }
}
