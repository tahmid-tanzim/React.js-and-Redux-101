var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var io = require('socket.io-client');
var Header = require('./parts/Header');

var APP = React.createClass({
    getInitialState() {
        console.log("APP Initial State");
        return {
            status: 'disconnected',
            title: '',
            dance: 'Yep!!'
        }
    },
    componentWillMount() {
        /**
         * Init Socket IO
         * */
        this.socket = io('http://localhost:3000');
        /**
         * Listening emit events from `app-server.js`
         * */
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('welcome', this.welcome);
    },
    emit(eventName, payload) {
        /**
         * Sending emit event to `app-server.js`
         * */
        this.socket.emit(eventName, payload);
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
                <Header title={this.state.title} status={this.state.status} />
                <RouteHandler emit={this.emit} {...this.state} />
            </div>
        );
    }
});

module.exports = APP;