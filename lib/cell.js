exports.Cell = function(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
}

exports.Cell.prototype = {
    toJSON: function() {
        return {
            x: this.x,
            y: this.y,
            color: this.color,
        };
    }
}
