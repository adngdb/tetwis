function Config(game) {
    this.game = game;

    this.configFile = "http://localhost/tetwis/game.conf";

    this.server = null;
    this.map = null;
    this.players = null;
};

Config.prototype = {

    load: function() {
        log("Loading configuration");
        var instance = this;
        $.getJSON(this.configFile, function(data) {
            log("Configuration loaded");

            instance.server = data.server;
            instance.map = data.map;
            instance.players = data.players;

            instance.game.launch();
        });
        return this;
    },

};
