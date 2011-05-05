/**
 * Class Engine
 * Central class, creates the configuration, the server connection,
 * then displays games lists and launches games.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
tetwis.Engine = function() {
    this.config = null;

    this.socket = null;
    this.messageParser = null;
    this.messageBuilder = null;

    this.games = [];
};

tetwis.Engine.prototype = {

	/**
	 * Initializes the game engine. Creates the MessageParser and MessageBuilder.
	 * @return this.
	 */
	init: function() {
        tetwis.mp = this.messageParser = new tetwis.MessageParser(this);
        tetwis.mb = this.messageBuilder = new tetwis.MessageBuilder();

        return this;
	},

	/**
	 * Launches the engine by loading the configuration.
	 * @return this.
	 */
	launch: function() {
		this.loadConfig();
        return this;
	},

	/**
	 * Loads the configuration and places it in the tetwis namespace.
	 * @return this.
	 */
	loadConfig: function() {
        tetwis.config = this.config = new tetwis.Config().load( this.onConfigLoaded.bind(this) );
        return this;
    },

	/**
	 * Callback function called when the configuration is loaded.
	 */
    onConfigLoaded: function() {
		tetwis.displayer.setState("Connecting to the server... ");
		this.openConnection();
	},

	/**
	 * Opens a connection to the server.
	 * @return this.
	 */
	openConnection: function() {
		tetwis.socket = this.socket = new tetwis.Socket().init( this.onConnectionOpened.bind(this) );
        return this;
	},

	/**
	 * Callback function called when the connection to the server is opened.
	 */
	onConnectionOpened: function() {
		this.socket.send( this.messageBuilder.createAuthenticationLogin( tetwis.user ) );
		this.getGamesList();

		//this.launchNewGame();
	},

	getGamesList: function() {
		this.socket.send( this.messageBuilder.createGamesListQuery() );
	},

	setGamesList: function(gamesList) {
		this.games = gamesList;
		this.launchGamesList();
	},

	launchGamesList: function() {
		var gamesList = { games: this.games };
		tetwis.displayer.displayTemplate('templates/games-list.html', gamesList, function() {
			$('#create-game').click(function() {
				tetwis.engine.createGame();
			});
		});
	    return this;
	},

	createGame: function() {
		this.socket.send( this.messageBuilder.createCreateGameAction() );
		this.launchNewGame();
	},

	/**
	 * Creates a new game and launches it.
	 * @return this.
	 */
	launchNewGame: function() {
		tetwis.displayer.displayTemplate('templates/loading.html', null, function(data) {
			tetwis.displayer.setState("Receiving data...");
		});
		this.game = new tetwis.Game();
	    return this;
	},

};
