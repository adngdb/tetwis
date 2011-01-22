function Config(game) {
    this.game = game;

    // TODO couper au dernier slash, si on appelle index.html par exemple
    this.configFile = window.location.href + "game.conf";

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
