tetwis.Config = function() {
    // TODO couper au dernier slash, si on appelle index.html par exemple
    this.configFile = window.location.href + "game.conf";

    this.server = null;
    this.map = null;
    this.players = null;
};

tetwis.Config.prototype = {

    load: function(callback) {
        tetwis.log("Loading configuration");
        var instance = this;
        $.getJSON(this.configFile, function(data) {
            tetwis.log("Configuration loaded");

            this.server = data.server;
            this.map = data.map;
            this.players = data.players;

            callback();
        }.bind(this));
        return this;
    },

};
