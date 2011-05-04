var sys = require("sys");

/**
 * Class MessageParser
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function MessageParser(engine) {
    this.engine = engine;
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
		var user = this.engine.getUser(clientId);
		if (user != null) {
			user.login = data.username;
		}
        return this;
    },

    parseAction: function(action, clientId) {
		var user = this.engine.getUser(clientId);

		if (user != null && user.inGame != null) {
			var game = this.engine.getGame(user.inGame);

			if (game != null)
			{
				switch (action.name) {
					case "move-left":
						game.moveLeft(clientId);
						break;
					case "move-right":
						game.moveRight(clientId);
						break;
					case "change-shape":
						game.changeShape(clientId);
						break;
				}
			}
		}
		else if (user != null && user.inGame == null) {
			switch (action.name) {
				case "create-game":
					this.engine.createGame(user);
					break;
				case "join-game":
					this.engine.joinGame( user, data.game_id );
					break;
			}
		}
        return this;
    },

    parseData: function(data, clientId) {
        return this;
    },

}

module.exports = MessageParser;
