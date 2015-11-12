var React = require('react');
var io = require('socket.io-client');
var Header = require('./parts/Header');

var APP = React.createClass({
    getInitialState() {
        console.log("APP Initial State");
        return {
            status: 'disconnected'
        }
    },
    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
    },
    connect() {
        console.log("Socket Connected from Client side -> Id: %s", this.socket.id);
        this.setState({status: 'connected'});
    },
    disconnect() {
        console.log("Socket Disconnected from Client side");
        this.setState({status: 'disconnected'});
    },
    /**
     * Note: ES6 shorten pattern `render: function(){}` into `render()`
     * */
        render() {
        return (
            <div>
                <Header itle="My Header" status={this.state.status}/>
            </div>
        );
    }
});

module.exports = APP;