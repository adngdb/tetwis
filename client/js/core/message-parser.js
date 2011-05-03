tetwis.MessageParser = function(game) {
    this.game = game;
}

tetwis.MessageParser.prototype = {

    parse: function(msg) {
        var data = JSON.parse(msg);

        if (data.method == "get") {
            if (data.object == "map") {
                this.game.init(data.data);
            }
        }
        else if (data.method == "update") {
            if (data.object == "map") {
                this.game.updateMap(data.data);
            }
            else if (data.object == "playersInfo") {
                this.game.updatePlayersInfo(data.data);
            }
        }
    },

}
