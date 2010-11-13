function Events(game) {
    this.game = game;
    this.bound = $.browser == 'msie' ? '#tetris' : window;
}

Events.prototype = {
    bindAll: function() {
        this.bindKeys();
        return this;
    },

    bindKeys: function() {
        var instance = this;
        $(this.bound).keypress(function(e) {
            switch(e.charCode || e.keyCode) {
                case 74: case 106: instance.game.map.currentBrick.moveLeft(); break; // J
                case 76: case 108: instance.game.map.currentBrick.moveRight(); break; // L
                case 73: case 105: instance.game.map.currentBrick.changeShape(); break; // I
            }
            return false;
        });
    }
}
