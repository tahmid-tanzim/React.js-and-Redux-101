var express = require('express');
var _ = require('underscore');
var app = express();

/**
 * Store all socket connections
 * */
var connections = [];

/* Server state variable data. */
var title = 'Untitled Presentation';
var audience = [];
var speaker = {};
var questions = require('./app-questions');
var currentQuestion = false;
var results = {
    a: 0,
    b: 0,
    c: 0,
    d: 0
};

/**
 * Note: Middleware app.use will serve everything static from public directory and bootstrap.
 * */
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);
var io = require('socket.io').listen(server);

/**
 * Init Socket IO from server side
 * */
io.sockets.on('connection', function (socket) {

    /**
     * Title: Audience Disconnect,
     * Note: Handle disconnect event.
     * */
    socket.once('disconnect', function () {
        /* Here `this` is the socket object. */
        var member = _.findWhere(audience, {id: this.id});
        if (member) {
            audience.splice(audience.indexOf(member), 1);
            io.sockets.emit('audience', audience);
            console.log("Left: %s (Remaining %s audience members)", member.name, audience.length);
        } else if (this.id === speaker.id) {
            console.log("Speaker %s has left. '%s' is over.", speaker.name, title);
            speaker = {};
            title = 'Untitled Presentation';
            io.sockets.emit('end', {title: title, speaker: ''});
        }

        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        console.log("Socket Disconnected -> %s sockets remaining", connections.length);
    });

    /**
     * Title: Audience Join,
     * Note: Listening emit event `join` through socket.io from `./components/APP.js`
     * */
    socket.on('join', function (payload) {

        /* Here `this` is the socket object. */
        var newMember = {
            id: this.id,
            name: payload.name,
            type: 'audience'
        };

        /**
         * Note: Sending `newMember` object to Audience component
         * */
        this.emit('joined', newMember);

        /**
         * Note: Broadcasting `newMember` or Audience array to everyone.
         * */
        audience.push(newMember);
        io.sockets.emit('audience', audience);
        console.log("Audience Joined: %s", payload.name);
    });

    /**
     * Note: Speaker Joined & Presentation Start,
     * */
    socket.on('start', function (payload) {
        speaker = {
            id: this.id,
            name: payload.name,
            type: 'speaker'
        };
        title = payload.title;

        this.emit('joined', speaker);
        io.sockets.emit('start', {title: title, speaker: speaker.name});
        console.log("Presentation started: '%s' by %s", title, speaker.name);
    });

    /**
     * Note: Listen Speaker ask a question,
     * */
    socket.on('ask', function (question) {
        currentQuestion = question;

        /* Reset results */
        results = {
            a: 0,
            b: 0,
            c: 0,
            d: 0
        };
        io.sockets.emit('ask', currentQuestion);
        console.log("Question Asked: '%s' by %s", question.q, speaker.name);
    });

    /**
     * Note: Update results depending on Audience's answer.
     * */
    socket.on('answer', function (payload) {
        results[payload.choice]++;
        console.log("Answr: '%s' - %j", payload.choice, results);
    });

    /**
     * Note: Sending emit event `welcome` through socket.io to `./components/APP.js`
     * */
    socket.emit('welcome', {
        title: title,
        audience: audience,
        speaker: speaker.name,
        questions: questions,
        currentQuestion: currentQuestion
    });

    connections.push(socket);
    console.log("Socket Connected in Server side ->\n\tSocket Id: %s \n\tTotal %s sockets connected.", socket.id, connections.length);
});

console.log("Polling Node server is running at 'http://localhost:3000'");