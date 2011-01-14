/**
 * Class Brick
 * Represents a brick that can be moved
 */
function Brick(data) {
    this.x = data.x;
    this.y = data.y;
    this.color = data.color;

    this.cells = data.cells;

    for (var i = 0; i < this.cells.length; i++) {
        var cell = this.cells[i];
        this.cells[i] = new Cell(cell);
    }
}

Brick.prototype = {
}
