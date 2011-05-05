
var util 				= require('util')
	,User 				= require('./user.js')
	,Game 				= require('./game.js')
	,MessageParser 		= require('./message-parser.js')
	,MessageBuilder 	= require('./message-builder.js')
	;

function Engine(server) {
	this.server = server;

	this.messageParser = null;
	this.messageBuilder = null;

    this.users = [];
    this.games = [];

    this.gameId = 0;
}

Engine.prototype = {

	/**
	 * Initializes the Engine, creates the message parser and builder.
	 *
	 * @return this.
	 */
	init: function() {
		this.messageParser = new MessageParser(this);
		this.messageBuilder = new MessageBuilder();

		return this;
	},

	//---> Users

	/**
	 * Get a user by its id.
	 *
	 * @param id Id of the user (same as the client id and player id).
	 * @return User object or null.
	 */
	getUser: function(id) {
		return this.users[id];
	},

	/**
	 * Creates a new user object and adds it to the list.
	 *
	 * @param client Client object handling the connection.
	 * @return The new user.
	 */
    addUser: function(client) {
        return this.users[client.id] = new User(client);
    },

	/**
	 * Called when a client disconnect.
	 *
	 * @param client Client object handling the connection.
	 * @return this.
	 */
    clientClose: function(client) {
		// TODO
        return this;
	},

	//---> Games

	/**
	 * Get a game by its id.
	 *
	 * @param id Id of the game.
	 * @return Game object or null.
	 */
    getGame: function(id) {
        return this.games[id];
    },

	/**
	 * Creates a new game object and adds it to the list.
	 *
	 * @param id Id of the new game to create.
	 * @return The new game.
	 */
    addGame: function(id) {
        return this.games[id] = new Game(id, this).init().start();
    },

	/**
	 * Creates a new game and makes the user join it.
	 *
	 * @param user User joining the game (User object).
	 * @return The new game.
	 */
    createGame: function(user) {
		var game = this.addGame(this.gameId++);
		game.newPlayer(user);

		return game;
	},

	/**
	 * Adds a user to an existing game.
	 *
	 * @param user User joining the game (User object).
	 * @param gameId ID of the game to join.
	 * @return The new game.
	 */
	joinGame: function(user, gameId) {
		var game = this.getGame(gameId);
		if (game != null) {
			game.newPlayer(user);
		}

		return game;
	},

	getGamesListMessage: function() {
		return this.messageBuilder.createGamesListData(this.games);
	},

};

module.exports = Engine;
