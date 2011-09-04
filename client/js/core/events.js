tetwis.Events = function(game) {
    this.game = game;
    this.bound = $.browser == 'msie' ? '#map' : window;
}

tetwis.Events.prototype = {
    bindAll: function() {
        this.bindKeys();
        return this;
    },

    bindKeys: function() {
        var instance = this;
        $(this.bound).keypress(function(e) {
            switch(e.charCode || e.keyCode) {
                case 74: case 106: // J
                case 65: case 97: // A
                case 81: case 113: // Q
                case 37: // Left arrow
                  this.game.moveLeft();
                  return false;
                case 76: case 108: // L
                case 68: case 100: // D
                case 39: // Right arrow
                  this.game.moveRight();
                  return false;
                case 73: case 105: // I
                case 87: case 119: // W
                case 90: case 122: // Z
                case 38: // Up arrow
                  this.game.changeShape();
                  return false;
            }
        }.bind(this));
    }
}
