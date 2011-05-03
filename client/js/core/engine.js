/**
 * Class Engine
 * Central class, creates the configuration, the server connection,
 * then displays lists and launches games.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
tetwis.Engine = function() {
    this.config = null;

    this.socket = null;
    this.messageParser = null;
    this.messageBuilder = null;
};

tetwis.Engine.prototype = {

	init: function() {
        tetwis.mp = this.messageParser = new tetwis.MessageParser(this);
        tetwis.mb = this.messageBuilder = new tetwis.MessageBuilder();

        return this;
	},

	launch: function() {
		this.loadConfig();
        return this;
	},

	/**
	 * Load the configuration and places it in the tetwis namespace.
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
	 * Open a connection to the server.
	 */
	openConnection: function() {
		tetwis.socket = this.socket = new tetwis.Socket().init( this.onConnectionOpened.bind(this) );
        return this;
	},

	/**
	 * Callback function called when the connection to the server is opened.
	 */
	onConnectionOpened: function() {
		this.launchNewGame();
	},

	launchNewGame: function() {
		tetwis.displayer.setState("Receiving data...");

		this.game = new tetwis.Game();

	},

};
