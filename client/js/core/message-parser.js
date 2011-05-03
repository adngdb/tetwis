tetwis.MessageParser = function(engine) {
    this.engine = engine;
}

tetwis.MessageParser.prototype = {

    parse: function(msg) {
        var data = JSON.parse(msg);

        if (data.method == "get") {
            if (data.object == "map") {
                this.engine.game.init(data.data);
            }
        }
        else if (data.method == "update") {
            if (data.object == "map") {
                this.engine.game.updateMap(data.data);
            }
            else if (data.object == "playersInfo") {
                this.engine.game.updatePlayersInfo(data.data);
            }
        }
    },

}
