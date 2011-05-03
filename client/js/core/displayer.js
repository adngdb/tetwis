/**
 * Class Displayer
 * Displays the game.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
tetwis.Displayer = function(map, delay) {
    this.map = map;

    this.htmlElt = $('#map');
    this.cellSize = this.map.cellSize;
    this.cellSizeCSS = this.cellSize - 1;

    this.delay = delay;
    this.intervalId = null;
}

tetwis.Displayer.prototype = {

    start: function() {
        this.intervalId = window.setInterval(this.display.bind(this), this.delay);
        return this;
    },

    stop: function() {
        window.clearInterval(this.intervalId);
        return this;
    },

    display: function() {
        // Reset current map
        this.htmlElt.empty();

        // Displaying map
        for (var i = 0, size = this.map.cells.length; i < size; i++) {
            var cell = this.map.cells[i];
            this.htmlElt.append('<div class="cell" style="top: '+ cell.y * this.cellSize +'px; left: '+ cell.x * this.cellSize +'px; background-color: '+ cell.color +'; width: '+this.cellSizeCSS+'px; height: '+this.cellSizeCSS+'px;"></div>');
        }

        for (var k = 0, nb = this.map.bricks.length; k < nb; k++) {
            var currentBrick = this.map.bricks[k];
            for (var i = 0, size = currentBrick.cells.length; i < size; i++) {
                var cell = currentBrick.cells[i];
                this.htmlElt.append('<div class="cell" style="top: '+ (currentBrick.y + cell.y) * this.cellSize +'px; left: '+ (currentBrick.x + cell.x) * this.cellSize +'px; background-color: '+ cell.color +'; width: '+this.cellSizeCSS+'px; height: '+this.cellSizeCSS+'px;"></div>');
            }
        }

        return this;
    },
};
