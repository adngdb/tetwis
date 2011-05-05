/**
 * Class MessageBuilder
 * Create messages to send to the server in a simple way.
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
tetwis.MessageBuilder = function() {
}

tetwis.MessageBuilder.prototype = {

    /**
     * Create the basic structure of a message, and stringify to JSON.
     * @param type Type of message. Can be "login", "query", "data" or "action".
     * @param data Object containing data of the message.
     * @return JSON message to send.
     */
    createMessage: function(type, data) {
        var msg = {
            type: type,
            data: data
        };

        return JSON.stringify(msg);
    },

    /**
     * Create a login message, and stringify to JSON.
     * @param login Username.
     * @param data Object containing other login data.
     * @return JSON message to send.
     */
    createLogin: function(login, data) {
        data.username = login;
        return this.createMessage('login', data);
    },

    /**
     * Create a query message, and stringify to JSON.
     * @param responseMethod Type of message we want to receive in response.
     * @param responseData Object containing data about this query.
     * @return JSON message to send.
     */
    createQuery: function(responseMethod, responseData) {
        var data = {};
        data.response_type = responseMethod;
        data.query_data = responseData;
        return this.createMessage("query", data);
    },

    /**
     * Create an action message, and stringify to JSON.
     * @param name Name of the action.
     * @param data Object containing data about this action.
     * @return JSON message to send.
     */
    createAction: function(name, data) {
        var actionData = {};
        actionData.name = name;
        actionData.data = data;
        return this.createMessage("action", actionData);
    },

    /**
     * Create a login message to authenticate on the server.
     * @param login Login of the user.
     * @param password Password of the user.
     * @return JSON message to send.
     */
    createAuthenticationLogin: function(login, password) {
        var data = {};
        if (password != null) {
            data.password = password;
        }
        return this.createLogin(login, data);
    },

	/**
	 * Create a query to ask for the games list.
     * @return JSON message to send.
     */
    createGamesListQuery: function() {
		return this.createQuery('data', { data_name: 'games-list' });
	},

    /**
     * Create an action message to join a game.
     * @param gameId Identifier of the game to join.
     * @return JSON message to send.
     */
    createJoinGameAction: function(gameId) {
        var data = {};
        data.game_id = gameId;
        return this.createAction("join-game", data);
    },

	// TODO: change method name for consistency
    getChangeBrick: function(action) {
		return this.createAction(action, {});
    },

	// TODO: change method name for consistency
    getMoveLeft: function() {
        return this.getChangeBrick("move-left");
    },

	// TODO: change method name for consistency
    getMoveRight: function() {
        return this.getChangeBrick("move-right");
    },

	// TODO: change method name for consistency
    getChangeShape: function() {
        return this.getChangeBrick("change-shape");
    },

}
