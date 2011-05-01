
(function() {
	var user = null;

	load("js/libs/jquery.min.js")
	.then("js/libs/jquery.tmpl.js")
	.thenRun(function() {
		$.get('templates/login.html', function(data) {
			$.tmpl(data).appendTo('#content');

			$('#submit-login').click(function (e) {
				e.preventDefault();
				var login = $('#user-login').val();

				if (login != null && login != '') {
					user = login;
					$('#content').empty();
					next();
				}
			});
		});
	});

	function next() {
		load("js/libs/socket.io.min.js",
			"js/libs/jquery.timers.js",
			"js/libs/json2.js",
			"js/core/config.js",
			"js/core/cell.js",
			"js/core/brick.js",
			"js/core/map.js",
			"js/core/displayer.js",
			"js/core/events.js",
			"js/core/message-parser.js",
			"js/core/socket.js",
			"js/core/game.js"
		).then("js/main.js");
	}
})();
