tetwis.MessageParser = function(engine) {
    this.engine = engine;
}

tetwis.MessageParser.prototype = {

    parse: function(msg) {
        var obj = JSON.parse(msg);

		if (typeof obj.type != undefined && obj.type != null) {
			switch (obj.type) {
				case "query":
					this.parseQuery(obj.data);
					break;
				case "action":
					this.parseAction(obj.data);
					break;
				case "data":
					this.parseData(obj.data);
					break;
				default:
					throw "Unknown message type"; // TODO: using an object of type Exception
			}
		}
		else {
			this.parseOld(obj);
		}

        return this;
    },

	/**
	 * @deprecated
	 */
    parseOld: function(data) {
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

    parseQuery: function(data) {
        return this;
    },

    parseAction: function(data) {
        return this;
    },

    parseData: function(data) {
        switch (data.method) {
            case "new":
                this.parseNewData(data.object, data.object_data);
                break;
            case "update":
                this.parseUpdateData(data.object, data.object_data);
                break;
            case "delete":
                this.parseDeleteData(data.object, data.object_data);
                break;
        }
        this.gameEngine.invalidate();
        return this;
    },

    parseNewData: function(object, data) {
        switch (object) {
            case "Game":
                this.gameEngine.world.gameData(data);
                break;
            case "Player":
                this.gameEngine.world.playerData(data);
                break;
            case "Map":
                this.gameEngine.world.mapData(data);
                break;
        }
        return this;
    },

    parseUpdateData: function(object, data) {
        switch (object) {
            case "Game":
                this.gameEngine.world.gameUpdate(data);
                break;
            case "Player":
                this.gameEngine.world.playerUpdate(data);
                break;
        }
        return this;
    },

    parseDeleteData: function(object, data) {
        return this;
    },

}
