var React = require('react');
var io = require('socket.io-client');
var Header = require('./parts/Header');

var APP = React.createClass({
    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect);
    },
    connect() {
        console.log("Socket Connected in Client side -> Id: %s", this.socket.id);
    },
    /**
     * Note: ES6 shorten pattern `render: function(){}` into `render()`
     * */
     render() {
        return (
            <div>
                <Header title="My New Header" />
            </div>
        );
    }
});

module.exports = APP;