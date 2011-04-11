/**
 * Class Cell
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function Cell(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
}

Cell.prototype = {
    toJSON: function() {
        return {
            x: this.x,
            y: this.y,
            color: this.color,
        };
    }
}

module.exports = Cell;
