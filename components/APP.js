var React = require('react');
var io = require('socket.io-client');
var Header = require('./parts/Header');

var APP = React.createClass({
    getInitialState() {
        console.log("APP Initial State");
        return {
            status: 'disconnected',
            title: ''
        }
    },
    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome', this.welcome);
    },
    connect() {
        console.log("Socket Connected from Client side -> Id: %s", this.socket.id);
        this.setState({status: 'connected'});
    },
    disconnect() {
        console.log("Socket Disconnected from Client side");
        this.setState({status: 'disconnected'});
    },
    welcome(serverState) {
        this.setState({title: serverState.title});
    },
    /**
     * Note: ES6 shorten pattern `render: function(){}` into `render()`
     * */
        render() {
        return (
            <div>
                <Header title={this.state.title} status={this.state.status}/>
            </div>
        );
    }
});

module.exports = APP;