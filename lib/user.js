
/**
 * Class User
 *
 * @author Adrian Gaudebert - adrian@gaudebert.fr
 * @constructor
 */
function User(client) {
	this._client = client;

    this.id = client.id;
    this.login = null;
    this.inGame = null;
};

User.prototype = {

	send: function(msg) {
		this._client.send(msg);
	},

};

module.exports = User;
