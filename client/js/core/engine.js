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

	loadConfig: function() {
        tetwis.config = this.config = new tetwis.Config().load();
        return this;
    },

};
