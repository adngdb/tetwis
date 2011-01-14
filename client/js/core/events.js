function Events(game) {
    this.game = game;
    this.bound = $.browser == 'msie' ? '#map' : window;
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
                case 74: case 106: instance.game.moveLeft(); break; // J
                case 76: case 108: instance.game.moveRight(); break; // L
                case 73: case 105: instance.game.changeShape(); break; // I
            }
            return false;
        });
    }
}
