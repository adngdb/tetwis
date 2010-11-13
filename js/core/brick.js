function Brick(map, shape, color) {
    this.map = map;

    this.shape = shape;
    this.currentShape = 0;

    this.x = 4;
    this.y = 4;
    this.color = color;

    this.cells = [];

    this.init();
}

Brick.prototype = {
    init: function() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.shape[this.currentShape][i][j] == 1) {
                    this.cells.push(new Cell(i, j, this.color));
                }
            }
        }
        return this;
    },

    reset: function() {
        this.cells = [];
        return this;
    },

    moveLeft: function() {
        if (this.map.canGo(this, this.x - 1, this.y)) {
            --this.x;
        }
        return this;
    },

    moveRight: function() {
        if (this.map.canGo(this, this.x + 1, this.y)) {
            ++this.x;
        }
        return this;
    },

    moveBottom: function() {
        if (this.map.canGo(this, this.x, this.y + 1)) {
            ++this.y;
        }
        else {
            // on ne peut plus descendre, on est donc au plus bas
            this.touchdown();
        }
        return this;
    },

    changeShape: function() {
        this.currentShape = ( this.currentShape == this.shape.length - 1 ) ? 0 : this.currentShape + 1;
        return this.reset().init();
    },

    touchdown: function() {
        this.map.nextBrick();
    },

    getShape: function() {
        return this.shape[this.currentShape];
    }
}
