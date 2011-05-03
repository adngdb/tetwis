var sys = require("sys");

/**
 * Class MessageParser
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function MessageParser(game) {
    this.game = game;
    this.game.mp = this;
}

MessageParser.prototype = {

    parse: function(message, clientId) {
        var obj = JSON.parse(message);

        switch (obj.type) {
            case "query":
                this.parseQuery(obj.data, clientId);
                break;
            case "login":
                this.parseLogin(obj.data, clientId);
                break;
            case "action":
                this.parseAction(obj.data, clientId);
                break;
            case "data":
                this.parseData(obj.data, clientId);
                break;
            default:
                throw "Unknown message type"; // TODO: using an object of type Exception
        }
        return this;
    },

    parseQuery: function(data, clientId) {
        return this;
    },

    parseLogin: function(data, clientId) {
        return this;
    },

    parseAction: function(action, clientId) {
        switch (action.name) {
            case "move-left":
                this.game.moveLeft(clientId);
                break;
            case "move-right":
                this.game.moveRight(clientId);
                break;
            case "change-shape":
                this.game.changeShape(clientId);
                break;
        }
        return this;
    },

    parseData: function(data, clientId) {
        return this;
    },

}

module.exports = MessageParser;
