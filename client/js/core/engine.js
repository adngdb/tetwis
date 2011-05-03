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

};

tetwis.Engine.prototype = {

	/**
	 * Load the configuration and places it in the tetwis namespace.
	 */
	loadConfig: function() {
        tetwis.config = this.config = new tetwis.Config().load(this.configReady.bind(this));
        return this;
    },

	/**
	 * Callback function called when the configuration is loaded.
	 */
    configReady: function() {
		alert('hello');
	},

};
