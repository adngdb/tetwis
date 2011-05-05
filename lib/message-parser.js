var util = require("util");

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
		var user = this.engine.getUser(clientId);
		if (user != null) {
			var obj = JSON.parse(message);

			switch (obj.type) {
				case "query":
					this.parseQuery(obj.data, user);
					break;
				case "login":
					this.parseLogin(obj.data, user);
					break;
				case "action":
					this.parseAction(obj.data, user);
					break;
				case "data":
					this.parseData(obj.data, user);
					break;
				default:
					throw "Warning - MessageParser.parse - Unknown message type: " + obj.type; // TODO: using an object of type Exception
			}
		}
		else {
			util.log('Warning - MessageParser.parse - Unknown user id: ' + clientId);
		}

        return this;
    },

    parseQuery: function(data, user) {
		switch (data.response_type) {
			case 'data':
				this.parseQueryData(data.query_data);
				break;
			default:
				throw "Warning - MessageParser.parseQuery - Unknown asked response type: " + data.response_type; // TODO: using an object of type Exception
		}

        return this;
    },

    parseQueryData: function(data, user) {
		switch (data.data_name) {
			case 'games-list':
				user.send( this.engine.getGamesListMessage() );
				break;
			default:
				throw "Warning - MessageParser.parseQueryData - Unknown asked data name: " + data.data_name; // TODO: using an object of type Exception
		}

        return this;
	},

    parseLogin: function(data, user) {
		user.login = data.username;
		util.log('User '+user.id+' is now known as '+data.username);
        return this;
    },

    parseAction: function(action, user) {
		if (user.inGame != null) {
			var game = this.engine.getGame(user.inGame);

			if (game != null)
			{
				switch (action.name) {
					case "move-left":
						game.moveLeft(user.id);
						break;
					case "move-right":
						game.moveRight(user.id);
						break;
					case "change-shape":
						game.changeShape(user.id);
						break;
				}
			}
		}
		else {
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

    parseData: function(data, user) {

        return this;
    },

}

module.exports = MessageParser;
