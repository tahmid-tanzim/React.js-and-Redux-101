import React from 'react'
import Router from 'react-router'
import io from 'socket.io-client'
import Header from './parts/Header'
var {RouteHandler} = Router;

var APP = React.createClass({
    getInitialState() {
        console.log("APP Initial State");
        return {
            status: 'disconnected',
            title: '',
            /* Both Speaker and Audience is a member */
            member: {},
            audience: [],
            /* Speaker's Information */
            speaker: '',
            questions: [],
            currentQuestion: false,
            results: {}
        }
    },
    componentWillMount() {
        /**
         * Init Socket IO from client side
         * */
        this.socket = io('http://localhost:3000');

        /**
         * Listening emit events from `app-server.js`
         * */
        /* ES6 Arrow Function */
        this.socket.on('connect', () => {
            /**
             * Note: If member (Audience) already exists in browser sessionStorage,
             * Then Re-join the same member after disconnect or refresh from browser.
             * */
            var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
            if (member && member.type === 'audience') {
                this.emit('join', member);
            } else if (member && member.type === 'speaker') {
                this.emit('start', {name: member.name, title: sessionStorage.title});
            }
            console.log("Socket Connected from Client side -> Id: %s", this.socket.id);
            this.setState({status: 'connected'});
        });

        this.socket.on('disconnect', () => {
            console.log("Socket Disconnected from Client side");
            this.setState({
                status: 'disconnected',
                title: 'disconnected',
                speaker: ''
            });
        });

        this.socket.on('welcome', x => this.setState(x));
        this.socket.on('joined', member => {
            /**
             * Title: New Audience / Speaker Joined
             * Note: Both Speaker and Audience is a member,
             * Listening emit event `joined` through socket.io from `app-server.js`
             * */
            sessionStorage.member = JSON.stringify(member);
            this.setState({member: member});
        });
        this.socket.on('audience', newAudience => {
            /**
             * Update total connected Audience
             * */
            this.setState({audience: newAudience});
        });
        this.socket.on('start', presentation => {
            /**
             * Note: If Speaker already exists in browser sessionStorage,
             * Then Re-join the same Speaker after disconnect or refresh from browser.
             * */
            if (this.state.member.type === 'speaker') {
                sessionStorage.title = presentation.title;
            }
            this.setState(presentation);
        });
        this.socket.on('end', x => this.setState(x));
        this.socket.on('ask', question => {
            /**
             * Update current asked currentQuestion
             * */
            sessionStorage.answer = '';
            this.setState({
                currentQuestion: question,
                results: {
                    a: 0,
                    b: 0,
                    c: 0,
                    d: 0
                }
            });
        });
        this.socket.on('results', data => {
            this.setState({results: data});
        });
    },
    emit(eventName, payload) {
        /**
         * Sending emit event to `app-server.js`
         * */
        this.socket.emit(eventName, payload);
    },
    //updateState(serverState) {
    //    this.setState(serverState);
    //},
    /**
     * Note: ES6 shorten pattern `render: function(){}` into `render(){}`
     * */
        render() {
        return (
            <div>
                <Header {...this.state} />
                <RouteHandler emit={this.emit} {...this.state} />
            </div>
        );
    }
});

module.exports = APP;