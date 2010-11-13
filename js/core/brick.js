function Brick(map, shape) {
    this.map = map;

    this.shape = shape;
    this.currentShape = 0;

    this.x = 0;
    this.y = 0;

    this.cells = [];
}

Brick.prototype = {
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
        return this;
    },

    changeShape: function() {
        this.currentShape = ( this.currentShape == this.shape.length - 1 ) ? 0 : this.currentShape + 1;
        return this;
    }
}
