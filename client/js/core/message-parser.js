function MessageParser(game) {
    this.game = game;
}

MessageParser.prototype = {

    parse: function(msg) {
        var data = JSON.parse(msg);
        log(data);

        if (data.method == "get") {
            if (data.object == "map") {
                this.game.initMap(data.data);
            }
        }
        else if (data.method == "update") {
            if (data.object == "map") {
                this.game.updateMap(data.data);
            }
        }
    },

    getChangeBrick: function(action) {
        return JSON.stringify({
            method: "do",
            object: "brick",
            data: {
                action: action
            },
        });
    },

    getMoveLeft: function() {
        return this.getChangeBrick("moveLeft");
    },

    getMoveRight: function() {
        return this.getChangeBrick("moveRight");
    },

    getChangeShape: function() {
        return this.getChangeBrick("changeShape");
    },
}
