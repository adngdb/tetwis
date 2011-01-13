function MessageParser(game) {
    this.game = game;
}

MessageParser.prototype = {

    parse: function(msg) {
        var data = JSON.parse(msg);
    }
}
