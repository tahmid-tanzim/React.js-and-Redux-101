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
            member: {},
            audience: []
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
        this.socket.on('joined', this.joined);
        this.socket.on('audience', this.updateAudience);
    },
    emit(eventName, payload) {
        /**
         * Sending emit event to `app-server.js`
         * */
        this.socket.emit(eventName, payload);
    },
    connect() {
        var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

        /**
         * Note: If member already exists in browser sessionStorage,
         * Then Re-join the same member after disconnect or refresh from browser.
         * */
        if(member) {
            this.emit('join', member);
        }

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
    joined(member) {
        sessionStorage.member = JSON.stringify(member);
        this.setState({member: member});
    },
    updateAudience(newAudience) {
        this.setState({audience: newAudience});
    },
    /**
     * Note: ES6 shorten pattern `render: function(){}` into `render()`
     * */
        render() {
        return (
            <div>
                <Header title={this.state.title} status={this.state.status}/>
                <RouteHandler emit={this.emit} {...this.state} />
            </div>
        );
    }
});

module.exports = APP;