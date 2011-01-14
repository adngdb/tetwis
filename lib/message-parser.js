var sys = require("sys");

exports.MessageParser = function(game) {
    this.game = game;
}

exports.MessageParser.prototype = {
    parse: function(msg, client) {
        var action = JSON.parse(msg);

        if (action.method == "get") {
            if (action.object == "map") {
                //this.game.
            }
        }
    }
}
