var React = require('react');

var Speaker = React.createClass({
    render() {
        return (<h1>Speaker: {this.props.title}</h1>);
    }
});

module.exports = Speaker;