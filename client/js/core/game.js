/**
 * Game class
 * Launches, handles and displays the current game.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
tetwis.Game = function() {
    this.initialized = false;

    this.events = null;
    this.map = null;

    this.score = 0;
    this.level = 0;

    this.displayDelay = 100; // TODO move to the config file (see Displayer)
}

tetwis.Game.prototype = {

    /**
     * Initializes the Game object
     */
    init: function(data) {
        tetwis.log("Game: init");
        if (this.initialized == false)
        {
            this.events = new tetwis.Events(this);
            this.events.bindAll();

            this.map = new tetwis.Map(data);

			// loading the game template
			tetwis.displayer.displayTemplate('templates/game.html', null, function() {
				var cellSize = this.map.cellSize,
					height = this.map.height * cellSize,
					width  = this.map.width * cellSize;

				$('#map').width(width).height(height);
				$('#players').width(width);

				for (var i = 0; i < tetwis.config.players.number; i++) {
					$('#p'+(i+1)).css('color', tetwis.config.players.colors[i]);
				}

				tetwis.displayer.setMap(this.map);
				tetwis.displayer.start();

			}.bind(this));

            this.initialized = true;
        }
        return this;
    },

    /**
     * Updates the map with data comming from the server, then displays the game.
     * @param data Object containing the new Map data.
     */
    updateMap: function(data) {
        this.map.update(data);
    },

    updatePlayersInfo: function(data) {
        $('#ingame-number').text(data.ingame);
        $('#awaiting-number').text(data.awaiting);
    },

    /**
     * The game is lost, tell so to the player and stop it
     */
    gameOver: function() {
        tetwis.log('Game OVER!');
        return this;
    },

    /**
     * Sends a message to the server.
     * @param msg String containing the message to send.
     */
    send: function(msg) {
        tetwis.socket.send(msg);
    },

    /**
     * Asks the server to move our brick to the left.
     */
    moveLeft: function() {
        this.send( tetwis.mb.getMoveLeft() );
    },

    /**
     * Asks the server to move our brick to the right.
     */
    moveRight: function() {
        this.send( tetwis.mb.getMoveRight() );
    },

    /**
     * Asks the server to change the shape of our brick.
     */
    changeShape: function() {
        this.send( tetwis.mb.getChangeShape() );
    },
}

function log(msg) {
    $('#log').append('<li>' + msg + '</li>');
}
