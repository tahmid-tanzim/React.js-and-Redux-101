var express = require('express');
var app = express();

/**
 * Store all socket connections
 * */
var connections = [];
var title = 'Untitled Presentation';

/**
 * Note: Middleware app.use will serve everything static from public directory and bootstrap.
 * */
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

    socket.once('disconnect', function () {
        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        console.log("Socket Disconnected -> %s sockets remaining", connections.length);
    });

    /**
     * Note: Listening event `join` through socket.io from `./components/APP.js`
     * */
    socket.on('join', function(payload) {
        console.log("Audience Joined: %s", payload.name);
    });

    /**
     * Note: Sending emit event `welcome` through socket.io to `./components/APP.js`
     * */
    socket.emit('welcome', {
        title: title
    });

    connections.push(socket);
    console.log("Socket Connected in Server side ->\n\tSocket Id: %s \n\tTotal %s sockets connected.", socket.id, connections.length);
});

console.log("Polling Node server is running at 'http://localhost:3000'");