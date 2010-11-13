function Events(game) {
    this.game = game;
    this.selected = null;
}

Events.prototype = {
    bindAll: function() {
        this.bindMove();
        return this;
    },

    clickUnit: function(clickedElt) {
        return this;
    },

    bindMove: function() {
        var instance = this;
        $('.unit').click(function() {
            instance.clickUnit($(this));
        });
        $('.cell').click(function() {
            instance.clickCell($(this));
        });
        return this;
    }
}
