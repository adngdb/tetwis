var util             = require("util"),
    libpath         = require("path"),
    http            = require("http"),
    fs              = require("fs"),
    url             = require("url"),
    mime            = require("mime"),
    io              = require("socket.io"),

    Client          = require("./lib/client.js"),
    Engine          = require("./lib/engine.js");

util.log("Starting server... ");

var port = 9309;

var path = "/client";

var server = http.createServer(function (request, response) {

    var uri = url.parse(request.url).pathname;
    var filename = libpath.join(path, uri);

    libpath.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) {
            filename += '/index.html';
        }

        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.write(err + "\n");
                response.end();
                return;
            }

            var type = mime.lookup(filename);
            response.writeHead(200, {
                "Content-Type": type
            });
            response.write(file, "binary");
            response.end();
        });
    });
});

server.listen(port);

var io = io.listen(server);

var engine = new Engine(server).init();

io.sockets.on('connection', function(conn){
    //~ util.log("COUCOU");
    //~ util.log(util.inspect(conn));
    new Client(conn, engine).init();
});

util.log("Server created. Listening on port " + port + ". ");
