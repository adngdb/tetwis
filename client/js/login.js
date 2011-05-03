(function() {
	var user = null
		,loaded = false
		;

	load("js/libs/jquery.min.js", "js/tetwis.js")
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

			prepare();
		});
	});

	function prepare() {
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
			"js/core/game.js",
			"js/core/engine.js"
		).thenRun(function() {
			loaded = true;
			next();
		});
	}

	function next() {
		if (user != null && loaded) {
			tetwis.user = user;
			load("js/main.js");
		}
	}
})();
