var Cell = require("./cell.js");

/**
 * Class Brick
 * Represents a brick that can be moved
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function Brick(map, shape, color, isFake) {
    this.map = map;

    this.shape = shape;
    this.currentShape = 0;

    this.x = 0;
    this.y = 0;
    this.color = color;

    this.isBottom = isFake;

    this.cells = [];

    this.init();
}

Brick.prototype = {

    /**
     * Initialize the brick
     */
    init: function() {
        if (!this.isBottom) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (this.shape[this.currentShape][i][j] == 1) {
                        this.cells.push(new Cell(i, j, this.color));
                    }
                }
            }
        }
        return this;
    },

    /**
     * Reset the brick
     */
    reset: function() {
        this.cells = [];
        return this;
    },

    /**
     * Move the brick to the left if possible
     */
    moveLeft: function() {
        if (!this.isBottom && this.map.canGo(this, this.x - 1, this.y)) {
            --this.x;
        }
        return this;
    },

    /**
     * Move the brick to the right if possible
     */
    moveRight: function() {
        if (!this.isBottom && this.map.canGo(this, this.x + 1, this.y)) {
            ++this.x;
        }
        return this;
    },

    /**
     * Move the brick down if possible
     */
    moveBottom: function() {
        if (!this.isBottom) {
            if (this.map.canGo(this, this.x, this.y + 1)) {
                ++this.y;
            }
            else {
                // on ne peut plus descendre, on est donc au plus bas
                this.touchdown();
            }
        }
        return this;
    },

    /**
     * Change the shape of the brick
     */
    changeShape: function() {
        if (!this.isBottom) {
            var oldShape = this.currentShape;
            this.currentShape = ( this.currentShape == this.shape.length - 1 ) ? 0 : this.currentShape + 1;
            if (!this.map.canGo(this, this.x, this.y)) {
                this.currentShape = oldShape;
            }
            return this.reset().init();
        }
        return this;
    },

    /**
     * The brick cannot go down anymore
     */
    touchdown: function() {
        this.isBottom = true;
        return this;
    },

    /**
     * Return the current shape of the brick
     */
    getShape: function() {
        return this.shape[this.currentShape];
    },

    toJSON: function() {
        var brickData = {
            x: this.x,
            y: this.y,
            color: this.color,
            cells: this.cells,
        }
        return brickData;
    },
}

module.exports = Brick;
