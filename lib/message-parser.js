var sys = require("sys");

function MessageParser(game) {
    this.game = game;
    this.game.mp = this;
}

MessageParser.prototype = {
    parse: function(msg, client) {
        sys.log("MessageParser: parse = " + msg);
        var action = JSON.parse(msg);

        if (action.method == "do") {
            if (action.object == "brick") {
                if (action.data.action == "moveLeft") {
                    this.game.moveLeft(client);
                }
                else if (action.data.action == "moveRight") {
                    this.game.moveRight(client);
                }
                else if (action.data.action == "changeShape") {
                    this.game.changeShape(client);
                }
            }
        }
    },

    updatePlayersInfo: function(nbPlayers, nbAwaitings) {
        var data = {
            method: "update",
            object: "playersInfo",
            data: {
                ingame: nbPlayers,
                awaiting: nbAwaitings
            }
        };

        var json = JSON.stringify(data);

        this.game.sendAll(json);
    },
}

module.exports = MessageParser;
