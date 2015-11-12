var express = require('express');
var app = express();

/**
 * Note: Middleware app.use will serve everything static from public directory and bootstrap.
 * */
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log("Socket Connected in Server side -> Id: %s", socket.id);
});

console.log("Polling server is running at 'http://localhost:3000'");