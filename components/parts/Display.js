import React from 'react'

/**
 * Note: ES6 Class & Properties Syntax
 * FROM: var Display = React.createClass({});
 * TO: class Display extends React.Component {}
 * */
class Display extends React.Component {
    render() {
        return (this.props.if) ? <div>{this.props.children}</div> : null;
    }
}

module.exports = Display;